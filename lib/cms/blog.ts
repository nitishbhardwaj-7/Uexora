import type { PortableTextBlock } from 'next-sanity';
import { client, imageUrl } from './client';

/**
 * Blog posts and categories. Unlike the page content, posts have no bundled
 * defaults: they exist only in Sanity, so with no project configured the blog is
 * simply empty and stays out of the navigation and sitemap.
 */

export type Picture = { src: string; alt: string; width?: number; height?: number };
export type Category = { title: string; slug: string; description?: string; count?: number };
export type PostSummary = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  cover?: Picture | null;
  categories: Category[];
  readingMinutes: number;
};
export type Post = PostSummary & {
  body: PortableTextBlock[];
  seo?: { title?: string; description?: string } | null;
  updatedAt?: string;
};

type RawImage = { asset?: { _ref?: string; url?: string; metadata?: { dimensions?: { width: number; height: number } } } | null; alt?: string; hotspot?: unknown; crop?: unknown };
type RawCategory = { title?: string; slug?: string; description?: string; count?: number };
type RawPost = Omit<Post, 'cover' | 'categories' | 'readingMinutes'> & { cover?: RawImage | null; categories?: (RawCategory | null)[] | null };

const fetchOpts: { next: { revalidate: number; tags: string[] } } = { next: { revalidate: 600, tags: ['sanity'] } };

/** Only posts that are published and whose date has passed. */
const LIVE = `_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()`;
const CATEGORY = `{ title, "slug": slug.current, description }`;
const SUMMARY = `{
  title, "slug": slug.current, excerpt, publishedAt, author,
  cover{ ..., asset->{ _id, url, metadata{ dimensions } } },
  "categories": categories[]->${CATEGORY},
  "words": length(pt::text(body))
}`;

const WORDS_PER_MINUTE = 220;

export const postPath = (slug: string) => `/blog/${slug}`;

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
}

function picture(img?: RawImage | null): Picture | null {
  if (!img?.asset) return null;
  const src = imageUrl(img as never);
  if (!src) return null;
  const d = img.asset.metadata?.dimensions;
  return { src, alt: img.alt || '', width: d?.width, height: d?.height };
}

function categories(list?: (RawCategory | null)[] | null): Category[] {
  return (list || []).filter((c): c is RawCategory => !!c && !!c.title && !!c.slug).map((c) => ({ title: c.title!, slug: c.slug!, description: c.description }));
}

function readingMinutes(chars: number | undefined): number {
  // pt::text gives characters; about 5.5 characters per English word on average.
  const words = (chars || 0) / 5.5;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function summary(raw: RawPost & { words?: number }): PostSummary {
  return {
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt,
    publishedAt: raw.publishedAt,
    author: raw.author || undefined,
    cover: picture(raw.cover),
    categories: categories(raw.categories),
    readingMinutes: readingMinutes(raw.words),
  };
}

async function safe<T>(label: string, fallback: T, run: () => Promise<T>): Promise<T> {
  if (!client) return fallback;
  try {
    return await run();
  } catch (err) {
    console.error(`[cms] Could not load ${label} from Sanity.`, err);
    return fallback;
  }
}

/** Every live post, newest first; optionally only those in one category. */
export const getPosts = (categorySlug?: string) =>
  safe<PostSummary[]>('posts', [], async () => {
    const filter = categorySlug ? ` && $category in categories[]->slug.current` : '';
    const rows = await client!.fetch<(RawPost & { words?: number })[]>(`*[${LIVE}${filter}] | order(publishedAt desc) ${SUMMARY}`, { category: categorySlug || '' }, fetchOpts);
    return rows.map(summary);
  });

export const getPostSlugs = () =>
  safe<string[]>('post slugs', [], async () => client!.fetch<string[]>(`*[${LIVE}].slug.current`, {}, fetchOpts));

export const getPost = (slug: string) =>
  safe<Post | null>(`post ${slug}`, null, async () => {
    const raw = await client!.fetch<(RawPost & { words?: number }) | null>(
      `*[${LIVE} && slug.current == $slug][0] {
        ...${SUMMARY},
        "updatedAt": _updatedAt,
        seo,
        body[]{ ..., _type == "figure" => { ..., asset->{ _id, url, metadata{ dimensions } } }, markDefs[]{ ... } }
      }`,
      { slug },
      fetchOpts
    );
    if (!raw) return null;
    return { ...summary(raw), body: raw.body || [], seo: raw.seo, updatedAt: raw.updatedAt };
  });

/** Categories that have at least one live post, with their counts. */
export const getCategories = () =>
  safe<Category[]>('categories', [], async () => {
    const rows = await client!.fetch<RawCategory[]>(
      `*[_type == "category" && defined(slug.current)] { title, "slug": slug.current, description, "count": count(*[${LIVE} && ^._id in categories[]._ref]) } | order(title asc)`,
      {},
      fetchOpts
    );
    return rows.filter((c) => c.title && c.slug && (c.count || 0) > 0).map((c) => ({ title: c.title!, slug: c.slug!, description: c.description, count: c.count }));
  });

/** True when the blog has anything to show; drives the navigation and sitemap. */
export const hasPosts = async () => (await getPostSlugs()).length > 0;
