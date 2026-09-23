/**
 * Customer reviews shown in the carousel.
 *
 * These are PLACEHOLDERS. Replace them with real, attributable reviews before
 * launch — inventing testimonials is both a trust problem and, in most
 * jurisdictions, a consumer-protection one.
 *
 * Keep at least 4 entries so the carousel has something to scroll.
 */

export interface Review {
  /** Whole stars, 1–5. */
  stars: number;
  quote: string;
  name: string;
  /** Job type or location, e.g. "Waterproofing — Tampines". */
  jobType: string;
}

/** Aggregate rating shown above the carousel. Set `count: 0` to hide it. */
export const reviewSummary = {
  heading: 'What Our Customers Say',
  rating: 5.0,
  count: 0, // ← set to the real Google review count before launch
  source: 'Google',
};

export const reviews: Review[] = [
  {
    stars: 5,
    quote:
      'They found the actual source of the leak in our ceiling after two other contractors just painted over it. Six months on and there is no sign of it coming back.',
    name: 'Placeholder Name',
    jobType: 'Leak Repair & Waterproofing — Tampines',
  },
  {
    stars: 5,
    quote:
      'The prep work was the difference. Every edge masked, all the cracks filled, furniture properly sheeted. The finish looks sprayed rather than rolled.',
    name: 'Placeholder Name',
    jobType: 'Interior Painting — Bishan',
  },
  {
    stars: 5,
    quote:
      'Quoted a fixed price, started on the agreed date and finished a day early. No variation orders, no chasing. Rare in this trade.',
    name: 'Placeholder Name',
    jobType: 'Condo Facade Repainting — Novena',
  },
  {
    stars: 5,
    quote:
      'We repainted the office over a weekend with almost no smell on Monday morning. The low-VOC paint genuinely made a difference for the team.',
    name: 'Placeholder Name',
    jobType: 'Commercial Interior — CBD',
  },
  {
    stars: 5,
    quote:
      'Roof waterproofing on our warehouse held through the whole monsoon season. Clear written warranty, which is why we went with them.',
    name: 'Placeholder Name',
    jobType: 'Roof Waterproofing — Jurong West',
  },
];

export default reviews;
