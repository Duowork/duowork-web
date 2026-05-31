import { ArrowUpRight } from "lucide-react";

export default function GrowthChart() {
  return (
    <div className="bg-[#1c1c1c] border border-duo-grey/30 rounded-[16px] md:rounded-[22px] p-4 md:p-7 flex flex-col gap-3 md:gap-4 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start gap-2 md:gap-4">
        <div>
          <span className="font-mono text-[9px] md:text-[11px] text-white/50 tracking-[0.06em]">
            <span className="hidden md:inline">// operating_leverage</span>
            <span className="md:hidden">// leverage</span>
          </span>
          <span className="font-archivo-black text-2xl md:text-4xl text-white tracking-[-0.02em] leading-none block mt-1.5 md:mt-2">
            3.4×
          </span>
          <span className="inline-flex items-center gap-1 text-duo-green-200 font-bold text-[11px] md:text-[13px] mt-1.5 md:mt-2.5">
            <ArrowUpRight className="w-3 md:w-3.5 h-3 md:h-3.5" strokeWidth={2.6} />
            compounding YoY
          </span>
        </div>
        <span className="font-mono text-[9px] md:text-[11px] text-white/50 tracking-[0.06em]">
          <span className="hidden md:inline">last 12 months</span>
          <span className="md:hidden">12m</span>
        </span>
      </div>

      {/* Chart */}
      <svg
        className="w-full h-[120px] md:h-[180px] block"
        viewBox="0 0 520 180"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(158,255,81,.34)" />
            <stop offset="100%" stopColor="rgba(158,255,81,0)" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        <line
          x1="0"
          y1="45"
          x2="520"
          y2="45"
          stroke="rgba(255,255,255,.06)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="90"
          x2="520"
          y2="90"
          stroke="rgba(255,255,255,.06)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="135"
          x2="520"
          y2="135"
          stroke="rgba(255,255,255,.06)"
          strokeWidth="1"
        />
        {/* Area */}
        <path
          d="M0 158 C 70 150 110 150 160 132 C 220 110 250 112 300 86 C 360 56 400 60 460 30 L 520 14 L 520 180 L 0 180 Z"
          fill="url(#fill)"
        />
        {/* Line */}
        <path
          d="M0 158 C 70 150 110 150 160 132 C 220 110 250 112 300 86 C 360 56 400 60 460 30 L 520 14"
          fill="none"
          stroke="var(--color-duo-green-200)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Endpoint */}
        <circle cx="520" cy="14" r="5" fill="var(--color-duo-green-200)" />
        <circle
          cx="520"
          cy="14"
          r="10"
          fill="none"
          stroke="rgba(158,255,81,.35)"
          strokeWidth="2"
        />
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between font-mono text-[8px] md:text-[10px] text-white/50 tracking-[0.04em]">
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
        <span>NOW</span>
      </div>
    </div>
  );
}
