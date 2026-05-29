import type { Category } from "./projects";

/* -------------------------------------------------- */

interface FilterBarProps {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
  count: number;
}

export default function FilterBar({
  categories,
  active,
  onChange,
  count,
}: FilterBarProps) {
  return (
    <section className="max-w-370 mx-auto mt-9 px-10 py-7 flex flex-wrap gap-3.5 items-center border-t border-b border-[#3a3a3a] font-title">
      <span className="font-archivo-black text-sm tracking-[0.04em] px-3.5 py-2 rounded-full bg-duo-green-200 text-duo-dark">
        {count} {count === 1 ? "Project" : "Projects"}
      </span>

      <div className="flex flex-wrap gap-2.5 ml-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`px-4.5 py-2 rounded-full border text-sm font-medium tracking-[0.01em] transition-all duration-200 ${
              active === c.id
                ? "bg-duo-green-200 text-duo-dark border-duo-green-200 font-semibold"
                : "bg-transparent text-white border-duo-green-200 hover:bg-duo-green-200/10"
            }`}
            onClick={() => onChange(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </section>
  );
}
