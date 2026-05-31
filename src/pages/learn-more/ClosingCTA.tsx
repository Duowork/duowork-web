import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClosingCTA() {
  return (
    <section className="max-w-370 mx-auto pb-12 md:pb-22.5 px-5 md:px-10">
      <div className="relative overflow-hidden bg-duo-green-200 text-duo-dark rounded-[20px] md:rounded-[30px] px-7 md:px-14 py-10 md:py-15 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-8 flex-wrap">
        {/* Gradient glow */}
        <div className="absolute -bottom-37.5 md:-bottom-50 -right-25 md:-right-30 w-100 md:w-140 h-100 md:h-140 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_65%)]" />

        <div className="relative z-1 text-center md:text-left">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.14em] uppercase opacity-70">
            // let's build
          </span>
          <h2 className="font-archivo-black text-[clamp(28px,3.8vw,60px)] leading-[0.95] tracking-[-0.025em] mt-2 md:mt-3 mb-0 max-w-[17ch] text-balance">
            Ready to move at AI speed?
          </h2>
        </div>

        <div className="flex gap-2.5 md:gap-3.5 flex-wrap items-center justify-center relative z-1">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 md:gap-3 bg-duo-dark text-white px-5 md:px-7 py-3 md:py-4 rounded-full font-archivo-black text-xs md:text-sm tracking-[0.05em] uppercase transition-transform duration-200 hover:-translate-y-0.5"
          >
            Talk to us
            <ArrowUpRight className="w-3.5 md:w-4 h-3.5 md:h-4" strokeWidth={2.4} />
          </Link>
          <Link
            to="/our-work"
            className="inline-flex items-center gap-2 md:gap-2.5 text-duo-dark px-4 md:px-5 py-3 md:py-4 rounded-full border-[1.5px] border-duo-dark text-xs md:text-sm font-bold transition-all duration-200 hover:bg-duo-dark hover:text-white"
          >
            See our work
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 md:w-4 h-3.5 md:h-4"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
