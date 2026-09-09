import Eyebrow from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  tone?: "light" | "dark";
  /** Trailing content on the title row, e.g. a "View all work" link. */
  aside?: React.ReactNode;
  /** Section headings sit 64px above their content; the process one uses 72px. */
  gap?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  tone = "light",
  aside,
  gap = "mb-16",
}: SectionHeadingProps) {
  return (
    <div className={gap}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}

      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2
          className={`max-w-[720px] font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em] ${
            eyebrow ? "mt-6" : ""
          } mb-0`}
        >
          {title}
        </h2>
        {aside}
      </div>
    </div>
  );
}
