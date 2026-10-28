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

/** A how-we-work step: title, text and an optional photo shown above it. */
export const step = defineType({
  name: 'step',
  title: 'Step',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Landscape; shown at 4:3 above the step.' }),
  ],
  preview: { select: { title: 'title', subtitle: 'text', media: 'image' } },
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
      description: 'Three or four short phrases, shown as chips in the page hero.',
    }),
    defineField({ name: 'whoFor', title: 'Who it is for', type: 'text', rows: 2 }),
    defineField({ name: 'details', title: 'More detail', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })], description: 'Further paragraphs for the page. Leave empty to hide the section.' }),
    defineField({
      name: 'gradeSupport',
      title: 'Support by grade',
      type: 'object',
      description: 'Optional. Shown under the introduction as rising steps, one per school stage. Leave the stages empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Paragraph', type: 'text', rows: 3 }),
        defineField({
          name: 'stages',
          title: 'Stages',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'gradeStage',
              fields: [
                defineField({ name: 'grades', title: 'Grades', type: 'string', description: 'e.g. 1–5', validation: (r) => r.required() }),
                defineField({ name: 'title', title: 'Stage name', type: 'string', description: 'e.g. Primary years', validation: (r) => r.required() }),
                defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
              ],
              preview: { select: { title: 'title', subtitle: 'grades' }, prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `Grades ${subtitle}` : '' }) },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'offerings',
      title: 'What the programme includes',
      type: 'object',
      description: 'Optional. A numbered list shown after the curricula. A feature with options shows them as small tabs (e.g. 1:1, 1:6, 1:20).',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'offering',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
                defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Landscape, around 1600 px wide. Not shown for a feature with options (each option has its own).' }),
                defineField({
                  name: 'options',
                  title: 'Options (shown as tabs)',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      name: 'offeringOption',
                      fields: [
                        defineField({ name: 'ratio', title: 'Tab label', type: 'string', description: 'Short, e.g. 1:6', validation: (r) => r.required().max(10) }),
                        defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
                        defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
                        defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Landscape, around 1600 px wide.' }),
                      ],
                      preview: { select: { title: 'title', subtitle: 'tagline', media: 'image' } },
                    }),
                  ],
                }),
              ],
              preview: { select: { title: 'title', subtitle: 'text', media: 'image' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'curricula',
      title: 'Curricula',
      type: 'object',
      description: 'Optional. The school curricula this supports, shown as a row of marks. Leave the boards empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Paragraph', type: 'text', rows: 3 }),
        defineField({
          name: 'boards',
          title: 'Curricula',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'curriculum',
              fields: [
                defineField({ name: 'short', title: 'Short name', type: 'string', description: 'Shown large in the mark, e.g. CBSE', validation: (r) => r.required().max(12) }),
                defineField({ name: 'name', title: 'Full name', type: 'string' }),
                defineField({
                  name: 'logo',
                  title: 'Logo (optional)',
                  type: 'picture',
                  description:
                    'Only upload an official logo you have permission to use; some boards (e.g. IB, Cambridge) restrict their logos to authorised schools and centres. Without a logo, the short name is shown.',
                }),
              ],
              preview: { select: { title: 'short', subtitle: 'name', media: 'logo' } },
            }),
          ],
        }),
      ],
    }),
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
