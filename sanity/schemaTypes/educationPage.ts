import { defineArrayMember, defineField, defineType } from 'sanity';
import { items, paragraphs, services, strings } from './objects';

export const educationPage = defineType({
  name: 'educationPage',
  title: 'Education page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About' },
    { name: 'programmes', title: 'What we do' },
    { name: 'approach', title: 'Approach' },
    { name: 'beyond', title: 'Beyond the classroom' },
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
        defineField({ name: 'rows', title: 'Highlights', type: 'array', of: [defineArrayMember({ type: 'item' })], validation: (r) => r.max(3) }),
        defineField({ name: 'closing', title: 'Closing statement', type: 'text', rows: 2 }),
      ],
    }),

    defineField({ name: 'programmesHeading', title: 'Heading', type: 'string', group: 'programmes' }),
    defineField({ name: 'programmesHighlight', title: 'Highlighted word', type: 'string', group: 'programmes', description: 'A word from the heading shown in the yellow accent.' }),
    defineField({ name: 'programmesIntro', title: 'Intro', type: 'text', rows: 3, group: 'programmes' }),
    defineField({ name: 'programmesAside', title: 'Side note', type: 'text', rows: 3, group: 'programmes', description: 'Short paragraph shown to the right of the heading.' }),
    { ...services('programmes', 'Programmes'), group: 'programmes' },
    defineField({ name: 'programmesCta', title: 'Card at the end of the list', type: 'ctaCard', group: 'programmes' }),

    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'object',
      group: 'approach',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'quote', title: 'Pull quote', type: 'text', rows: 2 }),
        paragraphs(),
      ],
    }),

    defineField({
      name: 'beyond',
      title: 'Preparing for more than the classroom',
      type: 'object',
      group: 'beyond',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        paragraphs(),
        strings('skills', 'Skills'),
        defineField({
          name: 'skillImages',
          title: 'Skill photos',
          type: 'array',
          of: [defineArrayMember({ type: 'picture' })],
          description: 'One photo per skill, in the same order (shown at 4:3).',
          validation: (r) => r.max(6),
        }),
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
  preview: { prepare: () => ({ title: 'Education page' }) },
});
