# Local development server

This portfolio is a static GitHub Pages site. It has no package install, build step, or backend. Use the server included with Python to preview all three pages through the same local web address structure used by GitHub Pages.

## Start

1. Install Python 3 if it is not already installed.
2. Open a terminal in this repository's top-level folder.
3. Run `py -m http.server 8000` on Windows, or `python3 -m http.server 8000` on macOS or Linux.
4. Open <http://localhost:8000>.
5. Stop the server with Ctrl+C in the terminal.

If port 8000 is already in use, choose another port, such as `py -m http.server 8080`, and visit that port instead.

## Pages to preview

- Portfolio: <http://localhost:8000/>
- GreenLine Lawn Care: <http://localhost:8000/greenline-lawn-care/>
- BrightSide Home Cleaning: <http://localhost:8000/brightside-cleaning/>

## Check a change

- Open each page and follow its navigation, footer links, and section links.
- Check that each page's stylesheet loads and that the layout works at desktop and phone widths. Browser developer tools can emulate a phone width.
- The two portfolio illustrations are local SVG files in `assets/`. GreenLine and BrightSide service photos and web fonts load from external sites, so they require an internet connection.
- GreenLine's sample form only demonstrates validation and a confirmation in the browser. It does not send or save information; use made-up details when previewing it.

GitHub Pages continues to serve the existing `index.html` files and folder URLs. The local server is only for preview; it does not build or change the published site.
