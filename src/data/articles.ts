/**
 * Resource Centre articles.
 *
 * WHY BLOCKS AND NOT MARKDOWN
 * ───────────────────────────
 * Article bodies are structured blocks rather than a markdown string. A
 * markdown string would need a parser at build time and would silently accept
 * malformed input; blocks are fully typed, so a missing heading or a mistyped
 * field is caught by `npm run check`.
 *
 * If you would rather author in markdown, move these into an Astro content
 * collection at `src/content/articles/`, `/resources/[slug].astro` would then
 * render `entry.render()` instead of mapping over blocks.
 *
 * These three articles are PLACEHOLDERS written as generic trade advice. They
 * are safe to publish as-is, but they are not a substitute for the client's own
 * expertise, replace or expand them before treating the Resource Centre as a
 * real content channel.
 */

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] };

export interface Article {
  /** Drives `/resources/<slug>`. Lowercase, hyphenated, unique. */
  slug: string;
  title: string;
  /** One or two sentences for the listing card and the meta description. */
  excerpt: string;
  /** Free text. Used as the card's category chip. */
  category: string;
  /** Shown on the card, e.g. "5 min read". */
  readTime: string;
  /** ISO date, drives sort order on the listing page (newest first). */
  publishedAt: string;
  image: string;
  body: ArticleBlock[];
}

export const articles: Article[] = [
  {
    slug: 'why-paint-peels-in-singapore',
    title: 'Why Paint Peels in Singapore (And Why Repainting Won’t Fix It)',
    excerpt:
      'Peeling paint is almost never a paint problem. Here is what is actually happening behind the wall, and how to tell whether you need a repaint or a repair.',
    category: 'Painting',
    readTime: '5 min read',
    publishedAt: '2026-08-14',
    image: '/images/article-peeling.webp',
    body: [
      {
        type: 'paragraph',
        text: 'If your paint is bubbling, flaking or coming away in sheets, the instinct is to scrape it back and put fresh paint on. In most Singapore properties that buys you somewhere between six and eighteen months before the same patch fails again, because the paint was never the problem.',
      },
      { type: 'heading', text: 'Paint fails when the surface underneath is wet' },
      {
        type: 'paragraph',
        text: 'Modern paint bonds to a surface. If moisture is moving through that surface from behind, it pushes the coating off no matter how good the paint is. In Singapore that moisture usually comes from one of a small number of places, and each of them needs a different fix.',
      },
      {
        type: 'list',
        items: [
          'A failed waterproofing membrane on a roof, balcony or planter above the affected area',
          'A leaking pipe or conduit buried in the slab or wall',
          'Rising damp through a ground-floor wall with no effective damp-proof course',
          'Condensation on a wall shared with an air-conditioned room',
          'Spalling concrete, where rusting reinforcement is pushing the surface apart from within',
        ],
      },
      { type: 'heading', text: 'How to tell the difference' },
      {
        type: 'paragraph',
        text: 'There are a few useful signals you can check yourself before calling anyone. None of them are conclusive, but together they usually point in the right direction.',
      },
      {
        type: 'list',
        items: [
          'Does the patch get visibly worse after heavy rain? That points upward, roof, balcony or external wall.',
          'Is it worst near a bathroom, kitchen or riser? That points at plumbing.',
          'Is the affected area cool and damp to the touch but the rest of the wall dry? Likely condensation.',
          'Can you see rust staining or hear a hollow sound when you tap it? That is spalling concrete, and it is structural.',
        ],
      },
      { type: 'heading', text: 'What a proper diagnosis involves' },
      {
        type: 'paragraph',
        text: 'A contractor who quotes to repaint a damp wall without investigating is selling you a cosmetic result. Diagnosis should involve a moisture meter reading across the affected area and the surrounding dry area for comparison, and often thermal imaging to trace where water is travelling before it surfaces.',
      },
      {
        type: 'paragraph',
        text: 'Only once the source is identified and repaired does repainting make sense. At that point the surface needs to dry out fully, be treated for any fungal growth, primed with an appropriate sealer, and then repainted. Skip the drying step and you are back where you started.',
      },
      { type: 'heading', text: 'The short version' },
      {
        type: 'paragraph',
        text: 'If paint is peeling, find out why before you buy more paint. A repaint on a wet substrate is money spent on a delay, not a repair.',
      },
    ],
  },
  {
    slug: 'waterproofing-systems-explained',
    title: 'Waterproofing Systems Explained: Which One Does Your Property Need?',
    excerpt:
      'Torch-on membrane, liquid-applied, cementitious, injection, a plain-language guide to what each system is for and where each one fails.',
    category: 'Waterproofing',
    readTime: '7 min read',
    publishedAt: '2026-07-22',
    image: '/images/stock-article-waterproofing.webp',
    body: [
      {
        type: 'paragraph',
        text: 'Waterproofing is not one product. It is a category containing several quite different systems, and the most common cause of failure is not bad workmanship, it is the wrong system specified for the substrate and exposure in the first place.',
      },
      { type: 'heading', text: 'Torch-on membrane' },
      {
        type: 'paragraph',
        text: 'Sheets of bituminous membrane heat-welded to the substrate with a torch. Robust, thick, and forgiving of minor substrate movement. It is the usual choice for flat roofs and large podium decks.',
      },
      {
        type: 'paragraph',
        text: 'Its weakness is detail work. Around drains, upstands and pipe penetrations the sheet has to be cut and lapped, and those laps are where nearly every torch-on failure starts. It also needs a protective screed or covering, left exposed to Singapore UV it degrades faster than the datasheet suggests.',
      },
      { type: 'heading', text: 'Liquid-applied membrane' },
      {
        type: 'paragraph',
        text: 'Polyurethane or acrylic applied by roller or spray, curing into a seamless film. Because there are no joints, it handles complex shapes, balconies, planters, bathrooms, anything with a lot of corners and penetrations, far better than sheet systems.',
      },
      {
        type: 'paragraph',
        text: 'The tradeoff is that film thickness depends entirely on the applicator. Too thin and it will not perform, and you cannot tell by looking. This is a system where who applies it matters as much as what is applied.',
      },
      { type: 'heading', text: 'Cementitious coatings' },
      {
        type: 'paragraph',
        text: 'Cement-based slurries that bond to concrete and masonry. Cheap, easy to apply, and tolerant of damp substrates, which makes them common for water tanks, basements and internal wet areas.',
      },
      {
        type: 'paragraph',
        text: 'They are rigid, though. Any structural movement or crack in the substrate transfers straight through, so they are a poor choice anywhere that flexes or is exposed to thermal cycling.',
      },
      { type: 'heading', text: 'Injection grouting' },
      {
        type: 'paragraph',
        text: 'Resin or grout injected under pressure into an existing crack. A repair technique rather than a waterproofing system, useful for stopping an active leak through a structural crack, not for protecting a surface.',
      },
      { type: 'heading', text: 'What actually determines the choice' },
      {
        type: 'list',
        items: [
          'What the substrate is, and whether it moves',
          'Whether the surface will be walked on, planted on, or left alone',
          'Whether it will be exposed to UV or covered by screed or tiles',
          'How much standing water it needs to tolerate, and for how long',
          'Whether you can take the area out of service long enough for proper curing',
        ],
      },
      {
        type: 'paragraph',
        text: 'Any contractor quoting a waterproofing job should tell you which system they are proposing and why that one. If the quotation just says "waterproofing" with a price, you do not yet have enough information to compare it against anything.',
      },
    ],
  },
  {
    slug: 'preparing-your-home-for-painters',
    title: 'Preparing Your Home for the Painters: A Practical Checklist',
    excerpt:
      'What to move, what to cover, what to tell your contractor, and what a good crew should handle themselves.',
    category: 'Guides',
    readTime: '4 min read',
    publishedAt: '2026-06-30',
    image: '/images/article-prep.webp',
    body: [
      {
        type: 'paragraph',
        text: 'A repaint goes faster, cleaner and cheaper when the property is ready before the crew arrives. Most of this is not your job, but a few things genuinely help, and a few things are worth asking about before day one.',
      },
      { type: 'heading', text: 'Before the crew arrives' },
      {
        type: 'list',
        items: [
          'Take down photos, mirrors, curtains and wall-mounted fittings you care about',
          'Empty or move display cabinets, sheeting protects from paint, not from knocks',
          'Clear a path from the door to the work area for equipment',
          'Put valuables, documents and small electronics somewhere else entirely',
          'Decide where pets will be during working hours',
        ],
      },
      { type: 'heading', text: 'What the crew should handle' },
      {
        type: 'paragraph',
        text: 'You should not be masking skirting boards or laying dust sheets yourself. A professional crew arrives with its own protection and treats it as part of the job, not an extra.',
      },
      {
        type: 'list',
        items: [
          'Sheeting and taping all furniture that stays in the room',
          'Covering floors wall to wall, not just the middle',
          'Masking skirtings, frames, switches and sockets',
          'Removing and reinstating switch and socket faceplates where needed',
          'Daily cleanup, you should be able to use the rest of the home each evening',
        ],
      },
      { type: 'heading', text: 'Things worth asking before they start' },
      {
        type: 'list',
        items: [
          'How many coats, and is primer included as a separate coat?',
          'What is the exact product and finish being used in each room?',
          'How long between coats, and when can furniture go back?',
          'Who is on site each day, and who do I call if something is wrong?',
          'What happens if you find damage behind the furniture or under the old paint?',
        ],
      },
      {
        type: 'paragraph',
        text: 'That last one matters more than it sounds. Concealed damage is the most common reason a job changes price midway. Agreeing up front that additional work gets quoted and approved in writing, before anyone does it, avoids the single most common dispute in this trade.',
      },
      { type: 'heading', text: 'After the work' },
      {
        type: 'paragraph',
        text: 'Walk the site with the crew before they pack up. Look at the surfaces in daylight and at an angle, not straight on, that is how you spot roller marks, thin coverage and missed edges. A good contractor expects this and will touch up on the spot.',
      },
    ],
  },
];

/** Newest first. */
export const articlesByDate = [...articles].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

export default articles;
