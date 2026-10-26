import type { Service } from './types.ts';

/**
 * Default content for the Education page. This is the fallback (and the seed) for the
 * Sanity `educationPage` document; when Sanity is configured, values edited in the
 * studio override these field by field (see lib/cms).
 */
const programmes: Service[] = [
  {
    title: 'Academic Support and School Tuition',
    slug: 'academic-support-and-school-tuition',
    promise: 'Understand your subjects rather than memorise them, with support shaped around how you learn.',
    seo: { description: 'Academic support and school tuition from Uexora Education: help understanding subjects, working through difficult concepts and building confidence in studies.' },
    image: { src: '/images/services/academic-support-and-school-tuition.jpg', alt: 'A student studying at a desk with open books' },
    heroImage: { src: '/images/heroes/services/academic-support-and-school-tuition.jpg', alt: 'A tutor helping a teenage student with her homework at a desk' },
    highlights: ['Subject understanding', 'Working through difficult concepts', 'Confidence in studies', 'Guidance that fits each student'],
    whoFor: 'School students who want extra guidance with their subjects, from everyday schoolwork to the concepts they find hardest.',
    details: [
      'Our academic support is built around how each student actually learns. Rather than repeating the classroom, we focus on the subjects and topics a student finds difficult, work through the underlying concepts and build the understanding that makes the next lesson easier.',
      'The aim is confidence as much as marks: a student who understands their subjects can approach schoolwork, tests and examinations with more confidence and independence.',
    ],
    faqs: [
      { q: 'Who is academic support and school tuition for?', a: 'School students who want extra guidance with their subjects, whether that is keeping up with everyday schoolwork or working through concepts they find hard.' },
      { q: 'Which subjects are covered?', a: 'Support is arranged around the subjects a student needs help with. Tell us about the learner and their goals and we will help you find the right programme.' },
      { q: 'How is this different from classroom teaching?', a: 'The focus is on the individual student: understanding where they are starting from, working through difficult concepts at their pace and recognising progress along the way.' },
    ],
    text: 'Every student learns differently, and sometimes a little extra guidance can make a real difference. Our academic support programmes aim to help students understand their subjects, work through difficult concepts and become more confident in their studies.',
  },
  {
    title: 'Competitive Exam Preparation',
    slug: 'competitive-exam-preparation',
    promise: 'Prepare for JEE and NEET with focused learning, concept building and regular practice.',
    seo: { description: 'JEE and NEET preparation with Uexora Education: focused learning, concept building and regular practice for students preparing for competitive exams.' },
    image: { src: '/images/services/competitive-exam-preparation.jpg', alt: 'A student writing notes in a notebook with coloured pens' },
    heroImage: { src: '/images/heroes/services/competitive-exam-preparation.jpg', alt: 'A smiling student studying with books and a laptop in a library' },
    highlights: ['JEE and NEET', 'Focused learning', 'Concept building', 'Regular practice'],
    whoFor: 'Students preparing for competitive examinations such as JEE and NEET who want a clear, structured approach to the subjects involved.',
    details: [
      'Competitive examinations such as JEE and NEET reward a clear understanding of the subjects as much as hard work. Our preparation combines focused learning on the syllabus, concept building that connects topics together, and regular practice so that students become familiar with the format and pace of the exam.',
      'We don\'t promise overnight results. We believe in consistent effort, the right guidance and taking one step forward at a time, with realistic goals agreed with each student.',
    ],
    faqs: [
      { q: 'Which examinations does this programme prepare students for?', a: 'Competitive examinations such as JEE and NEET. Ask us if you are preparing for a different exam and we will tell you what we can support.' },
      { q: 'How does the preparation work?', a: 'Through focused learning, concept building and regular practice, with realistic goals agreed with each student.' },
      { q: 'Do you guarantee results?', a: 'No. We believe in consistent effort, the right guidance and the value of taking one step forward at a time.' },
    ],
    text: 'Preparing for a competitive exam takes commitment, practice and a clear understanding of the subjects involved. We aim to support students preparing for examinations such as JEE and NEET through focused learning, concept building and regular practice.',
  },
  {
    title: 'Overseas Education & English Language',
    slug: 'overseas-education-and-english-language',
    promise: 'Get clear first guidance on studying abroad, and prepare for IELTS, PTE or TOEFL.',
    seo: { description: 'Overseas education counselling and IELTS, PTE and TOEFL preparation to help students explore university options and study abroad with clarity.' },
    image: { src: '/images/services/overseas-education-and-english-language.jpg', alt: 'A globe on a desk in a study' },
    heroImage: { src: '/images/heroes/services/overseas-education-and-english-language.jpg', alt: 'Three students resting on stacks of language dictionaries in a library' },
    highlights: ['Overseas education counselling', 'Exploring university options', 'IELTS, PTE and TOEFL preparation', 'The steps to study internationally'],
    whoFor: 'Students planning to study abroad or improve their English language proficiency, and families exploring university options overseas.',
    details: [
      'For students planning to study abroad, two things usually come first: proving language proficiency and understanding the path to a university place. We provide preparation pathways for IELTS, PTE and TOEFL, and initial overseas education counselling to help students explore university options.',
      'Counselling is a starting point: it helps students and families understand the steps involved in pursuing education internationally so they can plan with more clarity.',
    ],
    faqs: [
      { q: 'Which English tests do you prepare students for?', a: 'IELTS, PTE and TOEFL.' },
      { q: 'What does overseas education counselling include?', a: 'Initial guidance to help students explore university options and understand the steps involved in pursuing education internationally.' },
      { q: 'Do you arrange admissions or visas?', a: 'Our counselling is an initial step to help students understand their options and the process. Tell us about your plans and we will explain how we can help.' },
    ],
    text: 'For students planning to study abroad or improve their language proficiency, we provide preparation pathways for IELTS, PTE and TOEFL. We also offer initial overseas education counselling to help students explore university options and better understand the steps involved in pursuing education internationally.',
  },
  {
    title: 'AI, Coding and Robotics for Students',
    slug: 'ai-coding-and-robotics-for-students',
    promise: 'Explore AI, coding and robotics by building, testing and improving real projects.',
    seo: { description: 'AI, coding and robotics programmes for students: explore new concepts, experiment with ideas and build problem-solving skills through practical activities.' },
    image: { src: '/images/services/ai-coding-and-robotics-for-students.jpg', alt: 'A small robot car built from a kit, with wheels and wires' },
    heroImage: { src: '/images/heroes/services/ai-coding-and-robotics-for-students.jpg', alt: 'Students building robots together while their teacher looks on' },
    highlights: ['Artificial intelligence', 'Coding', 'Robotics', 'Hands-on problem solving'],
    whoFor: 'Learners from an early age who want to understand the technology shaping almost every field, through practical activities rather than theory alone.',
    details: [
      'Technology is becoming part of almost every field, and we believe students should have the chance to understand it from an early age. Through AI, coding and robotics programmes, learners explore new concepts, experiment with ideas and build things that work.',
      'The emphasis is on practical activities: trying, testing and improving, so that problem-solving becomes a habit rather than a lesson.',
    ],
    faqs: [
      { q: 'What age can learners start?', a: 'We believe students should have opportunities to understand technology from an early age. Tell us about the learner and we will suggest a suitable starting point.' },
      { q: 'Is prior coding experience needed?', a: 'No. Learners explore new concepts and experiment with ideas through practical activities.' },
      { q: 'What do learners actually do?', a: 'They explore AI, coding and robotics concepts, experiment with ideas and develop problem-solving skills through hands-on activities.' },
    ],
    text: 'Technology is becoming part of almost every field, and we believe students should have opportunities to understand it from an early age. Through AI, coding and robotics programmes, learners can explore new concepts, experiment with ideas and develop problem-solving skills through practical activities.',
  },
  {
    title: 'AI for Professionals & Educators',
    slug: 'ai-for-professionals-and-educators',
    promise: 'Understand artificial intelligence and use it practically and responsibly in your work.',
    seo: { description: 'AI for professionals and educators from Uexora Education: understand artificial intelligence and learn to use AI tools practically and responsibly at work and in teaching.' },
    image: { src: '/images/services/ai-for-professionals-and-educators.jpg', alt: 'Hands typing on a laptop showing an AI chat assistant' },
    heroImage: { src: '/images/heroes/services/ai-for-professionals-and-educators.jpg', alt: 'An instructor helping an adult learner working on a laptop in a classroom' },
    highlights: ['Understanding AI', 'Practical AI tools', 'AI in teaching and learning', 'Responsible use'],
    whoFor: 'Working professionals and educators who want to understand artificial intelligence and use it with confidence in their work.',
    details: [
      'Artificial intelligence is already changing how people work, teach and learn. This programme helps professionals and educators understand what AI can and cannot do, and how to use it practically in their own work.',
      'For educators, that also means thinking about how AI fits into teaching and learning, and how to guide students in using it thoughtfully and responsibly.',
    ],
    faqs: [],
    text: 'Artificial intelligence is changing how people work, teach and learn. This programme helps working professionals and educators understand what AI can do, use AI tools practically in their everyday work and think about using them responsibly.',
  },
  {
    title: 'Communication, Public Speaking and Confidence Building',
    slug: 'communication-public-speaking-and-confidence-building',
    promise: 'Learn to share your ideas clearly and speak with confidence, in the classroom and beyond.',
    seo: { description: 'Communication, public speaking and confidence building programme: learn to share ideas, speak in front of others and present yourself clearly and confidently.' },
    image: { src: '/images/services/communication-public-speaking-and-confidence-building.jpg', alt: 'A woman speaking into a microphone on a stage' },
    heroImage: { src: '/images/heroes/services/communication-public-speaking-and-confidence-building.jpg', alt: 'A schoolboy presenting his drawings to his classmates' },
    highlights: ['Public speaking', 'Clear communication', 'Presenting with confidence', 'Interview readiness'],
    whoFor: 'Learners who know their subject but want to share their ideas, speak in front of others and present themselves with more confidence.',
    details: [
      'Knowing something and being able to express it confidently are two different skills. This programme helps learners become comfortable sharing their ideas, speaking in front of others, communicating clearly and presenting themselves with confidence.',
      'These skills carry across the classroom, interviews, further education and everyday life, which is why we treat them as part of a complete education rather than an extra.',
    ],
    faqs: [
      { q: 'Who is this programme for?', a: 'Learners who want to become more comfortable sharing their ideas, speaking in front of others and presenting themselves with confidence.' },
      { q: 'Where do these skills help?', a: 'In the classroom, during interviews, in further education and throughout life.' },
      { q: 'Is it only about public speaking?', a: 'No. It covers communicating clearly, presenting with confidence and expressing ideas, in front of a group or one to one.' },
    ],
    text: 'Knowing something and being able to express it confidently are two different skills. We want to help learners become more comfortable sharing their ideas, speaking in front of others, communicating clearly and presenting themselves with confidence. These skills can make a difference in the classroom, during interviews, in further education and throughout life.',
  },
  {
    title: 'Special Needs Students Programme',
    slug: 'special-needs-students-programme',
    promise: 'Learning support shaped around each student’s abilities, needs and pace, with patience and respect.',
    seo: { description: 'Special needs students programme from Uexora Education: individualised teaching, additional learning support and qualified educators for different abilities, needs and paces.' },
    image: { src: '/images/services/special-needs-students-programme.jpg', alt: 'A teacher helping a young student with maths homework' },
    heroImage: { src: '/images/heroes/services/special-needs-students-programme.jpg', alt: 'A teacher sitting beside a young boy and helping him write' },
    highlights: ['Individualised teaching approaches', 'Additional learning support', 'Different abilities, needs and paces', 'Qualified educators'],
    whoFor: 'Students who benefit from more individualised teaching, additional support and a learning pace that suits them, with understanding, patience and respect.',
    details: [
      'Every learner deserves to be treated with understanding, patience and respect. Some students benefit from more individualised teaching approaches and additional learning support, and we aim to provide learning pathways that recognise different abilities, needs and learning paces.',
      'Programmes are matched to the support required, with qualified educators suited to that support, and we keep parents informed through clear communication.',
    ],
    faqs: [
      { q: 'Who is the special needs students programme for?', a: 'Students who benefit from more individualised teaching, additional learning support or a different learning pace.' },
      { q: 'How do you decide on the right support?', a: 'By understanding each learner\'s abilities, needs and pace first, then matching programmes and qualified educators to the support required.' },
      { q: 'How are parents involved?', a: 'Through clear communication about the approach being taken and the progress being made.' },
    ],
    text: 'Every learner deserves to be treated with understanding, patience and respect. We recognise that some students benefit from more individualised teaching approaches and additional learning support. Our aim is to provide appropriate learning pathways that recognise different abilities, needs and learning paces, with programmes and qualified educators suited to the support required.',
  },
  {
    title: 'Corporate Trainings',
    slug: 'corporate-trainings',
    promise: 'Training for teams and organisations, shaped around the skills your people need.',
    seo: { description: 'Corporate trainings from Uexora Education: training for teams and organisations, shaped around the skills your people need.' },
    image: { src: '/images/services/corporate-trainings.jpg', alt: 'A presenter leading a business seminar for a group of professionals' },
    heroImage: { src: '/images/heroes/services/corporate-trainings.jpg', alt: 'A trainer at a flip chart leading a session with a team around a table' },
    highlights: ['Training for teams', 'Shaped around your goals', 'Practical, workplace-ready skills'],
    whoFor: 'Companies, institutions and teams that want to develop their people’s skills through focused training.',
    details: [
      'Organisations grow when their people keep learning. We start by understanding what your organisation wants to achieve and who will take part, then shape the training around those goals.',
    ],
    faqs: [],
    text: 'Organisations grow when their people keep learning. Our corporate trainings help teams build practical skills for the workplace, shaped around what each organisation wants to achieve.',
  },
];

export const education = {
  seo: {
    title: 'Uexora Education | Tuition, JEE & NEET, IELTS, AI & Robotics',
    description:
      'Uexora Education: school tuition, JEE and NEET preparation, overseas education with IELTS, PTE and TOEFL, AI, coding and robotics, AI for professionals and educators, public speaking, special needs support and corporate trainings.',
  },

  eyebrow: 'Uexora Education',
  title: 'Learn With Purpose. Grow With Confidence.',
  lead:
    'From academic success and future-ready skills to confidence, communication and personal growth, we bring more opportunities to learn and develop. Because, U matter.',
  hero: {
    chips: ['School tuition', 'JEE & NEET', 'IELTS · PTE · TOEFL', 'AI & robotics', 'Public speaking'],
    background: { src: '/images/heroes/education-hero-bg.jpg', alt: 'Two smiling students at their desks in a classroom, one reading a textbook' },
    primary: { label: 'Explore the programmes', href: '/education#programmes' },
    secondary: { label: 'Speak with our education team', href: '/contact?division=education' },
  },


  about: {
    heading: 'Learning is about more than grades and examinations.',
    paragraphs: [
      "At Uexora Education, we believe learning is about more than grades and examinations. It's about discovering what you're good at, building confidence, developing useful skills and preparing for the opportunities ahead.",
      'Every learner is different. Some need extra support with their schoolwork, while others are preparing for competitive exams, planning to study abroad or exploring new areas like artificial intelligence and robotics. Some want to improve their communication skills, become more confident speakers or develop at their own pace with the right learning support.',
    ],
    link: 'Why choose Uexora Education',
    image: { src: '/images/sections/education-approach.jpg', alt: 'A student smiling as she writes in a notebook at a sunlit desk beside a computer and house plants' },
    rows: [
      { title: 'Learn with purpose', text: 'Build a strong foundation with learning that connects to your goals.' },
      { title: 'Explore new possibilities', text: 'Discover new subjects, skills and opportunities for your future.' },
      { title: 'Find the right support', text: 'Get appropriate guidance at every stage of your learning journey.' },
    ],
    closing: 'A place to learn, grow and discover what comes next.',
  },

  programmesHeading: 'Learning for a brighter tomorrow.',
  /** A word from the heading shown in the yellow accent. */
  programmesHighlight: 'brighter',
  programmesIntro: 'Our education programmes are designed to help students build real skills, gain confidence and open doors to global opportunities.',
  programmesAside: 'From academic support to overseas education, we provide personalised guidance at every step of the learning journey.',
  programmes,
  programmesCta: {
    heading: 'Not sure which programme fits?',
    text: 'Tell us about the learner, their goals and where they are now. We will suggest where to start, with no obligation.',
    label: 'Find the right programme',
    href: '/contact?division=education',
  },

  approach: {
    heading: 'Our Approach to Learning',
    quote: "We don't believe there is just one way to learn or one definition of success.",
    paragraphs: [
      'Some learners need to strengthen their academic foundations. Others need help preparing for an important examination, developing a new skill or finding the confidence to speak up. What matters is understanding where each learner is starting from and helping them work towards realistic goals.',
      'We want learning to feel approachable, engaging and useful. That means encouraging questions, learning from mistakes, practising new skills and recognising progress along the way.',
      "We also understand that parents want to know their children are receiving the right guidance and making meaningful progress. We aim to build that confidence through clear communication, supportive teaching and a focus on each learner's needs.",
    ],
  },

  beyond: {
    heading: 'Preparing for More Than the Classroom',
    paragraphs: [
      'The world is changing, and education needs to prepare learners for more than the next test.',
      'Strong academic knowledge remains important, but so do communication, creativity, problem-solving, confidence and the ability to adapt to new technologies. These skills can help learners make better use of their knowledge and prepare for different opportunities throughout life.',
      'At Uexora Education, our vision is to bring these different aspects of learning together, so students and learners can develop not only what they know, but also what they can do with it.',
      "We don't promise overnight success. We believe in consistent effort, the right guidance and the value of taking one step forward at a time.",
    ],
    skills: ['Communication', 'Creativity', 'Problem-solving', 'Confidence', 'Adaptability', 'Curiosity'],
    /** One photo per skill, in the same order. */
    skillImages: [
      { src: '/images/sections/skills/communication.jpg', alt: 'Two students in a lively discussion in a classroom' },
      { src: '/images/sections/skills/creativity.jpg', alt: 'A teenager concentrating on a painting at an easel in an art class' },
      { src: '/images/sections/skills/problem-solving.jpg', alt: 'A child working through maths equations on a classroom whiteboard' },
      { src: '/images/sections/skills/confidence.jpg', alt: 'A student raising her hand to answer a question in class' },
      { src: '/images/sections/skills/adaptability.jpg', alt: 'A young girl learning on a tablet with a stylus' },
      { src: '/images/sections/skills/curiosity.jpg', alt: 'A girl looking into a microscope during a science lesson' },
    ],
  },

  choose: {
    heading: 'Which programme is right for you?',
    intro: 'Start from the goal rather than the course name. Each situation below leads to the programme built for it, and you can move between programmes as goals change.',
    rows: [
      { need: 'Stronger results and more confidence in school subjects', slug: 'academic-support-and-school-tuition' },
      { need: 'Preparing for JEE or NEET', slug: 'competitive-exam-preparation' },
      { need: 'Studying abroad or proving English proficiency', slug: 'overseas-education-and-english-language' },
      { need: 'Exploring technology hands-on', slug: 'ai-coding-and-robotics-for-students' },
      { need: 'Using AI in my work or my teaching', slug: 'ai-for-professionals-and-educators' },
      { need: 'Speaking and presenting with confidence', slug: 'communication-public-speaking-and-confidence-building' },
      { need: 'Learning that needs more individual support', slug: 'special-needs-students-programme' },
      { need: 'Training for a team or organisation', slug: 'corporate-trainings' },
    ],
  },

  faqs: [
    {
      q: 'Who are the programmes for?',
      a: 'Students and learners of different ages, abilities and ambitions, from everyday schoolwork and competitive exams to studying abroad and technology, as well as professionals, educators and organisations looking to build new skills.',
    },
    {
      q: 'How do we choose the right programme?',
      a: 'Start with the goal. Tell us about the learner and where they are now and we will suggest a starting point. Goals change, and learners can move between programmes as they do.',
    },
    {
      q: 'Do you promise grades or admissions?',
      a: 'No. We believe in consistent effort, the right guidance and taking one step at a time, and we keep parents informed through clear communication about progress.',
    },
  ],

  why: {
    eyebrow: 'Why Choose Uexora Education?',
    title: 'More Than Learning. A Place to Grow.',
    intro: [
      'Every learner has different goals, strengths and challenges. Some want to improve their grades, some are preparing for important examinations, and others want to develop new skills or become more confident in expressing themselves.',
      'At Uexora Education, we bring different learning opportunities together to help learners find the support they need at every stage of their journey.',
    ],
    reasons: [
      {
        title: 'Everything in One Place',
        text: 'From school tuition and competitive exam preparation to AI, robotics, public speaking and language proficiency, we bring a wide range of learning opportunities together on one platform. This makes it easier to explore different programmes as your goals evolve.',
      },
      {
        title: 'Learning That Fits Different Needs',
        text: 'We understand that not everyone learns in the same way or at the same pace. Our aim is to offer learning pathways suited to different goals, abilities and stages of development, including appropriate additional support for learners who need it.',
      },
      {
        title: 'Skills Beyond the Classroom',
        text: 'Education is about more than knowing the answers. We also value communication, critical thinking, problem-solving and the confidence to express ideas. We want learners to develop skills they can use in their studies, personal lives and future careers.',
      },
      {
        title: 'Preparing for the Future',
        text: 'The world is changing, and new opportunities require new skills. Through areas such as artificial intelligence, coding and robotics, we aim to help learners explore emerging technologies and develop a mindset of curiosity and continuous learning.',
      },
      {
        title: 'Support for Every Next Step',
        text: "Whether you're working towards better academic results, preparing for a competitive examination, exploring international education or developing a new ability, we want to help you understand your options and take the next step with greater clarity.",
      },
      {
        title: 'A Learning Journey That Keeps Growing',
        text: "Learning doesn't end when one course or examination is complete. As learners gain confidence and discover new interests, their goals can change too. Our broader range of educational programmes is designed to give them opportunities to continue learning and developing over time.",
      },
    ],
    closingHeading: 'Your Goals. Your Journey. Your Potential.',
    closing: [
      'We believe every learner deserves the opportunity to grow, discover their strengths and work towards their ambitions.',
      "At Uexora Education, we're here to help make that journey a little clearer.",
    ],
    signoff: 'Learn. Grow. Become.',
  },

  cta: {
    heading: 'Every Learner Has a Next Step.',
    paragraphs: [
      "Whether you're a parent looking for academic support for your child, a student preparing for a competitive exam, a learner interested in technology or someone who wants to build confidence and communication skills, your journey matters.",
      "We're here to help you explore the available learning opportunities and find a path that fits your goals.",
    ],
    signoff: "Let's take the next step together.",
    primary: { label: 'Speak with our education team', href: '/contact?division=education' },
    secondary: { label: 'See all programmes', href: '/education#programmes' },
  },
};

export type EducationContent = typeof education;
