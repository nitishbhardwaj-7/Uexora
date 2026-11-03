import type { Service } from './types.ts';

/**
 * The sections of the Inclusive Learning & Special Support programme. The areas, the people it can
 * serve, the parent courses, the workshops and the closing statement are the client's (each area's
 * list is split from one sentence). DRAFT, for the client to review: the headings of the areas, the
 * people it can serve and the courses (the client gave none). The course photos are general
 * parent-and-child scenes, and those for autism and ADHD show no faces: they should not imply that
 * anyone pictured has a diagnosis. Fallback (and seed) for the Sanity `educationPage` programme;
 * studio edits override these.
 */
export const inclusiveAreas: NonNullable<Service['pillars']> = {
  heading: 'Eight areas of support',
  pillarItems: [
    {
      title: 'Early Communication & Language Development',
      icon: 'speech',
      points: ['Early sounds', 'Vocabulary', 'Expressive language', 'Understanding instructions', 'Alternative communication'],
    },
    {
      title: 'Social & Interactive Learning',
      icon: 'team',
      points: ['Social interaction', 'Friendship skills', 'Turn-taking', 'Group participation'],
    },
    {
      title: 'Cognitive & Academic Development',
      icon: 'bulb',
      points: ['Attention', 'Memory', 'Sequencing', 'Reasoning', 'Learning readiness'],
    },
    {
      title: 'Functional & Everyday Life Skills',
      icon: 'routine',
      points: ['Personal care', 'Routines', 'Organisation', 'Independence'],
    },
    {
      title: 'Emotional & Behavioural Development',
      icon: 'heart',
      points: ['Emotional awareness', 'Self-expression', 'Coping skills', 'Positive support strategies'],
    },
    {
      title: 'Inclusive & Individualised Learning',
      icon: 'sliders',
      points: ['Autism-inclusive education', 'ADHD learning support', 'Learning differences', 'Individual learning plans'],
    },
    {
      title: 'Parent Education & Empowerment',
      icon: 'family',
      points: ['Understanding children’s needs', 'Communication at home', 'Routines', 'Supportive parenting'],
    },
    {
      title: 'Independence & Future Readiness',
      icon: 'compass',
      points: ['Self-advocacy', 'Life skills', 'Social confidence', 'Transition to adulthood'],
    },
  ],
};

export const inclusiveServes: NonNullable<Service['serves']> = {
  heading: 'Who the programme can serve',
  serveGroups: [
    { text: 'Young children who need additional learning support', icon: 'sprout' },
    { text: 'Children with autism spectrum disorder (ASD)', icon: 'infinity' },
    { text: 'Children with ADHD', icon: 'focus' },
    { text: 'Children with speech and language difficulties', icon: 'speech' },
    { text: 'Children with learning differences', icon: 'book' },
    { text: 'Children who experience social communication difficulties', icon: 'team' },
    { text: 'Children who need support with emotional regulation and everyday independence', icon: 'heart' },
  ],
};

const coursePhoto = (file: string, alt: string) => ({ src: `/images/inclusive-courses/${file}.jpg`, alt });

export const inclusiveCourses: NonNullable<Service['courses']> = {
  heading: 'Courses for Parents',
  text: 'Understanding children’s needs, communication at home, routines and supportive parenting.',
  courseSlides: [
    {
      title: 'Understanding Autism',
      audience: '',
      text: 'Understanding neurodiversity, strengths and support needs.',
      image: coursePhoto('understanding-autism', 'A child’s hands arranging wooden blocks on the floor'),
    },
    {
      title: 'Understanding ADHD',
      audience: '',
      text: 'Attention, routines and supportive approaches.',
      image: coursePhoto('understanding-adhd', 'A parent and child stacking rings on a wooden number toy'),
    },
    {
      title: 'Communication at Home',
      audience: '',
      text: 'Encouraging meaningful everyday communication.',
      image: coursePhoto('communication-at-home', 'A father talking with his two children over breakfast at the table'),
    },
    {
      title: 'Understanding Behaviour',
      audience: '',
      text: 'Identifying triggers, needs and patterns behind behaviour.',
      image: coursePhoto('understanding-behaviour', 'A father sitting on a sofa, talking calmly with his son'),
    },
    {
      title: 'Emotional Support',
      audience: '',
      text: 'Supporting emotional regulation and wellbeing.',
      image: coursePhoto('emotional-support', 'A parent holding a child close on a park bench'),
    },
    {
      title: 'Daily Routine Management',
      audience: '',
      text: 'Creating predictable and supportive routines.',
      image: coursePhoto('daily-routine-management', 'Parents helping their daughter get ready for school'),
    },
    {
      title: 'Positive Parenting',
      audience: '',
      text: 'Encouragement, boundaries and positive reinforcement.',
      image: coursePhoto('positive-parenting', 'A mother and daughter playing with wooden shapes at a table'),
    },
    {
      title: 'Independence Training',
      audience: '',
      text: 'Helping children develop age-appropriate life skills.',
      image: coursePhoto('independence-training', 'A young child building a tower of coloured blocks'),
    },
    {
      title: 'School Collaboration',
      audience: '',
      text: 'Working with teachers and support professionals.',
      image: coursePhoto('school-collaboration', 'Two women in conversation across a table'),
    },
    {
      title: 'Parent Wellbeing',
      audience: '',
      text: 'Managing stress and building support networks.',
      image: coursePhoto('parent-wellbeing', 'Two women sharing a warm drink and a conversation at home'),
    },
  ],
};

export const inclusiveWorkshops: NonNullable<Service['workshops']> = {
  heading: 'Special parent workshops',
  image: { src: '/images/inclusive-courses/parent-workshops.jpg', alt: 'A woman sitting on the floor with three young children, talking together' },
  workshopItems: [
    'How to support a child during a meltdown without punishment or shame.',
    'How to create a visual timetable at home.',
    'How to encourage communication through everyday activities.',
    'How to make transitions easier.',
    'How to build positive parent-child relationships.',
    'How to recognise a child’s strengths and interests.',
    'How to prepare for school meetings and support planning.',
  ],
};

export const inclusiveClosing: NonNullable<Service['closing']> = {
  heading: 'Different Abilities. Individual Journeys. Unlimited Possibilities.',
  text: 'UEXORA believes that every child has unique strengths, abilities and learning needs. Through individualised educational programmes, inclusive learning approaches and parent empowerment, we aim to help every learner communicate, develop essential life skills and reach their fullest potential.',
};
