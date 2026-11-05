/**
 * Line icons for the approach points, drawn on a 48-unit grid. Every stroke has pathLength 1 so
 * the CSS can draw it on (stroke-dashoffset 1 to 0); --p orders the strokes within an icon, and
 * `acc` marks the accent strokes (gold).
 */
export const APPROACH_ICONS = ['questions', 'bulb', 'globe', 'book', 'sliders', 'layers', 'search', 'puzzle', 'robot', 'speech', 'mic', 'person', 'team', 'career', 'routine', 'heart', 'family', 'compass', 'sprout', 'infinity', 'focus', 'chart', 'target', 'megaphone', 'code', 'device', 'shop'] as const;
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
  // A speech bubble with lines of text: speaking clearly.
  speech: (
    <>
      <path {...p(0)} d="M10 8h28a5 5 0 0 1 5 5v16a5 5 0 0 1-5 5H22l-9 8v-8h-3a5 5 0 0 1-5-5V13a5 5 0 0 1 5-5z" />
      <path {...p(1)} className="acc" d="M14 17h20" />
      <path {...p(2)} className="acc" d="M14 25h13" />
    </>
  ),
  // A microphone on its stand: public speaking.
  mic: (
    <>
      <rect {...p(0)} x="18" y="5" width="12" height="23" rx="6" />
      <path {...p(1)} d="M11 22v2a13 13 0 0 0 26 0v-2" />
      <path {...p(2)} d="M24 37v6M16 43h16" />
      <path {...p(3)} className="acc" d="M18 13h5M18 19h5" />
    </>
  ),
  // A person with rays above: confidence.
  person: (
    <>
      <circle {...p(0)} cx="24" cy="17" r="7" />
      <path {...p(1)} d="M10 44v-3a14 14 0 0 1 28 0v3" />
      <path {...p(2)} className="acc" d="M24 3v3M36.5 8l-2 2M11.5 8l2 2M42 18h-3M6 18h3" />
    </>
  ),
  // Three people, the one in front leading: leadership and teamwork.
  team: (
    <>
      <circle {...p(0)} cx="24" cy="14" r="6" />
      <path {...p(1)} d="M13 41v-3a11 11 0 0 1 22 0v3" />
      <circle {...p(2)} className="acc" cx="9" cy="20" r="4" />
      <path {...p(3)} className="acc" d="M2 39v-2a8 8 0 0 1 6.5-7.8" />
      <circle {...p(2)} className="acc" cx="39" cy="20" r="4" />
      <path {...p(3)} className="acc" d="M46 39v-2a8 8 0 0 0-6.5-7.8" />
    </>
  ),
  // A briefcase: career readiness.
  career: (
    <>
      <rect {...p(0)} x="5" y="15" width="38" height="26" rx="4" />
      <path {...p(1)} d="M17 15v-3a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3" />
      <path {...p(2)} className="acc" d="M5 27h38" />
      <path {...p(3)} className="acc" d="M24 24v6" />
    </>
  ),
  // A clock: daily routines.
  routine: (
    <>
      <circle {...p(0)} cx="24" cy="24" r="18" />
      <path {...p(1)} className="acc" d="M24 13v11l7 4" />
    </>
  ),
  // A heart with a pulse through it: emotional wellbeing.
  heart: (
    <>
      <path {...p(0)} d="M24 42S6 32 6 18.5A10 10 0 0 1 24 12.5a10 10 0 0 1 18 6C42 32 24 42 24 42z" />
      <path {...p(1)} className="acc" d="M14 24h5l2.5-5 3.5 9 2.5-4H34" />
    </>
  ),
  // A parent beside a child: parent education.
  family: (
    <>
      <circle {...p(0)} cx="17" cy="11" r="6" />
      <path {...p(1)} d="M6 43v-9a11 11 0 0 1 22 0v9" />
      <circle {...p(2)} className="acc" cx="36" cy="23" r="4.5" />
      <path {...p(3)} className="acc" d="M28.5 43v-4a7.5 7.5 0 0 1 15 0v4" />
    </>
  ),
  // A compass: finding the way towards adulthood.
  compass: (
    <>
      <circle {...p(0)} cx="24" cy="24" r="19" />
      <path {...p(1)} d="M24 5v3M24 40v3M5 24h3M40 24h3" />
      <path {...p(2)} className="acc" d="M32 16l-5 11-11 5 5-11z" />
    </>
  ),
  // A sprout with two leaves: young children, growing.
  sprout: (
    <>
      <path {...p(0)} d="M14 43h20M24 43V22" />
      <path {...p(1)} className="acc" d="M24 29c0-8-7-13-17-13 0 9 7 13 17 13z" />
      <path {...p(2)} className="acc" d="M24 22c0-8 7-13 17-13 0 9-7 13-17 13z" />
    </>
  ),
  // An infinity loop, the neurodiversity symbol: autism, without the puzzle piece.
  infinity: (
    <>
      <path {...p(0)} d="M24 24c-3.6-5-7.2-8-11.5-8a8 8 0 0 0 0 16c4.3 0 7.9-3 11.5-8" />
      <path {...p(1)} className="acc" d="M24 24c3.6 5 7.2 8 11.5 8a8 8 0 0 0 0-16c-4.3 0-7.9 3-11.5 8" />
    </>
  ),
  // A circle inside a viewfinder's corners: attention and focus.
  focus: (
    <>
      <path {...p(0)} d="M6 16V9a3 3 0 0 1 3-3h7M32 6h7a3 3 0 0 1 3 3v7M42 32v7a3 3 0 0 1-3 3h-7M16 42H9a3 3 0 0 1-3-3v-7" />
      <circle {...p(1)} className="acc" cx="24" cy="24" r="8" />
    </>
  ),
  // Rising bars and a trend line: measuring performance.
  chart: (
    <>
      <path {...p(0)} d="M6 6v36h36" />
      <path {...p(1)} d="M15 34v-8M24 34V21M33 34V15" />
      <path {...p(2)} className="acc" d="M13 19l9-7 7 3 10-9" />
    </>
  ),
  // A target and its centre: goals and audiences.
  target: (
    <>
      <circle {...p(0)} cx="24" cy="24" r="19" />
      <circle {...p(1)} cx="24" cy="24" r="11" />
      <circle {...p(2)} className="acc" cx="24" cy="24" r="3.5" />
    </>
  ),
  // A megaphone with sound lines: campaigns and launches.
  megaphone: (
    <>
      <path {...p(0)} d="M8 19v10h7l18 9V10l-18 9H8z" />
      <path {...p(1)} d="M15 29l3 11h6l-3-8" />
      <path {...p(2)} className="acc" d="M39 18c2 3.5 2 8.5 0 12M43 13c3.5 6 3.5 16 0 22" />
    </>
  ),
  // Angle brackets and a slash: building a website.
  code: (
    <>
      <path {...p(0)} d="M15 13 4 24l11 11" />
      <path {...p(1)} d="M33 13l11 11-11 11" />
      <path {...p(2)} className="acc" d="M28 8 20 40" />
    </>
  ),
  // A laptop and a phone: working on every device.
  device: (
    <>
      <path {...p(0)} d="M9 33V11a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v6" />
      <path {...p(1)} d="M3 33h26v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2z" />
      <rect {...p(2)} className="acc" x="33" y="21" width="12" height="20" rx="2.5" />
    </>
  ),
  // A shopfront with an awning: local businesses.
  shop: (
    <>
      <path {...p(0)} d="M9 22v20h30V22" />
      <path {...p(1)} d="M9 8h30l5 11a5 5 0 0 1-10 0 5 5 0 0 1-10 0 5 5 0 0 1-10 0 5 5 0 0 1-10 0L9 8z" />
      <path {...p(2)} className="acc" d="M19 42V30h10v12" />
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
