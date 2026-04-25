import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import TopNav from "../components/TopNav";
import Button from "../components/Button";

/* ------------------------------------------------ */

export default function LearnMore() {
  const services = [
    {
      title: "Know exactly where AI create leverage in your business",
      description:
        "Before building anything, we map your workflows, identify where your team is losing time, and deliver a ranked action plan.",
      result: [
        "Prioritize roadmap, not vague recommendation",
        "A clear picture of your AI opportunities",
        "Executive ready-report in 2 weeks",
      ],
      tag: "start here",
    },
    {
      title: "Launch products your competitors can't easily copy",
      description:
        "We design and build web and mobile app products with intelligence baked-in by the scope. Product that streamline, learn, adapt, and get faster over time.",
      result: [
        "Faster time-to-market with AI-assisted development",
        "Built-in automation from day one",
        "Scale without necessarily hiring more people",
      ],
      tag: "Build",
    },
    {
      title: "Get hours back without hiring more people",
      description:
        "We identify and automate the manual, repetitive work draining your team (approvals, data-entry, communication) so they can focus on what matters",
      result: [
        "Measure time saved from week one",
        "Fewer human errors in critical processes",
        "Works with your existing tools",
      ],
      tag: "Automate",
    },
    {
      title: "Make your existing tools smarter without replacing them",
      description:
        "Your team already uses software that works. We layer AI on top of it. connecting your CRM, operating tools, data sources so they work together intelligently.",
      result: [
        "No rip-and-replace disruption",
        "Unified data your organization",
        "AI assistants for your specific workflows",
      ],
      tag: "Integrate",
    },
    {
      title: "Stay ahead as AI changes overtime",
      description:
        "AI is moving fast. We help you build systems that adapt so you're not constantly rebuilding, just upgrading.",
      result: [
        "Continuous improvement, not one-off delivery",
        "First access to new tools that matter",
        "Future-proof your operations",
      ],
      tag: "Retain",
    },
  ];

  return (
    <section className="bg-no-repeat bg-top bg-cover relative bg-white px-3">
      <TopNav />

      <div className="w-full max-w-300 mx-auto px-6 py-10 md:px-12 lg:px-20 bg-duo-dark  mt-12 mb-12 rounded-3xl shadow-2xl font-sans relative">
        <div className="flex flex-col gap-4 mb-16 max-w-5xl">
          <small className="text-duo-green-600 font-bold tracking-widest uppercase">
            What we do
          </small>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-tight">
            We help organizations operate at AI speed
          </h1>

          <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed max-w-6xl font-body">
            Not just websites. Systems, products, and workflows that compound
            over time.
          </p>
        </div>

        <div className="mt-16 flex justify-end">
          <Button
            className="bg-duo-green-200/90 text-duo-dark border rounded-md py-2! px-4!"
            isLink
            linkTo="/contact"
          >
            <div className="size-full flex items-center gap-2">
              <span>Talk to us</span>

              <MoveRight />
            </div>
          </Button>
        </div>
      </div>

      <div className="w-full py-10 md:px-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {services.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-xl p-4 bg-duo-dark"
            >
              <h3 className="text-2xl md:text-[2rem] font-medium tracking-tight text-white leading-tight">
                {item.title}
              </h3>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-125 font-body">
                {item.description}
              </p>

              <ul className="flex flex-col gap-2 mt-2">
                {item.result.map((result, idx) => (
                  <li
                    key={idx}
                    className="text-gray-400 text-sm md:text-base flex items-start gap-2 font-body"
                  >
                    <span className="text-duo-green-600 mt-0.5 text-xl leading-none">
                      &bull;
                    </span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>

              {/* <div className="mt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="bg-[#ebeded] group-hover:bg-[#d8dada] transition-colors text-black font-bold text-[13px] tracking-widest uppercase px-6 py-3 rounded-full">
                    Learn More
                  </span>
                  <span className="bg-[#ebeded] group-hover:bg-[#d8dada] transition-colors text-black p-3 rounded-full flex items-center justify-center">
                    <MoveRight className="w-5 h-5" />
                  </span>
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2 pb-16">
        <Link
          to="/contact"
          className="w-full sm:size-fit! mt-7 flex items-center justify-center gap-2 mb-16 border bg-duo-green-200 text-duo-dark rounded-md py-2! px-4!"
        >
          <span>Talk to us</span>

          <MoveRight />
        </Link>
      </div>
    </section>
  );
}
