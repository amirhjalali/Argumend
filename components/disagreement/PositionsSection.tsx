import type { ReactNode } from "react";
import type { DisagreementReportV1 } from "@/types/disagreement";

export function PositionsSection({
  report,
  renderFeedback,
}: {
  report: DisagreementReportV1;
  renderFeedback?: (positionId: string) => ReactNode;
}) {
  const participants = new Map(report.participants.map((item) => [item.id, item.label]));
  return (
    <section>
      <h2 className="font-serif text-2xl text-[var(--text-heading)]">The strongest version of each position</h2>
      <div className="mt-4 space-y-4">
        {report.positions.map((position) => {
          const speaker = position.participantIds
            .map((id) => participants.get(id) ?? "Speaker")
            .join(", ");
          return (
            <article key={position.id} className="surface-card rounded-xl border border-[var(--border-default)] p-4">
              <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">{speaker}</p>
              <h3 className="mt-1 font-serif text-xl text-[var(--text-heading)]">{position.label}</h3>
              <p className="mt-2 text-[var(--text-primary)]">{position.thesis}</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{position.steelman}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-[var(--text-muted)]">
                {position.explicitness === "explicit" ? "Explicit" : "Inferred"} · {position.confidence} confidence
              </p>
              {position.grounding.length > 0 ? (
                <details className="mt-2">
                  <summary className="min-h-11 cursor-pointer text-sm text-[#3a6965]">Show source basis</summary>
                  {position.grounding.map((ref) => (
                    <blockquote key={ref.id} className="mt-2 border-l-2 border-[#C4613C] pl-3 text-sm">
                      {ref.quote}
                    </blockquote>
                  ))}
                </details>
              ) : null}
              {renderFeedback?.(position.id)}
            </article>
          );
        })}
      </div>
    </section>
  );
}
