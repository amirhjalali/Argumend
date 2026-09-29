import type { ReactNode } from "react";

/**
 * The one place a paste result keeps its machinery: scores, thresholds,
 * lanes, model ids, timings. Collapsed by default and last on the page.
 *
 * The result above it is written for someone in the argument; this is
 * written for someone checking the result. Nothing here is hidden, and
 * nothing here is needed to read the result, which is the line between the
 * two.
 */
export function HowThisWasRead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <details className={`group border-t border-[var(--border-divider)] pt-4 ${className}`.trim()}>
      <summary className="flex min-h-11 cursor-pointer items-center gap-1.5 font-sans text-[0.9375rem] text-[var(--text-secondary)] marker:content-none hover:text-[var(--text-heading)] [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90 motion-reduce:transition-none">
          ›
        </span>
        How this was read
      </summary>
      <div className="max-w-[40rem] space-y-4 pb-2 pt-3 font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
        {children}
      </div>
    </details>
  );
}

/** One labelled paragraph inside the disclosure. */
export function ReadingNote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="label-caps">{label}</p>
      <div className="mt-1 space-y-1.5">{children}</div>
    </div>
  );
}
