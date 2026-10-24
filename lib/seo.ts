import type { Metadata } from 'next';
import { site } from '@/lib/site';

/** The default social-share image (app/opengraph-image.png), 1200×630. */
export const defaultShareImage = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: 'UEXORA logo on a deep navy background: the U monogram beside the UEXORA wordmark.',
};

type PageMeta = {
  /** Full title as it should appear in the tab (no template applied). */
  title: string;
  /** 110–160 characters. */
  description: string;
  /** Path from the site root, e.g. "/education/competitive-exam-preparation". */
  path: string;
  /** Page-specific share image; falls back to the brand image. */
  image?: { url: string; alt: string; width?: number; height?: number } | null;
  /** Articles carry their dates and author in Open Graph. */
  article?: { publishedTime: string; modifiedTime?: string; authors?: string[] };
  /** Keep the page out of search results (e.g. the empty blog index). */
  noindex?: boolean;
};

/**
 * Complete metadata for a page: title, description, canonical, Open Graph and
 * Twitter card, always with a share image. Pages that define their own `openGraph`
 * replace the layout's, so every page goes through this helper to keep them whole.
 */
export function pageMetadata({ title, description, path, image, article, noindex }: PageMeta): Metadata {
  const img = image || defaultShareImage;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      ...(article ? { type: 'article', publishedTime: article.publishedTime, modifiedTime: article.modifiedTime, authors: article.authors } : { type: 'website' }),
      siteName: site.name,
      locale: 'en_GB',
      url: path,
      title,
      description,
      images: [img],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: img.url, alt: img.alt }],
    },
  };
}
