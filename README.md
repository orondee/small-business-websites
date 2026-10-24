# Small Business Website Portfolio

**[Open the live portfolio](https://orondee.github.io/small-business-websites/)**

A beginner-friendly portfolio with two responsive website concepts for fictional small businesses. The projects use plain HTML and CSS, plus a small JavaScript interaction on the GreenLine demo form.

## View the sites

- [Portfolio homepage](https://orondee.github.io/small-business-websites/)
- [GreenLine Lawn Care](https://orondee.github.io/small-business-websites/greenline-lawn-care/)
- [BrightSide Home Cleaning](https://orondee.github.io/small-business-websites/brightside-cleaning/)

## Important: these are demos

GreenLine and BrightSide are fictional portfolio concepts, not real companies or client work. Names, contact details, service descriptions, locations, and response times are examples.

The GreenLine form only displays a sample confirmation in the browser. It does not send or store messages. Do not enter real personal information. BrightSide has no working booking or contact form.

## Project map

| File or folder | What it contains |
| --- | --- |
| `index.html` | Portfolio homepage and project summaries. Its small homepage stylesheet is in the `<style>` section of this file. |
| `assets/lawn-scene.svg` | Lawn illustration shown on the portfolio homepage. |
| `assets/sunlit-room.svg` | Room illustration shown on the portfolio homepage. |
| `greenline-lawn-care/index.html` | GreenLine page content, image URLs, and sample-form interaction. |
| `greenline-lawn-care/styles.css` | GreenLine layout, colors, typography, transitions, and responsive rules. |
| `brightside-cleaning/index.html` | BrightSide page content and image URLs. |
| `brightside-cleaning/styles.css` | BrightSide layout, colors, typography, animations, and responsive rules. |

The two project pages use Manrope for GreenLine and DM Sans with DM Serif Display for BrightSide. Service photos are requested from the Unsplash image CDN. Google Fonts and the photos need an internet connection; system-font fallbacks are included.

## Make a change

For a quick edit on GitHub, open a file, select the pencil icon, make the change, then commit it to the repository. To work on a copy, download the repository ZIP from GitHub and open the folder in a code editor.

- Change headings, paragraphs, links, and image descriptions in the relevant `index.html`.
- Change colors, spacing, fonts, layouts, and motion in the matching `styles.css`.
- To replace a photo, change its `src` URL and write an accurate `alt` description. Check that you have the right to use the replacement image.
- The portfolio homepage drawings are the two SVG files listed above. The unused draft images have been removed.

## Preview on your computer

These are static files, so there is no package install or build step. You can open the top-level `index.html` in a browser. For a local web address, open a terminal in the project folder and run:

```text
py -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000). If the `py` command is not available, try `python -m http.server 8000` or open `index.html` directly.

## Check your edits

Before sharing a change:

1. Open each demo from the portfolio homepage.
2. Use the navigation and check that each section link goes to the right place.
3. Confirm the photos load and their descriptions match what is shown.
4. Check the layout at phone and desktop widths.
5. Try GreenLine's form with made-up details; confirm that the demo message appears and no real message is sent.
6. If you change motion, keep the reduced-motion rules in place.

## Publish changes

GitHub Pages already publishes this repository. When a change is committed to the published branch, GitHub starts a Pages build and deployment. Check the repository's **Actions** tab for a successful `pages build and deployment` run; the live site can take a short time to update. A hard refresh can help if your browser is still showing a cached version.

## Photos and reuse

The service photos are loaded from Unsplash rather than stored in this repository. Read the [Unsplash License](https://unsplash.com/license) before reusing them elsewhere. This repository does not include a general code license; ask the owner before reusing its code or original illustrations.
