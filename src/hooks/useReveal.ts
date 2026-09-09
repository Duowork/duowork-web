import { useEffect, useRef } from "react";

/**
 * One IntersectionObserver shared by every reveal on the page — the handoff asks
 * for IntersectionObserver throughout rather than per-element scroll listeners.
 * Elements are unobserved once revealed, so the animation fires exactly once.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  return observer;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Without IntersectionObserver, show the content rather than hide it forever.
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.revealed = "true";
      return;
    }

    const io = getObserver();
    io.observe(node);

    return () => io.unobserve(node);
  }, []);

  return ref;
}
