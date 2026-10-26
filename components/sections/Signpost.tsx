import Link from 'next/link';
import CmsImage from '@/components/ui/CmsImage';
import { Arrow } from '@/components/ui/Button';
import type { Service } from '@/content/types';
import { servicePath, type Division } from '@/lib/cms/services';

type Row = { need: string; slug: string };

type Props = {
  id: string;
  division: Division;
  heading: string;
  intro?: string;
  rows: Row[];
  services: Service[];
  tone?: 'light' | 'dark';
};

/**
 * "Start from the goal": each row pairs a visitor's situation with the programme or
 * service that answers it, led by a small photo of that destination. Rows are links;
 * hovering reveals the destination's name sliding in from the right.
 */
export default function Signpost({ id, division, heading, intro, rows, services, tone = 'light' }: Props) {
  const byslug = new Map(services.map((s) => [s.slug, s]));
  const list = rows.map((r) => ({ ...r, service: byslug.get(r.slug) })).filter((r) => r.service);
  if (!list.length) return null;
  return (
    <section id={id} className="section" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="two-up" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2 id={`${id}-title`} className="h2" data-split>
              {heading}
            </h2>
          </div>
          {intro ? (
            <p className="lead" data-reveal style={{ alignSelf: 'end' }}>
              {intro}
            </p>
          ) : null}
        </div>
        <ol className="signpost" data-reveal-group data-stagger="0.06">
          {list.map((r) => {
            // the destination's own photo: its hero photo, or its card photo if it has none
            const photo = r.service!.heroImage || r.service!.image;
            return (
              <li key={r.slug} className="signpost__row">
                <Link href={servicePath(division, r.slug)} className="signpost__link" data-cursor>
                  <span className="signpost__thumb" aria-hidden="true">
                    {photo ? <CmsImage src={photo.src} alt="" fill sizes="(max-width: 760px) 84px, 140px" quality={75} /> : null}
                  </span>
                  <span className="signpost__need">{r.need}</span>
                  <span className="signpost__to">
                    <span className="signpost__name">{r.service!.title}</span>
                    <span className="signpost__arrow" aria-hidden="true">
                      <Arrow />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
