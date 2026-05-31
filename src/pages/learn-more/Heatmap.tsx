import { useEffect, useRef } from "react";

export default function Heatmap() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const COLS = 12,
      ROWS = 4,
      total = COLS * ROWS;

    for (let i = 0; i < total; i++) {
      const cell = document.createElement("span");
      const col = i % COLS;
      const centre = 1 - Math.abs(col - 5.5) / 6;
      const r = Math.random() * 0.55 + centre * 0.6;

      let bg = "rgba(255,255,255,.05)";
      if (r > 1.05) bg = "var(--color-duo-green-200)";
      else if (r > 0.85) bg = "rgba(158,255,81,.7)";
      else if (r > 0.65) bg = "rgba(158,255,81,.42)";
      else if (r > 0.45) bg = "rgba(158,255,81,.22)";
      else if (r > 0.3) bg = "rgba(158,255,81,.1)";

      cell.style.background = bg;
      cell.className = "aspect-square rounded-[5px]";
      gridRef.current?.appendChild(cell);
    }
  }, []);

  return (
    <div className="mt-auto rounded-[14px] md:rounded-[18px] overflow-hidden border border-duo-grey/30 bg-[#1c1c1c] p-3 md:p-4 grid gap-2 md:gap-3">
      <div className="flex justify-between items-center font-mono text-[9px] md:text-[11px] text-white/50 tracking-[0.06em]">
        <span className="hidden md:inline">// opportunity_map</span>
        <span className="md:hidden">// opp_map</span>
        <span className="flex items-center gap-1 md:gap-2 text-[8px] md:text-[11px]">
          LOW{" "}
          <i className="block w-6 md:w-10 h-1 md:h-1.5 rounded-full bg-gradient-to-r from-duo-green-200/[0.08] to-duo-green-200" />{" "}
          HIGH
        </span>
      </div>
      <div ref={gridRef} className="grid grid-cols-12 gap-1 md:gap-1.5" />
      <div className="flex justify-between items-center font-mono text-[9px] md:text-[11px] text-white/50 tracking-[0.06em]">
        <span className="hidden md:inline">Sales · Support · RevOps · Finance · People · Eng</span>
        <span className="md:hidden text-[8px]">6 departments</span>
        <span>32 opportunities</span>
      </div>
    </div>
  );
}
