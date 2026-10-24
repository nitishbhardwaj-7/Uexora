/** A programme (Education) or service (Marketing). Each one has its own page at /<division>/<slug>. */
export type Service = {
  /** URL segment, lowercase letters, digits and hyphens. */
  slug: string;
  title: string;
  /** One benefit-led sentence for the page hero (the intro paragraph follows below it). */
  promise?: string;
  /** Intro paragraph: shown in the index row and as the first paragraph of the page. */
  text: string;
  /** Three or four short phrases, shown as chips on the page and in the "at a glance" list. */
  highlights: string[];
  /** One or two sentences on who this is for. */
  whoFor: string;
  /** Optional further paragraphs for the detail page; the section is hidden when empty. */
  details: string[];
  /** Questions and answers shown on the detail page; also emitted as FAQPage structured data. */
  faqs?: { q: string; a: string }[];
  /** Optional photo for the card and the detail page hero. */
  image?: { src: string; alt: string };
  seo?: { title?: string; description?: string };
};
