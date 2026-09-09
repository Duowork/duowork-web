import { useState } from "react";
import Container from "../components/Container";
import Section from "../components/Section";
import BrowserMock from "../components/BrowserMock";
import ImageSlot from "../components/ImageSlot";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import IllustrativeBadge from "../components/IllustrativeBadge";
import Newsletter from "./blog/Newsletter";
import { rise } from "../lib/motion";
import {
  BLOG_FILTERS,
  FEATURED_POST,
  POSTS,
  type BlogFilter,
  type Post,
} from "../data/blog";

function PostCard({ post, delay }: { post: Post; delay: number }) {
  const card = (
    <>
      <ImageSlot ratio="16 / 9" src={post.image} label={null} className="w-full" />
      <div className="p-7">
        <span className="text-[13px] font-medium text-ink-60">{post.category}</span>
        <h3 className="mt-3 font-title text-[21px] leading-[1.25] font-medium">
          {post.title}
        </h3>
        {post.isDraft && <IllustrativeBadge className="mt-4">Draft topic</IllustrativeBadge>}
      </div>
    </>
  );

  const shell =
    "block h-full overflow-hidden rounded-[20px] border border-hairline transition-[transform,box-shadow] duration-200 ease-standard";

  return (
    <Reveal delay={delay}>
      {/* Drafts have nowhere to link yet, so they render as plain cards. */}
      {post.href ? (
        <a href={post.href} className={`${shell} hover:-translate-y-1.5 hover:shadow-card`}>
          {card}
        </a>
      ) : (
        <div className={shell}>{card}</div>
      )}
    </Reveal>
  );
}

export default function Blog() {
  const [filter, setFilter] = useState<BlogFilter>("All");

  const matches = (post: Post) => filter === "All" || post.category === filter;

  const visiblePosts = POSTS.filter(matches);
  const showFeatured = matches(FEATURED_POST);

  return (
    <>
      <section className="bg-white pt-[clamp(140px,20vw,200px)] pb-[clamp(48px,7vw,80px)]">
        <Container>
          <h1
            className="font-title text-[clamp(44px,6vw,84px)] leading-[1.05] font-semibold tracking-[-0.02em]"
            style={rise(0)}
          >
            Notes from the build.
          </h1>
          <p
            className="mt-6 max-w-[60ch] text-xl text-ink-60"
            style={rise(120)}
          >
            Thoughts on software, integration, and running a technical studio
            from Nigeria for a global standard.
          </p>
        </Container>
      </section>

      <Section bare className="pb-30">
        <div
          role="group"
          aria-label="Filter posts by category"
          className="flex flex-wrap gap-2.5 border-b border-hairline-strong pb-10"
        >
          {BLOG_FILTERS.map((option) => {
            const active = option === filter;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={active}
                className={`cursor-pointer rounded-full border px-[18px] py-2 text-sm font-medium tracking-[0.02em] text-carbon transition-colors duration-200 hover:bg-hairline-strong ${
                  active
                    ? "border-ink-30 bg-hairline-strong"
                    : "border-hairline-strong bg-transparent"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showFeatured && (
          <article className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-[clamp(28px,4vw,48px)] border-b border-hairline-strong py-[clamp(36px,5vw,56px)]">
            <BrowserMock>
              <ImageSlot
                ratio="16 / 9"
                src={FEATURED_POST.image}
                label={null}
                className="w-full"
              />
            </BrowserMock>

            <div>
              <span className="inline-block rounded-full bg-volt-tint px-3.5 py-[5px] text-[13px] font-medium">
                {FEATURED_POST.category}
              </span>

              <h2 className="mt-5 mb-4 font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
                {FEATURED_POST.title}
              </h2>

              <p className="mb-6 max-w-[56ch] text-base text-ink-60">
                {FEATURED_POST.excerpt}
              </p>

              {FEATURED_POST.href ? (
                <a
                  href={FEATURED_POST.href}
                  className="inline-flex items-center gap-2 border-b border-ink-30 pb-1 text-[15px] font-medium transition-colors duration-200 hover:border-volt"
                >
                  Read post
                  <Icon name="arrowRight" size={15} strokeWidth={1.8} />
                </a>
              ) : (
                <IllustrativeBadge>Draft topic</IllustrativeBadge>
              )}
            </div>
          </article>
        )}

        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6 pt-14">
            {visiblePosts.map((post, index) => (
              <PostCard key={post.title} post={post} delay={index * 80} />
            ))}
          </div>
        ) : (
          !showFeatured && (
            <p className="pt-14 text-base text-ink-60">
              Nothing under {filter} yet — more on the way.
            </p>
          )
        )}
      </Section>

      <Newsletter />
    </>
  );
}
