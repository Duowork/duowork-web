import { useEffect, useRef, useState } from "react";
import Section from "../../components/Section";
import SectionHeading from "../../components/SectionHeading";
import { PROCESS } from "../../data/home";

/**
 * The timeline's progress line grows with scroll position, and each step lights
 * up as the line passes it. The scroll math is specified in the handoff:
 *
 *   progress = (viewportHeight * 0.75 - wrapperTop) / (wrapperHeight * 0.85)
 *
 * clamped to 0–1, and a step lights once its top + 24px sits above
 * wrapperTop + wrapperHeight * 0.85 * progress.
 */
export default function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const { top: wrapperTop, height: wrapperHeight } =
        wrapper.getBoundingClientRect();

      const span = wrapperHeight * 0.85;
      const next = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.75 - wrapperTop) / span)
      );

      const threshold = wrapperTop + span * next;
      const lit = stepRefs.current.filter((step) => {
        if (!step) return false;
        return step.getBoundingClientRect().top + 24 <= threshold;
      }).length;

      setProgress(next);
      setLitCount(lit);
    };

    // Throttle to one measurement per frame — the handoff calls this out.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="Our process"
        tone="dark"
        title="From first conversation to long-term partner."
        gap="mb-[72px]"
      />

      <div ref={wrapperRef} className="relative pl-[72px]">
        {/* Track */}
        <div className="absolute top-2 bottom-2 left-[23px] w-px bg-white/18" />
        {/* Progress */}
        <div
          className="absolute top-2 bottom-2 left-[23px] w-px origin-top bg-white"
          style={{ transform: `scaleY(${progress})` }}
        />

        <div className="grid gap-14">
          {PROCESS.map((step, index) => {
            const isLast = index === PROCESS.length - 1;
            const lit = index < litCount;

            return (
              <div
                key={step.step}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className="relative transition-opacity duration-500 ease-standard"
                style={{ opacity: lit ? 1 : 0.25 }}
              >
                <span
                  className={`absolute top-0.5 -left-[72px] inline-flex size-12 items-center justify-center rounded-full border font-title text-[17px] font-semibold ${
                    isLast
                      ? "border-volt bg-volt text-carbon"
                      : "border-paper-40 bg-transparent text-white"
                  }`}
                >
                  {step.step}
                </span>

                <h3 className="mb-2.5 font-title text-2xl font-medium">
                  {step.title}
                </h3>
                <p className="max-w-[62ch] text-base text-paper-70">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
