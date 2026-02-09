<?php
/**
 * CMS Content CRUD
 * GET    ?type=...                    - List entries (public, only published unless authed)
 * GET    ?type=...&slug=...           - Get single entry by slug
 * GET    ?type=...&id=...             - Get single entry by id
 * POST                                - Create entry (auth required)
 * PUT    ?id=...                      - Update entry (auth required)
 * DELETE ?id=...                      - Delete entry (auth required)
 */
require_once __DIR__ . '/config.php';

$method = $_SERVER["REQUEST_METHOD"];

try {
    $db = getDB();

    // ─── GET - List / Single ─────────────────────────────────────────────
    if ($method === 'GET') {
        $type = $_GET['type'] ?? '';
        $slug = $_GET['slug'] ?? '';
        $id = $_GET['id'] ?? '';
        $status = $_GET['status'] ?? '';
        $page = max(1, intval($_GET['page'] ?? 1));
        $limit = min(100, max(1, intval($_GET['limit'] ?? 50)));
        $offset = ($page - 1) * $limit;
        $all = isset($_GET['all']); // admin flag to get all statuses

        // Check if request is authenticated (for admin access to drafts)
        $isAuthed = false;
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (strpos($authHeader, 'Bearer ') === 0) {
            $token = substr($authHeader, 7);
            $payload = verifyJWT($token);
            $isAuthed = $payload !== null;
        }

        // Get single by ID
        if ($id) {
            $stmt = $db->prepare("SELECT * FROM content_entries WHERE id = ?");
            $stmt->execute([$id]);
            $entry = $stmt->fetch();
            if (!$entry) {
                jsonResponse(['ok' => false, 'error' => 'Entry not found'], 404);
            }
            // Non-authed users can only see published
            if (!$isAuthed && $entry['status'] !== 'published') {
                jsonResponse(['ok' => false, 'error' => 'Entry not found'], 404);
            }
            $entry['data'] = json_decode($entry['data'], true);
            jsonResponse(['ok' => true, 'entry' => $entry]);
        }

        // Get single by type + slug
        if ($type && $slug) {
            $sql = "SELECT * FROM content_entries WHERE content_type = ? AND slug = ?";
            $params = [$type, $slug];
            if (!$isAuthed) {
                $sql .= " AND status = 'published'";
            }
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $entry = $stmt->fetch();
            if (!$entry) {
                jsonResponse(['ok' => false, 'error' => 'Entry not found'], 404);
            }
            $entry['data'] = json_decode($entry['data'], true);
            jsonResponse(['ok' => true, 'entry' => $entry]);
        }

        // List by type
        if ($type) {
            $sql = "SELECT * FROM content_entries WHERE content_type = ?";
            $countSql = "SELECT COUNT(*) as total FROM content_entries WHERE content_type = ?";
            $params = [$type];

            if ($status) {
                $sql .= " AND status = ?";
                $countSql .= " AND status = ?";
                $params[] = $status;
            } elseif (!$isAuthed || !$all) {
                $sql .= " AND status = 'published'";
                $countSql .= " AND status = 'published'";
            }

            // Get total count
            $countStmt = $db->prepare($countSql);
            $countStmt->execute($params);
            $total = $countStmt->fetch()['total'];

            $sql .= " ORDER BY sort_order ASC, created_at DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $entries = $stmt->fetchAll();

            foreach ($entries as &$entry) {
                $entry['data'] = json_decode($entry['data'], true);
            }

            jsonResponse([
                'ok' => true,
                'entries' => $entries,
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'pages' => ceil($total / $limit),
            ]);
        }

        // List all types (admin overview)
        if ($isAuthed) {
            $stmt = $db->query("
                SELECT content_type, 
                       COUNT(*) as total,
                       SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
                       SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as drafts
                FROM content_entries 
                GROUP BY content_type 
                ORDER BY content_type
            ");
            jsonResponse(['ok' => true, 'types' => $stmt->fetchAll()]);
        }

        jsonResponse(['ok' => false, 'error' => 'type parameter is required'], 400);
    }

    // ─── POST - Create ───────────────────────────────────────────────────
    if ($method === 'POST') {
        $user = requireAuth();
        $body = getRequestBody();

        $type = trim($body['content_type'] ?? '');
        $slug = trim($body['slug'] ?? '') ?: null;
        $status = $body['status'] ?? 'draft';
        $data = $body['data'] ?? [];
        $sortOrder = intval($body['sort_order'] ?? 0);

        if (!$type) {
            jsonResponse(['ok' => false, 'error' => 'content_type is required'], 400);
        }

        $publishedAt = ($status === 'published') ? date('Y-m-d H:i:s') : null;

        $stmt = $db->prepare("
            INSERT INTO content_entries (content_type, slug, status, data, sort_order, created_by, updated_by, published_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $type, $slug, $status,
            json_encode($data), $sortOrder,
            $user['user_id'], $user['user_id'], $publishedAt
        ]);

        $entryId = $db->lastInsertId();

        // Create initial version
        $vStmt = $db->prepare("INSERT INTO content_versions (entry_id, version, data, changed_by) VALUES (?, 1, ?, ?)");
        $vStmt->execute([$entryId, json_encode($data), $user['user_id']]);

        logActivity($db, $user['user_id'], 'create', 'content', $entryId, json_encode(['type' => $type, 'slug' => $slug]));

        jsonResponse(['ok' => true, 'id' => $entryId, 'message' => 'Entry created'], 201);
    }

    // ─── PUT - Update ────────────────────────────────────────────────────
    if ($method === 'PUT') {
        $user = requireAuth();
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'id parameter is required'], 400);
        }

        // Check entry exists
        $stmt = $db->prepare("SELECT * FROM content_entries WHERE id = ?");
        $stmt->execute([$id]);
        $existing = $stmt->fetch();
        if (!$existing) {
            jsonResponse(['ok' => false, 'error' => 'Entry not found'], 404);
        }

        $body = getRequestBody();
        $slug = isset($body['slug']) ? (trim($body['slug']) ?: null) : $existing['slug'];
        $status = $body['status'] ?? $existing['status'];
        $data = $body['data'] ?? json_decode($existing['data'], true);
        $sortOrder = isset($body['sort_order']) ? intval($body['sort_order']) : $existing['sort_order'];

        $publishedAt = $existing['published_at'];
        if ($status === 'published' && !$publishedAt) {
            $publishedAt = date('Y-m-d H:i:s');
        }

        $stmt = $db->prepare("
            UPDATE content_entries 
            SET slug = ?, status = ?, data = ?, sort_order = ?, updated_by = ?, published_at = ?, updated_at = datetime('now')
            WHERE id = ?
        ");
        $stmt->execute([$slug, $status, json_encode($data), $sortOrder, $user['user_id'], $publishedAt, $id]);

        // Save version
        $vStmt = $db->prepare("SELECT COALESCE(MAX(version), 0) + 1 as next_ver FROM content_versions WHERE entry_id = ?");
        $vStmt->execute([$id]);
        $nextVer = $vStmt->fetch()['next_ver'];

        $vStmt = $db->prepare("INSERT INTO content_versions (entry_id, version, data, changed_by) VALUES (?, ?, ?, ?)");
        $vStmt->execute([$id, $nextVer, json_encode($data), $user['user_id']]);

        logActivity($db, $user['user_id'], 'update', 'content', $id, json_encode(['status' => $status]));

        jsonResponse(['ok' => true, 'message' => 'Entry updated']);
    }

    // ─── DELETE ───────────────────────────────────────────────────────────
    if ($method === 'DELETE') {
        $user = requireAuth();
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'id parameter is required'], 400);
        }

        $stmt = $db->prepare("SELECT * FROM content_entries WHERE id = ?");
        $stmt->execute([$id]);
        $entry = $stmt->fetch();
        if (!$entry) {
            jsonResponse(['ok' => false, 'error' => 'Entry not found'], 404);
        }

        $db->prepare("DELETE FROM content_entries WHERE id = ?")->execute([$id]);

        logActivity($db, $user['user_id'], 'delete', 'content', $id, json_encode(['type' => $entry['content_type'], 'slug' => $entry['slug']]));

        jsonResponse(['ok' => true, 'message' => 'Entry deleted']);
    }

    jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);

} catch (Exception $e) {
    jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
}
