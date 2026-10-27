/**
 * Renders text with the "you" of "Because, you matter." in gold; any other text is returned as
 * it is. The words stay plain text, so search engines and screen readers read the same line.
 */
export function becauseYou(text: string): React.ReactNode {
  const m = text.match(/^([\s\S]*\bBecause,\s+)(you)(\s+matter[\s\S]*)$/i);
  if (!m) return text;
  return (
    <>
      {m[1]}
      <span className="gold">{m[2]}</span>
      {m[3]}
    </>
  );
}
