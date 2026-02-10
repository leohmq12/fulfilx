<?php
/**
 * Local development router for PHP's built-in server.
 * Usage: php -S localhost:8000 -t public public/router.php
 * 
 * This replaces .htaccess rules that only work on Apache.
 */

$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// ─── Block direct access to cms_data (database files) ────────────────────────
if (strpos($path, '/cms_data') === 0) {
    http_response_code(403);
    echo "Forbidden";
    return true;
}

// ─── Block PHP execution in uploads directory ────────────────────────────────
if (strpos($path, '/uploads/') === 0 && preg_match('/\.php$/i', $path)) {
    http_response_code(403);
    echo "Forbidden";
    return true;
}

// ─── Serve static files (images, CSS, JS, uploads) directly ─────────────────
// Note: PHP files under /api/ are handled by the router below, not as static files
$filePath = __DIR__ . $path;
if ($path !== '/' && file_exists($filePath) && !is_dir($filePath) && !preg_match('#^/api/.*\.php#', $path)) {
    // Let PHP's built-in server handle static files
    return false;
}

// ─── Route API requests to their PHP handlers ────────────────────────────────
$apiRoutes = [
    '/api/cms/setup.php'    => '/api/cms/setup.php',
    '/api/cms/setup'        => '/api/cms/setup.php',
    '/api/cms/seed.php'     => '/api/cms/seed.php',
    '/api/cms/seed'         => '/api/cms/seed.php',
    '/api/cms/auth.php'     => '/api/cms/auth.php',
    '/api/cms/auth'         => '/api/cms/auth.php',
    '/api/cms/content.php'  => '/api/cms/content.php',
    '/api/cms/content'      => '/api/cms/content.php',
    '/api/cms/media.php'    => '/api/cms/media.php',
    '/api/cms/media'        => '/api/cms/media.php',
    '/api/cms/users.php'    => '/api/cms/users.php',
    '/api/cms/users'        => '/api/cms/users.php',
    '/api/cms/versions.php' => '/api/cms/versions.php',
    '/api/cms/versions'     => '/api/cms/versions.php',
    '/api/cms/activity.php' => '/api/cms/activity.php',
    '/api/cms/activity'     => '/api/cms/activity.php',
    '/api/cms/developer.php' => '/api/cms/developer.php',
    '/api/cms/developer'    => '/api/cms/developer.php',
];

foreach ($apiRoutes as $route => $handler) {
    if (strpos($path, $route) === 0) {
        $handlerPath = __DIR__ . $handler;
        if (file_exists($handlerPath)) {
            require $handlerPath;
            return true;
        }
    }
}

// ─── Default: serve index.html (for SPA routing) ────────────────────────────
// Not needed for API-only testing, but included for completeness
if (file_exists(__DIR__ . '/index.html')) {
    readfile(__DIR__ . '/index.html');
    return true;
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);
return true;
