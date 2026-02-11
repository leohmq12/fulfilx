# Deploy FulfilX (Web + CMS) to Hostinger

This guide walks you through deploying the FulfilX site and PHP CMS to **Hostinger** shared hosting (or similar Apache/PHP hosting).

---

## What You’re Deploying

| Part | Technology | Role |
|------|------------|------|
| **Frontend** | Expo (React) static build | SPA: home, services, contact, admin UI, etc. |
| **CMS API** | PHP 7.4+ (Apache) | `/api/cms/*` – content, media, auth, users |
| **Database** | SQLite | Stored in `public/cms_data/cms.db` |
| **Uploads** | Files on disk | Stored in `public/uploads/` |

The site runs from a **single document root** (e.g. `public_html`) that contains both the built SPA and the PHP API.

---

## Prerequisites

- Hostinger account with **PHP** (7.4 or 8.x) and **Apache**.
- **Node.js** (v18+) and **npm** on your computer for building.
- **FTP/SFTP** or **File Manager** access (Hostinger provides both).

---

## Step 1: Build the Frontend Locally

On your machine, in the project root:

```bash
cd d:\StratonAlly\Code\fulfilx
npm install
npm run build:web
```

This runs `expo export --platform web` and writes the static site (usually into **`dist/`**).

- If the output is in another folder (e.g. `web-build/`), use that folder in the next step instead of `dist/`.

---

## Step 2: Merge Build into `public/`

The server’s document root must contain:

- The built SPA: `index.html` + JS/CSS assets (from `dist/`).
- The CMS: `api/` (PHP) and existing `public` assets (images, fonts, etc.).

**On Windows (PowerShell):**

```powershell
# From project root
Copy-Item -Path "dist\*" -Destination "public\" -Recurse -Force
```

**On macOS/Linux (bash):**

```bash
cp -R dist/* public/
```

After this, `public/` should contain:

- `index.html` (from the build)
- `_expo/` (or similar asset folders from the build)
- `api/` (PHP CMS – already there), **including** `api/.htaccess` (so PHP runs for all `/api/*.php` requests)
- All existing images, SVGs, `uploads/`, etc.

Do **not** overwrite or remove `public/api/` when copying. Ensure **`public/api/.htaccess`** is uploaded so the server executes PHP instead of serving it as text.

---

## Step 3: Prepare CMS Data and Uploads on the Server

The CMS expects:

1. **Writable directory for SQLite DB:**  
   `public/cms_data/`  
   File: `cms_data/cms.db` (created on first setup).

2. **Writable directory for uploads:**  
   `public/uploads/`

**Option A – Create on server after first upload**

- Upload the rest of the site first (Step 4).
- In Hostinger **File Manager**, inside `public_html`:
  - Create folder: `cms_data`
  - Create folder: `uploads`
- Set permissions:
  - `cms_data` → **755** (or **775** if 755 doesn’t allow PHP to create the DB)
  - `uploads` → **755** or **775**

**Option B – Create locally and upload**

- Locally, in `public/`:
  - Create `cms_data` (can be empty; no need to commit `cms.db`).
  - Ensure `uploads` exists (empty or with a placeholder).
- Upload `public/` including these folders, then set the same permissions as above on the server.

---

## Step 4: Upload to Hostinger

1. Log in to **Hostinger** → **hPanel**.
2. Open **Files** → **File Manager** (or use FTP/SFTP with the credentials from Hostinger).
3. Go to **`public_html`** (or the domain’s document root you use for this site).
4. Upload the **contents** of your local `public/` folder into this root:
   - So that `public_html/index.html` exists.
   - So that `public_html/api/cms/` contains the PHP files.
   - So that `public_html/cms_data/` and `public_html/uploads/` exist and are writable.

Do **not** upload a parent folder named `public`; only its contents.

**Using FTP:**  
Connect to the host (e.g. `ftp.yourdomain.com`), user/password from Hostinger, then upload the contents of `public/` into `public_html/`.

---

## Step 5: Set Permissions

In File Manager (or FTP), set:

- **`cms_data`** → **755** (or **775** if your host requires it for PHP to create/write the DB).
- **`uploads`** → **755** or **775**.

If you get “unable to open database” or “permission denied” when running setup, try **775** for `cms_data` and ensure the PHP process user can write there.

---

## Step 6: (Optional) Set JWT Secret for Production

The CMS uses a JWT secret (in `public/api/cms/config.php`). For production you can set it via an environment variable so it’s not hardcoded.

- **If Hostinger allows env vars** (e.g. in hPanel or via `.env`):
  - Set:  
    `CMS_JWT_SECRET` = a long random string (e.g. 32+ characters).
- **If not**, edit `public/api/cms/config.php` before upload and replace the default:

  ```php
  define('JWT_SECRET', getenv('CMS_JWT_SECRET') ?: 'YOUR_LONG_RANDOM_SECRET_HERE');
  ```

Use a different, strong value than the default `fulfilx_cms_CHANGE_THIS...`.

---

## Step 7: (Recommended) Block Direct Access to CMS Data

To prevent anyone from downloading your SQLite database or listing `cms_data`/`uploads`, add these lines **at the top** of your `.htaccess` in `public_html` (before the existing `RewriteEngine On` block):

```apache
# Deny web access to CMS database and sensitive dirs
<IfModule mod_authz_core.c>
  RedirectMatch 403 ^/cms_data
</IfModule>
```

If your host doesn’t support `RedirectMatch`, you can use:

```apache
RewriteRule ^cms_data - [F,L]
```

Then keep your existing SPA rewrite rules below. This only blocks direct browser access to `/cms_data`; the PHP API can still read/write the DB via the filesystem.

---

## Step 8: Ensure Apache Serves PHP and Rewrites

Hostinger shared hosting usually has this already:

- **PHP** is enabled for `.php` files.
- **mod_rewrite** is on (needed for your `.htaccess`).

Your existing **`.htaccess`** in `public/` (now in `public_html/`) should:

- Rewrite non-file, non-dir requests to `index.html` (SPA).
- Leave real files (e.g. `api/cms/content.php`) untouched so Apache serves them as PHP.

If the SPA or API doesn’t work:

- Confirm **.htaccess** is uploaded and that **AllowOverride** is allowed (Hostinger usually allows this for `public_html`).
- Confirm PHP version in hPanel is 7.4 or 8.x.

---

## Step 9: Run CMS Setup and Seed (One-Time)

The CMS needs tables and (optionally) seed data.

**9.1 – Create tables and first admin user**

Call the setup endpoint **once** (e.g. with Postman, or browser console on your site):

- **URL:**  
  `https://yourdomain.com/api/cms/setup.php`  
  (or `https://yourdomain.com/api/cms/setup` if you have a rewrite for it)
- **Method:** **POST**
- **Headers:**  
  `Content-Type: application/json`
- **Body (JSON):**

  ```json
  {
    "email": "admin@yourdomain.com",
    "password": "YourSecurePassword123!",
    "name": "Admin"
  }
  ```

If successful, you get a success response and the SQLite DB and tables are created.

**9.2 – (Optional) Seed content**

To load sample content (homepage, nav, sectors, etc.):

- **URL:**  
  `https://yourdomain.com/api/cms/seed.php`  
  (or `/api/cms/seed`)
- **Method:** **POST**
- **Body:** empty or `{}`

Run seed only once; it inserts default entries. If you already have content, skip this or run it on a copy of the DB first.

---

## Step 10: Verify the Site and CMS

1. **Frontend:**  
   Open `https://yourdomain.com` – you should see the FulfilX site (home, services, etc.).
2. **CMS login:**  
   Go to `https://yourdomain.com/admin` (or `/admin/login`) and sign in with the email/password you used in setup.
3. **API:**  
   Open `https://yourdomain.com/api/cms/content.php?type=homepage&status=published&limit=1` – you should get JSON (or a valid error), not an HTML 404.

If the API returns 404, check:

- Paths: `api/cms/content.php` really exists under `public_html`.
- PHP is run for `.php` files and that no rewrite rule is sending `/api/cms/*` to `index.html`.

---

## Step 11: Point Frontend to Your Domain (If Needed)

The app uses relative URLs for the API (`/api/cms`), so on the same domain no extra config is needed.

If you ever serve the frontend from another domain, you would set:

- **Build-time env:**  
  `EXPO_PUBLIC_CMS_API_URL=https://yourdomain.com/api/cms`  
  then run `npm run build:web` again and re-upload the built files.

For a single domain on Hostinger, you can leave this unset.

---

## Checklist Summary

- [ ] `npm run build:web` run; build output (e.g. `dist/`) present.
- [ ] Build contents copied into `public/` (so `public/index.html` and `public/api/` both exist).
- [ ] `public/cms_data` and `public/uploads` created; permissions **755** or **775** on server.
- [ ] Contents of `public/` uploaded to Hostinger `public_html` (no extra `public` folder in the root).
- [ ] JWT secret set (env or in `config.php`) for production.
- [ ] **POST** to `/api/cms/setup.php` with admin email/password/name to create DB and admin user.
- [ ] (Optional) **POST** to `/api/cms/seed.php` to seed content.
- [ ] Homepage and `/admin` login work; API URL returns JSON.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| **"Unexpected token '<', \"<?php\"... is not valid JSON"** on all CMS pages | The server is serving `.php` files as plain text instead of running PHP. **Fix:** Upload the `public/api/.htaccess` file (in this repo) so it exists as `public_html/api/.htaccess`. It forces `SetHandler application/x-httpd-php` for `.php` files. If it still happens, in hPanel check that PHP is enabled for the domain and try PHP 7.4 or 8.x. |
| Blank page / 404 for routes | .htaccess present and rewriting to `index.html`; AllowOverride enabled. |
| 404 for `/api/cms/*` | Ensure `api/cms/*.php` files exist under document root; no rule rewriting `/api` to SPA. |
| 500 on API | PHP error log in hPanel; permissions on `cms_data` and `uploads`; PHP version 7.4+. |
| “Database could not be opened” | `cms_data` exists and is writable (755/775); path in `config.php` is correct (default: `__DIR__ . '/../../cms_data/cms.db'` from `api/cms/`). |
| CMS login fails | Correct email/password; setup was run; JWT_SECRET same between requests (no typo in env). |
| Images/uploads not loading | `uploads` directory exists and is writable; CMS stores paths like `/uploads/...` and files are under `public_html/uploads/`. |

---

## Re-Deploying After Changes

1. **Frontend only:**  
   Run `npm run build:web`, copy `dist/*` into `public/`, then upload only the changed files (e.g. `index.html`, `_expo/`, etc.) to `public_html/`.

2. **PHP/CMS only:**  
   Upload only the changed files under `public/api/cms/` to `public_html/api/cms/`.

3. **Full:**  
   Re-copy build into `public/`, then upload the full contents of `public/` to `public_html/` (or use FTP “upload and overwrite”).

Do **not** overwrite `cms_data/cms.db` or `uploads/` with empty or old copies if you want to keep current data; back them up first if you do a full replace.

---

You’re done. Your FulfilX site and CMS should be live on Hostinger.
