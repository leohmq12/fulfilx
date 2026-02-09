<?php
/**
 * CMS Authentication
 * POST /login  - Login with email/password, returns JWT
 * POST /logout - Invalidate session (client-side)
 * GET  /me     - Get current user info from JWT
 */
require_once __DIR__ . '/config.php';

$method = $_SERVER["REQUEST_METHOD"];
$action = $_GET['action'] ?? '';

try {
    $db = getDB();

    // ─── POST /login ─────────────────────────────────────────────────────
    if ($method === 'POST' && $action === 'login') {
        $body = getRequestBody();
        $email = trim($body['email'] ?? '');
        $password = $body['password'] ?? '';

        if (!$email || !$password) {
            jsonResponse(['ok' => false, 'error' => 'Email and password are required'], 400);
        }

        $stmt = $db->prepare("SELECT * FROM users WHERE email = ? AND is_active = 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            jsonResponse(['ok' => false, 'error' => 'Invalid email or password'], 401);
        }

        $token = createJWT([
            'user_id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'role' => $user['role'],
        ]);

        logActivity($db, $user['id'], 'login', 'user', $user['id']);

        jsonResponse([
            'ok' => true,
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'role' => $user['role'],
            ],
        ]);
    }

    // ─── GET /me ─────────────────────────────────────────────────────────
    if ($method === 'GET' && $action === 'me') {
        $payload = requireAuth();

        $stmt = $db->prepare("SELECT id, email, name, role, created_at FROM users WHERE id = ? AND is_active = 1");
        $stmt->execute([$payload['user_id']]);
        $user = $stmt->fetch();

        if (!$user) {
            jsonResponse(['ok' => false, 'error' => 'User not found'], 404);
        }

        jsonResponse(['ok' => true, 'user' => $user]);
    }

    // ─── POST /change-password ───────────────────────────────────────────
    if ($method === 'POST' && $action === 'change-password') {
        $payload = requireAuth();
        $body = getRequestBody();
        $currentPassword = $body['current_password'] ?? '';
        $newPassword = $body['new_password'] ?? '';

        if (!$currentPassword || !$newPassword) {
            jsonResponse(['ok' => false, 'error' => 'Current and new password required'], 400);
        }

        if (strlen($newPassword) < 8) {
            jsonResponse(['ok' => false, 'error' => 'New password must be at least 8 characters'], 400);
        }

        $stmt = $db->prepare("SELECT password_hash FROM users WHERE id = ?");
        $stmt->execute([$payload['user_id']]);
        $user = $stmt->fetch();

        if (!password_verify($currentPassword, $user['password_hash'])) {
            jsonResponse(['ok' => false, 'error' => 'Current password is incorrect'], 401);
        }

        $hash = password_hash($newPassword, PASSWORD_BCRYPT);
        $stmt = $db->prepare("UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?");
        $stmt->execute([$hash, $payload['user_id']]);

        logActivity($db, $payload['user_id'], 'change_password', 'user', $payload['user_id']);

        jsonResponse(['ok' => true, 'message' => 'Password changed successfully']);
    }

    jsonResponse(['ok' => false, 'error' => 'Invalid action. Use ?action=login|me|change-password'], 400);

} catch (Exception $e) {
    jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
}
