import Container from "../components/Container";
import Section from "../components/Section";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { rise } from "../lib/motion";
import {
  STORY,
  MISSION,
  VISION,
  VALUES,
  CLOSING_QUOTE,
} from "../data/about";
import { TAGLINE } from "../data/site";

export default function About() {
  return (
    <>
      <section className="bg-white pt-[clamp(140px,20vw,200px)] pb-[clamp(56px,8vw,96px)]">
        <Container>
          <h1
            className="font-title text-[clamp(44px,6vw,84px)] leading-[1.05] font-semibold tracking-[-0.02em]"
            style={rise(0)}
          >
            We're Duowork.
          </h1>
          <p className="mt-6 text-[22px] text-ink-60" style={rise(120)}>
            {TAGLINE}
          </p>
        </Container>
      </section>

      {/* Our Story — heading left under a volt rule, prose right. */}
      <Section bare className="pb-30">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-start gap-16">
          <h2 className="border-t-2 border-volt pt-8 font-title text-[32px] font-semibold tracking-[-0.01em]">
            Our Story
          </h2>

          {/* A 4:5 founder portrait belongs beside this heading — see the
              handoff's asset list. Left out until a real photo exists. */}
          <div className="max-w-[68ch]">
            {STORY.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mb-6 text-lg leading-[1.65] last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section bare className="pb-30">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
          {[MISSION, VISION].map((block) => (
            <div key={block.heading} className="border-t border-hairline-strong pt-7">
              <h3 className="mb-3.5 font-title text-[28px] font-medium">
                {block.heading}
              </h3>
              <p className="max-w-[56ch] text-[17px] text-ink-80">{block.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <h2 className="font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
          How We Work
        </h2>
        <p className="mt-3 mb-16 text-base text-paper-70">
          Values, adapted from the Duowork Creed
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-12 gap-y-14">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 80}>
              <div
                className={`border-t pt-6 ${
                  value.accent === "volt" ? "border-volt" : "border-paper-40"
                }`}
              >
                <h3 className="mb-3 font-title text-2xl font-medium">
                  {value.title}
                </h3>
                <p className="max-w-[56ch] text-base text-paper-70">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <p className="m-0 max-w-[24ch] font-title text-[clamp(24px,2.6vw,34px)] leading-[1.3] font-medium tracking-[-0.01em]">
          {CLOSING_QUOTE}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/#contact" variant="primary" icon="arrowRight">
            Work With Us
          </Button>
          <Button to="/work" variant="secondary">
            See Our Work
          </Button>
        </div>
      </Section>
    </>
  );
}
