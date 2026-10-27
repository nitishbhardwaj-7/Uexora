import Link from 'next/link';

type Item = { text: string; href?: string };

/** Short lists are repeated so one pass is always wider than the screen. */
const MIN_CHARS = 140;

function Entry({ item, hidden }: { item: Item; hidden?: boolean }) {
  if (!item.href) return <span className="announce__text">{item.text}</span>;
  const external = /^https?:\/\//.test(item.href);
  const props = hidden ? { tabIndex: -1 } : {};
  return external ? (
    <a className="announce__text" href={item.href} target="_blank" rel="noopener noreferrer" {...props}>
      {item.text}
    </a>
  ) : (
    <Link className="announce__text" href={item.href} {...props}>
      {item.text}
    </Link>
  );
}

/**
 * Announcement strip under the navigation, on every page: the messages scroll continuously
 * (pausing on hover or focus) and the strip scrolls away with the page. Switched on and off,
 * and edited, under Site settings > Announcement bar in the studio.
 */
export default function Announcement({ on, items }: { on: boolean; items: Item[] }) {
  const list = items.filter((i) => i?.text);
  if (!on || !list.length) return null;

  const chars = list.reduce((n, i) => n + i.text.length + 6, 0);
  const repeats = Math.max(1, Math.ceil(MIN_CHARS / chars));
  // About 0.22 s per character keeps the reading pace the same however long the list is.
  const duration = Math.round(chars * repeats * 0.22);

  // Two identical halves loop seamlessly; only the very first pass is read by screen readers.
  const half = (copy: number) =>
    Array.from({ length: repeats }, (_, r) =>
      list.map((item, i) => {
        const hidden = copy > 0 || r > 0;
        return (
          <li key={`${copy}-${r}-${i}`} aria-hidden={hidden || undefined}>
            <Entry item={item} hidden={hidden} />
          </li>
        );
      }),
    );

  return (
    <aside className="announce" aria-label="Announcements">
      <ul className="announce__track" style={{ '--dur': `${duration}s` } as React.CSSProperties}>
        {half(0)}
        {half(1)}
      </ul>
    </aside>
  );
}
