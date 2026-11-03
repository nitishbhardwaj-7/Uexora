import type { Service } from './types.ts';

/**
 * The sections of the Communication, Public Speaking and Confidence Building programme. The
 * pillars, stages, platforms and every line under them are the client's. DRAFT, for the client to
 * review: the stages heading and the platforms heading (the client gave neither). Fallback (and
 * seed) for the Sanity `educationPage` programme; studio edits override these.
 */
export const communicationPillars: NonNullable<Service['pillars']> = {
  heading: 'UEXORA’s six learning pillars',
  pillarItems: [
    {
      title: 'Communication Mastery',
      icon: 'speech',
      points: ['Speaking clearly and fluently', 'Vocabulary and articulation', 'Active listening', 'Conversations and discussions', 'Debate and persuasive communication'],
    },
    {
      title: 'Public Speaking & Presentation',
      icon: 'mic',
      points: ['Speech writing and delivery', 'Impromptu speaking', 'Stage presence', 'Voice modulation', 'Presentation and storytelling', 'Hosting and anchoring'],
    },
    {
      title: 'Confidence & Personality Development',
      icon: 'person',
      points: ['Overcoming stage fear', 'Self-esteem and self-awareness', 'Body language', 'Emotional intelligence', 'Positive mindset', 'Personal presentation'],
    },
    {
      title: 'Critical Thinking & Expression',
      icon: 'bulb',
      points: ['Debating and argument building', 'Creative thinking', 'Opinion formation', 'Problem-solving', 'Analytical thinking', 'Constructive discussions'],
    },
    {
      title: 'Leadership & Social Skills',
      icon: 'team',
      points: ['Teamwork and collaboration', 'Leadership development', 'Decision-making', 'Conflict resolution', 'Group communication', 'Networking and etiquette'],
    },
    {
      title: 'Academic & Career Readiness',
      icon: 'career',
      points: ['Interview preparation', 'Group discussions', 'Professional communication', 'Resume and self-introduction skills', 'University presentations', 'Career readiness'],
    },
  ],
};

export const communicationPathways: NonNullable<Service['pathways']> = {
  heading: 'From Grade 5 through university',
  pathwayStages: [
    {
      title: 'Foundation Explorers',
      range: 'Grades 5–8',
      points: ['Basic communication', 'Speaking without hesitation', 'Storytelling', 'Show and tell', 'Introduction to public speaking', 'Confidence games and activities'],
    },
    {
      title: 'Emerging Leaders',
      range: 'Grades 9–12',
      points: ['Advanced public speaking', 'Debates and persuasive speaking', 'Hosting and anchoring', 'Leadership and teamwork', 'Presentation mastery', 'Critical thinking'],
    },
    {
      title: 'Future Professionals',
      range: 'University Students',
      points: ['Professional communication', 'Corporate presentations', 'Interview preparation', 'Public speaking and thought leadership', 'Negotiation and networking', 'Professional confidence'],
    },
  ],
};

export const communicationPlatforms: NonNullable<Service['platforms']> = {
  heading: 'Platforms and stages to perform on',
  text: 'UEXORA will provide different platforms and performance opportunities, such as:',
  platformItems: [
    {
      name: 'The UEXORA Stage',
      text: 'Student speeches, presentations and public-speaking showcases.',
      image: { src: '/images/communication-platforms/the-uexora-stage.jpg', alt: 'A speaker with a microphone addressing an audience from a dark stage' },
    },
    {
      name: 'Debate Arena',
      text: 'Structured debates and intellectual discussions.',
      image: { src: '/images/communication-platforms/debate-arena.jpg', alt: 'Three students talking across their desks in a bright classroom' },
    },
    {
      name: 'Young Voices',
      text: 'A platform for students to share ideas, opinions and perspectives.',
      image: { src: '/images/communication-platforms/young-voices.jpg', alt: 'Smiling school students raising their hands in a classroom' },
    },
    {
      name: 'The Young Host',
      text: 'Opportunities to practise event hosting and anchoring.',
      image: { src: '/images/communication-platforms/the-young-host.jpg', alt: 'A young man speaking into a microphone and gesturing to the room' },
    },
    {
      name: 'Student Spotlight',
      text: 'Showcase talents, achievements and personal growth.',
      image: { src: '/images/communication-platforms/student-spotlight.jpg', alt: 'A student in a graduation gown being handed her diploma as classmates applaud' },
    },
    {
      name: 'Leadership Forum',
      text: 'Student discussions, collaborative challenges and leadership experiences.',
      image: { src: '/images/communication-platforms/leadership-forum.jpg', alt: 'Students working together around a table with a laptop and notebooks' },
    },
    {
      name: 'Digital Showcase',
      text: 'Online presentations, recorded speeches and student portfolios.',
      image: { src: '/images/communication-platforms/digital-showcase.jpg', alt: 'A young man recording himself on a phone mounted beside his laptop' },
    },
  ],
};
