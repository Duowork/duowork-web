export default function Header() {
  return (
    <header className="max-w-370 mx-auto px-10 pt-24 pb-9 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-15 items-end font-archivo">
      <div>
        <div className="inline-flex items-center gap-2.5 text-xs tracking-[0.22em] uppercase text-duo-green-200 before:content-[''] before:w-7 before:h-px before:bg-duo-green-200">
          Our work
        </div>
        <h1 className="font-archivo-black text-[clamp(56px,7.5vw,128px)] leading-[0.92] tracking-[-0.02em] mt-4.5 text-white">
          Work that ships<span className="text-duo-green-200">.</span>
        </h1>
      </div>
      <div className="text-white/70 text-[17px] leading-[1.55] max-w-[46ch] pb-3.5">
        <strong className="text-white font-semibold font-body">
          Real products, real outcomes.
        </strong>{" "}
        From zero-to-one MVPs to AI Automation — we build and integrate what
        businesses need to move fast with confidence.
      </div>
    </header>
  );
}
