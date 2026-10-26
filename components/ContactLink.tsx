'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { contactHref } from '@/lib/cms/services';

/** A link to /contact that opens the form for the division of the page it is on. */
export default function ContactLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <Link href={contactHref(usePathname())} className={className}>
      {children}
    </Link>
  );
}
