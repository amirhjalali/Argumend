import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { NextStep } from "@/components/learn/ArticleLayout";
import { TableOfContents, type TocHeading } from "@/components/TableOfContents";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { citations, readingList, researchSections } from "@/data/research";
import type { Citation } from "@/data/research";
import { LEARN_HUB_HREF } from "@/lib/learn/sections";
import { mapLinkFor, FLAGSHIP_MAP_IDS } from "@/lib/learn/nextStep";
import { ExternalLink } from "lucide-react";

/** Map citation id to its 1-based display number, in order of first use. */
function buildCitationIndex(): Map<string, number> {
  const map = new Map<string, number>();
  const seen: string[] = [];
  for (const section of researchSections) {
    for (const para of section.paragraphs) {
      for (const id of para.citationIds) {
        if (!seen.includes(id)) seen.push(id);
      }
    }
  }
  seen.forEach((id, i) => map.set(id, i + 1));
  return map;
}

/**
 * Numbered markers with a 44px tap target around a small superscript. The
 * negative margins give the extra box back to the line, so the text around a
 * marker sits where it did when the target was 24px.
 */
function InlineCitation({ ids, index }: { ids: string[]; index: Map<string, number> }) {
  return (
    <>
      {ids.map((id) => {
        const num = index.get(id);
        if (!num) return null;
        return (
          <a
            key={id}
            href={`#ref-${id}`}
            aria-label={`Reference ${num}`}
            className="-my-2.5 -ml-1.5 -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm align-super font-sans text-xs font-medium text-deep no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40 dark:text-accent-text"
          >
            [{num}]
          </a>
        );
      })}
    </>
  );
}

function formatAuthors(authors: string[]): string {
  if (authors.length <= 2) return authors.join(" & ");
  return `${authors[0]} et al.`;
}

function ReferenceEntry({ citation, num }: { citation: Citation; num: number }) {
  return (
    <li id={`ref-${citation.id}`} className="flex gap-3 font-sans text-sm leading-relaxed">
      <span className="mt-0.5 w-7 shrink-0 text-right font-mono text-xs text-muted">[{num}]</span>
      <div className="min-w-0 text-secondary">
        <span className="font-medium text-primary">{formatAuthors(citation.authors)}</span> (
        {citation.year}). <em>{citation.title}.</em> <span>{citation.source}.</span>
        {citation.url && (
          <>
            {" "}
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="-my-3 inline-flex min-h-11 min-w-11 items-center gap-1 text-deep underline decoration-deep/30 underline-offset-2 hover:text-deep-dark dark:text-accent-text"
            >
              Link
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </>
        )}
        {citation.accessDate && (
          <span className="ml-1 text-xs text-muted">(accessed {citation.accessDate})</span>
        )}
      </div>
    </li>
  );
}

export default function ResearchPage() {
  const citationIndex = buildCitationIndex();

  const orderedCitations: { citation: Citation; num: number }[] = [];
  for (const [id, num] of [...citationIndex.entries()].sort((a, b) => a[1] - b[1])) {
    const c = citations.find((cit) => cit.id === id);
    if (c) orderedCitations.push({ citation: c, num });
  }

  const headings: TocHeading[] = [
    ...researchSections.map((section) => ({ id: section.id, text: section.title, level: 2 as const })),
    { id: "reading", text: "Further reading", level: 2 },
    { id: "references", text: "References", level: 2 },
  ];

  const researchJsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: "The research behind Argumend",
    description:
      "People who disagree usually disagree less than they think. The research on that gap, on polarization and misinformation, and on what helps.",
    url: "https://argumend.org/research",
    author: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
    publisher: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
    citation: orderedCitations.map(({ citation }) => ({
      "@type": "CreativeWork",
      name: citation.title,
      author: citation.authors.join(", "),
      datePublished: String(citation.year),
      ...(citation.url ? { url: citation.url } : {}),
    })),
  };

  return (
    <AppShell layout="reading">
      <JsonLd data={researchJsonLd} />
      <PageContainer width="reading" as="article">
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Learn", href: LEARN_HUB_HREF },
            { label: "Why this exists" },
          ]}
          eyebrow="Why this exists"
          title="The research behind Argumend"
          lede="People on opposite sides of a question usually disagree less than they think. Argumend exists to close that gap by showing what a disagreement actually turns on. This page gathers the research behind the idea."
        />

        <div className="relative">
          <TableOfContents headings={headings} label="On this page" />

          <div className="space-y-12">
            {researchSections.map((section) => (
              <Section key={section.id} id={section.id} title={section.title} lede={section.subtitle}>
                <div className="reading-body space-y-5">
                  {section.paragraphs.map((para) => (
                    <p key={para.text.slice(0, 40)}>
                      {para.text}
                      {para.citationIds.length > 0 && (
                        <InlineCitation ids={para.citationIds} index={citationIndex} />
                      )}
                    </p>
                  ))}
                </div>
              </Section>
            ))}

            <Section
              id="reading"
              title="Further reading"
              lede="The books, references and tools that shaped how the maps are built."
            >
              <div className="space-y-8">
                {readingList.map((shelf) => (
                  <div key={shelf.id}>
                    <h3 className="font-serif text-xl text-primary">{shelf.title}</h3>
                    <p className="mt-1 max-w-[36rem] font-sans text-sm leading-relaxed text-secondary">
                      {shelf.description}
                    </p>
                    <ul className="mt-3 border-y border-divider">
                      {shelf.items.map((item, index) => (
                        <li key={item.title} className={index > 0 ? "border-t border-divider" : undefined}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-h-11 items-start justify-between gap-4 rounded-sm py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40"
                          >
                            <span className="min-w-0">
                              <span className="block font-serif text-lg leading-snug text-primary transition-colors group-hover:text-accent-text">
                                {item.title}
                              </span>
                              <span className="mt-0.5 block font-sans text-sm leading-relaxed text-secondary">
                                {item.description}
                              </span>
                              <span className="mt-0.5 block font-sans text-xs text-muted">{item.kind}</span>
                            </span>
                            <ExternalLink className="mt-1.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="references" title="References">
              <ol className="space-y-3">
                {orderedCitations.map(({ citation, num }) => (
                  <ReferenceEntry key={citation.id} citation={citation} num={num} />
                ))}
              </ol>
              <p className="mt-6 font-sans text-sm text-muted">
                Every claim on this page is cited. If we got something wrong, tell us.
              </p>
            </Section>
          </div>
        </div>

        <NextStep map={mapLinkFor(FLAGSHIP_MAP_IDS.unemployment)!} label="See it on a map" />
      </PageContainer>
    </AppShell>
  );
}
