# FulfilX CMS - Client Guide

> **This document is your complete guide to managing your FulfilX website content. Please read it carefully before making any changes.**

---

## Table of Contents

1. [Accessing the CMS](#accessing-the-cms)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Content](#managing-content)
4. [Media Library](#media-library)
5. [User Management](#user-management)
6. [Settings](#settings)
7. [Important Warnings](#important-warnings)

---

## Accessing the CMS

Your website and admin panel are live at:

| | URL |
|---|---|
| **Live Website** | [https://fulfilx.co.uk](https://fulfilx.co.uk) |
| **Admin Panel** | [https://fulfilx.co.uk/admin](https://fulfilx.co.uk/admin) |

### Login Credentials

| | |
|---|---|
| **Email** | `admin@fulfilx.com` |
| **Password** | `******` | 

> **Recommendation:** Change your password immediately after your first login via **Settings > Change Password**.

---

## Dashboard Overview

Once logged in, you will see the admin dashboard with:

- **Content statistics** — total entries, published, drafts
- **Content types** — quick access to all manageable sections
- **Recent activity** — a log of recent changes made across the site

The **sidebar navigation** on the left gives you access to all areas:

| Menu Item | What It Does |
|-----------|--------------|
| **Dashboard** | Overview and stats |
| **Content** | Manage all website content |
| **Media** | Upload and manage images |
| **Users** | Manage admin users |
| **Settings** | Profile, password, and integrations |

---

## Managing Content

The CMS lets you manage every section of your website without touching any code. Content is split into two categories:

### Single-Type Content (One Per Site)

These are unique pages/sections — only one version exists:

| Content Type | What You Can Edit |
|---|---|
| **Homepage** | Hero headline, subheading, call-to-action button, background image/video, stats, History/Mission/Vision tabs, "Why Choose Us" features |
| **Contact Info** | Phone number, WhatsApp, email, address, social media links (TikTok, Instagram, LinkedIn, Facebook) |
| **Site Settings** | Site title, meta description, copyright text, navigation items, footer quick links, newsletter heading and subtext |
| **Sustainability** | Hero text and sustainability sections (title, description, bullet points) |
| **Return Policy** | Policy sections (title and content) |

### Collection Content (Multiple Entries)

These allow you to create, edit, and delete multiple entries:

| Content Type | What It Manages |
|---|---|
| **Services** | Fulfilment services — title, background image, logo, features |
| **Sectors** | Industry sectors — title, description, image, page content, features |
| **Blog Posts** | Articles — title, description, featured image, content, author, date |
| **Team Members** | Staff — name, role, photo |
| **Job Listings** | Open positions — title, description, tags, active status |
| **Testimonials** | Client reviews — author, photo, text, rating, source |
| **Pricing Plans** | Service tiers — title, price, features, highlighted flag |
| **Locations** | Offices/warehouses — country, city, address, contact info, map coordinates |
| **Partners** | Integration/courier/retail partners — name, logo, category, URL |
| **Products** | Product catalog — name, description, image, category, tags, features |

### How to Edit Content

1. Go to **Content** in the sidebar
2. Select the content type you want to edit
3. For **single types**: click to open the editor directly
4. For **collections**: browse the list, click an entry to edit, or click **Create New**
5. Make your changes using the form fields and rich text editor
6. Click **Publish** to make changes live, or **Save Draft** to save without publishing

### Content Statuses

| Status | Meaning |
|---|---|
| **Published** | Live on the website and visible to visitors |
| **Draft** | Saved but not visible on the website |
| **Archived** | Hidden from the website and the content list |

---

## Media Library

The **Media** section is where you manage all images used across the site.

- **Upload** images by clicking the upload button
- **Search** through your existing images
- **Select** images when editing content — a media picker will pop up allowing you to choose from your library
- Supported formats: JPG, PNG, GIF, WebP

---

## User Management

From the **Users** section, you can:

- View all admin users
- Create new admin users
- Deactivate users who no longer need access

### User Roles

| Role | Access Level |
|---|---|
| **Editor** | Can manage content and media |
| **Admin** | Everything an Editor can do + manage users, run CMS setup, and manage integration settings |
| **Developer** | Full access including database tools (reserved for the development team) |

---

## Settings

The **Settings** page contains:

| Section | What It Does |
|---|---|
| **Profile** | View your name, email, and role |
| **Change Password** | Update your login password |
| **Integrations** | API webhook settings for contact form and newsletter |
| **API Info** | Read-only information about the CMS API endpoint |

---

## Important Warnings

Please read this section carefully. Ignoring these warnings may break your website.

---

### DO NOT Deactivate the Developer Account

> **The developer account is essential for ongoing maintenance, updates, and support for your website. Deactivating it will prevent the development team from accessing the system when needed. Do not deactivate, modify, or change the password of the developer account under any circumstances.**

---

### Be Extremely Careful with Settings You Are Not Familiar With

The **Settings** page contains configuration options that directly affect how your website functions:

- **Integration Settings** — These control the webhook URLs and API keys that power your **contact form** and **newsletter signups**. Changing these values incorrectly will **break** your contact form and newsletter functionality. **Do not modify these unless instructed by your developer.**

- **CMS Setup / Seed** — These are one-time setup tools used during initial deployment. **Do not run these** — doing so could reset your content or database.

- **API Settings** — The API URL and endpoints are configured for your hosting environment. **Do not change these values.**

### General Rules of Thumb

| Do | Don't |
|---|---|
| Edit content (text, images, blog posts) freely | Change Integration/API settings |
| Upload and manage media | Deactivate the developer account |
| Create new blog posts, team members, products, etc. | Run CMS Setup or Seed from Settings |
| Change your own password | Modify settings you don't understand |
| Publish or draft content as needed | Delete content types you're unsure about |

---

## Need Help?

If you're unsure about anything or need changes that go beyond content editing, **contact your development team** before making any modifications to settings, integrations, or user accounts.

---

*This guide was prepared for the FulfilX website.*
