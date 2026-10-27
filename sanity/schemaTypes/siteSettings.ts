import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact details', default: true },
    { name: 'brand', title: 'Brand text' },
    { name: 'announcement', title: 'Announcement bar' },
  ],
  fields: [
    defineField({ name: 'email', title: 'General email', type: 'string', group: 'contact', validation: (r) => r.required().email() }),
    defineField({ name: 'educationEmail', title: 'Uexora Education email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'marketingEmail', title: 'Uexora Marketing Studio email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'hours', title: 'Opening hours', type: 'string', group: 'contact' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'brand' }),
    defineField({
      name: 'description',
      title: 'Site description',
      type: 'text',
      rows: 3,
      group: 'brand',
      description: 'Default description for search engines and social previews.',
    }),
    defineField({ name: 'footerStatement', title: 'Footer statement', type: 'string', group: 'brand' }),
    defineField({ name: 'footerStatementStrong', title: 'Footer statement (highlighted part)', type: 'string', group: 'brand' }),
    defineField({
      name: 'announcementOn',
      title: 'Show the announcement bar',
      type: 'boolean',
      group: 'announcement',
      initialValue: true,
      description: 'The scrolling strip under the navigation on every page. Switch off to hide it.',
    }),
    defineField({
      name: 'announcements',
      title: 'Announcements',
      type: 'array',
      group: 'announcement',
      description: 'Shown in this order, scrolling continuously. Keep each one short.',
      hidden: ({ parent }) => parent?.announcementOn === false,
      of: [
        {
          type: 'object',
          name: 'announcement',
          fields: [
            defineField({ name: 'text', title: 'Text', type: 'string', validation: (r) => r.required().max(90) }),
            defineField({
              name: 'href',
              title: 'Link (optional)',
              type: 'string',
              description: 'A page on this site, e.g. /education or /contact, or a full web address.',
            }),
          ],
          preview: { select: { title: 'text', subtitle: 'href' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
