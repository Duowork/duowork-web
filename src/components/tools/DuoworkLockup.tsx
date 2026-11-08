import { LOCKUP } from "../../lib/tools/lockup";

/**
 * The horizontal Duowork lockup that signs every tool's output, bottom right.
 * Its PDF twin is drawn from the same shapes in lib/tools/pdf/PdfLockup.tsx.
 */
export default function DuoworkLockup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={LOCKUP.viewBox}
      role="img"
      aria-label="Duowork"
      className={`block h-auto ${className}`}
    >
      <path d={LOCKUP.mark} fill={LOCKUP.carbon} />
      <path d={LOCKUP.notch} fill={LOCKUP.volt} />
      <rect {...LOCKUP.divider} fill={LOCKUP.carbon} opacity={LOCKUP.dividerOpacity} />
      <path d={LOCKUP.wordmark} fill={LOCKUP.carbon} />
    </svg>
  );
}
