import { defineField, defineType } from 'sanity';

/**
 * A customer review shown on the Education or Marketing landing page. Only real reviews,
 * shared with the reviewer's permission, may be published: the site shows a review only when
 * the permission box is ticked, and a page shows no reviews section until it has at least one.
 */
export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'division',
      title: 'Show on',
      type: 'string',
      options: {
        list: [
          { value: 'education', title: 'Education page' },
          { value: 'marketing', title: 'Marketing page' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'name', title: 'Reviewer’s name', type: 'string', description: 'As they agreed to be named, e.g. "Priya S." or "Rahul Mehta".', validation: (r) => r.required().max(60) }),
    defineField({
      name: 'role',
      title: 'Who they are',
      type: 'string',
      description: 'e.g. "Parent of a Grade 9 student", "JEE Main student", "Founder, Bloom Bakery".',
      validation: (r) => r.max(80),
    }),
    defineField({ name: 'programme', title: 'Programme or service', type: 'string', description: 'Optional: the programme or service they used.', validation: (r) => r.max(80) }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Optional, 1 to 5 stars, as the reviewer gave it.',
      options: { list: [5, 4, 3, 2, 1] },
      validation: (r) => r.min(1).max(5).integer(),
    }),
    defineField({ name: 'quote', title: 'Review', type: 'text', rows: 5, description: 'In the reviewer’s own words. Light edits for spelling only.', validation: (r) => r.required().min(20).max(600) }),
    defineField({
      name: 'permission',
      title: 'This is a real review, shared with the reviewer’s permission',
      type: 'boolean',
      initialValue: false,
      description: 'Required for the review to appear on the site.',
      validation: (r) => r.custom((v) => (v === true ? true : 'Tick this to confirm the review is real and may be published.')),
    }),
    defineField({ name: 'order', title: 'Position', type: 'number', description: 'Lower numbers show first.' }),
  ],
  orderings: [{ title: 'Position', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', role: 'role', division: 'division', rating: 'rating' },
    prepare: ({ title, role, division, rating }) => ({
      title,
      subtitle: [division === 'marketing' ? 'Marketing' : 'Education', role, rating ? `${rating}★` : ''].filter(Boolean).join(' · '),
    }),
  },
});
