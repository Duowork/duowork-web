import Container from "./Container";

type SectionProps = {
  children: React.ReactNode;
  /** Only two backgrounds exist in this design. */
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  /** Opt out of the standard vertical rhythm when a section sets its own. */
  bare?: boolean;
  /** Render without the inner Container (for full-bleed content). */
  fullBleed?: boolean;
};

/** Section vertical rhythm from the handoff: clamp(64px, 9vw, 120px) top and bottom. */
export const SECTION_RHYTHM = "py-[clamp(64px,9vw,120px)]";

export default function Section({
  children,
  tone = "light",
  id,
  className = "",
  bare = false,
  fullBleed = false,
}: SectionProps) {
  const toneClass = tone === "dark" ? "bg-carbon text-white" : "bg-white text-carbon";

  return (
    <section
      id={id}
      className={`${toneClass} ${bare ? "" : SECTION_RHYTHM} ${className}`}
    >
      {fullBleed ? children : <Container>{children}</Container>}
    </section>
  );
}
