import { defineArrayMember, defineField, defineType } from 'sanity';

/** A topic a post belongs to; posts can carry several. Shown as filters on /blog. */
export const category = defineType({
  name: 'category',
  title: 'Blog category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Address',
      type: 'slug',
      options: { source: 'title', maxLength: 60 },
      description: 'Used in the filter link on the blog page, e.g. /blog?category=exam-preparation.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, description: 'Optional, one sentence.' }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});

/** A blog post. Appears on the site once it is published and its date has passed. */
export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Details' },
    { name: 'seo', title: 'Search & social' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (r) => r.required().max(110) }),
    defineField({
      name: 'slug',
      title: 'Page address',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 80 },
      description: 'The last part of the URL: /blog/<address>. Lowercase letters, numbers and hyphens. Changing it changes the URL.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'One or two sentences. Shown on the blog page, under the title, and as the search description unless the SEO description is set.',
      validation: (r) => r.required().max(240),
    }),
    defineField({ name: 'cover', title: 'Cover image', type: 'picture', group: 'content', description: 'Landscape works best (about 16:9). Always add alternative text.' }),
    defineField({
      name: 'body',
      title: 'Article',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullets', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', title: 'Link to', type: 'url', validation: (r) => r.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          name: 'figure',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alternative text', type: 'string', description: 'Describes the image for screen readers and search engines.', validation: (r) => r.required() }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      group: 'meta',
      description: 'The post appears on the site once this date has passed. Set a future date to schedule it.',
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({ name: 'author', title: 'Author', type: 'string', group: 'meta', description: 'Shown under the article. Leave empty to show the brand name.' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'meta',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
      validation: (r) => r.max(3),
    }),
    defineField({ name: 'seo', title: 'Search & social', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'publishedAt', media: 'cover' },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No date',
      media,
    }),
  },
});

/** The blog index page's own copy. */
export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Headline', type: 'string' }),
    defineField({ name: 'lead', title: 'Lead paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'emptyTitle', title: 'Heading when there are no posts yet', type: 'string' }),
    defineField({ name: 'emptyText', title: 'Text when there are no posts yet', type: 'text', rows: 2 }),
    defineField({ name: 'moreHeading', title: 'Heading above related posts', type: 'string' }),
    defineField({ name: 'seo', title: 'Search & social', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Blog page' }) },
});
