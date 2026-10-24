/** Renders `text`, wrapping the first occurrence of `word` in a span (class `hl` by default). */
export default function Highlight({ text, word, className = 'hl' }: { text: string; word?: string; className?: string }) {
  const at = word ? text.toLowerCase().indexOf(word.toLowerCase()) : -1;
  if (at < 0 || !word) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{text.slice(at, at + word.length)}</span>
      {text.slice(at + word.length)}
    </>
  );
}
