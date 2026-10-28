type Comparison = { heading: string; text?: string; them: string; us: string; lines: { label: string; them: string; us: string }[] };

const Check = () => (
  <svg className="compare__icon" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4.5 10.5 8.3 14 15.5 6.5" />
  </svg>
);
const Dash = () => (
  <svg className="compare__icon" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M5.5 10h9" />
  </svg>
);

/**
 * A side-by-side comparison (e.g. UEXORA against typical home tuition). A real table, so it
 * reads row by row with assistive technology; on phones each row becomes a short stack with the
 * column names shown inline. The rows rise in one after another as the table scrolls into view.
 */
export default function CompareTable({ id, data, tone }: { id: string; data: Comparison; tone: 'light' | 'dark' }) {
  const lines = data.lines.filter((l) => l?.label);
  if (!lines.length) return null;
  return (
    <section id={id} className="section compare" data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-head">
          <h2 id={`${id}-title`} className="h2" data-split>
            {data.heading}
          </h2>
          {data.text ? (
            <p className="lead" data-reveal>
              {data.text}
            </p>
          ) : null}
        </div>
        <table className="compare__table" aria-labelledby={`${id}-title`}>
          <thead>
            <tr data-reveal>
              <th scope="col">
                <span className="visually-hidden">What is compared</span>
              </th>
              <th scope="col" className="compare__them">
                {data.them}
              </th>
              <th scope="col" className="compare__us">
                {data.us}
              </th>
            </tr>
          </thead>
          <tbody data-reveal-group data-stagger="0.08">
            {lines.map((l, i) => (
              <tr key={l.label + i}>
                <th scope="row">{l.label}</th>
                <td className="compare__them" data-label={data.them}>
                  <Dash />
                  <span>{l.them}</span>
                </td>
                <td className="compare__us" data-label={data.us}>
                  <Check />
                  <span>{l.us}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
