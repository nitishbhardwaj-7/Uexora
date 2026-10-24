import type { ImageLoaderProps } from 'next/image';

/**
 * next/image loader for photos that may come from Sanity. Sanity's CDN resizes and
 * converts them itself (w, q, auto=format), so the Next optimizer never has to proxy a
 * remote host. Local files in /public keep going through the Next optimizer.
 */
export function cmsImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith('https://cdn.sanity.io/')) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 80));
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'max');
    return url.toString();
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}
