import { useEffect, useRef } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Eyebrow from "../../components/Eyebrow";
import Icon from "../../components/Icon";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { rise } from "../../lib/motion";
import { HERO_MARQUEE, HERO_VIDEO } from "../../data/home";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Hold the footage on a single frame when the viewer asks for less motion.
  // A looping aerial shot is exactly the kind of ambient movement that setting
  // exists to stop.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
    } else {
      // Autoplay can be refused (low power mode, for one). Nothing breaks if it
      // is — the scrim over carbon still reads as a deliberate dark hero.
      void video.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    // min-h rather than a fixed h: on narrow phones the headline wraps to more
    // lines, and a fixed height would clip it against `overflow-hidden`.
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden bg-carbon text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_VIDEO.poster}
        aria-hidden="true"
        tabIndex={-1}
      >
        {HERO_VIDEO.webm && <source src={HERO_VIDEO.webm} type="video/webm" />}
        <source src={HERO_VIDEO.mp4} type="video/mp4" />
      </video>

      {/* Bottom-up scrim. The copy sits at the base, so that is where it is heaviest. */}
      <div aria-hidden="true" className="dw-hero-scrim absolute inset-0" />

      {/*
        The copy starts just below the floating nav and the base strip is pushed
        to the foot by `mt-auto`, so the block spans the section. Bottom-anchoring
        the whole column instead leaves a dead gap under the nav.
      */}
      <Container className="relative flex flex-1 flex-col pt-[clamp(104px,12vh,148px)] pb-[clamp(24px,4vh,48px)]">
        <span style={rise(0)} className="inline-block w-fit">
          <Eyebrow tone="outline">Software Studio · Lagos</Eyebrow>
        </span>

        <h1 className="mt-[clamp(20px,3.5vh,40px)] font-title text-[clamp(38px,5.4vw,72px)] leading-[1.06] font-semibold tracking-[-0.02em]">
          <span className="block" style={rise(80)}>
            We build engines that
          </span>
          <span className="block" style={rise(160)}>
            understand your business,
          </span>
          {/*
            The underline is a background on the inline text rather than an
            absolutely positioned bar, so `box-decoration-break: clone` draws it
            under each wrapped line. A sized bar tracks the span's box, which is
            as wide as the longest line — it overshoots the sentence badly once
            the headline wraps on a phone.
          */}
          <span className="block" style={rise(240)}>
            <span className="dw-underline">and how it operates.</span>
          </span>
        </h1>

        <p
          className="mt-[clamp(18px,3vh,36px)] max-w-[560px] text-lg leading-[1.6] text-paper-70"
          style={rise(340)}
        >
          Duowork designs, builds, and integrates the software that runs your
          business — from custom platforms to enterprise systems that finally
          talk to each other. Rooted in Nigeria. Built to global standard.
        </p>

        <div
          className="mt-[clamp(22px,4vh,44px)] flex flex-wrap gap-3"
          style={rise(420)}
        >
          <Button to="/#contact" variant="volt" icon="arrowRight">
            Talk to Us
          </Button>
          <Button to="/work" variant="ghost">
            See Our Work
          </Button>
        </div>

        <div
          className="mt-auto flex items-center gap-8 border-t border-white/15 pt-6"
          style={rise(500)}
        >
          <div className="dw-hero-marquee relative min-w-0 flex-1 overflow-hidden">
            <div className="flex w-max animate-[dwMarquee_32s_linear_infinite]">
              {HERO_MARQUEE.map((item) => (
                <span key={item} className="dw-hero-marquee-item">
                  {item}
                </span>
              ))}
              {/* Second pass completes the loop; hidden so it is not read twice. */}
              {HERO_MARQUEE.map((item) => (
                <span
                  key={`${item}-loop`}
                  className="dw-hero-marquee-item"
                  aria-hidden="true"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <span className="flex shrink-0 items-center gap-2 text-[12px] font-medium tracking-[0.14em] text-paper-60 uppercase">
            Scroll
            <Icon name="arrowDown" size={16} strokeWidth={1.6} />
          </span>
        </div>
      </Container>
    </section>
  );
}
