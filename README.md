# FulfilX

FulfilX is a web app built with Expo + Expo Router. It powers a marketing site for FULFIL.X, with pages like Home, Services, Pricing, Locations, Sectors, Team, and Blogs.

## Tech Stack

- Expo (web) + Expo Router (file-based routing)
- React + React Native Web
- TypeScript
- NativeWind (Tailwind-style utility classes)

## Requirements

- Node.js 18+ (recommended: Node 20 LTS)
- npm

## Run Locally

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the dev server (web)

   ```bash
   npm run web
   ```

3. Open the URL shown in the terminal (commonly `http://localhost:8081`).

## Scripts

```bash
npm run start      # Expo dev server (then choose platform)
npm run web        # Expo dev server (web)
npm run lint       # ESLint (via expo lint)
npm run build:web  # Export a static web build
npm run convert:webp # Convert PNG assets to WebP (scripts/)
```

## Project Structure

- `app/`: routes and screens (Expo Router)
  - `app/(tabs)/`: main entry
  - `app/blogs/`, `app/sectors/`: route groups
- `components/`: shared UI and layout (navbar, footer, home layout)
- `public/`: static web assets referenced by `/...` paths
- `assets/`: fonts and bundled images
- `scripts/`: one-off utilities (e.g. image conversion)

## Static Export (Production)

Build a static web bundle:

```bash
npm run build:web
```

Expo exports the site to a static folder (typically `dist/`). Deploy that folder to any static hosting provider.

## Notes

- This project is configured for web output (`app.json` sets platforms to `web`).
- Routes are file-based; add or edit pages inside `app/`.
