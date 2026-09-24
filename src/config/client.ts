/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLIENT CONFIG — the only file you edit to re-skin this template.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  To clone this template for a new client:
 *    1. Edit every value in this file.
 *    2. Replace the images in `src/assets/images/` (keep the same filenames).
 *    3. Rewrite `src/pages/privacy.astro` and `src/pages/terms.astro`.
 *    4. Replace the placeholder reviews in `src/data/reviews.ts`.
 *    5. Run `npm run build`.
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
  | 'map-pin'
  | 'target'
  | 'heart'
  | 'thumbs-up';

export interface Service {
  /** URL-safe id. Drives `/services#<slug>` anchors. Must be unique. */
  slug: string;
  name: string;
  /** One line for the homepage cards. Keep under ~110 characters. */
  shortDescription: string;
  /** Full paragraph for the service section on `/services`. */
  longDescription: string;
  /** Rendered as a ticked "what's included" list on `/services`. */
  includedItems: string[];
  icon: IconName;
  image: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TrustPoint {
  label: string;
  detail?: string;
  icon: IconName;
}

export interface GalleryItem {
  image: string;
  alt: string;
  /** Must match one of `gallery.categories` for filtering to work. */
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

export interface NavLink {
  label: string;
  href: string;
}

export interface ValueCard {
  title: string;
  description: string;
  icon: IconName;
}

export interface PricingCard {
  /** Usually matches a service slug, but does not have to. */
  slug: string;
  name: string;
  /** Shown verbatim. Include the currency. */
  startingFrom: string;
  /** Qualifier under the price, e.g. "per room, 2 coats". */
  priceNote: string;
  includes: string[];
  /** Adds a highlighted border. At most one card should set this. */
  featured?: boolean;
}

export interface ServiceArea {
  /** Drives `/areas/<slug>`. Lowercase, hyphenated. */
  slug: string;
  name: string;
  /**
   * Optional bespoke intro for that area's page. When omitted, the page falls
   * back to `serviceArea.descriptionTemplate` with `{area}` substituted.
   */
  description?: string;
}

/** Per-page SEO. Any page may be omitted — it falls back to `seo`. */
export interface PageMeta {
  title?: string;
  description?: string;
}

/* ── Config ─────────────────────────────────────────────────────────────── */

export const client = {
  /* ---- Identity ---------------------------------------------------------- */
  company: {
    name: 'Goal Green World',
    legalName: 'Goal Green World Pte Ltd',
    division: 'Painting & Waterproofing',
    tagline: 'Build a Greener World with Us',
    registrationNumber: 'UEN 202009752D',
    foundedYear: 2020,
  },

  /* ---- Branding ---------------------------------------------------------- */
  brand: {
    /**
     * These feed CSS custom properties, which Tailwind reads as
     * `bg-brand-primary`, `text-brand-accent`, etc.
     *
     * Goal Green World's own palette is green (#1E7A46 / #8DC63F) — swap
     * `primary` and `accent` below when the client signs off on brand colours.
     */
    primary: '#0B1F3A',
    primaryLight: '#15305A',
    secondary: '#1E3A5F',
    accent: '#F0A81C',
    accentHover: '#D9940F',
    accentText: '#11203A',
    background: '#FFFFFF',
    backgroundAlt: '#F5F7FA',
    text: '#1A2233',
    textMuted: '#5A6779',
  },

  logo: {
    src: '/images/logo-placeholder.svg',
    alt: 'Goal Green World',
    height: 38,
  },

  /* ---- Above the fold ---------------------------------------------------- */
  hero: {
    heroHeadline: 'We Don’t Paint Over Problems.',
    /** Rendered in the accent colour on its own line, under the headline. */
    heroHeadlineAccent: 'We Fix Them.',
    heroSubheadline:
      'Singapore painting and waterproofing done the slow way — proper diagnosis, proper preparation, low-VOC eco coatings. For HDB, condo and commercial properties.',
    /** Small pill above the headline. */
    locationBadge: 'bizSAFE Certified · Singapore',
    /** Dot-separated capability line under the headline. */
    serviceLine: 'Painting · Waterproofing · Leak Repair · Protective Coatings',
    /** Subtle background image behind the dark hero. */
    backgroundImage: '/images/hero-placeholder.webp',
    backgroundImageAlt: '',
    badges: ['bizSAFE Certified', 'ISO 9001 & 45001', 'Low-VOC Eco Paints', 'Written Warranty'],
  },

  /* ---- Contact ----------------------------------------------------------- */
  contact: {
    phone: '+65 6816 2069',
    /** Dial string for tel: links — digits and a leading + only. */
    phoneHref: '+6568162069',
    email: 'info@goalgreen.world',
    whatsapp:
      'https://wa.me/6568162069?text=Hi%20Goal%20Green%20World%2C%20I%27d%20like%20a%20quote%20for%20painting%20%2F%20waterproofing.',
    address: {
      line1: '1 Yishun Street 23',
      line2: '',
      city: 'Singapore',
      postalCode: '768441',
      country: 'Singapore',
    },
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
  /**
   * Real page links. `Nav.astro` marks the current page automatically by
   * comparing these against the request path, so order is the only thing that
   * matters here.
   */
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] as NavLink[],

  /* ---- Services ---------------------------------------------------------- */
  services: [
    {
      slug: 'interior-painting',
      name: 'Interior Painting',
      shortDescription:
        'Low-VOC repainting for homes and offices, with full furniture protection and same-day cleanup.',
      longDescription:
        'We repaint occupied homes and working offices without turning your life upside down. Every job starts with protection — furniture sheeted, floors covered, edges masked — then surface repair, priming and two finish coats of low-VOC paint. We work room by room and clean up at the end of each day, so the rest of the property stays usable throughout.',
      includedItems: [
        'Full furniture and flooring protection',
        'Crack filling, sanding and skim coating',
        'Primer plus two coats of low-VOC paint',
        'Colour consultation and sample patches',
        'Daily cleanup and final walkthrough',
      ],
      icon: 'roller',
      image: '/images/service-1-placeholder.webp',
    },
    {
      slug: 'exterior-painting',
      name: 'Exterior & Facade Painting',
      shortDescription:
        'Weather-resistant coatings built for Singapore humidity, UV and monsoon rain.',
      longDescription:
        'Singapore weather is brutal on exterior paint — constant UV, high humidity and heavy rain will find every weak spot in a cheap job. We pressure wash, treat any fungal growth, repair spalling concrete and apply anti-carbonation or elastomeric systems rated for tropical exposure. For high-rise and facade work we coordinate scaffolding or gondola access and all the safety documentation that comes with it.',
      includedItems: [
        'High-pressure washing and fungal treatment',
        'Spalling concrete and crack repair',
        'Anti-carbonation or elastomeric coating systems',
        'Scaffolding or gondola access coordination',
        'Full safety documentation and permits',
      ],
      icon: 'building',
      image: '/images/service-2-placeholder.webp',
    },
    {
      slug: 'waterproofing',
      name: 'Waterproofing',
      shortDescription:
        'Membrane and liquid-applied systems for roofs, balconies, planters and wet areas.',
      longDescription:
        'Waterproofing fails at the details — upstands, drains, corners and joints — not in the middle of a flat surface. We specify the right system for the substrate and exposure, prepare properly, and pay attention to exactly those details. Roofs, balconies, planter boxes, bathrooms and basement walls all get different treatments, and we will tell you which one yours needs and why.',
      includedItems: [
        'Substrate assessment and system specification',
        'Torch-on membrane or liquid-applied options',
        'Detailing at upstands, drains and corners',
        'Water ponding test before handover',
        'Written warranty on completed works',
      ],
      icon: 'droplet',
      image: '/images/service-3-placeholder.webp',
    },
    {
      slug: 'leak-repair',
      name: 'Leak Detection & Repair',
      shortDescription:
        'We trace the source of ceiling and wall leaks, then fix the cause — not just the stain.',
      longDescription:
        'A damp patch on your ceiling is rarely directly under the problem. Water travels along slabs, conduits and beams before it shows itself. We trace leaks back to the actual source using moisture meters and thermal inspection, tell you what we found, and repair the cause. Painting over a stain without doing this just buys you a few months.',
      includedItems: [
        'Moisture meter and thermal imaging survey',
        'Written diagnosis of the actual source',
        'Targeted repair at the point of failure',
        'Reinstatement and repainting of the affected area',
        'Follow-up inspection after the next heavy rain',
      ],
      icon: 'wrench',
      image: '/images/service-4-placeholder.webp',
    },
    {
      slug: 'protective-coatings',
      name: 'Protective & Industrial Coatings',
      shortDescription:
        'Anti-mould, anti-carbonation and epoxy systems for plants, car parks and warehouses.',
      longDescription:
        'Industrial surfaces need coatings that do a job beyond looking clean — chemical resistance, abrasion resistance, slip resistance, or protecting reinforcement from carbonation. We handle epoxy and polyurethane floor systems for warehouses and car parks, anti-mould coatings for humid plant rooms, and protective systems for structural steel and concrete.',
      includedItems: [
        'Epoxy and polyurethane floor systems',
        'Anti-mould and anti-bacterial coatings',
        'Anti-carbonation protection for concrete',
        'Line marking and slip-resistant finishes',
        'Work scheduled around your operations',
      ],
      icon: 'shield',
      image: '/images/service-5-placeholder.webp',
    },
    {
      slug: 'surface-prep',
      name: 'Surface Repair & Preparation',
      shortDescription:
        'Crack filling, spalling concrete repair and skim coating before a single drop of paint.',
      longDescription:
        'Preparation is where a paint job is actually won or lost, and it is the first thing a cheap quote cuts. We treat it as its own scope of work: removing failed coatings, filling and sanding cracks, repairing spalling concrete back to sound reinforcement, and skim coating to a flat finish. If the substrate is not right, no amount of good paint will save it.',
      includedItems: [
        'Removal of failed and flaking coatings',
        'Spalling concrete repair to sound reinforcement',
        'Crack routing, filling and sanding',
        'Full skim coating to a flat finish',
        'Alkali and moisture testing before priming',
      ],
      icon: 'sparkles',
      image: '/images/service-6-placeholder.webp',
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
    /** Short version for the homepage preview block. */
    preview:
      'Goal Green World Pte Ltd is an ethical, sustainability-driven group delivering green solutions across energy, infrastructure and essential services in Singapore. Our Painting & Waterproofing division brings that same standard to buildings.',
    /** Full story for /about. Each string is a paragraph. */
    story: [
      'Goal Green World Pte Ltd is an ethical, sustainability-driven group delivering green solutions across energy, infrastructure and essential services in Singapore. We started in 2020 with a simple conviction: that doing building work properly and doing it responsibly are the same problem, not competing ones.',
      'Our Painting & Waterproofing division brings that standard to buildings. Eco-aware, low-VOC coatings applied by bizSAFE-certified crews who prepare surfaces properly the first time. Whether it is an HDB flat, a condominium block or an industrial facility, we specify the system that suits the substrate and the climate — not whatever is cheapest to apply.',
      'We do not subcontract your job out to whoever is free that week. The crew that quotes is the crew that turns up, and the same people are accountable from the first site visit to the final walkthrough.',
    ],
    image: '/images/about-placeholder.webp',
    imageAlt: 'The Goal Green World painting and waterproofing team',
    /** Ticked list, used on the homepage preview and /about. */
    points: [
      'ISO 9001:2015 and ISO 45001:2018 certified processes',
      'Low-VOC, eco-aware paints and coatings as standard',
      'Written warranty on waterproofing works',
      'Direct crews — we do not subcontract your job out',
      'Detailed, itemised quotes with no variation surprises',
    ],
    /** Mission / values cards on /about. */
    values: [
      {
        title: 'Diagnose Before You Coat',
        description:
          'We find out why a surface failed before we cover it. Painting over a symptom is not a repair.',
        icon: 'target',
      },
      {
        title: 'Sustainability, Not Slogans',
        description:
          'Low-VOC materials and responsible waste handling on every job, not just the ones that get photographed.',
        icon: 'leaf',
      },
      {
        title: 'Safety Is Non-Negotiable',
        description:
          'bizSAFE and ISO 45001 certified. Every crew works to documented method statements and risk assessments.',
        icon: 'shield',
      },
      {
        title: 'Answer For Our Own Work',
        description:
          'Direct crews, written warranties, and a name to call if something is not right after we leave.',
        icon: 'heart',
      },
    ] as ValueCard[],
  },

  /* ---- Gallery ----------------------------------------------------------- */
  gallery: {
    heading: 'Recent Projects',
    subheading: 'A sample of painting and waterproofing work completed across Singapore.',
    /**
     * Filter buttons on /gallery, in order. "All" is added automatically.
     * Every `items[].category` below must appear in this list.
     */
    categories: ['Painting', 'Waterproofing', 'Commercial', 'Residential'],
    items: [
      { image: '/images/gallery-1-placeholder.webp', alt: 'Repainted HDB living room', category: 'Residential' },
      { image: '/images/gallery-2-placeholder.webp', alt: 'Roof waterproofing membrane application', category: 'Waterproofing' },
      { image: '/images/gallery-3-placeholder.webp', alt: 'Condominium facade repainting', category: 'Commercial' },
      { image: '/images/gallery-4-placeholder.webp', alt: 'Bathroom wet area waterproofing', category: 'Waterproofing' },
      { image: '/images/gallery-5-placeholder.webp', alt: 'Office interior repaint', category: 'Painting' },
      { image: '/images/gallery-6-placeholder.webp', alt: 'Warehouse epoxy floor coating', category: 'Commercial' },
      { image: '/images/gallery-7-placeholder.webp', alt: 'Balcony waterproofing and tiling', category: 'Residential' },
      { image: '/images/gallery-8-placeholder.webp', alt: 'Exterior facade repaint, low-rise block', category: 'Painting' },
    ] as GalleryItem[],
  },

  /* ---- FAQ --------------------------------------------------------------- */
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'How much does it cost to repaint an HDB flat?',
        answer:
          'It depends on the flat type, the number of coats and how much repair work the walls need. We give you a fixed, itemised quote after a free site visit — so the number you see is the number you pay. See our pricing guide for indicative starting figures.',
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
          'We serve the whole of Singapore, including all HDB towns, private condominiums and industrial estates.',
      },
    ] as FaqItem[],
  },

  /* ---- Pricing ----------------------------------------------------------- */
  pricing: {
    heading: 'Pricing Guide',
    subheading:
      'Indicative starting prices so you can budget before you call. Every quote is fixed and itemised after a free site visit.',
    /**
     * ⚠️ PLACEHOLDER PRICES — these numbers are invented for layout purposes.
     * Replace every one of them with figures the client has confirmed before
     * this site goes anywhere near production. Publishing made-up prices for a
     * real business is a misrepresentation problem, not just an accuracy one.
     */
    cards: [
      {
        slug: 'interior-painting',
        name: 'Interior Painting',
        startingFrom: 'S$--',
        priceNote: 'per room · primer + 2 coats',
        includes: [
          'Furniture and floor protection',
          'Minor crack filling and sanding',
          'Primer plus two coats, low-VOC',
          'Daily cleanup',
        ],
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        startingFrom: 'S$--',
        priceNote: 'per m² · system dependent',
        includes: [
          'Substrate assessment',
          'System specification in writing',
          'Full detailing at upstands and drains',
          'Ponding test before handover',
          'Written warranty',
        ],
        featured: true,
      },
      {
        slug: 'leak-repair',
        name: 'Leak Detection & Repair',
        startingFrom: 'S$--',
        priceNote: 'per survey · offset against works',
        includes: [
          'Moisture meter and thermal survey',
          'Written diagnosis of the source',
          'Repair quotation with fixed price',
          'Reinstatement and repainting',
        ],
      },
      {
        slug: 'exterior-painting',
        name: 'Exterior & Facade',
        startingFrom: 'S$--',
        priceNote: 'per m² · access dependent',
        includes: [
          'Pressure washing and fungal treatment',
          'Spalling and crack repair',
          'Anti-carbonation coating system',
          'Access and safety documentation',
        ],
      },
    ] as PricingCard[],
    disclaimer:
      'Every project is different. Substrate condition, access, height, the number of coats and how much repair work is needed all move the final figure — sometimes substantially. These starting prices are a budgeting guide, not a quotation. The only number that means anything is the fixed, itemised quote we give you after a free site visit.',
    /** Pricing-specific FAQ, shown on /pricing only. */
    faq: [
      {
        question: 'Why can’t you quote over the phone?',
        answer:
          'We can give you a range, but not a price. Until we have seen the substrate we do not know whether we are looking at a repaint or a repair — and those are very different numbers. The site visit is free precisely so nobody is guessing.',
      },
      {
        question: 'Is the quotation fixed, or will it change?',
        answer:
          'Fixed. The only thing that changes the price after you accept is additional work you approve in writing — for example concealed water damage found once we open up a surface. We will never do extra work and invoice you for it afterwards.',
      },
      {
        question: 'Do you ask for a deposit?',
        answer:
          'Payment terms are set out in your quotation before you commit. They vary with the size and duration of the job.',
      },
      {
        question: 'Why is the cheapest quote usually the most expensive?',
        answer:
          'Because preparation is invisible and it is the first thing a low quote cuts. A job that skips crack repair, priming and proper coats looks identical on handover day and starts failing within a year. You then pay twice.',
      },
    ] as FaqItem[],
  },

  /* ---- Service areas ----------------------------------------------------- */
  serviceArea: {
    heading: 'Areas We Serve',
    subheading: 'Island-wide coverage across Singapore.',
    /** `{area}` is replaced with the area name on each /areas/<slug> page. */
    descriptionTemplate:
      'Professional painting and waterproofing services in {area}. Free site assessment, fixed itemised quotes, and bizSAFE-certified crews across every HDB block, condominium and commercial unit in the area.',
    areas: [
      { slug: 'yishun', name: 'Yishun', description: 'Our home ground — our office is on Yishun Street 23, so {area} jobs get the fastest response times we offer. Painting, waterproofing and leak repair across the whole estate.' },
      { slug: 'woodlands', name: 'Woodlands' },
      { slug: 'sembawang', name: 'Sembawang' },
      { slug: 'ang-mo-kio', name: 'Ang Mo Kio' },
      { slug: 'bishan', name: 'Bishan' },
      { slug: 'toa-payoh', name: 'Toa Payoh' },
      { slug: 'serangoon', name: 'Serangoon' },
      { slug: 'hougang', name: 'Hougang' },
      { slug: 'sengkang', name: 'Sengkang' },
      { slug: 'punggol', name: 'Punggol' },
      { slug: 'tampines', name: 'Tampines' },
      { slug: 'bedok', name: 'Bedok' },
      { slug: 'pasir-ris', name: 'Pasir Ris' },
      { slug: 'jurong-east', name: 'Jurong East' },
      { slug: 'jurong-west', name: 'Jurong West' },
      { slug: 'clementi', name: 'Clementi' },
      { slug: 'bukit-batok', name: 'Bukit Batok' },
      { slug: 'choa-chu-kang', name: 'Choa Chu Kang' },
      { slug: 'bukit-panjang', name: 'Bukit Panjang' },
      { slug: 'queenstown', name: 'Queenstown' },
      { slug: 'novena', name: 'Novena' },
      { slug: 'cbd', name: 'Central Business District' },
    ] as ServiceArea[],
  },

  /* ---- Reusable CTA banner ----------------------------------------------- */
  finalCta: {
    headline: 'Ready to Get Started?',
    subtext:
      'Book a free site assessment. We will inspect, advise and quote — with no obligation to proceed.',
    buttonLabel: 'Get My Free Estimate',
  },

  /* ---- Estimate form ----------------------------------------------------- */
  form: {
    heading: 'Get a Free Estimate',
    subheading: 'Tell us about your project and we will come back to you within one business day.',
    submitLabel: 'Request My Free Estimate',
    successMessage:
      'Thank you — your request is in. We will contact you within one business day.',
    /**
     * Where the form POSTs. Empty string = demo mode: the form logs the payload
     * to the console and shows the success message without a network call.
     * Drop the GoHighLevel webhook / form endpoint in here to go live.
     */
    endpoint: '',
    /** `{company}` is replaced at render. */
    consentText:
      'I agree to receive SMS and WhatsApp messages from {company} about my enquiry. Message and data rates may apply. Reply STOP to opt out.',
    consentRequired: true,
  },

  /* ---- Compliance -------------------------------------------------------- */
  legal: {
    lastUpdated: '24 September 2026',
    privacyEmail: 'info@goalgreen.world',
  },

  /* ---- Analytics --------------------------------------------------------- */
  /**
   * IDs only — these are public by design. The actual <script> snippets are
   * NOT injected yet; `BaseLayout.astro` has commented slots in <head> ready
   * for them. Leave a value as '' to keep that slot dormant.
   */
  analytics: {
    ga4Id: '',
    metaPixelId: '',
    googleAdsId: '',
    googleAdsConversionLabel: '',
  },

  /* ---- SEO --------------------------------------------------------------- */
  seo: {
    /** Production origin, no trailing slash. Drives canonicals + sitemap. */
    siteUrl: 'https://example.com',
    /** Site-wide fallbacks, used when a page sets nothing of its own. */
    title: 'Painting & Waterproofing Singapore | Goal Green World',
    description:
      'Certified painting and waterproofing contractor in Singapore. Low-VOC eco paints, proper surface prep, written warranty. bizSAFE and ISO certified. Free estimate.',
    ogImage: '/images/hero-placeholder.webp',
    locale: 'en_SG',
    /**
     * Per-page overrides. Any key may be omitted, and any page may omit either
     * field — both fall back to the values above. The dynamic routes
     * (/areas/<slug>, /resources/<slug>) build their own metadata from the
     * area or article, so they are not listed here.
     */
    pages: {
      home: {
        title: 'Painting & Waterproofing Singapore | Goal Green World',
        description:
          'Certified painting and waterproofing contractor in Singapore. Low-VOC eco paints, proper surface prep, written warranty. Free site assessment.',
      },
      services: {
        title: 'Our Services | Painting & Waterproofing Singapore',
        description:
          'Interior and exterior painting, waterproofing, leak detection and repair, protective coatings and surface preparation across Singapore.',
      },
      gallery: {
        title: 'Project Gallery | Goal Green World',
        description:
          'Recent painting and waterproofing projects across Singapore — residential, commercial and industrial.',
      },
      pricing: {
        title: 'Pricing Guide | Painting & Waterproofing Singapore',
        description:
          'Indicative starting prices for painting and waterproofing in Singapore, plus what moves the final figure. Fixed itemised quotes after a free site visit.',
      },
      resources: {
        title: 'Resource Centre | Painting & Waterproofing Guides',
        description:
          'Practical guides on painting, waterproofing and leak repair for Singapore properties.',
      },
      about: {
        title: 'About Us | Goal Green World Painting & Waterproofing',
        description:
          'An ethical, sustainability-driven contractor in Singapore. bizSAFE and ISO certified, low-VOC materials, direct crews and written warranties.',
      },
      contact: {
        title: 'Contact Us | Free Estimate | Goal Green World',
        description:
          'Get a free painting or waterproofing estimate in Singapore. Call, WhatsApp or send us your project details.',
      },
    } as Record<string, PageMeta>,
  },
} as const;

export type ClientConfig = typeof client;
export default client;
