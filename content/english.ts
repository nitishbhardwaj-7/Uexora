import type { ExamTrack, Service } from './types.ts';
import { batchPhotos } from './exams.ts';

/**
 * The four English test tracks on the Overseas Education & English Language page: IELTS
 * Academic, IELTS General Training, PTE Academic and TOEFL. Each becomes its own section, reached
 * from the picker; the batch formats and the approach follow once, after the tests.
 *
 * DRAFT copy for the client to review: the test descriptions are public facts about each test;
 * programme claims are limited to what the client has confirmed (the three batch formats and
 * focused revision in the 1:6 batch). Fallback (and seed) for the Sanity `educationPage`
 * programme; studio edits override these field by field.
 */

const contact = '/contact?division=education';

export const englishTracks: ExamTrack[] = [
  {
    slug: 'ielts-academic',
    name: 'IELTS Academic',
    title: 'IELTS Academic Preparation',
    tagline: 'Prepare for Study Abroad with Confidence.',
    intro: [
      'IELTS Academic is taken by students applying to universities and colleges abroad. It assesses Listening, Reading, Writing and Speaking, with Reading and Writing tasks built around the kind of language used in higher education.',
      'Our preparation helps students understand each part of the test, strengthen the skills behind it, and approach test day with a clear plan.',
    ],
    tags: ['Listening', 'Reading', 'Writing', 'Speaking'],
    image: { src: '/images/english/ielts-academic-hero.jpg', alt: 'University students walking out through a campus gate together' },
    journey: {
      heading: 'More Than a Score. A Step Towards Your Future.',
      paragraphs: [
        'For many students, IELTS Academic is one of the first steps on the way to studying abroad. Doing well is not about memorising answers; it is about understanding what each task asks for and responding clearly within the time allowed.',
        'We work on the skills that matter in every section: following spoken English, reading academic texts closely, writing well-structured responses, and speaking with fluency and confidence.',
        'Our programme offers three batch formats — 1:6, 1:15 and 1:30 — so students can choose a learning environment that suits their needs and preferences.',
      ],
      image: { src: '/images/english/ielts-academic-journey.jpg', alt: 'A student writing in her notebook at a library desk' },
    },
    closing: {
      heading: 'Your Study Abroad Journey Starts Here.',
      paragraphs: [
        'Choose the batch that suits you, build your skills section by section, and approach IELTS Academic with a clear plan.',
      ],
      primary: { label: 'Talk to Our Academic Team', href: contact },
    },
  },
  {
    slug: 'ielts-general',
    name: 'IELTS General',
    title: 'IELTS General Training Preparation',
    tagline: 'Build the English You Need for Work and Life Abroad.',
    intro: [
      'IELTS General Training is often required for work, training and migration to English-speaking countries. Listening and Speaking follow the same format as IELTS Academic, while Reading and Writing focus on everyday, social and workplace English.',
      'Our preparation helps you understand the test format, practise each task type, and build the confidence to communicate clearly.',
    ],
    tags: ['Listening', 'Reading', 'Writing', 'Speaking'],
    image: { src: '/images/english/ielts-general-hero.jpg', alt: 'A traveller with her passport and suitcase waiting at an airport' },
    journey: {
      heading: 'English for the Next Chapter of Your Life.',
      paragraphs: [
        'Whether you are planning to work, train or settle abroad, IELTS General Training is about using English in practical situations: understanding notices and letters, writing clearly for everyday purposes, and speaking naturally.',
        'We focus on the skills each section asks for, with practice that reflects the situations the test is built around.',
        'Choose from three batch formats — 1:6, 1:15 and 1:30 — according to your preferences and the support you need.',
      ],
      image: { src: '/images/english/ielts-general-journey.jpg', alt: 'Colleagues talking together at their desks in an office' },
    },
    closing: {
      heading: 'Take the Next Step with Confidence.',
      paragraphs: [
        'A new country is a big step. Clear, confident English makes it easier. Choose the batch that suits you and prepare for IELTS General Training one skill at a time.',
      ],
      primary: { label: 'Talk to Our Academic Team', href: contact },
    },
  },
  {
    slug: 'pte',
    name: 'PTE',
    title: 'PTE Academic Preparation',
    tagline: 'Master the Format. Perform with Confidence.',
    intro: [
      'PTE Academic is a computer-based English test accepted by many universities and for visa applications in several countries. It assesses speaking, writing, reading and listening, often through integrated tasks that combine more than one skill.',
      'Our preparation helps students become familiar with the computer-based format, understand each task type, and practise with a clear strategy.',
    ],
    tags: ['Computer-based', 'Integrated skills'],
    image: { src: '/images/english/pte-hero.jpg', alt: 'A young woman wearing headphones at a computer, smiling at the camera' },
    journey: {
      heading: 'Every Task Has a Strategy.',
      paragraphs: [
        'PTE Academic rewards clear, fluent communication and a good understanding of how each task works. Knowing the format well can make a real difference to how confidently students approach the test.',
        'We help students practise the task types, manage their time, and strengthen the skills that integrated tasks depend on.',
        'As with all our test preparation, students can choose from three batch formats — 1:6, 1:15 and 1:30.',
      ],
      image: { src: '/images/english/pte-journey.jpg', alt: 'Hands typing on a laptop keyboard' },
    },
    closing: {
      heading: 'Prepare Smarter for PTE.',
      paragraphs: ['Understand the format, practise every task type, and approach PTE Academic with a strategy that works for you.'],
      primary: { label: 'Talk to Our Academic Team', href: contact },
    },
  },
  {
    slug: 'toefl',
    name: 'TOEFL',
    title: 'TOEFL Preparation',
    tagline: 'Academic English for Universities Around the World.',
    intro: [
      'TOEFL iBT is a test of academic English used by universities and colleges around the world, and it is especially familiar to institutions in the United States. It assesses Reading, Listening, Speaking and Writing in academic contexts.',
      'Our preparation helps students understand the test, build the academic language skills it measures, and practise with purpose.',
    ],
    tags: ['Reading', 'Listening', 'Speaking', 'Writing'],
    image: { src: '/images/english/toefl-hero.jpg', alt: 'University students listening during a class in a lecture hall' },
    journey: {
      heading: 'Ready for the Classroom, Not Just the Test.',
      paragraphs: [
        'TOEFL tasks reflect the way English is used in university settings: reading academic passages, following lectures and conversations, and speaking and writing about what you have read and heard.',
        'We focus on these academic skills step by step, so students prepare for the test and for the study that follows it.',
        'Choose from three batch formats — 1:6, 1:15 and 1:30 — to suit your learning preferences.',
      ],
      image: { src: '/images/english/toefl-journey.jpg', alt: 'A student with headphones taking notes beside his laptop' },
    },
    closing: {
      heading: 'Your Global Education Starts with a Strong Foundation.',
      paragraphs: ['Build the academic English universities look for, and approach TOEFL with understanding and confidence.'],
      primary: { label: 'Talk to Our Academic Team', href: contact },
    },
  },
];

/** The three batch formats, the same as for competitive exams: shown once, after the tests. */
export const englishBatches: NonNullable<Service['examBatches']> = {
  heading: 'Find Your Perfect Batch',
  text: 'Every test preparation programme offers three batch formats — 1:6, 1:15 and 1:30 — so students can choose a learning environment that suits their needs and preferences.',
  batchRows: [
    {
      number: '01',
      name: 'Personalised Prep',
      ratio: '1:6',
      tagline: 'Small Group. Focused Attention. Flexible Revision.',
      text: 'For students who want a more personalised learning experience, with greater attention to their individual learning needs.',
      points: [
        'Small-group classes that encourage focused interaction.',
        'Focused revision classes that students can request when they need additional support.',
        'Opportunities to revisit challenging task types and strengthen weaker skills.',
        'A learning experience designed around focused learning and revision.',
      ],
      image: batchPhotos.small,
    },
    {
      number: '02',
      name: 'Guided Prep',
      ratio: '1:15',
      tagline: 'Structured Learning. Consistent Progress.',
      text: 'A balanced learning experience for students who want structured teaching, clear guidance and a consistent preparation routine.',
      points: [
        'Structured lessons across listening, reading, writing and speaking.',
        'Revision classes scheduled by teachers.',
        'Guided practice with test-style tasks.',
        'A structured approach to building test readiness.',
      ],
      image: batchPhotos.guided,
    },
    {
      number: '03',
      name: 'Collaborative Prep',
      ratio: '1:30',
      tagline: 'Learn Together. Prepare with Purpose.',
      text: 'A structured classroom experience for students who enjoy learning alongside a larger group of fellow test takers.',
      points: [
        'Structured skill-by-skill classes.',
        'Revision sessions scheduled by teachers.',
        'Regular practice to strengthen each skill.',
        'A consistent routine that supports test preparation.',
      ],
      bestFor: 'Students who enjoy a larger classroom environment and a structured study schedule.',
      image: batchPhotos.collaborative,
    },
  ],
};

/** How we prepare students for English tests: shown once, after the batches. */
export const englishApproach: NonNullable<Service['examApproach']> = {
  heading: 'Our Approach to English Test Preparation',
  subheading: 'Understand the Test. Build the Skills. Practise with Purpose.',
  text: 'English tests measure how well you use the language, not how much you have memorised. Students need to understand each task, build skills across listening, reading, writing and speaking, and manage their time on the day.',
  approachSteps: [
    { title: 'Understand the Test', text: 'Get to know the format, the task types and what each part of the test is looking for.' },
    { title: 'Build All Four Skills', text: 'Strengthen listening, reading, writing and speaking, with focused work on the skills that need it most.' },
    { title: 'Practise with Purpose', text: 'Work through test-style tasks to improve accuracy, become comfortable with timing, and identify areas that need more attention.' },
    {
      title: 'Revise with Direction',
      text: 'Revisit difficult task types and strengthen weaker areas through revision and practice. In our 1:6 batch, students can also request focused revision classes when they need extra support.',
    },
    { title: 'Prepare for Test Day', text: 'Work on time management and confidence, so you can approach the test calmly and show what you can do.' },
  ],
  image: { src: '/images/english/english-approach.jpg', alt: 'Two people talking and smiling across a cafe table, practising conversation' },
};
