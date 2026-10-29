import type { ExamTrack } from './types.ts';

/**
 * The four exam tracks on the Competitive Exam Preparation page (client copy). Each becomes its
 * own section, reached from the picker near the top of the page. Fallback (and seed) for the
 * Sanity `educationPage` programme's `tracks`; studio edits override these field by field.
 */

const contact = '/contact?division=education';

/** The three batch photos are shared by all four tracks: live online classes at each size. */
const batchPhotos = {
  small: { src: '/images/exams/batch-small-group.jpg', alt: 'A small group of students on a video call during a live online class' },
  guided: { src: '/images/exams/batch-guided.jpg', alt: 'A teacher explaining a lesson to camera during a live online class' },
  collaborative: { src: '/images/exams/batch-collaborative.jpg', alt: 'A student with headphones following a live online class on his laptop' },
};

export const examTracks: ExamTrack[] = [
  {
    slug: 'neet',
    name: 'NEET',
    title: 'NEET Preparation',
    tagline: 'Your Dream of Becoming a Doctor Deserves the Right Preparation.',
    intro: [
      'A future in medicine begins with strong fundamentals, consistent practice, and the right guidance. Prepare for NEET with live online classes designed to help you understand concepts, strengthen problem-solving skills, and approach your examination with confidence.',
    ],
    image: { src: '/images/exams/neet-hero.jpg', alt: 'A student studying anatomy diagrams of the human body on a tablet' },
    cardImage: { src: '/images/exams/neet-card.jpg', alt: 'A medical student in a white coat with a stethoscope, reading a textbook' },
    journey: {
      heading: 'Every Student Has a Different Learning Journey.',
      paragraphs: [
        'Choosing a NEET preparation programme is about more than completing the syllabus. It’s about finding the right learning environment for your child.',
        'Will they get the opportunity to ask questions? Will difficult concepts be explained clearly? Will they have the guidance and revision they need to keep improving?',
        'Our online NEET programme offers three batch formats — 1:6, 1:15 and 1:30 — so students can choose a learning environment that suits their needs and preferences.',
      ],
      pull: 'Because preparation should not just be about attending classes. It should be about making every class count.',
      image: { src: '/images/exams/neet-journey.jpg', alt: 'Two students examining a model of the human heart in class' },
    },
    closing: {
      heading: 'Your Medical Dream Starts with Your Next Step.',
      paragraphs: [
        'NEET is a challenging journey, but the right learning environment can make your preparation more focused and organised.',
        'Choose the batch that suits your learning needs, strengthen your concepts, and take your preparation one step at a time.',
      ],
      primary: { label: 'Explore Our NEET Programme', href: '#batches' },
      secondary: { label: 'Have questions? Speak to Our Academic Team', href: contact },
    },
  },
  {
    slug: 'jee-main',
    name: 'JEE Main',
    title: 'JEE Main Preparation',
    tagline: 'Think Deeper. Solve Smarter. Aim Higher.',
    intro: [
      'Your journey towards engineering begins with the right foundation. At Uexora, our live online JEE Main classes help students strengthen their concepts in Physics, Chemistry, and Mathematics, develop problem-solving skills, and prepare for the examination with a structured learning approach.',
      'Whether you’re building your fundamentals or refining your exam strategy, we’re here to help you move forward with purpose.',
    ],
    image: { src: '/images/exams/jee-main-hero.jpg', alt: 'A student pointing to an equation he has worked out on a chalkboard' },
    journey: {
      heading: 'Every Problem Has a Solution. Every Student Has Potential.',
      paragraphs: [
        'JEE Main is not simply about how much you study. It’s about how well you understand concepts, apply them under pressure, and learn from every mistake.',
        'At Uexora, we believe effective preparation starts with understanding how you learn. Our online programme offers three batch formats — 1:6, 1:15 and 1:30 — giving you the flexibility to choose a learning environment that matches your needs.',
        'From mastering the fundamentals to tackling challenging numerical problems, our focus is on helping you build the knowledge and confidence to approach JEE Main with a clear strategy.',
      ],
      image: { src: '/images/exams/jee-main-journey.jpg', alt: 'A student working through mathematics problems by hand beside an open textbook' },
    },
    why: {
      heading: 'Why Choose Uexora for JEE Main?',
      subheading: 'Preparation Built Around Understanding, Not Just Memorisation.',
      whyList: [
        { title: 'Live Online Learning', text: 'Learn from wherever you are, with online classes that support a more flexible approach to exam preparation.' },
        { title: 'Three Batch Options', text: 'Choose between 1:6, 1:15, and 1:30 learning environments based on your preferences and academic needs.' },
        { title: 'Flexible Revision in the 1:6 Batch', text: 'Request focused revision classes when you need additional help with challenging topics.' },
        { title: 'A Structured Learning Approach', text: 'Build your preparation step by step through concept development, practice, and revision.' },
      ],
    },
    closing: {
      heading: 'Your Engineering Journey Starts Here.',
      paragraphs: [
        'Every great result begins with a strong foundation, consistent effort, and the willingness to improve.',
        'At Uexora, we’re here to help you approach JEE Main with a clearer understanding of concepts, a stronger problem-solving mindset, and a preparation plan built around your learning needs.',
        'Ready to take the next step?',
      ],
      primary: { label: 'Talk to the Uexora Team', href: contact },
    },
  },
  {
    slug: 'jee-advanced',
    name: 'JEE Advanced',
    title: 'JEE Advanced Preparation',
    tagline: 'Think Beyond the Obvious. Master the Extraordinary.',
    intro: [
      'JEE Advanced demands more than knowing the formulas. It challenges students to connect concepts, analyse unfamiliar problems, and think beyond conventional approaches.',
      'At Uexora, our live online classes help aspiring engineers strengthen their understanding of Physics, Chemistry, and Mathematics, develop advanced problem-solving skills, and prepare for the challenges of JEE Advanced through structured learning and purposeful practice.',
    ],
    image: { src: '/images/exams/jee-advanced-hero-2.jpg', alt: 'A student concentrating on an exam paper and answer sheet in a quiet examination hall' },
    journey: {
      heading: 'The Difference Is Not Just What You Know. It’s How You Think.',
      paragraphs: [
        'JEE Advanced challenges students to apply what they know in new and unfamiliar situations. Success requires conceptual clarity, logical reasoning, patience, and the ability to approach complex questions from different perspectives.',
        'At Uexora, we focus on developing these skills through a structured approach to advanced learning.',
        'Our online programme offers three batch formats — 1:6, 1:15 and 1:30 — allowing students to choose a learning environment that suits their preferences and academic needs.',
        'From strengthening fundamental concepts to tackling challenging, multi-step problems, our goal is to help students think more clearly, solve more effectively, and prepare with purpose.',
      ],
      image: { src: '/images/exams/jee-advanced-journey.jpg', alt: 'A student studying late in the evening under a desk lamp' },
    },
    why: {
      heading: 'Why Choose Uexora for JEE Advanced?',
      subheading: 'Learning That Challenges You to Think Deeper.',
      whyList: [
        { title: 'Live Online Classes', text: 'Prepare from wherever you are through a structured online learning experience.' },
        { title: 'Three Batch Options', text: 'Choose the 1:6, 1:15 or 1:30 format according to your learning preferences and need for individual attention.' },
        { title: 'Flexible Revision in the 1:6 Batch', text: 'Request focused revision classes when you need additional help understanding difficult topics.' },
        { title: 'Concept-Driven Preparation', text: 'Focus on understanding why methods work, not just memorising formulas or repeating familiar solutions.' },
        { title: 'A Structured Approach to Practice', text: 'Build your skills progressively through conceptual learning, challenging questions, and revision.' },
      ],
    },
    closing: {
      heading: 'Your IIT Journey Begins with the Way You Think.',
      paragraphs: [
        'Ambitious goals demand focused preparation, strong fundamentals, and the willingness to tackle difficult problems.',
        'At Uexora, we aim to help you develop the understanding, reasoning, and problem-solving skills needed to approach JEE Advanced with greater confidence.',
        'Take the next step towards your engineering aspirations with a learning environment that fits your needs.',
      ],
      primary: { label: 'Talk to Our Academic Team', href: contact },
    },
  },
  {
    slug: 'olympiad',
    name: 'Olympiad',
    title: 'Olympiad Preparation',
    tagline: 'Think Curiously. Challenge Yourself. Discover Your Potential.',
    intro: [
      'Great learning begins with great questions. Olympiads encourage students to move beyond routine classroom learning, explore challenging problems, and discover new ways of thinking.',
      'At Uexora, our live online Olympiad preparation classes help students strengthen their conceptual understanding, develop logical reasoning, and build the confidence to take on academic challenges through structured learning and purposeful practice.',
    ],
    tags: ['Critical Thinking', 'Concept-Based Learning'],
    image: { src: '/images/exams/olympiad-hero-2.jpg', alt: 'Schoolgirls in a library pointing out places on a globe together' },
    journey: {
      heading: 'Learning Goes Beyond the Textbook.',
      paragraphs: [
        'Olympiads are not simply about finding the right answer. They are about understanding why an answer works, exploring different approaches, and learning to solve problems that may not have an obvious solution.',
        'At Uexora, we encourage students to question, reason, experiment with ideas, and approach unfamiliar challenges with curiosity.',
        'Our online programme offers three batch formats — 1:6, 1:15, and 1:30 — allowing students to choose a learning environment that suits their preferences and academic needs.',
        'Whether your child is developing a strong academic foundation or preparing for challenging Olympiad examinations, our focus is on nurturing deeper understanding and a lasting interest in learning.',
      ],
      image: { src: '/images/exams/olympiad-journey.jpg', alt: 'A boy looking through a microscope during a science lesson' },
    },
    why: {
      heading: 'Why Choose Uexora for Olympiad Preparation?',
      subheading: 'More Than Exam Preparation. A Foundation for Lifelong Learning.',
      whyList: [
        { title: 'Live Online Classes', text: 'Access structured learning from wherever you are, without the need to travel to a physical classroom.' },
        { title: 'Three Batch Options', text: 'Choose between 1:6, 1:15, and 1:30 learning environments based on your preferences and academic needs.' },
        { title: 'Flexible Revision in the 1:6 Batch', text: 'Request focused revision classes when you need additional support with challenging concepts.' },
        { title: 'Concept-Driven Learning', text: 'Develop a deeper understanding of the ideas behind problems rather than relying solely on memorisation.' },
        { title: 'A Focus on Thinking Skills', text: 'Strengthen logical reasoning, analytical thinking, and the ability to approach unfamiliar challenges.' },
      ],
    },
    closing: {
      heading: 'Every Great Discovery Begins with a Question.',
      paragraphs: [
        'A challenging problem is an opportunity to think differently. A difficult question is an invitation to learn something new.',
        'At Uexora, we aim to help students develop the curiosity, understanding, and problem-solving skills to approach Olympiads with confidence and enthusiasm.',
        'Encourage your child to question more, think deeper, and discover what they are capable of achieving.',
      ],
      primary: { label: 'Talk to Our Academic Team', href: contact },
    },
  },
];

/** The three batch formats, the same for every exam: shown once on the page, after the exams. */
export const examBatches: NonNullable<import('./types.ts').Service['examBatches']> = {
  heading: 'Find Your Perfect Batch',
  text: 'Every programme offers three batch formats — 1:6, 1:15 and 1:30 — so students can choose a learning environment that suits their needs and preferences.',
  batchRows: [
    {
      number: '01',
      name: 'Personalised Prep',
      ratio: '1:6',
      tagline: 'Small Group. Focused Attention. Flexible Revision.',
      text: 'For students who want a more personalised learning experience, with greater attention to their individual learning needs.',
      points: [
        'Small-group online classes that encourage focused interaction.',
        'Focused revision classes that students can request when they need additional support.',
        'Opportunities to revisit challenging concepts and strengthen understanding.',
        'A learning experience designed around focused learning and revision.',
      ],
      image: batchPhotos.small,
    },
    {
      number: '02',
      name: 'Guided Prep',
      ratio: '1:15',
      tagline: 'Structured Learning. Consistent Progress.',
      text: 'A balanced online learning experience for students who want structured teaching, concept clarity, and a consistent preparation routine.',
      points: [
        'Structured, subject-wise lessons.',
        'Revision classes scheduled by teachers.',
        'Guided question practice to reinforce concepts.',
        'A structured approach to building examination readiness.',
      ],
      image: batchPhotos.guided,
    },
    {
      number: '03',
      name: 'Collaborative Prep',
      ratio: '1:30',
      tagline: 'Learn Together. Prepare with Purpose.',
      text: 'A structured online classroom experience for students who enjoy learning alongside a larger group of fellow aspirants.',
      points: [
        'Structured subject-wise online classes.',
        'Revision sessions scheduled by teachers.',
        'Regular practice to strengthen understanding.',
        'A consistent classroom routine that supports exam preparation.',
      ],
      bestFor: 'Students who enjoy a larger classroom environment and a structured study schedule.',
      image: batchPhotos.collaborative,
    },
  ],
};

/** How we prepare students, the same for every exam: shown once on the page, after the batches. */
export const examApproach: NonNullable<import('./types.ts').Service['examApproach']> = {
  heading: 'Our Approach to Exam Preparation',
  subheading: 'Understand the Concept. Practise with Purpose. Improve with Consistency.',
  text: 'Competitive examinations test more than memorisation. Students need to understand concepts, connect ideas across topics, apply them to unfamiliar questions, and develop effective examination strategies.',
  approachSteps: [
    { title: 'Build Strong Foundations', text: 'Develop a clear understanding of the fundamental concepts that support more advanced learning.' },
    { title: 'Develop Problem-Solving Skills', text: 'Learn to break complex problems into manageable steps, identify the right approach, and apply concepts logically.' },
    { title: 'Practise with Purpose', text: 'Work through exam-style questions to improve accuracy, recognise common question patterns, and identify areas that need more attention.' },
    {
      title: 'Revise with Direction',
      text: 'Revisit important concepts, strengthen weaker areas, and build consistency through revision and practice. In our 1:6 batch, students can also request focused revision classes when they need extra support.',
    },
    { title: 'Prepare for Exam Day', text: 'Work towards improving time management, question selection, and the ability to apply knowledge under examination conditions.' },
  ],
  image: { src: '/images/exams/jee-main-approach.jpg', alt: 'A student drawing with a ruler on graph paper beside an open textbook' },
};
