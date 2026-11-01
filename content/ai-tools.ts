import type { Service } from './types.ts';

/**
 * The AI tools shown on AI, Coding and Robotics for Students, as logo cards after the course
 * slider. Names and descriptions follow the client's reference (Adobe added at their request);
 * the heading and intro are DRAFT copy for the client to review. The logos are the tools' own
 * marks (see public/images/ai-tools/SOURCES.md); the note under the cards credits their owners.
 * Fallback (and seed) for the Sanity `educationPage` programme; studio edits override these.
 */
export const aiTools: NonNullable<Service['tools']> = {
  heading: 'AI Tools Students Explore',
  text: 'Students get to know widely used AI tools: what each one is good at, and how to use it thoughtfully and responsibly.',
  note: 'Product names and logos are trademarks of their respective owners.',
  toolCards: [
    { name: 'ChatGPT', text: 'Ideas, explanations and learning support', logo: { src: '/images/ai-tools/chatgpt.svg', alt: 'ChatGPT logo' } },
    { name: 'Claude', text: 'Reasoning, writing and analysis', logo: { src: '/images/ai-tools/claude.svg', alt: 'Claude logo' } },
    { name: 'Gemini', text: 'Multimodal AI exploration', logo: { src: '/images/ai-tools/gemini.svg', alt: 'Gemini logo' } },
    { name: 'Copilot', text: 'AI support for productivity', logo: { src: '/images/ai-tools/copilot.svg', alt: 'Microsoft Copilot logo' } },
    { name: 'Perplexity', text: 'Research and source discovery', logo: { src: '/images/ai-tools/perplexity.svg', alt: 'Perplexity logo' } },
    { name: 'Canva AI', text: 'Design and presentation creation', logo: { src: '/images/ai-tools/canva.png', alt: 'Canva logo' } },
    { name: 'Notion AI', text: 'Planning, notes and knowledge', logo: { src: '/images/ai-tools/notion.svg', alt: 'Notion logo' } },
    { name: 'Midjourney', text: 'Creative visual exploration', logo: { src: '/images/ai-tools/midjourney.svg', alt: 'Midjourney logo' } },
    { name: 'ElevenLabs', text: 'AI voice and audio creation', logo: { src: '/images/ai-tools/elevenlabs.svg', alt: 'ElevenLabs logo' } },
    { name: 'Zapier', text: 'Workflow automation concepts', logo: { src: '/images/ai-tools/zapier.svg', alt: 'Zapier logo' } },
    { name: 'Adobe', text: 'Creative design with generative AI', logo: { src: '/images/ai-tools/adobe.svg', alt: 'Adobe logo' } },
  ],
};
