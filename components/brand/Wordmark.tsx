import Image from 'next/image';
import { WORD } from './logo-paths';

type Props = {
  className?: string;
  title?: string;
  /**
   * 'brand' = exact artwork (blue letters, gold X).
   * 'light' = exact artwork with the letters in white for dark backgrounds.
   * 'dark' | 'current' = single-colour vector fallback.
   */
  tone?: 'brand' | 'light' | 'dark' | 'current';
  style?: React.CSSProperties;
  priority?: boolean;
};

/** Exact pixel dimensions of the wordmark exports in /brand */
export const WORD_IMG = { w: 1600, h: 739 };
const SRC = { brand: '/brand/uexora-wordmark.png', light: '/brand/uexora-wordmark-light.png' };
const TONES = { dark: '#0a1030', current: 'currentColor' };

/** The UEXORA wordmark. */
export default function Wordmark({ className, title, tone = 'brand', style, priority }: Props) {
  const cls = ['wordmark', className].filter(Boolean).join(' ');

  if (tone === 'brand' || tone === 'light') {
    return (
      <Image
        src={SRC[tone]}
        width={WORD_IMG.w}
        height={WORD_IMG.h}
        alt={title || ''}
        aria-hidden={title ? undefined : true}
        className={cls}
        style={style}
        preload={priority || undefined}
        fetchPriority={priority ? 'high' : undefined}
        sizes="(max-width: 600px) 80vw, 520px"
      />
    );
  }

  return (
    <svg viewBox={`0 0 ${WORD.w} ${WORD.h}`} className={cls} style={style} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} xmlns="http://www.w3.org/2000/svg">
      {title ? <title>{title}</title> : null}
      <path className="word-letters" d={WORD.letters.join(' ')} fill={TONES[tone]} fillRule="evenodd" />
      <g className="word-x">
        {WORD.gold.map((d, i) => (
          <path key={i} d={d} fill={TONES[tone]} />
        ))}
      </g>
    </svg>
  );
}
