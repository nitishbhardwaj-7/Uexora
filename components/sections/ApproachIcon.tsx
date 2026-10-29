/**
 * Line icons for the approach points, drawn on a 48-unit grid. Every stroke has pathLength 1 so
 * the CSS can draw it on (stroke-dashoffset 1 to 0); --p orders the strokes within an icon, and
 * `acc` marks the accent strokes (gold).
 */
export const APPROACH_ICONS = ['questions', 'bulb', 'globe', 'book', 'sliders', 'layers', 'search', 'puzzle', 'robot'] as const;
export type ApproachIconName = (typeof APPROACH_ICONS)[number];

const p = (n: number) => ({ pathLength: 1, style: { '--p': n } as React.CSSProperties });

const ICONS: Record<ApproachIconName, React.ReactNode> = {
  // Two speech bubbles and a question: curiosity, asking and answering.
  questions: (
    <>
      <path {...p(0)} d="M9 9h20a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H18l-7 6v-6H9a4 4 0 0 1-4-4V13a4 4 0 0 1 4-4z" />
      <path {...p(1)} d="M37 17h2a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-1v6l-7-6h-8a4 4 0 0 1-4-3" />
      <path {...p(2)} className="acc" d="M15.5 15.5a3.5 3.5 0 1 1 5 3.2c-1.1.6-1.5 1.4-1.5 2.6" />
      <path {...p(3)} className="acc" d="M19 25v.01" />
    </>
  ),
  // A lightbulb with its filament and rays: understanding why.
  bulb: (
    <>
      <path {...p(0)} d="M24 7a12 12 0 0 0-7.2 21.6c1.3 1 2.2 2.4 2.2 4V34h10v-1.4c0-1.6.9-3 2.2-4A12 12 0 0 0 24 7z" />
      <path {...p(1)} d="M19 38.5h10M20.5 42.5h7" />
      <path {...p(2)} className="acc" d="M20.5 27l3.5-6 3.5 6" />
      <path {...p(3)} className="acc" d="M24 1.5v1.5M38.5 7.5l-1.2 1.2M9.5 7.5l1.2 1.2M45 19h-1.8M3 19h1.8" />
    </>
  ),
  // A globe: learning connected to the world.
  globe: (
    <>
      <circle {...p(0)} cx="24" cy="24" r="18" />
      <ellipse {...p(1)} className="acc" cx="24" cy="24" rx="8" ry="18" />
      <path {...p(2)} d="M7.5 17.5h33M7.5 30.5h33" />
    </>
  ),
  // An open book: stories and examples.
  book: (
    <>
      <path {...p(0)} d="M24 13c-4.5-3.2-10.5-4.2-18-3.2v26.4c7.5-1 13.5 0 18 3.2 4.5-3.2 10.5-4.2 18-3.2V9.8c-7.5-1-13.5 0-18 3.2z" />
      <path {...p(1)} d="M24 13v26.4" />
      <path {...p(2)} className="acc" d="M10.5 17.5c3.5-.4 6.8 0 9.5 1.1M10.5 23.5c3.5-.4 6.8 0 9.5 1.1M28 18.6c2.7-1.1 6-1.5 9.5-1.1M28 24.6c2.7-1.1 6-1.5 9.5-1.1" />
    </>
  ),
  // Three sliders set at different points: support tuned to each student.
  sliders: (
    <>
      <path {...p(0)} d="M7 14h34M7 24h34M7 34h34" />
      <circle {...p(1)} className="acc knob" cx="17" cy="14" r="3.6" />
      <circle {...p(2)} className="acc knob" cx="32" cy="24" r="3.6" />
      <circle {...p(3)} className="acc knob" cx="22" cy="34" r="3.6" />
    </>
  ),
  // Stacked layers: foundations built one on another.
  layers: (
    <>
      <path {...p(0)} d="M24 6 6 15l18 9 18-9-18-9z" />
      <path {...p(1)} className="acc" d="M6 24l18 9 18-9" />
      <path {...p(2)} d="M6 33l18 9 18-9" />
    </>
  ),
  // A magnifier over a line that dips: finding where learning breaks down.
  search: (
    <>
      <circle {...p(0)} cx="20" cy="20" r="13" />
      <path {...p(1)} d="M29.5 29.5 42 42" />
      <path {...p(2)} className="acc" d="M12.5 18l4 4.5 3-4 3.5 5 4.5-6" />
    </>
  ),
  // A puzzle piece and a spark: working a problem out.
  puzzle: (
    <>
      <path
        {...p(0)}
        d="M9 13h8.5a4.2 4.2 0 1 1 8 0H34v8.5a4.2 4.2 0 1 1 0 8V38h-8.5a4.2 4.2 0 1 0-8 0H9v-8.5a4.2 4.2 0 1 0 0-8V13z"
      />
      <path {...p(1)} className="acc" d="M40 4v6M37 7h6" />
    </>
  ),
  // A friendly robot: AI, robotics and what comes next.
  robot: (
    <>
      <rect {...p(0)} x="10" y="15" width="28" height="22" rx="6" />
      <path {...p(1)} d="M24 15V9M10 22.5H6.5v7H10M38 22.5h3.5v7H38M19 31.5h10" />
      <circle {...p(2)} className="acc" cx="24" cy="7" r="2.2" />
      <circle {...p(3)} className="acc" cx="18.5" cy="25" r="2.4" />
      <circle {...p(4)} className="acc" cx="29.5" cy="25" r="2.4" />
    </>
  ),
};

export default function ApproachIcon({ name }: { name: string }) {
  const icon = ICONS[name as ApproachIconName];
  if (!icon) return null;
  return (
    <svg className="aicon" viewBox="0 0 48 48" aria-hidden="true">
      {icon}
    </svg>
  );
}
