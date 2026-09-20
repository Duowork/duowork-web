type EyebrowProps = {
  children: React.ReactNode;
  /**
   * light   — volt 15% tint on white sections
   * dark    — solid volt on carbon sections
   * outline — volt rule and volt text, for use over imagery where a filled
   *           pill would block too much of the picture behind it
   */
  tone?: "light" | "dark" | "outline";
  className?: string;
};

const TONES: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  light: "bg-volt-tint text-carbon",
  dark: "bg-volt text-carbon",
  outline:
    "border border-volt/60 text-volt uppercase tracking-[0.12em] text-[13px]",
};

export default function Eyebrow({
  children,
  tone = "light",
  className = "",
}: EyebrowProps) {
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium tracking-[0.02em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
