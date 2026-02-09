<?php
/**
 * CMS Configuration
 * Database connection (SQLite PDO), JWT helpers, CORS, auth middleware
 */

// ─── CORS ────────────────────────────────────────────────────────────────────
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit();
}

// ─── Constants ───────────────────────────────────────────────────────────────
define('CMS_DB_PATH', __DIR__ . '/../../cms_data/cms.db');
define('CMS_UPLOADS_DIR', __DIR__ . '/../../uploads');
// IMPORTANT: Change this to a unique random string before deploying to production
define('JWT_SECRET', getenv('CMS_JWT_SECRET') ?: 'fulfilx_cms_CHANGE_THIS_TO_A_RANDOM_STRING_2026');
define('JWT_EXPIRY', 86400 * 7); // 7 days

// ─── Database Connection ─────────────────────────────────────────────────────
function getDB(): PDO {
    $dir = dirname(CMS_DB_PATH);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $db = new PDO('sqlite:' . CMS_DB_PATH);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $db->exec("PRAGMA journal_mode=WAL");
    $db->exec("PRAGMA foreign_keys=ON");
    return $db;
}

// ─── JWT Helpers ─────────────────────────────────────────────────────────────
function base64UrlEncode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode(string $data): string {
    return base64_decode(strtr($data, '-_', '+/'));
}

function createJWT(array $payload): string {
    $header = base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload['iat'] = time();
    $payload['exp'] = time() + JWT_EXPIRY;
    $payloadEncoded = base64UrlEncode(json_encode($payload));
    $signature = base64UrlEncode(hash_hmac('sha256', "$header.$payloadEncoded", JWT_SECRET, true));
    return "$header.$payloadEncoded.$signature";
}

function verifyJWT(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;

    [$header, $payload, $signature] = $parts;
    $expectedSig = base64UrlEncode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));

    if (!hash_equals($expectedSig, $signature)) return null;

    $data = json_decode(base64UrlDecode($payload), true);
    if (!$data || !isset($data['exp']) || $data['exp'] < time()) return null;

    return $data;
}

// ─── Auth Middleware ─────────────────────────────────────────────────────────
function requireAuth(): array {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (strpos($authHeader, 'Bearer ') !== 0) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Authorization required']);
        exit();
    }

    $token = substr($authHeader, 7);
    $payload = verifyJWT($token);

    if (!$payload) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Invalid or expired token']);
        exit();
    }

    return $payload;
}

function requireAdmin(): array {
    $user = requireAuth();
    if (($user['role'] ?? '') !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Admin access required']);
        exit();
    }
    return $user;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getRequestBody(): array {
    $raw = file_get_contents("php://input");
    return json_decode($raw, true) ?? [];
}

function jsonResponse(mixed $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function logActivity(PDO $db, int $userId, string $action, string $entityType = '', int $entityId = 0, string $details = ''): void {
    $stmt = $db->prepare("INSERT INTO activity_log (user_id, action, entity_type, entity_id, details) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$userId, $action, $entityType, $entityId ?: null, $details ?: null]);
}
