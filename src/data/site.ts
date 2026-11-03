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
  { label: "Tools", to: "/tools" },
  // In progress — restore when the pages are ready.
  // { label: "About", to: "/about" },
  // { label: "Blog", to: "/blog" },
];

export const CONTACT = {
  email: "hello@duowork.tech",
  phone: "+234 704 295 6599",
  // WhatsApp only — this line does not take voice calls, so it links to
  // wa.me rather than tel: to avoid sending people to a dead dial.
  phoneHref: "https://wa.me/2347042956599",
  phoneNote: "WhatsApp only",
  location: "Abuja, Nigeria — we reply within one business day.",
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

// TODO: replace the "#" placeholders with real profile URLs.
export const SOCIALS: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/company/duowork", icon: "linkedin" },
  { label: "X / Twitter", href: "https://x.com/@duoworkhq", icon: "x" },
  { label: "Instagram", href: "https://instagram.com/@duoworkhq", icon: "instagram" },
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
      // In progress — restore when the page is ready.
      // { label: "Blog", to: "/blog" },
      { label: "Case Studies", to: "/work" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "LinkedIn", to: "https://linkedin.com/company/duowork"},
      { label: "X / Twitter", to: "https://x.com/@duoworkhq" },
      { label: "Instagram", to: "https://instagram.com/@duoworkhq"},
      { label: "Email", to: `mailto:${CONTACT.email}` },
    ],
  },
];

export const TAGLINE = "Building what matters, and making it work.";
