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
  | 'thumbs-up'
  | 'layers';

export type ServiceCategorySlug = 'painting' | 'waterproofing';

export interface Service {
  /**
   * URL-safe id. The page lives at `/<category>/<slug>`, so the slug only
   * has to be unique within its category.
   */
  slug: string;
  /** Which hub this service sits under. Drives the URL and the breadcrumb. */
  category: ServiceCategorySlug;
  name: string;
  /**
   * The H1 on that service's own page.
   *
   * Keep the pattern "<what> in Singapore". Both of the highest-ranking
   * Singapore competitors use exactly that shape — "Painting Services
   * Singapore" and "Your Trusted Waterproofing Contractor in Singapore" —
   * because it matches how people actually search: service plus location.
   * A slogan in the H1 ranks for nothing.
   */
  h1: string;
  /** <title> for the service page. Aim for under ~60 characters. */
  metaTitle: string;
  /** Meta description. Aim for 140–160 characters. */
  metaDescription: string;
  /** One line for the homepage cards. Keep under ~110 characters. */
  shortDescription: string;
  /** Full paragraph for the service page. */
  longDescription: string;
  /** Rendered as a ticked "what's included" list. */
  includedItems: string[];
  /**
   * Objection-handling Q&A shown on the service page and emitted as FAQPage
   * structured data. Answer the thing that actually stops people buying, not
   * the thing that is comfortable to answer.
   */
  faqs: FaqItem[];
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

/** One row of a product's technical data table. */
export interface ProductSpec {
  label: string;
  value: string;
}

export interface PaintProduct {
  /** Drives the `/painting#<slug>` anchor. */
  slug: string;
  name: string;
  /** Grouping chip, e.g. "Sealer" or "Interior Paint". */
  category: string;
  /** One line under the product name. */
  tagline: string;
  description: string;
  features: string[];
  /** Where the product is intended to be used. */
  designUse: string[];
  /** Rendered as a two-column technical table. */
  specs: ProductSpec[];
  image: string;
  /**
   * Application guidance in the company's own words. Shown as a highlighted
   * recommendation box.
   */
  recommendation?: string;
  /** Set when the manufacturer data sheet has not been supplied yet. */
  specsIncomplete?: boolean;
}

/** A bundled multi-product coating system. */
export interface PaintSystem {
  name: string;
  /** Product slugs, in application order. */
  productSlugs: string[];
  bestFor: string;
  description: string;
  /** Ordered application steps. */
  steps: { product: string; role: string }[];
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
     * Palette taken from the GGW logo: the lime green of the globe mark, the
     * charcoal of the "W", and the beige-grey plate the mark sits on
     * (sampled at #DAE0D9). Green / white / beige / grey throughout.
     *
     * Contrast rules to keep if you change these:
     *   accent      sits on primary (dark)  → keep it light
     *   accentText  sits on accent          → keep it dark
     *   accentDeep  is accent used AS TEXT on white → must stay dark enough
     */
    primary: '#1F3A2C',      // deep forest green — nav, hero, footer, dark bands
    primaryLight: '#2C4E3B', // lifted green — cards and borders on dark
    secondary: '#35604A',    // mid green — secondary surfaces
    accent: '#A6CE39',       // logo lime — CTAs, numbers, highlights
    accentHover: '#93B92C',  // hover state for lime surfaces
    /** Text colour that sits *on top of* `accent`. */
    accentText: '#16281C',
    /**
     * Accent used as text/icons on light backgrounds — darkened for contrast.
     * Measured 4.6:1 on `backgroundAlt`, clearing WCAG AA for normal text.
     * The brand lime itself is only ~1.9:1 on white and must never be used
     * for text on a light surface.
     */
    accentDeep: '#4C6A14',
    background: '#FFFFFF',   // light content sections
    backgroundAlt: '#F1F4EC',// beige-green band, from the logo plate
    text: '#242E27',         // body copy on light
    textMuted: '#5C645D',    // supporting copy on light — 4.5:1 on backgroundAlt
  },

  logo: {
    /** Full-colour mark on a transparent background. For LIGHT surfaces. */
    src: '/images/logo.png',
    /**
     * Variant for DARK surfaces (nav, footer, hero). Identical mark, except
     * the near-black "W" is recoloured white — the red and lime letters are
     * untouched. Both files have transparent backgrounds, so the mark sits
     * directly on the page with no plate or box behind it.
     */
    srcLight: '/images/logo-light.png',
    alt: 'Goal Green World',
    height: 38,
  },

  /* ---- Above the fold ---------------------------------------------------- */
  hero: {
    /**
     * The company slogan. Rendered above the H1, prominently — but NOT as the
     * H1 itself.
     *
     * A slogan tells Google nothing about what is sold or where. The two
     * highest-ranking Singapore competitors both use service + location as
     * their H1 ("Painting Services Singapore", "Your Trusted Waterproofing
     * Contractor in Singapore"). The slogan keeps its visual prominence; the
     * H1 does the ranking work.
     */
    heroTagline: 'Build a Greener World with Us',
    heroHeadline: 'Painting & Waterproofing Contractor',
    /** Rendered in the accent colour, continuing the headline. */
    heroHeadlineAccent: 'in Singapore',
    heroSubheadline:
      'We are an ethical, sustainability-driven group of businesses delivering green solutions across energy, infrastructure and essential services.',
    /** Small pill above the headline. */
    locationBadge: 'bizSAFE Certified · Singapore',
    /**
     * Dot-separated line under the headline. Property type, not technique:
     * Singapore searches segment by "HDB painting", "condo painting",
     * "landed", "commercial" far more than by coating system, and the top
     * ranking competitor organises its whole site around exactly this split.
     */
    serviceLine: 'HDB · Condominium · Landed · Commercial & Industrial',
    /** Background photograph behind the homepage hero. */
    backgroundImage: '/images/home-hero.webp',
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
    { label: 'Painting', href: '/painting' },
    { label: 'Waterproofing', href: '/waterproofing' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] as NavLink[],

  /* ---- Service category hubs --------------------------------------------- */
  /**
   * The two top-level hubs. Each ranks for its broad term and hands the
   * specific searches to its child services at `/<slug>/<service-slug>`.
   *
   * `slug` must match a `ServiceCategorySlug` and a pair of page files:
   * `src/pages/<slug>.astro` for the hub, `src/pages/<slug>/[slug].astro`
   * for its children.
   */
  serviceCategories: [
    {
      slug: 'painting' as const,
      eyebrow: 'Painting',
      h1: 'Painting Services in Singapore',
      metaTitle: 'Painting Services Singapore | Interior, Exterior & Industrial',
      metaDescription:
        'Painting contractor in Singapore for HDB, condominium, landed and commercial property. Low-VOC interior, weather-rated exterior, industrial coatings and full surface preparation.',
      intro:
        'Interior, exterior and industrial painting, plus the surface repair that has to happen before any of it. Low-VOC and VOC-free systems as standard, specified around the substrate rather than the price list.',
      heroImage: '/images/painting-hero.webp',
    },
    {
      slug: 'waterproofing' as const,
      eyebrow: 'Waterproofing',
      h1: 'Waterproofing Contractor in Singapore',
      metaTitle: 'Waterproofing Contractor Singapore | Roof, Bathroom & Leaks',
      metaDescription:
        'Waterproofing contractor in Singapore. Roof and podium membranes, bathroom and wet area systems, and leak detection that finds the source. Ponding tested, written warranty.',
      intro:
        'Membrane failure is the leading cause of recurring repair work in Singapore buildings. We diagnose why the last system failed, specify the right one for the substrate, and ponding test it before anything gets covered up.',
      heroImage: '/images/stock-waterproofing.webp',
    },
  ],

  /* ---- Services ---------------------------------------------------------- */
  /**
   * Every service belongs to one of the two category hubs and is published at
   * `/<category>/<slug>`. Adding one here creates its page, adds it to that
   * hub, the footer and the sitemap — no routing to touch.
   */
  services: [
    /* ── Painting ── */
    {
      slug: 'interior-painting',
      category: 'painting',
      name: 'Interior Painting',
      h1: 'Interior Painting Services in Singapore',
      metaTitle: 'Interior Painting Services Singapore | HDB, Condo & Office',
      metaDescription:
        'Low-VOC interior painting for HDB flats, condominiums and offices in Singapore. Odourless paint, proper undercoat and preparation, fixed itemised quotes.',
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
      faqs: [
        {
          question: 'Can we stay in the flat while you paint?',
          answer:
            'Usually yes. We use certified VOC-free, odourless paint, so a room is habitable the same night rather than needing days to air out. We work room by room, sheet your furniture and clean up at the end of each day, so the rest of the home stays usable throughout.',
        },
        {
          question: 'Why is your quote higher than the cheapest one I have?',
          answer:
            'Compare the four lines that actually decide the price: surface preparation, undercoat, the specific paint product and grade, and the number of coats. An oil-sealer undercoat is a real cost and it is the line most often quietly left out of a cheap quote. A quotation that does not itemise those four things is not comparable to one that does.',
        },
        {
          question: 'How many coats do I actually get?',
          answer:
            'Primer or sealer plus two finish coats as standard, and the coat count is written on your quotation. If a quote only promises "a fresh coat of paint", ask — that can legitimately mean one thin pass over a dirty wall.',
        },
        {
          question: 'What paint do you use, and is it safe with children at home?',
          answer:
            'Low-VOC and VOC-free systems as standard, with anti-mould formulation where the humidity warrants it — bathrooms, kitchens, and any wall that has grown mould before. Singapore sits at 80–85% humidity year round, which is why that choice matters more here than in a temperate market. The exact product is named on your quotation.',
        },
        {
          question: 'Do you move the furniture?',
          answer:
            'We sheet and shift what is reasonable within the room. Heavy items, valuables and fragile display pieces are better cleared by you before we start — sheeting protects against paint, not against knocks.',
        },
      ],
      icon: 'roller',
      image: '/images/stock-interior-painting.webp',
    },
    {
      slug: 'exterior-painting',
      category: 'painting',
      name: 'Exterior & Facade Painting',
      h1: 'Exterior & Facade Painting in Singapore',
      metaTitle: 'Exterior Painting Singapore | Facade, Landed & Commercial',
      metaDescription:
        'Exterior and facade painting across Singapore. Anti-carbonation and elastomeric systems built for tropical UV, humidity and monsoon rain. Access and safety handled.',
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
      faqs: [
        {
          question: 'How long will exterior paint actually last in Singapore?',
          answer:
            'That depends far more on preparation and the specified system than on the brand on the tin. Singapore runs at 80–85% humidity year round with heavy UV, so a coating applied over unwashed, fungal or chalky substrate can begin failing inside a year. Prepared properly and correctly specified, a good exterior system lasts several times that.',
        },
        {
          question: 'Do you handle scaffolding, gondola access and permits?',
          answer:
            'Yes. Access is assessed per site, and we coordinate scaffolding, gondola or other approved methods along with the risk assessment, method statement and safety documentation that working at height requires.',
        },
        {
          question: 'What happens if it rains partway through the job?',
          answer:
            'External work is scheduled around the forecast, and we stop before rain rather than racing it. Coating applied to a surface that is about to get wet, or that has not cured, is wasted material and a callback. Weather delays are normal on exterior work in Singapore — we build them into the programme rather than hiding them and then blaming them later.',
        },
        {
          question: 'Do you repair spalling concrete before painting?',
          answer:
            'Yes, and it has to happen first. Spalling is rusting reinforcement pushing the concrete apart from the inside. Painting over it hides the symptom while the steel keeps corroding. We break out to sound material, treat the reinforcement and reinstate before any coating goes on.',
        },
        {
          question: 'Can you paint over the existing exterior paint?',
          answer:
            'Often, if it is sound, well bonded and compatible with the new system. Extensive chalking, peeling or blistering means removal or a stabilising primer first. We test adhesion before quoting rather than assuming.',
        },
      ],
      icon: 'building',
      image: '/images/job-exterior-repaint-43.webp',
    },
    {
      slug: 'protective-coatings',
      category: 'painting',
      name: 'Protective & Industrial Coatings',
      h1: 'Protective & Industrial Coatings in Singapore',
      metaTitle: 'Industrial Coatings Singapore | Epoxy Floors & Anti-Mould',
      metaDescription:
        'Epoxy and polyurethane floor systems, anti-carbonation and anti-mould coatings for Singapore warehouses, car parks and plant rooms. Scheduled around your operations.',
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
      faqs: [
        {
          question: 'Can you work around our operations?',
          answer:
            'Usually, in phases. We section off areas, work nights or weekends where that suits you better, and sequence bays so the floor never goes entirely out of use. Downtime is the expensive part of an industrial coating job, so it is worth planning properly rather than discovering it halfway through.',
        },
        {
          question: 'How long before we can walk or drive on it?',
          answer:
            'Foot traffic is typically earlier than vehicle traffic, and full chemical cure is later than both. Exact times depend on the system and the ambient conditions, and they appear on the programme before we start.',
        },
        {
          question: 'Do you do line marking and anti-slip finishes?',
          answer:
            'Yes. Bay marking, walkways, hazard marking and slip-resistant aggregate can all be specified as part of the system rather than bolted on afterwards.',
        },
        {
          question: 'Our floor is oily and has been coated before. Is that a problem?',
          answer:
            'It is the single thing that decides whether the new coating sticks. Contaminated or previously coated concrete needs degreasing and mechanical preparation — grinding or shot blasting — before anything is applied. A coating over oil will delaminate regardless of what it cost.',
        },
      ],
      icon: 'layers',
      image: '/images/stock-protective-coatings.webp',
    },
    {
      slug: 'surface-preparation',
      category: 'painting',
      name: 'Surface Repair & Preparation',
      h1: 'Surface Repair & Preparation in Singapore',
      metaTitle: 'Surface Preparation & Concrete Repair Singapore',
      metaDescription:
        'Crack repair, spalling concrete repair, skim coating and substrate preparation across Singapore — the work that decides whether a paint job lasts or fails.',
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
      faqs: [
        {
          question: 'Why is preparation a separate line on the quote?',
          answer:
            'Because it is separate work, and itemising it is the only way you can compare quotations honestly. It is also the first thing a cheap quote cuts, precisely because it is invisible on handover day and only shows up a year later.',
        },
        {
          question: 'Can you not just paint over it?',
          answer:
            'You can paint over almost anything once. The question is what it looks like in twelve months. Over chalky, damp or failing substrate, new paint fails at the same rate the old one did — and you pay twice.',
        },
        {
          question: 'How do you deal with spalling concrete?',
          answer:
            'Break out to sound concrete, expose and treat the corroding reinforcement, then reinstate with a repair mortar before any coating goes on. Cosmetic filling over rusting steel is not a repair, it is a delay.',
        },
        {
          question: 'My walls are powdery and chalky. Is that fixable?',
          answer:
            'Yes — that is what a penetrating sealer is for. It soaks in and binds the loose particles so the surface is stable enough to hold putty, skim coat or topcoat. Painting straight onto a powdery wall lifts the paint off along with the dust.',
        },
      ],
      icon: 'sparkles',
      image: '/images/job-facade-works-43.webp',
    },

    /* ── Waterproofing ── */
    {
      slug: 'roof-waterproofing',
      category: 'waterproofing',
      name: 'Roof Waterproofing',
      h1: 'Roof Waterproofing in Singapore',
      metaTitle: 'Roof Waterproofing Singapore | Membrane & Liquid Systems',
      metaDescription:
        'Roof waterproofing across Singapore. Torch-on membrane and liquid-applied systems, full detailing at upstands and drains, ponding test and written warranty.',
      shortDescription:
        'Membrane and liquid-applied systems for flat roofs, gutters, planters and podium decks.',
      longDescription:
        'Flat roofs and podium decks take the worst of Singapore weather — standing water after every downpour, then hours of UV. We assess the substrate and the exposure before specifying, because a torch-on membrane and a liquid-applied system fail in completely different ways when either is put in the wrong place. Detailing at upstands, drain outlets and pipe penetrations gets the same attention as the open field, because that is where nearly every roof leak actually starts.',
      includedItems: [
        'Substrate assessment and system specification in writing',
        'Torch-on membrane or liquid-applied polyurethane',
        'Full detailing at upstands, drains and penetrations',
        'Protective screed or covering where the system needs it',
        'Water ponding test before handover',
        'Written warranty on completed works',
      ],
      faqs: [
        {
          question: 'How do I know which roof system I need?',
          answer:
            'It comes down to the substrate, whether it moves, whether the surface is exposed to UV or covered, whether it will be walked on, and how long water sits on it after rain. Torch-on membrane suits large open flat roofs; liquid-applied suits complex shapes with many penetrations. If a quotation just says "waterproofing" with a price and no named system, you do not yet have enough information to compare it against anything.',
        },
        {
          question: 'Why did the last roof job fail so quickly?',
          answer:
            'Membrane failure is the leading cause of recurring repair work in Singapore buildings, and it almost always starts at the details rather than the middle of a flat surface — laps, upstands, drain outlets and pipe penetrations. Exposed membrane left without its protective covering also degrades far faster under Singapore UV than the datasheet suggests. We look at where yours failed before quoting to redo it.',
        },
        {
          question: 'Do you give a warranty?',
          answer:
            'Yes, in writing. The term depends on the system and the substrate, and it is stated on your quotation before you commit — not promised verbally and forgotten afterwards.',
        },
        {
          question: 'Do you test it before handover?',
          answer:
            'Yes. A water ponding test is the only way to demonstrate the system holds before it is covered up. It is part of the programme, not an extra.',
        },
        {
          question: 'How long will the roof be out of use?',
          answer:
            'Curing between coats is the constraint, not application time. Most roof work runs three to seven days including cure and the ponding test, plus weather allowance. Rushing the cure is one of the most common causes of early failure.',
        },
      ],
      icon: 'droplet',
      image: '/images/stock-waterproofing.webp',
    },
    {
      slug: 'wet-area-waterproofing',
      category: 'waterproofing',
      name: 'Bathroom & Wet Area Waterproofing',
      h1: 'Bathroom & Wet Area Waterproofing in Singapore',
      metaTitle: 'Bathroom Waterproofing Singapore | Wet Areas & Balconies',
      metaDescription:
        'Bathroom, kitchen and balcony waterproofing in Singapore. Seamless liquid-applied membrane dressed into upstands and falls, ponding tested before tiling goes back.',
      shortDescription:
        'Seamless liquid-applied systems for bathrooms, kitchens, balconies and planter boxes.',
      longDescription:
        'Wet areas are all detail and no open field — corners, floor traps, pipe penetrations, door thresholds and the junction where the floor meets the wall. That is why liquid-applied membrane suits them: it cures seamless, so there are no laps to fail. The work usually means lifting finishes, because a membrane has to sit on sound substrate and be dressed up the wall past the splash line. Nothing gets tiled back over it until it has been ponding tested.',
      includedItems: [
        'Removal of existing finishes back to sound substrate',
        'Screed correction so water runs to the floor trap',
        'Seamless liquid-applied membrane, dressed up the walls',
        'Detailing at floor traps, penetrations and thresholds',
        'Water ponding test before tiling is reinstated',
        'Written warranty on completed works',
      ],
      faqs: [
        {
          question: 'Will you need to hack up my tiles?',
          answer:
            'Usually, yes. A membrane has to sit on sound substrate and be dressed properly into upstands and around floor traps, which in a wet area means lifting the finishes. Where a topical or injection solution is genuinely appropriate we will say so — but we will not pretend a surface coat fixes a failed membrane underneath it.',
        },
        {
          question: 'How long will the bathroom be out of action?',
          answer:
            'Typically three to seven days end to end, driven by curing time between coats and the ponding test rather than by how long the application takes. If you only have one bathroom, tell us at the quotation stage and we will sequence the work around that.',
        },
        {
          question: 'My downstairs neighbour is complaining about a damp ceiling. Is that my bathroom?',
          answer:
            'Often, but not always — water travels along slabs and conduits before it appears. That is worth diagnosing properly rather than assuming, because inter-floor leakage in Singapore is a shared matter and the documentation matters. Our leak detection service traces the actual source first.',
        },
        {
          question: 'Do you give a warranty?',
          answer:
            'Yes, in writing, with the term stated on your quotation before you commit. Wet area work is covered on the same basis as any other waterproofing we carry out.',
        },
      ],
      icon: 'shield',
      image: '/images/wp-sfs300.webp',
    },
    {
      slug: 'leak-detection-repair',
      category: 'waterproofing',
      name: 'Leak Detection & Repair',
      h1: 'Leak Detection & Repair in Singapore',
      metaTitle: 'Water Leak Detection & Repair Singapore | Ceiling & Wall',
      metaDescription:
        'Ceiling and wall leak detection and repair in Singapore. Moisture meter and thermal survey, written diagnosis, and repair at the source rather than a paint-over.',
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
      faqs: [
        {
          question: 'Can you find the leak without hacking everything up?',
          answer:
            'That is precisely what the survey is for. Moisture meter readings and thermal imaging trace where the water is actually travelling before anything is opened up, so any breaking out is targeted rather than exploratory.',
        },
        {
          question: 'The leak is coming from my upstairs neighbour. What happens then?',
          answer:
            'Inter-floor leakage is common in Singapore and it is a shared problem rather than solely yours. We document what we find in writing, so you have something factual to put in front of the neighbour, the MCST or HDB. We cannot enter or carry out work in another unit unless that owner engages us directly.',
        },
        {
          question: 'Do you charge for the inspection?',
          answer:
            'A leak survey is chargeable, because it is diagnostic work with equipment rather than a sales visit. Where you go ahead with the repair, the survey fee is offset against the works.',
        },
        {
          question: 'What if the leak comes back?',
          answer:
            'We re-inspect after the next heavy rain as part of the job. If the source was misdiagnosed, that is on us. If a second, separate source appears — which does happen on older buildings — we will show you the evidence for it rather than simply re-invoicing.',
        },
        {
          question: 'Can you just repaint over the stain?',
          answer:
            'We can, and it will come back. A stain on a dry, resolved substrate is a painting job. A stain on a wall that is still wet will push the new paint off within months. We will tell you honestly which one you have.',
        },
      ],
      icon: 'wrench',
      image: '/images/stock-leak-repair.webp',
    },
  ] as Service[],

  /* ---- Concrete waterproofing product range ------------------------------ */
  /**
   * The SFS waterproofing line, transcribed from the client's own product
   * flyers. Obvious scan/typing errors in the source copy ("signal component",
   * "addictive agents", "Advanced Flex1bihty") have been corrected; the
   * technical substance is unchanged.
   *
   * Rendered on the /waterproofing hub.
   */
  waterproofingProducts: {
    eyebrow: 'Concrete Waterproofing',
    heading: 'Our Waterproofing Product Range',
    intro:
      'We deliver qualified exterior project coatings, decorative paint, woodcare and adhesives, waterproof paint and paint buckets — supplying more than 8,000 stores internationally.',
    items: [
      {
        code: 'SFS100',
        name: 'K11 Water-Proof Paint',
        variant: 'Advanced Flexibility',
        description:
          'A two-component polymer-modified waterproof paint built on imported high-polymer waterproof emulsion and multiple assistants. Mixing the powder and liquid components proportionately creates a flexible waterproofing film with strong bonding strength to concrete and mortar, for an excellent waterproofing result.',
        packaging: '5kg, 18kg, 20kg',
        image: '/images/wp-sfs100.webp',
      },
      {
        code: 'SFS300',
        name: 'K11 Water-Proof Paint',
        variant: 'Flexibility',
        description:
          'An eco-friendly product based on high-polymer waterproof emulsion, multiple inorganic materials and additive agents. It uses the permeable mechanism of crystalline material into concrete, combining binding ability, water-preserving capability, flexibility and permeable crystallisation into the pore structure of grouting mortar — doubling the waterproofing function.',
        packaging: '5kg, 10kg, 20kg',
        image: '/images/wp-sfs300.webp',
      },
      {
        code: 'SFS600',
        name: 'K11 Water-Proof Paint',
        variant: 'General Type',
        description:
          'Formulated by combining high-polymer waterproof emulsion, multiple inorganic materials and additive agents proportionately. Intended for common, general-purpose waterproofing work.',
        packaging: '5kg, 10kg, 18kg',
        image: '/images/wp-sfs600.webp',
      },
      {
        code: 'SFS400',
        name: 'Acrylic Ester Water-Proof Paint',
        variant: 'Multi-functional Type',
        description:
          'A single-component high-polymer waterproof paint formulated on an acrylic polymer base with several additive agents and inorganic filler. Suited to roof and multi-surface applications.',
        packaging: '5kg, 10kg, 20kg',
        image: '/images/wp-sfs400.webp',
      },
      {
        code: 'SFS500',
        name: 'Leaking Stoppage Master',
        variant: 'Rapid Plug',
        description:
          'A single-component powder product using water as the binder. Neither toxic nor contaminating, which makes it suitable for use on drinking water projects.',
        packaging: '1kg, 5kg',
        image: '/images/wp-sfs500.webp',
      },
    ],
  },

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
    image: '/images/about-team.webp',
    imageAlt: 'Goal Green World crew working on a building exterior in Singapore',
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

  /* ---- Our History ------------------------------------------------------- */
  /**
   * Homepage timeline.
   *
   * ⚠️ ONLY THE 2020 FOUNDING DATE IS CONFIRMED (UEN 202009752D was registered
   * that year). The other entries describe things the company genuinely does —
   * the ISO and bizSAFE certifications, the divisions — but the YEARS attached
   * to them are placeholders. Confirm each one with the client and correct it
   * before launch, or drop the `year` field to render the entry undated.
   */
  history: {
    eyebrow: 'Our History',
    heading: 'From One Conviction to a Group of Businesses',
    intro:
      'We started with a simple belief: that doing work properly and doing it responsibly are the same problem, not competing ones. Everything since has followed from that.',
    milestones: [
      {
        year: '2020',
        title: 'Founded in Singapore',
        description:
          'Goal Green World Pte Ltd is incorporated with a mandate to deliver green solutions across energy, infrastructure and essential services.',
      },
      {
        year: '2021',
        title: 'Energy Division Established',
        description:
          'Solar power and green building management take shape, bringing AI-driven energy management and cloud-based building systems to Singapore properties.',
      },
      {
        year: '2022',
        title: 'Certified to International Standards',
        description:
          'ISO 9001:2015 for quality management and ISO 45001:2018 for occupational health and safety, alongside bizSAFE certification for audited workplace safety.',
      },
      {
        year: '2023',
        title: 'Infrastructure & Essential Services',
        description:
          'Scaffolding, logistics and ethical sourcing join the group, so projects can be delivered end to end rather than handed between contractors.',
      },
      {
        year: '2024',
        title: 'Painting & Waterproofing Division',
        description:
          'Eco-aware, low-VOC coatings applied by our own certified crews — bringing the same standard to building surfaces that we apply to energy and infrastructure.',
      },
      {
        year: 'Today',
        title: 'Still Building It',
        description:
          'Direct crews, written warranties, and a name to call if something is not right after we leave. Growing, but not at the expense of the reason we started.',
      },
    ],
  },

  /* ---- Gallery ----------------------------------------------------------- */
  gallery: {
    heading: 'Recent Projects',
    subheading: 'A sample of painting and waterproofing work completed across Singapore.',
    /**
     * Filter buttons on /gallery, in order. "All" is added automatically.
     * Every `items[].category` below must appear in this list.
     */
    /*
     * Every item below is a REAL photograph of the client's own work.
     * `/gallery` only renders a filter button for a category that actually
     * matches something, so adding the first genuine waterproofing or
     * commercial job here brings those filters back automatically.
     */
    categories: ['Painting', 'Waterproofing', 'Commercial', 'Residential'],
    items: [
      { image: '/images/job-exterior-repaint-sq.webp', alt: 'Exterior repainting of a three-storey terrace house, Singapore', category: 'Residential' },
      { image: '/images/job-facade-access-sq.webp', alt: 'Facade works in progress with scaffold access to upper floors', category: 'Residential' },
      { image: '/images/job-highlevel-scaffold-sq.webp', alt: 'High-level works from a suspended scaffold at roof gable', category: 'Painting' },
      { image: '/images/job-facade-works-sq.webp', alt: 'Exterior works in progress from scaffold access', category: 'Painting' },
      { image: '/images/job-crew-at-work-sq.webp', alt: 'Crew repainting the exterior of a multi-storey house', category: 'Residential' },
    ] as GalleryItem[],
  },

  /* ---- Site videos ------------------------------------------------------- */
  /**
   * Short silent clips of real jobs, shown on /gallery.
   *
   * Files live in `public/videos/` — Astro's image pipeline does not process
   * video, so they are served as-is. They were trimmed to ~14s and re-encoded
   * from the originals (55MB of phone footage down to under 4MB total); see
   * README → "Adding videos" for the command.
   *
   * Audio is stripped deliberately: the originals are wind and compressor
   * noise, and silent b-roll avoids startling anyone who hits play.
   */
  videos: {
    eyebrow: 'On Site',
    heading: 'Watch Us Work',
    intro:
      'Short clips from live jobs. Roof spray painting, coating and exterior repainting — filmed on site, not staged.',
    items: [
      {
        src: '/videos/roof-spray-painting.mp4',
        poster: '/videos/roof-spray-painting-poster.webp',
        title: 'Spray Painting a Terracotta Roof',
        caption:
          'Mid-pass on a tiled roof, with the new grey coating going on over the original terracotta.',
        duration: '0:14',
      },
      {
        src: '/videos/roof-coating.mp4',
        poster: '/videos/roof-coating-poster.webp',
        title: 'Roof Coating Application',
        caption:
          'Working across the roof section by section, harnessed, with the neighbouring untreated roof still visible behind.',
        duration: '0:14',
      },
      {
        src: '/videos/exterior-repaint.mp4',
        poster: '/videos/exterior-repaint-poster.webp',
        title: 'Exterior Repainting in Progress',
        caption:
          'Scaffold access to the upper storeys of a landed property during a full exterior repaint.',
        duration: '0:14',
      },
    ],
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
    heading: 'Painting & Waterproofing Prices in Singapore',
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

  /* ---- Paint products ---------------------------------------------------- */
  /**
   * Product data transcribed from the supplied technical data sheets.
   *
   * ⚠️ MANUFACTURER NAME DELIBERATELY OMITTED. The source data sheets carry a
   * supplier's company name, UEN, phone number and domain. None of that
   * appears here or anywhere on the site, per instruction. Product names and
   * technical figures are retained; attribution is not.
   *
   * Figures below are quoted from the data sheets as supplied. If a data sheet
   * is revised, update the matching `specs` rows — nothing else reads them.
   */
  paintProducts: {
    heading: 'Paint Products & Painting Services in Singapore',
    eyebrow: 'Green Building Materials',
    tagline: 'Protect Structures, Protect the Planet.',
    intro:
      'Durable, eco-conscious coatings selected for Singapore’s tropical climate — low-VOC, low-odour and formaldehyde-free, specified around the substrate rather than the price list.',
    heroImage: '/images/painting-hero.webp',

    /** "What We Offer" cards. Numbered 01, 02… in render order. */
    offerings: {
      heading: 'What We Offer',
      intro:
        'Our coatings are formulated for durability, sustainability, and Singapore’s year-round humidity.',
      items: [
        {
          title: 'Waterproof Exterior Coatings',
          description:
            'High-performance coatings that shield façades, rooftops, and structures from tropical rain and UV exposure.',
        },
        {
          title: 'Eco-Friendly Interior Paint',
          description:
            'Low-VOC formulations safe for homes, schools, and commercial interiors — without compromising finish quality.',
        },
        {
          title: 'Industrial Protective Coatings',
          description:
            'Heavy-duty solutions for warehouses, factories, and infrastructure — engineered for long-term durability.',
        },
        {
          title: 'Low-VOC Formulations',
          description:
            'Healthier indoor environments and reduced chemical emissions — aligned with green building standards.',
        },
      ],
    },

    /** Bundled systems, shown above the individual products. */
    systems: [
      {
        name: 'Anti-Mould Protection System',
        productSlugs: ['mouldseal', 'care', 'cleancare'],
        bestFor:
          'Preventing mould growth, even in high humidity conditions.',
        description:
          'A three-part system: a sealer that blocks mould at the substrate, a humidity-regulating ceiling paint, and a stain-resistant wall paint. Used together they protect the whole envelope of a room rather than one surface of it.',
        steps: [
          { product: 'MouldSeal', role: 'Sealer coat — blocks mould at its root' },
          { product: 'Care', role: 'Ceilings — humidity control and anti-moulding' },
          { product: 'CleanCare', role: 'Walls — easy to clean, stain and mould resistant' },
        ],
      },
    ] as PaintSystem[],

    products: [
      {
        slug: 'mouldseal',
        name: 'MouldSeal',
        category: 'Sealer',
        tagline: 'Premium water-based acrylic sealer for high-humidity walls.',
        description:
          'A premium water-based acrylic sealer providing superior mould resistance, creating a durable barrier that protects walls from moisture infiltration. Formulated to resist alkali attack, so the topcoat finish above it lasts. Used with a compatible interior paint it forms a complete mould-prevention system for high-humidity environments, while maintaining indoor air quality.',
        features: [
          'Formaldehyde-free',
          'Ultra-low VOC',
          'Superior mould resistance',
          'High water ponding resistance',
          'High-performance coverage of hairline cracks',
          'Good adhesion and alkali resistance',
        ],
        designUse: [
          'Interior walls in high-humidity environments',
          'Substrates prone to recurring mould growth',
          'As the sealer coat beneath a compatible interior topcoat',
        ],
        specs: [
          { label: 'Type', value: 'Acrylic emulsion' },
          { label: 'Finish', value: 'Matte' },
          { label: 'Application method', value: 'Roller, brush or spray' },
          { label: 'Theoretical coverage', value: '10–12 m²/L (35–40 microns DFT)' },
          { label: 'Dilution', value: 'Max 10% with clean water' },
          { label: 'Surface drying time', value: '30 mins at 25°C' },
          { label: 'Cleaning solvent', value: 'Clean water' },
          { label: 'Solid content', value: '52 ± 2% by weight (white)' },
          { label: 'Specific gravity', value: '1.30 ± 2% kg/L (white)' },
          { label: 'Packing', value: '20 litres' },
          { label: 'Shelf life', value: 'Up to 24 months in a tightly sealed container' },
          { label: 'Storage', value: 'Tightly sealed, in a cool dry place' },
        ],
        image: '/images/product-mouldseal-placeholder.webp',
        recommendation:
          'For heavily mould-affected conditions, we recommend repainting with MouldSeal + Care Interior after carrying out any necessary make-good works.',
      },
      {
        slug: 'care',
        name: 'Care Interior Paint',
        category: 'Interior Paint',
        tagline: 'Air-purifying, humidity-regulating interior paint.',
        description:
          'An interior paint that purifies airborne pollutants for healthier indoor air quality. Unlike conventional paints it is certified VOC-free, releases zero odour, and adds anti-moulding, anti-bacterial and humidity-regulating properties — absorbing and desorbing moisture as ambient conditions change.',
        features: [
          'Certified VOC-free (<2 g/L)',
          'Odourless',
          'Purifies airborne pollutants',
          'Anti-bacterial',
          'Anti-moulding',
          'Absorbs and desorbs moisture',
          'Easy application, quick-drying',
        ],
        designUse: [
          'Interior wall and ceiling surfaces — cement, plaster and fibreboard',
          'Common areas such as void decks and corridors',
          'Other properly primed material surfaces',
        ],
        specs: [
          { label: 'Type', value: 'Water-based acrylic emulsion paint' },
          { label: 'Finish', value: 'Matte' },
          { label: 'Application method', value: 'Roller, brush or spray' },
          { label: 'Theoretical coverage', value: '10–12 m²/L (30 microns DFT)' },
          { label: 'Dilution', value: 'Not more than 10% with clean water' },
          { label: 'Touch dry', value: '30 mins at 25°C' },
          { label: 'Over-coating interval', value: 'Minimum 2 hours at 25°C' },
          { label: 'Cleaning solvent', value: 'Clean water' },
          { label: 'Solid content', value: '53 ± 2% by weight (white)' },
          { label: 'Specific gravity', value: '1.45 ± 2% kg/L (white)' },
          { label: 'Packing', value: '1, 5 and 20 litres' },
          { label: 'Colour', value: 'Colour atlas available on request' },
          { label: 'Shelf life', value: 'Up to 24 months in a tightly sealed container' },
        ],
        image: '/images/product-care-placeholder.webp',
        recommendation:
          'Recommended for ceilings, where humidity control and anti-moulding matter most.',
      },
      {
        slug: 'cleancare',
        name: 'CleanCare Interior Paint',
        category: 'Interior Paint',
        tagline: 'Stain-resistant, washable interior paint for walls.',
        description:
          'An air-purifying interior paint with added stain resistance, intended for wall surfaces that get handled, marked and cleaned. Anti-moulding like its companion ceiling paint, but formulated so marks lift without taking the finish with them.',
        features: [
          'Air-purifying',
          'Anti-moulding',
          'Stain-resistant',
          'Easy to clean',
          'Matte finish',
        ],
        designUse: [
          'Interior walls in homes, offices and commercial interiors',
          'High-traffic areas where walls are regularly cleaned',
          'Paired with a humidity-regulating ceiling paint above',
        ],
        specs: [
          { label: 'Type', value: 'Water-based interior emulsion paint' },
          { label: 'Finish', value: 'Matte' },
          { label: 'Packing', value: '20 litres' },
        ],
        image: '/images/product-cleancare-placeholder.webp',
        recommendation:
          'Recommended for walls — easy to clean whilst being both stain and mould resistant.',
        /* No technical data sheet supplied for this product yet. */
        specsIncomplete: true,
      },
      {
        slug: 'deepseal',
        name: 'DeepSeal Sealer',
        category: 'Sealer',
        tagline: 'Penetrating sealer for loose, powdery and chalky walls.',
        description:
          'A premium water-based acrylic penetrating sealer for loose, porous, powdery and weak wall surfaces. It penetrates deeply to bind loose particles, strengthen the surface and stabilise the wall before putty, skim coat, sealer or topcoat goes on. Particularly suited to old wall renovation, powdery cement plaster, weak skim coat, porous masonry and high-absorption surfaces. By consolidating the substrate and evening out absorption, it improves adhesion for everything applied above it.',
        features: [
          'Formaldehyde-free',
          'Excellent deep penetration',
          'Strengthens loose and powdery wall surfaces',
          'Enhances adhesion of subsequent coating systems',
          'Reduces uneven surface absorption',
          'Low odour',
          'High water ponding resistance',
          'Good adhesion and alkali resistance',
        ],
        designUse: [
          'Loose, powdery or chalky substrates',
          'Old wall renovation and aged or repaired substrates',
          'Occupied sites where solvent fumes are not tolerated',
          'Porous masonry and high-absorption surfaces',
        ],
        specs: [
          { label: 'Type', value: 'Water-based acrylic polymer emulsion' },
          { label: 'Finish', value: 'Clear to slight sheen / natural' },
          { label: 'Application method', value: 'Roller, brush or spray' },
          { label: 'Theoretical coverage', value: '10–12 m²/L (30–35 microns DFT)' },
          {
            label: 'Dilution',
            value:
              'Ready to use. Not recommended for weak or powdery surfaces; normal porous surfaces up to 10% with clean water if required',
          },
          { label: 'Surface drying time', value: '30–60 mins at 25°C' },
          { label: 'Cleaning solvent', value: 'Clean water' },
          { label: 'Solid content', value: '16 ± 2% by weight' },
          { label: 'Specific gravity', value: '1.05 ± 2% kg/L' },
          { label: 'Packing', value: '5 and 20 litres' },
          { label: 'Shelf life', value: 'Up to 24 months in a tightly sealed container' },
          { label: 'Storage', value: 'Tightly sealed, in a cool dry place' },
        ],
        image: '/images/product-deepseal-placeholder.webp',
        recommendation:
          'For areas with severe powdery or chalky surfaces, we recommend applying DeepSeal first to strengthen the wall before applying MouldSeal + Care Interior.',
      },
    ] as PaintProduct[],

    /**
     * Shared surface preparation, identical across the data sheets. Shown once
     * rather than repeated on every product.
     */
    surfacePrep: {
      heading: 'Surface Preparation',
      intro:
        'Every product above depends on the same groundwork. Skipping it is the most common reason a coating fails early.',
      steps: [
        {
          title: 'Moisture',
          detail:
            'No water residue on the substrate. Moisture must be below 5% on a moisture content meter before application.',
        },
        {
          title: 'Contaminants',
          detail: 'Remove dust and foreign matter by cleaning with a damp cloth.',
        },
        {
          title: 'Unstable matter',
          detail:
            'Remove loose bonding film, dirt and peeling paint by high-pressure water jet or mechanical means such as a power brush or scraper.',
        },
        {
          title: 'Fungus and algae',
          detail:
            'Wash the affected area, then apply anti-fungus solution and leave on for at least two hours.',
        },
        {
          title: 'Hairline cracks',
          detail:
            'Fill cracks with a suitable exterior-grade water-resistant putty or filler.',
        },
      ],
    },

    /** Shown at the foot of the technical section. */
    disclaimer:
      'The figures above describe product performance under specific test conditions. Conditions on site vary, so actual results may differ. Product data may be revised without notice — confirm current figures before specifying.',
  },

  /* ---- Painting FAQ ------------------------------------------------------ */
  /** Shown on /painting. Condensed from the full customer FAQ. */
  paintFaq: [
    {
      question: 'What types of properties do you paint?',
      answer:
        'Residential homes, condominiums, HDB flats, offices, retail premises, commercial buildings, industrial facilities, warehouses, schools and institutions, and common areas. The approach is tailored to the size, condition and requirements of each property.',
    },
    {
      question: 'Do you handle both interior and exterior painting?',
      answer:
        'Yes. Interior covers walls, ceilings, offices, corridors, doors and frames, feature walls and commercial interiors. Exterior covers external walls, facades, roof structures, industrial buildings, carparks, boundary walls and external metal. The right paint system depends on the surface and its exposure.',
    },
    {
      question: 'How often should a building be repainted?',
      answer:
        'There is no fixed interval. It depends on the paint used, surface condition, weather exposure, location, traffic, previous workmanship and maintenance. Regular inspection is the reliable way to tell when repainting or touch-ups are due.',
    },
    {
      question: 'How much does painting cost in Singapore?',
      answer:
        'It depends on property size, total area, number of coats, existing paint condition, surface preparation, height and access, paint type and quality, interior or exterior application, and any repair work. For an accurate figure, send us the property details and photos, or arrange a site assessment.',
    },
    {
      question: 'Do you inspect the site before quoting?',
      answer:
        'Yes, where the scope or site condition warrants it. An inspection establishes surface condition, areas needing work, existing paint deterioration, cracks or damage, access and preparation requirements, the suitable paint system, and the manpower and duration involved — so the quote reflects the actual job.',
    },
    {
      question: 'Is surface preparation included?',
      answer:
        'Yes, and it is the part that determines how long the finish lasts. Depending on condition it can include cleaning, scraping loose paint, sanding, filling holes and imperfections, crack treatment, removing contaminants and applying primer.',
    },
    {
      question: 'Can you paint over existing paint?',
      answer:
        'Often yes, after inspection. If the existing coating is sound, well bonded and compatible with the new system, repainting can proceed after suitable preparation. Extensive peeling, blistering, cracking or deterioration means additional preparation or removal first.',
    },
    {
      question: 'Can you repair cracks and damaged walls first?',
      answer:
        'Yes, for suitable non-structural repairs — small cracks, holes and surface imperfections are handled as part of preparation. Significant or structural cracks should be assessed separately by an appropriately qualified professional before painting proceeds.',
    },
    {
      question: 'What type of paint do you use?',
      answer:
        'It depends on the application and the surface. Different jobs call for interior durability, exterior weather resistance, mould resistance, washability, moisture resistance, anti-corrosion protection, or low-odour and low-VOC characteristics. We recommend a system based on the property and how the space is used.',
    },
    {
      question: 'Can you help with colour selection and matching?',
      answer:
        'Yes. Bring your preferred colours, references or existing scheme, and we can discuss combinations suited to the space — including company branding for commercial projects. Matching an existing colour is usually possible, though age, fading, lighting and product differences affect accuracy. A physical sample gives the closest match.',
    },
    {
      question: 'How long does a painting project take?',
      answer:
        'It varies with property size, number of areas, surface condition, preparation, number of coats, drying and curing times, access, working hours, and weather for external work. We provide a schedule once the scope is assessed.',
    },
    {
      question: 'Can you work while the building is occupied?',
      answer:
        'Usually yes. We plan works in stages where practical — section-by-section painting, protection of furniture and equipment, controlled work areas, coordination around operating hours, ventilation and daily housekeeping. Commercial and industrial schedules can be arranged around site operations.',
    },
    {
      question: 'Do you take on commercial and industrial projects?',
      answer:
        'Yes — offices, retail units, warehouses, factories, workshops, industrial buildings, carparks, common areas and building exteriors. Larger projects are planned around access, safety, working hours, site operations and coordination with other contractors.',
    },
    {
      question: 'Do you carry out high-level and external work?',
      answer:
        'Yes. Where painting is at height, access is assessed per site and may involve suitable access equipment, scaffolding or other approved methods.',
    },
    {
      question: 'Can painting be combined with other maintenance works?',
      answer:
        'Yes, and it usually saves money. Painting coordinates well with waterproofing, concrete repair, crack repair, surface restoration, scaffolding, roof maintenance and general building maintenance — combining them avoids paying to mobilise twice.',
    },
    {
      question: 'What should I do before the painters arrive?',
      answer:
        'Remove valuable or fragile items, clear furniture from work areas, provide access, flag anything needing special attention, confirm colour selections, and tell us about any site restrictions. Commercial and industrial sites can discuss specific requirements before we start.',
    },
    {
      question: 'Do you do touch-up painting?',
      answer:
        'Yes — scuffed walls, minor damage, doors and frames, high-traffic and common areas. Whether a localised touch-up or a full repaint is better depends on the existing paint condition and whether the colour is still available.',
    },
    {
      question: 'Can you paint metal surfaces?',
      answer:
        'Yes. Metal needs specialised preparation and coatings, especially outdoors or in damp conditions — typically cleaning, removing loose coatings or rust, suitable priming, then a compatible protective coating.',
    },
    {
      question: 'How do I get a quotation?',
      answer:
        'Send us the property type, location, approximate size, areas to be painted, interior or exterior requirements, current surface condition, preferred timeframe, and photos where available. We will assess it and advise whether a site visit is appropriate.',
    },
  ] as FaqItem[],

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
    /** Social share card. Uses the homepage hero photograph. */
    ogImage: '/images/home-hero.webp',
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
