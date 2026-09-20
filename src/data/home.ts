import type { IconName } from "../lib/icon-paths";

/** Content for the Home page sections, in the order they render. */

/**
 * Hero background: an aerial slow-motion shot of the city we work from.
 *
 * Every path here is optional. With none present the hero falls back to carbon
 * plus the scrim, which still reads as intentional rather than broken.
 *
 * This autoplays on every homepage visit, much of it over Nigerian mobile
 * connections, so weight is felt directly — keep it a short silent loop at
 * 1080p and under ~3MB. It sits beneath a scrim running 48–94% opacity and is
 * cropped by `object-cover`, so resolution and bitrate past 1080p buy nothing
 * a viewer can see. If you replace it:
 *
 *   ffmpeg -i source.mov -an -c:v libx264 -crf 28 -preset slow \
 *          -vf "scale=1920:-2" -movflags +faststart public/hero-city-1080.mp4
 *
 *   ffmpeg -y -ss 0 -i public/hero-city-1080.mp4 -frames:v 1 /tmp/f.png \
 *     && cwebp -q 70 -resize 1600 0 /tmp/f.png -o public/hero-city-poster.webp
 *
 * `-an` drops the audio track; `-movflags +faststart` moves the moov atom to
 * the front, without which the browser must fetch the whole file before the
 * first frame renders.
 */
export const HERO_VIDEO = {
  /** 1920x1080, H.264, ~2.1 Mbps, 10s, faststart. 2.7MB. */
  mp4: "/hero-city-1080.mp4",
  /** Optional: smaller than the mp4 where supported. None encoded yet. */
  webm: undefined as string | undefined,
  /**
   * First frame of the video, so the handoff to playback is seamless. Also the
   * whole hero image for anyone on reduced motion, who never sees it move.
   */
  poster: "/hero-city-poster.webp" as string | undefined,
};

/** Scrolls right-to-left across the base of the hero. */
export const HERO_MARQUEE = [
  "Product design",
  "Custom platforms",
  "Internal tools",
  "Enterprise integration",
  "Digital consulting",
];

export type IconCard = {
  title: string;
  body: string;
  icon: IconName;
  /** Icons alternate between carbon and volt across a row. */
  accent?: "carbon" | "volt";
};

export const PROBLEMS: IconCard[] = [
  {
    title: "Disconnected Systems",
    body: "Your CRM, accounting, and inventory tools don't talk to each other, so someone's stuck re-entering the same data three times.",
    icon: "nodes",
  },
  {
    title: "Slow, Off-the-Shelf Fits",
    body: "Generic software almost works — until it doesn't, and you're paying for features you'll never use.",
    icon: "puzzle",
  },
  {
    title: "Stalled Digital Transformation",
    body: "You know you need to modernize, but every past attempt got stuck between IT vendors and internal teams.",
    icon: "gear",
  },
];

export const SERVICES: IconCard[] = [
  {
    title: "Custom Software Development",
    body: "We design and build software shaped around how your business actually works — not the other way around. Web platforms, internal tools, mobile apps, built from scratch or evolved from what you already have.",
    icon: "code",
    accent: "carbon",
  },
  {
    title: "Enterprise Integration",
    body: "ERPs, CRMs, payment systems, third-party APIs — we connect the tools you rely on so information moves automatically, not manually. One ecosystem, not ten disconnected apps.",
    icon: "plug",
    accent: "volt",
  },
  {
    title: "Digital Transformation Consulting",
    body: "Before we write a line of code, we help you map what “modern” actually means for your business — realistic, sequenced, and built around your team's capacity to adopt it.",
    icon: "compass",
    accent: "carbon",
  },
];

export type ProcessStep = {
  step: number;
  title: string;
  body: string;
};

export const PROCESS: ProcessStep[] = [
  {
    step: 1,
    title: "Discover",
    body: "We learn your business, your systems, and where the friction actually lives.",
  },
  {
    step: 2,
    title: "Design & Build",
    body: "We architect and build the solution, with you involved at every checkpoint — not just a demo at the end.",
  },
  {
    step: 3,
    title: "Integrate & Launch",
    body: "We connect it to your existing systems and get your team live, with minimal disruption.",
  },
  {
    step: 4,
    title: "Support & Grow",
    body: "We stay on as your technical partner — fixing, scaling, and evolving the system as your business grows.",
  },
];

export const WHY_US: IconCard[] = [
  {
    title: "In-House, End-to-End",
    body: "No outsourcing, no middlemen, no relay-race of subcontractors. The team that scopes your project is the team that builds it.",
    icon: "team",
    accent: "carbon",
  },
  {
    title: "Local Context, Global Standard",
    body: "We understand Nigerian business realities — infrastructure, compliance, payment rails, connectivity — and we build to the same standard expected by international clients and partners.",
    icon: "globe",
    accent: "volt",
  },
  {
    title: "We Don't Disappear After Launch",
    body: "Most vendors hand off and move on. We stay — as the team you call when something needs to scale, change, or get fixed.",
    icon: "handshake",
    accent: "carbon",
  },
];

export type Industry = { title: string; body: string };

export const INDUSTRIES: Industry[] = [
  {
    title: "Fintech",
    body: "Payment flows, ledgers, compliance-aware financial tooling",
  },
  {
    title: "Logistics",
    body: "Tracking, dispatch, and operational systems built for movement",
  },
  {
    title: "Retail",
    body: "Inventory, e-commerce, and customer-facing platforms",
  },
];

// TODO: replace with real monochrome client logos at uniform optical height.
// Set type is a stand-in, per the handoff.
export const CLIENTS = [
  "Sable & Grey",
  "Glossom",
  "Capann",
  "Dema",
  "AvataMedia",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** True while the attribution is a placeholder rather than a real person. */
  nameIsIllustrative?: boolean;
  /** 1:1 headshot. Leave unset until a real photo exists — never an avatar. */
  headshot?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Duowork didn't just build what we asked for — they helped us figure out what we actually needed first. That's rare.",
    name: "[Placeholder Name]",
    role: "Founder, Sable & Grey",
    nameIsIllustrative: true,
  },
  {
    quote:
      "We came in expecting a vendor. We got a team that still checks in months after launch.",
    name: "[Placeholder Name]",
    role: "Operations Lead, AvataMedia",
    nameIsIllustrative: true,
  },
];

export const NEED_OPTIONS = [
  "Custom software build",
  "Enterprise integration",
  "Fixing an existing system",
  "Digital transformation consulting",
  "Not sure yet — let's talk",
];
