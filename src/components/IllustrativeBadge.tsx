type IllustrativeBadgeProps = {
  tone?: "light" | "dark";
  children?: React.ReactNode;
  className?: string;
};

/**
 * Marks content the handoff flags as "Illustrative — to be replaced":
 * case-study result figures, testimonial names, blog draft topics.
 *
 * Renders in development only. The handoff is explicit that the site must not
 * launch with illustrative content presented as fact, so in a production build
 * the badge disappears — replace the underlying copy in src/data before launch
 * rather than relying on the badge to disclaim it.
 */
export default function IllustrativeBadge({
  tone = "light",
  children = "Illustrative — to be replaced",
  className = "",
}: IllustrativeBadgeProps) {
  if (!import.meta.env.DEV) return null;

  const toneClass =
    tone === "dark"
      ? "border-paper-40 text-paper-60"
      : "border-ink-30 text-ink-60";

  return (
    <span
      className={`inline-block rounded-full border border-dashed px-2.5 py-[3px] text-[11px] font-medium tracking-[0.04em] ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
