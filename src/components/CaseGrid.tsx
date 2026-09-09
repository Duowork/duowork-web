import { useRef, useState } from "react";
import CaseCard from "./CaseCard";
import CaseSheet from "./CaseSheet";
import Reveal from "./Reveal";
import type { CaseStudy } from "../data/cases";

type CaseGridProps = {
  cases: CaseStudy[];
};

/**
 * Owns which case study is open, and returns focus to the card that opened the
 * sheet once it closes — the piece of the interaction neither the card nor the
 * sheet can do alone.
 */
export default function CaseGrid({ cases }: CaseGridProps) {
  const [openIndex, setOpenIndex] = useState(-1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const close = () => {
    const opener = cardRefs.current[openIndex];
    setOpenIndex(-1);
    opener?.focus();
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6">
        {cases.map((study, index) => (
          <Reveal key={study.id} delay={index * 80}>
            <CaseCard
              study={study}
              onOpen={() => setOpenIndex(index)}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          </Reveal>
        ))}
      </div>

      {openIndex > -1 && (
        <CaseSheet study={cases[openIndex]} onClose={close} />
      )}
    </>
  );
}
