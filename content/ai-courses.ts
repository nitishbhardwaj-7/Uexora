import type { Service } from './types.ts';

/**
 * The courses within AI, Coding and Robotics for Students, shown as a slider before the approach.
 * Titles and audiences are the client's; the descriptions are DRAFT copy for the client to
 * review, kept general (no durations, tools or outcomes the client has not confirmed).
 * Fallback (and seed) for the Sanity `educationPage` programme; studio edits override these
 * field by field.
 */
export const aiCourses: NonNullable<Service['courses']> = {
  heading: 'Explore Our Programmes',
  text: 'From a first introduction to AI in primary school to robotics, coding, app building and entrepreneurship for school, college and university students.',
  courseSlides: [
    {
      title: 'AI Foundation',
      audience: 'Grade 1 to Grade 6',
      text: 'A friendly first introduction to artificial intelligence: what it is, where we meet it in everyday life and how it works, explored through playful, hands-on activities.',
      image: { src: '/images/ai-courses/ai-foundation.jpg', alt: 'Two young children watching a small humanoid robot on a table' },
    },
    {
      title: 'AI Innovation',
      audience: 'Grade 7 to university students',
      text: 'For students ready to go further: understand how AI tools work, explore what they can do, and apply them to ideas and projects of their own.',
      image: { src: '/images/ai-courses/ai-innovation.jpg', alt: 'Teenage students working at computers and a laptop in a classroom' },
    },
    {
      title: 'Project Based Learning (PBL)',
      audience: 'School & college students',
      text: 'Learn by making. Students take a project from first idea to finished result, building problem-solving, teamwork and creativity along the way.',
      image: { src: '/images/ai-courses/project-based-learning.jpg', alt: 'A group of students sketching out a project together on large sheets of paper' },
    },
    {
      title: 'Robotics Workshops / Bootcamps',
      audience: 'School & university students',
      text: 'Hands-on sessions where students build, program and test robots, and see how hardware and code work together.',
      image: { src: '/images/ai-courses/robotics-bootcamps.jpg', alt: 'Students in safety glasses assembling a robot in a workshop' },
    },
    {
      title: 'Young CEO Programme',
      audience: 'School & university students',
      text: 'An introduction to entrepreneurship: shape an idea, understand the people it is for, plan how it could work, and present it with confidence.',
      image: { src: '/images/ai-courses/young-ceo.jpg', alt: 'A young man presenting a start-up idea on a flip chart' },
    },
    {
      title: 'Improve Your Pace with AI',
      audience: 'School & university students',
      text: 'Learn to use AI tools thoughtfully and responsibly to study smarter: organise your learning, practise and revise effectively, and move at a pace that suits you.',
      image: { src: '/images/ai-courses/learn-with-ai.jpg', alt: 'A student typing on a laptop at a library desk' },
    },
    {
      title: 'All Coding Languages',
      audience: 'School & university students',
      text: 'From first lines of code to more advanced programming, learn the languages that suit your goals, with practical exercises at every step.',
      image: { src: '/images/ai-courses/coding-languages.jpg', alt: 'A laptop showing lines of code in a dark room lit in blue' },
    },
    {
      title: 'Building Your Own Applications / Games',
      audience: 'School & university students',
      text: 'Plan, design and build your own apps and games, turning ideas into something people can use, play and share.',
      image: { src: '/images/ai-courses/apps-and-games.jpg', alt: 'App screen wireframes sketched in a notebook beside a smartphone' },
    },
  ],
};
