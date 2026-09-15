import type { ReactNode } from "react";
import type { DisagreementReportV1 } from "@/types/disagreement";

/**
 * The positions as numbered briefs: typographic hierarchy and hairlines
 * instead of a card per position. Source quotes stay available behind a
 * minimal disclosure so the brief reads as prose first.
 */
export function PositionBriefs({
  report,
  renderFeedback,
}: {
  report: DisagreementReportV1;
  renderFeedback?: (positionId: string) => ReactNode;
}) {
  const participants = new Map(report.participants.map((item) => [item.id, item.label]));
  const number = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <section aria-labelledby="positions-heading">
      <h2 id="positions-heading" className="font-serif text-2xl text-[var(--text-heading)] sm:text-3xl">
        The positions
      </h2>
      {report.positions.length === 0 ? (
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          No position could be mapped from the text, so there is nothing here to state at its strongest.
        </p>
      ) : (
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          Each position is stated at its strongest. Inclusion is not endorsement, and a steelman is
          the report&rsquo;s reconstruction, not a quote.
        </p>
      )}
      <div className="mt-6 divide-y divide-[var(--border-divider)] border-t border-[var(--border-divider)]">
        {report.positions.map((position, index) => {
          const speaker = position.participantIds
            .map((id) => participants.get(id) ?? "Speaker")
            .join(", ");
          return (
            <article key={position.id} className="grid gap-4 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] sm:gap-8">
              <div>
                <p className="font-serif text-3xl leading-none text-[var(--border-default)]">{number(index)}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{speaker}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl leading-snug text-[var(--text-heading)]">{position.label}</h3>
                <p className="mt-2 leading-relaxed text-[var(--text-primary)]">{position.thesis}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{position.steelman}</p>
                <p className="mt-3 text-xs text-[var(--text-muted)]">
                  {position.explicitness === "explicit" ? "Stated in source" : "Reconstructed (inferred)"} ·{" "}
                  {position.confidence} confidence
                </p>
                {position.grounding.length > 0 ? (
                  <details className="mt-3">
                    <summary className="min-h-11 cursor-pointer text-sm text-[#3a6965] dark:text-deep-bright">
                      Source notes ({position.grounding.length})
                    </summary>
                    <ul className="mt-2 space-y-2 border-l-2 border-[var(--border-divider)] pl-4">
                      {position.grounding.map((ref) => (
                        <li key={ref.id} className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          &ldquo;{ref.quote}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                {renderFeedback?.(position.id)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
