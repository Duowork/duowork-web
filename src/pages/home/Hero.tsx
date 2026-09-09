import Button from "../../components/Button";
import Container from "../../components/Container";
import BrowserMock from "../../components/BrowserMock";
import ImageSlot from "../../components/ImageSlot";
import Eyebrow from "../../components/Eyebrow";
import { rise, riseSlow } from "../../lib/motion";

export default function Hero() {
  return (
    <section className="bg-white pt-[clamp(128px,18vw,176px)] pb-[clamp(64px,9vw,120px)]">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-[clamp(40px,5vw,64px)]">
        <div>
          <span style={rise(0)} className="inline-block">
            <Eyebrow>Software studio</Eyebrow>
          </span>

          <h1 className="mt-6 font-title text-[clamp(38px,4.2vw,56px)] leading-[1.1] font-semibold tracking-[-0.01em]">
            <span className="block" style={rise(80)}>
              We build engines that
            </span>
            <span className="block" style={rise(160)}>
              understand your business,
            </span>
            <span className="relative block" style={rise(240)}>
              {/*
                The volt bar scales in from the left and sits behind the text.
                Both children are positioned with z-index auto, so paint order
                is DOM order: bar first, text over it. The design specifies
                z-index:-1 on the bar, but that would paint it behind the
                section's white background and hide it entirely.
              */}
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 h-2.5 w-full origin-left bg-volt"
                style={{
                  animation:
                    "dwUnderline 600ms cubic-bezier(0.4,0,0.2,1) 560ms both",
                }}
              />
              <span className="relative">and how it operates.</span>
            </span>
          </h1>

          <p
            className="mt-7 max-w-[560px] text-lg leading-[1.6] text-ink-60"
            style={rise(340)}
          >
            Duowork designs, builds, and integrates the software that runs your
            business — from custom platforms to enterprise systems that finally
            talk to each other. Rooted in Nigeria. Built to global standard.
          </p>

          <div className="mt-10 flex flex-wrap gap-3" style={rise(420)}>
            <Button to="/#contact" variant="primary" icon="arrowRight">
              Talk to Us
            </Button>
            <Button to="/work" variant="secondary">
              See Our Work
            </Button>
          </div>
        </div>

        <div style={riseSlow(300)}>
          <BrowserMock elevated urlField>
            <ImageSlot
              ratio="4 / 3"
              label="Product screenshot — placeholder"
              className="w-full"
            />
          </BrowserMock>
        </div>
      </Container>
    </section>
  );
}
