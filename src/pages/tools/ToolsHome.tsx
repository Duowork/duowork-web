import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle, MagnifyingGlass } from "@phosphor-icons/react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Eyebrow from "../../components/Eyebrow";
import Reveal from "../../components/Reveal";
import Section from "../../components/Section";
import ToolSpecimen from "../../components/tools/ToolSpecimen";
import {
  FEATURED_TOOLS,
  getTool,
  searchTools,
  TOOL_CATEGORIES,
  toolPath,
  TOOLS,
  TOOLS_HOME as COPY,
  type Tool,
} from "../../data/tools";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { rise } from "../../lib/motion";
import { TOOL_ICONS } from "../../lib/tools/tool-icons";

function SoonTag() {
  return (
    <span className="shrink-0 rounded-full border border-hairline-strong px-2.5 py-0.5 text-xs text-ink-60">
      Coming soon
    </span>
  );
}

/** A line in the index. Tools that aren't built yet are listed but don't link. */
function ToolRow({ tool }: { tool: Tool }) {
  const ToolIcon = TOOL_ICONS[tool.slug];

  const content = (
    <>
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-volt-card">
        <ToolIcon size={22} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-title text-lg font-semibold">{tool.name}</span>
        <span className="block text-[15px] text-ink-60">{tool.summary}</span>
      </span>
      {tool.live ? (
        <ArrowRight
          size={20}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        />
      ) : (
        <SoonTag />
      )}
    </>
  );

  const className = "group flex items-center gap-4 border-b border-hairline-strong py-4";

  return tool.live ? (
    <Link to={toolPath(tool.slug)} className={className}>
      {content}
    </Link>
  ) : (
    <div className={`${className} [&>span:first-child]:opacity-60`}>{content}</div>
  );
}

function FeaturedCard({ tool, delay }: { tool: Tool; delay: number }) {
  const body = (
    <>
      <ToolSpecimen slug={tool.slug} />
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="m-0 font-title text-[22px] leading-tight font-semibold">{tool.name}</h3>
          <p className="mt-1 mb-0 text-[15px] text-ink-60">{tool.summary}</p>
        </div>
        {tool.live ? (
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-volt text-carbon">
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </span>
        ) : (
          <SoonTag />
        )}
      </div>
    </>
  );

  return (
    <Reveal delay={delay}>
      {tool.live ? (
        <Link to={toolPath(tool.slug)} className="group block">
          {body}
        </Link>
      ) : (
        <div>{body}</div>
      )}
    </Reveal>
  );
}

export default function ToolsHome() {
  const [query, setQuery] = useState("");
  const searching = query.trim() !== "";
  const results = searching ? searchTools(query) : TOOLS;

  useDocumentMeta(COPY.metaTitle, COPY.metaDescription, "/tools");

  return (
    <>
      <header className="bg-carbon pt-[clamp(128px,16vw,190px)] pb-[clamp(48px,7vw,88px)] text-white">
        <Container>
          <div style={rise(0)}>
            <Eyebrow tone="dark">{COPY.eyebrow}</Eyebrow>
          </div>

          <h1
            className="mt-6 mb-0 font-title text-[clamp(44px,7.4vw,104px)] leading-[1.02] font-semibold tracking-[-0.025em]"
            style={rise(60)}
          >
            {COPY.headlineLead}
            <br />
            <span className="dw-underline">{COPY.headlineAccent}</span>
          </h1>

          <p className="mt-6 mb-0 max-w-[58ch] text-lg text-paper-70" style={rise(120)}>
            {COPY.intro}
          </p>

          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="relative mt-[clamp(28px,4vw,44px)] max-w-[720px]"
            style={rise(180)}
          >
            <label htmlFor="tool-search" className="sr-only">
              Search the tools
            </label>
            <MagnifyingGlass
              size={22}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-paper-60"
            />
            <input
              id="tool-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={COPY.searchPlaceholder}
              autoComplete="off"
              className="dw-field dw-field-search"
            />
          </form>

          <ul className="mt-5 mb-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm text-paper-70" style={rise(220)}>
            {COPY.promises.map((promise) => (
              <li key={promise} className="flex items-center gap-2">
                <CheckCircle size={17} weight="fill" aria-hidden="true" className="text-volt" />
                {promise}
              </li>
            ))}
          </ul>
        </Container>
      </header>

      {searching ? (
        <Section>
          <p aria-live="polite" className="m-0 mb-4 text-[15px] text-ink-60">
            {results.length === 0
              ? COPY.noResults
              : `${results.length} ${results.length === 1 ? "tool" : "tools"} for “${query.trim()}”`}
          </p>
          {results.length === 0 ? (
            <div>
              <p className="m-0 mb-6 max-w-[52ch] text-lg">{COPY.noResultsHint}</p>
              <Button
                to="/#contact"
                iconNode={<ArrowRight size={14} weight="bold" aria-hidden="true" />}
              >
                Tell us about it
              </Button>
            </div>
          ) : (
            <div className="border-t border-hairline-strong">
              {results.map((tool) => (
                <ToolRow key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
        </Section>
      ) : (
        <>
          <Section>
            <h2 className="m-0 mb-8 font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
              {COPY.featuredHeading}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))] gap-x-6 gap-y-10">
              {FEATURED_TOOLS.map((slug, index) => (
                <FeaturedCard key={slug} tool={getTool(slug)} delay={(index % 2) * 80} />
              ))}
            </div>
          </Section>

          <Section bare className="pb-[clamp(64px,9vw,120px)]">
            <h2 className="m-0 mb-10 font-title text-[clamp(28px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
              {COPY.browseHeading}
            </h2>
            <div className="grid gap-12">
              {TOOL_CATEGORIES.map((category) => (
                <Reveal key={category}>
                  <div className="grid gap-x-10 gap-y-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
                    <h3 className="m-0 font-title text-base font-semibold lg:pt-4">{category}</h3>
                    <div className="border-t border-carbon">
                      {TOOLS.filter((tool) => tool.category === category).map((tool) => (
                        <ToolRow key={tool.slug} tool={tool} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section tone="dark">
            <Reveal>
              <div className="grid gap-x-16 gap-y-6 lg:grid-cols-2">
                <h2 className="m-0 font-title text-[clamp(36px,5vw,68px)] leading-[1.05] font-semibold tracking-[-0.02em]">
                  {COPY.editorial.heading}
                </h2>
                <div className="grid gap-5 text-lg text-paper-70">
                  {COPY.editorial.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="m-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </Section>

          <Section>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="m-0 max-w-[24ch] font-title text-[clamp(26px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
                  {COPY.closing.heading}
                </h2>
                <Button
                  to={COPY.closing.to}
                  iconNode={<ArrowRight size={14} weight="bold" aria-hidden="true" />}
                >
                  {COPY.closing.label}
                </Button>
              </div>
            </Reveal>
          </Section>
        </>
      )}
    </>
  );
}
