import { defineArrayMember, defineField, defineType } from 'sanity';
import { items, paragraphs, services, strings } from './objects';

export const marketingPage = defineType({
  name: 'marketingPage',
  title: 'Marketing page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About' },
    { name: 'services', title: 'What we do' },
    { name: 'how', title: 'How we work' },
    { name: 'who', title: 'Who we work with' },
    { name: 'philosophy', title: 'Philosophy' },
    { name: 'why', title: 'Why choose us' },
    { name: 'cta', title: 'Call to action' },
    { name: 'seo', title: 'Search & social' },
  ],
  fields: [
    defineField({ name: 'eyebrow', title: 'Division name', type: 'string', group: 'hero' }),
    defineField({ name: 'title', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'lead', title: 'Lead paragraph', type: 'text', rows: 4, group: 'hero' }),
    defineField({
      name: 'hero',
      title: 'Hero details',
      type: 'object',
      group: 'hero',
      fields: [
        strings('chips', 'Keywords'),
                defineField({ name: 'background', title: 'Background photo', type: 'picture', description: 'Full-width photo behind the hero; people work best, with the subject towards the right.' }),
        defineField({ name: 'primary', title: 'Primary button', type: 'link' }),
        defineField({ name: 'secondary', title: 'Secondary button', type: 'link' }),
      ],
    }),

    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      group: 'about',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        paragraphs(),
        defineField({ name: 'link', title: 'Link label (to Why choose us)', type: 'string' }),
        defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Landscape; it is cropped with a rounded right side.' }),
        defineField({ name: 'rows', title: 'Process steps', type: 'array', of: [defineArrayMember({ type: 'item' })], validation: (r) => r.max(3) }),
        defineField({ name: 'closing', title: 'Closing statement', type: 'text', rows: 2 }),
      ],
    }),

    defineField({ name: 'servicesHeading', title: 'Heading', type: 'string', group: 'services' }),
    defineField({ name: 'servicesHighlight', title: 'Highlighted word', type: 'string', group: 'services', description: 'A word from the heading shown in the yellow accent.' }),
    defineField({ name: 'servicesIntro', title: 'Intro', type: 'text', rows: 3, group: 'services' }),
    defineField({ name: 'servicesAside', title: 'Side note', type: 'text', rows: 3, group: 'services', description: 'Short paragraph shown to the right of the heading.' }),
    { ...services('services', 'Services'), group: 'services' },
    defineField({ name: 'servicesCta', title: 'Card at the end of the list', type: 'ctaCard', group: 'services' }),

    defineField({
      name: 'how',
      title: 'How we work',
      type: 'object',
      group: 'how',
      fields: [
        defineField({ name: 'heading', title: 'Small heading', type: 'string' }),
        defineField({ name: 'title', title: 'Heading', type: 'string' }),
        paragraphs('intro', 'Intro paragraphs'),
        items('steps', 'Steps'),
        defineField({ name: 'outro', title: 'Closing line', type: 'text', rows: 2 }),
      ],
    }),

    defineField({
      name: 'who',
      title: 'Who we work with',
      type: 'object',
      group: 'who',
      fields: [
        defineField({ name: 'heading', title: 'Small heading', type: 'string' }),
        defineField({ name: 'title', title: 'Heading', type: 'string' }),
        paragraphs(),
        strings('stages', 'Business stages'),
      ],
    }),

    defineField({
      name: 'philosophy',
      title: 'Philosophy',
      type: 'object',
      group: 'philosophy',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'quote', title: 'Pull quote', type: 'text', rows: 2 }),
        paragraphs(),
      ],
    }),

    defineField({
      name: 'choose',
      title: 'Which one is right for you',
      type: 'object',
      group: 'why',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
        defineField({ name: 'rows', title: 'Situations', type: 'array', of: [defineArrayMember({ type: 'signpost' })] }),
      ],
    }),
    defineField({ name: 'faqs', title: 'Common questions', type: 'array', group: 'why', of: [defineArrayMember({ type: 'faq' })] }),
    defineField({
      name: 'why',
      title: 'Why choose us',
      type: 'object',
      group: 'why',
      fields: [
        defineField({ name: 'eyebrow', title: 'Small heading', type: 'string' }),
        defineField({ name: 'title', title: 'Heading', type: 'string' }),
        paragraphs('intro', 'Intro paragraphs'),
        items('reasons', 'Reasons'),
        defineField({ name: 'closingHeading', title: 'Closing heading', type: 'string' }),
        paragraphs('closing', 'Closing paragraphs'),
        defineField({ name: 'signoff', title: 'Sign-off line', type: 'string' }),
      ],
    }),

    defineField({ name: 'cta', title: 'Closing call to action', type: 'ctaBand', group: 'cta' }),
    defineField({ name: 'seo', title: 'Search & social', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Marketing page' }) },
});
