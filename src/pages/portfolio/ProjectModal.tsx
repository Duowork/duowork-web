import { useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import type { Project } from "./projects";

/* ------------------------------------------------------ */

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  open,
  onClose,
}: ProjectModalProps) {
  // ESC + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Render even when closed so we can animate exit; aria-hidden handles a11y.
  return (
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center p-8 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dw-modal-title"
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-[#0f0f0f]/78 backdrop-blur-[10px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      {project ? (
        <article
          className={`relative z-10 w-full max-w-295 max-h-[88vh] bg-[#2a2a2a] border border-white/8 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] transition-all duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)] font-archivo ${open ? "translate-y-0 scale-100 opacity-100" : "translate-y-5 scale-[0.985] opacity-0"}`}
        >
          <button
            className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full grid place-items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:border-white/20"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="relative bg-[#111] min-h-120 overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/15 after:to-black/55">
            <img
              src={project.img.src}
              alt={project.title}
              className="w-full h-full object-contain absolute inset-0"
            />
            <span className="relative z-10 m-6 inline-block text-[11px] tracking-[0.18em] uppercase font-semibold bg-[#9eff51] text-[#222222] px-3 py-2 rounded-full">
              {project.catLabel}
            </span>
          </div>
          <div className="px-10.5 py-10.5 overflow-auto flex flex-col gap-5.5">
            <div className="text-white/50 text-xs tracking-[0.2em] uppercase flex gap-3.5 items-center">
              <span>{project.client}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </div>
            <h2
              id="dw-modal-title"
              className="font-archivo-black text-[clamp(36px,4.4vw,58px)] leading-[0.95] tracking-[-0.015em] m-0 text-white"
            >
              {project.title}
              <span className="text-duo-green-200">.</span>
            </h2>
            <p className="text-[17px] leading-[1.55] text-white/70 m-0">
              {project.cap}
            </p>

            <dl className="grid grid-cols-2 gap-4.5 gap-x-6.5 py-5.5 border-t border-b border-[#3a3a3a] m-0">
              <div>
                <dt className="text-[11px] tracking-[0.18em] uppercase text-white/50 mb-1.5">
                  Role
                </dt>
                <dd className="m-0 text-[15px] text-white font-medium">
                  {project.role}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.18em] uppercase text-white/50 mb-1.5">
                  Timeline
                </dt>
                <dd className="m-0 text-[15px] text-white font-medium">
                  {project.time}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.18em] uppercase text-white/50 mb-1.5">
                  Platform
                </dt>
                <dd className="m-0 text-[15px] text-white font-medium">
                  {project.platform}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.18em] uppercase text-white/50 mb-1.5">
                  Outcome
                </dt>
                <dd className="m-0 text-[15px] text-white font-medium">
                  {project.outcome}
                </dd>
              </div>
            </dl>

            {/* <div>
              <div className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2.5">
                Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs tracking-[0.04em] px-3 py-1.5 rounded-full border border-[#3a3a3a] text-white/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div> */}

            <div className="flex items-center gap-3.5 mt-auto flex-wrap">
              <a
                className="flex-none inline-flex items-center gap-3 bg-duo-green-200 text-duo-dark px-5.5 py-4 rounded-full font-archivo-black text-sm tracking-[0.04em] uppercase transition-transform duration-200 hover:-translate-y-0.5"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live project
                <ArrowUpRight size={16} />
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-2.5 px-4.5 py-3.5 rounded-full border border-[#3a3a3a] text-sm text-white/70 cursor-pointer bg-transparent hover:border-[#9eff51] hover:text-white"
                onClick={onClose}
              >
                Close preview
              </button>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  );
}
