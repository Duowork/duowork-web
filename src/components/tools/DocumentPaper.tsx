import type { DocumentView } from "../../lib/tools/document";
import DuoworkLockup from "./DuoworkLockup";

const LABEL = "text-[11px] font-medium tracking-[0.02em] text-ink-60";

/**
 * The on-screen invoice and quotation. Keep in step with
 * lib/tools/pdf/DocumentPdf.tsx. Below 480px of its own width the table reflows
 * so a phone stays readable; print and PDF always get the full layout.
 */
export default function DocumentPaper({ view }: { view: DocumentView }) {
  return (
    <div className="@container">
      <article
        aria-label={`${view.title} preview`}
        className="dw-paper font-title rounded-sm bg-white p-[clamp(20px,5cqw,40px)] text-[13px] leading-normal text-carbon shadow-mock"
      >
        <header className="flex items-start justify-between gap-6 border-b-2 border-carbon pb-5">
          <div className="min-w-0 wrap-anywhere">
            {view.logo && (
              <img src={view.logo} alt="" className="mb-2.5 block max-h-12 max-w-[140px] object-contain" />
            )}
            <p className="m-0 text-base font-semibold">
              {view.from.name || "Your business"}
            </p>
            {view.from.lines.map((line, index) => (
              <p key={index} className="m-0 text-ink-60">{line}</p>
            ))}
          </div>
          <div className="shrink-0 text-right">
            <p className="m-0 text-[clamp(24px,6cqw,34px)] leading-[1.1] font-semibold">
              {view.title}
            </p>
            <p className="mt-1 mb-0 text-ink-60">{view.number}</p>
          </div>
        </header>

        <div className="mt-5 mb-6 grid grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))] gap-5">
          <div className="min-w-0 wrap-anywhere">
            <p className={`m-0 mb-1 ${LABEL}`}>{view.to.label}</p>
            <p className="m-0 font-semibold">{view.to.name || "—"}</p>
            {view.to.lines.map((line, index) => (
              <p key={index} className="m-0 text-ink-60">{line}</p>
            ))}
          </div>
          <dl className="m-0 grid content-start gap-2">
            {view.meta.map((row) => (
              <div key={row.label}>
                <dt className={LABEL}>{row.label}</dt>
                <dd className="m-0 font-medium">{row.value || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>

        {view.project && (
          <div className="mb-6 wrap-anywhere">
            {view.project.title && (
              <p className="m-0 mb-1 text-lg leading-snug font-semibold">
                {view.project.title}
              </p>
            )}
            {view.project.description && (
              <p className="m-0 whitespace-pre-line text-ink-60">{view.project.description}</p>
            )}
          </div>
        )}

        <table className="w-full border-collapse @max-[480px]:block">
          <thead className="@max-[480px]:hidden">
            <tr className={`border-b border-carbon text-right ${LABEL}`}>
              <th className="pb-1.5 text-left font-medium">Description</th>
              <th className="w-12 pb-1.5 pl-2 font-medium">Qty</th>
              <th className="w-[108px] pb-1.5 pl-2 font-medium">Unit price</th>
              <th className="w-[108px] pb-1.5 pl-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="@max-[480px]:block">
            {view.lines.length === 0 && (
              <tr className="border-b border-hairline">
                <td colSpan={4} className="py-3 text-ink-60">
                  Your items will appear here.
                </td>
              </tr>
            )}
            {view.lines.map((line) => (
              <tr
                key={line.id}
                className="border-b border-hairline align-top @max-[480px]:grid @max-[480px]:grid-cols-[1fr_auto] @max-[480px]:gap-x-3 @max-[480px]:py-2.5"
              >
                <td className="py-2.5 whitespace-pre-line wrap-anywhere @max-[480px]:col-span-2 @max-[480px]:py-0">
                  {line.description || "—"}
                </td>
                <td className="py-2.5 pl-2 text-right @max-[480px]:hidden">
                  {line.quantity}
                </td>
                <td className="py-2.5 pl-2 text-right @max-[480px]:py-0 @max-[480px]:pl-0 @max-[480px]:text-left @max-[480px]:text-ink-60">
                  <span className="hidden @max-[480px]:inline">{line.quantity} × </span>
                  {line.unitPrice}
                </td>
                <td className="py-2.5 pl-2 text-right @max-[480px]:py-0">
                  {line.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 ml-auto w-full max-w-[300px] break-inside-avoid">
          {view.totals.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 py-1">
              <span className="text-ink-60">{row.label}</span>
              <span className="text-right font-title">{row.value}</span>
            </div>
          ))}
          <div className="dw-paper-total mt-2 flex items-center justify-between gap-4 rounded-sm bg-carbon px-3.5 py-2.5 text-white">
            <span className="font-medium">{view.grandTotal.label}</span>
            <span className="text-right text-lg font-semibold wrap-anywhere">
              {view.grandTotal.value}
            </span>
          </div>
        </div>

        {view.blocks.map((block) => (
          <div key={block.heading} className="mt-5 wrap-anywhere">
            <p className="m-0 mb-0.5 font-semibold">{block.heading}</p>
            <p className="m-0 whitespace-pre-line text-ink-60">{block.body}</p>
          </div>
        ))}

        {view.footnote && (
          <p className="mt-6 mb-0 text-[11px] text-ink-60">{view.footnote}</p>
        )}

        <div className="mt-8 flex justify-end">
          <DuoworkLockup className="w-[84px]" />
        </div>
      </article>
    </div>
  );
}
