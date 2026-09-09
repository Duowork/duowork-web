import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
import { NAV_LINKS } from "../data/site";

/**
 * The floating pill nav: fixed 24px from the top, horizontally centered,
 * transparent until the page scrolls past 24px, then a blurred white pill.
 */
export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (to: string) => {
    // Anchors on Home never take the active state — only page links do.
    if (to.includes("#")) return false;
    return pathname === to;
  };

  const linkClass = (to: string) =>
    `rounded-full px-3.5 py-2.5 text-[15px] font-medium text-carbon transition-colors duration-200 hover:bg-hairline-strong ${
      isActive(to) ? "bg-hairline-strong" : ""
    }`;

  return (
    <nav
      className={`fixed top-6 left-1/2 z-100 flex -translate-x-1/2 items-center gap-2 rounded-full py-2 pr-2 pl-5 transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-white/70 shadow-nav backdrop-blur-lg"
          : "bg-transparent"
      }`}
      aria-label="Primary"
    >
      <Link
        to="/"
        onClick={closeMenu}
        className="flex items-center gap-2.5"
        aria-label="Duowork home"
      >
        <img
          src="/duowork-mark-duo-on-light.svg"
          alt=""
          className="block h-6.5 w-auto"
        />
        <span className="font-title text-[17px] font-semibold text-carbon">
          Duowork
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-1 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} to={link.to} className={linkClass(link.to)}>
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        to="/#contact"
        onClick={closeMenu}
        className="ml-2 inline-flex items-center gap-2.5 rounded-full bg-carbon py-2.5 pr-3 pl-5.5 text-[15px] font-medium whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#1c1c1c]"
      >
        Talk to Us
        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-volt text-carbon">
          <Icon name="arrowUpRight" size={13} strokeWidth={2.4} />
        </span>
      </Link>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span
          className={`h-0.5 w-5 rounded-full bg-carbon transition-transform duration-200 ${
            menuOpen ? "translate-y-1 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 rounded-full bg-carbon transition-transform duration-200 ${
            menuOpen ? "-translate-y-1 -rotate-45" : ""
          }`}
        />
      </button>

      {menuOpen && (
        <div className="absolute top-[calc(100%+10px)] right-0 left-0 grid gap-1 rounded-3xl bg-white/92 p-3 shadow-nav backdrop-blur-lg lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={closeMenu}
              className={`${linkClass(link.to)} block`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
