<?php
/**
 * CMS User Management (Admin only)
 * GET              - List all users
 * POST             - Create user
 * PUT  ?id=...     - Update user
 * DELETE ?id=...   - Deactivate user
 */
require_once __DIR__ . '/config.php';

$method = $_SERVER["REQUEST_METHOD"];

try {
    $db = getDB();

    // ─── GET - List users ────────────────────────────────────────────────
    if ($method === 'GET') {
        requireAdmin();

        $stmt = $db->query("SELECT id, email, name, role, is_active, created_at, updated_at FROM users ORDER BY created_at DESC");
        jsonResponse(['ok' => true, 'users' => $stmt->fetchAll()]);
    }

    // ─── POST - Create user ──────────────────────────────────────────────
    if ($method === 'POST') {
        $admin = requireAdmin();
        $body = getRequestBody();

        $email = trim($body['email'] ?? '');
        $password = $body['password'] ?? '';
        $name = trim($body['name'] ?? '');
        $role = $body['role'] ?? 'editor';

        if (!$email || !$password || !$name) {
            jsonResponse(['ok' => false, 'error' => 'Email, password, and name are required'], 400);
        }

        if (strlen($password) < 8) {
            jsonResponse(['ok' => false, 'error' => 'Password must be at least 8 characters'], 400);
        }

        if (!in_array($role, ['admin', 'editor'])) {
            jsonResponse(['ok' => false, 'error' => 'Role must be admin or editor'], 400);
        }

        // Check if email exists
        $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            jsonResponse(['ok' => false, 'error' => 'Email already exists'], 409);
        }

        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $db->prepare("INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)");
        $stmt->execute([$email, $hash, $name, $role]);

        $userId = $db->lastInsertId();
        logActivity($db, $admin['user_id'], 'create', 'user', $userId, json_encode(['email' => $email, 'role' => $role]));

        jsonResponse(['ok' => true, 'id' => $userId, 'message' => 'User created'], 201);
    }

    // ─── PUT - Update user ───────────────────────────────────────────────
    if ($method === 'PUT') {
        $admin = requireAdmin();
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'id parameter is required'], 400);
        }

        $stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        if (!$user) {
            jsonResponse(['ok' => false, 'error' => 'User not found'], 404);
        }

        $body = getRequestBody();
        $name = isset($body['name']) ? trim($body['name']) : $user['name'];
        $email = isset($body['email']) ? trim($body['email']) : $user['email'];
        $role = $body['role'] ?? $user['role'];
        $isActive = isset($body['is_active']) ? intval($body['is_active']) : $user['is_active'];

        if (!in_array($role, ['admin', 'editor'])) {
            jsonResponse(['ok' => false, 'error' => 'Role must be admin or editor'], 400);
        }

        // Check email uniqueness if changed
        if ($email !== $user['email']) {
            $stmt = $db->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
            $stmt->execute([$email, $id]);
            if ($stmt->fetch()) {
                jsonResponse(['ok' => false, 'error' => 'Email already exists'], 409);
            }
        }

        $stmt = $db->prepare("UPDATE users SET name = ?, email = ?, role = ?, is_active = ?, updated_at = datetime('now') WHERE id = ?");
        $stmt->execute([$name, $email, $role, $isActive, $id]);

        // Update password if provided
        if (!empty($body['password'])) {
            if (strlen($body['password']) < 8) {
                jsonResponse(['ok' => false, 'error' => 'Password must be at least 8 characters'], 400);
            }
            $hash = password_hash($body['password'], PASSWORD_BCRYPT);
            $db->prepare("UPDATE users SET password_hash = ? WHERE id = ?")->execute([$hash, $id]);
        }

        logActivity($db, $admin['user_id'], 'update', 'user', $id, json_encode(['role' => $role, 'is_active' => $isActive]));

        jsonResponse(['ok' => true, 'message' => 'User updated']);
    }

    // ─── DELETE - Deactivate user ────────────────────────────────────────
    if ($method === 'DELETE') {
        $admin = requireAdmin();
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'id parameter is required'], 400);
        }

        // Prevent self-deactivation
        if ($id === $admin['user_id']) {
            jsonResponse(['ok' => false, 'error' => 'Cannot deactivate your own account'], 400);
        }

        $stmt = $db->prepare("UPDATE users SET is_active = 0, updated_at = datetime('now') WHERE id = ?");
        $stmt->execute([$id]);

        logActivity($db, $admin['user_id'], 'deactivate', 'user', $id);

        jsonResponse(['ok' => true, 'message' => 'User deactivated']);
    }

    jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);

} catch (Exception $e) {
    jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
}
