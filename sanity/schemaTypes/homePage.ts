import { defineArrayMember, defineField, defineType } from 'sanity';
import { paragraphs, strings } from './objects';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'showcase', title: 'Showcase' },
    { name: 'divisions', title: 'Divisions' },
    { name: 'purpose', title: 'Purpose' },
    { name: 'cta', title: 'Call to action' },
    { name: 'seo', title: 'Search & social' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        strings('lines', 'Headline lines', 'One entry per line of the headline.'),
        defineField({ name: 'highlight', title: 'Highlighted word', type: 'string', description: 'A word or phrase from the headline shown in gold.' }),
        defineField({ name: 'sub', title: 'Subline', type: 'string' }),
        defineField({ name: 'subStrong', title: 'Subline (bold part)', type: 'string' }),
        defineField({ name: 'primary', title: 'Primary button', type: 'link' }),
        defineField({ name: 'secondary', title: 'Secondary button', type: 'link' }),
      ],
    }),
    defineField({
      name: 'showcase',
      title: 'Showcase',
      type: 'object',
      group: 'showcase',
      fields: [
        defineField({ name: 'image', title: 'Background image', type: 'picture' }),
        defineField({ name: 'statement', title: 'Statement', type: 'text', rows: 3 }),
        defineField({ name: 'highlight', title: 'Statement ending (gold)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'divisions',
      title: 'Divisions',
      type: 'object',
      group: 'divisions',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
        defineField({
          name: 'panels',
          title: 'Panels',
          type: 'array',
          validation: (r) => r.max(2),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'panel',
              title: 'Panel',
              fields: [
                defineField({
                  name: 'key',
                  title: 'Division',
                  type: 'string',
                  options: { list: [{ title: 'Education', value: 'education' }, { title: 'Marketing', value: 'marketing' }], layout: 'radio' },
                  validation: (r) => r.required(),
                }),
                strings('title', 'Title lines', 'One entry per line.'),
                defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
                defineField({ name: 'cta', title: 'Link label', type: 'string' }),
                defineField({ name: 'href', title: 'Link to', type: 'string' }),
                defineField({ name: 'image', title: 'Photo', type: 'picture' }),
              ],
              preview: { select: { title: 'cta', subtitle: 'key', media: 'image' } },
            }),
          ],
        }),
      ],
    }),
    strings('marquee', 'Scrolling keywords', 'Shown in the moving strip between sections.'),
    defineField({
      name: 'purpose',
      title: 'Purpose',
      type: 'object',
      group: 'purpose',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        paragraphs(),
        defineField({ name: 'button', title: 'Button', type: 'link' }),
        defineField({ name: 'educationImage', title: 'Education photo', type: 'picture', description: 'Portrait works best; shown as a 4:5 card.' }),
        defineField({ name: 'marketingImage', title: 'Marketing photo', type: 'picture', description: 'Portrait works best; shown as a 4:5 card.' }),
      ],
    }),
    defineField({ name: 'cta', title: 'Closing call to action', type: 'ctaBand', group: 'cta' }),
    defineField({ name: 'seo', title: 'Search & social', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
