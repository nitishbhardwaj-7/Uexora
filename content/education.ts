import type { Service } from './types.ts';
import { examApproach, examBatches, examTracks, examWhy } from './exams.ts';
import { englishApproach, englishBatches, englishTracks } from './english.ts';
import { aiCourses } from './ai-courses.ts';
import { aiProfessionalCourses } from './ai-professional-courses.ts';
import { aiProfessionalJourney } from './ai-professional-journey.ts';
import { aiProfessionalTools } from './ai-professional-tools.ts';
import { aiTools } from './ai-tools.ts';
import { communicationCourses, communicationPillars, communicationPlatforms } from './communication-programme.ts';
import { corporateAreas, corporateWorkshops } from './corporate-programme.ts';
import { inclusiveAreas, inclusiveClosing, inclusiveCourses, inclusiveServes, inclusiveWorkshops } from './special-support-programme.ts';
import { aiProfessionalsApproach, aiStudentsApproach, communicationApproach, corporateApproach, specialNeedsApproach } from './programme-approaches.ts';

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
    image: { src: '/images/services/academic-support-study-together.jpg', alt: 'Two students working through an assignment together outdoors' },
    heroImage: { src: '/images/heroes/services/academic-support-and-school-tuition-2.jpg', alt: 'A young student taking notes during a one-to-one online lesson with her tutor on a laptop' },
    highlights: ['Subject understanding', 'Working through difficult concepts', 'Confidence in studies', 'Guidance that fits each student'],
    whoFor: 'School students who want extra guidance with their subjects, from everyday schoolwork to the concepts they find hardest.',
    details: [],
    gradeSupport: {
      heading: 'Grade-specific assistance, Grade 1 to 12',
      text: 'What a student needs changes as they move through school, so our support changes with them: strong foundations in the early years, deeper understanding in middle school, and focused preparation for board examinations in the senior years.',
      stages: [
        { grades: '1–5', title: 'Primary years', text: 'Reading, writing and number skills, curiosity and good study habits, built patiently so that learning feels enjoyable.' },
        { grades: '6–8', title: 'Middle school', text: 'A firmer grasp of core subjects as topics become more demanding, with help organising work and thinking independently.' },
        { grades: '9–10', title: 'Secondary', text: 'Clear concepts across subjects, regular practice and steady preparation for board examinations.' },
        { grades: '11–12', title: 'Senior secondary', text: 'Focused support in the chosen stream, from difficult concepts to revision and board examination preparation.' },
      ],
    },
    curricula: {
      heading: 'Curricula we support',
      text: 'We support students across the main school curricula, keeping our sessions in step with what they are taught in class and how they are assessed.',
      boards: [
        { short: 'CBSE', name: 'Central Board of Secondary Education' },
        { short: 'ICSE', name: 'ICSE and ISC (CISCE)' },
        { short: 'US', name: 'American Curriculum' },
        { short: 'IB', name: 'International Baccalaureate' },
        { short: 'IGCSE', name: 'Cambridge IGCSE, AS and A Level' },
      ],
    },
    offerings: {
      heading: 'What the programme includes',
      features: [
        {
          title: 'Personalised Teaching Programmes',
          options: [
            {
              ratio: '1:1',
              title: '1:1 Learning Programme',
              tagline: 'One Teacher. One Student. Complete Attention.',
              image: { src: '/images/programmes/one-to-one-tutoring.jpg', alt: 'A tutor guiding a student through her written work at home' },
              text: 'Individualised teaching focused entirely on your child’s learning needs, pace, strengths, and areas for improvement.',
            },
            {
              ratio: '1:6',
              title: '1:6 Learning Programme',
              tagline: 'One Teacher. Six Students. Focused Support.',
              image: { src: '/images/programmes/small-group-learning.jpg', alt: 'A teacher working with a small group of children around a classroom table' },
              text: 'Small-group learning that combines individual guidance with peer interaction, collaborative activities, and shared learning experiences.',
            },
            {
              ratio: '1:20',
              title: '1:20 Learning Programme',
              tagline: 'One Teacher. Twenty Students. Learning Together.',
              image: { src: '/images/programmes/class-learning-together.jpg', alt: 'A teacher at the board in a full classroom, with students raising their hands' },
              text: 'A larger-group learning experience that encourages participation, discussion, collaboration, and learning alongside peers.',
            },
          ],
        },
        { title: 'Step-by-Step Learning Assistance', image: { src: '/images/programmes/step-by-step-explanation.jpg', alt: 'A teacher explaining an equation step by step on a whiteboard' }, text: 'Personalised, step-by-step explanations that help students understand difficult concepts and solve problems independently.' },
        { title: 'Real-Time Subject Quizzes & Unlimited Practice', image: { src: '/images/programmes/quizzes-and-practice.jpg', alt: 'A young student working through exercises on a tablet' }, text: 'Reinforce learning with interactive quizzes based on your subjects and continuous practice opportunities.' },
        { title: 'Dedicated Exam Preparation', image: { src: '/images/programmes/exam-preparation.jpg', alt: 'A student completing an exam paper with a pencil' }, text: 'Structured revision, mock tests, and targeted practice to help students prepare confidently for examinations.' },
        {
          title: 'Tutor Assistance Within 15 Minutes',
          image: { src: '/images/programmes/tutor-assistance-online.jpg', alt: 'A student on a video call with her tutor while taking notes' },
          text: 'Get academic guidance when you’re stuck, with tutor assistance within 15 minutes, subject to your service availability and operating hours.',
        },
        { title: 'Student-Choice Revision', image: { src: '/images/programmes/student-choice-revision.jpg', alt: 'Notebooks and sticky notes laid out for revision' }, text: 'Choose the topics you want to revise and focus your extra learning time where you need it most.' },
        { title: 'Live Progress Tracking for Parents', image: { src: '/images/programmes/parent-progress-tracking.jpg', alt: 'A parent and child smiling as they look at a tablet together' }, text: 'Give parents visibility into their child’s learning progress, performance, strengths, and areas requiring improvement.' },
      ],
    },
    comparison: {
      heading: 'How is UEXORA different from the teacher next door?',
      text: 'Local tuition can help with homework. Our programmes are built to do more, with support around the student and visibility for parents.',
      them: 'Teacher next door',
      us: 'UEXORA',
      lines: [
        {
          label: 'Personal attention',
          them: 'Usually one format, at one pace for everyone in the room',
          us: 'Personalised attention to each student’s needs, pace and strengths, in 1:1, 1:6 or 1:20 programmes',
        },
        { label: 'Teachers', them: 'Depends on one person’s subjects and availability', us: 'Highly qualified teachers across subjects and grades' },
        { label: 'Progress for parents', them: 'Shared informally, when you ask', us: 'Live progress tracking: performance, strengths and areas to improve' },
        { label: 'Finding learning gaps', them: 'Mostly homework help and repeating the lesson', us: 'Learning gaps identified, so effort goes where it is needed most' },
        { label: 'Help when stuck', them: 'Only during the tuition hour', us: 'Tutor assistance within 15 minutes, subject to service availability and operating hours' },
        { label: 'Practice', them: 'Limited to worksheets and homework', us: 'Real-time subject quizzes and unlimited practice' },
        { label: 'Curricula', them: 'Often familiar with one board', us: 'Support across CBSE, ICSE and ISC, IB, Cambridge and the American curriculum' },
        { label: 'Beyond the syllabus', them: 'Focused on the school syllabus', us: 'Future-ready skills: AI, robotics and emerging technologies' },
      ],
    },
    faqHeading: 'Common Questions From Parents',
    faqs: [
      {
        q: 'Will my child understand subjects they currently struggle with?',
        a: 'That is the aim. We focus on the topics your child finds difficult and explain why concepts work, step by step, rather than asking them to memorise answers. Guided practice and revisiting difficult concepts help that understanding last.',
      },
      {
        q: 'Will someone identify why my child is falling behind?',
        a: 'Yes. Learning gap identification is part of the programme: we look at where your child’s understanding breaks down and help them focus on the concepts that need attention.',
      },
      {
        q: 'Will my child receive help when they get stuck?',
        a: 'Yes. Tutor assistance is available within 15 minutes, subject to service availability and operating hours, and step-by-step explanations help your child work through the problem.',
      },
      {
        q: 'Will my child become confident enough to solve problems independently?',
        a: 'That is what we work towards. Students learn to analyse questions, explore solutions and reason things through, with step-by-step guidance that gradually gives way to solving problems on their own.',
      },
      {
        q: 'Will my child learn something beyond what school already teaches?',
        a: 'Yes. Students see how what they learn connects to the real world, and explore AI, robotics and emerging technologies through practical activities and hands-on projects.',
      },
      {
        q: 'How will I know whether my child is improving?',
        a: 'Live progress tracking gives you visibility into your child’s learning progress, performance, strengths and the areas that need more attention.',
      },
    ],
    text: 'Every student learns differently, and sometimes a little extra guidance can make a real difference. Our academic support programmes aim to help students understand their subjects, work through difficult concepts and become more confident in their studies.',
  },
  {
    title: 'Competitive Exam Preparation',
    slug: 'competitive-exam-preparation',
    promise: 'Prepare for NEET, JEE Main, JEE Advanced and Olympiads with live online classes, concept building and regular practice.',
    seo: { description: 'NEET, JEE Main, JEE Advanced and Olympiad preparation with Uexora Education: live online classes in 1:6, 1:15 and 1:30 batches, concept building, practice and revision.' },
    image: { src: '/images/services/competitive-exam-study-session.jpg', alt: 'A student working through exam papers beside a laptop in a classroom' },
    heroImage: { src: '/images/heroes/services/competitive-exam-preparation.jpg', alt: 'A smiling student studying with books and a laptop in a library' },
    highlights: ['NEET', 'JEE Main', 'JEE Advanced', 'Olympiad'],
    tracksHeading: 'Choose your exam',
    tracksText: 'Four live online programmes, each with 1:6, 1:15 and 1:30 batches. Choose an exam to see how we prepare for it.',
    tracks: examTracks,
    examBatches,
    examApproach,
    examWhy,
    whoFor: 'Students preparing for competitive examinations such as JEE and NEET who want a clear, structured approach to the subjects involved.',
    details: [
      'Competitive examinations such as JEE and NEET reward a clear understanding of the subjects as much as hard work. Our preparation combines focused learning on the syllabus, concept building that connects topics together, and regular practice so that students become familiar with the format and pace of the exam.',
    ],
    faqHeading: 'Common Questions Asked',
    // Questions: the client's. Answers: DRAFT for the client to review, written only from what the
    // page already says (four exams, live online classes, 1:6 / 1:15 / 1:30 batches, revision on
    // request in 1:6, exam-style practice). Nos. 2, 5, 6, 7 and 8 need the client's confirmation:
    // no starting grade, mock tests, study materials or progress reports are promised until they do.
    faqs: [
      {
        q: 'What competitive exams does Uexora offer preparation for?',
        a: 'We offer live online preparation for NEET, JEE Main, JEE Advanced and Olympiads. If you are preparing for a different exam, ask us and we will tell you what we can support.',
      },
      {
        q: 'At what grade or class should students start preparing for competitive exams?',
        a: 'There is no single right time, and it depends on the exam and on the student. Olympiads can be a good fit while students are still building their foundations, while JEE and NEET preparation becomes more focused in the senior school years. Speak to our academic team and we will help you decide when and where to begin.',
      },
      {
        q: 'Do you offer online classes for competitive exam preparation?',
        a: 'Yes. All of our competitive exam preparation is taught through live online classes, so students can learn from wherever they are. Each programme is offered in three batch sizes: 1:6, 1:15 and 1:30.',
      },
      {
        q: 'Are the classes suitable for beginners?',
        a: 'Yes. Our preparation begins with building strong foundations, so students who are just starting out can develop a clear understanding of the core concepts before moving on to more challenging problems.',
      },
      {
        q: 'Do you provide personalised learning plans for students?',
        a: 'Students choose the batch that suits them best. The 1:6 Personalised Prep batch offers greater attention to each student’s learning needs, and students can request focused revision classes when they need extra support. Talk to our academic team about what would work best for your child.',
      },
      {
        q: 'How do you track students’ progress and performance?',
        a: 'Regular practice with exam-style questions helps show where a student is doing well and which areas need more attention, so revision can focus on strengthening weaker topics. Our academic team can explain how progress is followed in your chosen batch.',
      },
      {
        q: 'Do you provide practice tests, mock exams and study materials?',
        a: 'Practice is part of every batch: students work through exam-style questions to improve accuracy, recognise common question patterns and prepare for exam conditions. Ask our academic team what is included in the batch you are considering.',
      },
      {
        q: 'Can students balance school academics with competitive exam preparation?',
        a: 'Yes. Because classes are live and online, students do not need to travel, and a structured, consistent schedule makes it easier to plan preparation alongside schoolwork. Our team can help you choose a batch that fits your child’s routine.',
      },
    ],
    text: 'Preparing for a competitive exam takes commitment, practice and a clear understanding of the subjects involved. We aim to support students preparing for examinations such as JEE and NEET through focused learning, concept building and regular practice.',
  },
  {
    title: 'Overseas Education & English Language',
    slug: 'overseas-education-and-english-language',
    promise: 'Get clear first guidance on studying abroad, and prepare for IELTS, PTE or TOEFL.',
    seo: { description: 'Overseas education counselling and IELTS, PTE and TOEFL preparation to help students explore university options and study abroad with clarity.' },
    image: { src: '/images/services/overseas-english-grammar.jpg', alt: 'An English grammar book and a laptop on a wooden desk' },
    heroImage: { src: '/images/heroes/services/overseas-education-and-english-language.jpg', alt: 'Three students resting on stacks of language dictionaries in a library' },
    highlights: ['Overseas education counselling', 'Exploring university options', 'IELTS, PTE and TOEFL preparation', 'The steps to study internationally'],
    tracksHeading: 'Choose your test',
    tracksText: 'Four English test preparation programmes, each with 1:6, 1:15 and 1:30 batches. Choose a test to see how we prepare for it.',
    tracks: englishTracks,
    examBatches: englishBatches,
    examApproach: englishApproach,
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
    image: { src: '/images/services/ai-coding-pair-programming.jpg', alt: 'Two people working through code together on a laptop' },
    heroImage: { src: '/images/heroes/services/ai-coding-and-robotics-for-students.jpg', alt: 'Students building robots together while their teacher looks on' },
    highlights: ['Artificial intelligence', 'Coding', 'Robotics', 'Hands-on problem solving'],
    whoFor: 'Learners from an early age who want to understand the technology shaping almost every field, through practical activities rather than theory alone.',
    details: [
      'Technology is becoming part of almost every field, and we believe students should have the chance to understand it from an early age. Through AI, coding and robotics programmes, learners explore new concepts, experiment with ideas and build things that work.',
      'The emphasis is on practical activities: trying, testing and improving, so that problem-solving becomes a habit rather than a lesson.',
    ],
    courses: aiCourses,
    tools: aiTools,
    approach: aiStudentsApproach,
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
    journey: aiProfessionalJourney,
    courses: aiProfessionalCourses,
    tools: aiProfessionalTools,
    approach: aiProfessionalsApproach,
    faqs: [],
    text: 'Artificial intelligence is changing how people work, teach and learn. This programme helps working professionals and educators understand what AI can do, use AI tools practically in their everyday work and think about using them responsibly.',
  },
  {
    title: 'Communication, Public Speaking and Confidence Building',
    slug: 'communication-public-speaking-and-confidence-building',
    heroTitle: 'Communication,\nPublic Speaking\nand Confidence\nBuilding',
    promise: 'Students won’t just learn communication skills. They will get opportunities to practise, perform, present and showcase their abilities on different platforms and stages.',
    seo: { description: 'Communication, public speaking and confidence skills for students from Grade 5 through university, with real opportunities to perform and present.' },
    image: { src: '/images/services/communication-public-speaking-and-confidence-building.jpg', alt: 'A woman speaking into a microphone on a stage' },
    heroImage: { src: '/images/heroes/services/communication-public-speaking-and-confidence-building.jpg', alt: 'A schoolboy presenting his drawings to his classmates' },
    highlights: ['Grade 5 through university', 'Structured online learning', 'Interactive activities', 'Real performance opportunities'],
    overviewHeading: 'Learn. Practise. Perform. Become.',
    whoFor: 'UEXORA empowers students from Grade 5 through university with essential communication, public speaking, confidence and personality development skills through structured online learning, interactive activities and real performance opportunities.',
    details: [],
    pillars: communicationPillars,
    courses: communicationCourses,
    platforms: communicationPlatforms,
    approach: communicationApproach,
    // DRAFT, for the client to review: the questions are ours; the answers keep to the client's facts.
    faqs: [
      { q: 'Who is this programme for?', a: 'Students from Grade 5 through university, in three stages: Foundation Explorers for Grades 5–8, Emerging Leaders for Grades 9–12 and Future Professionals for university students.' },
      { q: 'How do students learn?', a: 'Through structured online learning, interactive activities and real performance opportunities.' },
      { q: 'Is it only about public speaking?', a: 'No. The six learning pillars also cover communication, confidence and personality development, critical thinking and expression, leadership and social skills, and academic and career readiness.' },
      { q: 'Will students get to perform?', a: 'Yes. They get opportunities to practise, perform, present and showcase their abilities on different platforms and stages, such as The UEXORA Stage, Debate Arena and Digital Showcase.' },
    ],
    text: 'Building confident communicators, expressive thinkers and future leaders.',
  },
  {
    title: 'Special Needs Students Programme',
    slug: 'special-needs-students-programme',
    heroTitle: 'Special Needs\nStudents Programme',
    promise: 'Every Child Is Different. Every Child Can Grow. Every Child Deserves to Be Heard.',
    seo: { description: 'Inclusive learning and special needs support for children from age 2 onwards: early communication, speech and language, individualised learning and parent education.' },
    image: { src: '/images/services/special-needs-students-programme.jpg', alt: 'A teacher helping a young student with maths homework' },
    heroImage: { src: '/images/heroes/services/special-needs-students-programme.jpg', alt: 'A teacher sitting beside a young boy and helping him write' },
    highlights: ['From age 2 onwards', 'Speech and language services', 'Individualised support', 'Parent education'],
    overviewHeading: 'Every Milestone Matters. Every Voice Deserves to Be Heard.',
    whoFor: '',
    details: [],
    serves: inclusiveServes,
    pillars: inclusiveAreas,
    courses: inclusiveCourses,
    workshops: inclusiveWorkshops,
    closing: inclusiveClosing,
    approach: specialNeedsApproach,
    // DRAFT, for the client to review: the questions are ours; the answers keep to the client's facts.
    faqs: [
      { q: 'Who is this programme for?', a: 'Children from age 2 onwards, including young children who need additional learning support, children with autism spectrum disorder (ASD) or ADHD, and children with speech and language difficulties, learning differences or social communication difficulties.' },
      { q: 'What does the support cover?', a: 'Early communication and language, social and interactive learning, cognitive and academic development, everyday life skills, emotional and behavioural development, inclusive and individualised learning, parent education, and independence and future readiness.' },
      { q: 'How are parents involved?', a: 'Through parent education: courses such as Understanding Autism, Communication at Home and Positive Parenting, and workshops on everyday situations.' },
      { q: 'What do the parent workshops cover?', a: 'Practical situations such as supporting a child during a meltdown without punishment or shame, creating a visual timetable at home, making transitions easier and preparing for school meetings and support planning.' },
    ],
    text: 'Supporting children from age 2 onwards through early communication, speech and language services, developmental learning, individualised support and parent education.',
  },
  {
    title: 'Corporate Trainings',
    slug: 'corporate-trainings',
    // DRAFT, for the client to review: the hero line, drawn from the client's own sentence below.
    promise: 'Practical training and development for stronger teams and future-ready professionals.',
    seo: { description: 'Corporate trainings from Uexora Education: sales, digital marketing, leadership, customer service, soft skills, AI and HR, with customised workshops and seminars.' },
    image: { src: '/images/services/corporate-trainings.jpg', alt: 'A presenter leading a business seminar for a group of professionals' },
    heroImage: { src: '/images/heroes/services/corporate-trainings.jpg', alt: 'A trainer at a flip chart leading a session with a team around a table' },
    highlights: ['Seven areas of training', 'Customised workshops and seminars', 'Practical, future-ready skills'],
    overviewHeading: 'Empowering People. Transforming Businesses.',
    whoFor: '',
    details: [],
    platforms: corporateAreas,
    closing: corporateWorkshops,
    approach: corporateApproach,
    // DRAFT, for the client to review: the questions are ours; the answers keep to the client's facts.
    faqs: [
      { q: 'What does the corporate training cover?', a: 'Seven areas: sales and business development, marketing and digital marketing, leadership and management, customer service, professional and soft skills, technology, AI and digital skills, and HR and organisational development.' },
      { q: 'Who is it for?', a: 'Organisations that want to build stronger teams, improve business performance and develop future-ready professionals.' },
      { q: 'Do you run workshops and seminars?', a: 'Yes. We organise and deliver customised corporate workshops and seminars designed to enhance employee capabilities, develop leadership potential, improve business performance and encourage continuous professional growth.' },
      { q: 'Does the training include AI?', a: 'Yes. Technology, AI and Digital Skills covers artificial intelligence for business and generative AI tools, and the marketing training includes AI tools for marketing.' },
    ],
    text: 'Uexora helps organisations build stronger teams, improve business performance, and develop future-ready professionals through practical corporate training and development solutions.',
  },
];

export const education = {
  seo: {
    title: 'Uexora Education | Tuition, JEE & NEET, IELTS, AI & Robotics',
    description:
      'Uexora Education: school tuition, JEE and NEET, IELTS, PTE and TOEFL, AI and robotics, public speaking, special needs support and corporate training.',
  },

  eyebrow: 'Uexora Education',
  title: 'Learn With Purpose. Grow With Confidence.',
  lead:
    'From academic success and future-ready skills to confidence, communication and personal growth, we bring more opportunities to learn and develop. Because, you matter.',
  hero: {
    chips: ['School tuition', 'JEE & NEET', 'IELTS · PTE · TOEFL', 'AI & robotics', 'AI for professionals', 'Public speaking', 'Special needs support', 'Corporate trainings'],
    /** The keywords under the hero buttons, each linking to its programme. */
    chipLinks: [
      { label: 'School tuition', href: '/education/academic-support-and-school-tuition' },
      { label: 'JEE & NEET', href: '/education/competitive-exam-preparation' },
      { label: 'IELTS · PTE · TOEFL', href: '/education/overseas-education-and-english-language' },
      { label: 'AI & robotics', href: '/education/ai-coding-and-robotics-for-students' },
      { label: 'AI for professionals', href: '/education/ai-for-professionals-and-educators' },
      { label: 'Public speaking', href: '/education/communication-public-speaking-and-confidence-building' },
      { label: 'Special needs support', href: '/education/special-needs-students-programme' },
      { label: 'Corporate trainings', href: '/education/corporate-trainings' },
    ],
    background: { src: '/images/heroes/education-hero-bg.jpg', alt: 'Two smiling students at their desks in a classroom, one reading a textbook' },
    primary: { label: 'Explore the programmes', href: '/education#programmes' },
    secondary: { label: 'Speak with our education team', href: '/contact?division=education' },
  },
  /** Figures in the band under the hero, each counting up as it comes into view. From the
      client's reference ("Programs" spelt as the site spells it); confirm them before launch. */
  stats: [
    { value: '55+', label: 'Partner Institutions' },
    { value: '38,000+', label: 'Learners' },
    { value: '70+', label: 'Academics & AI Programmes' },
  ],


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
    /** Shown on each programme page as a three-by-three grid of icons (in place of the quote and paragraphs). */
    points: [
      {
        title: 'Interactive Learning That Keeps Them Curious',
        subtitle: 'Teaching methods that make learning enjoyable',
        text: 'Interactive lessons and engaging activities encourage students to participate, ask questions, and enjoy discovering new ideas.',
        icon: 'questions',
      },
      {
        title: 'Understanding Before Memorising',
        subtitle: 'Practical understanding of concepts over rote learning.',
        text: 'We help students understand why concepts work, so they can apply their knowledge beyond memorised answers.',
        icon: 'bulb',
      },
      {
        title: 'Connect Learning to the Real World',
        subtitle: 'Real-Life Application',
        text: 'Students explore how classroom concepts relate to everyday situations, practical challenges, and real-world applications.',
        icon: 'globe',
      },
      {
        title: 'Make Complex Ideas Easier to Understand',
        subtitle: 'Story-Based Learning',
        text: 'We use relatable stories, examples, and explanations to help students connect new concepts with what they already know.',
        icon: 'book',
      },
      {
        title: 'Learning That Adapts to the Student',
        subtitle: 'Personalised Learning',
        text: 'Learning support is tailored to each student’s current understanding, individual needs, and pace of progress.',
        icon: 'sliders',
      },
      {
        title: 'Build Strong Foundations, One Concept at a Time',
        subtitle: 'Mastery at Your Own Pace',
        text: 'Students strengthen their understanding through guided practice and revisit difficult concepts before progressing.',
        icon: 'layers',
      },
      {
        title: 'Learning Gap Identification',
        subtitle: 'Understand Where Learning Breaks Down',
        text: 'We identify areas where students need additional support and help them focus on the concepts that require attention.',
        icon: 'search',
      },
      {
        title: 'Critical Thinking & Problem Solving',
        subtitle: 'Teach them how to think, not just what to answer',
        text: 'Students develop reasoning and problem-solving skills by analysing questions, exploring solutions, and learning to think independently.',
        icon: 'puzzle',
      },
      {
        title: 'Future-Ready Skills',
        subtitle: 'Go Beyond Textbooks. Explore What’s Next.',
        text: 'Students discover AI, robotics, and emerging technologies through practical activities and hands-on projects.',
        icon: 'robot',
      },
    ] as { title: string; subtitle?: string; text: string; icon?: string; image?: { src: string; alt: string } }[],
  },

  beyond: {
    heading: 'Preparing for More Than the Basic',
    paragraphs: [
      'The world is changing, and education needs to prepare learners for more than the next test.',
      'Strong academic knowledge remains important, but so do communication, creativity, problem-solving, confidence and the ability to adapt to new technologies. These skills can help learners make better use of their knowledge and prepare for different opportunities throughout life.',
      'At Uexora Education, our vision is to bring these different aspects of learning together, so students and learners can develop not only what they know, but also what they can do with it.',
      "We believe in consistent effort, the right guidance and the value of taking one step forward at a time.",
    ],
    skills: ['Communication & Presentation', 'AI & Digital Literacy', 'Creativity & Innovation', 'Critical Thinking & Problem-Solving', 'Confidence & Leadership', 'Adaptability & Lifelong Learning'],
    /** One photo per skill, in the same order. */
    skillImages: [
      { src: '/images/sections/skills/communication.jpg', alt: 'Two students in a lively discussion in a classroom' },
      { src: '/images/sections/skills/adaptability.jpg', alt: 'A young girl learning on a tablet with a stylus' },
      { src: '/images/sections/skills/creativity.jpg', alt: 'A teenager concentrating on a painting at an easel in an art class' },
      { src: '/images/sections/skills/problem-solving.jpg', alt: 'A child working through maths equations on a classroom whiteboard' },
      { src: '/images/sections/skills/confidence.jpg', alt: 'A student raising her hand to answer a question in class' },
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
      { need: 'Support for special needs students', slug: 'special-needs-students-programme' },
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
        text: 'From school tuition and competitive exam preparation to AI, robotics, public speaking, language proficiency, special needs support and corporate trainings, we bring a wide range of learning opportunities together on one platform. This makes it easier to explore different programmes as your goals evolve.',
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
