import type { Service } from './types.ts';

/**
 * The stages of AI for Professionals & Educators, shown after the introduction as numbered steps
 * on a line. The stage words, headings and descriptions are the client's (from their reference;
 * the end of the last description was cut off there, and "as your work evolves" completes it);
 * the heading and intro are DRAFT copy for the client to review. Fallback (and seed) for the
 * Sanity `educationPage` programme; studio edits override these.
 */
export const aiProfessionalJourney: NonNullable<Service['journey']> = {
  heading: 'Your Learning Journey',
  text: 'Four stages take you from understanding AI to using it with confidence in your own work.',
  journeySteps: [
    {
      label: 'Discover',
      title: 'Understand AI',
      text: 'Build a clear understanding of AI concepts, tools, opportunities, and use cases relevant to your goals.',
    },
    {
      label: 'Learn',
      title: 'Build Practical Skills',
      text: 'Learn through structured sessions, demonstrations, guided exercises, and hands-on activities.',
    },
    {
      label: 'Apply',
      title: 'Work on Real Problems',
      text: 'Put your learning into practice through projects, workflows, business scenarios, and practical applications.',
    },
    {
      label: 'Grow',
      title: 'Build Long-Term Capability',
      text: 'Continue developing your capabilities and apply new tools and approaches as your work evolves.',
    },
  ],
};
