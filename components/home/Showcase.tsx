import CmsImage from '@/components/ui/CmsImage';
import type { HomeContent } from '@/content/home';

/**
 * Full-bleed office image with the brand statement, carried over from the
 * original landing page (second fold).
 */
export default function Showcase({ content }: { content: HomeContent['showcase'] }) {
  return (
    <section className="showcase" data-tone="dark" aria-label="Our mission">
      <div className="showcase__bg" data-parallax="0.12" data-reveal="mask">
        <CmsImage src={content.image.src} alt={content.image.alt} fill sizes="100vw" quality={70} />
      </div>
      <div className="showcase__overlay" aria-hidden="true" />
      <div className="container showcase__inner">
        <p className="showcase__statement" data-type>
          {content.statement} <span className="gold">{content.highlight}</span>
        </p>
      </div>
    </section>
  );
}
