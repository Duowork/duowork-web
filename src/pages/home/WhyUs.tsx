import Section from "../../components/Section";
import SectionHeading from "../../components/SectionHeading";
import Reveal from "../../components/Reveal";
import Icon from "../../components/Icon";
import { WHY_US } from "../../data/home";

export default function WhyUs() {
  return (
    <Section>
      <SectionHeading eyebrow="Why us" title="A technical partner, not just a vendor." />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6">
        {WHY_US.map((reason, index) => (
          <Reveal key={reason.title} delay={index * 80}>
            <div className="h-full rounded-[20px] border border-hairline bg-white p-8">
              <Icon
                name={reason.icon}
                size={28}
                className={reason.accent === "volt" ? "text-volt" : "text-carbon"}
              />
              <h3 className="mt-6 mb-3 font-title text-[22px] leading-[1.25] font-medium">
                {reason.title}
              </h3>
              <p className="text-base text-ink-60">{reason.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
