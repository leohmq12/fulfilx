# CMS Wiring Plan – All Pages, Same UI

**Goal:** Wire every page and every section to the CMS so content is editable in the admin dashboard. **UI stays exactly the same** – only the data source changes (hardcoded → CMS with fallback).

**Approach for each:**
- Use existing hooks: `useContentList`, `useSingleContent`, `useContentBySlug`.
- Keep current JSX and styling; replace `const data = [...]` with `const { data } = useContentList('type', FALLBACK)`.
- Use current hardcoded values as `FALLBACK` so the site works if the CMS is down.

---

## Already wired (done)

| Page | Route | CMS type(s) | Notes |
|------|--------|-------------|--------|
| Team (members + jobs) | `/team`, `/team#jobs` | `team_member`, `job_listing` | Done |
| Blogs index | `/blogs` | `blog_post` | Done |
| Sectors index | `/sectors` | `sector` | Done |

---

## 1. Homepage

| Section | CMS type | Fields used | Action |
|--------|----------|-------------|--------|
| Hero (headline, subheading, CTA, bg image, video) | `homepage` (single) | hero_headline, hero_subheading, hero_cta_text, hero_bg_image, hero_video | `useSingleContent('homepage', fallback)` |
| Stats strip (e.g. 99.97% on-time, etc.) | `homepage` | stats[] | Same single payload |
| History / Mission / Vision tabs | `homepage` | history_text, mission_text, vision_text | Same |
| “Why choose us” features | `homepage` | why_choose_features[] | Same |
| Partner/courier logo rows | `partner` (collection) | Filter by category, use name + logo | `useContentList('partner', fallback)` |
| Testimonials carousel (if any) | `testimonial` | author_name, text, etc. | `useContentList('testimonial', fallback)` |
| Any other homepage blocks | `homepage` or existing types | As per schema | Same pattern |

**File:** `components/layout/home.tsx`  
**UI:** Unchanged; only data from CMS.

---

## 2. About Us

| Section | CMS type | Action |
|--------|----------|--------|
| Hero / main title | New single type `about_us` **or** reuse `site_settings` / a section in `homepage` | Prefer one `about_us` single with hero_title, hero_subtitle, intro_text |
| Partner/testimonial logos carousels | `partner` | `useContentList('partner', fallback)` |
| Any “our story” / team intro copy | `about_us` (single) | `useSingleContent('about_us', fallback)` |

**File:** `app/about-us.tsx`  
**Note:** If we don’t add `about_us`, we can reuse a generic “About” block from `site_settings` or add one optional section to `homepage`. Recommendation: add **about_us** single type (hero, intro, optional sections array).

---

## 3. Services

| Section | CMS type | Action |
|--------|----------|--------|
| Hero (title, breadcrumb) | Could be single `services_page` or hardcode (static) | Optional single type |
| “Core Fulfilment” (D2C, B2B, Amazon, Marketplace) | `service` | `useContentList('service', fallback)` filter category = "Core Fulfilment" |
| “Warehouse & Storage” (General, Food, Dangerous Goods) | `service` | Same, category = "Warehouse & Storage" |
| “Value Added Services” (Kitting, QC, Recommerce, Personalisation) | `service` | Same, category = "Value Added" |
| “Brand & Creative” (Content Creation, Brand Launch, Custom Packaging) | `service` | Same, category = "Brand Creative" |
| “Logistics, Freight & International” | `service` | Same, category = "Logistics" |
| “Technology & Integrations” (Platform, Client Reporting) | `service` | Same, category = "Technology" |
| “We integrate with” logo rows | `partner` | `useContentList('partner', fallback)` filter category = "Integration" |
| “We ship to” / retail logos | `partner` | Filter category = "Retail" (or “Client”) |
| Awards / Accreditations block | Usually in layout; can stay or move to `site_settings` | Optional |

**File:** `app/services.tsx`  
**UI:** Same; data for each section from `service` (by category) and `partner`.

---

## 4. Sectors (detail pages)

| Current state | Action |
|---------------|--------|
| 12 separate files: cosmetics, electronics, … | Replace with **one** dynamic route `app/sectors/[slug].tsx` |
| Each page: hero (title, image), body copy, “Bespoke solutions” section, etc. | Sector content from CMS: `useContentBySlug('sector', slug, fallback)` – title, description, image, page_content (richtext), features[] |
| UI layout | Keep same; only title/description/image/content/features come from CMS. Slug from URL (e.g. `cosmetics` → sector slug `cosmetics`). |

**Files:**  
- Add: `app/sectors/[slug].tsx` (single dynamic page).  
- Remove or redirect: `cosmetics.tsx`, `electronics.tsx`, … (or keep as redirects to `/[slug]` for backwards compatibility).

---

## 5. Blogs (detail page)

| Current state | Action |
|---------------|--------|
| Single file `power-of-integration.tsx` | Replace with **one** dynamic route `app/blogs/[slug].tsx` |
| Content: title, description, image, body | `useContentBySlug('blog_post', slug, fallback)` – title, description, image, content (richtext), author, publish_date |
| UI | Keep same; only data from CMS. |

**Files:**  
- Add: `app/blogs/[slug].tsx`.  
- `power-of-integration.tsx` → redirect to `/blogs/the-power-of-integration` or keep as alias.

---

## 6. Contact

| Section | CMS type | Action |
|--------|----------|--------|
| Contact info (phone, email, address, social links) | `contact_info` (single) | `useSingleContent('contact_info', fallback)` – use in sidebar/footer and any “get in touch” block |
| Form (submit behaviour) | N/A | Keep existing; no CMS |
| Any static “Get in touch” / office copy | `contact_info` | Same single payload |

**File:** `app/contact.tsx`  
**UI:** Same; displayed contact details from CMS.

---

## 7. Pricing

| Section | CMS type | Action |
|--------|----------|--------|
| Pricing cards (e.g. Pick & Pack £1.27, etc.) | `pricing_plan` | `useContentList('pricing_plan', fallback)` – title, price, unit, features[], is_featured |
| Shipping calculator / rates | External JSON or keep as is | Can stay file-based or later move to CMS if you add a “rates” type |
| UI | Same | Only list of plans from CMS |

**File:** `app/pricing.tsx`

---

## 8. Locations

| Section | CMS type | Action |
|--------|----------|--------|
| List of locations (country, city, address, email, phone, flag) | `location` | `useContentList('location', fallback)` |
| Map marker positions | `location` | Use marker_x, marker_y from each location (already in schema) |
| UI | Same | Markers and list from CMS; fallback for missing marker coords |

**File:** `app/locations.tsx`

---

## 9. Our Couriers

| Section | CMS type | Action |
|--------|----------|--------|
| Courier logos / names | `partner` | `useContentList('partner', fallback)` filter category = "Courier" |
| UI | Same | Grid from CMS |

**File:** `app/our-couriers.tsx`

---

## 10. Return Policy

| Section | CMS type | Action |
|--------|----------|--------|
| Hero title | `return_policy` (single) | Optional field or same as first section title |
| Policy sections (title + content per block) | `return_policy` | `useSingleContent('return_policy', fallback)` – sections[] with title, content |
| UI | Same | Sections from CMS |

**File:** `app/return-policy.tsx`

---

## 11. Sustainability

| Section | CMS type | Action |
|--------|----------|--------|
| Hero text | `sustainability` (single) | hero_text |
| Content sections (title, content, bullets) | `sustainability` | sections[] |
| UI | Same | `useSingleContent('sustainability', fallback)` |

**File:** `app/sustainability.tsx`

---

## 12. Products

| Section | CMS type | Action |
|--------|----------|--------|
| Product categories / filters | Could be new type `product_category` or reuse `sector` | Either add a small collection type or use tags on a generic “product” type; or keep static if rarely changed |
| Product list / placeholders | Optional `product` or static | Same UI; data from CMS if we add types |

**File:** `app/products.tsx`  
**Note:** If products are placeholder only, we can wire later or leave static until you define the data model.

---

## 13. Global / layout

| Item | CMS type | Action |
|------|----------|--------|
| Navbar links | `site_settings` | `useSingleContent('site_settings', fallback)` – nav_items[] |
| Footer links, newsletter text, copyright | `site_settings` | Same – footer_quick_links, newsletter_heading, copyright_text |
| Awards / accreditations (if in layout) | `site_settings` or dedicated block | Optional field or keep as is |

**Files:** `components/layout/navbar.tsx`, `components/layout/footer.tsx`, `components/layout/awards-accreditations.tsx`  
**UI:** Same; links and labels from CMS.

---

## Content types to add (if missing)

| Type | Purpose |
|------|--------|
| `about_us` (single) | Hero, intro, any “about” copy and optional sections. |

All other types (homepage, contact_info, site_settings, sustainability, return_policy, service, sector, blog_post, team_member, job_listing, testimonial, pricing_plan, location, partner) already exist in `lib/content-types.ts`.

---

## Implementation order (recommended)

1. **Single-type pages (quick wins)**  
   Return Policy, Sustainability, Contact (contact_info), then Homepage (homepage).

2. **Dynamic routes**  
   Sectors detail `[slug].tsx`, then Blog detail `[slug].tsx`.

3. **Collection-driven pages**  
   Pricing (pricing_plan), Locations (location), Our Couriers (partner).

4. **Services**  
   Wire each section to `service` by category; optionally add `services_page` single for hero.

5. **About Us**  
   Add `about_us` and wire; partner logos from `partner`.

6. **Layout**  
   Navbar + Footer + Awards from `site_settings` (and partners if used in layout).

7. **Products**  
   Last, or leave static until you define product data.

---

## Summary

- **Possible:** Yes – every section can be wired to the CMS.
- **UI:** Stays the same; we only swap data source to CMS + fallback.
- **Effort:** ~15–20 pages/screens plus layout; most work is repetitive (add hook + fallback, keep JSX).
- **Risk:** Low if we keep fallbacks and existing types; add only `about_us` (and optionally `services_page` / product types) as needed.

If you want to proceed, we can do it phase by phase (e.g. Phase 1: all single-type pages + dynamic sector/blog, then Phase 2: Services, then Phase 3: layout + rest).
