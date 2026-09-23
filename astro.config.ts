import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import client from './src/config/client.ts';

// https://astro.build/config
export default defineConfig({
  /**
   * Production origin. Drives canonical URLs and the generated sitemap.
   * Change it in `src/config/client.ts` → `seo.siteUrl`, not here.
   */
  site: client.seo.siteUrl,

  /**
   * Fully static. Every page is pre-rendered to HTML at build time and the
   * whole `dist/` folder is uploaded to Cloudflare Pages as static assets.
   *
   * ── On the Cloudflare adapter ────────────────────────────────────────────
   * `@astrojs/cloudflare` is deliberately NOT installed. Adapters exist to run
   * server-rendered routes on demand; this site has none, so adding one would
   * emit a Worker bundle, put a Worker invocation in front of every request,
   * and buy nothing.
   *
   * When the GoHighLevel integration needs a server-side endpoint (to keep the
   * API token off the client), add a Cloudflare **Pages Function** instead —
   * a single file at `functions/api/lead.ts` in this repo. Pages picks it up
   * automatically, still no adapter required. See README → "Going live".
   */
  output: 'static',

  build: {
    // Emit `/privacy/index.html` so URLs work with or without a trailing slash.
    format: 'directory',
  },

  image: {
    // Placeholders are already WebP; this keeps output predictable.
    responsiveStyles: true,
  },

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
