import TopNav from "../components/TopNav";
import { Link } from "react-router-dom";

export default function Home() {
  const servicesRow1 = [
    "Product Strategy",
    "Product MVP",
    "Task Automation",
    "Service API",
    "Agent Orchestration",
  ];

  const servicesRow2 = [
    "UI/UX Design",
    "Mobile App Development",
    "Desktop App Solutions",
    "Web App Development",
    "AI Auditing",
  ];

  return (
    <section
      id="hero-section"
      className="h-screen bg-no-repeat bg-top bg-cover relative bg-[url('/team.webp')] bg-black/80 bg-blend-overlay"
    >
      {/* Navigation */}
      <TopNav />

      {/* Hero strip */}
      <div
        id="hero-container"
        className="flex flex-col item-center justify-center gap-6 md:gap-8 lg:gap-10 h-screen absolute left-0 top-0 w-full px-2 sm:px-4 pb-32 sm:pb-40 md:pb-48 z-20"
      >
        <h1 className="w-full max-w-[50rem] text-[2.3rem] md:text-4xl lg:text-6xl text-white text-center font-bold self-center leading-snug">
          Weapon of Mass Creation.
        </h1>

        <p
          id="hero-description"
          className="w-full md:max-w-[35rem] text-white text-center self-center text-lg px-4 sm:px-0 font-light sm:w-1/2"
        >
          We build smart products and orchestrate solutions for businesses and
          organization that can't afford to move slow.
        </p>

        <Link
          to="/contact"
          id="hero-button"
          className="flex items-center justify-center self-center text-white rounded-xl cta-btn text-center max-w-[12.5rem] w-[12.5rem] !bg-transparent border !border-duo-green-200"
          title="Talk to us"
        >
          Work with us
        </Link>
      </div>

      {/* Services strip */}
      <div className="w-full py-12 overflow-hidden absolute bottom-0 z-20">
        <div className="relative mb-4 overflow-hidden">
          <div className="flex animate-scroll-right">
            {[...servicesRow1, ...servicesRow1, ...servicesRow1].map(
              (service, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full border border-duo-green-600 bg-duo-dark/50 backdrop-blur-sm"
                >
                  <span className="text-white text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                    {service}
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-[#9eff51]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ),
            )}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left">
            {[...servicesRow2, ...servicesRow2, ...servicesRow2].map(
              (service, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full border border-duo-green-600 bg-duo-dark/50 backdrop-blur-sm"
                >
                  <span className="text-white text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                    {service}
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-duo-green-600/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Keyframes for service bi-directional animation */
        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 10s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 10s linear infinite;
        }

        /* Pause animation on hover */
        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
