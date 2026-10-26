import Link from 'next/link';
import PanelSlideshow from '@/components/home/PanelSlideshow';
import Monogram from '@/components/brand/Monogram';
import { Arrow } from '@/components/ui/Button';
import type { HomeContent } from '@/content/home';

const LABELS: Record<string, string> = { education: 'Education', marketing: 'Marketing' };

/** `photos` per division key: extra photos that follow the panel's own in its slideshow. */
export default function Divisions({ content, photos = {} }: { content: HomeContent['divisions']; photos?: Record<string, { src: string; alt: string }[]> }) {
  return (
    <section className="section divisions" data-tone="light" id="divisions" aria-labelledby="divisions-title">
      <div className="container">
        <div className="divisions__head">
          <h2 id="divisions-title" className="h2" data-split>
            {content.heading}
          </h2>
          <p data-reveal>{content.intro}</p>
        </div>

        <div className="divisions__grid" data-reveal-group data-stagger="0.15">
          {content.panels.map((p, i) => (
            <Link key={p.key} href={p.href} className={`division-panel is-${p.key}`} data-cursor aria-label={p.cta}>
              <div className="division-panel__media" data-reveal="mask">
                {/* The panel's own photo first, then its division's programme or service photos;
                    the second panel runs a second behind so the two alternate. */}
                <PanelSlideshow photos={[p.image, ...(photos[p.key] || []).filter((x) => x.src !== p.image.src)]} offset={i * 1000} />
                {/* Division name top left, the monogram top right, on one centre line */}
                <div className="division-panel__top">
                  <span className="division-panel__label">
                    <span className="division-panel__name">{LABELS[p.key] ?? p.key}</span>
                  </span>
                  <Monogram className="division-panel__mark" />
                </div>
              </div>
              <div className="division-panel__body">
                <h3 className="h2">
                  {p.title.map((line) => (
                    <span key={line} style={{ display: 'block' }}>
                      {line}
                    </span>
                  ))}
                </h3>
                <p>{p.text}</p>
                <span className="link-arrow">
                  <span>{p.cta}</span>
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
