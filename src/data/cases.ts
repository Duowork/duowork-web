/**
 * Case studies — the content behind the card grid and sheet on both Home
 * and Work. Every entry is a real Duowork project drawn from
 * `data/portfolio/portfolio.json`, with a genuine screenshot in
 * `/public/work`. The handoff is firm on this: credibility rests on the
 * screenshots being real, so an unfilled slot stays a visible placeholder
 * rather than borrowing stock.
 *
 * `resultIsIllustrative` marks a result line as a made-up figure. None of
 * the results below are flagged: they are the studio's own published
 * outcome statements for each project, not invented metrics.
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
    id: "aerave",
    client: "Aerave",
    category: "Event Ticketing / Ticketing Web App",
    challenge:
      "Event organizers needed one place where fans could discover live events and buy tickets, while organizers track sales and control gate entry.",
    solution:
      "A ticketing web app spanning web, iOS, and Android — event discovery, ticket purchase, and sales management in a single flow.",
    result: "Seamless gate control with real-time sales tracking",
    image: "/work/portfolio-3-aerave.webp",
    imageAlt: "Aerave event ticketing web app",
  },
  {
    id: "araafit",
    client: "Araafit",
    category: "AI Automation / Tailoring Web App",
    challenge:
      "Shoppers ordering custom clothing online had no reliable way to get size and style recommendations matched to them — down to skin tone.",
    solution:
      "An AI-powered, mobile-first tailoring web app that automates matching and recommends custom clothing for each shopper.",
    result: "Automated matching with personalized clothing recommendations",
    image: "/work/portfolio-1-araafit.webp",
    imageAlt: "Araafit AI tailoring web app",
  },
  {
    id: "ecomspy",
    client: "Ecomspy",
    category: "E-commerce / Market Intelligence Tool",
    challenge:
      "Online sellers were guessing at market trends and competitor moves with no consolidated source of insight to plan against.",
    solution:
      "An e-commerce intelligence suite for tracking market trends, monitoring competitor ads, and turning market insight into strategy.",
    result: "Predictive trend identification with actionable market insight",
    image: "/work/portfolio-2-ecomspy.webp",
    imageAlt: "Ecomspy e-commerce intelligence suite",
  },
  {
    id: "sable-and-grey",
    client: "Sable & Grey",
    category: "Real Estate / Online Presence",
    challenge:
      "A real estate development and investment company with no online presence to match its ambition.",
    solution:
      "A bold, eccentric landing page that cements Sable & Grey's online presence — designed to be remembered.",
    result: "Memorable brand recall with a distinctive online presence",
    image: "/work/portfolio-4-sg.webp",
    imageAlt: "Sable & Grey real estate landing page",
  },
  {
    id: "avatamedia",
    client: "AvataMedia",
    category: "Media & Marketing / Online Presence",
    challenge:
      "A marketing and PR agency needed an online presence that communicates the full range of what it does for organizations, public figures, and businesses.",
    solution:
      "A comprehensive agency website presenting their services, brand visibility work, and audience communication in one place.",
    result: "Service clarity with wider audience reach",
    image: "/work/portfolio-5-avatamedia.webp",
    imageAlt: "AvataMedia marketing agency website",
  },
  {
    id: "fetchfully",
    client: "Fetchfully",
    category: "Developer Tools / HTTP Client",
    challenge:
      "Developers needed a faster way to build, send, and manage network requests while working in the browser.",
    solution:
      "A powerful HTTP client for making and managing network requests with ease — designed and engineered in-house at Duowork.",
    result: "Accelerated network request cycles for developers",
    image: "/work/portfolio-6-fetchfully.webp",
    imageAlt: "Fetchfully HTTP client",
  },
];
