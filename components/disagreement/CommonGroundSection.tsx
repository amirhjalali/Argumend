import type { DisagreementReportV1 } from "@/types/disagreement";
import { ReportSection, SourceNotes } from "./ReportSection";

/**
 * What the participants already share. It comes first because it is the
 * half of the diagnosis people most often do not expect: before the split,
 * the ground nobody is contesting.
 */
export function CommonGroundSection({ report }: { report: DisagreementReportV1 }) {
  return (
    <ReportSection id="common-ground" title="What they agree on">
      {report.commonGround.length === 0 ? (
        <p className="max-w-[36rem] font-serif text-lg leading-relaxed text-[var(--text-secondary)]">
          No reliable shared premise could be established from this text.
        </p>
      ) : (
        <ul className="space-y-6">
          {report.commonGround.map((item) => (
            <li key={item.id} className="border-l-2 border-deep/40 pl-4 dark:border-deep-light/50">
              <p className="max-w-[36rem] font-serif text-[1.25rem] leading-snug text-[var(--text-heading)]">
                {item.statement}
              </p>
              <p className="mt-1.5 font-sans text-[0.8125rem] text-[var(--text-muted)]">
                {item.basis === "explicit" ? "Stated by all sides" : "Strongly implied"}
              </p>
              <SourceNotes quotes={item.grounding} />
            </li>
          ))}
        </ul>
      )}
    </ReportSection>
  );
}
