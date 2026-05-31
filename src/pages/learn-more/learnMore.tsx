import TopNav from "../../components/TopNav";
import Hero from "./Hero";
// import TrustStrip from "./TrustStrip";
import ServiceTile from "./ServiceTile";
import Heatmap from "./Heatmap";
import PhoneMockup from "./PhoneMockup";
import StatBlock from "./StatBlock";
import IntegrationGrid from "./IntegrationGrid";
import GrowthChart from "./GrowthChart";
import ClosingCTA from "./ClosingCTA";

export default function LearnMore() {
  return (
    <section className="bg-duo-dark text-white min-h-screen">
      <TopNav />

      {/* Hero Section */}
      <Hero />

      {/* Trust Strip */}
      {/* <TrustStrip /> */}

      {/* Section Header */}
      <div className="max-w-370 mx-auto mt-12 md:mt-18 mb-5 md:mb-7 px-5 md:px-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 flex-wrap">
        <h2 className="font-archivo-black text-[clamp(26px,3vw,50px)] leading-none tracking-[-0.025em] m-0 [text-wrap:balance]">
          Five ways we move you{" "}
          <span className="text-duo-green-200">forward.</span>
        </h2>
        <p className="text-white/50 text-sm md:text-[15px] max-w-[44ch] leading-normal">
          From the first audit to long-term operating leverage — every
          engagement is built to compound, not to sit on a shelf.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-370 mx-auto px-5 md:px-10 pb-12 md:pb-20 flex flex-wrap gap-4 md:gap-6">
        {/* T1 - Discovery */}
        <ServiceTile
          step="01 — DISCOVERY"
          title="Know exactly where AI creates"
          titleHighlight="leverage in your business."
          description="Before building anything, we map your workflows, find where your team is bleeding time, and hand you a ranked action plan you can act on Monday morning."
          benefits={[
            "A prioritised roadmap — not vague recommendations",
            "A clear picture of your AI opportunity surface",
            "An executive-ready report in two weeks",
          ]}
          visualization={<Heatmap />}
          widthClass="w-full lg:flex-[1_1_calc(58.333%-12px)] min-w-0"
        />

        {/* T2 - Build */}
        <ServiceTile
          step="02 — BUILD"
          title="Launch products competitors"
          titleHighlight="can't easily copy."
          description="We design and ship web & mobile products with intelligence baked into the scope — software that streamlines, learns and gets faster over time."
          benefits={[
            "Faster time-to-market with AI-assisted dev",
            "Built-in automation from day one",
            "Scale without hiring more people",
          ]}
          visualization={<PhoneMockup />}
          widthClass="w-full lg:flex-[1_1_calc(41.667%-12px)] min-w-0"
        />

        {/* T3 - Automate */}
        <ServiceTile
          step="03 — AUTOMATE"
          title="Get hours back without hiring"
          titleHighlight="more people."
          description="We find and automate the manual, repetitive work draining your team — approvals, data-entry, comms — so they can focus on what actually matters."
          benefits={[
            "Measurable time saved from week one",
            "Fewer human errors in critical processes",
          ]}
          visualization={<StatBlock />}
          widthClass="w-full lg:flex-[1_1_calc(41.667%-12px)] min-w-0"
        />

        {/* T4 - Integrate */}
        <ServiceTile
          step="04 — INTEGRATE"
          title="Make your existing tools smarter"
          titleHighlight="without replacing them."
          description="Your team already uses software that works. We layer AI on top — connecting your CRM, operating tools and data sources so they finally work together intelligently."
          benefits={[
            "No rip-and-replace disruption",
            "Unified data across your whole organization",
            "AI assistants for your specific workflows",
          ]}
          visualization={<IntegrationGrid />}
          widthClass="w-full lg:flex-[1_1_calc(58.333%-12px)] min-w-0"
        />

        {/* T5 - Evolve (full width) */}
        <article className="w-full min-w-0 relative overflow-hidden bg-[#2a2a2a] border border-white/8 rounded-[20px] md:rounded-[28px] p-6 md:p-11 grid grid-cols-1 lg:grid-cols-[1fr_1.12fr] gap-6 md:gap-9 items-stretch transition-all duration-[250ms] hover:border-duo-green-200/32 hover:-translate-y-0.5">
          <div className="flex flex-col justify-center">
            <span className="font-mono text-[10px] md:text-xs text-duo-green-200 tracking-[0.08em] mb-3 md:mb-4 inline-flex items-center gap-2">
              <span className="w-3.5 md:w-4.5 h-px bg-duo-green-200" />
              05 — EVOLVE
            </span>

            <h3 className="font-archivo-black text-[clamp(20px,1.8vw,32px)] leading-[1.05] tracking-[-0.015em] mb-3 md:mb-4 [text-wrap:balance] min-w-0">
              Stay ahead as AI changes{" "}
              <span className="text-duo-green-200">over time.</span>
            </h3>

            <p className="text-white/72 text-sm md:text-[15px] leading-[1.55] mb-4 md:mb-5 max-w-[46ch]">
              AI is moving fast. We build systems that adapt — so you're not
              constantly rebuilding, just upgrading. Continuous improvement, not
              one-off delivery.
            </p>

            <ul className="list-none p-0 m-0 flex flex-col gap-2 md:gap-3">
              <li className="flex gap-2 md:gap-3 items-start text-xs md:text-sm text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-none w-3.5 md:w-4 h-3.5 md:h-4 text-duo-green-200 mt-0.5"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Continuous improvement, not one-off delivery</span>
              </li>
              <li className="flex gap-2 md:gap-3 items-start text-xs md:text-sm text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-none w-3.5 md:w-4 h-3.5 md:h-4 text-duo-green-200 mt-0.5"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>First access to new tools that actually matter</span>
              </li>
              <li className="flex gap-2 md:gap-3 items-start text-xs md:text-sm text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-none w-3.5 md:w-4 h-3.5 md:h-4 text-duo-green-200 mt-0.5"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Future-proof operations on a managed roadmap</span>
              </li>
            </ul>
          </div>

          <GrowthChart />
        </article>
      </div>

      {/* Closing CTA */}
      <ClosingCTA />
    </section>
  );
}
