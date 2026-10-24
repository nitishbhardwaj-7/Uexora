import Image from 'next/image';
import { MONO } from './logo-paths';

type Props = {
  className?: string;
  /** Accessible name. Omit for decorative usage (aria-hidden). */
  title?: string;
  /**
   * 'brand' = the exact artwork from the master logo file (raster, full shading).
   * 'mono'  = single-colour vector silhouette via currentColor (watermarks, icons).
   */
  variant?: 'brand' | 'mono';
  style?: React.CSSProperties;
  /** Eager-load (hero / above the fold). */
  priority?: boolean;
};

/** Exact pixel dimensions of /brand/uexora-monogram.png */
export const MONO_IMG = { src: '/brand/uexora-monogram.png', w: 1200, h: 1303 };

/**
 * The UEXORA "U" monogram.
 * Brand variant renders the client's exact artwork. Mono variant is a traced
 * vector with hooks .mono-base / .mono-gold / .mono-dot for animation.
 */
export default function Monogram({ className, title, variant = 'brand', style, priority }: Props) {
  const cls = ['monogram', className].filter(Boolean).join(' ');

  if (variant === 'brand') {
    return (
      <Image
        src={MONO_IMG.src}
        width={MONO_IMG.w}
        height={MONO_IMG.h}
        alt={title || ''}
        aria-hidden={title ? undefined : true}
        className={cls}
        style={style}
        preload={priority || undefined}
        fetchPriority={priority ? 'high' : undefined}
        sizes="(max-width: 600px) 60vw, 320px"
      />
    );
  }

  return (
    <svg viewBox={`0 0 ${MONO.w} ${MONO.h}`} className={cls} style={style} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} xmlns="http://www.w3.org/2000/svg">
      {title ? <title>{title}</title> : null}
      <g className="mono-base">
        <path d={MONO.base.join(' ')} fill="currentColor" fillRule="evenodd" />
      </g>
      <g className="mono-gold">
        {MONO.gold.map((d, i) => (
          <path key={i} d={d} fill="currentColor" />
        ))}
      </g>
      <circle className="mono-dot" cx={MONO.dot.cx} cy={MONO.dot.cy} r={MONO.dot.r} fill="currentColor" />
    </svg>
  );
}
