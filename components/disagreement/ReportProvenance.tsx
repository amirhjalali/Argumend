import { bandLabel } from "@/lib/disagreement/labels";
import type { DisagreementReportV1 } from "@/types/disagreement";

/**
 * The right rail: counts, the source-only boundary, and representation
 * confidence behind a disclosure — metadata that should be findable, not a
 * second headline.
 */
export function ReportProvenance({ report }: { report: DisagreementReportV1 }) {
  const accountability = report.accountability;

  return (
    <aside aria-label="Report provenance" className="space-y-6 text-sm">
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] text-[var(--text-muted)]">AT A GLANCE</p>
        <dl className="mt-3 space-y-2">
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--border-divider)] pb-2">
            <dt className="text-[var(--text-secondary)]">Positions</dt>
            <dd className="font-serif text-lg text-[var(--text-primary)]">{report.positions.length}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--border-divider)] pb-2">
            <dt className="text-[var(--text-secondary)]">Shared premises</dt>
            <dd className="font-serif text-lg text-[var(--text-primary)]">{report.commonGround.length}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--border-divider)] pb-2">
            <dt className="text-[var(--text-secondary)]">Disputed questions</dt>
            <dd className="font-serif text-lg text-[var(--text-primary)]">{report.disagreements.length}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[var(--text-secondary)]">Cruxes</dt>
            <dd className="font-serif text-lg text-[var(--text-primary)]">{report.cruxes.length}</dd>
          </div>
        </dl>
      </div>

      {accountability ? (
        <div className="border-t border-[var(--border-divider)] pt-4">
          <p className="text-[11px] font-medium tracking-[0.18em] text-[var(--text-muted)]">STAKES</p>
          <p className="mt-2 text-[var(--text-secondary)]">
            {accountability.stakes.length} major {accountability.stakes.length === 1 ? "claim" : "claims"} examined
            {accountability.gapCount > 0
              ? ` · ${accountability.gapCount} without a stated update`
              : ""}
          </p>
        </div>
      ) : null}

      <div className="border-t border-[var(--border-divider)] pt-4">
        <p className="text-[var(--text-secondary)]">
          This is a <span className="font-medium text-[var(--text-primary)]">source-only</span> analysis. It maps
          what the submitted text says. It does not fact-check claims, identify motives, or judge who is right.
        </p>
      </div>

      <details className="border-t border-[var(--border-divider)] pt-4">
        <summary className="min-h-11 cursor-pointer text-[var(--text-secondary)]">
          How confident is Argumend in this representation?
        </summary>
        <p className="mt-2 text-[var(--text-secondary)]">
          {bandLabel(report.diagnosis.confidence)} — {report.diagnosis.confidenceBasis}
        </p>
      </details>
    </aside>
  );
}
