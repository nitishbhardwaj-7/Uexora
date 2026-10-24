import Studio from '@/components/Studio';
import { sanityEnabled } from '@/sanity/env';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

/** The content admin, embedded at /studio. Sign-in and access control are handled by Sanity. */
export default function StudioPage() {
  if (!sanityEnabled) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: '3rem', maxWidth: '40rem', lineHeight: 1.5 }}>
        <h1 style={{ fontSize: '1.4rem' }}>The studio is not configured yet</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> in <code>.env.local</code>, then restart the
          server. See the &ldquo;Content editing&rdquo; section of the README.
        </p>
      </main>
    );
  }
  return <Studio />;
}
