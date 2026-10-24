export default function Marquee({ items, tone = 'light' }: { items: string[]; tone?: 'light' | 'dark' }) {
  const list = [...items, ...items];
  return (
    <div className="marquee" data-tone={tone} aria-hidden="true">
      <div className="marquee__track">
        {list.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
