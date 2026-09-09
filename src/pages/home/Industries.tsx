import Section from "../../components/Section";
import Eyebrow from "../../components/Eyebrow";
import Reveal from "../../components/Reveal";
import { INDUSTRIES } from "../../data/home";

export default function Industries() {
  return (
    <Section>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-start gap-20">
        <div>
          <Eyebrow>Who we build for</Eyebrow>
          <h2 className="mt-6 mb-5 font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
            Primarily SME-focused. Built to handle more.
          </h2>
          <p className="max-w-[52ch] text-lg text-ink-60">
            Duowork's core work is with small and mid-sized businesses — the
            backbone of Nigeria's economy. We also take on select projects in:
          </p>
        </div>

        <div className="grid">
          {INDUSTRIES.map((industry, index) => (
            <Reveal key={industry.title} delay={index * 80}>
              <div className="flex items-baseline gap-6 border-t border-hairline-strong py-[26px]">
                <h3 className="min-w-[160px] font-title text-2xl font-medium">
                  {industry.title}
                </h3>
                <p className="text-base text-ink-60">{industry.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
