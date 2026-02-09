<?php
/**
 * CMS Media Management
 * GET              - List media files
 * GET  ?id=...     - Get single media
 * POST             - Upload file (multipart/form-data)
 * PUT  ?id=...     - Update media metadata (alt_text, folder)
 * DELETE ?id=...   - Delete media file
 */
require_once __DIR__ . '/config.php';

$method = $_SERVER["REQUEST_METHOD"];

// Allowed MIME types for upload
$allowedMimes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'image/avif', 'image/bmp', 'image/tiff',
    'application/pdf',
    'video/mp4', 'video/webm',
];

$maxFileSize = 10 * 1024 * 1024; // 10MB

try {
    $db = getDB();

    // ─── GET - List / Single ─────────────────────────────────────────────
    if ($method === 'GET') {
        $id = $_GET['id'] ?? '';
        $folder = $_GET['folder'] ?? '';
        $search = $_GET['search'] ?? '';
        $page = max(1, intval($_GET['page'] ?? 1));
        $limit = min(100, max(1, intval($_GET['limit'] ?? 50)));
        $offset = ($page - 1) * $limit;

        if ($id) {
            $stmt = $db->prepare("SELECT * FROM media WHERE id = ?");
            $stmt->execute([$id]);
            $media = $stmt->fetch();
            if (!$media) {
                jsonResponse(['ok' => false, 'error' => 'Media not found'], 404);
            }
            $media['url'] = '/uploads/' . $media['filename'];
            jsonResponse(['ok' => true, 'media' => $media]);
        }

        $sql = "SELECT * FROM media WHERE 1=1";
        $countSql = "SELECT COUNT(*) as total FROM media WHERE 1=1";
        $params = [];

        if ($folder) {
            $sql .= " AND folder = ?";
            $countSql .= " AND folder = ?";
            $params[] = $folder;
        }

        if ($search) {
            $sql .= " AND (original_name LIKE ? OR alt_text LIKE ?)";
            $countSql .= " AND (original_name LIKE ? OR alt_text LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }

        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = $countStmt->fetch()['total'];

        $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $items = $stmt->fetchAll();

        foreach ($items as &$item) {
            $item['url'] = '/uploads/' . $item['filename'];
        }

        jsonResponse([
            'ok' => true,
            'media' => $items,
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'pages' => ceil($total / $limit),
        ]);
    }

    // ─── POST - Upload ───────────────────────────────────────────────────
    if ($method === 'POST') {
        $user = requireAuth();

        if (!isset($_FILES['file'])) {
            jsonResponse(['ok' => false, 'error' => 'No file uploaded'], 400);
        }

        $file = $_FILES['file'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            jsonResponse(['ok' => false, 'error' => 'Upload failed with error code: ' . $file['error']], 400);
        }

        if ($file['size'] > $maxFileSize) {
            jsonResponse(['ok' => false, 'error' => 'File too large. Maximum size is 10MB'], 400);
        }

        $mime = mime_content_type($file['tmp_name']);
        if (!in_array($mime, $allowedMimes)) {
            jsonResponse(['ok' => false, 'error' => 'File type not allowed: ' . $mime], 400);
        }

        // Generate unique filename
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid('media_', true) . '.' . $ext;

        // Ensure uploads directory exists
        if (!is_dir(CMS_UPLOADS_DIR)) {
            mkdir(CMS_UPLOADS_DIR, 0755, true);
        }

        $destPath = CMS_UPLOADS_DIR . '/' . $filename;
        if (!move_uploaded_file($file['tmp_name'], $destPath)) {
            jsonResponse(['ok' => false, 'error' => 'Failed to save file'], 500);
        }

        // Get image dimensions if applicable
        $width = null;
        $height = null;
        if (strpos($mime, 'image/') === 0 && $mime !== 'image/svg+xml') {
            $imageInfo = getimagesize($destPath);
            if ($imageInfo) {
                $width = $imageInfo[0];
                $height = $imageInfo[1];
            }
        }

        $folder = $_POST['folder'] ?? '/';
        $altText = $_POST['alt_text'] ?? '';

        $stmt = $db->prepare("
            INSERT INTO media (filename, original_name, mime_type, size, width, height, alt_text, folder, uploaded_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $filename, $file['name'], $mime, $file['size'],
            $width, $height, $altText, $folder, $user['user_id']
        ]);

        $mediaId = $db->lastInsertId();

        logActivity($db, $user['user_id'], 'upload', 'media', $mediaId, json_encode(['filename' => $file['name']]));

        jsonResponse([
            'ok' => true,
            'media' => [
                'id' => $mediaId,
                'filename' => $filename,
                'original_name' => $file['name'],
                'mime_type' => $mime,
                'size' => $file['size'],
                'width' => $width,
                'height' => $height,
                'url' => '/uploads/' . $filename,
                'alt_text' => $altText,
                'folder' => $folder,
            ],
        ], 201);
    }

    // ─── PUT - Update metadata ───────────────────────────────────────────
    if ($method === 'PUT') {
        $user = requireAuth();
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'id parameter is required'], 400);
        }

        $stmt = $db->prepare("SELECT * FROM media WHERE id = ?");
        $stmt->execute([$id]);
        $media = $stmt->fetch();
        if (!$media) {
            jsonResponse(['ok' => false, 'error' => 'Media not found'], 404);
        }

        $body = getRequestBody();
        $altText = $body['alt_text'] ?? $media['alt_text'];
        $folder = $body['folder'] ?? $media['folder'];

        $stmt = $db->prepare("UPDATE media SET alt_text = ?, folder = ? WHERE id = ?");
        $stmt->execute([$altText, $folder, $id]);

        jsonResponse(['ok' => true, 'message' => 'Media updated']);
    }

    // ─── DELETE ───────────────────────────────────────────────────────────
    if ($method === 'DELETE') {
        $user = requireAuth();
        $id = intval($_GET['id'] ?? 0);

        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'id parameter is required'], 400);
        }

        $stmt = $db->prepare("SELECT * FROM media WHERE id = ?");
        $stmt->execute([$id]);
        $media = $stmt->fetch();
        if (!$media) {
            jsonResponse(['ok' => false, 'error' => 'Media not found'], 404);
        }

        // Delete physical file
        $filePath = CMS_UPLOADS_DIR . '/' . $media['filename'];
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $db->prepare("DELETE FROM media WHERE id = ?")->execute([$id]);

        logActivity($db, $user['user_id'], 'delete', 'media', $id, json_encode(['filename' => $media['original_name']]));

        jsonResponse(['ok' => true, 'message' => 'Media deleted']);
    }

    jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);

} catch (Exception $e) {
    jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
}
