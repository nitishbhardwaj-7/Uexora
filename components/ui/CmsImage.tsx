'use client';

import Image, { type ImageProps } from 'next/image';
import { cmsImageLoader } from '@/lib/cms/imageLoader';

/**
 * next/image for photos that may come from Sanity. Server components cannot pass a
 * loader function to the client `Image`, so this small client wrapper attaches it.
 */
export default function CmsImage(props: Omit<ImageProps, 'loader'>) {
  return <Image {...props} loader={cmsImageLoader} />;
}
