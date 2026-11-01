import type { Service } from './types.ts';

/**
 * The AI tools shown on AI for Professionals & Educators, as logo cards after the course slider.
 * Names and descriptions follow the client's reference; the heading and intro are DRAFT copy for
 * the client to review. The logos are the tools' own marks (see public/images/ai-tools/SOURCES.md);
 * the note under the cards credits their owners. Fallback (and seed) for the Sanity
 * `educationPage` programme; studio edits override these.
 */
export const aiProfessionalTools: NonNullable<Service['tools']> = {
  heading: 'AI Tools Professionals Work With',
  text: 'Get to know widely used AI tools for writing, research, design, sales and automation: what each one does well, and how to use it responsibly at work.',
  note: 'Product names and logos are trademarks of their respective owners.',
  toolCards: [
    { name: 'ChatGPT', text: 'Content, Coding & Productivity', logo: { src: '/images/ai-tools/chatgpt.svg', alt: 'ChatGPT logo' } },
    { name: 'Claude', text: 'Reasoning & Long Documents', logo: { src: '/images/ai-tools/claude.svg', alt: 'Claude logo' } },
    { name: 'Gemini', text: 'Google AI Workspace', logo: { src: '/images/ai-tools/gemini.svg', alt: 'Gemini logo' } },
    { name: 'Copilot', text: 'Microsoft AI Assistant', logo: { src: '/images/ai-tools/copilot.svg', alt: 'Microsoft Copilot logo' } },
    { name: 'Perplexity', text: 'AI Search Engine', logo: { src: '/images/ai-tools/perplexity.svg', alt: 'Perplexity logo' } },
    { name: 'Canva AI', text: 'Design Faster', logo: { src: '/images/ai-tools/canva.png', alt: 'Canva logo' } },
    { name: 'Notion AI', text: 'Smart Notes & Workspace', logo: { src: '/images/ai-tools/notion.svg', alt: 'Notion logo' } },
    { name: 'Midjourney', text: 'AI Image Generation', logo: { src: '/images/ai-tools/midjourney.svg', alt: 'Midjourney logo' } },
    { name: 'Lovable', text: 'Build AI Apps Faster', logo: { src: '/images/ai-tools/lovable.svg', alt: 'Lovable logo' } },
    { name: 'Clay', text: 'Lead Intelligence', logo: { src: '/images/ai-tools/clay.png', alt: 'Clay logo' } },
    { name: 'Apollo', text: 'B2B Sales Platform', logo: { src: '/images/ai-tools/apollo.png', alt: 'Apollo.io logo' } },
    { name: 'Zapier', text: 'Workflow Automation', logo: { src: '/images/ai-tools/zapier.svg', alt: 'Zapier logo' } },
    { name: 'Make', text: 'Visual Automation', logo: { src: '/images/ai-tools/make.svg', alt: 'Make logo' } },
    { name: 'n8n', text: 'Open Source Automation', logo: { src: '/images/ai-tools/n8n.svg', alt: 'n8n logo' } },
    { name: 'ElevenLabs', text: 'AI Voice Generation', logo: { src: '/images/ai-tools/elevenlabs.svg', alt: 'ElevenLabs logo' } },
  ],
};
