# volt-template1

A single-page Astro site template for local service businesses — painting,
waterproofing, roofing, HVAC, landscaping, and anything else that sells a site
visit and a quote.

Built to be **cloned per client**. Everything a client owns lives in one config
file and one images folder. No component holds client copy.

Currently configured for **Goal Green World Pte Ltd** (Singapore) —
Painting & Waterproofing division.

---

## Table of contents

- [Quick start](#quick-start)
- [Cloning for a new client](#cloning-for-a-new-client)
- [What's in the config](#whats-in-the-config)
- [Images](#images)
- [How theming works](#how-theming-works)
- [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)
- [Going live: the remaining wiring](#going-live-the-remaining-wiring)
- [Project structure](#project-structure)
- [Commands](#commands)

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Opens on <http://localhost:4321>.

---

## Cloning for a new client

Three steps. Nothing else should need touching.

### 1. Edit `src/config/client.ts`

This is the only file with client-specific content. Work top to bottom — every
field is commented. In particular:

| Section | What to change |
| --- | --- |
| `company` | Name, legal name, division, tagline, registration number, founded year |
| `brand` | The colour palette (see [How theming works](#how-theming-works)) |
| `logo` | Path and rendered height |
| `hero` | Headline, subheadline, background image, trust badges |
| `contact` | Phone, `phoneHref`, email, WhatsApp link, address, business hours |
| `social` | Platform + URL pairs |
| `nav` | Anchor links — each `href` must match a section `id` on the page |
| `services` | The service cards. Add or remove freely; the grid reflows |
| `process` | Numbered steps. 4–5 works best |
| `trust` | The icon row |
| `about` | Heading, paragraphs, photo, differentiator bullets |
| `gallery` | Project images and their category chips |
| `faq` | Question/answer pairs |
| `serviceArea` | The city/area tag cloud |
| `finalCta` | Closing banner copy |
| `form` | Field labels, consent text, and the submit endpoint |
| `legal` | Last-updated date, privacy contact address |
| `analytics` | GA4 / Meta Pixel / Google Ads IDs |
| `seo` | `siteUrl`, title, description, OG image |

> **`phoneHref` vs `phone`** — `phone` is what visitors read
> (`+65 6816 2069`); `phoneHref` is what the `tel:` link dials
> (`+6568162069`, digits and a leading `+` only). Both need updating.

Reviews live separately in **`src/data/reviews.ts`**.

### 2. Replace the images

See [Images](#images) below.

### 3. Rewrite the legal pages

`src/pages/privacy.astro` and `src/pages/terms.astro` ship with **placeholder
text and a visible warning banner**. They exist so the site can launch with
working compliance links, not as legal advice. Replace both with copy drafted
for the client, then delete the `.legal-notice` block from each page.

---

## What's in the config

`src/config/client.ts` is fully typed. Exported types (`Service`,
`ProcessStep`, `TrustPoint`, `GalleryItem`, `FaqItem`, `SocialLink`,
`BusinessHour`, `IconName`) mean a typo in a field name or an unknown icon is
caught by `npm run check` rather than silently rendering nothing.

**Icons** are referenced by string name and drawn inline by
`src/components/Icon.astro` — no icon library, no network request. Available
names are the `IconName` union. To add one, drop a 24×24 path into `Icon.astro`
and extend the union.

---

## Images

Images resolve through `src/components/SmartImage.astro`, which supports two
locations. The config always writes a normal-looking path like
`/images/hero-placeholder.webp`; the component decides where it comes from.

### `src/assets/images/` — recommended

Files here go through Astro's `<Image>` pipeline: resized, converted to WebP,
content-hashed, and served with a far-future cache header. **This is where the
shipped placeholders live.** Replace them keeping the same filenames and you get
optimisation for free.

### `public/images/` — drop-in fallback

If a filename is *not* found in `src/assets/images/`, the component falls back
to `/images/<filename>` in `public/`. Files here are copied verbatim — no
resizing, no conversion. Convenient for a quick swap by a non-technical user,
but you are shipping whatever you put there, at whatever size it is.

The logo lives in `public/images/` because it is an SVG and needs no processing.

### Expected filenames and sizes

| File | Size | Used by |
| --- | --- | --- |
| `hero-placeholder.webp` | 1920×1080 | Hero background |
| `about-placeholder.webp` | 1000×750 | About section photo |
| `service-1…6-placeholder.webp` | 800×600 | Service cards |
| `gallery-1…6-placeholder.webp` | 900×900 | Project gallery (square) |
| `logo-placeholder.svg` | ~176×40 | Nav + footer (`public/images/`) |

Supply WebP where you can. JPG and PNG work too — anything in
`src/assets/images/` is converted to WebP at build time regardless.

---

## How theming works

Brand colours are defined **once**, in `src/config/client.ts` → `brand`. The
chain looks like this:

```
src/config/client.ts  (brand.primary: '#0B1F3A')
        │
        ▼
BaseLayout.astro      emits  :root { --brand-primary: #0B1F3A; … }
        │
        ▼
src/styles/global.css @theme maps --color-brand-primary → var(--brand-primary)
        │
        ▼
components            use Tailwind utilities: bg-brand-primary, text-brand-accent
```

Change one hex in the config and the whole site re-skins — nav, hero, buttons,
footer, focus rings, the lot. No search-and-replace.

Available utility names: `brand-primary`, `brand-primary-light`,
`brand-secondary`, `brand-accent`, `brand-accent-hover`, `brand-accent-text`,
`brand-bg`, `brand-bg-alt`, `brand-text`, `brand-muted`.

**Contrast matters.** `accent` sits on `primary`, and `accentText` sits on
`accent`. If you switch to a light accent, darken `accentText` to match or the
buttons become unreadable.

The current palette is a placeholder navy + amber. Goal Green World's own brand
green is `#1E7A46` / `#8DC63F` — swap `primary` and `accent` when the client
signs off.

Typography is Inter, loaded from Google Fonts in `BaseLayout.astro`. It is the
only external asset the page requests.

---

## Deploying to Cloudflare Pages

The site builds to fully static HTML. There is **no adapter and no Worker** —
`dist/` is uploaded as plain files.

### Via the dashboard

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, and pick the repo.
3. Set the build configuration:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave blank, or `volt-template1` if nested)* |
   | Node version | `22` or later |

4. **Save and Deploy.**

Set the Node version by adding an environment variable `NODE_VERSION = 22`, or
by committing a `.nvmrc`.

### Via Wrangler

```bash
npm run build
```

```bash
npx wrangler pages deploy dist --project-name=volt-template1
```

`wrangler.toml` in the repo root holds the project name and compatibility date.

### Before the first production deploy

Set `seo.siteUrl` in the config to the real domain. It drives canonical URLs
and `sitemap-index.xml`, both of which are wrong while it says `example.com`.

---

## Going live: the remaining wiring

Deliberately **not built yet**, per the project brief:

- GoHighLevel API integration
- Chat widget, review widget, calendar booking
- Live tracking scripts
- Blog / resource centre

### The quote form

`src/components/QuoteForm.astro` is complete and working, in **demo mode**.
With `form.endpoint` set to `''`, submitting validates the input and logs the
payload to the browser console instead of sending it. Open DevTools and submit
to see the exact shape.

The payload includes seven attribution fields populated on page load — the five
standard UTM parameters read from the query string, plus `page_url` and
`referrer` — so leads can be attributed to their source.

Two ways to go live:

**A. Direct POST.** If GHL gives you an endpoint that is safe to call from a
browser, paste it into `form.endpoint`. The existing handler will `POST` JSON to
it. Nothing else to change.

**B. Via a Pages Function** (needed if a secret token is involved). Create
`functions/api/lead.ts` in this repo — Cloudflare Pages picks it up
automatically, still no adapter required — read `GHL_API_TOKEN` from the
environment there, and set `form.endpoint` to `/api/lead`. This keeps the token
server-side. Copy `.env.example` to `.env` for local development.

> Do not put an API token in `client.ts`. That file is bundled into the page and
> is readable by anyone who views source. `.env` and Pages environment variables
> are the right place — see the notes at the top of `.env.example`.

### Tracking scripts

`BaseLayout.astro` has three commented slots in `<head>` for GA4, Meta Pixel and
Google Ads. They render the configured IDs into an HTML comment so you can
confirm the config is wired up by viewing page source. Replace each comment with
the real vendor snippet when you are ready.

---

## Project structure

```
volt-template1/
├── astro.config.ts           Static output, sitemap, Tailwind
├── wrangler.toml             Cloudflare Pages project config
├── .env.example              Secrets template (copy to .env)
├── public/
│   ├── favicon.svg
│   └── images/
│       └── logo-placeholder.svg
└── src/
    ├── assets/images/        Build-optimised images (replace these)
    ├── config/client.ts      ← THE FILE YOU EDIT
    ├── data/reviews.ts       ← Reviews (replace before launch)
    ├── styles/global.css     Design system + Tailwind theme bridge
    ├── layouts/
    │   ├── BaseLayout.astro  <head>, brand vars, tracking slots
    │   └── LegalLayout.astro Shell for /privacy and /terms
    ├── components/
    │   ├── Icon.astro        Inline SVG icon set
    │   ├── SmartImage.astro  Image resolution (src/ → public/ fallback)
    │   ├── Nav.astro         1. Sticky nav
    │   ├── Hero.astro        2. Hero
    │   ├── QuoteForm.astro   3. Quote form
    │   ├── TrustBar.astro    4. Trust bar
    │   ├── Services.astro    5. Services grid
    │   ├── ServiceCard.astro    └ one card
    │   ├── Process.astro     6. Process steps
    │   ├── About.astro       7. About
    │   ├── Gallery.astro     8. Project gallery
    │   ├── Reviews.astro     9. Review carousel
    │   ├── Faq.astro        10. FAQ accordion
    │   ├── ServiceArea.astro 11. Service areas
    │   ├── FinalCta.astro   12. Closing CTA
    │   └── Footer.astro     13. Footer
    └── pages/
        ├── index.astro       Section order
        ├── privacy.astro     14. Privacy (placeholder text)
        └── terms.astro       14. Terms (placeholder text)
```

### JavaScript budget

The built page ships **no separate JS bundle**. Three small scripts are inlined:
the mobile menu toggle, the quote form handler, and the review carousel arrows.

Everything else is CSS or native HTML. The FAQ uses `<details>`/`<summary>`, the
carousel uses CSS scroll-snap, and smooth scrolling is `scroll-behavior` — all
of which keep working with JavaScript disabled. `prefers-reduced-motion` is
respected throughout.

---

## Commands

| Command | Does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check `.astro` and `.ts` files |

Run `npm run check` before deploying. It catches bad config field names and
unknown icon identifiers, which are the two most likely mistakes when cloning.
