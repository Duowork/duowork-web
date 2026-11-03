import Container from "./Container";
import { CONTACT } from "../data/site";
import type { LegalPageContent } from "../data/legal";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { rise } from "../lib/motion";

const LINK = "underline underline-offset-3 transition-colors duration-200 hover:text-ink-60";

/** Turns the contact email and the regulator's address in the copy into links. */
function LegalText({ text }: { text: string }) {
  const parts = text.split(new RegExp(`(${CONTACT.email.replace(".", "\\.")}|ndpc\\.gov\\.ng)`));

  return parts.map((part, index) => {
    if (part === CONTACT.email) {
      return (
        <a key={index} href={`mailto:${part}`} className={LINK}>
          {part}
        </a>
      );
    }
    if (part === "ndpc.gov.ng") {
      return (
        <a key={index} href={`https://${part}`} target="_blank" rel="noopener noreferrer" className={LINK}>
          {part}
        </a>
      );
    }
    return part;
  });
}

/** Privacy and Terms: a short summary, a numbered contents list, then the text. */
export default function LegalPage({ page }: { page: LegalPageContent }) {
  useDocumentMeta(page.metaTitle, page.metaDescription, page.path);

  return (
    <section className="bg-white pt-[clamp(120px,16vw,180px)] pb-[clamp(64px,9vw,120px)]">
      <Container>
        <h1
          className="m-0 font-title text-[clamp(44px,6vw,84px)] leading-[1.05] font-semibold tracking-[-0.02em]"
          style={rise(0)}
        >
          {page.title}
        </h1>
        <p className="mt-4 mb-0 text-[15px] text-ink-60" style={rise(60)}>
          Last updated {page.updated}
        </p>

        <div
          className="mt-[clamp(32px,5vw,56px)] rounded-[20px] bg-volt-tint p-[clamp(24px,3vw,36px)]"
          style={rise(120)}
        >
          <h2 className="m-0 mb-3 font-title text-xl font-semibold">{page.summaryHeading}</h2>
          <ul className="m-0 grid list-disc gap-2 pl-5 text-[17px] text-ink-80">
            {page.summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-[clamp(40px,6vw,72px)] grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
          <nav aria-label="On this page" className="lg:sticky lg:top-28">
            <h2 className="m-0 mb-2 font-title text-base font-semibold">On this page</h2>
            <ol className="m-0 list-none p-0 text-sm text-ink-60">
              {page.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex min-h-11 items-center gap-2 transition-colors duration-200 hover:text-carbon lg:min-h-8"
                  >
                    <span className="w-5 shrink-0 font-title">{index + 1}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid max-w-[68ch] gap-[clamp(32px,4vw,48px)]">
            {page.sections.map((section, index) => (
              <article key={section.id} id={section.id}>
                <h2 className="m-0 mb-3 font-title text-[clamp(22px,2.2vw,28px)] leading-[1.2] font-semibold tracking-[-0.01em]">
                  {index + 1}. {section.heading}
                </h2>
                <div className="grid gap-3 text-[17px] leading-[1.65] text-ink-80">
                  {section.blocks.map((block, blockIndex) =>
                    typeof block === "string" ? (
                      <p key={blockIndex} className="m-0">
                        <LegalText text={block} />
                      </p>
                    ) : (
                      <ul key={blockIndex} className="m-0 grid list-disc gap-2 pl-5">
                        {block.list.map((item) => (
                          <li key={item}>
                            <LegalText text={item} />
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
