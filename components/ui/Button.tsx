import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'gold' | 'blue' | 'ghost' | 'light';
  className?: string;
  external?: boolean;
};

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Button({ href, children, variant = 'dark', className, external }: Props) {
  const cls = ['btn', variant !== 'dark' ? `btn--${variant}` : '', className].filter(Boolean).join(' ');
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__icon">
        <Arrow />
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={['link-arrow', className].filter(Boolean).join(' ')}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}
