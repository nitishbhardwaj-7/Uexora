import { defineArrayMember, defineField, defineType } from 'sanity';

/** Reusable building blocks. Field names mirror the default content in content/. */

/** Every line icon the pages can draw (components/sections/ApproachIcon.tsx). */
export const iconOptions = [
  { title: 'Questions (speech bubbles)', value: 'questions' },
  { title: 'Speech bubble', value: 'speech' },
  { title: 'Microphone', value: 'mic' },
  { title: 'Megaphone', value: 'megaphone' },
  { title: 'Lightbulb', value: 'bulb' },
  { title: 'Magnifier', value: 'search' },
  { title: 'Target', value: 'target' },
  { title: 'Chart', value: 'chart' },
  { title: 'Compass', value: 'compass' },
  { title: 'Sliders', value: 'sliders' },
  { title: 'Stacked layers', value: 'layers' },
  { title: 'Focus', value: 'focus' },
  { title: 'Clock', value: 'routine' },
  { title: 'Code', value: 'code' },
  { title: 'Laptop and phone', value: 'device' },
  { title: 'Shopfront', value: 'shop' },
  { title: 'Robot', value: 'robot' },
  { title: 'Globe', value: 'globe' },
  { title: 'Open book', value: 'book' },
  { title: 'Puzzle piece', value: 'puzzle' },
  { title: 'Person', value: 'person' },
  { title: 'Team', value: 'team' },
  { title: 'Parent and child', value: 'family' },
  { title: 'Briefcase', value: 'career' },
  { title: 'Heart', value: 'heart' },
  { title: 'Sprout', value: 'sprout' },
  { title: 'Infinity', value: 'infinity' },
];

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

/** The fields of a programme or service page at /<division>/<slug>; the documents are in servicePages.ts. */
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
    defineField({ name: 'tracksHeading', title: 'Exam picker heading', type: 'string', description: 'Only used when the programme has exam tracks, e.g. Choose your exam.' }),
    defineField({ name: 'tracksText', title: 'Exam picker intro', type: 'text', rows: 2 }),
    defineField({
      name: 'tracks',
      title: 'Exam tracks',
      type: 'array',
      description:
        'Optional. Each exam (e.g. NEET, JEE Main) gets a card in the picker near the top of the page and its own section. When set, these replace the division approach on this page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'examTrack',
          fields: [
            defineField({
              name: 'slug',
              title: 'Page anchor',
              type: 'string',
              description: 'Lowercase letters and hyphens, e.g. jee-main. The section is reached at #jee-main.',
              validation: (r) => r.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { name: 'anchor' }),
            }),
            defineField({ name: 'name', title: 'Short name', type: 'string', description: 'For the picker and the exam bar, e.g. JEE Main.', validation: (r) => r.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
            defineField({ name: 'intro', title: 'Intro paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 3 })] }),
            defineField({ name: 'tags', title: 'Tags (optional)', type: 'array', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } }),
            defineField({ name: 'image', title: 'Opening photo', type: 'picture', description: 'Wide, around 2400 px, with the subject to the right.' }),
            defineField({ name: 'cardImage', title: 'Picker card photo (optional)', type: 'picture', description: 'Upright photo for the card; the opening photo is used when empty.' }),
            defineField({
              name: 'journey',
              title: 'Learning journey',
              type: 'object',
              fields: [
                defineField({ name: 'heading', title: 'Heading', type: 'string' }),
                defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 3 })] }),
                defineField({ name: 'pull', title: 'Pull line (optional)', type: 'text', rows: 2 }),
                defineField({ name: 'image', title: 'Photo', type: 'picture' }),
              ],
            }),
            defineField({
              name: 'why',
              title: 'Why choose us (no longer shown)',
              type: 'object',
              // Replaced by the page-wide "Exam: why choose us" below; hidden so old entries stay but aren't edited.
              hidden: true,
              fields: [
                defineField({ name: 'heading', title: 'Heading', type: 'string' }),
                defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
                defineField({
                  name: 'whyList',
                  title: 'Reasons',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      name: 'examWhy',
                      fields: [
                        defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                        defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'closing',
              title: 'Closing',
              type: 'object',
              fields: [
                defineField({ name: 'heading', title: 'Heading', type: 'string' }),
                defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 2 })] }),
                defineField({ name: 'primary', title: 'Main button', type: 'link' }),
                defineField({ name: 'secondary', title: 'Second link (optional)', type: 'link' }),
              ],
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'tagline', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'examBatches',
      title: 'Exam batches',
      type: 'object',
      description: 'With exam tracks: the batch formats, shown once after the exams.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 2 }),
        defineField({
          name: 'batchRows',
          title: 'Batches',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'sharedBatch',
              fields: [
                defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g. 01' }),
                defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'ratio', title: 'Batch size', type: 'string', description: 'e.g. 1:6' }),
                defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
                defineField({ name: 'text', title: 'Description', type: 'text', rows: 2 }),
                defineField({ name: 'points', title: 'Points', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
                defineField({ name: 'bestFor', title: 'Best for (optional)', type: 'string' }),
                defineField({ name: 'image', title: 'Photo', type: 'picture' }),
              ],
              preview: { select: { title: 'name', subtitle: 'ratio', media: 'image' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'examApproach',
      title: 'Exam approach',
      type: 'object',
      description: 'With exam tracks: how students are prepared, shown once after the batches.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 3 }),
        defineField({
          name: 'approachSteps',
          title: 'Steps',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'sharedStep',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
              ],
            }),
          ],
        }),
        defineField({ name: 'image', title: 'Photo', type: 'picture' }),
      ],
    }),
    defineField({
      name: 'approachPoints',
      title: 'Approach points for this page (optional)',
      type: 'array',
      description: 'Replaces the shared approach points (Education or Marketing page) on this page only. Leave empty to show the shared ones.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pageApproachPoint',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'subtitle', title: 'Subtitle (optional)', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
            defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: iconOptions } }),
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        }),
      ],
    }),
    defineField({
      name: 'examWhy',
      title: 'Exam: why choose us',
      type: 'object',
      description: 'With exam tracks: why choose us, shown once at the end of the page, after the approach.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
        defineField({
          name: 'whyList',
          title: 'Reasons',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'sharedWhy',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({ name: 'heroTitle', title: 'Title as shown in the hero (optional)', type: 'text', rows: 4, description: 'Put each line of the hero title on its own line here. Leave empty to use the title as it is.' }),
    defineField({ name: 'overviewHeading', title: 'Overview heading (optional)', type: 'string', description: 'Replaces the standard heading above the opening photo and text.' }),
    defineField({
      name: 'pillars',
      title: 'Learning pillars',
      type: 'object',
      description: 'Optional. What the programme teaches, grouped: an animated icon, a title and a list for each. Six or eight fill two rows. Leave the pillars empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 2 }),
        defineField({
          name: 'pillarItems',
          title: 'Pillars',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'pillarItem',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: { list: iconOptions },
                }),
                defineField({ name: 'points', title: 'Points', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
              ],
              preview: { select: { title: 'title' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'platforms',
      title: 'Platforms',
      type: 'object',
      description: 'Optional. A list beside a photo that changes with the scroll: where students perform, or training areas with their topics. Leave the list empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 2 }),
        defineField({
          name: 'platformItems',
          title: 'Platforms',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'platformItem',
              fields: [
                defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'text', title: 'Description', type: 'text', rows: 2 }),
                defineField({ name: 'points', title: 'Topics', type: 'array', description: 'Optional. With topics, the row is numbered and lists them in two columns.', of: [defineArrayMember({ type: 'string' })] }),
                defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Cropped upright beside the list on large screens, wide on phones; keep the subject central.' }),
              ],
              preview: { select: { title: 'name', subtitle: 'text', media: 'image' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'serves',
      title: 'Who it can serve',
      type: 'object',
      description: 'Optional. Centred rows of four under the opening photo and text, each with an animated icon. Leave the list empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'serveGroups',
          title: 'Groups',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'serveGroup',
              fields: [
                defineField({ name: 'text', title: 'Text', type: 'string', validation: (r) => r.required() }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: { list: iconOptions },
                }),
              ],
              preview: { select: { title: 'text' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'workshops',
      title: 'Workshops',
      type: 'object',
      description: 'Optional. A numbered list beside a photo, shown after the course slider. Leave the list empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 2 }),
        defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Landscape; shown at 4:3.' }),
        defineField({ name: 'workshopItems', title: 'Workshops', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
      ],
    }),
    defineField({
      name: 'closing',
      title: 'Closing statement',
      type: 'object',
      description: 'Optional. A centred heading and paragraph after the programme\'s own sections. Leave the heading empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
        defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Optional. Wide; shown full width behind the text, darkened so it reads.' }),
      ],
    }),
    defineField({
      name: 'journey',
      title: 'Learning journey',
      type: 'object',
      description: 'Optional. The stages of the programme (e.g. Discover, Learn, Apply, Grow) as numbered steps on a line, shown after the introduction. Leave the stages empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 2 }),
        defineField({
          name: 'journeySteps',
          title: 'Stages',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'journeyStep',
              fields: [
                defineField({ name: 'label', title: 'Stage word', type: 'string', description: 'One word above the heading, e.g. Discover' }),
                defineField({ name: 'title', title: 'Heading', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'text', title: 'Description', type: 'text', rows: 3 }),
              ],
              preview: { select: { title: 'title', subtitle: 'label' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'courses',
      title: 'Course slider',
      type: 'object',
      description: 'Optional. The courses within this programme as a slider of large photo cards, shown before the approach. Leave the slides empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 2 }),
        defineField({
          name: 'courseSlides',
          title: 'Slides',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'courseSlide',
              fields: [
                defineField({ name: 'title', title: 'Heading', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'audience', title: 'Who it is for', type: 'string', description: 'e.g. Grade 1 to Grade 6' }),
                defineField({ name: 'text', title: 'Description', type: 'text', rows: 3, description: 'Two or three lines; it sits over the photo.' }),
                defineField({ name: 'image', title: 'Photo', type: 'picture', description: 'Landscape, around 2000 px wide. The text sits over the lower left, so keep the subject clear of that corner.' }),
              ],
              preview: { select: { title: 'title', subtitle: 'audience', media: 'image' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'tools',
      title: 'Tool cards',
      type: 'object',
      description: 'Optional. Logo cards of the tools students work with (e.g. ChatGPT), shown after the course slider. Leave the cards empty to hide it.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 2 }),
        defineField({ name: 'note', title: 'Note under the cards', type: 'string', description: 'e.g. Product names and logos are trademarks of their respective owners.' }),
        defineField({
          name: 'toolCards',
          title: 'Cards',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'toolCard',
              fields: [
                defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'text', title: 'One line', type: 'string', description: 'e.g. Research and source discovery' }),
                defineField({ name: 'logo', title: 'Logo', type: 'picture', description: "The tool's own logo, ideally an SVG or a square PNG on a transparent background." }),
              ],
              preview: { select: { title: 'name', subtitle: 'text', media: 'logo' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'comparison',
      title: 'Comparison',
      type: 'object',
      description: 'Optional. A side-by-side table shown before the questions. Leave the rows empty to hide it. Keep claims to what the business actually offers.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Intro', type: 'text', rows: 2 }),
        defineField({ name: 'them', title: 'Left column name', type: 'string', description: 'e.g. Teacher next door' }),
        defineField({ name: 'us', title: 'Right column name', type: 'string', description: 'e.g. UEXORA' }),
        defineField({
          name: 'lines',
          title: 'Rows',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'comparisonRow',
              fields: [
                defineField({ name: 'label', title: 'What is compared', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'them', title: 'Left column', type: 'string' }),
                defineField({ name: 'us', title: 'Right column', type: 'string' }),
              ],
              preview: { select: { title: 'label', subtitle: 'us' } },
            }),
          ],
        }),
      ],
    }),
    defineField({ name: 'faqHeading', title: 'Questions heading', type: 'string', description: 'Heading above the questions, e.g. Common Questions From Parents. Leave empty for "Common questions".' }),
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
