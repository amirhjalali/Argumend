import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { glossaryByLetter, type GlossaryEntry } from "@/lib/learn/glossary";
import { indexCrumbs } from "@/lib/learn/sections";

const LINK =
  "inline-flex min-h-11 items-center rounded-sm font-sans text-sm text-deep underline decoration-deep/30 underline-offset-2 transition-colors hover:text-deep-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40 dark:text-accent-text";

function Entry({ entry }: { entry: GlossaryEntry }) {
  const hasMore = Boolean(entry.rest || entry.example || entry.readMore);
  const line = (
    <span className="line-clamp-2 font-sans text-[0.9375rem] leading-relaxed text-secondary group-open:line-clamp-none">
      <dfn className="mr-1.5 font-serif text-lg not-italic text-primary">{entry.term}</dfn>
      {entry.summary}
    </span>
  );
  return (
    <li id={entry.id} className="border-t border-divider first:border-t-0">
      {entry.aliases.map((alias) => (
        // An old anchor that must keep landing here (e.g. #confidence-score).
        <span key={alias} id={alias} aria-hidden="true" className="block" />
      ))}
      {hasMore ? (
        <details className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-3 rounded-sm py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40 [&::-webkit-details-marker]:hidden">
            {line}
            <ChevronDown
              className="mt-1.5 h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-4">
            {entry.rest ? (
              <p className="font-sans text-[0.9375rem] leading-relaxed text-secondary">{entry.rest}</p>
            ) : null}
            <div className="mt-1 flex flex-wrap gap-x-5">
              {entry.readMore ? (
                <Link href={entry.readMore.href} className={LINK}>
                  {entry.readMore.label}
                </Link>
              ) : null}
              {entry.example ? (
                <Link href={entry.example.href} className={LINK}>
                  {entry.example.label}
                </Link>
              ) : null}
            </div>
          </div>
        </details>
      ) : (
        <p className="py-2">{line}</p>
      )}
    </li>
  );
}

export default function GlossaryPage() {
  const letters = glossaryByLetter();
  const entries = letters.flatMap((group) => group.entries);

  return (
    <AppShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Critical Thinking & Argument Mapping Glossary",
          description: `Definitions of ${entries.length} key terms used in critical thinking, argument mapping, and evidence-based reasoning.`,
          url: "https://argumend.org/glossary",
          publisher: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
          hasDefinedTerm: entries.map((entry) => ({
            "@type": "DefinedTerm",
            "@id": `https://argumend.org/glossary#${entry.id}`,
            name: entry.term,
            description: `${entry.summary} ${entry.rest}`.trim(),
            url: `https://argumend.org/glossary#${entry.id}`,
            inDefinedTermSet: "https://argumend.org/glossary",
          })),
        }}
      />
      {/* An index, so the index width like /learn, /fallacies and /blog: the
          h1 does not jump between them. The list keeps the reading column. */}
      <PageContainer>
        <PageHeader
          breadcrumbs={indexCrumbs("Glossary")}
          eyebrow="Learn"
          title="Glossary"
          lede="Terms from argument mapping and reasoning, A to Z. Tap one for the longer definition; the core ideas and the fallacies have pages of their own."
          meta={`${entries.length} terms`}
        >
          <nav aria-label="Alphabetical navigation">
            <ul className="flex flex-wrap gap-0.5">
              {letters.map(({ letter }) => (
                <li key={letter}>
                  <a
                    href={`#letter-${letter}`}
                    className="flex h-11 min-w-8 items-center justify-center rounded-md font-serif text-lg text-secondary transition-colors hover:bg-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40"
                  >
                    {letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageHeader>

        <div className="max-w-[44rem] border-t border-divider">
          {letters.map(({ letter, entries: group }) => (
            <section
              key={letter}
              id={`letter-${letter}`}
              aria-labelledby={`letter-${letter}-heading`}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-b border-divider py-1 sm:grid-cols-[3rem_minmax(0,1fr)]"
            >
              <h2
                id={`letter-${letter}-heading`}
                className="pt-2 font-serif text-2xl leading-none text-muted"
              >
                {letter}
              </h2>
              <ul>
                {group.map((entry) => (
                  <Entry key={entry.id} entry={entry} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageContainer>
    </AppShell>
  );
}
