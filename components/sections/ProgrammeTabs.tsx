'use client';

import { useRef, useState } from 'react';
import CmsImage from '@/components/ui/CmsImage';

type Option = { ratio: string; title: string; tagline: string; text: string; image?: { src: string; alt: string } };

/**
 * Small tabs for the options of one programme feature (e.g. 1:1, 1:6, 1:20). Every panel is
 * rendered, so all the text is in the page; only the chosen one is shown. Arrow keys, Home and
 * End move between tabs, as in any tab list.
 */
export default function ProgrammeTabs({ options, idBase, label }: { options: Option[]; idBase: string; label: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const n = (i + options.length) % options.length;
    setActive(n);
    tabs.current[n]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: options.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      go(keys[e.key]);
    }
  };

  return (
    <div className="ptabs">
      <div className="ptabs__list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {options.map((o, i) => (
          <button
            key={o.ratio + i}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${idBase}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={['ptabs__tab', i === active ? 'is-active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActive(i)}
          >
            {o.ratio}
          </button>
        ))}
      </div>
      <div className="ptabs__panels">
        {options.map((o, i) => (
          <div
            key={o.ratio + i}
            role="tabpanel"
            id={`${idBase}-panel-${i}`}
            aria-labelledby={`${idBase}-tab-${i}`}
            className={['ptabs__panel', i === active ? 'is-active' : ''].filter(Boolean).join(' ')}
            tabIndex={i === active ? 0 : -1}
          >
            <span className="ptabs__ratio" aria-hidden="true">
              {o.ratio}
            </span>
            <div className="ptabs__body">
              <h5 className="ptabs__title">{o.title}</h5>
              {o.tagline ? <p className="ptabs__tagline">{o.tagline}</p> : null}
              {o.text ? <p className="ptabs__text">{o.text}</p> : null}
            </div>
            {o.image ? (
              <figure className="ptabs__photo">
                <CmsImage src={o.image.src} alt={o.image.alt} fill sizes="(max-width: 900px) 92vw, 30vw" quality={82} />
              </figure>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
