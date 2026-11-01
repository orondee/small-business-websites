# Small Business Website Portfolio

**[Open the live portfolio →](https://orondee.github.io/small-business-websites/)**

Modern, mobile-friendly website concepts for small service businesses, built with plain HTML, CSS and a little JavaScript. No install or build step.

| Page | Live link |
| --- | --- |
| Portfolio homepage | [orondee.github.io/small-business-websites](https://orondee.github.io/small-business-websites/) |
| GreenLine Lawn Care | [/greenline-lawn-care/](https://orondee.github.io/small-business-websites/greenline-lawn-care/) |
| BrightSide Home Cleaning | [/brightside-cleaning/](https://orondee.github.io/small-business-websites/brightside-cleaning/) |

> **These are demos.** GreenLine and BrightSide are fictional businesses, not real companies or client work. Names, contact details, services and locations are examples. The GreenLine form only shows a sample confirmation in your browser — it never sends or stores anything.

## What makes it easy to use

- A sticky menu on every page, with a phone-friendly menu button (press **Esc** to close it).
- A **Skip to content** link for keyboard users.
- Each sample site has a **Back to portfolio** link in its top banner and footer.
- Clear buttons for the main action on each page (free estimate, find your clean).
- The sample form points out exactly which field needs fixing.
- Motion is turned off automatically for people who prefer reduced motion.

## Project map

| File or folder | What it contains |
| --- | --- |
| `index.html` | Portfolio homepage (its own small styles are at the top of the file). |
| `assets/base.css` | Shared layout: header, menu, buttons, cards, form fields, footer. |
| `assets/site.js` | Shared behavior: phone menu, footer year, GreenLine sample form. |
| `greenline-lawn-care/index.html` | GreenLine page content and photos. |
| `greenline-lawn-care/styles.css` | GreenLine colors, fonts and page-specific layout. |
| `brightside-cleaning/index.html` | BrightSide page content and photos. |
| `brightside-cleaning/styles.css` | BrightSide colors, fonts and page-specific layout. |
| `404.html` | Friendly “page not found” screen used by GitHub Pages. |

## Make a change

- **Text or links:** edit the page's `index.html`.
- **Colors or fonts for one site:** change the variables at the top of that site's `styles.css`.
- **Something on every page (buttons, menu, cards):** edit `assets/base.css`.
- **Photos:** change the image `src` and write an accurate `alt` description. Make sure you have the right to use it.

Quick edit on GitHub: open a file, click the pencil icon, make the change and commit.

## Preview on your computer

Double-click `start-local-server.bat` (Windows), or open a terminal in this folder and run:

```text
py -m http.server 8000        # Windows
python3 -m http.server 8000   # macOS / Linux
```

Then visit <http://localhost:8000>. See `LOCAL_DEV.md` for more detail.

## Before you publish a change

1. Open the portfolio and both demos on a desktop and a phone width.
2. Open and close the phone menu; check every menu and footer link.
3. Check that photos load and their descriptions match.
4. Try the GreenLine form with made-up details: empty fields show errors, valid details show the sample confirmation.
5. Keep the demo notices visible.

## Publishing

GitHub Pages publishes this repository automatically. After you commit, check the **Actions** tab for a green `pages build and deployment` run. A hard refresh helps if you still see the old version.

## Photos and reuse

Service photos load from Unsplash — see the [Unsplash License](https://unsplash.com/license). This repository has no general code license; ask the owner before reusing its code.
