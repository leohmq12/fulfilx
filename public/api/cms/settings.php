<?php
/**
 * CMS Integration Settings (Replit URLs & API keys)
 * GET: return current settings (admin only)
 * PUT: update settings (admin only)
 */
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'] ?? '';

if ($method === 'GET') {
    $user = requireAdmin();
    try {
        $db = getDB();
        $db->exec("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '')");
        $stmt = $db->query("SELECT key, value FROM settings");
        $rows = $stmt ? $stmt->fetchAll(PDO::FETCH_KEY_PAIR) : [];
        $out = [
            'replit_website_url' => $rows['replit_website_url'] ?? '',
            'replit_website_api_key' => $rows['replit_website_api_key'] ?? '',
            'replit_newsletter_url' => $rows['replit_newsletter_url'] ?? '',
            'replit_newsletter_api_key' => $rows['replit_newsletter_api_key'] ?? '',
        ];
        jsonResponse(['ok' => true, 'settings' => $out]);
    } catch (Exception $e) {
        jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
    }
}

if ($method === 'PUT') {
    $user = requireAdmin();
    $body = getRequestBody();
    $settings = $body['settings'] ?? [];
    if (!is_array($settings)) {
        jsonResponse(['ok' => false, 'error' => 'settings must be an object'], 400);
    }
    $allowed = ['replit_website_url', 'replit_website_api_key', 'replit_newsletter_url', 'replit_newsletter_api_key'];
    try {
        $db = getDB();
        $db->exec("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '')");
        $stmt = $db->prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
        foreach ($allowed as $key) {
            $value = isset($settings[$key]) ? (is_string($settings[$key]) ? $settings[$key] : '') : '';
            $stmt->execute([$key, $value]);
        }
        logActivity($db, (int) $user['id'], 'update', 'settings', 0, 'integration_settings');
        jsonResponse(['ok' => true, 'message' => 'Settings saved']);
    } catch (Exception $e) {
        jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
    }
}

jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
