import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface ServiceTileProps {
  step: string;
  title: string;
  titleHighlight?: string;
  description: string;
  benefits: string[];
  visualization?: ReactNode;
  widthClass?: string;
}

export default function ServiceTile({
  step,
  title,
  titleHighlight,
  description,
  benefits,
  visualization,
  widthClass = "flex-[1_1_calc(58.333%-12px)]",
}: ServiceTileProps) {
  return (
    <article
      className={`${widthClass} min-w-0 relative overflow-hidden bg-[#2a2a2a] rounded-[20px] md:rounded-[28px] p-6 md:p-9 flex flex-col transition-all duration-[250ms]`}
    >
      <div className="flex-1 flex flex-col min-w-0">
        <span className="font-mono text-[10px] md:text-xs text-duo-green-200 tracking-[0.08em] mb-3 md:mb-4 inline-flex items-center gap-2">
          <span className="w-[14px] md:w-[18px] h-px bg-duo-green-200" />
          {step}
        </span>

        <h3 className="font-archivo-black text-[clamp(20px,1.8vw,32px)] leading-[1.05] tracking-[-0.015em] mb-3 md:mb-4 [text-wrap:balance] min-w-0">
          {title}
          {titleHighlight && (
            <span className="text-duo-green-200"> {titleHighlight}</span>
          )}
        </h3>

        <p className="text-white/[0.72] text-sm md:text-[15px] leading-[1.55] mb-4 md:mb-5 max-w-[46ch]">
          {description}
        </p>

        <ul className="list-none p-0 m-0 flex flex-col gap-2 md:gap-3">
          {benefits.map((benefit, idx) => (
            <li
              key={idx}
              className="flex gap-2 md:gap-3 items-start text-xs md:text-sm text-white"
            >
              <Check
                className="flex-none w-3.5 md:w-4 h-3.5 md:h-4 text-duo-green-200 mt-0.5"
                strokeWidth={2.4}
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {visualization && <div className="mt-4 md:mt-6">{visualization}</div>}
    </article>
  );
}
