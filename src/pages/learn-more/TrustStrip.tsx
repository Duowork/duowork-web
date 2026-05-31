export default function TrustStrip() {
  return (
    <section className="max-w-[1480px] mx-auto mt-5 md:mt-7 px-5 md:px-10 py-4 md:py-6 border-t border-b border-duo-grey/30 flex justify-between items-center flex-wrap gap-4 md:gap-6">
      <div className="flex items-baseline gap-2">
        <span className="font-archivo-black text-2xl md:text-[32px] tracking-[-0.02em] leading-none">
          14<span className="text-duo-green-200">d</span>
        </span>
        <span className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-white/50">
          to first impact
        </span>
      </div>

      <span className="w-px h-7 bg-duo-grey/30 hidden lg:block" />

      <div className="flex items-baseline gap-2">
        <span className="font-archivo-black text-2xl md:text-[32px] tracking-[-0.02em] leading-none">
          42<span className="text-duo-green-200">+</span>
        </span>
        <span className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-white/50">
          systems shipped
        </span>
      </div>

      <span className="w-px h-7 bg-duo-grey/30 hidden lg:block" />

      <div className="flex items-baseline gap-2">
        <span className="font-archivo-black text-2xl md:text-[32px] tracking-[-0.02em] leading-none">
          68<span className="text-duo-green-200">%</span>
        </span>
        <span className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-white/50">
          avg ops time saved
        </span>
      </div>

      <span className="w-px h-7 bg-duo-grey/30 hidden lg:block" />

      <div className="flex items-center gap-1.5 md:gap-2 text-white/50 text-[10px] md:text-xs tracking-[0.16em] uppercase w-full lg:w-auto justify-center lg:justify-start mt-2 lg:mt-0">
        <span className="w-2 h-2 rounded-full bg-duo-green-200 shadow-[0_0_0_3px_rgba(158,255,81,0.18)]" />
        <span className="hidden sm:inline">Trusted by operators across fintech, logistics &amp; health</span>
        <span className="sm:hidden">Trusted by leading operators</span>
      </div>
    </section>
  );
}
