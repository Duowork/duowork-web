import { Link } from "react-router-dom";
import Section from "../../components/Section";
import Container from "../../components/Container";
import Eyebrow from "../../components/Eyebrow";
import Icon from "../../components/Icon";
import CaseGrid from "../../components/CaseGrid";
import Marquee from "./Marquee";
import { CASES } from "../../data/cases";

export default function SelectedWork() {
  return (
    // Full-bleed so the client strip's hairlines can run the width of the page.
    <Section id="work" fullBleed>
      <Container>
        <Eyebrow>Our work</Eyebrow>

        <div className="mt-6 mb-14 flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
            A few of the engines we've built.
          </h2>

          <Link
            to="/work"
            className="inline-flex items-center gap-2 border-b border-ink-30 pb-1 text-[15px] font-medium transition-colors duration-200 hover:border-volt"
          >
            View all work
            <Icon name="arrowRight" size={15} strokeWidth={1.8} />
          </Link>
        </div>

        <CaseGrid cases={CASES} />
      </Container>

      <Marquee />
    </Section>
  );
}
