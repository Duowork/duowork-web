import Container from "../components/Container";
import Section from "../components/Section";
import Eyebrow from "../components/Eyebrow";
import Button from "../components/Button";
import CaseGrid from "../components/CaseGrid";
import { rise } from "../lib/motion";
import { CASES } from "../data/cases";

export default function Work() {
  return (
    <>
      <section className="bg-white pt-[clamp(140px,20vw,200px)] pb-[clamp(48px,7vw,80px)]">
        <Container>
          <span style={rise(0)} className="inline-block">
            <Eyebrow>Our work</Eyebrow>
          </span>

          <h1
            className="mt-6 max-w-[820px] font-title text-[clamp(38px,4.2vw,56px)] leading-[1.1] font-semibold tracking-[-0.01em]"
            style={rise(80)}
          >
            Every engine we've built.
          </h1>

          <p
            className="mt-6 max-w-[620px] text-lg leading-[1.6] text-ink-60"
            style={rise(160)}
          >
            Custom platforms, internal tools, and integrations built for teams
            across real estate, media, fintech, and productivity. Tap any project
            for the full challenge, solution, and result.
          </p>
        </Container>
      </section>

      <Section bare className="pb-[clamp(64px,9vw,120px)]">
        <CaseGrid cases={CASES} />
      </Section>

      <section className="bg-carbon py-[clamp(64px,9vw,112px)] text-white">
        <Container className="flex flex-wrap items-end justify-between gap-10">
          <h2 className="max-w-[640px] font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
            Have a system that should be doing more?
          </h2>
          <Button to="/#contact" variant="volt" icon="arrowRight">
            Talk to Us
          </Button>
        </Container>
      </section>
    </>
  );
}
