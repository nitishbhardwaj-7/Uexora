import { createClient } from 'next-sanity';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { apiVersion, dataset, projectId, sanityEnabled } from '@/sanity/env';

/**
 * Read client for the site. Pages are rendered on the server and revalidated when
 * content is published (see app/api/revalidate), so the API is read directly rather
 * than through the CDN to avoid serving a just-replaced version.
 */
export const client = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;

const builder = sanityEnabled ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * URL of an uploaded image at its original size; next/image resizes and converts it per
 * device. No query string: the optimizer only accepts remote URLs that match the allowed
 * pattern exactly, and format negotiation is its job anyway.
 */
export function imageUrl(source: SanityImageSource): string | null {
  if (!builder) return null;
  try {
    return builder.image(source).url();
  } catch {
    return null;
  }
}
