import CmsImage from '@/components/ui/CmsImage';
import Link from 'next/link';
import Monogram from '@/components/brand/Monogram';
import { Arrow } from '@/components/ui/Button';
import type { HomeContent } from '@/content/home';

const LABELS: Record<string, string> = { education: 'Education', marketing: 'Marketing' };

export default function Divisions({ content }: { content: HomeContent['divisions'] }) {
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
          {content.panels.map((p) => (
            <Link key={p.key} href={p.href} className={`division-panel is-${p.key}`} data-cursor aria-label={p.cta}>
              <div className="division-panel__media" data-reveal="mask">
                <CmsImage src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" className="division-panel__photo" />
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
