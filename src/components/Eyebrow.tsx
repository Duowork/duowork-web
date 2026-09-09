type EyebrowProps = {
  children: React.ReactNode;
  /** On carbon the pill goes solid volt; on white it uses the 15% tint. */
  tone?: "light" | "dark";
  className?: string;
};

export default function Eyebrow({
  children,
  tone = "light",
  className = "",
}: EyebrowProps) {
  const fill = tone === "dark" ? "bg-volt" : "bg-volt-tint";

  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium tracking-[0.02em] text-carbon ${fill} ${className}`}
    >
      {children}
    </span>
  );
}
