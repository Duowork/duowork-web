/**
 * Blog content. Every entry is a draft topic — no post detail pages exist yet,
 * so cards do not link anywhere. Add `href` once a post is written and the
 * cards will start linking on their own.
 */

export const BLOG_CATEGORIES = [
  "Engineering",
  "Integration Playbooks",
  "Digital Transformation",
  "Studio Notes",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/** "All" leads the filter row and matches every post. */
export const BLOG_FILTERS = ["All", ...BLOG_CATEGORIES] as const;
export type BlogFilter = (typeof BLOG_FILTERS)[number];

export type Post = {
  title: string;
  category: BlogCategory;
  excerpt?: string;
  /** Set once a real post page exists. */
  href?: string;
  image?: string;
  /** True while the topic is a draft placeholder. */
  isDraft?: boolean;
};

export const FEATURED_POST: Post = {
  title: "Why most ERP integrations fail before they launch",
  category: "Integration Playbooks",
  excerpt: "Featured post — draft topic, article to follow.",
  isDraft: true,
};

export const POSTS: Post[] = [
  {
    title: "What “digital transformation” actually means for a Nigerian SME",
    category: "Digital Transformation",
    isDraft: true,
  },
  {
    title: "Inside a Duowork build: Sable & Grey case study walkthrough",
    category: "Studio Notes",
    isDraft: true,
  },
  {
    title: "Custom software vs. off-the-shelf: how we help clients decide",
    category: "Engineering",
    isDraft: true,
  },
];
