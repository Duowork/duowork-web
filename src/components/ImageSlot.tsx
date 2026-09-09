type ImageSlotProps = {
  /** CSS aspect-ratio, e.g. "16 / 10". */
  ratio: string;
  /** Real asset. When absent the slot falls back to the hatch placeholder. */
  src?: string;
  alt?: string;
  /** Pill copy shown on the placeholder. Pass null for a bare hatch. */
  label?: string | null;
  className?: string;
};

/**
 * An image slot in the design. Real screenshots render as images; anything not
 * yet supplied renders as the diagonal-hatch placeholder with a pill, so a
 * missing asset is always visibly missing rather than quietly absent.
 */
export default function ImageSlot({
  ratio,
  src,
  alt = "",
  label = "Screenshot placeholder",
  className = "",
}: ImageSlotProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`block h-full w-full object-cover ${className}`}
        style={{ aspectRatio: ratio }}
      />
    );
  }

  return (
    <div
      className={`dw-hatch flex items-center justify-center ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {label && (
        <span className="rounded-full border border-hairline-strong bg-white px-3 py-[5px] text-xs font-medium tracking-[0.02em] text-ink-60">
          {label}
        </span>
      )}
    </div>
  );
}
