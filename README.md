# Clean Surface Multi-Page SEO Site

This project is now set up as a static-site repo instead of a single loose HTML file. That is the right move.

Why a repo helps:

- It gives us version history for every SEO and design change.
- It makes city pages, service pages, and core files like `sitemap.xml` easier to manage.
- It makes deployment to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or a traditional host much easier later.
- It keeps content, assets, and technical SEO files in one place instead of scattered copies.

## Local preview

This site uses root-relative links like `/phoenix/` and `/services/`, so run it through a local server instead of opening files directly.

From the repo root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Project structure

```text
.
|-- index.html
|-- about/
|-- contact/
|-- phoenix/
|-- scottsdale/
|-- mesa/
|-- gilbert/
|-- chandler/
|-- services/
|   |-- index.html
|   |-- house-washing/
|   |-- driveway-cleaning/
|   |-- commercial-pressure-washing/
|   |-- hot-water-steam-cleaning/
|   `-- patio-pool-deck-cleaning/
|-- assets/
|   |-- css/styles.css
|   `-- js/site.js
|-- robots.txt
|-- sitemap.xml
`-- reference/legacy-homepage.html
```

## What is included

- A homepage built to link into real service pages and city pages.
- City pages for Phoenix, Scottsdale, Mesa, Gilbert, and Chandler.
- Service pages for house washing, driveway cleaning, commercial pressure washing, hot-water steam cleaning, and patio/pool deck cleaning.
- Shared CSS and JS for consistent styling and quote-form behavior.
- Basic technical SEO files: `robots.txt` and `sitemap.xml`.

## Best next ranking moves

- Replace generic stock or reused live-site images with original project photos.
- Add before-and-after galleries to city pages and service pages.
- Build a Google Business Profile review strategy.
- Add citations and local backlinks.
- Expand into more city pages only when the copy can stay genuinely local.
