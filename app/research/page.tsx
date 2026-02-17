import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { citations, researchSections } from "@/data/research";
import type { Citation } from "@/data/research";
import { BookOpen, ExternalLink, Scale } from "lucide-react";

/** Map citation id to its 1-based display number */
function buildCitationIndex(): Map<string, number> {
  const map = new Map<string, number>();
  // Collect ids in the order they first appear in sections
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

function InlineCitation({ ids, index }: { ids: string[]; index: Map<string, number> }) {
  return (
    <>
      {ids.map((id, i) => {
        const num = index.get(id);
        if (!num) return null;
        return (
          <sup key={id} className="ml-[1px]">
            <a
              href={`#ref-${id}`}
              className="text-deep hover:text-deep-dark text-[11px] font-medium no-underline hover:underline"
            >
              [{num}]
            </a>
            {i < ids.length - 1 && <span className="text-stone-400">,</span>}
          </sup>
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
    <li id={`ref-${citation.id}`} className="flex gap-3 text-sm leading-relaxed scroll-mt-24">
      <span className="text-stone-400 font-mono text-xs mt-0.5 flex-shrink-0 w-6 text-right">
        [{num}]
      </span>
      <div className="text-secondary">
        <span className="text-primary font-medium">{formatAuthors(citation.authors)}</span>
        {" "}({citation.year}).{" "}
        <em>{citation.title}.</em>{" "}
        <span className="text-stone-500">{citation.source}.</span>
        {citation.url && (
          <>
            {" "}
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-deep hover:text-deep-dark inline-flex items-center gap-1 hover:underline"
            >
              Link
              <ExternalLink className="h-3 w-3" />
            </a>
          </>
        )}
        {citation.accessDate && (
          <span className="text-stone-400 text-xs ml-1">
            (accessed {citation.accessDate})
          </span>
        )}
      </div>
    </li>
  );
}

export default function ResearchPage() {
  const citationIndex = buildCitationIndex();

  // Build ordered citation list based on first-appearance order
  const orderedCitations: { citation: Citation; num: number }[] = [];
  const ordered = [...citationIndex.entries()].sort((a, b) => a[1] - b[1]);
  for (const [id, num] of ordered) {
    const c = citations.find((cit) => cit.id === id);
    if (c) orderedCitations.push({ citation: c, num });
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-20">
        {/* Hero */}
        <div className="mb-16 md:mb-24">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-4">
            Research
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
            The science behind<br />
            <span className="text-stone-500">better arguments</span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl">
            Every design decision in Argumend is grounded in peer-reviewed research on polarization,
            misinformation, and deliberative reasoning. This page documents the evidence.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote className="my-12 md:my-16 py-6 border-l-2 border-stone-300 pl-6 md:pl-7">
          <p className="font-serif text-xl md:text-2xl text-primary italic leading-[1.6]">
            &ldquo;It is the mark of an educated mind to be able to entertain a thought
            without accepting it.&rdquo;
          </p>
          <cite className="block mt-3 text-sm text-stone-500 not-italic">
            — Aristotle
          </cite>
        </blockquote>

        {/* Sections */}
        {researchSections.map((section) => (
          <section key={section.id} id={section.id} className="mb-16 md:mb-24 scroll-mt-16">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
              {section.title}
            </h2>
            <p className="text-base text-secondary italic mb-6">
              {section.subtitle}
            </p>
            <div className="space-y-5 text-base md:text-lg text-secondary leading-[1.75]">
              {section.paragraphs.map((para, i) => (
                <p key={i}>
                  {para.text}
                  {para.citationIds.length > 0 && (
                    <InlineCitation ids={para.citationIds} index={citationIndex} />
                  )}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Section navigation */}
        <div className="bg-[#faf8f3]/60 border border-stone-200/70 rounded-lg p-5 md:p-6 mb-16 md:mb-24">
          <div className="flex items-center gap-2.5 mb-4">
            <BookOpen className="h-4 w-4 text-deep" strokeWidth={1.8} />
            <h3 className="text-sm font-medium text-primary">In this article</h3>
          </div>
          <ol className="space-y-2">
            {researchSections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-stone-500 hover:text-deep transition-colors flex items-start gap-2"
                >
                  <span className="text-stone-400 font-mono text-xs mt-0.5">
                    {i + 1}.
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* References */}
        <section id="references" className="mb-16 md:mb-24 scroll-mt-16">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">References</h2>
          <ol className="space-y-4">
            {orderedCitations.map(({ citation, num }) => (
              <ReferenceEntry key={citation.id} citation={citation} num={num} />
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="text-center py-10 border-t border-stone-200/80">
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">
            See the research in action
          </h3>
          <p className="text-secondary mb-7">
            Every topic analysis on Argumend implements these evidence-based principles.
          </p>
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
          >
            Explore Topics
            <Scale className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* Footer tagline */}
        <div className="pt-6 border-t border-stone-200 mt-8">
          <p className="text-sm text-muted italic text-center">
            All claims on this page are cited. If we got something wrong, tell us.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
