# Small Business Website Portfolio (React)

Modern, mobile-friendly website concepts for small service businesses, engineered as a high-performance React + TypeScript application with Vite.

## Official Live Website Links

| Experience | GitHub Pages Live URL |
| :--- | :--- |
| **Portfolio Studio Hub** | [https://orondee.github.io/small-business-websites/](https://orondee.github.io/small-business-websites/) |
| **GreenLine Lawn Care Demo** | [https://orondee.github.io/small-business-websites/#/greenline-lawn-care](https://orondee.github.io/small-business-websites/#/greenline-lawn-care) |
| **BrightSide Cleaning Demo** | [https://orondee.github.io/small-business-websites/#/brightside-cleaning](https://orondee.github.io/small-business-websites/#/brightside-cleaning) |
| **GitHub Source Repository** | [https://github.com/orondee/small-business-websites](https://github.com/orondee/small-business-websites) |
| **Interactive Preview Deployment** | [https://ais-pre-w2ib7pw5h3v4qgj7c5cevs-98600828891.us-west1.run.app](https://ais-pre-w2ib7pw5h3v4qgj7c5cevs-98600828891.us-west1.run.app) |

> **Concept Notice:** GreenLine Lawn Care and BrightSide Home Cleaning are fictional business concept demonstrations created to showcase modern web design and conversion-focused UX patterns for small service companies.

---

---

## Why GitHub Pages Showed a White Screen & How It Is Solved

### Root Cause
GitHub Pages is a static web host that serves files directly from your repository `orondee/small-business-websites`.
When GitHub Pages deployed the root of the repository, the browser parsed `index.html` and tried to load raw TypeScript files (`/src/main.tsx`), which returned a 404 error because browsers cannot run uncompiled TypeScript without Vite. This resulted in an empty root `<div>` and a white screen.

### The Complete Solution Implemented
1. **Universal Bootloader in `index.html`**:
   `index.html` now intelligently detects whether it is running in local development (loading TypeScript via Vite) or on static GitHub Pages hosting. On GitHub Pages, it automatically loads the pre-compiled JavaScript bundle (`assets/app.js` and `assets/app.css`).
2. **Standalone Production Bundles**:
   Running `npm run build` generates `assets/app.js`, `assets/app.css`, and copies them directly into `assets/` in both `dist/` and the repo root.
3. **Instant In-App Exploration**:
   In the live app preview, every concept card and banner link now features an **Instant In-App View** button that loads the demo immediately without leaving the app or waiting for git syncs.
4. **Automated GitHub Actions Deployment**:
   `.github/workflows/deploy.yml` builds Vite and deploys `dist/` automatically on push.

### 30-Second Fix to Update `github.io`
Run these commands in your repository terminal to push the compiled assets to GitHub:

```bash
git add .
git commit -m "Fix GitHub Pages white screen: add compiled bundle and universal bootloader"
git push origin main
```

Once pushed:
- If your GitHub repository uses **Deploy from a branch** (`main` / root): The site at `https://orondee.github.io/small-business-websites/` will immediately load `assets/app.js` with zero white screen!
- If your repository uses **GitHub Actions** (under Settings > Pages > Source): The workflow will automatically build and publish `./dist`.

---

## What Was Fixed & Enhanced

1. **Prominent Live Links Banner**: Added an eye-catching deployment banner across the top of the site and on each concept page with 1-click **Open** and **Copy URL** buttons.
2. **Resilient GitHub Pages Subpath Routing**: Fixed broken links caused by the repository subfolder prefix `/small-business-websites/`. All routes support hash URLs (`#/greenline-lawn-care`, `#/brightside-cleaning`) and relative assets (`base: './'`), preventing 404 errors.
3. **In-Page Anchor Protection**: Prevented in-page anchor clicks (`#services`, `#pricing`, `#estimator`) from accidentally resetting the active page route.
4. **GitHub Pages SPA Fallback**: Created `public/404.html` to automatically redirect direct deep links back to the SPA without 404 errors.
5. **Distinct Pricing Designs**:
   - **GreenLine Lawn Care**: Interactive Yard Lot Footprint Visualizer + Custom Field Work Order Slip.
   - **BrightSide Home Cleaning**: Editorial Room & Linen Ledger + Deep Clean Checklist & Courtesy Frequency Discounts.
6. **Project Scope Estimator**: Lowered base investment to $290 with transparent itemized sliders.
7. **Zero Fake Statistics**: Completely removed unverified claims, replacing them with verifiable architectural facts.

---

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (configured with relative `base: './'`)
- **Deployment**: GitHub Pages (automated via GitHub Actions)
- **Styling**: Modular CSS preserving authentic brand tokens and typography

## Local Development

```bash
npm install
npm run dev
```

The application runs locally on `http://localhost:3000`.

To build for production:

```bash
npm run build
```
