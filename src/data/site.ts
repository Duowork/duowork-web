import type { IconName } from "../lib/icon-paths";

/**
 * Single source of truth for navigation, footer and direct contact details.
 * The handoff requires the footer's "Navigate" column to mirror the nav exactly —
 * both read from NAV_LINKS below, so they cannot drift.
 */

export type NavLink = {
  label: string;
  /** Route path, or a hash on the home page. */
  to: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/#services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
];

export const CONTACT = {
  email: "hello@duowork.com",
  // TODO: real number. The design ships this as an unfilled slot.
  phone: "[Phone number]",
  phoneHref: "tel:",
  location: "Lagos, Nigeria — we reply within one business day.",
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

// TODO: replace the "#" placeholders with real profile URLs.
export const SOCIALS: SocialLink[] = [
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "X / Twitter", href: "#", icon: "x" },
  { label: "Instagram", href: "#", icon: "instagram" },
];

export type FooterColumn = {
  heading: string;
  links: NavLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  { heading: "Navigate", links: NAV_LINKS },
  {
    heading: "Services",
    links: [
      { label: "Custom Software Development", to: "/#services" },
      { label: "Enterprise Integration", to: "/#services" },
      { label: "Digital Transformation Consulting", to: "/#services" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Case Studies", to: "/work" },
    ],
  },
  {
    heading: "Legal",
    // TODO: neither page exists yet — see Known Gaps in the handoff.
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "LinkedIn", to: "#" },
      { label: "X / Twitter", to: "#" },
      { label: "Instagram", to: "#" },
      { label: "Email", to: `mailto:${CONTACT.email}` },
    ],
  },
];

export const TAGLINE = "Building what matters, and making it work.";
