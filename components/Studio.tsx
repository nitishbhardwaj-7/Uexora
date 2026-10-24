'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

/** Client boundary for the embedded studio: the Sanity packages only load in the browser graph. */
export default function Studio() {
  return <NextStudio config={config} />;
}
