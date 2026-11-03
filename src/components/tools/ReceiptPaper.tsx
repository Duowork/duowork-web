import type { ReceiptView } from "../../lib/tools/receipt";

const LABEL = "text-[11px] font-medium tracking-[0.02em] text-ink-60";

/** The on-screen receipt. Keep in step with lib/tools/pdf/ReceiptPdf.tsx. */
export default function ReceiptPaper({ view }: { view: ReceiptView }) {
  if (view.layout === "compact") {
    return (
      <article
        aria-label="Receipt preview"
        className="dw-paper font-title mx-auto w-full max-w-[320px] rounded-sm bg-white p-6 text-[13px] leading-normal text-carbon shadow-mock"
      >
        <div className="text-center wrap-anywhere">
          {view.logo && (
            <img src={view.logo} alt="" className="mx-auto mb-2 block max-h-10 max-w-[120px] object-contain" />
          )}
          <p className="m-0 font-semibold">{view.from.name || "Your business"}</p>
          {view.from.lines.map((line, index) => (
            <p key={index} className="m-0 text-xs text-ink-60">{line}</p>
          ))}
          <p className="mt-3 mb-0 text-xl font-semibold">Receipt</p>
          <p className="m-0 text-xs text-ink-60">{view.number}</p>
        </div>

        <div className="my-4 border-y border-carbon py-3 text-center">
          <p className={`m-0 ${LABEL}`}>Amount paid</p>
          <p className="m-0 text-2xl font-semibold wrap-anywhere">{view.amountPaid}</p>
        </div>

        <dl className="m-0 grid gap-1.5 text-xs">
          <div className="flex justify-between gap-4">
            <dt className="font-medium text-ink-60">Received from</dt>
            <dd className="m-0 text-right wrap-anywhere">{view.receivedFrom.name || "—"}</dd>
          </div>
          {view.meta.map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt className="font-medium text-ink-60">{row.label}</dt>
              <dd className="m-0 text-right wrap-anywhere">{row.value || "—"}</dd>
            </div>
          ))}
          {view.balance && (
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-ink-60">Balance</dt>
              <dd className="m-0 text-right font-medium">{view.balance}</dd>
            </div>
          )}
        </dl>

        <div className="mt-3 text-xs wrap-anywhere">
          <p className="m-0 font-medium text-ink-60">For</p>
          <p className="m-0 whitespace-pre-line">{view.description || "—"}</p>
        </div>

        {view.notes && (
          <p className="mt-3 mb-0 text-center text-xs whitespace-pre-line text-ink-60 wrap-anywhere">
            {view.notes}
          </p>
        )}
      </article>
    );
  }

  return (
    <div className="@container">
      <article
        aria-label="Receipt preview"
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
              Receipt
            </p>
            <p className="mt-1 mb-0 text-ink-60">{view.number}</p>
          </div>
        </header>

        <div className="dw-paper-total mt-5 rounded-sm bg-carbon p-4 text-white">
          <p className="m-0 font-medium">Amount paid</p>
          <p className="m-0 text-[clamp(24px,6cqw,34px)] leading-[1.2] font-semibold wrap-anywhere">
            {view.amountPaid}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-6">
          <div className="min-w-0 wrap-anywhere">
            <p className={`m-0 mb-1 ${LABEL}`}>Received from</p>
            <p className="m-0 font-semibold">{view.receivedFrom.name || "—"}</p>
            {view.receivedFrom.lines.map((line, index) => (
              <p key={index} className="m-0 text-ink-60">{line}</p>
            ))}
            <p className={`mt-4 mb-1 ${LABEL}`}>Payment for</p>
            <p className="m-0 whitespace-pre-line">{view.description || "—"}</p>
          </div>

          <dl className="m-0">
            {view.meta.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 border-b border-hairline py-2">
                <dt className="text-ink-60">{row.label}</dt>
                <dd className="m-0 text-right font-medium wrap-anywhere">{row.value || "—"}</dd>
              </div>
            ))}
            {view.balance && (
              <div className="flex justify-between gap-4 border-b border-hairline py-2">
                <dt className="text-ink-60">Balance outstanding</dt>
                <dd className="m-0 text-right font-medium">{view.balance}</dd>
              </div>
            )}
          </dl>
        </div>

        {view.notes && (
          <div className="mt-5 wrap-anywhere">
            <p className={`m-0 mb-1 ${LABEL}`}>Notes</p>
            <p className="m-0 whitespace-pre-line text-ink-60">{view.notes}</p>
          </div>
        )}
      </article>
    </div>
  );
}
