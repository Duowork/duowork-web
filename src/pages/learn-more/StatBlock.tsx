export default function StatBlock() {
  return (
    <div className="mt-auto grid gap-2 md:gap-3">
      {/* Main stat */}
      <div className="bg-duo-green-200 text-duo-dark rounded-[16px] md:rounded-[22px] p-4 md:p-6 flex items-end justify-between gap-3 md:gap-4 overflow-hidden relative">
        {/* Glow */}
        <div className="absolute -bottom-[40px] md:-bottom-[50px] -right-8 md:-right-10 w-[160px] md:w-[210px] h-[160px] md:h-[210px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_60%)]" />

        <div className="relative font-archivo-black text-[clamp(40px,6vw,82px)] leading-[0.86] tracking-[-0.04em]">
          31<span className="text-[0.34em] tracking-[-0.01em] ml-0.5">hrs</span>
        </div>
        <div className="relative text-[10px] md:text-xs leading-[1.35] max-w-[13ch] text-right font-bold uppercase tracking-[0.08em]">
          saved per week, on average
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <div className="bg-[#1c1c1c] border border-duo-grey/30 rounded-[12px] md:rounded-[14px] p-3 md:p-4">
          <div className="font-archivo-black text-xl md:text-[26px] text-white tracking-[-0.02em] leading-none">
            6<span className="text-duo-green-200">→1</span>
          </div>
          <div className="text-white/50 text-[9px] md:text-[11px] tracking-[0.08em] uppercase mt-1 md:mt-1.5">
            Tools replaced
          </div>
        </div>
        <div className="bg-[#1c1c1c] border border-duo-grey/30 rounded-[12px] md:rounded-[14px] p-3 md:p-4">
          <div className="font-archivo-black text-xl md:text-[26px] text-white tracking-[-0.02em] leading-none">
            99<span className="text-duo-green-200">.4%</span>
          </div>
          <div className="text-white/50 text-[9px] md:text-[11px] tracking-[0.08em] uppercase mt-1 md:mt-1.5">
            Run accuracy
          </div>
        </div>
      </div>
    </div>
  );
}
