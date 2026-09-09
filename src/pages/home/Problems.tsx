import Section from "../../components/Section";
import SectionHeading from "../../components/SectionHeading";
import Reveal from "../../components/Reveal";
import Icon from "../../components/Icon";
import { PROBLEMS } from "../../data/home";

export default function Problems() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The industry dilemma"
        title="Growing a business shouldn't mean fighting your own tools."
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6">
        {PROBLEMS.map((problem, index) => (
          <Reveal key={problem.title} delay={index * 150}>
            <div className="h-full rounded-[20px] border border-hairline bg-white p-8">
              <Icon name={problem.icon} size={28} className="text-carbon" />
              <h3 className="mt-6 mb-3 font-title text-[22px] leading-[1.2] font-medium">
                {problem.title}
              </h3>
              <p className="text-base text-ink-60">{problem.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
