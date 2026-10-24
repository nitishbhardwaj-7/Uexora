import SiteChrome from '@/components/SiteChrome';

/** Content edited in the studio also reaches the site within this many seconds if the publish webhook is not set up. */
export const revalidate = 600;

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteChrome>{children}</SiteChrome>;
}
