import { useMemo, useState } from "react";
// import TopNav from "../components/TopNav";
import Header from "./portfolio/Header";
// import FilterBar from "./portfolio/FilterBar";
import PortfolioCard from "./portfolio/PortfolioCard";
import ProjectModal from "./portfolio/ProjectModal";
import DEFAULT_PROJECTS from "./portfolio/projects";
import { type Project } from "./portfolio/projects";
import ClosingCTA from "../components/ClosingCTA";

/* ------------------------------------------------------------------------------ */

export default function Portfolio() {
  const [filter, _] = useState("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const visible = useMemo(
    () => DEFAULT_PROJECTS.filter((p) => filter === "all" || p.cat === filter),
    [filter],
  );

  return (
    <div className="min-h-screen bg-duo-dark text-white antialiased font-archivo">
      {/* <TopNav /> */}

      <Header />

      {/* <FilterBar
        categories={CATEGORIES}
        active={filter}
        onChange={setFilter}
        count={visible.length}
      /> */}

      <section className="max-w-370 mx-auto px-10 py-9 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5.5">
          {visible.map((p) => (
            <PortfolioCard key={p.id} project={p} onOpen={setOpenProject} />
          ))}
        </div>
      </section>

      <ClosingCTA contactBtn/>

      <ProjectModal
        project={openProject}
        open={!!openProject}
        onClose={() => setOpenProject(null)}
      />
    </div>
  );
}
