// import TopNav from "../components/TopNav";
// import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // useEffect(() => {
  //   if (videoRef) {
  //     (videoRef.current as HTMLVideoElement).play();
  //     (videoRef.current as HTMLVideoElement).autoplay = true;
  //     (videoRef.current as HTMLVideoElement).loop = true;

  //     console.log("This working?");
  //   }
  // }, []);

  return (
    <section id="hero-section" className="h-screen relative">
      {/* Video */}
      {/* <video
        src="/duowork-backdrop-vid.mov"
        className="absolute w-full top-0 left-0 appearance-none bg-cover bg-top z-5"
        loop
        ref={(ref) => {
          videoRef.current = ref;
        }}
      ></video> */}
      <img src="/team.webp" alt="" className="size-full" />

      {/* Overlay */}
      <div className="absolute size-full top-0 left-0 bg-black/81 bg-blend-overlay z-10" />

      {/* Hero strip */}
      <div
        id="hero-container"
        className="flex flex-col item-center justify-center gap-6 md:gap-8 lg:gap-10 h-screen absolute left-0 top-0 w-full px-2 sm:px-4 pb-32 sm:pb-40 md:pb-48 z-20"
      >
        <h1 className="w-full max-w-200 text-[2.3rem] md:text-4xl lg:text-5xl text-white text-center font-bold self-center leading-normal">
          {/* Weapon of Mass Creation. */}
          Duowork
        </h1>

        <p
          id="hero-description"
          className="w-full md:max-w-140 text-white text-center self-center text-lg md:text-xl px-4 sm:px-0 font-light sm:w-1/2"
        >
          We integrate and build smart solutions for businesses
          that can't afford to move slow.
        </p>

        <Link
          to="/contact"
          id="hero-button"
          className="w-full max-w-87.5 sm:w-50 flex items-center justify-center self-center sm:text-[18px] text-duo-dark font-title font-medium text-center bg-duo-green-200 p-3 rounded-[14px]"
          title="Hire Us"
        >
          WORK WITH US
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
                  className="shrink-0 mx-2 sm:mx-4 md:mx-6 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full border border-duo-green-600 bg-duo-dark/85 backdrop-blur-lg"
                >
                  <span className="text-white text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                    {service}
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-linear-to-r from-transparent via-duo-green-200/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
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
                  className="shrink-0 mx-2 sm:mx-4 md:mx-6 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full border border-duo-green-600 bg-duo-dark/85 backdrop-blur-lg"
                >
                  <span className="text-white text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                    {service}
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-linear-to-r from-transparent via-duo-green-600/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
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
