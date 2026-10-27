import { education } from './education.ts';
import { marketing } from './marketing.ts';

/**
 * Default content for the home page. Fallback (and seed) for the Sanity `homePage`
 * document; studio edits override these field by field (see lib/cms).
 */
export const home = {
  seo: {
    title: 'UEXORA — Technology That Puts You First',
    description:
      'UEXORA unites two divisions under one belief: your growth matters. Education from school tuition to AI and robotics, and a marketing studio for digital growth.',
  },

  hero: {
    /** One entry per line of the headline. */
    lines: ['Focused on you'],
    /** A word or phrase from the headline to render in gold. */
    highlight: 'you',
    sub: 'Two distinct divisions. One shared belief:',
    subStrong: 'YOUR GROWTH MATTERS.',
    primary: { label: 'Uexora Education', href: '/education' },
    secondary: { label: 'Uexora Marketing Studio', href: '/marketing' },
  },

  showcase: {
    image: {
      src: '/images/uexora-office-screen.avif',
      alt: 'People walking through a bright office lobby past a UEXORA screen that reads: Education for real skills. Marketing for real growth.',
    },
    statement:
      'We bridge the gap between learning and real-world success. Through education and marketing, we empower individuals and brands to grow, innovate and create',
    highlight: 'a brighter tomorrow.',
  },

  divisions: {
    heading: 'Choose your path.',
    intro:
      'Two divisions, one company. Uexora Education supports learners from school tuition to AI and robotics; Uexora Marketing Studio helps businesses build a stronger digital presence. Both start with the same question: what are you working towards?',
    panels: [
      {
        key: 'education',
        title: ['Learn With Purpose.', 'Grow With Confidence.'],
        text: education.lead,
        cta: 'Explore Uexora Education',
        href: '/education',
        image: { src: '/images/uexora-education-card.webp', alt: 'A robotics arm on a desk beside books and a laptop' },
      },
      {
        key: 'marketing',
        title: ['Make Your Brand', 'Impossible To Ignore.'],
        text: marketing.lead,
        cta: 'Explore Uexora Marketing',
        href: '/marketing',
        image: { src: '/images/uexora-marketing-card.webp', alt: 'A laptop showing a marketing dashboard in a city office at sunset' },
      },
    ],
  },

  marquee: [
    'School tuition',
    'JEE & NEET preparation',
    'IELTS · PTE · TOEFL',
    'AI, coding & robotics',
    'AI for professionals',
    'Project-based learning',
    'Public speaking',
    'Overseas education',
    'Digital strategy',
    'SEO',
    'Paid advertising',
    'Social media',
    'Web design & development',
    'AI-powered marketing',
  ],

  purpose: {
    heading: 'Different paths. One purpose.',
    paragraphs: [
      'At Uexora, we believe growth begins when potential meets the right opportunity.',
      'Whether you’re building your skills, exploring your next career move, or creating a brand with bigger ambitions, we bring together the knowledge, creativity, and expertise to help you take the next step.',
    ],
    button: { label: 'Start a conversation', href: '/contact' },
    /** The two photos beside "Different paths. One purpose." (decorative; the division cards describe each division). */
    educationImage: { src: '/images/sections/purpose-education.jpg', alt: 'A smiling student at a library desk with a stack of books and a laptop' },
    marketingImage: { src: '/images/sections/purpose-marketing.jpg', alt: 'Two colleagues smiling as they review creative work on a laptop' },
  },

  cta: {
    heading: "Your growth matters. Let's talk about it.",
    paragraphs: ['Tell us where you are today and where you want to go. We will point you to the right division and the right people, whether that is a learner’s goals or a business’s next stage.'],
    primary: { label: 'Start a conversation', href: '/contact' },
    secondary: { label: 'Explore the programmes', href: '/education#programmes' },
  },
};

export type HomeContent = typeof home;
