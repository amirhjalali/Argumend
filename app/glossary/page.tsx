import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { glossaryPageTerms, glossaryTermId } from "@/data/glossaryPageTerms";
import {
  glossaryChapterOrder,
  glossaryChapters,
  getGlossaryChapter,
  getGlossaryTermIcon,
  groupTermsByChapter,
} from "@/lib/glossaryMeta";

export default function GlossaryPage() {
  const terms = glossaryPageTerms;

  // Sort terms alphabetically for the A–Z index at the bottom.
  const sortedTerms = [...terms].sort((a, b) => a.term.localeCompare(b.term));

  // Build alphabetical index
  const alphabet = Array.from(
    new Set(sortedTerms.map((t) => t.term[0].toUpperCase()))
  ).sort();

  const chapters = groupTermsByChapter(terms);

  const definedTerms = terms.map((t) => {
    // Match the on-page anchor slug so each term's JSON-LD url resolves to a
    // real in-page target (same transform used when rendering the <dl> below).
    const termId = glossaryTermId(t.term);
    return {
      "@type": "DefinedTerm",
      "@id": `https://argumend.org/glossary#${termId}`,
      name: t.term,
      description: t.definition,
      url: `https://argumend.org/glossary#${termId}`,
      inDefinedTermSet: "https://argumend.org/glossary",
    };
  });

  // Tracks which letters already have a jump-link target, so each `#letter-X`
  // anchor is emitted exactly once (on the first term of that letter in DOM
  // order) rather than duplicated across every term sharing the letter.
  const renderedLetters = new Set<string>();

  return (
    <AppShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Critical Thinking & Argument Mapping Glossary",
          description: `Definitions of ${terms.length} key terms used in critical thinking, argument mapping, and evidence-based reasoning.`,
          url: "https://argumend.org/glossary",
          publisher: {
            "@type": "Organization",
            name: "ARGUMEND",
            url: "https://argumend.org",
          },
          hasDefinedTerm: definedTerms,
        }}
      />

      <div className="mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Glossary" },
          ]}
        />

        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-muted dark:text-stone-400 mb-4">
            Reference
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-deep/10 text-deep dark:bg-deep/20 dark:text-[#9bc7c3]">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-primary dark:text-stone-200">
              Glossary
            </h1>
          </div>
          <p className="text-secondary dark:text-stone-400 text-lg leading-relaxed max-w-2xl">
            {terms.length} key terms used in critical thinking, argument
            mapping, and evidence-based reasoning, sorted into {chapters.length}{" "}
            chapters. Each definition is written to be clear, precise, and
            useful &mdash; with examples from real Argumend analyses.
          </p>
        </div>

        {/* Chapter index — doubles as a jump-to-section nav */}
        <nav aria-label="Glossary chapters" className="mb-6 flex flex-wrap gap-2">
          {glossaryChapterOrder.map((id) => {
            const chapter = glossaryChapters[id];
            const count = chapters.find((c) => c.chapter.id === id)?.items.length ?? 0;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`inline-flex min-h-10 items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${chapter.chip}`}
              >
                <span className="font-serif text-[13px] opacity-70">{chapter.numeral}</span>
                {chapter.label}
                <span className="opacity-60 tabular-nums">{count}</span>
              </a>
            );
          })}
        </nav>

        {/* Alphabetical jump links */}
        <nav aria-label="Alphabetical navigation" className="mb-12">
          <div className="flex flex-wrap gap-1.5">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-200/60 dark:border-[var(--border-divider)] text-sm font-mono font-medium text-stone-500 dark:text-stone-400 hover:border-deep/30 hover:text-deep dark:hover:text-[#9bc7c3] hover:bg-deep/5 dark:hover:bg-deep/10 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </nav>

        {/* Terms by chapter */}
        {chapters.map(({ chapter, items }) => (
          <section key={chapter.id} id={chapter.id} className="mb-14 scroll-mt-24">
            <div className="flex items-baseline gap-3 mb-2">
              <span className={`font-serif text-2xl ${chapter.iconText}`}>
                {chapter.numeral}.
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-primary dark:text-stone-200">
                {chapter.label}
              </h2>
            </div>
            <p className="text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-6">
              {chapter.description}
            </p>

            <dl className="space-y-4">
              {items.map((t) => {
                const letter = t.term[0].toUpperCase();
                const isFirstOfLetter = !renderedLetters.has(letter);
                if (isFirstOfLetter) renderedLetters.add(letter);
                const termId = glossaryTermId(t.term);
                const Icon = getGlossaryTermIcon(t.term);
                return (
                  <div
                    key={t.term}
                    id={termId}
                    className={`group scroll-mt-24 flex items-start gap-4 rounded-xl border border-l-2 border-stone-200/60 dark:border-[var(--border-default)] bg-white/60 dark:bg-[var(--bg-card)]/60 p-5 transition-colors ${chapter.borderAccent} ${chapter.hoverBorder}`}
                  >
                    {/* Alphabetical jump-link target — emitted once per letter,
                        in-flow with scroll-margin so it clears the sticky
                        topbar instead of landing beneath it. */}
                    {isFirstOfLetter && (
                      <span
                        id={`letter-${letter}`}
                        aria-hidden="true"
                        className="block scroll-mt-24"
                      />
                    )}
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${chapter.iconBg}`}
                      aria-hidden="true"
                    >
                      <Icon className={`h-5 w-5 ${chapter.iconText}`} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <dt className="font-serif text-lg text-primary dark:text-stone-200 font-medium mb-1">
                        {t.term}
                      </dt>
                      <dd className="text-secondary dark:text-stone-400 leading-relaxed pl-0">
                        {t.definition}
                        {t.exampleHref && t.example && (
                          <Link
                            href={t.exampleHref}
                            className="flex min-h-10 items-center gap-1.5 mt-2 text-deep dark:text-[#9bc7c3] hover:text-deep-dark dark:hover:text-[#b7d9d6] text-sm font-medium transition-colors"
                          >
                            <ArrowRight className="h-3 w-3" />
                            {t.example}
                          </Link>
                        )}
                        {t.learnMoreHref && (
                          <Link
                            href={t.learnMoreHref}
                            className="inline-flex min-h-10 items-center gap-1 ml-0 mt-1 text-deep dark:text-[#9bc7c3] hover:text-deep-dark dark:hover:text-[#b7d9d6] text-sm font-medium transition-colors"
                          >
                            {t.learnMoreText || "Learn more"}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </section>
        ))}

        {/* All Terms A-Z */}
        <section id="all-terms" className="mb-12 scroll-mt-24">
          <h2 className="font-serif text-2xl text-primary dark:text-stone-200 mb-6 pb-2 border-b border-stone-200/60 dark:border-[var(--border-divider)]">
            All Terms A&ndash;Z
          </h2>
          <div className="columns-1 sm:columns-2 gap-6">
            {sortedTerms.map((t) => {
              const Icon = getGlossaryTermIcon(t.term);
              const chapter = getGlossaryChapter(t.category);
              return (
                <a
                  key={t.term}
                  href={`#${glossaryTermId(t.term)}`}
                  className="flex min-h-10 items-center gap-2 text-sm text-secondary dark:text-stone-400 hover:text-deep dark:hover:text-[#9bc7c3] transition-colors py-1"
                >
                  <Icon
                    className={`h-3.5 w-3.5 flex-shrink-0 ${chapter.iconText}`}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  {t.term}
                </a>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-14 p-6 rounded-xl bg-[#faf8f5] dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-divider)] text-center">
          <h3 className="font-serif text-xl text-primary dark:text-stone-200 mb-2">
            See These Concepts in Action
          </h3>
          <p className="text-secondary dark:text-stone-400 mb-4">
            Every term in this glossary is applied across our topic
            analyses, with steel-manned positions, weighted evidence, and crux
            questions.
          </p>
          <Link
            href="/topics"
            className="inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-b from-rust-500 to-rust-600 text-white font-medium text-sm hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
          >
            Explore Topics
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
