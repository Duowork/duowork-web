import { forwardRef } from "react";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import type { CaseStudy } from "../data/cases";

type CaseCardProps = {
  study: CaseStudy;
  onOpen: () => void;
};

/**
 * The collapsed case-study card. Deliberately short — the narrative lives in
 * the sheet, and the card only has to earn the tap.
 */
const CaseCard = forwardRef<HTMLDivElement, CaseCardProps>(function CaseCard(
  { study, onOpen },
  ref
) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onOpen();
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`${study.client} — read the full case study`}
      className="cursor-pointer overflow-hidden rounded-[20px] border border-hairline bg-white transition-[transform,box-shadow] duration-200 ease-standard hover:-translate-y-1.5 hover:shadow-card"
    >
      <ImageSlot
        ratio="16 / 10"
        src={study.image}
        alt={study.imageAlt ?? ""}
        className="w-full"
      />

      <div className="px-6 pt-[22px] pb-5">
        <h3 className="font-title text-xl font-medium">{study.client}</h3>
        <div className="mt-1.5 text-[13px] font-medium tracking-[0.02em] text-ink-60">
          {study.category}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline pt-4">
          <span className="text-[13px] font-medium text-ink-60">
            Challenge, solution, result
          </span>
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-volt-card text-carbon">
            <Icon name="plus" size={14} strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
});

export default CaseCard;
