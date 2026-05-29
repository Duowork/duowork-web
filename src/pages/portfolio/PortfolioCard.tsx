import { ArrowUpRight } from "lucide-react";
import type { Project } from "./projects";

interface PortfolioCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const aspectRatioClasses = {
  "h-s": "aspect-[4/3]",
  "h-m": "aspect-[4/5]",
  "h-l": "aspect-[3/4]",
  "h-xl": "aspect-[9/13]",
  "h-w": "aspect-[5/4]",
};

export default function PortfolioCard({ project, onOpen }: PortfolioCardProps) {
  const open = () => onOpen(project);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <article
      className="break-inside-avoid block w-full mb-5.5 bg-[#2a2a2a] border border-white/6 rounded-[18px] overflow-hidden relative cursor-pointer transition-all duration-250 hover:border-duo-green-200/55 group font-archivo"
      tabIndex={0}
      role="button"
      aria-label={`Open ${project.title} case study`}
      onClick={open}
      onKeyDown={onKey}
    >
      <span className="absolute top-3.5 left-3.5 z-10 text-[11px] tracking-[0.14em] uppercase font-semibold px-2.5 py-1.5 rounded-full bg-duo-dark/75 backdrop-blur-sm text-white border border-white/10">
        {project.catLabel}
      </span>
      <span className="absolute top-3.5 right-3.5 z-10 w-9.5 h-9.5 rounded-full grid place-items-center bg-duo-green-200 text-duo-dark font-archivo-black text-[10px] border-2 border-[#2a2a2a]">
        {project.year && project.year.slice(2)}
      </span>
      <div className={`relative overflow-hidden bg-[#111] ${aspectRatioClasses[project.size as keyof typeof aspectRatioClasses] || "aspect-[4/3]"} after:content-[''] after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:from-40% after:to-black/78 after:pointer-events-none`}>
        <img
          src={project.img.src}
          alt={`${project.title} preview`}
          loading="lazy"
          className="w-full h-full object-cover! transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] scale-[1.001] saturate-95 contrast-[1.02] group-hover:scale-[1.09]"
        />
      </div>
      <div className="absolute left-0 right-0 bottom-0 z-10 px-5 pt-4.5 pb-5 flex items-end justify-between gap-3.5">
        <div>
          <h3 className="m-0 font-archivo-black text-[clamp(20px,1.6vw,26px)] leading-none tracking-[-0.01em] text-white">
            {project.title}
          </h3>
          <p className="mt-1.5 text-white/70 text-[13px] leading-[1.3] m-0">
            {project.client}
          </p>
        </div>
        <span className="flex-none w-10.5 h-10.5 rounded-full grid place-items-center bg-white text-duo-dark transition-all duration-250 group-hover:bg-duo-green-200" aria-hidden="true">
          <ArrowUpRight size={18} className="transition-transform duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-0.75 group-hover:-translate-y-0.75" />
        </span>
      </div>
    </article>
  );
}
