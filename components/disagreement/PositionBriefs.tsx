import type { ReactNode } from "react";
import type { DisagreementReportV1 } from "@/types/disagreement";
import { ReportSection, SourceNotes } from "./ReportSection";

/**
 * The positions as briefs, led by who holds them. No "01 / 02" markers: the
 * positions are not a sequence, and a number would imply an order of merit.
 * The thesis reads as prose; the steelman is labelled so a reader can tell the
 * report's reconstruction from what was said, and the source quotes sit
 * behind a disclosure.
 */
export function PositionBriefs({
  report,
  renderFeedback,
}: {
  report: DisagreementReportV1;
  renderFeedback?: (positionId: string) => ReactNode;
}) {
  const participants = new Map(report.participants.map((item) => [item.id, item.label]));

  return (
    <ReportSection
      id="positions"
      title="The positions"
      lede="Each position is stated at its strongest. Inclusion is not endorsement, and a steelman is the report’s reconstruction, not a quote."
    >
      <div className="divide-y divide-[var(--border-divider)]">
        {report.positions.map((position) => {
          const speaker = position.participantIds
            .map((id) => participants.get(id) ?? "Speaker")
            .join(", ");
          return (
            <article
              key={position.id}
              className="grid gap-2 py-6 first:pt-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,3.5fr)] sm:gap-8"
            >
              <p className="font-sans text-sm font-semibold text-[var(--text-primary)] sm:pt-1">{speaker}</p>
              <div className="min-w-0">
                <h3 className="font-serif text-[1.375rem] leading-snug text-[var(--text-heading)]">
                  {position.label}
                </h3>
                <p className="mt-2 max-w-[36rem] font-serif text-lg leading-relaxed text-[var(--text-primary)]">
                  {position.thesis}
                </p>
                <p className="mt-3 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                  <span className="label-caps mr-1.5">At its strongest</span>
                  {position.steelman}
                </p>
                <p className="mt-3 font-sans text-[0.8125rem] text-[var(--text-muted)]">
                  {position.explicitness === "explicit" ? "Stated in source" : "Reconstructed (inferred)"},{" "}
                  {position.confidence} confidence
                </p>
                <SourceNotes quotes={position.grounding} />
                {renderFeedback?.(position.id)}
              </div>
            </article>
          );
        })}
      </div>
    </ReportSection>
  );
}
