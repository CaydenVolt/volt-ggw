# volt-template1

A multi-page Astro site template for local service businesses — painting,
waterproofing, roofing, HVAC, landscaping, and anything else that sells a site
visit and a quote.

Built to be **cloned per client**. Everything a client owns lives in one config
file, two data files and one images folder. No component holds client copy.

Currently configured for **Goal Green World Pte Ltd** (Singapore) —
Painting & Waterproofing division.

---

## Table of contents

- [Quick start](#quick-start)
- [Site map](#site-map)
- [Cloning for a new client](#cloning-for-a-new-client)
- [Config reference](#config-reference)
- [Components](#components)
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

## Site map

34 pages build from the config. Everything is static HTML.

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `pages/index.astro` | Split hero with the estimate form card |
| `/services` | `pages/services.astro` | One anchored section per service |
| `/gallery` | `pages/gallery.astro` | Filterable by category |
| `/pricing` | `pages/pricing.astro` | Indicative pricing cards + pricing FAQ |
| `/resources` | `pages/resources/index.astro` | Article listing |
| `/resources/<slug>` | `pages/resources/[slug].astro` | One per `data/articles.ts` entry |
| `/about` | `pages/about.astro` | Story, values, differentiators |
| `/contact` | `pages/contact.astro` | Full form, details, hours, map slot |
| `/areas/<slug>` | `pages/areas/[slug].astro` | One per `serviceArea.areas` entry |
| `/privacy`, `/terms` | `pages/privacy.astro`, `terms.astro` | `noindex`, placeholder text |

Adding a service, an area or an article adds a page or a section
automatically — you do not touch routing.

> **Anchors:** service cards and the footer deep-link to `/services#<slug>`.
> Those slugs come from `services[].slug`, so renaming one changes the URL.

---

## Cloning for a new client

Five steps. Nothing else should need touching.

### 1. Edit `src/config/client.ts`

The only file with client-specific content. Work top to bottom — every field is
commented. See [Config reference](#config-reference).

### 2. Replace `src/data/reviews.ts`

Ships with **placeholder testimonials** (`name: 'Placeholder Name'`). Replace
them with real, attributable reviews. Inventing testimonials is a
consumer-protection problem in most jurisdictions, not just a trust one.

The aggregate rating block stays hidden while `reviewSummary.count` is `0`, so
nothing false is claimed until you set a real number.

### 3. Replace `src/data/articles.ts`

Three generic placeholder guides ship with the template. They are safe to
publish, but they are not the client's expertise — rewrite or expand them.

### 4. Replace the images

See [Images](#images).

### 5. Rewrite the legal pages

`src/pages/privacy.astro` and `src/pages/terms.astro` ship with **placeholder
text and a visible warning banner**. They exist so the site can launch with
working compliance links, not as legal advice. Replace both with copy drafted
for the client — PDPA-aligned for Singapore — then delete the `.legal-notice`
block from each page.

---

## Config reference

`src/config/client.ts` is fully typed. A typo in a field name or an unknown
icon is caught by `npm run check` rather than silently rendering nothing.

| Key | Drives |
| --- | --- |
| `company` | Name, legal name, division, tagline, UEN, founded year |
| `brand` | The colour palette — see [How theming works](#how-theming-works) |
| `logo` | Path and rendered height |
| `hero` | Headline (+ accent half), subheadline, location badge, service line, background image, trust badges |
| `contact` | Phone, `phoneHref`, email, WhatsApp, address, business hours |
| `social` | Platform + URL pairs |
| `nav` | The 7 page links. `Nav.astro` marks the current one automatically |
| `services` | `slug`, `name`, `shortDescription`, `longDescription`, `includedItems[]`, `icon`, `image` |
| `process` | Numbered steps. 4–5 works best |
| `trust` | The icon row |
| `about` | `preview` (homepage), `story[]` (/about), `values[]`, `points[]`, photo |
| `gallery` | `categories[]` (filter buttons) and `items[]` |
| `faq` | Site-wide Q&A pairs |
| `pricing` | `cards[]`, `disclaimer`, `faq[]` |
| `serviceArea` | `areas[]` with `slug`/`name`/optional `description`, plus `descriptionTemplate` |
| `finalCta` | Defaults for the reusable CTA banner |
| `form` | Labels, consent text, submit endpoint |
| `legal` | Last-updated date, privacy contact |
| `analytics` | GA4 / Meta Pixel / Google Ads IDs |
| `seo` | `siteUrl`, site-wide fallbacks, and `pages` per-page overrides |

### Per-page SEO

`seo.pages` holds a title and description per page key. Pages pass
`pageKey="pricing"` to `BaseLayout`, which resolves:

```
explicit prop  →  seo.pages[pageKey]  →  seo (site-wide default)
```

Any key or field may be omitted. The dynamic routes build their own metadata
from the article or area, so each of the 22 area pages and 3 article pages gets
a unique title and description automatically.

> **`phoneHref` vs `phone`** — `phone` is what visitors read
> (`+65 6816 2069`); `phoneHref` is what the `tel:` link dials
> (`+6568162069`, digits and a leading `+` only). Both need updating.

### ⚠️ Pricing figures are placeholders

`pricing.cards[].startingFrom` ships as `S$--`. Replace every one with a figure
the client has confirmed. Publishing invented prices for a real business is a
misrepresentation problem, and the "every project is different" disclaimer does
not cover it.

### ⚠️ Area pages and thin content

`/areas/<slug>` generates 22 near-identical pages from one template. Search
engines may treat a set like this as doorway pages if the only difference is the
place name. Give the areas that matter a bespoke `description` in the config
(`yishun` has one as an example) — the more that carry genuinely local detail,
the better the whole set performs.

---

## Components

Shared building blocks in `src/components/`:

| Component | Used by | Notes |
| --- | --- | --- |
| `Nav.astro` | Every page (via BaseLayout) | Marks the current page, incl. nested routes |
| `Footer.astro` | Every page (via BaseLayout) | Site links, services, hours, compliance |
| `EstimateForm.astro` | Homepage hero, /contact, /services, articles, areas | `variant="card" \| "full"` |
| `ServiceCard.astro` | Homepage grid | Deep-links to `/services#<slug>` |
| `ReviewCarousel.astro` | Homepage, /about, area pages | Pass a unique `uid` per instance |
| `FAQAccordion.astro` | Homepage, /pricing | Pass a unique `groupName` per instance |
| `CTABanner.astro` | Most pages | Every string overridable |
| `TrustBar.astro` | Homepage, /services, /about, /contact, areas | Icon row |
| `PageHero.astro` | Every inner page | Dark page-title banner |
| `Icon.astro` | Everywhere | Inline SVG set, no icon library |
| `SmartImage.astro` | Everywhere | See [Images](#images) |

### EstimateForm variants

Both render identical fields, identical hidden attribution fields and the
identical consent checkbox. Only spacing and chrome differ.

- **`card`** — compact, white card with the logo on top. Used in the homepage
  hero as the primary conversion point, and as a sidebar on articles and area
  pages.
- **`full`** — wider, roomier. Used on `/contact` and `/services`.

Every id is namespaced with a per-instance uid, so two forms can coexist on one
page without colliding.

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
but you ship whatever you put there, at whatever size it is.

The logo lives in `public/images/` because it is an SVG and needs no processing.

### Expected filenames and sizes

| File | Size | Used by |
| --- | --- | --- |
| `hero-placeholder.webp` | 1920×1080 | Hero + page-hero backgrounds |
| `about-placeholder.webp` | 1000×750 | About photo |
| `service-1…6-placeholder.webp` | 800×600 | Service cards and sections |
| `gallery-1…8-placeholder.webp` | 900×900 | Gallery (square) |
| `article-1…3-placeholder.webp` | 1200×675 | Resource Centre |
| `logo-placeholder.svg` | ~176×40 | Nav, footer, hero, form card (`public/images/`) |

Supply WebP where you can. JPG and PNG work too — anything in
`src/assets/images/` is converted to WebP at build time regardless.

---

## How theming works

Brand colours are defined **once**, in `src/config/client.ts` → `brand`:

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

Change one hex in the config and all 34 pages re-skin — nav, hero, buttons,
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
only external asset the pages request.

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

`wrangler.toml` holds the project name and compatibility date.

### Before the first production deploy

Set `seo.siteUrl` in the config to the real domain. It drives canonical URLs
and the sitemap, both of which are wrong while it says `example.com`.

---

## Going live: the remaining wiring

Deliberately **not built yet**, per the project brief:

- GoHighLevel API integration
- Chat widget, review widget, calendar booking
- Live tracking scripts
- Gallery lightbox (marked optional)

### The estimate form

`src/components/EstimateForm.astro` is complete and working, in **demo mode**.
With `form.endpoint` set to `''`, submitting validates the input and logs the
payload to the browser console instead of sending it. Open DevTools and submit
to see the exact shape.

The payload includes seven attribution fields populated on page load — the five
standard UTM parameters read from the query string, plus `page_url` and
`referrer` — so leads can be attributed to their source.

Two ways to go live:

**A. Direct POST.** If GHL gives you an endpoint that is safe to call from a
browser, paste it into `form.endpoint`. The existing handler will `POST` JSON to
it. Nothing else to change — every form instance on every page picks it up.

**B. Via a Pages Function** (needed if a secret token is involved). Create
`functions/api/lead.ts` in this repo — Cloudflare Pages picks it up
automatically, still no adapter required — read `GHL_API_TOKEN` from the
environment there, and set `form.endpoint` to `/api/lead`. This keeps the token
server-side. Copy `.env.example` to `.env` for local development.

> Do not put an API token in `client.ts`. That file is bundled into the pages
> and is readable by anyone who views source. `.env` and Pages environment
> variables are the right place — see the notes at the top of `.env.example`.

### Tracking scripts

`BaseLayout.astro` has three commented slots in `<head>` for GA4, Meta Pixel and
Google Ads. They render the configured IDs into an HTML comment so you can
confirm the config is wired up by viewing page source. Replace each comment with
the real vendor snippet when you are ready.

### Map embed

`/contact` has a styled placeholder block where the client's Google Maps iframe
goes. It is left out deliberately: a hardcoded embed would load third-party
cookies on every page view and point at the wrong address for the next client.

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
    ├── data/
    │   ├── reviews.ts        ← Replace before launch
    │   └── articles.ts       ← Resource Centre content
    ├── styles/global.css     Design system + Tailwind theme bridge
    ├── layouts/
    │   ├── BaseLayout.astro  <head>, brand vars, nav, footer, slot
    │   └── LegalLayout.astro Shell for /privacy and /terms
    ├── components/           See the Components table above
    └── pages/
        ├── index.astro
        ├── services.astro
        ├── gallery.astro
        ├── pricing.astro
        ├── about.astro
        ├── contact.astro
        ├── privacy.astro
        ├── terms.astro
        ├── resources/
        │   ├── index.astro
        │   └── [slug].astro
        └── areas/
            └── [slug].astro
```

### JavaScript budget

The built pages ship **no separate JS bundle**. Four small scripts are inlined,
and only on the pages that need them:

- the mobile menu toggle (every page)
- the estimate form handler (pages with a form)
- the review carousel arrows (pages with a carousel)
- the gallery filter (`/gallery` only)

Everything else is CSS or native HTML. The FAQ uses `<details>`/`<summary>`, the
carousel uses CSS scroll-snap, and smooth scrolling is `scroll-behavior` — all
of which keep working with JavaScript disabled. The gallery filter bar hides
itself without JS, so the grid simply shows every project.
`prefers-reduced-motion` is respected throughout.

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
