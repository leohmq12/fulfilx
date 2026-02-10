<?php
/**
 * Developer API - Database browser (developer role only)
 * GET         - List tables
 * GET ?table= - Table schema + first 100 rows
 * POST        - Run any single SQL statement (SELECT, INSERT, UPDATE, DELETE, etc.)
 */
require_once __DIR__ . '/config.php';

$user = requireDeveloper();
$db = getDB();

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $table = isset($_GET['table']) ? trim($_GET['table']) : '';

        if ($table === '') {
            // List all tables (exclude sqlite internal)
            $stmt = $db->query("
                SELECT name, type
                FROM sqlite_master
                WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%'
                ORDER BY type, name
            ");
            $tables = $stmt->fetchAll();
            jsonResponse(['ok' => true, 'tables' => $tables]);
        }

        // Validate table name (alphanumeric and underscore only)
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $table)) {
            jsonResponse(['ok' => false, 'error' => 'Invalid table name'], 400);
        }

        // Table info (columns)
        $stmt = $db->query("PRAGMA table_info(" . $table . ")");
        $columns = $stmt->fetchAll();

        // First 100 rows
        $limit = min(100, max(1, (int)($_GET['limit'] ?? 100)));
        $stmt = $db->query("SELECT * FROM " . $table . " LIMIT " . $limit);
        $rows = $stmt->fetchAll();

        jsonResponse([
            'ok' => true,
            'table' => $table,
            'columns' => $columns,
            'rows' => $rows,
            'count' => count($rows),
        ]);
    }

    if ($method === 'POST') {
        $body = getRequestBody();
        $query = isset($body['query']) ? trim($body['query']) : '';

        if ($query === '') {
            jsonResponse(['ok' => false, 'error' => 'Query required'], 400);
        }

        // Single statement only (no semicolons)
        $normalized = preg_replace('/\s+/', ' ', $query);
        if (strpos($normalized, ';') !== false) {
            jsonResponse(['ok' => false, 'error' => 'Multiple statements not allowed'], 400);
        }

        $isSelect = (stripos($normalized, 'SELECT') === 0);
        if ($isSelect) {
            $stmt = $db->query($query);
            $rows = $stmt->fetchAll();
            jsonResponse(['ok' => true, 'rows' => $rows, 'count' => count($rows)]);
        } else {
            $affected = $db->exec($query);
            $lastId = $db->lastInsertId();
            jsonResponse([
                'ok' => true,
                'rows' => [],
                'count' => 0,
                'affectedRows' => $affected,
                'lastInsertId' => $lastId ? (int) $lastId : null,
            ]);
        }
    }

    jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);

} catch (PDOException $e) {
    jsonResponse(['ok' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
}
