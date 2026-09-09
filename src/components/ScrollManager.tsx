import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Navigation resets scroll to the top; a hash scrolls to its section instead.
 * The nav clearance comes from `scroll-margin-top` in index.css rather than a
 * hardcoded pixel offset here.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    // The target may mount in the same tick as the route change.
    const frame = requestAnimationFrame(() => {
      const target = document.querySelector(hash);

      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
