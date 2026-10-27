import { TAGLINE } from './logo-paths';

type Props = { className?: string; style?: React.CSSProperties };

/** Glyphs from here on spell "YOU", drawn in gold. */
const YOU_FROM = 9;

/** "FOCUSED ON YOU" — the original vector glyphs from the master logo. Fill via currentColor, with "YOU" in gold. */
export default function Tagline({ className, style }: Props) {
  return (
    <svg
      viewBox="324 735 424 32"
      className={['tagline', className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        {TAGLINE.map((g, i) => (
          <g key={i} transform={`translate(${g.x},${g.y})`}>
            <path className="tagline-glyph" d={g.d} fill={i >= YOU_FROM ? 'var(--gold-500)' : undefined} />
          </g>
        ))}
      </g>
    </svg>
  );
}
