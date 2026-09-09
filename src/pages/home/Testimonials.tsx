import Section from "../../components/Section";
import Reveal from "../../components/Reveal";
import IllustrativeBadge from "../../components/IllustrativeBadge";
import { TESTIMONIALS } from "../../data/home";

export default function Testimonials() {
  return (
    <Section>
      <h2 className="mb-14 font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
        Don't take our word for it.
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <Reveal key={testimonial.role} delay={index * 120}>
            <figure className="m-0 h-full rounded-[20px] border border-hairline bg-white p-10">
              <blockquote className="m-0 font-title text-2xl leading-[1.35] font-normal">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3.5">
                {/* A real face or nothing — never a generated avatar. */}
                {testimonial.headshot ? (
                  <img
                    src={testimonial.headshot}
                    alt=""
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="size-10 rounded-full bg-hairline" />
                )}

                <span>
                  <span className="block text-[15px] font-medium">
                    {testimonial.name}
                  </span>
                  <span className="block text-sm text-ink-60">
                    {testimonial.role}
                  </span>
                </span>

                {testimonial.nameIsIllustrative && (
                  <IllustrativeBadge className="ml-auto" />
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
