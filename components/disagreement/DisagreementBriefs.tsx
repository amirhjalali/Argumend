import { bandLabel } from "@/lib/disagreement/labels";
import type { DisagreementReportV1 } from "@/types/disagreement";

/**
 * The remaining disagreements as numbered sections. Each leads with the
 * disputed question, then who stands where, then what would resolve it —
 * separated by hairlines, never boxed.
 */
export function DisagreementBriefs({ report }: { report: DisagreementReportV1 }) {
  if (report.disagreements.length === 0) return null;
  const participants = new Map(report.participants.map((item) => [item.id, item.label]));
  const number = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <section aria-labelledby="disagreements-heading">
      <h2 id="disagreements-heading" className="font-serif text-2xl text-[var(--text-heading)] sm:text-3xl">
        The remaining disagreements
      </h2>
      <div className="mt-6 divide-y divide-[var(--border-divider)] border-t border-[var(--border-divider)]">
        {report.disagreements.map((item, index) => (
          <article key={item.id} className="py-7">
            <div className="flex items-baseline gap-4">
              <p className="font-serif text-3xl leading-none text-[var(--border-default)]">{number(index)}</p>
              <h3 className="font-serif text-xl leading-snug text-[var(--text-heading)]">{item.question}</h3>
            </div>
            <p className="mt-3 max-w-2xl leading-relaxed text-[var(--text-secondary)]">{item.summary}</p>
            {item.participantStances.length > 0 ? (
              <ul className="mt-4 max-w-2xl space-y-1.5">
                {item.participantStances.map((stance, stanceIndex) => (
                  <li key={`${item.id}-${stanceIndex}`} className="text-sm text-[var(--text-primary)]">
                    <span className="font-medium">
                      {participants.get(stance.participantId) ?? "Participant"}
                      {stance.positionId ? "" : ""}
                    </span>
                    <span className="text-[var(--text-secondary)]"> — {stance.stance}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              {bandLabel(item.resolvability).toUpperCase()} RESOLVABILITY ·{" "}
              {item.resolutionCondition}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
