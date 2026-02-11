<?php
/**
 * Returns Replit/integration URL and API key from DB with fallbacks.
 * Use from contact.php and newsletter.php (no auth required).
 */
// DB path relative to this file (public/api/cms/ -> public/cms_data/cms.db)
$GLOBALS['_cms_db_path'] = __DIR__ . '/../../cms_data/cms.db';

function getIntegrationSettings(): array {
    $defaults = [
        'replit_website_url' => 'https://ordrcrm.com/api/webhooks/website',
        'replit_website_api_key' => 'web_b4281fc9a2de0d11c024bdd243ccc8af845ba5477cc136ce',
        'replit_newsletter_url' => 'https://fulfil-crm--nazstudios.replit.app/api/webhooks/newsletter',
        'replit_newsletter_api_key' => 'nws_656be6e3243a33ab05ad56f186fef924858d8798af72b8dc',
    ];
    $path = $GLOBALS['_cms_db_path'];
    if (!is_file($path)) {
        return $defaults;
    }
    try {
        $db = new PDO('sqlite:' . $path);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $db->query("SELECT key, value FROM settings");
        if (!$stmt) {
            return $defaults;
        }
        $rows = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
        return [
            'replit_website_url' => $rows['replit_website_url'] ?? $defaults['replit_website_url'],
            'replit_website_api_key' => $rows['replit_website_api_key'] ?? $defaults['replit_website_api_key'],
            'replit_newsletter_url' => $rows['replit_newsletter_url'] ?? $defaults['replit_newsletter_url'],
            'replit_newsletter_api_key' => $rows['replit_newsletter_api_key'] ?? $defaults['replit_newsletter_api_key'],
        ];
    } catch (Exception $e) {
        return $defaults;
    }
}
