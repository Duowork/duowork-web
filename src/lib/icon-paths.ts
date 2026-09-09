/**
 * Icon paths lifted from the 2.0 design prototype.
 * All are drawn on a 24px viewBox, fill="none", round caps and joins.
 * Stroke weight is 1.5 for outline icons, 2–2.4 for arrows and checks.
 */
export const ICON_PATHS = {
  nodes: "M3 4h7v6H3z M14 14h7v6h-7z M10 7h3 M16 10v4",
  puzzle: "M4 4h6v3a2 2 0 1 0 4 0V4h6v6h-3a2 2 0 1 0 0 4h3v6h-6",
  gear: "M12 7.5a4.5 4.5 0 1 1 0 9a4.5 4.5 0 1 1 0-9 M12 3v2.5 M12 18.5V21 M3 12h2.5 M18.5 12H21 M5.6 5.6l1.8 1.8 M16.6 16.6l1.8 1.8",
  code: "M9 6l-5 6 5 6 M15 6l5 6-5 6",
  plug: "M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-12 0z M12 17v4",
  compass: "M12 3a9 9 0 1 1 0 18a9 9 0 1 1 0-18 M15.5 8.5l-2 5-5 2 2-5z",
  team: "M9 11a3.5 3.5 0 1 1 0-7a3.5 3.5 0 1 1 0 7 M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M16 5.5a3 3 0 0 1 0 6 M17 14.5c2.4.6 4 2.6 4 5.5",
  globe: "M12 3a9 9 0 1 1 0 18a9 9 0 1 1 0-18 M3.5 9h17 M3.5 15h17 M12 3c-3 4-3 14 0 18 M12 3c3 4 3 14 0 18",
  handshake: "M4 9l4-4 4 4 M20 9l-4-4-4 4 M8 5v9a4 4 0 0 0 8 0V5",
  shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z M9 12l2.5 2.5L16 10",
  arrowRight: "M5 12h13 M13 6l6 6-6 6",
  arrowUpRight: "M7 17L17 7 M9 7h8v8",
  chevronDown: "M6 9l6 6 6-6",
  plus: "M12 5v14 M5 12h14",
  check: "M4 12l5 5L20 7",
  mail: "M3 6h18v12H3z M3 7l9 6 9-6",
  phone: "M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A17 17 0 013 5a2 2 0 012-2z",
  linkedin:
    "M4 9h3v11H4z M5.5 4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z M10 20V9h3v1.6c.7-1.1 1.9-1.8 3.3-1.8 2.3 0 3.7 1.5 3.7 4.2V20h-3v-6.3c0-1.4-.6-2.2-1.8-2.2-1.1 0-1.9.8-1.9 2.2V20z",
  x: "M4 4l7.6 9.6L4.4 20h2.2l6-6.4L18 20h2L12.2 10 19.4 4h-2.2l-5.6 5.9L6 4z",
  instagram:
    "M4 8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4z M12 8.6a3.4 3.4 0 100 6.8 3.4 3.4 0 000-6.8z M17 7.2h.01",
} as const;

export type IconName = keyof typeof ICON_PATHS;
