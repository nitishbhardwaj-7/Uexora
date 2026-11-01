import type { Service } from './types.ts';

/**
 * The courses within AI for Professionals & Educators, shown as a slider before the approach.
 * The heading and course names are the client's ("AI for" added to Real Estate, Taxation and
 * Digital Marketing to match the others); the intro, audiences and descriptions are DRAFT copy
 * for the client to review, kept general (no durations, tools or outcomes the client has not
 * confirmed). Fallback (and seed) for the Sanity `educationPage` programme; studio edits override
 * these field by field.
 */
export const aiProfessionalCourses: NonNullable<Service['courses']> = {
  heading: 'Courses for AI Professionals',
  text: 'Practical AI courses shaped around the work you do, from sales, marketing and leadership to accounting, auditing, healthcare, real estate and taxation.',
  courseSlides: [
    {
      title: 'AI for Sales & Marketing',
      audience: 'Sales and marketing professionals',
      text: 'Use AI to research customers and markets, draft campaigns and messages, and make sense of sales data, while keeping the human judgement that builds relationships.',
      image: { src: '/images/ai-professional-courses/sales-and-marketing.jpg', alt: 'A marketing team smiling over sales charts on a laptop' },
    },
    {
      title: 'AI for Leadership',
      audience: 'Business leaders and senior professionals',
      text: 'Understand what AI means for your organisation: where it can help, where it carries risk, and how to lead people and decisions through the change responsibly.',
      image: { src: '/images/ai-professional-courses/leadership.jpg', alt: 'A woman leading a meeting, presenting charts to colleagues in a bright meeting room' },
    },
    {
      title: 'AI for Managers',
      audience: 'Managers and team leads',
      text: 'Put AI to work in everyday management, from planning and reporting to meetings and communication, and help your team adopt new tools with confidence.',
      image: { src: '/images/ai-professional-courses/managers.jpg', alt: 'A manager taking his team through a plan on a whiteboard' },
    },
    {
      title: 'AI for Accounting',
      audience: 'Accountants and finance professionals',
      text: 'See how AI can support bookkeeping, reconciliation, reporting and analysis, and learn to check its output carefully so that accuracy and professional standards come first.',
      image: { src: '/images/ai-professional-courses/accounting.jpg', alt: 'An accountant working through documents with a calculator at her desk' },
    },
    {
      title: 'AI for Auditing',
      audience: 'Auditors and assurance professionals',
      text: 'Explore how AI can help review large volumes of data, spot unusual patterns and document findings, with professional scepticism and judgement kept at the centre.',
      image: { src: '/images/ai-professional-courses/auditing.jpg', alt: 'A man in a suit reviewing a report at his desk beside a laptop' },
    },
    {
      title: 'AI for Nursing',
      audience: 'Nurses and nursing teams',
      text: 'Understand how AI is starting to support nursing, from documentation and scheduling to patient information, and how to use it safely and ethically alongside clinical judgement.',
      image: { src: '/images/ai-professional-courses/nursing.jpg', alt: 'Two nurses in blue scrubs talking at a hospital nurses’ station' },
    },
    {
      title: 'AI for Healthcare',
      audience: 'Doctors and healthcare professionals',
      text: 'An overview of AI across healthcare, from administration and records to imaging and research, with a focus on patient privacy, safety and responsible use.',
      image: { src: '/images/ai-professional-courses/healthcare.jpg', alt: 'A doctor examining scan images on a monitor beside an MRI scanner' },
    },
    {
      title: 'AI for Real Estate',
      audience: 'Real estate professionals',
      text: 'Use AI to write listings, research markets, answer enquiries and stay organised, so that more of your time goes to your clients.',
      image: { src: '/images/ai-professional-courses/real-estate.jpg', alt: 'A real estate agent showing a client around a home' },
    },
    {
      title: 'AI for Taxation',
      audience: 'Tax professionals and consultants',
      text: 'Learn how AI can help with research, document review and client communication in tax work, and why every result still needs a professional’s check.',
      image: { src: '/images/ai-professional-courses/taxation.jpg', alt: 'A consultant going through forms with a client at a table' },
    },
    {
      title: 'AI for Digital Marketing',
      audience: 'Digital marketers and content teams',
      text: 'Plan content, write and test copy, create visuals and read campaign data with AI tools, while keeping your brand’s voice and your audience’s trust.',
      image: { src: '/images/ai-professional-courses/digital-marketing.jpg', alt: 'A tablet showing a marketing chart, held up in front of a team at work' },
    },
  ],
};
