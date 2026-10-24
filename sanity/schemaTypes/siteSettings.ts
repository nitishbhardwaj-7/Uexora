import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact details', default: true },
    { name: 'brand', title: 'Brand text' },
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
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
