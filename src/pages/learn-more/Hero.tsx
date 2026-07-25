import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="max-w-370 mx-auto px-5 md:px-10 pt-8 md:pt-16 pb-7 gap-4 md:gap-6 items-stretch pt-[150px]!">
      {/* Main Content */}
      <div className="relative overflow-hidden rounded-[20px] md:rounded-[30px] bg-linear-to-b from-[#272727] to-[#1d1d1d] border border-white/8 px-7 md:px-14 py-10 md:py-13 flex flex-col justify-between gap-8 md:gap-11">

        <div className="relative z-10">
          {/* Eyebrow */}
          <span className="text-xs tracking-[0.22em] uppercase text-duo-green-200 font-archivo">
            // What we do
          </span>

          {/* Heading */}
          <h1 className="font-archivo-black text-[clamp(32px,5.2vw,84px)] leading-[0.95] tracking-[-0.025em] mt-3 md:mt-5 mb-0 [text-wrap:balance]">
            We help businesses operate at{" "}
            <span className="text-duo-green-200">AI speed.</span>
          </h1>

          {/* Subheading */}
          <p className="text-white/72 text-base md:text-lg leading-[1.55] max-w-[46ch] mt-3 md:mt-5 mb-0">
            Not just websites.{" "}
            <strong className="text-white font-semibold">
              Systems, products and workflows
            </strong>{" "}
            that compound over time — engineered for teams that can't afford to
            move slow.
          </p>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex flex-wrap gap-3.5 items-center justify">
          <Link
            to="/contact"
            className="w-full sm:max-w-50 inline-flex items-center gap-3 bg-duo-green-200 text-duo-dark px-7 py-4 rounded-[14px] font-archivo-black text-sm tracking-[0.05em] uppercase shadow-[0_14px_32px_-14px_rgba(158,255,81,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Talk to us
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
          </Link>
          <Link
            to="/our-work"
            className="w-full sm:max-w-50 inline-flex items-center gap-2.5 text-white px-5 py-3.5 rounded-[14px] border border-duo-green-200 text-sm font-medium transition-all duration-200"
          >
            See selected work
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
