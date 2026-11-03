import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Button from "../Button";
import Container from "../Container";
import Eyebrow from "../Eyebrow";
import Reveal from "../Reveal";
import Section from "../Section";
import { getTool, relatedTools, toolPath, type ToolSlug } from "../../data/tools";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { rise } from "../../lib/motion";
import { TOOL_ICONS } from "../../lib/tools/tool-icons";

type ToolPageProps = {
  slug: ToolSlug;
  /** The work area. */
  children: React.ReactNode;
  /** Sits right under the headline, for what this tool needs explained up front. */
  aside?: React.ReactNode;
};

/** The frame shared by every tool: the story, the work, and where to go next. */
export default function ToolPage({ slug, children, aside }: ToolPageProps) {
  const tool = getTool(slug);
  const related = relatedTools(tool);

  useDocumentMeta(tool.metaTitle, tool.metaDescription, toolPath(slug));

  const facts = [
    { label: "Useful for", value: tool.forWhom },
    { label: "You'll need", value: tool.needs },
    { label: "You'll get", value: tool.outcome },
  ];

  return (
    <>
      <header className="dw-no-print bg-white pt-[clamp(112px,14vw,160px)] pb-[clamp(40px,6vw,72px)]">
        <Container>
          <Link
            to="/tools"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-60 transition-colors duration-200 hover:text-carbon"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All tools
          </Link>

          <div className="mt-4" style={rise(0)}>
            <Eyebrow>{tool.name}</Eyebrow>
          </div>

          <h1
            className="mt-5 mb-0 max-w-[20ch] font-title text-[clamp(38px,5.4vw,72px)] leading-[1.05] font-semibold tracking-[-0.02em]"
            style={rise(60)}
          >
            {tool.headline}
          </h1>

          <p className="mt-5 mb-0 max-w-[56ch] text-lg text-ink-80" style={rise(120)}>
            {tool.intro}
          </p>

          <dl
            className="mt-[clamp(28px,4vw,48px)] mb-0 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-8 gap-y-4 border-t border-hairline-strong pt-5"
            style={rise(180)}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-title text-sm font-semibold">{fact.label}</dt>
                <dd className="m-0 mt-0.5 text-[15px] text-ink-60">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {aside && <div className="mt-6">{aside}</div>}
        </Container>
      </header>

      {children}

      <div className="dw-no-print">
        <Section>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="m-0 max-w-[26ch] font-title text-[clamp(26px,3vw,40px)] leading-[1.15] font-semibold tracking-[-0.01em]">
                {tool.cta.line}
              </h2>
              <Button
                to={tool.cta.to}
                iconNode={<ArrowRight size={14} weight="bold" aria-hidden="true" />}
              >
                {tool.cta.label}
              </Button>
            </div>
          </Reveal>

          {related.length > 0 && (
            <div className="mt-[clamp(48px,6vw,80px)]">
              <h2 className="m-0 mb-5 font-title text-lg font-semibold">
                You might also need
              </h2>
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4 p-0">
                {related.map((item, index) => {
                  const ItemIcon = TOOL_ICONS[item.slug];
                  return (
                    <li key={item.slug}>
                      <Reveal delay={index * 80} className="h-full">
                        <Link
                          to={toolPath(item.slug)}
                          className="group flex h-full items-start gap-4 rounded-2xl border border-hairline-strong p-5 transition-colors duration-200 hover:border-carbon"
                        >
                          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-volt-card">
                            <ItemIcon size={22} aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block font-title text-[17px] font-semibold">
                              {item.name}
                            </span>
                            <span className="mt-0.5 block text-sm text-ink-60">
                              {item.summary}
                            </span>
                          </span>
                        </Link>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Section>
      </div>
    </>
  );
}
