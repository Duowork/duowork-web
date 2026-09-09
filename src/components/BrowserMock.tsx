type BrowserMockProps = {
  children: React.ReactNode;
  /** The hero mock is elevated; the blog featured mock is flat. */
  elevated?: boolean;
  /** The hero chrome carries a URL field; the blog one is dots only. */
  urlField?: boolean;
  className?: string;
};

/** 16px-radius frame with a chrome bar, wrapping a screenshot slot. */
export default function BrowserMock({
  children,
  elevated = false,
  urlField = false,
  className = "",
}: BrowserMockProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-hairline bg-white ${
        elevated ? "shadow-mock" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-3.5">
        <span className="size-2 rounded-full bg-ink-30" />
        <span className="size-2 rounded-full bg-ink-30" />
        <span className="size-2 rounded-full bg-ink-30" />
        {urlField && (
          <span className="ml-2.5 h-4 flex-1 rounded-full bg-[rgba(34,34,34,0.05)]" />
        )}
      </div>
      {children}
    </div>
  );
}
