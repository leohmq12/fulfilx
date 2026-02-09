<?php
/**
 * CMS Activity Log
 * GET - List recent activity entries
 */
require_once __DIR__ . '/config.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    jsonResponse(['ok' => false, 'error' => 'GET required'], 405);
}

$user = requireAuth();

try {
    $db = getDB();
    $limit = min(100, max(1, intval($_GET['limit'] ?? 20)));

    $stmt = $db->prepare("
        SELECT al.*, u.name as user_name 
        FROM activity_log al 
        LEFT JOIN users u ON al.user_id = u.id 
        ORDER BY al.created_at DESC 
        LIMIT ?
    ");
    $stmt->execute([$limit]);

    jsonResponse(['ok' => true, 'activities' => $stmt->fetchAll()]);

} catch (Exception $e) {
    jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
}
