import { client } from './client';
import { overlay } from './merge';
import { home, type HomeContent } from '@/content/home';
import { education, type EducationContent } from '@/content/education';
import { marketing, type MarketingContent } from '@/content/marketing';
import { contact, type ContactContent } from '@/content/contact';
import { blog, type BlogContent } from '@/content/blog';
import { settings, type SettingsContent } from '@/content/settings';
import type { Service } from '@/content/types';

export type { HomeContent, EducationContent, MarketingContent, ContactContent, SettingsContent, BlogContent };

/**
 * Content access for the site. Each getter returns the default content from content/
 * laid under whatever has been published in Sanity, so the site renders in full with
 * or without a Sanity project configured.
 *
 * Pages are prerendered; a publish in the studio calls app/api/revalidate, which
 * re-renders them, and they also refresh on their own every 10 minutes (see app/(site)/layout.tsx).
 */
async function fetchSingleton<T>(type: string, defaults: T): Promise<T> {
  if (!client) return defaults;
  try {
    // Cached for at most 10 minutes and tagged, so a publish (app/api/revalidate) or a
    // rebuild never serves a stale document from Next's persistent fetch cache.
    const doc = await client.fetch(`*[_type == $type && _id == $type][0]`, { type }, { next: { revalidate: 600, tags: ['sanity'] } });
    return overlay(defaults, doc);
  } catch (err) {
    // Never take the site down over a content fetch: fall back to the bundled copy.
    console.error(`[cms] Could not load ${type} from Sanity; using default content.`, err);
    return defaults;
  }
}

/**
 * The programme or service pages of a division, each its own document. Each is laid over the
 * default with the same page address. With no documents published, the list stays as it was.
 */
async function fetchServicePages(type: string, current: Service[], defaults: Service[]): Promise<Service[]> {
  if (!client) return current;
  try {
    const docs = await client.fetch<(Partial<Service> & { slug?: string })[]>(`*[_type == $type && defined(slug)] | order(coalesce(order, 9999) asc, title asc)`, { type }, { next: { revalidate: 600, tags: ['sanity'] } });
    if (!docs.length) return current;
    return docs.map((doc) => overlay((defaults.find((d) => d.slug === doc.slug) || {}) as Service, doc));
  } catch (err) {
    console.error(`[cms] Could not load ${type} pages from Sanity; using the page's own list.`, err);
    return current;
  }
}

export const getSettings = () => fetchSingleton('siteSettings', settings);
export const getHome = () => fetchSingleton('homePage', home);
export const getEducation = async () => {
  const page = await fetchSingleton('educationPage', education);
  return { ...page, programmes: await fetchServicePages('programme', page.programmes, education.programmes) };
};
export const getMarketing = async () => {
  const page = await fetchSingleton('marketingPage', marketing);
  return { ...page, services: await fetchServicePages('marketingService', page.services, marketing.services) };
};
export const getContact = () => fetchSingleton('contactPage', contact);
export const getBlog = () => fetchSingleton('blogPage', blog);
