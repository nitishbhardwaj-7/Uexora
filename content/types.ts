/** A programme (Education) or service (Marketing). Each one has its own page at /<division>/<slug>. */
export type Service = {
  /** URL segment, lowercase letters, digits and hyphens. */
  slug: string;
  title: string;
  /** One benefit-led sentence for the page hero (the intro paragraph follows below it). */
  promise?: string;
  /** Intro paragraph: shown in the index row and as the first paragraph of the page. */
  text: string;
  /** Three or four short phrases, shown as chips in the page hero. */
  highlights: string[];
  /** One or two sentences on who this is for. */
  whoFor: string;
  /** Optional further paragraphs for the detail page; the section is hidden when empty. */
  details: string[];
  /** Optional support by school stage, shown under the introduction as rising steps. */
  gradeSupport?: { heading: string; text: string; stages: { grades: string; title: string; text: string }[] };
  /** Optional curricula supported, shown as a row of marks (an uploaded logo replaces the short name). */
  curricula?: { heading: string; text: string; boards: { short: string; name: string; logo?: { src: string; alt: string } }[] };
  /** Optional numbered list of what the programme includes; a feature with `options` shows them as tabs. */
  offerings?: {
    heading: string;
    features: {
      title: string;
      text?: string;
      image?: { src: string; alt: string };
      options?: { ratio: string; title: string; tagline: string; text: string; image?: { src: string; alt: string } }[];
    }[];
  };
  /** Optional side-by-side comparison shown before the questions (e.g. against typical home tuition). */
  comparison?: { heading: string; text?: string; them: string; us: string; lines: { label: string; them: string; us: string }[] };
  /** Heading above the questions; "Common questions" when empty. */
  faqHeading?: string;
  /** Questions and answers shown on the detail page; also emitted as FAQPage structured data. */
  faqs?: { q: string; a: string }[];
  /** Optional photo for the card in the index and the footer rows. */
  image?: { src: string; alt: string };
  /** Wide photo behind the detail page hero (landscape, around 3000 px); falls back to `image`. */
  heroImage?: { src: string; alt: string };
  seo?: { title?: string; description?: string };
};
