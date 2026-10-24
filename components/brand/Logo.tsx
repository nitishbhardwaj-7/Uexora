import Link from 'next/link';
import Monogram from './Monogram';
import Wordmark from './Wordmark';

type Props = {
  href?: string;
  tone?: 'brand' | 'light' | 'dark' | 'current';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Monogram only, no wordmark. */
  markOnly?: boolean;
};

/** Horizontal lockup: monogram + wordmark (or the monogram alone with `markOnly`). */
export default function Logo({ href = '/', tone = 'brand', className, size = 'md', markOnly }: Props) {
  return (
    <Link href={href} className={['logo', `logo--${size}`, markOnly ? 'logo--mark' : '', className].filter(Boolean).join(' ')} aria-label="UEXORA home">
      <Monogram className="logo__mark" title="UEXORA" />
      {markOnly ? null : <Wordmark className="logo__word" tone={tone} />}
    </Link>
  );
}
