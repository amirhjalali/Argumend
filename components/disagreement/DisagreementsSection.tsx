import { bandLabel, disagreementTypeLabel } from "@/lib/disagreement/labels";
import type { DisagreementReportV1 } from "@/types/disagreement";

export function DisagreementsSection({ report }: { report: DisagreementReportV1 }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-[var(--text-heading)]">What they actually disagree about</h2>
      {report.disagreements.length === 0 ? (
        <p className="mt-3 text-[var(--text-secondary)]">No distinct disagreement questions were extracted.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {report.disagreements.map((item) => (
            <li key={item.id} className="surface-card rounded-xl border border-[var(--border-default)] p-4">
              <p className="text-xs uppercase tracking-wide text-[#3a6965]">{disagreementTypeLabel(item.type)}</p>
              <h3 className="mt-1 font-serif text-xl">{item.question}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.summary}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {item.participantStances.map((stance) => (
                  <li key={`${item.id}-${stance.participantId}`}>{stance.stance}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                Resolvability: {bandLabel(item.resolvability)}
              </p>
              <p className="mt-1 text-sm">{item.resolutionCondition}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
