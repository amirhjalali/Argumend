import type { DisagreementReportV1, EvidenceState } from "@/types/disagreement";

/**
 * The primary crux's evidence state (spec §6.6). It says what the source's
 * evidence does and does not establish for the crux question, in the spec's
 * own wording, and nothing more: no percentage, no verdict, no claim that
 * anything was checked. Renders nothing when the report has no crux, because
 * the state belongs to the crux rather than to the report.
 */
const EVIDENCE_STATE_COPY: Record<EvidenceState, { label: string; detail: string }> = {
  "not-independently-checked": {
    label: "No independent verification performed",
    detail:
      "This report maps what the source says about this question. It has not checked whether any of those claims are true.",
  },
  "asserted-in-source": {
    label: "Evidence was asserted in the source",
    detail:
      "The source offers evidence for this question. That evidence was taken as stated and not independently checked.",
  },
  "no-evidence-provided": {
    label: "No evidence was supplied in the source",
    detail:
      "The source takes positions on this question without offering evidence for them. Nothing here can be checked against the text.",
  },
};

export function evidenceStateLabel(state: EvidenceState): string {
  return EVIDENCE_STATE_COPY[state].label;
}

export function EvidenceStateSection({ report }: { report: DisagreementReportV1 }) {
  const primary = report.cruxes[0];
  if (!primary) return null;
  const copy = EVIDENCE_STATE_COPY[primary.evidenceState];

  return (
    <section
      aria-labelledby="evidence-state-heading"
      className="mt-6 border-t border-[var(--border-divider)] pt-4"
    >
      <h3
        id="evidence-state-heading"
        className="text-[11px] font-medium tracking-[0.18em] text-[var(--text-muted)]"
      >
        EVIDENCE STATE
      </h3>
      <p className="mt-2 text-sm font-medium text-deep dark:text-deep-bright">{copy.label}</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{copy.detail}</p>
    </section>
  );
}
