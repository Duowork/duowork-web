import { useReveal } from "../hooks/useReveal";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger, in ms. The design uses 0 / 80 / 160 for card rows. */
  delay?: number;
  className?: string;
};

/**
 * Fades and rises its children in once they scroll into view.
 * The animation itself lives in `.dw-reveal` so the reduced-motion block can
 * cancel it and force full opacity.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`dw-reveal ${className}`}
      style={{ "--dw-reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
