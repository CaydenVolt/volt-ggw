import type { APIRoute } from 'astro';
import { siteUrl, isPreview } from '../config/client.ts';

/**
 * /robots.txt
 *
 * While `deployment.isPreview` is true this disallows everything and
 * advertises no sitemap, belt and braces alongside the per-page noindex tag.
 * Crawlers respect robots.txt for *crawling*; the meta tag is what keeps an
 * already-known URL out of the index. Preview builds want both.
 *
 * Flip `deployment.isPreview` to false and this becomes a normal
 * allow-everything robots.txt pointing at the sitemap.
 */
export const GET: APIRoute = () => {
  const body = isPreview
    ? [
        '# Client preview build, intentionally excluded from search.',
        '# Flip `deployment.isPreview` to false in src/config/client.ts to go live.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n')
    : [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${siteUrl}/sitemap-index.xml`,
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
