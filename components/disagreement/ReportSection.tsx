import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

/**
 * One section of the diagnosis: the shared `Section` primitive (hairline,
 * serif h2, one line of explanation). Kept under this name so the report's
 * call sites read as the report; the look lives in components/ui/Section.
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
  return (
    <Section id={id} title={title} lede={lede}>
      {children}
    </Section>
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
