import { ctaBand, ctaCard, faq, item, link, picture, seo, service, signpost, step } from './objects';
import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { educationPage } from './educationPage';
import { marketingPage } from './marketingPage';
import { contactPage } from './contactPage';
import { blogPage, category, post } from './blog';
import { enquiry } from './enquiry';

export const schemaTypes = [link, item, step, picture, seo, faq, signpost, service, ctaCard, ctaBand, siteSettings, homePage, educationPage, marketingPage, contactPage, blogPage, category, post, enquiry];

/** One document each; created by the seed script and edited in place. */
export const singletons = [
  { type: 'siteSettings', title: 'Site settings' },
  { type: 'homePage', title: 'Home page' },
  { type: 'educationPage', title: 'Education page' },
  { type: 'marketingPage', title: 'Marketing page' },
  { type: 'contactPage', title: 'Contact page' },
  { type: 'blogPage', title: 'Blog page' },
] as const;

export const singletonTypes = new Set<string>(singletons.map((s) => s.type));
