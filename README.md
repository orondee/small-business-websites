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

## Why GitHub Pages Shows the Previous Version & How to Sync

GitHub Pages is a static host that directly reads the files from your GitHub repository `orondee/small-business-websites`.
When changes are made in the studio environment, they need to be pushed to your GitHub repository so GitHub Pages can publish them.

We have configured an automated **GitHub Actions workflow** (`.github/workflows/deploy.yml`) and base routing (`base: './'`).

### Syncing Steps to Update `github.io`:

1. In your local repository terminal:
   ```bash
   git add .
   git commit -m "Upgrade to modern React portfolio with bespoke pricing visualizers"
   git push origin main
   ```
2. In your GitHub repository settings under **Settings > Pages**:
   - Set **Source** to **GitHub Actions** (recommended) or deploy from the `main` branch.
   - The automated GitHub Actions workflow will build Vite and deploy the latest version directly to `https://orondee.github.io/small-business-websites/`!

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
