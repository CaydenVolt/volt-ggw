/**
 * Customer reviews shown in the carousel.
 *
 * These are REAL reviews, transcribed from the client's Google Business
 * Profile. They are rendered as text rather than embedded screenshots so they
 * stay responsive, readable to screen readers, and indexable.
 *
 * ⚠️ Only add entries here that came from a real, attributable review. Writing
 * plausible-sounding testimonials is a consumer-protection problem in most
 * jurisdictions, not merely a trust one.
 *
 * `reviewSummary.count` must match the number of genuine reviews on the
 * profile — update it when the count changes, or set it to 0 to hide the
 * aggregate rating entirely.
 */

export interface Review {
  /** Whole stars, 1–5. */
  stars: number;
  quote: string;
  name: string;
  /** Job type or location, e.g. "Waterproofing — Tampines". */
  jobType: string;
  /** Relative age as shown on the profile, e.g. "3 months ago". Optional. */
  when?: string;
}

/** Aggregate rating shown above the carousel. Set `count: 0` to hide it. */
export const reviewSummary = {
  heading: 'What Our Customers Say',
  rating: 5.0,
  count: 2,
  source: 'Google',
};

export const reviews: Review[] = [
  {
    stars: 5,
    quote:
      'Had a great experience using Goal Green World’s services for the installation of the solar panels. They’ve been very helpful with prompt replies!',
    name: '郑佳音',
    jobType: 'Solar Installation',
    when: '3 months ago',
  },
  {
    stars: 5,
    quote: 'Quick and efficient response. Recommended.',
    name: 'siewhong thum',
    jobType: 'Google review',
    when: '3 months ago',
  },
];

export default reviews;
