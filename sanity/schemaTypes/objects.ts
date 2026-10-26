import { defineArrayMember, defineField, defineType } from 'sanity';

/** Reusable building blocks. Field names mirror the default content in content/. */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'href',
      title: 'Link to',
      type: 'string',
      description: 'A page on this site (e.g. /contact?division=education or /education#programmes) or a full URL.',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
});

export const item = defineType({
  name: 'item',
  title: 'Item',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'text' } },
});

export const picture = defineType({
  name: 'picture',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describes the image for screen readers and search engines.',
    }),
  ],
});

export const seo = defineType({
  name: 'seo',
  title: 'Search & social',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'title', title: 'Page title', type: 'string', description: 'Shown in the browser tab and search results.' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, description: 'Around 150 characters, used by search engines and social previews.' }),
  ],
});

export const ctaCard = defineType({
  name: 'ctaCard',
  title: 'Call-to-action card',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
    defineField({ name: 'label', title: 'Button label', type: 'string' }),
    defineField({ name: 'href', title: 'Button link', type: 'string' }),
  ],
});

export const ctaBand = defineType({
  name: 'ctaBand',
  title: 'Closing call to action',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 3 })] }),
    defineField({ name: 'signoff', title: 'Sign-off line', type: 'string' }),
    defineField({ name: 'primary', title: 'Primary button', type: 'link' }),
    defineField({ name: 'secondary', title: 'Secondary button', type: 'link' }),
  ],
});

export const faq = defineType({
  name: 'faq',
  title: 'Question',
  type: 'object',
  fields: [
    defineField({ name: 'q', title: 'Question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'a', title: 'Answer', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'q', subtitle: 'a' } },
});

export const signpost = defineType({
  name: 'signpost',
  title: 'Situation → programme/service',
  type: 'object',
  fields: [
    defineField({ name: 'need', title: 'Visitor situation', type: 'string', validation: (r) => r.required(), description: 'e.g. "Preparing for JEE or NEET"' }),
    defineField({ name: 'slug', title: 'Page address of the programme/service it leads to', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'need', subtitle: 'slug' } },
});

/** A programme or service with its own page at /<division>/<slug>. */
export const service = defineType({
  name: 'service',
  title: 'Programme / service',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Page address',
      type: 'string',
      description: 'The last part of the page URL, e.g. competitive-exam-preparation. Lowercase letters, numbers and hyphens only. Changing it changes the URL.',
      validation: (r) => r.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { name: 'url segment' }),
    }),
    defineField({ name: 'promise', title: 'Hero line', type: 'string', description: 'One benefit-led sentence shown under the page title. The intro paragraph then opens the page body.' }),
    defineField({ name: 'text', title: 'Intro paragraph', type: 'text', rows: 4, validation: (r) => r.required(), description: 'Shown in the index row and as the first paragraph of the page.' }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      description: 'Three or four short phrases, shown as chips and in the "at a glance" list.',
    }),
    defineField({ name: 'whoFor', title: 'Who it is for', type: 'text', rows: 2 }),
    defineField({ name: 'details', title: 'More detail', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })], description: 'Further paragraphs for the page. Leave empty to hide the section.' }),
    defineField({ name: 'faqs', title: 'Questions and answers', type: 'array', of: [defineArrayMember({ type: 'faq' })], description: 'Shown on the page and sent to search engines as FAQ data. Keep answers to what the business actually offers.' }),
    defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Shown on the card in the index and in the footer. A photo around 1200 px wide works best.' }),
    defineField({
      name: 'heroImage',
      title: 'Hero background',
      type: 'picture',
      description: 'Full-width photo behind the top of the page. Landscape, around 3000 px wide, with the subject towards the right (the title sits on the left).',
    }),
    defineField({ name: 'seo', title: 'Search & social', type: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug', media: 'image' } },
});

/** Helpers used by the page schemas. */
export const paragraphs = (name = 'paragraphs', title = 'Paragraphs') =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'text', rows: 3 })] });

export const strings = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: 'array', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } });

export const items = (name: string, title: string) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'item' })] });

export const services = (name: string, title: string) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'service' })] });
