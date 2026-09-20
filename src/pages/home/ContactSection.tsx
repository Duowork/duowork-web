import Container from "../../components/Container";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import ContactForm from "./ContactForm";
import { useReveal } from "../../hooks/useReveal";
import { CONTACT } from "../../data/site";

/**
 * Contact. Two routes to the same conversation, deliberately equal in weight:
 * the call button and direct details on the left, the form on the right.
 * Prospects who want to talk shouldn't have to type.
 */
export default function ContactSection() {
  // The volt wash sweeps in once, the first time the section is seen.
  const washRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-carbon py-[clamp(72px,10vw,140px)] text-white"
    >
      {/*
        Background photo, anchored left. It carries its own carbon scrim so the
        heading stays legible from first paint — the volt wash above it animates
        in and must never be what makes the text readable.
      */}
      <div
        aria-hidden="true"
        className="dw-contact-photo absolute inset-y-0 left-0 w-full lg:w-[62%]"
      />

      {/* Volt-to-carbon wash, left to right, revealed once on scroll. */}
      <div
        ref={washRef}
        aria-hidden="true"
        className="dw-wash absolute inset-0"
      />

      <Container className="relative grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-start gap-[clamp(40px,6vw,80px)]">
        <div>
          <h2 className="font-title text-[clamp(30px,3.4vw,44px)] leading-[1.15] font-semibold tracking-[-0.01em]">
            Let's build what your business actually needs.
          </h2>

          <p className="mt-5 mb-9 max-w-[46ch] text-lg leading-[1.6] text-paper-70">
            Whether it's one integration or a full system rebuild, we start with
            a conversation — not a sales pitch.
          </p>

          <Button
            href={`mailto:${CONTACT.email}?subject=Discovery%20call`}
            variant="white"
            icon="arrowRight"
          >
            Book a Discovery Call
          </Button>

          <div className="mt-9 grid gap-3.5 border-t border-hairline-dark pt-8">
            <div className="text-[13px] font-medium tracking-[0.04em] text-paper-60">
              Or reach us directly
            </div>

            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex w-fit items-center gap-2.5 text-base transition-colors duration-200 hover:text-volt"
            >
              <Icon name="mail" size={18} />
              {CONTACT.email}
            </a>

            <a
              href={CONTACT.phoneHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2.5 text-base transition-colors duration-200 hover:text-volt"
            >
              <Icon name="phone" size={18} />
              {CONTACT.phone}
              <span className="text-sm text-paper-60">
                ({CONTACT.phoneNote})
              </span>
            </a>

            <div className="text-sm text-paper-60">{CONTACT.location}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-hairline-dark bg-surface-dark p-[clamp(24px,3vw,36px)]">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
