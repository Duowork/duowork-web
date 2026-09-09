/**
 * Entrance animations for above-the-fold content, which plays on load rather
 * than on scroll. Everything below the fold uses <Reveal> instead.
 *
 * The reduced-motion block in index.css collapses these to 0.01ms.
 */
export function rise(delay = 0): React.CSSProperties {
  return {
    animation: "dwRise 350ms cubic-bezier(0,0,0.2,1) both",
    animationDelay: `${delay}ms`,
  };
}

/** The hero's browser mock rises more slowly than the copy beside it. */
export function riseSlow(delay = 0): React.CSSProperties {
  return {
    animation: "dwRise 600ms cubic-bezier(0,0,0.2,1) both",
    animationDelay: `${delay}ms`,
  };
}
