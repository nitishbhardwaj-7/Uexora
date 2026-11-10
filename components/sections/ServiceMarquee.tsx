/**
 * A band of the division's service names in two rows, one set solid and one outlined.
 * MarketingMotion runs the rows in opposite directions with the scroll (see [data-mk-track]);
 * without it they simply sit still. Each row holds the names twice so the loop is seamless.
 * Hidden from assistive technology: the same services are listed, with links, just above.
 */
export default function ServiceMarquee({ items }: { items: string[] }) {
  const names = items.filter(Boolean);
  if (!names.length) return null;
  const row = (variant: 'solid' | 'outline') => (
    <div className={`mk-marquee__track mk-marquee__track--${variant}`} data-mk-track>
      {[0, 1].map((copy) => (
        <div className="mk-marquee__set" key={copy}>
          {names.map((n, i) => (
            <span key={i} className="mk-marquee__item">
              {n}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <div className="mk-marquee" data-tone="light" aria-hidden="true">
      {row('solid')}
      {row('outline')}
    </div>
  );
}
