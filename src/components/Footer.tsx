import { Link } from "react-router-dom";
import Container from "./Container";
import Icon from "./Icon";
import { FOOTER_COLUMNS, SOCIALS, TAGLINE, type NavLink } from "../data/site";

/** Opacity of the oversized wordmark bleeding off the base of the page. */
const GHOST_OPACITY = 0.07;

/** External and mail targets stay plain anchors; everything else routes. */
function FooterLink({ link }: { link: NavLink }) {
  const className =
    "text-sm leading-snug text-paper-70 transition-colors duration-200 hover:text-volt";

  if (link.to.startsWith("mailto:") || link.to === "#") {
    return (
      <a href={link.to} className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <Link to={link.to} className={className}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-carbon pt-[clamp(56px,8vw,96px)] text-white">
      <Container className="relative z-2">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] items-start gap-[clamp(40px,5vw,64px)]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/duowork-mark-duo-on-dark.svg"
                alt=""
                className="block h-6 w-auto"
              />
              <span className="font-title text-[17px] font-semibold">Duowork</span>
            </div>

            <p className="mt-4 max-w-[30ch] text-[15px] text-paper-70">{TAGLINE}</p>

            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-hairline-dark text-paper-70 transition-colors duration-200 hover:border-volt hover:bg-volt hover:text-carbon"
                >
                  <Icon name={social.icon} size={18} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))] gap-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <div className="mb-[18px] font-title text-[15px] font-semibold">
                  {column.heading}
                </div>
                <div className="grid gap-3">
                  {column.links.map((link) => (
                    <FooterLink key={link.label} link={link} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(40px,6vw,72px)] flex flex-wrap items-center justify-between gap-4 border-t border-paper-40/35 py-6 text-sm text-paper-70">
          <span>© 2026 Duowork. All rights reserved.</span>
          <span className="flex gap-6">
            <Link
              to="/privacy"
              className="transition-colors duration-200 hover:text-volt"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="transition-colors duration-200 hover:text-volt"
            >
              Terms
            </Link>
          </span>
        </div>
      </Container>

      {/* Oversized wordmark, cropped by the footer's overflow. */}
      <div className="relative h-[130px]" aria-hidden="true">
        <div
          className="absolute -bottom-[34px] left-1/2 -translate-x-1/2 font-title font-bold whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 21vw, 300px)",
            lineHeight: 0.85,
            letterSpacing: "-0.03em",
            color: `rgba(255,255,255,${GHOST_OPACITY})`,
          }}
        >
          Duowork
        </div>
      </div>
    </footer>
  );
}
