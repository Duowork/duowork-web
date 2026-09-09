/**
 * Case studies — the content behind the card grid and bottom sheet on both
 * Home and Work.
 *
 * `image` is only set where a genuine screenshot exists in /public/work.
 * The handoff is firm on this: credibility rests on the screenshots being real,
 * so an unfilled slot stays a visible placeholder rather than borrowing stock.
 *
 * `resultIsIllustrative` marks a result line as a made-up figure. Replace the
 * copy with a real, verifiable number and drop the flag before launch.
 */
export type CaseStudy = {
  id: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  resultIsIllustrative?: boolean;
  image?: string;
  imageAlt?: string;
};

export const CASES: CaseStudy[] = [
  {
    id: "sable-and-grey",
    client: "Sable & Grey",
    category: "Real Estate / Custom Web Platform",
    challenge:
      "Needed a polished, custom website to list properties and convert inquiries into serious leads.",
    solution:
      "A custom real estate platform with property listings, inquiry capture, and an admin dashboard for the sales team.",
    result:
      "42% increase in qualified inquiries within the first quarter post-launch",
    resultIsIllustrative: true,
    image: "/work/portfolio-4-sg.webp",
    imageAlt: "Sable & Grey property listing platform",
  },
  {
    id: "glossom",
    client: "Glossom",
    category: "Creative Tools / Social Media Design App",
    challenge:
      "Small business owners and creators needed a fast way to produce polished social media graphics without hiring a designer.",
    solution:
      "A drop-in, browser-based editor with templates, brand kits, and one-click resizing across platforms.",
    result: "Average design time cut from 30 minutes to under 3",
    resultIsIllustrative: true,
  },
  {
    id: "capann",
    client: "Capann",
    category: "Productivity / Browser Extension",
    challenge:
      "Remote teams needed a lightweight way to record, annotate, and share screen walkthroughs without switching tools.",
    solution:
      "A browser extension for screen recording and live annotation, built for speed and minimal setup.",
    result: "Adopted across 5 internal teams within the first month of rollout",
    resultIsIllustrative: true,
  },
  {
    id: "dema",
    client: "Dema",
    category: "Fintech / Financial Ledger",
    challenge:
      "Business owners needed a simple way to manage books without hiring a full accounting team.",
    solution:
      "A financial ledger system for tracking income, expenses, and reporting — built for non-accountants.",
    result: "Reconciliation time cut by roughly 60% for early users",
    resultIsIllustrative: true,
  },
  {
    id: "avatamedia",
    client: "AvataMedia",
    category: "Media & Marketing / Custom Web Platform",
    challenge:
      "Needed a custom website that reflected their creative positioning as a media and marketing company — not a template.",
    solution:
      "A bespoke, brand-forward website with a portfolio/case-study structure built in.",
    result: "Inbound inquiries up noticeably in the months following launch",
    resultIsIllustrative: true,
    image: "/work/portfolio-5-avatamedia.webp",
    imageAlt: "AvataMedia brand-forward marketing website",
  },
];
