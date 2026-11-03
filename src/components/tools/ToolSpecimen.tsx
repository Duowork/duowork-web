import type { ToolSlug } from "../../data/tools";

/**
 * A miniature of what each featured tool produces, drawn with real type rather
 * than a screenshot. The figures are worked examples, and they add up.
 */

function PaperSpecimen({
  title,
  number,
  rows,
  totalLabel,
  total,
}: {
  title: string;
  number: string;
  rows: [string, string][];
  totalLabel: string;
  total: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[300px] translate-y-3 rounded-t-md bg-white px-5 pt-5 pb-6 text-carbon shadow-mock transition-transform duration-300 ease-out-soft group-hover:translate-y-1">
      <div className="flex items-baseline justify-between gap-3 border-b-2 border-carbon pb-2.5">
        <span className="font-title text-lg font-semibold">{title}</span>
        <span className="text-[11px] text-ink-60">{number}</span>
      </div>
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-3 border-b border-hairline py-1.5 text-xs">
          <span className="text-ink-60">{label}</span>
          <span className="font-title">{value}</span>
        </div>
      ))}
      <div className="mt-2.5 flex items-center justify-between gap-3 rounded-sm bg-carbon px-2.5 py-1.5 text-xs text-white">
        <span>{totalLabel}</span>
        <span className="font-title text-sm font-semibold">{total}</span>
      </div>
    </div>
  );
}

function MarginSpecimen() {
  return (
    <div className="mx-auto w-full max-w-[300px] py-2 text-white">
      <p className="m-0 text-xs text-paper-70">You keep</p>
      <p className="m-0 font-title text-[44px] leading-[1.1] font-semibold text-volt">35%</p>
      <div className="mt-4 flex h-3 overflow-hidden rounded-full" aria-hidden="true">
        <span className="w-[65%] bg-white/25" />
        <span className="w-[35%] bg-volt" />
      </div>
      <div className="mt-2 flex justify-between text-xs">
        <span className="font-title text-paper-70">Cost ₦6,500</span>
        <span className="font-title text-volt">Profit ₦3,500</span>
      </div>
      <p className="mt-3 mb-0 font-title text-xs text-paper-60">on a ₦10,000 sale. That's a 53.8% markup.</p>
    </div>
  );
}

function TaxSpecimen() {
  return (
    <div className="mx-auto w-full max-w-[300px] py-2 text-white">
      <p className="m-0 text-xs text-paper-70">Price with tax</p>
      <p className="m-0 font-title text-[44px] leading-[1.1] font-semibold">₦11,000</p>
      <div className="mt-4 grid gap-1.5 text-xs">
        <div className="flex justify-between border-b border-hairline-dark pb-1.5">
          <span className="text-paper-70">Before tax</span>
          <span className="font-title">₦10,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-paper-70">Tax, at a 10% example rate</span>
          <span className="font-title text-volt">₦1,000</span>
        </div>
      </div>
    </div>
  );
}

const SPECIMENS: Partial<Record<ToolSlug, () => React.ReactNode>> = {
  "invoice-generator": () => (
    <PaperSpecimen
      title="Invoice"
      number="INV-0042"
      rows={[
        ["Packaging design × 3", "₦360,000"],
        ["Print supervision × 6", "₦90,000"],
      ]}
      totalLabel="Total due"
      total="₦450,000"
    />
  ),
  "quotation-generator": () => (
    <PaperSpecimen
      title="Quotation"
      number="QUO-0017"
      rows={[
        ["Brand refresh", "₦600,000"],
        ["Valid until", "30 days"],
      ]}
      totalLabel="Quotation total"
      total="₦600,000"
    />
  ),
  "profit-margin-calculator": MarginSpecimen,
  "vat-calculator": TaxSpecimen,
};

export default function ToolSpecimen({ slug }: { slug: ToolSlug }) {
  const Specimen = SPECIMENS[slug];
  if (!Specimen) return null;

  return (
    <div
      aria-hidden="true"
      className="flex h-[220px] items-end justify-center overflow-hidden rounded-[20px] bg-carbon px-6 pt-6"
    >
      <Specimen />
    </div>
  );
}
