import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="max-w-370 mx-auto px-5 md:px-10 pt-8 md:pt-16 pb-7 grid grid-cols-1 lg:grid-cols-[1.32fr_1fr] gap-4 md:gap-6 items-stretch">
      {/* Main Content */}
      <div className="relative overflow-hidden rounded-[20px] md:rounded-[30px] bg-linear-to-b from-[#272727] to-[#1d1d1d] border border-white/8 px-7 md:px-14 py-10 md:py-13 flex flex-col justify-between gap-8 md:gap-11">
        {/* Gradient glow */}
        <div className="absolute -bottom-45 -right-35 w-140 h-140 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(158,255,81,0.2)_0%,rgba(158,255,81,0)_60%)]" />

        <div className="relative z-10">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2.5 text-xs tracking-[0.22em] uppercase bg-duo-green-200/12 border border-duo-green-200/32 rounded-full px-3.5 py-1.5">
            WHAT WE DO
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
            className="w-full sm:max-w-50 inline-flex items-center gap-2.5 text-white px-5 py-3.5 rounded-[14px] border border-duo-dark text-sm font-medium transition-all duration-200 hover:border-duo-green-200 hover:text-duo-green-200"
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

      {/* Side Image */}
      <aside className="relative rounded-[20px] md:rounded-[30px] overflow-hidden border border-white/8 min-h-75 md:min-h-110 bg-duo-dark">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="Team collaborating in a workspace"
          src="/what-we-do/hero-image.webp"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-linear-to-b from-[rgba(20,20,20,0.1)] to-[rgba(18,18,18,0.86)]" />

        {/* Floating content */}
        <div className="absolute z-2 left-3 md:left-5 right-3 md:right-5 bottom-3 md:bottom-5 flex flex-col md:flex-row items-start md:items-end justify-between gap-2 md:gap-3.5 pointer-events-none">
          <div>
            <div className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-white/72">
              In the room with you
            </div>
            <div className="font-archivo-black text-base md:text-xl mt-1 md:mt-1.5 leading-none">
              Build partners, not vendors.
            </div>
          </div>
          {/* <span className="flex-none inline-flex items-center gap-1.5 md:gap-2 bg-duo-green-200 text-duo-dark px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-full font-archivo-black text-[10px] md:text-xs tracking-[0.02em] pointer-events-auto">
            <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5" strokeWidth={2.4} />
            AI-native
          </span> */}
        </div>
      </aside>
    </header>
  );
}
