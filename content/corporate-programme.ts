import type { Service } from './types.ts';

/**
 * The sections of the Corporate Trainings programme. The training areas and their topics, and the
 * workshops and seminars paragraph, are the client's (spelt the British way, as the site spells it).
 * DRAFT, for the client to review: the heading of the areas (the client gave none). Fallback (and
 * seed) for the Sanity `educationPage` programme; studio edits override these.
 */
const photo = (file: string, alt: string) => ({ src: `/images/corporate-trainings/${file}.jpg`, alt });

export const corporateAreas: NonNullable<Service['platforms']> = {
  heading: 'Seven areas of training',
  platformItems: [
    {
      name: 'Sales & Business Development Training',
      points: ['Sales techniques and strategies', 'B2B and B2C sales', 'Negotiation and closing skills', 'Lead generation', 'Account management', 'Customer relationship management'],
      image: photo('sales-business-development', 'Two businessmen smiling as they shake hands in an office'),
    },
    {
      name: 'Marketing & Digital Marketing Training',
      points: ['Digital marketing strategy', 'Social media marketing', 'SEO and Google Ads', 'Meta Ads and paid campaigns', 'Content marketing', 'Email marketing', 'Marketing analytics and reporting', 'AI tools for marketing'],
      image: photo('marketing-digital-marketing', 'A team seen from above around a table of laptops, charts and an ad spend report'),
    },
    {
      name: 'Leadership & Management Training',
      points: ['Leadership development', 'Team management', 'Strategic thinking', 'Decision-making', 'Performance management', 'Conflict resolution'],
      image: photo('leadership-management', 'A manager standing with a folder, talking with colleagues working at a table'),
    },
    {
      name: 'Customer Service Excellence',
      points: ['Customer experience management', 'Communication skills', 'Complaint handling', 'Customer retention', 'Professional telephone etiquette'],
      image: photo('customer-service', 'A smiling customer service agent in a headset, working at a laptop'),
    },
    {
      name: 'Professional & Soft Skills Development',
      points: ['Business communication', 'Presentation skills', 'Time management', 'Problem-solving', 'Critical thinking', 'Teamwork and collaboration'],
      image: photo('professional-soft-skills', 'A woman presenting to colleagues seated around a table in a bright meeting room'),
    },
    {
      name: 'Technology, AI & Digital Skills',
      points: ['Artificial intelligence for business', 'Generative AI tools', 'Microsoft Office training', 'Data analysis and reporting', 'Digital transformation', 'Productivity tools'],
      image: photo('technology-ai-digital', 'A man in a suit reviewing a data dashboard on a laptop'),
    },
    {
      name: 'HR & Organisational Development',
      points: ['HR management fundamentals', 'Recruitment and interviewing', 'Employee engagement', 'Talent development', 'Workplace culture', 'Organisational development'],
      image: photo('hr-organisational-development', 'A woman at an office table in a job interview, facing the interviewer'),
    },
  ],
};

export const corporateWorkshops: NonNullable<Service['closing']> = {
  heading: 'Corporate Workshops & Seminars',
  text: 'At Uexora, we organise and deliver customised corporate workshops and seminars designed to enhance employee capabilities, develop leadership potential, improve business performance, and encourage continuous professional growth.',
  image: photo('workshops-seminars', 'A presenter walking between tables of professionals during a workshop in a large, bright room'),
};
