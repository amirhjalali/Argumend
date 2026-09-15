import { bandLabel, diagnosisPatternLabel, disagreementTypeLabel } from "@/lib/disagreement/labels";
import type { DisagreementReportV1 } from "@/types/disagreement";

/**
 * The report masthead: one document opener, not a card. The diagnosis
 * headline is the largest, quietest thing on the page; metadata stays a
 * single small line, and representation confidence moves to the provenance
 * rail instead of leading with three pills.
 */
export function ReportMasthead({ report }: { report: DisagreementReportV1 }) {
  const generated = new Date(report.provenance.generatedAt);
  const dateLabel = Number.isNaN(generated.getTime())
    ? ""
    : generated.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return (
    <header id="report-masthead" className="scroll-mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--border-divider)] pb-4">
        <p className="text-xs font-semibold tracking-[0.22em] text-[var(--text-muted)]">
          ARGUMEND DIAGNOSIS
        </p>
        <p className="text-xs tracking-[0.08em] text-[var(--text-muted)]">
          Source-only{dateLabel ? ` · ${dateLabel}` : ""}
        </p>
      </div>
      <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.12] text-[var(--text-heading)] sm:text-5xl">
        {report.diagnosis.headline}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
        {report.diagnosis.insight}
      </p>
      <p className="mt-6 text-[11px] font-medium tracking-[0.18em] text-[var(--text-muted)]">
        {report.diagnosis.primaryType
          ? `${disagreementTypeLabel(report.diagnosis.primaryType).toUpperCase()} · ${bandLabel(report.diagnosis.resolvability).toUpperCase()}`
          : /* No typed disagreement to name and nothing to resolve: the pattern is the label. */
            diagnosisPatternLabel(report.diagnosis.pattern).toUpperCase()}
      </p>
    </header>
  );
}
