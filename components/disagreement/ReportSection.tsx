import type { ReactNode } from "react";

/**
 * One section of the diagnosis. Every section opens the same way: a hairline,
 * a serif heading, and at most one line of plain explanation. The shared
 * shell is what makes six sections read as one document instead of six
 * components, and it keeps the heading order a usable outline.
 */
export function ReportSection({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede?: ReactNode;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-24 border-t border-[var(--border-divider)] pt-8">
      <h2
        id={headingId}
        className="font-serif text-[1.75rem] leading-tight text-[var(--text-heading)] sm:text-[2rem]"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-2 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
          {lede}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** A grounding-quote disclosure, shared by every section that cites the source. */
export function SourceNotes({
  quotes,
}: {
  quotes: { id: string; quote: string; speaker?: string }[];
}) {
  if (quotes.length === 0) return null;
  return (
    <details className="group mt-2">
      <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-sans text-sm text-deep marker:content-none dark:text-accent-text [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">
          ›
        </span>
        From the source ({quotes.length})
      </summary>
      <ul className="mb-2 space-y-2 border-l-2 border-[var(--border-divider)] pl-4">
        {quotes.map((ref) => (
          <li key={ref.id} className="font-serif text-base italic leading-relaxed text-[var(--text-secondary)]">
            {ref.speaker ? <span className="not-italic font-sans text-sm text-[var(--text-muted)]">{ref.speaker}: </span> : null}
            &ldquo;{ref.quote}&rdquo;
          </li>
        ))}
      </ul>
    </details>
  );
}
