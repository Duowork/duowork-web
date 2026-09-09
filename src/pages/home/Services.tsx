import Section from "../../components/Section";
import SectionHeading from "../../components/SectionHeading";
import Reveal from "../../components/Reveal";
import Icon from "../../components/Icon";
import { SERVICES } from "../../data/home";

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Our services"
        title="Three ways we help your business run better."
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-10 gap-y-12">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={index * 80}>
            <div className="border-t border-hairline-strong pt-7">
              <Icon
                name={service.icon}
                size={28}
                className={service.accent === "volt" ? "text-volt" : "text-carbon"}
              />
              <h3 className="mt-[22px] mb-3 font-title text-[22px] leading-[1.25] font-medium">
                {service.title}
              </h3>
              <p className="max-w-[60ch] text-base text-ink-60">{service.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
