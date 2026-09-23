/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLIENT CONFIG — the only file you edit to re-skin this template.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  To clone this template for a new client:
 *    1. Edit every value in this file.
 *    2. Replace the images in `public/images/` (keep the same filenames).
 *    3. Run `npm run build`.
 *
 *  Nothing client-specific should live in a component. If you find yourself
 *  editing a component to change copy, add a field here instead.
 *
 *  Secrets (API tokens, private keys) do NOT belong here — this file ships to
 *  the browser. Put those in `.env` (see `.env.example`).
 */

/* ── Types ──────────────────────────────────────────────────────────────── */

/** Icon identifiers understood by `src/components/Icon.astro`. */
export type IconName =
  | 'roller'
  | 'droplet'
  | 'shield'
  | 'building'
  | 'wrench'
  | 'sparkles'
  | 'leaf'
  | 'award'
  | 'badge-check'
  | 'clock'
  | 'users'
  | 'star'
  | 'phone'
  | 'mail'
  | 'map-pin';

export interface Service {
  /** Stable slug — used for anchors and image filenames. */
  id: string;
  name: string;
  /** One line. Keep it under ~110 characters so cards stay even. */
  description: string;
  icon: IconName;
  /** Path under `public/`. */
  image: string;
  /** Where "Learn more" points. A hash anchor today; a real page later. */
  href: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TrustPoint {
  label: string;
  /** Optional supporting line — shown in the trust bar, not in hero badges. */
  detail?: string;
  icon: IconName;
}

export interface GalleryItem {
  image: string;
  alt: string;
  /** Free-text tag, e.g. "Waterproofing". Used as the overlay chip. */
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BusinessHour {
  days: string;
  hours: string;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube';
  url: string;
}

/* ── Config ─────────────────────────────────────────────────────────────── */

export const client = {
  /* ---- Identity ---------------------------------------------------------- */
  company: {
    /** Trading name shown in the nav, footer and copyright line. */
    name: 'Goal Green World',
    /** Full legal name — used in the footer and on the compliance pages. */
    legalName: 'Goal Green World Pte Ltd',
    /** The division this site sells. Appears next to the logo. */
    division: 'Painting & Waterproofing',
    tagline: 'Build a Greener World with Us',
    /** Singapore business registration number. Leave '' to hide it. */
    registrationNumber: 'UEN 202009752D',
    /** Year the business started — drives the "X+ years" copy. */
    foundedYear: 2020,
  },

  /* ---- Branding ---------------------------------------------------------- */
  brand: {
    /**
     * These feed CSS custom properties, which Tailwind reads as
     * `bg-brand-primary`, `text-brand-accent`, etc.
     * Any valid CSS colour works. Keep contrast in mind: `accent` sits on
     * `primary`, and `accentText` sits on `accent`.
     *
     * Goal Green World's own palette is green (#1E7A46 / #8DC63F) — swap
     * `primary` and `accent` below when the client signs off on brand colours.
     */
    primary: '#0B1F3A',       // deep navy — nav, hero, footer, dark bands
    primaryLight: '#15305A',  // lifted navy — cards and borders on dark
    secondary: '#1E3A5F',     // mid navy — secondary surfaces
    accent: '#F0A81C',        // amber — CTAs, numbers, highlights
    accentHover: '#D9940F',
    /** Text colour that sits *on top of* `accent`. */
    accentText: '#11203A',
    background: '#FFFFFF',    // light content sections
    backgroundAlt: '#F5F7FA', // alternating light band
    text: '#1A2233',          // body copy on light
    textMuted: '#5A6779',     // supporting copy on light
  },

  /** Logo lives in `public/images/`. Swap the file, keep the path. */
  logo: {
    src: '/images/logo-placeholder.svg',
    alt: 'Goal Green World',
    /** Rendered height in px; width scales automatically. */
    height: 38,
  },

  /* ---- Above the fold ---------------------------------------------------- */
  hero: {
    headline: 'Singapore Painting & Waterproofing That Actually Lasts',
    subheadline:
      'Low-VOC eco paints, proper surface preparation and certified waterproofing for HDB, condo and commercial properties. bizSAFE and ISO certified.',
    image: '/images/hero-placeholder.webp',
    imageAlt: 'Painting and waterproofing crew at work on a Singapore building facade',
    /** Short badges shown in a row under the hero CTAs. Aim for 3-5. */
    badges: ['bizSAFE Certified', 'ISO 9001 & 45001', 'Low-VOC Eco Paints', '5.0 on Google'],
  },

  /* ---- Contact ----------------------------------------------------------- */
  contact: {
    /** Human-readable. */
    phone: '+65 6816 2069',
    /** Dial string for the tel: link — digits and a leading + only. */
    phoneHref: '+6568162069',
    email: 'info@goalgreen.world',
    /** Full wa.me link including any prefilled text. */
    whatsapp:
      'https://wa.me/6568162069?text=Hi%20Goal%20Green%20World%2C%20I%27d%20like%20a%20quote%20for%20painting%20%2F%20waterproofing.',
    address: {
      line1: '1 Yishun Street 23',
      line2: '',
      city: 'Singapore',
      postalCode: '768441',
      country: 'Singapore',
    },
    /** Shown in the footer. */
    hours: [
      { days: 'Monday – Friday', hours: '9:00am – 6:00pm' },
      { days: 'Saturday', hours: '9:00am – 1:00pm' },
      { days: 'Sunday & Public Holidays', hours: 'Closed' },
    ] as BusinessHour[],
  },

  social: [
    { platform: 'facebook', url: 'https://facebook.com/goalgreenworld' },
    { platform: 'instagram', url: 'https://instagram.com/goalgreenworld' },
  ] as SocialLink[],

  /* ---- Navigation -------------------------------------------------------- */
  /** Centre links in the sticky nav. `href` must match a section id. */
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ],

  /* ---- Services ---------------------------------------------------------- */
  services: [
    {
      id: 'interior-painting',
      name: 'Interior Painting',
      description:
        'Low-VOC repainting for homes and offices, with full furniture protection and same-day cleanup.',
      icon: 'roller',
      image: '/images/service-1-placeholder.webp',
      href: '#quote',
    },
    {
      id: 'exterior-painting',
      name: 'Exterior & Facade Painting',
      description:
        'Weather-resistant coatings built for Singapore humidity, UV and monsoon rain.',
      icon: 'building',
      image: '/images/service-2-placeholder.webp',
      href: '#quote',
    },
    {
      id: 'waterproofing',
      name: 'Waterproofing',
      description:
        'Membrane and liquid-applied systems for roofs, balconies, planters and wet areas.',
      icon: 'droplet',
      image: '/images/service-3-placeholder.webp',
      href: '#quote',
    },
    {
      id: 'leak-repair',
      name: 'Leak Detection & Repair',
      description:
        'We trace the source of ceiling and wall leaks, then fix the cause — not just the stain.',
      icon: 'wrench',
      image: '/images/service-4-placeholder.webp',
      href: '#quote',
    },
    {
      id: 'protective-coatings',
      name: 'Protective & Industrial Coatings',
      description:
        'Anti-mould, anti-carbonation and epoxy systems for plants, car parks and warehouses.',
      icon: 'shield',
      image: '/images/service-5-placeholder.webp',
      href: '#quote',
    },
    {
      id: 'surface-prep',
      name: 'Surface Repair & Preparation',
      description:
        'Crack filling, spalling concrete repair and skim coating before a single drop of paint.',
      icon: 'sparkles',
      image: '/images/service-6-placeholder.webp',
      href: '#quote',
    },
  ] as Service[],

  /* ---- Process ----------------------------------------------------------- */
  process: {
    heading: 'How We Work',
    subheading: 'No surprises, no hidden costs, no shortcuts on preparation.',
    steps: [
      {
        title: 'Free Site Assessment',
        description:
          'We visit, measure, and identify the real cause of any damp or peeling before quoting.',
      },
      {
        title: 'Transparent Quotation',
        description:
          'An itemised quote covering materials, coats, preparation and timeline. Fixed price.',
      },
      {
        title: 'Preparation & Protection',
        description:
          'Furniture sheeted, edges masked, surfaces repaired and primed. This is where jobs are won or lost.',
      },
      {
        title: 'Application',
        description:
          'Certified crews apply the specified system at the correct thickness and curing time.',
      },
      {
        title: 'Inspection & Handover',
        description:
          'We walk the site with you, touch up anything flagged, and leave it clean.',
      },
    ] as ProcessStep[],
  },

  /* ---- Trust bar --------------------------------------------------------- */
  trust: {
    heading: 'Why Property Owners Choose Us',
    points: [
      { label: 'bizSAFE Certified', detail: 'Audited workplace safety', icon: 'badge-check' },
      { label: 'ISO 9001 & 45001', detail: 'Quality and safety management', icon: 'award' },
      { label: 'Low-VOC Eco Paints', detail: 'Safer for your family and staff', icon: 'leaf' },
      { label: 'Fully Insured Crews', detail: 'Public liability covered', icon: 'shield' },
      { label: 'On-Time Completion', detail: 'Agreed dates, kept', icon: 'clock' },
    ] as TrustPoint[],
  },

  /* ---- About ------------------------------------------------------------- */
  about: {
    heading: 'Part of Singapore’s Greener Building Movement',
    /** Each string is a paragraph. */
    body: [
      'Goal Green World Pte Ltd is an ethical, sustainability-driven group delivering green solutions across energy, infrastructure and essential services in Singapore.',
      'Our Painting & Waterproofing division brings that same standard to buildings: eco-aware, low-VOC coatings applied by bizSAFE-certified crews who prepare surfaces properly the first time. Whether it is an HDB flat, a condominium block or an industrial facility, we specify the system that suits the substrate and the climate.',
    ],
    image: '/images/about-placeholder.webp',
    imageAlt: 'The Goal Green World painting and waterproofing team',
    /** Differentiators — rendered as a ticked list beside the photo. */
    points: [
      'ISO 9001:2015 and ISO 45001:2018 certified processes',
      'Low-VOC, eco-aware paints and coatings as standard',
      'Written warranty on waterproofing works',
      'Direct crews — we do not subcontract your job out',
      'Detailed, itemised quotes with no variation surprises',
    ],
  },

  /* ---- Gallery ----------------------------------------------------------- */
  gallery: {
    heading: 'Recent Projects',
    subheading: 'A sample of painting and waterproofing work completed across Singapore.',
    items: [
      { image: '/images/gallery-1-placeholder.webp', alt: 'Repainted HDB living room', category: 'Painting' },
      { image: '/images/gallery-2-placeholder.webp', alt: 'Roof waterproofing membrane application', category: 'Waterproofing' },
      { image: '/images/gallery-3-placeholder.webp', alt: 'Condominium facade repainting', category: 'Commercial' },
      { image: '/images/gallery-4-placeholder.webp', alt: 'Bathroom wet area waterproofing', category: 'Waterproofing' },
      { image: '/images/gallery-5-placeholder.webp', alt: 'Office interior repaint', category: 'Painting' },
      { image: '/images/gallery-6-placeholder.webp', alt: 'Warehouse epoxy floor coating', category: 'Commercial' },
    ] as GalleryItem[],
  },

  /* ---- FAQ --------------------------------------------------------------- */
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'How much does it cost to repaint an HDB flat?',
        answer:
          'It depends on the flat type, the number of coats and how much repair work the walls need. Most 4-room repaints fall within a predictable range, and we give you a fixed, itemised quote after a free site visit — so the number you see is the number you pay.',
      },
      {
        question: 'How long will the work take?',
        answer:
          'A typical residential repaint takes 2–4 days. Waterproofing depends on curing times between coats and usually runs 3–7 days. We confirm the schedule in writing before we start.',
      },
      {
        question: 'Do you offer a warranty on waterproofing?',
        answer:
          'Yes. Waterproofing works come with a written warranty. The term varies by system and substrate, and it is stated clearly on your quotation before you commit.',
      },
      {
        question: 'Are your paints safe for children and pets?',
        answer:
          'We use low-VOC, eco-aware paints as standard. They have far less odour than conventional paint and are safer for occupied homes and offices.',
      },
      {
        question: 'Do I need to move out during the work?',
        answer:
          'Usually not. We work room by room, sheet your furniture and clean up daily so the rest of the home stays usable.',
      },
      {
        question: 'Which areas of Singapore do you cover?',
        answer:
          'We serve the whole of Singapore, including all HDB towns, private condominiums and industrial estates. See the coverage list below.',
      },
    ] as FaqItem[],
  },

  /* ---- Service area ------------------------------------------------------ */
  serviceArea: {
    heading: 'Areas We Serve',
    subheading: 'Island-wide coverage across Singapore.',
    /** Rendered as a tag cloud. */
    cities: [
      'Yishun', 'Woodlands', 'Sembawang', 'Ang Mo Kio', 'Bishan', 'Toa Payoh',
      'Serangoon', 'Hougang', 'Sengkang', 'Punggol', 'Tampines', 'Bedok',
      'Pasir Ris', 'Jurong East', 'Jurong West', 'Clementi', 'Bukit Batok',
      'Choa Chu Kang', 'Bukit Panjang', 'Queenstown', 'Novena', 'Central Business District',
    ],
  },

  /* ---- Final CTA --------------------------------------------------------- */
  finalCta: {
    headline: 'Ready to Get Started?',
    subtext:
      'Book a free site assessment. We will inspect, advise and quote — with no obligation to proceed.',
    buttonLabel: 'Get My Free Quote',
  },

  /* ---- Quote form -------------------------------------------------------- */
  form: {
    heading: 'Get a Free Quote',
    subheading: 'Tell us about your project and we will come back to you within one business day.',
    submitLabel: 'Request My Free Quote',
    successMessage:
      'Thank you — your request is in. We will contact you within one business day.',
    /**
     * Where the form POSTs. Empty string = demo mode: the form logs the payload
     * to the console and shows the success message without a network call.
     * Drop the GoHighLevel webhook / form endpoint in here to go live.
     */
    endpoint: '',
    /** Text beside the consent checkbox. `{company}` is replaced at render. */
    consentText:
      'I agree to receive SMS and WhatsApp messages from {company} about my enquiry. Message and data rates may apply. Reply STOP to opt out.',
    consentRequired: true,
  },

  /* ---- Compliance -------------------------------------------------------- */
  legal: {
    /** Shown on /privacy and /terms as the "last updated" date. */
    lastUpdated: '23 September 2026',
    privacyEmail: 'info@goalgreen.world',
  },

  /* ---- Analytics --------------------------------------------------------- */
  /**
   * IDs only — these are public by design. The actual <script> snippets are
   * NOT injected yet; `BaseLayout.astro` has commented slots in <head> ready
   * for them. Leave a value as '' to keep that slot dormant.
   */
  analytics: {
    ga4Id: '',       // e.g. 'G-XXXXXXXXXX'
    metaPixelId: '', // e.g. '1234567890'
    googleAdsId: '', // e.g. 'AW-123456789'
    googleAdsConversionLabel: '',
  },

  /* ---- SEO --------------------------------------------------------------- */
  seo: {
    /** Production origin, no trailing slash. Used for canonical + sitemap. */
    siteUrl: 'https://example.com',
    title: 'Painting & Waterproofing Singapore | Goal Green World',
    description:
      'Certified painting and waterproofing contractor in Singapore. Low-VOC eco paints, proper surface prep, written warranty. bizSAFE and ISO certified. Free quote.',
    /** Social share image under `public/`. */
    ogImage: '/images/hero-placeholder.webp',
    locale: 'en_SG',
  },
} as const;

export type ClientConfig = typeof client;
export default client;
