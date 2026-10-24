'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Monogram from '@/components/brand/Monogram';
import { Arrow } from '@/components/ui/Button';
import type { Service } from '@/content/types';
import { servicePath, type Division } from '@/lib/cms/services';
import { cmsImageLoader } from '@/lib/cms/imageLoader';

type Props = {
  division: Division;
  items: Service[];
  /** Numbering follows the position in this list (so "other programmes" keep their original numbers). */
  all: Service[];
  /** List only, no sticky photo frame (used on service pages). */
  compact?: boolean;
};

/**
 * Numbered rows, each a link to the service's page, beside one sticky photo frame.
 * The frame crossfades to the row under the pointer, or, while scrolling without a
 * pointer, to the row crossing the middle of the viewport.
 */
export default function ServiceIndexList({ division, items, all, compact }: Props) {
  const [active, setActive] = useState(0);
  const hovering = useRef(false);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (compact) return;
    const els = rows.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (hovering.current) return;
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(Number((hit.target as HTMLElement).dataset.index));
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [compact, items.length]);

  const unit = division === 'education' ? 'programme' : 'service';

  return (
    <div className={['pindex', compact ? 'pindex--compact' : ''].filter(Boolean).join(' ')}>
      <ol
        className="pindex__list"
        data-reveal-group
        data-stagger="0.08"
        onMouseLeave={() => {
          hovering.current = false;
        }}
      >
        {items.map((s, i) => {
          const n = String(all.indexOf(s) + 1).padStart(2, '0');
          return (
            <li
              key={s.slug}
              data-index={i}
              ref={(el) => {
                rows.current[i] = el;
              }}
              className={['pindex__row', i === active ? 'is-active' : ''].filter(Boolean).join(' ')}
              onMouseEnter={() => {
                hovering.current = true;
                setActive(i);
              }}
              onFocus={() => setActive(i)}
            >
              <Link href={servicePath(division, s.slug)} className="pindex__link" data-cursor aria-label={`${s.title}: explore this ${unit}`}>
                <span className="pindex__num" aria-hidden="true">
                  {n}
                </span>
                <span className="pindex__body">
                  <span className="pindex__title h3">{s.title}</span>
                  <span className="pindex__text">{s.text}</span>
                </span>
                <span className="pindex__thumb" aria-hidden="true">
                  {s.image ? (
                    <Image src={s.image.src} alt="" fill sizes="96px" loader={cmsImageLoader} />
                  ) : (
                    <span className="pindex__ph">
                      <Monogram variant="mono" />
                    </span>
                  )}
                </span>
                <span className="pindex__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {!compact ? (
        <div className="pindex__media" aria-hidden="true" data-reveal data-reveal-delay="0.2">
          <div className="pindex__frame">
            {items.map((s, i) => (
              <div key={s.slug} className={['pindex__slide', i === active ? 'is-active' : ''].filter(Boolean).join(' ')}>
                {s.image ? (
                  <Image src={s.image.src} alt="" fill sizes="(max-width: 900px) 0px, 80vw" quality={82} priority={i === 0} loader={cmsImageLoader} />
                ) : (
                  <span className="pindex__ph pindex__ph--large">
                    <Monogram variant="mono" />
                  </span>
                )}
              </div>
            ))}
            <div className="pindex__caption">
              <span className="pindex__caption-num">{String(all.indexOf(items[active]) + 1).padStart(2, '0')}</span>
              <span className="pindex__caption-title">{items[active]?.title}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
