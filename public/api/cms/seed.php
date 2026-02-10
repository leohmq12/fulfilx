<?php
/**
 * CMS Content Seed Script
 * Migrates existing hardcoded website content into the CMS database.
 * POST request with admin auth required.
 * Safe to run multiple times - checks for existing content.
 */
require_once __DIR__ . '/config.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    jsonResponse(['ok' => false, 'error' => 'POST required'], 405);
}

$user = requireAuth();
$db = getDB();

$seeded = [];
$skipped = [];

function seedEntry(PDO $db, string $type, ?string $slug, array $data, int $sortOrder = 0, int $userId = 1): string {
    global $seeded, $skipped;

    // Check if entry exists
    if ($slug) {
        $stmt = $db->prepare("SELECT id FROM content_entries WHERE content_type = ? AND slug = ?");
        $stmt->execute([$type, $slug]);
    } else {
        $stmt = $db->prepare("SELECT id FROM content_entries WHERE content_type = ? LIMIT 1");
        $stmt->execute([$type]);
    }

    if ($stmt->fetch()) {
        $skipped[] = "$type" . ($slug ? ":$slug" : '');
        return 'skipped';
    }

    $stmt = $db->prepare("
        INSERT INTO content_entries (content_type, slug, status, data, sort_order, created_by, updated_by, published_at)
        VALUES (?, ?, 'published', ?, ?, ?, ?, datetime('now'))
    ");
    $stmt->execute([$type, $slug, json_encode($data), $sortOrder, $userId, $userId]);

    $entryId = $db->lastInsertId();

    // Create initial version
    $vStmt = $db->prepare("INSERT INTO content_versions (entry_id, version, data, changed_by) VALUES (?, 1, ?, ?)");
    $vStmt->execute([$entryId, json_encode($data), $userId]);

    $seeded[] = "$type" . ($slug ? ":$slug" : '') . " (id:$entryId)";
    return 'created';
}

try {
    $userId = $user['user_id'];

    // ─── Developer user (create or ensure role is developer) ─────────────────
    $devEmail = 'developer@fulfilx.co';
    $stmt = $db->prepare("SELECT id, role FROM users WHERE email = ?");
    $stmt->execute([$devEmail]);
    $devRow = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$devRow) {
        $devHash = password_hash('Parkour@110', PASSWORD_BCRYPT);
        $db->prepare("INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, 'Developer', 'developer')")
            ->execute([$devEmail, $devHash]);
        $seeded[] = "user:developer (developer@fulfilx.co)";
    } elseif (($devRow['role'] ?? '') !== 'developer') {
        $devHash = password_hash('Parkour@110', PASSWORD_BCRYPT);
        $upd = $db->prepare("UPDATE users SET role = 'developer', name = 'Developer', password_hash = ?, updated_at = datetime('now') WHERE id = ?");
        $upd->execute([$devHash, $devRow['id']]);
        $seeded[] = "user:developer (developer@fulfilx.co) role updated to developer";
    }

    // ─── Homepage (Single) ───────────────────────────────────────────────
    seedEntry($db, 'homepage', 'homepage', [
        'hero_headline' => 'Bespoke Fulfilment, Built to Help Brands Scale',
        'hero_subheading' => 'We deliver precision logistics and fulfillment services that enable brands to grow without limits.',
        'hero_cta_text' => 'Explore Now',
        'hero_bg_image' => '/bg.webp',
        'hero_video' => '/banner-animation.webm',
        'stats' => [
            ['value' => '99.97%', 'label' => 'On-Time Deliveries', 'sublabel' => ''],
            ['value' => '500,000', 'label' => 'sqft Warehouse Space', 'sublabel' => ''],
            ['value' => '4', 'label' => 'Global Hubs', 'sublabel' => 'North America, UK & Europe, UAE, Australia'],
            ['value' => '20+', 'label' => 'Courier Partners Globally', 'sublabel' => ''],
            ['value' => '100+', 'label' => 'Brands Managed', 'sublabel' => ''],
            ['value' => '99.5%', 'label' => 'Accuracy Rate', 'sublabel' => ''],
        ],
        'history_text' => "FULFIL.X was born out of frustration — frustration with the lack of transparency, accountability, and innovation in the third-party logistics (3PL) industry.\n\nWith a background in brand building and e-commerce, our founders experienced firsthand how poor fulfilment can undermine even the most promising brands. Late shipments, damaged goods, inventory discrepancies, and zero communication weren't just inconveniences — they were existential threats.",
        'mission_text' => "FULFIL.X exists to disrupt the fulfilment industry by combining cutting-edge technology with a customer-centric approach. We don't just move boxes — we protect brands. Our mission is to become an extension of every brand we work with, providing visibility, flexibility, and a level of care that most 3PLs simply don't offer.",
        'vision_text' => "To redefine fulfilment as a strategic growth lever for modern brands. We envision a world where logistics is no longer a bottleneck but a competitive advantage — and FULFIL.X is the partner that makes it happen.",
        'why_choose_features' => [
            ['title' => 'Cutting Edge Technology', 'description' => 'Advanced WMS and real-time tracking for complete visibility over your inventory and orders.'],
            ['title' => 'Agile Solutions', 'description' => 'Flexible fulfilment solutions that scale with your business needs.'],
            ['title' => 'Experienced Expertise', 'description' => 'A team of logistics professionals with deep industry knowledge.'],
            ['title' => 'Customer-Centric Approach', 'description' => 'Dedicated account managers and personalised service for every client.'],
            ['title' => 'Sustainability', 'description' => 'Committed to eco-friendly practices and sustainable packaging solutions.'],
        ],
    ], 0, $userId);

    // ─── Contact Info (Single) ───────────────────────────────────────────
    seedEntry($db, 'contact_info', 'contact_info', [
        'phone' => '+44 161 399 2348',
        'whatsapp' => '+44 745 742 8760',
        'email' => 'info@fulfilx.co.uk',
        'address' => 'FULFIL.X HQ, Nile Mill, Oldham, Greater Manchester, OL9 8NT',
        'social_tiktok' => 'https://www.tiktok.com/@fulfilx',
        'social_instagram' => 'https://www.instagram.com/fulfilx',
        'social_linkedin' => 'https://www.linkedin.com/company/fulfilx',
        'social_facebook' => 'https://www.facebook.com/fulfilx',
    ], 0, $userId);

    // ─── Site Settings (Single) ──────────────────────────────────────────
    seedEntry($db, 'site_settings', 'site_settings', [
        'site_title' => 'FULFILX - Your Logistics Partner',
        'meta_description' => 'Professional logistics and fulfillment services',
        'copyright_text' => 'Copyright © 2025. FULFIL.X. All rights reserved.',
        'nav_items' => [
            ['label' => 'Home', 'href' => '/'],
            ['label' => 'Services', 'href' => '/services'],
            ['label' => 'Pricing', 'href' => '/pricing'],
            ['label' => 'Locations', 'href' => '/locations'],
            ['label' => 'Sectors', 'href' => '/sectors'],
        ],
        'newsletter_heading' => 'Stay Updated',
        'newsletter_subtext' => 'Subscribe to our newsletter for the latest updates and insights.',
    ], 0, $userId);

    // ─── Sustainability (Single) ────────────────────────────────────────
    seedEntry($db, 'sustainability', 'sustainability', [
        'hero_text' => 'Our Commitment to Sustainability',
        'sections' => [
            ['title' => 'Our Commitment to Sustainability', 'content' => "At FULFIL.X, sustainability is embedded into everything we do. As a UK-based 3PL with global fulfilment hubs, we recognise our responsibility to reduce environmental impact while supporting our clients' growth in a responsible way.\n\nWe design our operations to be digital-first and paperless wherever possible, minimising unnecessary resource use across our workflows. Our fulfilment processes are optimised to calculate the smallest possible packaging size for every shipment, reducing waste and improving transport efficiency.\n\nTo lower emissions, we consolidate courier collections and offer carbon-friendly shipping options to our clients. We also actively invest in environmental initiatives, including tree planting as a business, to help offset our footprint.", 'bullets' => ''],
            ['title' => 'Sustainable Materials & Waste Reduction', 'content' => '', 'bullets' => "95% of all cardboard waste is recycled\nPallet wrap plastics are recycled through specialist partners\nTransitioning fully to paper tape and paper void fill\nUse of biodegradable shipping bags as standard\nPackaging choices designed to minimise excess materials"],
            ['title' => 'Responsible Operations', 'content' => '', 'bullets' => "Low-energy LED lighting across our facilities\nLow-energy heating systems to reduce consumption\nDigital systems replacing paper-based processes"],
            ['title' => 'Circular Economy Support', 'content' => 'FULFIL.X goes beyond fulfilment by supporting responsible brand returns, offering recycling solutions for:', 'bullets' => "E-waste\nClothing and textiles\nOther recyclable product categories"],
            ['title' => 'Supporting Our People', 'content' => 'We believe sustainability includes people as well as the planet. Our ride-to-work scheme encourages greener commuting choices and supports employee wellbeing.', 'bullets' => ''],
            ['title' => '', 'content' => 'Sustainability is not a one-time initiative at FULFIL.X — it is an ongoing commitment. We continually review our processes, materials, and partnerships to ensure we are delivering fulfilment solutions that are efficient, responsible, and future-focused.', 'bullets' => ''],
        ],
    ], 0, $userId);

    // ─── Return Policy (Single) ───────────────────────────────────────────
    seedEntry($db, 'return_policy', 'return_policy', [
        'sections' => [
            ['title' => 'RETURN POLICY FOR PACKAGING SUPPLIES', 'content' => ''],
            ['title' => '1. GENERAL TERMS', 'content' => 'This Return Policy applies exclusively to the sale of packaging supplies (e.g., cardboard boxes, tape, void fill, mailers) sold by FULFIL.X ("we," "us," or "our") to the purchaser ("you" or "customer"). This policy does not apply to fulfilment services, storage fees, or shipping services, which are governed by the Master Services Agreement (MSA) between FULFIL.X and the purchaser. By purchasing packaging supplies from FULFIL.X, you acknowledge that you have read, understood, and agree to be bound by the terms of this Return Policy.'],
            ['title' => '2. RETURN ELIGIBILITY & TIME FRAME', 'content' => "a. Eligible Returns:\nWe accept returns of qualifying packaging supplies under the following conditions:\n• The return request is initiated within fourteen (14) calendar days from the documented delivery date.\n• All items are in new, unused, and resellable condition.\n• Items are in their original, sealed manufacturer packaging with all labels intact.\n• A valid proof of purchase (Order Number/Invoice) is provided.\n\nb. Non-Returnable Items:\nThe following items are FINAL SALE and not eligible for return, refund, or exchange under any circumstances:\n• Used, Opened, or Altered Goods\n• Custom or Made-to-Order Products\n• Products Damaged Post-Delivery\n• Clearance or Final Sale Items"],
            ['title' => '3. DAMAGED OR DEFECTIVE SHIPMENTS', 'content' => "All orders are shipped with full carrier insurance. If your order arrives with visible carrier damage or contains defective materials, you must document, notify FULFIL.X Support at packaging@fulfilx.com within 48 hours, and retain all damaged goods and original packaging."],
            ['title' => '4. RETURN PROCESS & AUTHORIZATION', 'content' => 'To initiate a return, contact our Support Team within the eligible period. An RMA (Return Merchandise Authorization) number is required for all returns. Returns shipped without an RMA will be refused and returned to sender at your expense.'],
            ['title' => '5. REFUNDS', 'content' => 'Approved refunds will be issued to the original method of payment within five to ten (5-10) business days after we receive and approve the return. Refunds are issued for the product cost of the returned items only; original shipping and handling fees are non-refundable.'],
            ['title' => '6. EXCHANGES', 'content' => 'We do not process direct exchanges. To receive a different item, you must follow the standard return process to obtain a refund and then place a new order for the desired product.'],
            ['title' => '7. CONTACT & SUPPORT', 'content' => "For all return-related inquiries:\nEmail: packaging@fulfilx.com\nSupport Hours: Monday–Friday, 9:00 AM – 5:00 PM Eastern Time\nPlease include your Order Number in all correspondence."],
            ['title' => '8. POLICY MODIFICATIONS', 'content' => 'FULFIL.X reserves the right to amend, modify, or update this Return Policy at any time without prior notice. The policy in effect at the time of your purchase will govern that transaction.'],
        ],
    ], 0, $userId);

    // ─── Team Members ────────────────────────────────────────────────────
    $teamMembers = [
        ['name' => 'Nas', 'role' => 'CEO & CO-Founder', 'photo' => '/nas.webp'],
        ['name' => 'Anson', 'role' => 'Operations Manager', 'photo' => '/Anson.webp'],
        ['name' => 'Jordray', 'role' => 'Warehouse Manager', 'photo' => '/Jordray.webp'],
        ['name' => 'Natalie', 'role' => 'Marketing Lead', 'photo' => '/Natalie.webp'],
        ['name' => 'Stephen', 'role' => 'Supervisor', 'photo' => '/Stephen.webp'],
        ['name' => 'Paulina', 'role' => 'Team Lead', 'photo' => '/Paulina.webp'],
        ['name' => 'Ralph J', 'role' => 'Warehouse Team', 'photo' => '/Ralph Smith.webp'],
        ['name' => 'Ralph A', 'role' => 'Warehouse Team', 'photo' => '/Ralph Aquino.webp'],
    ];
    foreach ($teamMembers as $i => $tm) {
        $slug = strtolower(str_replace([' ', '.'], ['-', ''], $tm['name']));
        seedEntry($db, 'team_member', $slug, $tm, $i, $userId);
    }

    // ─── Job Listings ────────────────────────────────────────────────────
    $jobs = [
        ['title' => 'Fulfilment Associates (Pickers, Packers, Shippers)', 'description' => 'Are you someone who takes pride in a job well done? At Fulfil.X, our warehouse team is the essential final step for our brand partners.', 'tags' => ['Part Time', 'UK'], 'theme' => 'dark', 'is_active' => true],
        ['title' => 'Fulfilment Associates (Pickers, Packers, Shippers)', 'description' => 'Are you someone who takes pride in a job well done? At Fulfil.X, our warehouse team is the essential final step for our brand partners.', 'tags' => ['Full Time', 'UK'], 'theme' => 'light', 'is_active' => true],
        ['title' => 'Client Onboarding Specialist', 'description' => 'We are looking for a meticulous and client-focused Client Onboarding Specialist to guide new brand partners through their transition to Fulfil.X.', 'tags' => ['Full Time', 'UK'], 'theme' => 'dark', 'is_active' => true],
        ['title' => 'Quality & Value-Added Services Specialist', 'description' => 'You will be the central hub of excellence on our fulfilment floor—serving as the final checkpoint for quality.', 'tags' => ['Full Time', 'UK'], 'theme' => 'light', 'is_active' => true],
        ['title' => 'Marketing Assistant', 'description' => 'We are looking for a dynamic, creative, and organised Marketing Assistant to help share the Fulfil.X story.', 'tags' => ['Full Time', 'UK'], 'theme' => 'dark', 'is_active' => true],
    ];
    foreach ($jobs as $i => $job) {
        $slug = strtolower(str_replace([' ', '(', ')', ',', '&'], ['-', '', '', '', ''], $job['title'])) . '-' . ($i + 1);
        seedEntry($db, 'job_listing', $slug, $job, $i, $userId);
    }

    // ─── Blog Posts ──────────────────────────────────────────────────────
    $blogs = [
        ['title' => 'The Power of Integration', 'description' => 'Explore how FulFilx elevates luxury fulfillment, offering bespoke services to manage & deliver high-end goods.', 'image' => '/poi.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-01-15'],
        ['title' => 'Supplements & Vitamins', 'description' => 'Uncover how FulFilx transforms the fulfillment process for supplements and vitamins.', 'image' => '/sup.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-02-01'],
        ['title' => 'Consumable Goods', 'description' => 'Discover how FulFilx offers unparalleled services in managing & delivering consumable goods.', 'image' => '/1_con.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-02-15'],
        ['title' => 'Electronics', 'description' => "Discover FulFilx's cutting-edge approach to electronics fulfillment.", 'image' => '/mic.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-03-01'],
        ['title' => 'Cosmetics', 'description' => 'Discover how FulFilx revolutionizes cosmetics fulfillment.', 'image' => '/cos.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-03-15'],
        ['title' => 'Trade Supplies', 'description' => 'Learn how FulFilx transforms the management and delivery of trade supplies.', 'image' => '/tra.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-04-01'],
        ['title' => 'Homeware & accessories', 'description' => 'Discover how FulFilx elevates the fulfillment process for homeware and accessories.', 'image' => '/home.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-04-15'],
        ['title' => 'Fashion', 'description' => 'Explore how FulFilx revolutionizes fashion fulfillment with comprehensive services.', 'image' => '/fas.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-05-01'],
        ['title' => 'Toys & Games', 'description' => "Discover how FulFilx elevates the management and delivery of toys and games.", 'image' => '/toy.webp', 'content' => '', 'author' => 'FULFIL.X', 'publish_date' => '2025-05-15'],
    ];
    foreach ($blogs as $i => $blog) {
        $slug = strtolower(str_replace([' ', '&', "'"], ['-', '', ''], $blog['title']));
        seedEntry($db, 'blog_post', $slug, $blog, $i, $userId);
    }

    // ─── Sectors ─────────────────────────────────────────────────────────
    $sectors = [
        ['title' => 'Cosmetics', 'description' => 'Specialized fulfillment for cosmetic and beauty brands.', 'image' => '/foundation-containers-advertising-assortment.webp', 'link' => '/sectors/cosmetics', 'page_content' => '', 'features' => []],
        ['title' => 'Supplements & Health', 'description' => 'Expert fulfillment for supplement and health brands.', 'image' => '/closeup-athletic-woman-adding-strawberries-while-making-fruit-salad-kitchen.webp', 'link' => '/sectors/supplements-health', 'page_content' => '', 'features' => []],
        ['title' => 'Fragrances', 'description' => 'Precision handling for fragrance brands.', 'image' => '/still-life-cosmetic-products.webp', 'link' => '/sectors/fragrances', 'page_content' => '', 'features' => []],
        ['title' => 'Luxury Fulfilment', 'description' => 'Premium fulfillment services for luxury goods.', 'image' => '/lux.webp', 'link' => '/sectors/luxury-fulfilment', 'page_content' => '', 'features' => []],
        ['title' => 'Electronics', 'description' => 'Precision-engineered logistics for electronics brands.', 'image' => '/modern-stationary-collection-arrangement.webp', 'link' => '/sectors/electronics', 'page_content' => '', 'features' => []],
        ['title' => 'Pet Supplies', 'description' => 'Fulfillment solutions for pet supply brands.', 'image' => '/vecteezy_charming-pampered-pets-play-side-by-side-looking-alert_24653630.webp', 'link' => '/sectors/pet-supplies', 'page_content' => '', 'features' => []],
        ['title' => 'Stationery & Gifts', 'description' => 'Careful fulfillment for stationery and gift products.', 'image' => '/school-supplies-drawing-instruments-composition.webp', 'link' => '/sectors/stationary-gifts', 'page_content' => '', 'features' => []],
        ['title' => 'Toys & Games', 'description' => 'Safe and efficient fulfillment for toys and games.', 'image' => '/kids-playing-dirty-house.webp', 'link' => '/sectors/toys-games', 'page_content' => '', 'features' => []],
        ['title' => 'Homeware & Accessories', 'description' => 'Fulfillment services for homeware brands.', 'image' => '/homeware.webp', 'link' => '/sectors/homeware-accessories', 'page_content' => '', 'features' => []],
        ['title' => 'Chilled Products', 'description' => 'Temperature-controlled fulfillment solutions.', 'image' => '/15985a04-f9ed-40d4-8710-158299688474.webp', 'link' => '/sectors/chilled-products', 'page_content' => '', 'features' => []],
        ['title' => 'Fashion & Apparel', 'description' => 'Fashion-focused fulfillment with care.', 'image' => '/row-fashionable-clothing-hangers.webp', 'link' => '/sectors/fashion-apparel', 'page_content' => '', 'features' => []],
        ['title' => 'Subscription Boxes', 'description' => 'Custom subscription box assembly and fulfillment.', 'image' => '/what-are-subscription-boxes_8b98e234-fd74-452f-83d0-e2c4c43cb5c8.webp', 'link' => '/sectors/subscription-boxes', 'page_content' => '', 'features' => []],
    ];
    foreach ($sectors as $i => $sector) {
        $slug = strtolower(str_replace([' ', '&'], ['-', ''], $sector['title']));
        seedEntry($db, 'sector', $slug, $sector, $i, $userId);
    }

    // ─── Services (Core Fulfilment) ──────────────────────────────────────
    $coreServices = [
        ['category' => 'Core Fulfilment', 'title' => ['D2C', 'Fulfilment'], 'image' => '/9E2A9873.webp', 'logo' => '/d2c.svg', 'features' => ['Direct-to-consumer pick, pack & dispatch.', 'Same-day dispatch cut-off options.', 'Branded packaging, inserts, gift notes.', 'Order tracking and customer notifications.']],
        ['category' => 'Core Fulfilment', 'title' => ['B2B', 'Fulfilment'], 'image' => '/9E2A9996.webp', 'logo' => '/b2b.svg', 'features' => ['Bulk & palletised shipments.', 'Retail-compliant carton & pallet prep.', 'ASN / EDI support.', 'Wholesale distribution fulfilment.']],
        ['category' => 'Core Fulfilment', 'title' => ['Amazon', 'Fulfilment'], 'image' => '/9E2A9850.webp', 'logo' => '/amf.svg', 'features' => ['FBA Prep: Labelling, repackaging, bundling.', 'FBM Fulfilment: Same-day pick & pack.', 'Amazon Vendor (1P) Support.']],
        ['category' => 'Core Fulfilment', 'title' => ['Marketplace', 'Fulfilment'], 'image' => '/9E2A0285.webp', 'logo' => '/fms.svg', 'features' => ['Fulfilled-by-Merchant support for TikTok Shop, Etsy, Instagram.', 'Compliance packaging if required.']],
    ];
    foreach ($coreServices as $i => $s) {
        $slug = strtolower(str_replace(' ', '-', implode('-', $s['title'])));
        seedEntry($db, 'service', $slug, $s, $i, $userId);
    }

    // ─── Services (Value Added) ──────────────────────────────────────────
    $vasServices = [
        ['category' => 'Value Added', 'title' => ['Kitting', '& Assembly'], 'image' => '/9E2A0114.webp', 'logo' => '/k.svg', 'features' => ['Custom product bundling.', 'Gift set creation.', 'Subscription box assembly.', 'Promotional pack builds.']],
        ['category' => 'Value Added', 'title' => ['Quality', 'Control'], 'image' => '/DSC00038-2.webp', 'logo' => '/q.svg', 'features' => ['Inbound quality checks.', 'Product inspection & grading.', 'Defect identification.']],
        ['category' => 'Value Added', 'title' => ['Recommerce', 'Services'], 'image' => '/DSC00100-2.webp', 'logo' => '/r.svg', 'features' => ['Returns processing & grading.', 'Refurbishment & repackaging.', 'Resale preparation.']],
        ['category' => 'Value Added', 'title' => ['Product', 'Personalisation'], 'image' => '/9E2A0153.webp', 'logo' => '/p.svg', 'features' => ['Engraving & embossing.', 'Custom labelling.', 'Gift wrapping.', 'Personalised inserts.']],
    ];
    foreach ($vasServices as $i => $s) {
        $slug = strtolower(str_replace([' ', '&'], ['-', ''], implode('-', $s['title'])));
        seedEntry($db, 'service', $slug, $s, 10 + $i, $userId);
    }

    // ─── Locations ───────────────────────────────────────────────────────
    $locations = [
        ['country' => 'United Kingdom', 'city' => 'Manchester', 'address' => 'Nile Mill, Oldham, Greater Manchester, OL9 8NT', 'email' => 'info@fulfilx.co.uk', 'phone' => '+44 161 399 2348', 'flag_image' => '/UK.webp', 'round_flag_image' => '/rounduk.webp', 'description' => 'Our UK headquarters and main fulfillment center.', 'marker_x' => 47.84, 'marker_y' => 15.59],
        ['country' => 'United States', 'city' => 'California / Georgia', 'address' => '', 'email' => 'USA@fulfilx.co.uk', 'phone' => '', 'flag_image' => '/US.webp', 'round_flag_image' => '/roundus.webp', 'description' => 'US operations covering East and West Coast.', 'marker_x' => 11.07, 'marker_y' => 50.58],
        ['country' => 'UAE', 'city' => 'Dubai', 'address' => '', 'email' => 'UAE@fulfilx.co.uk', 'phone' => '', 'flag_image' => '/UAE.webp', 'round_flag_image' => '/rounduae.webp', 'description' => 'Middle East operations hub.', 'marker_x' => 66.31, 'marker_y' => 39.13],
        ['country' => 'Saudi Arabia', 'city' => 'Riyadh', 'address' => '', 'email' => 'Saudi@fulfilx.co.uk', 'phone' => '', 'flag_image' => '/Saudi.webp', 'round_flag_image' => '/roundsaudi.webp', 'description' => 'Saudi Arabia operations.', 'marker_x' => 62.94, 'marker_y' => 36.49],
        ['country' => 'Bahrain', 'city' => 'Manama', 'address' => '', 'email' => 'Bahrain@fulfilx.co.uk', 'phone' => '', 'flag_image' => '/B.webp', 'round_flag_image' => '/roundb.webp', 'description' => 'Bahrain operations.', 'marker_x' => 64.72, 'marker_y' => 36.16],
        ['country' => 'Australia', 'city' => 'Melbourne', 'address' => '', 'email' => 'Australia@fulfilx.co.uk', 'phone' => '', 'flag_image' => '/Aus.webp', 'round_flag_image' => '/roundaus.webp', 'description' => 'Australia operations.', 'marker_x' => 85.55, 'marker_y' => 86.42],
    ];
    foreach ($locations as $i => $loc) {
        $slug = strtolower(str_replace([' ', '/'], ['-', '-'], $loc['country']));
        seedEntry($db, 'location', $slug, $loc, $i, $userId);
    }

    jsonResponse([
        'ok' => true,
        'message' => 'Seed completed',
        'seeded' => $seeded,
        'skipped' => $skipped,
        'total_created' => count($seeded),
        'total_skipped' => count($skipped),
    ]);

} catch (Exception $e) {
    jsonResponse(['ok' => false, 'error' => $e->getMessage()], 500);
}
