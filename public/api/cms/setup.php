<?php
/**
 * CMS Setup - Creates database tables and initial admin user
 * Run once to initialize the CMS. POST with admin credentials.
 * POST body: { "email": "...", "password": "...", "name": "..." }
 */
require_once __DIR__ . '/config.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    jsonResponse(['ok' => false, 'error' => 'POST required'], 405);
}

try {
    $db = getDB();

    // Create tables
    $db->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'editor',
            is_active INTEGER NOT NULL DEFAULT 1,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS content_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content_type TEXT NOT NULL,
            slug TEXT,
            status TEXT NOT NULL DEFAULT 'draft',
            data TEXT NOT NULL,
            sort_order INTEGER DEFAULT 0,
            created_by INTEGER REFERENCES users(id),
            updated_by INTEGER REFERENCES users(id),
            published_at TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            UNIQUE(content_type, slug)
        );

        CREATE TABLE IF NOT EXISTS content_versions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            entry_id INTEGER NOT NULL REFERENCES content_entries(id) ON DELETE CASCADE,
            version INTEGER NOT NULL,
            data TEXT NOT NULL,
            changed_by INTEGER REFERENCES users(id),
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS media (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            original_name TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            size INTEGER NOT NULL,
            width INTEGER,
            height INTEGER,
            alt_text TEXT DEFAULT '',
            folder TEXT DEFAULT '/',
            uploaded_by INTEGER REFERENCES users(id),
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS activity_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES users(id),
            action TEXT NOT NULL,
            entity_type TEXT,
            entity_id INTEGER,
            details TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE INDEX IF NOT EXISTS idx_content_type ON content_entries(content_type);
        CREATE INDEX IF NOT EXISTS idx_content_status ON content_entries(status);
        CREATE INDEX IF NOT EXISTS idx_content_type_status ON content_entries(content_type, status);
        CREATE INDEX IF NOT EXISTS idx_versions_entry ON content_versions(entry_id);
        CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_log(user_id);

        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL DEFAULT ''
        );
    ");

    // Create initial admin user if provided
    $body = getRequestBody();
    $email = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';
    $name = trim($body['name'] ?? 'Admin');

    if ($email && $password) {
        // Check if user already exists
        $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            jsonResponse([
                'ok' => true,
                'message' => 'Database tables created. Admin user already exists.',
            ]);
        }

        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $db->prepare("INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, 'admin')");
        $stmt->execute([$email, $hash, $name]);

        jsonResponse([
            'ok' => true,
            'message' => 'Database initialized and admin user created.',
            'admin_id' => $db->lastInsertId(),
        ]);
    }

    jsonResponse([
        'ok' => true,
        'message' => 'Database tables created. Send email/password/name to create admin user.',
    ]);

} catch (Exception $e) {
    jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
}
