import { useEffect, useRef } from "react";
import Icon from "./Icon";
import IllustrativeBadge from "./IllustrativeBadge";
import type { CaseStudy } from "../data/cases";

type CaseSheetProps = {
  study: CaseStudy;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function Passage({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-8">
      <div className="text-xs font-medium tracking-[0.04em] text-ink-30 uppercase">
        {label}
      </div>
      <p className="mt-2.5 text-[17px] leading-[1.6]">{body}</p>
    </div>
  );
}

/**
 * The bottom sheet: covers the lower 75% of the viewport so the page behind
 * stays visible. Escape closes it, focus moves to the close control on open,
 * and Tab is confined to the sheet while it is up.
 *
 * Returning focus to the card that opened it is the grid's job, not this
 * component's — see CaseGrid.
 */
export default function CaseSheet({ study, onClose }: CaseSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus the close control once the sheet is in the DOM.
  useEffect(() => {
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);

  // Escape to close, Tab confined to the sheet.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !sheetRef.current) return;

      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Hold the page still behind the sheet.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-90 animate-[dwVeil_200ms_ease-out_both] bg-veil"
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${study.client} case study`}
        className="fixed right-0 bottom-0 left-0 z-91 flex h-[75vh] flex-col rounded-t-3xl bg-white shadow-sheet animate-[dwSheetUp_320ms_cubic-bezier(0.16,1,0.3,1)_both]"
      >
        {/* A downward chevron reads as "push this back down". */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="flex w-full cursor-pointer justify-center bg-transparent pt-4 pb-2 text-ink-60 transition-colors duration-200 hover:text-carbon"
        >
          <Icon name="chevronDown" size={26} strokeWidth={1.8} />
        </button>

        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-14">
          <div className="mx-auto max-w-[720px]">
            <span className="inline-block rounded-full bg-volt-tint px-3.5 py-[5px] text-[13px] font-medium text-carbon">
              {study.category}
            </span>

            <h3 className="mt-5 font-title text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
              {study.client}
            </h3>

            <Passage label="Challenge" body={study.challenge} />
            <Passage label="Solution" body={study.solution} />

            <div className="mt-10 rounded-[20px] bg-carbon p-6 text-white">
              <div className="text-xs font-medium tracking-[0.04em] text-paper-60 uppercase">
                Result
              </div>
              <p className="mt-2.5 font-title text-xl leading-[1.4] font-medium">
                {study.result}
              </p>
              {study.resultIsIllustrative && (
                <IllustrativeBadge tone="dark" className="mt-4" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
