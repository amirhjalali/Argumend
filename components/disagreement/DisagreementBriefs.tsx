import { disagreementAbout, resolvabilitySentence } from "@/lib/disagreement/labels";
import type { DisagreementReportV1 } from "@/types/disagreement";
import { ReportSection } from "./ReportSection";

/**
 * The remaining disagreements, one brief each: the disputed question, what
 * kind of question it is, who stands where, and what would resolve it. The
 * kind is the point of this box in the spec — a disagreement about a value is
 * not waiting on more evidence, and saying which kind each one is keeps the
 * report from implying it is.
 */
export function DisagreementBriefs({ report }: { report: DisagreementReportV1 }) {
  if (report.disagreements.length === 0) return null;
  const participants = new Map(report.participants.map((item) => [item.id, item.label]));

  return (
    <ReportSection id="disagreements" title="Where they still disagree">
      <div className="divide-y divide-[var(--border-divider)]">
        {report.disagreements.map((item) => (
          <article key={item.id} className="py-6 first:pt-0">
            <p className="font-sans text-[0.8125rem] text-[var(--text-muted)]">
              <span className="font-medium text-[var(--text-secondary)]">
                A question {disagreementAbout(item.type)}.
              </span>{" "}
              {resolvabilitySentence(item.resolvability)}
            </p>
            <h3 className="mt-1 max-w-[36rem] font-serif text-[1.375rem] leading-snug text-[var(--text-heading)]">
              {item.question}
            </h3>
            <p className="mt-2 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
              {item.summary}
            </p>
            {item.participantStances.length > 0 ? (
              <dl className="mt-4 max-w-[36rem] space-y-1.5 font-sans text-[0.9375rem]">
                {item.participantStances.map((stance, stanceIndex) => (
                  <div key={`${item.id}-${stanceIndex}`} className="flex gap-3">
                    <dt className="w-24 shrink-0 font-medium text-[var(--text-primary)]">
                      {participants.get(stance.participantId) ?? "Participant"}
                    </dt>
                    <dd className="min-w-0 font-serif text-[1.0625rem] text-[var(--text-secondary)]">
                      {stance.stance}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <p className="mt-4 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-primary)]">
              <span className="label-caps mr-1.5">Would resolve it</span>
              {item.resolutionCondition}
            </p>
          </article>
        ))}
      </div>
    </ReportSection>
  );
}
