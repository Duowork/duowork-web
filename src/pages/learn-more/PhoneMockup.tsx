import { Check, Plus, Clock } from "lucide-react";

export default function PhoneMockup() {
  return (
    <div className="mt-auto self-center relative w-[180px] md:w-[236px] h-[225px] md:h-[296px]">
      {/* Glow */}
      <div className="absolute -bottom-8 md:-bottom-10 -right-8 md:-right-10 w-48 md:w-60 h-48 md:h-60 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(158,255,81,0.25)_0%,rgba(158,255,81,0)_60%)]" />

      {/* Phone */}
      <div className="absolute inset-0 rounded-[24px] md:rounded-[32px] bg-[#0f0f0f] border-[1.5px] border-[#333] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6),0_0_0_4px_rgba(255,255,255,0.03)] md:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6),0_0_0_6px_rgba(255,255,255,0.03)] overflow-hidden -rotate-3 translate-y-1">
        {/* Notch */}
        <div className="absolute top-2 md:top-2.5 left-1/2 -translate-x-1/2 w-[40px] md:w-[54px] h-2.5 md:h-3.5 rounded-lg bg-[#0a0a0a] z-[2]" />

        {/* Screen */}
        <div className="absolute inset-1.5 md:inset-2 rounded-2xl md:rounded-3xl bg-[#1a1a1a] pt-6 md:pt-8 px-2.5 md:px-3.5 pb-2.5 md:pb-3.5 flex flex-col gap-1.5 md:gap-2">
          <div className="font-archivo-black text-[10px] md:text-xs text-white mx-1 my-1 mb-0.5">
            Today · 6 actions
          </div>

          {/* Card 1 - Completed */}
          <div className="bg-[#262626] rounded-lg md:rounded-xl p-2 md:p-2.5 flex items-center gap-1.5 md:gap-2 border border-white/[0.05]">
            <span className="w-5 md:w-6 h-5 md:h-6 rounded-md md:rounded-lg bg-duo-green-200 flex-none grid place-items-center text-duo-dark">
              <Check className="w-3 md:w-3.5 h-3 md:h-3.5" strokeWidth={2.6} />
            </span>
            <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
              <span className="h-1 md:h-1.5 rounded-sm bg-white/85 w-3/4" />
              <span className="h-1 md:h-[5px] rounded-sm bg-white/[0.18] w-1/2" />
            </div>
          </div>

          {/* Card 2 - Pending */}
          <div className="bg-[#262626] rounded-lg md:rounded-xl p-2 md:p-2.5 flex items-center gap-1.5 md:gap-2 border border-white/[0.05]">
            <span className="w-5 md:w-6 h-5 md:h-6 rounded-md md:rounded-lg bg-[#3a3a3a] flex-none grid place-items-center text-white">
              <Plus className="w-3 md:w-3.5 h-3 md:h-3.5" strokeWidth={2.6} />
            </span>
            <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
              <span className="h-1 md:h-1.5 rounded-sm bg-white/85 w-3/5" />
              <span className="h-1 md:h-[5px] rounded-sm bg-white/[0.18] w-[38%]" />
            </div>
          </div>

          {/* Card 3 - Scheduled */}
          <div className="bg-[#262626] rounded-lg md:rounded-xl p-2 md:p-2.5 flex items-center gap-1.5 md:gap-2 border border-white/[0.05]">
            <span className="w-5 md:w-6 h-5 md:h-6 rounded-md md:rounded-lg bg-[#3a3a3a] flex-none grid place-items-center text-white">
              <Clock className="w-3 md:w-3.5 h-3 md:h-3.5" strokeWidth={2.4} />
            </span>
            <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
              <span className="h-1 md:h-1.5 rounded-sm bg-white/85 w-4/5" />
              <span className="h-1 md:h-[5px] rounded-sm bg-white/[0.18] w-[55%]" />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto bg-duo-green-200 text-duo-dark rounded-[8px] md:rounded-[10px] text-center font-archivo-black text-[9px] md:text-[11px] py-2 md:py-2.5 px-2 tracking-[0.04em]">
            SHIP UPDATE →
          </div>
        </div>
      </div>
    </div>
  );
}
