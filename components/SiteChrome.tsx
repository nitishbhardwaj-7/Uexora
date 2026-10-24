import { getSettings } from '@/lib/cms';
import { hasPosts } from '@/lib/cms/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import Enhancements from '@/components/Enhancements';
import PageTransition from '@/components/PageTransition';

/**
 * Everything around a page: intro loader, header, footer and the scroll enhancements.
 * Used by the site layout and by the 404 page (which lives outside that layout).
 */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [s, blog] = await Promise.all([getSettings(), hasPosts()]);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Preloader />
      <Header email={s.email} tagline={s.tagline} showBlog={blog} />
      <main id="main">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer showBlog={blog} />
      <Enhancements />
    </>
  );
}
