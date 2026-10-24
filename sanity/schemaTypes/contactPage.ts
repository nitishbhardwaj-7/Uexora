import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Headline', type: 'string' }),
    defineField({ name: 'lead', title: 'Lead paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'formHeading', title: 'Form heading', type: 'string' }),
    defineField({ name: 'formNote', title: 'Note under the form', type: 'string' }),
    defineField({ name: 'seo', title: 'Search & social', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
});
