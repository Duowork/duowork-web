/** Content for the About page. */

export const STORY: string[] = [
  "Duowork was founded by Romeo Agbor Peter, starting with custom web and app builds for businesses that needed software shaped around how they actually worked — not squeezed into a template. That early focus grew into what Duowork is today: a studio that both builds custom software from scratch and integrates the enterprise tools businesses already depend on, so everything works as one system instead of a patchwork of apps.",
  "We started with a simple observation: businesses don't fail because they lack good ideas — they stall because the gap between idea and working software is too wide, too slow, or too expensive to close. We exist to close that gap.",
];

export const MISSION = {
  heading: "Mission",
  body: "To close the gap between great ideas and working software — through custom development and enterprise integration that gives businesses the tools to compete, grow, and matter.",
};

export const VISION = {
  heading: "Vision",
  body: "To be the most trusted software studio from Africa — known not just for what we build, but for how we build it, and who we build it with.",
};

export type Value = {
  title: string;
  body: string;
  /** The first value's rule is volt; the rest are paper. */
  accent?: "volt" | "paper";
};

export const VALUES: Value[] = [
  {
    title: "Faithfulness",
    body: "We lead with integrity — to our clients, our craft, and the work itself. We won't ship something we're not proud of, and we won't take on a brief we don't intend to honor fully.",
    accent: "volt",
  },
  {
    title: "Partnership",
    body: "We build with people, not just for them. We listen before we code, and we integrate before we automate.",
  },
  {
    title: "Craft",
    body: "Good enough rarely is. We obsess over the details most vendors skip.",
  },
  {
    title: "Boldness",
    body: "We take on hard problems, because that's where real impact lives.",
  },
];

export const CLOSING_QUOTE =
  "We're not chasing contracts. We're building a body of work — products that outlive the project, solutions that scale past the invoice, a studio that Nigeria and the world will point to.";
