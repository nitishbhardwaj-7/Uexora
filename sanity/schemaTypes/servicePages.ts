import { defineField, defineType } from 'sanity';
import { service } from './objects';

/** The tabs of a programme or service page in the studio, so its long form stays easy to find your way around. */
const groups = [
  { name: 'basics', title: 'Title and intro', default: true },
  { name: 'sections', title: 'Page sections' },
  { name: 'questions', title: 'Questions' },
  { name: 'photos', title: 'Photos' },
  { name: 'seo', title: 'Search & social' },
];

const groupOf: Record<string, string> = {
  title: 'basics',
  slug: 'basics',
  order: 'basics',
  heroTitle: 'basics',
  promise: 'basics',
  text: 'basics',
  highlights: 'basics',
  overviewHeading: 'basics',
  whoFor: 'basics',
  details: 'basics',
  faqHeading: 'questions',
  faqs: 'questions',
  image: 'photos',
  heroImage: 'photos',
  seo: 'seo',
};

const order = defineField({
  name: 'order',
  title: 'Position in lists',
  type: 'number',
  description: 'Where this page sits in the lists on the site and in the footer: lower numbers come first.',
});

const [title, slug, ...rest] = service.fields as { name: string }[];
const fields = [title, slug, order, ...rest].map((f) => ({ ...f, group: groupOf[f.name] || 'sections' }));

const servicePage = (name: string, pageTitle: string) =>
  defineType({
    name,
    title: pageTitle,
    type: 'document',
    groups,
    fields: fields as never,
    orderings: [{ title: 'Position in lists', name: 'position', by: [{ field: 'order', direction: 'asc' }] }],
    preview: { select: { title: 'title', subtitle: 'slug', media: 'image' } },
  });

/** Each programme and service page is its own document, listed in the studio sidebar. */
export const programme = servicePage('programme', 'Education programme');
export const marketingService = servicePage('marketingService', 'Marketing service');
