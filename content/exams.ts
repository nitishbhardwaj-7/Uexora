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
    batchHeading: 'Find Your Perfect NEET Batch',
    batchList: [
      {
        number: '01',
        name: 'Personalised NEET Prep',
        ratio: '1:6',
        tagline: 'Small Group. Focused Attention. Flexible Revision.',
        text: 'For students who want a more personalised learning experience, with greater attention to their individual learning needs.',
        points: [
          'More personalised attention in a small-group setting.',
          'Focused revision classes that students can request when they need additional support.',
          'Opportunities to revisit challenging concepts and strengthen understanding.',
          'A learning experience designed around focused learning and revision.',
        ],
        image: batchPhotos.small,
      },
      {
        number: '02',
        name: 'Guided NEET Prep',
        ratio: '1:15',
        tagline: 'Structured Learning. Consistent Progress.',
        text: 'A balanced online learning experience for students who want structured teaching, concept clarity, and a consistent preparation routine.',
        points: [
          'Structured lessons in Biology, Physics, and Chemistry.',
          'Revision classes scheduled by teachers.',
          'Guided question practice to reinforce concepts.',
          'Consistent preparation aligned with NEET requirements.',
        ],
        image: batchPhotos.guided,
      },
      {
        number: '03',
        name: 'Collaborative NEET Prep',
        ratio: '1:30',
        tagline: 'Learn Together. Prepare with Purpose.',
        text: 'A structured online classroom experience for students who enjoy learning alongside a larger group of fellow NEET aspirants.',
        points: [
          'Structured subject-wise teaching.',
          'Revision sessions scheduled by teachers.',
          'Regular practice to strengthen understanding.',
          'A consistent classroom routine that supports exam preparation.',
        ],
        image: batchPhotos.collaborative,
      },
    ],
    approach: {
      heading: 'Our Approach to NEET Preparation',
      subheading: 'Understand the Concept. Practise with Purpose. Improve with Consistency.',
      text: 'NEET preparation requires more than memorising facts. Students need to understand fundamental concepts, apply them to unfamiliar questions, and develop effective examination strategies.',
      trackSteps: [
        { title: 'Build Strong Foundations', text: 'Develop a clear understanding of Biology, Physics, and Chemistry, with a focus on the fundamental concepts that support more advanced learning.' },
        { title: 'Practise for the Examination', text: 'Work through exam-style questions, improve application skills, and become familiar with the demands of competitive examinations.' },
        {
          title: 'Revise with Direction',
          text: 'Revisit important concepts, strengthen weaker areas, and build consistency through revision and practice. In our 1:6 batch, students can also request focused revision classes when they need extra support.',
        },
        {
          title: 'Prepare with Confidence',
          text: 'Build a disciplined preparation routine, learn from mistakes, and approach the examination with a clearer understanding of your strengths and areas for improvement.',
        },
      ],
      image: { src: '/images/exams/neet-approach.jpg', alt: 'A stethoscope resting on an open notebook on a study desk' },
    },
    closing: {
      heading: 'Your Medical Dream Starts with Your Next Step.',
      paragraphs: [
        'NEET is a challenging journey, but the right learning environment can make your preparation more focused and organised.',
        'Choose the batch that suits your learning needs, strengthen your concepts, and take your preparation one step at a time.',
      ],
      primary: { label: 'Explore Our NEET Programme', href: '#neet-batches' },
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
    batchHeading: 'Find Your Ideal JEE Main Batch',
    batchList: [
      {
        number: '01',
        name: 'Personalised JEE Prep',
        ratio: '1:6',
        tagline: 'Focused Attention. Flexible Revision.',
        text: 'For students who want a more personalised learning experience and greater attention to their individual learning needs.',
        points: [
          'Small-group online classes that encourage focused interaction.',
          'Focused revision classes that students can request when they need additional support.',
          'Opportunities to revisit difficult concepts and strengthen problem-solving techniques.',
          'A learning experience designed to help students address their academic challenges.',
        ],
        image: batchPhotos.small,
      },
      {
        number: '02',
        name: 'Guided JEE Prep',
        ratio: '1:15',
        tagline: 'Structured Learning. Consistent Progress.',
        text: 'A balanced online learning experience for students who want structured lessons, concept clarity, and regular preparation.',
        points: [
          'Systematic teaching across Physics, Chemistry, and Mathematics.',
          'Revision classes scheduled by teachers.',
          'Practice focused on conceptual understanding and problem-solving.',
          'A structured approach to building examination readiness.',
        ],
        image: batchPhotos.guided,
      },
      {
        number: '03',
        name: 'Collaborative JEE Prep',
        ratio: '1:30',
        tagline: 'Learn Together. Solve with Confidence.',
        text: 'A structured online classroom experience for students who enjoy learning alongside a larger group of aspiring engineers.',
        points: [
          'Structured subject-wise online classes.',
          'Revision sessions scheduled by teachers.',
          'Regular opportunities to practise applying concepts.',
          'A consistent learning routine focused on JEE Main preparation.',
        ],
        bestFor: 'Students who enjoy a larger classroom environment and a structured study schedule.',
        image: batchPhotos.collaborative,
      },
    ],
    approach: {
      heading: 'Our Approach to JEE Main Preparation',
      subheading: 'Understand the Fundamentals. Master the Application. Improve with Practice.',
      text: 'JEE Main tests more than memorisation. Students must understand concepts, connect ideas across topics, solve problems accurately, and manage their time effectively.',
      trackSteps: [
        { title: 'Build Strong Concepts', text: 'Develop a solid understanding of Physics, Chemistry, and Mathematics to create a foundation for tackling a wide range of questions.' },
        { title: 'Develop Problem-Solving Skills', text: 'Learn to break complex problems into manageable steps, identify the right approach, and apply concepts logically.' },
        { title: 'Practise with Purpose', text: 'Work through exam-style questions to improve accuracy, recognise common question patterns, and identify areas that need more attention.' },
        {
          title: 'Revise and Refine',
          text: 'Strengthen weaker topics, revisit important concepts, and develop a more consistent approach to preparation. Students in the 1:6 batch can also request focused revision classes when they need additional help.',
        },
        { title: 'Prepare for Exam Day', text: 'Work towards improving time management, question selection, and the ability to apply knowledge under examination conditions.' },
      ],
      image: { src: '/images/exams/jee-main-approach.jpg', alt: 'A student drawing with a ruler on graph paper beside an open textbook' },
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
    image: { src: '/images/exams/jee-advanced-hero.jpg', alt: 'A student working through a long derivation on a chalkboard full of equations' },
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
    batchHeading: 'Choose Your JEE Advanced Learning Experience',
    batchList: [
      {
        number: '01',
        name: 'Personalised Advanced Prep',
        ratio: '1:6',
        tagline: 'Deeper Focus. Personalised Attention. Flexible Revision.',
        text: 'Designed for students who prefer a more personalised learning environment while working through the complexities of JEE Advanced.',
        points: [
          'Small-group online classes that encourage focused interaction.',
          'Focused revision classes that students can request when they need additional support.',
          'Opportunities to revisit challenging concepts and difficult problem-solving methods.',
          'A learning experience designed to help students address specific academic challenges.',
        ],
        image: batchPhotos.small,
      },
      {
        number: '02',
        name: 'Guided Advanced Prep',
        ratio: '1:15',
        tagline: 'Structured Learning. Deeper Understanding.',
        text: 'A balanced online learning experience for students who want systematic teaching, conceptual depth, and regular practice.',
        points: [
          'Structured lessons across Physics, Chemistry, and Mathematics.',
          'Revision classes scheduled by teachers.',
          'Practice with complex and multi-concept questions.',
          'A guided approach to strengthening analytical and problem-solving skills.',
        ],
        image: batchPhotos.guided,
      },
      {
        number: '03',
        name: 'Collaborative Advanced Prep',
        ratio: '1:30',
        tagline: 'Challenge Your Thinking. Strengthen Your Skills.',
        text: 'A structured online classroom experience for students who enjoy learning alongside fellow engineering aspirants.',
        points: [
          'Structured subject-wise online classes.',
          'Revision sessions scheduled by teachers.',
          'Practice that encourages logical thinking and concept application.',
          'A consistent learning routine focused on JEE Advanced preparation.',
        ],
        image: batchPhotos.collaborative,
      },
    ],
    approach: {
      heading: 'Our Approach to JEE Advanced Preparation',
      subheading: 'Go Beyond Formulas. Develop the Mindset to Solve.',
      text: 'JEE Advanced often tests how well students connect concepts, reason through unfamiliar situations, and choose effective strategies for complex problems.',
      trackSteps: [
        { title: 'Strengthen Conceptual Depth', text: 'Build a deeper understanding of Physics, Chemistry, and Mathematics so that you can apply concepts beyond familiar textbook examples.' },
        { title: 'Master Multi-Concept Problems', text: 'Learn to recognise connections between topics, break complex questions into smaller steps, and develop logical solution strategies.' },
        { title: 'Develop Analytical Thinking', text: 'Practise approaching unfamiliar questions from different angles, evaluating possible methods, and reasoning carefully through each solution.' },
        { title: 'Practise with Purpose', text: 'Work through challenging questions and examination-style problems to improve accuracy, identify weaknesses, and strengthen your approach.' },
        {
          title: 'Revise Strategically',
          text: 'Revisit difficult concepts, reinforce important methods, and use practice to identify areas that need further attention. Students in the 1:6 batch can also request focused revision classes when they need extra help.',
        },
        { title: 'Prepare for Exam Conditions', text: 'Develop time management, question-selection strategies, and the ability to remain methodical when facing challenging examination questions.' },
      ],
      image: { src: '/images/exams/jee-advanced-approach.jpg', alt: 'A hand deriving a formula on a whiteboard' },
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
    image: { src: '/images/exams/olympiad-hero.jpg', alt: 'Two children watching a science experiment with wide eyes as vapour rises' },
    cardImage: { src: '/images/exams/olympiad-card.jpg', alt: 'A girl looking closely through a microscope' },
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
    batchHeading: 'Choose Your Olympiad Learning Experience',
    batchList: [
      {
        number: '01',
        name: 'Personalised Olympiad Prep',
        ratio: '1:6',
        tagline: 'Focused Attention. Deeper Exploration. Flexible Revision.',
        text: 'For students who prefer a more personalised learning experience, with greater attention to their individual learning needs.',
        points: [
          'Small-group online classes that encourage focused interaction.',
          'Focused revision classes that students can request when they need additional support.',
          'Opportunities to revisit challenging concepts and explore different problem-solving approaches.',
          'A learning environment that encourages questions, curiosity, and independent thinking.',
        ],
        image: batchPhotos.small,
      },
      {
        number: '02',
        name: 'Guided Olympiad Prep',
        ratio: '1:15',
        tagline: 'Structured Learning. Stronger Reasoning.',
        text: 'A balanced online learning experience for students who want structured teaching and regular opportunities to strengthen their reasoning skills.',
        points: [
          'Structured lessons focused on the relevant Olympiad syllabus.',
          'Revision classes scheduled by teachers.',
          'Practice with challenging, concept-based questions.',
          'Guided development of analytical thinking and problem-solving techniques.',
        ],
        image: batchPhotos.guided,
      },
      {
        number: '03',
        name: 'Collaborative Olympiad Prep',
        ratio: '1:30',
        tagline: 'Think Bigger. Learn Together.',
        text: 'A structured online classroom experience for students who enjoy learning alongside other curious and motivated learners.',
        points: [
          'Structured online classes focused on Olympiad preparation.',
          'Revision sessions scheduled by teachers.',
          'Practice designed to strengthen conceptual understanding and logical reasoning.',
          'A consistent learning routine that encourages intellectual growth.',
        ],
        image: batchPhotos.collaborative,
      },
    ],
    approach: {
      heading: 'Our Approach to Olympiad Preparation',
      subheading: 'Don’t Just Find the Answer. Understand the Thinking Behind It.',
      text: 'Olympiad examinations challenge students to apply concepts, recognise patterns, reason logically, and solve unfamiliar problems. Our approach focuses on developing these skills step by step.',
      trackSteps: [
        { title: 'Build Conceptual Clarity', text: 'Develop a strong understanding of the underlying concepts rather than relying only on memorised formulas or methods.' },
        { title: 'Strengthen Logical Reasoning', text: 'Learn to analyse information, identify patterns, connect ideas, and draw conclusions through logical thinking.' },
        { title: 'Explore Challenging Problems', text: 'Practise questions that encourage students to think beyond familiar examples and approach problems from different perspectives.' },
        { title: 'Develop Independent Thinking', text: 'Build the confidence to attempt unfamiliar questions, evaluate possible approaches, and learn from mistakes.' },
        { title: 'Practise and Refine', text: 'Revisit difficult concepts, strengthen weaker areas, and develop greater consistency through regular practice and revision.' },
        { title: 'Prepare with Confidence', text: 'Become familiar with the relevant examination format, question types, and time constraints through focused preparation.' },
      ],
      image: { src: '/images/exams/olympiad-approach.jpg', alt: 'A smiling boy looking at the camera through a magnifying glass' },
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
