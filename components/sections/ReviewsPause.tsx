'use client';

import { useState } from 'react';

/** Stops and restarts the reviews slider (moving content needs a way to pause it). */
export default function ReviewsPause({ target }: { target: string }) {
  const [paused, setPaused] = useState(false);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.getElementById(target)?.toggleAttribute('data-paused', next);
  };
  return (
    <button type="button" className="reviews-pause" onClick={toggle} aria-controls={target} aria-pressed={paused}>
      <span className="visually-hidden">{paused ? 'Play the reviews' : 'Pause the reviews'}</span>
      {paused ? (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6 4.5v11l9-5.5z" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6 4.5h2.6v11H6zM11.4 4.5H14v11h-2.6z" />
        </svg>
      )}
    </button>
  );
}
