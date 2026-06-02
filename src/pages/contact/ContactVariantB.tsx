import { Mail, MapPin, Calendar, Globe } from "lucide-react";

export default function ContactVariantB() {
  return (
    <div className="py-10 px-5 lg:px-14 max-w-[1180px] mx-auto flex flex-col gap-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden border border-white/8 rounded-[30px] bg-gradient-to-br from-[#272727] to-[#1b1b1b] p-10 lg:p-[52px] flex flex-wrap items-center justify-between gap-8">
        {/* Glow effect */}
        <div className="absolute -right-[120px] -bottom-[180px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(158,255,81,0.18)_0%,rgba(158,255,81,0)_62%)] pointer-events-none" />

        <div className="relative max-w-[30ch]">
          <div className="font-mono text-xs tracking-[0.1em] text-duo-green-200 mb-3.5">
            // start a conversation
          </div>
          <h2 className="font-title text-[46px] text-white leading-[0.98] tracking-tight mb-4">
            One email is all it{" "}
            <span className="text-duo-green-200">takes.</span>
          </h2>
          <p className="text-white/72 text-base leading-relaxed max-w-[42ch]">
            Tell us what you're building and we'll come back with next steps —
            usually within a few hours, always within a day.
          </p>
        </div>

        <a
          href="mailto:reach@duowork.tech"
          className="relative z-10 flex items-center gap-3.5 flex-none bg-duo-green-200 text-duo-dark rounded-[18px] p-5 lg:py-[22px] lg:px-[26px] shadow-[0_18px_40px_-18px_rgba(158,255,81,0.6)] hover:-translate-y-1 transition-transform"
        >
          <span className="w-[46px] h-[46px] rounded-[13px] bg-[rgba(34,34,34,0.16)] grid place-items-center">
            <Mail className="w-[22px] h-[22px]" />
          </span>
          <span>
            <span className="block text-[11px] tracking-[0.16em] uppercase opacity-70 mb-1">
              Email us directly
            </span>
            <span className="font-archivo-black text-[19px] leading-none">
              reach@duowork.tech
            </span>
          </span>
        </a>
      </div>

      {/* Tiles Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Book a Call - Accent Tile */}
        <a
          href="https://calendly.com/reach-duoworkhq/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden bg-duo-green-200 text-duo-dark border border-transparent rounded-[26px] p-8 flex flex-col gap-3.5 min-h-[200px] hover:-translate-y-1 transition-all group"
        >
          <span className="w-[46px] h-[46px] rounded-[14px] grid place-items-center bg-[rgba(34,34,34,0.16)]">
            <Calendar className="w-[21px] h-[21px]" />
          </span>
          <div className="text-[11px] tracking-[0.16em] uppercase text-[rgba(34,34,34,0.6)]">
            Prefer to talk?
          </div>
          <h3 className="font-archivo-black text-[22px] leading-tight tracking-tight">
            Book a 30-min intro call
          </h3>
          <p className="text-[rgba(34,34,34,0.78)] text-sm leading-relaxed">
            Grab a slot that works for you — no prep needed.
          </p>
          <span className="mt-auto inline-flex items-center gap-2 text-duo-dark font-semibold text-sm">
            Open scheduler
            <svg
              className="w-[15px] h-[15px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        </a>

        {/* Email Tile */}
        <div className="relative overflow-hidden bg-[#2a2a2a] border border-white/8 rounded-[26px] p-8 flex flex-col gap-3.5 min-h-[200px] hover:border-[rgba(158,255,81,0.32)] hover:-translate-y-1 transition-all">
          <span className="w-[46px] h-[46px] rounded-[14px] grid place-items-center bg-white/5 border border-[#3a3a3a] text-duo-green-200">
            <Mail className="w-[21px] h-[21px]" />
          </span>
          <div className="text-[11px] tracking-[0.16em] uppercase text-white/50">
            Email
          </div>
          <h3 className="font-archivo-black text-[22px] leading-tight tracking-tight text-white">
            Two ways to reach us
          </h3>
          <p className="text-white/72 text-sm leading-relaxed">
            <a
              href="mailto:reach@duowork.tech"
              className="text-white hover:text-duo-green-200 transition-colors"
            >
              reach@duowork.tech
            </a>
            <br />
            <a
              href="mailto:reach.duoworkhq@gmail.com"
              className="text-white hover:text-duo-green-200 transition-colors"
            >
              reach.duoworkhq@gmail.com
            </a>
          </p>
        </div>

        {/* Location Tile */}
        <div className="relative overflow-hidden bg-[#2a2a2a] border border-white/8 rounded-[26px] p-8 flex flex-col gap-3.5 min-h-[200px] hover:border-[rgba(158,255,81,0.32)] hover:-translate-y-1 transition-all">
          <span className="w-[46px] h-[46px] rounded-[14px] grid place-items-center bg-white/5 border border-[#3a3a3a] text-duo-green-200">
            <MapPin className="w-[21px] h-[21px]" />
          </span>
          <div className="text-[11px] tracking-[0.16em] uppercase text-white/50">
            Based in
          </div>
          <h3 className="font-archivo-black text-[22px] leading-tight tracking-tight text-white">
            Abuja, Nigeria
          </h3>
          <p className="text-white/72 text-sm leading-relaxed">
            Working remote with teams worldwide.
          </p>
        </div>
      </div>

      {/* Social Tile - Full Width */}
      <div className="relative overflow-hidden bg-[#2a2a2a] border border-white/8 rounded-[26px] p-8 flex flex-wrap items-center justify-between gap-4 hover:border-[rgba(158,255,81,0.32)] hover:-translate-y-1 transition-all">
        <div className="flex items-center gap-4">
          <span className="w-[46px] h-[46px] rounded-[14px] grid place-items-center bg-white/5 border border-[#3a3a3a] text-duo-green-200">
            <Globe className="w-[21px] h-[21px]" />
          </span>
          <div>
            <div className="text-[11px] tracking-[0.16em] uppercase text-white/50">
              Follow along
            </div>
            <h3 className="font-archivo-black text-[20px] leading-tight tracking-tight text-white">
              We're most active on social
            </h3>
          </div>
        </div>

        <div className="flex gap-2.5 flex-wrap">
          <a
            href="https://twitter.com/DuoworkHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#3a3a3a] text-[13px] font-semibold text-white hover:border-duo-green-200 hover:text-duo-green-200 hover:bg-duo-green-200/12 transition-all"
          >
            <svg
              className="w-[14px] h-[14px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
            Twitter/X
          </a>

          <a
            href="https://instagram.com/duoworkhq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#3a3a3a] text-[13px] font-semibold text-white hover:border-duo-green-200 hover:text-duo-green-200 hover:bg-duo-green-200/12 transition-all"
          >
            <svg
              className="w-[14px] h-[14px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            Instagram
          </a>

          <a
            href="https://www.linkedin.com/company/duowork"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#3a3a3a] text-[13px] font-semibold text-white hover:border-duo-green-200 hover:text-duo-green-200 hover:bg-duo-green-200/12 transition-all"
          >
            <svg
              className="w-[14px] h-[14px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3a3a3a] pt-6 text-white/50 text-[13px] tracking-wider">
        <span className="inline-flex items-center gap-2 text-white/72">
          <span className="w-2 h-2 rounded-full bg-duo-green-200" />
          Replies same business day · Mon–Fri
        </span>
        <span>&copy; Duowork · Abuja / Remote</span>
      </div> */}
    </div>
  );
}
