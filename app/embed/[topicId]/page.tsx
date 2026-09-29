import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SettleAnswer } from "@/components/topic/cruxPrimitives";
import { TextAction } from "@/components/ui";
import { numberWord } from "@/lib/topicPage/model";
import { embedMeta, embedTopicIds, loadEmbedModel } from "./_model";

/**
 * The embeddable map summary (an <iframe> on other people's sites; the code
 * comes from components/EmbedButton.tsx: width 100%, height 400).
 *
 * It shows what a map is for, in the order the map page uses: the question,
 * what the sides already agree on, the first question the fight turns on and
 * what would settle it, then a link to the whole map. It never shows a
 * verdict, a margin, a balance or a winner: a widget on someone else's page
 * is the last place to tell their readers who won.
 *
 * Compact and self-contained: one column, at most ~600px tall at 600px wide,
 * readable in light and dark (it follows the viewer's colour scheme).
 */

// ---------------------------------------------------------------------------
// Static Generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return embedTopicIds().map((topicId) => ({ topicId }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ topicId: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const meta = embedMeta(topicId);
  if (!meta) return { title: "Not Found" };

  return {
    title: `${meta.title} — Embed`,
    description: meta.description,
    robots: { index: false, follow: false },
  };
}

// ---------------------------------------------------------------------------
// Page Component (Server)
// ---------------------------------------------------------------------------

export default async function EmbedPage({ params }: PageProps) {
  const { topicId } = await params;
  const map = await loadEmbedModel(topicId);

  if (!map) {
    notFound();
  }

  return (
    <main id="main-content" className="mx-auto w-full max-w-[600px] px-4 py-5 font-sans sm:px-5">
      <article aria-labelledby="embed-title" data-embed-kind={map.kind}>
        <p className="label-caps">Argumend map</p>
        <h1
          id="embed-title"
          className="mt-1 text-balance break-words font-serif text-[1.5rem] leading-[1.15] tracking-[-0.01em] text-primary dark:text-stone-200 sm:text-[1.625rem]"
        >
          {map.title}
        </h1>
        {map.subtitle && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-secondary dark:text-stone-400">
            <span className="font-medium">{map.subtitle.lead}:</span> {map.subtitle.text}
          </p>
        )}

        {map.agreement.length > 0 && (
          <section aria-labelledby="embed-agreement" className="mt-3.5 border-t border-divider pt-3">
            <h2 id="embed-agreement" className="label-caps">
              {map.agreementHeading}
            </h2>
            <ul className="mt-1.5 space-y-1.5">
              {map.agreement.map((fact) => (
                <li
                  key={fact}
                  className="relative line-clamp-2 pl-3.5 font-serif text-[0.9375rem] leading-[1.4] text-secondary dark:text-stone-400 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-stone-400 before:content-['']"
                >
                  {fact}
                </li>
              ))}
            </ul>
          </section>
        )}

        {map.crux && (
          <section
            aria-labelledby="embed-crux"
            className="mt-3.5 border-l-2 border-crux/50 pl-3.5 dark:border-crux-light/60"
          >
            <h2 id="embed-crux" className="label-caps !text-crux-text">
              The question it turns on
            </h2>
            <p className="mt-1 line-clamp-3 text-pretty font-serif text-[1.125rem] font-medium leading-[1.35] text-stone-900 dark:text-stone-100">
              {map.crux.question}
            </p>
            {/* The map page's own "what would settle it" line, a size down
                and held to three lines; the whole test is one tap away. */}
            <div className="[&_[data-settle]>span:last-child]:line-clamp-3 [&_[data-settle]>span:last-child]:text-[1rem] [&_[data-settle]>span:last-child]:leading-[1.45] [&_[data-settle]]:!mt-2">
              <SettleAnswer
                mode={map.crux.settle.mode}
                kind={map.crux.settle.kind}
                condition={map.crux.settle.condition}
                resolved={map.crux.settle.resolved}
                label={map.crux.settle.label}
              />
            </div>
          </section>
        )}

        <footer className="mt-3.5 flex flex-wrap items-center justify-between gap-x-4 border-t border-divider pt-1">
          <TextAction href={map.href} target="_blank" rel="noopener noreferrer">
            Read the whole map on Argumend →
          </TextAction>
          {map.cruxCount > 1 && (
            <span className="text-xs text-muted">
              {numberWord(map.cruxCount)} questions in all
            </span>
          )}
        </footer>
      </article>
    </main>
  );
}
