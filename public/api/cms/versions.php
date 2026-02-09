<?php
/**
 * CMS Content Versions
 * GET ?entry_id=...   - List versions for an entry
 * POST ?version_id=... - Restore a version (copies version data back to entry)
 */
require_once __DIR__ . '/config.php';

$method = $_SERVER["REQUEST_METHOD"];

try {
    $db = getDB();

    // ─── GET - List versions ─────────────────────────────────────────────
    if ($method === 'GET') {
        $user = requireAuth();
        $entryId = intval($_GET['entry_id'] ?? 0);

        if (!$entryId) {
            jsonResponse(['ok' => false, 'error' => 'entry_id parameter is required'], 400);
        }

        $stmt = $db->prepare("
            SELECT cv.*, u.name as changed_by_name 
            FROM content_versions cv 
            LEFT JOIN users u ON cv.changed_by = u.id 
            WHERE cv.entry_id = ? 
            ORDER BY cv.version DESC 
            LIMIT 50
        ");
        $stmt->execute([$entryId]);
        $versions = $stmt->fetchAll();

        foreach ($versions as &$v) {
            $v['data'] = json_decode($v['data'], true);
        }

        jsonResponse(['ok' => true, 'versions' => $versions]);
    }

    // ─── POST - Restore version ──────────────────────────────────────────
    if ($method === 'POST') {
        $user = requireAuth();
        $body = getRequestBody();
        $versionId = intval($body['version_id'] ?? 0);

        if (!$versionId) {
            jsonResponse(['ok' => false, 'error' => 'version_id is required'], 400);
        }

        // Get the version
        $stmt = $db->prepare("SELECT * FROM content_versions WHERE id = ?");
        $stmt->execute([$versionId]);
        $version = $stmt->fetch();

        if (!$version) {
            jsonResponse(['ok' => false, 'error' => 'Version not found'], 404);
        }

        // Update the entry with the version data
        $stmt = $db->prepare("
            UPDATE content_entries 
            SET data = ?, updated_by = ?, updated_at = datetime('now')
            WHERE id = ?
        ");
        $stmt->execute([$version['data'], $user['user_id'], $version['entry_id']]);

        // Create a new version record for the restore
        $vStmt = $db->prepare("SELECT COALESCE(MAX(version), 0) + 1 as next_ver FROM content_versions WHERE entry_id = ?");
        $vStmt->execute([$version['entry_id']]);
        $nextVer = $vStmt->fetch()['next_ver'];

        $vStmt = $db->prepare("INSERT INTO content_versions (entry_id, version, data, changed_by) VALUES (?, ?, ?, ?)");
        $vStmt->execute([$version['entry_id'], $nextVer, $version['data'], $user['user_id']]);

        logActivity($db, $user['user_id'], 'restore_version', 'content', $version['entry_id'],
            json_encode(['restored_version' => $version['version']]));

        jsonResponse(['ok' => true, 'message' => "Restored to version {$version['version']}"]);
    }

    jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);

} catch (Exception $e) {
    jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
}
