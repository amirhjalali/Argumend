import type { DisagreementReportV1 } from "@/types/disagreement";

export function CommonGroundSection({ report }: { report: DisagreementReportV1 }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-[var(--text-heading)]">What they already agree on</h2>
      {report.commonGround.length === 0 ? (
        <p className="mt-3 text-[var(--text-secondary)]">
          No reliable shared premise could be established from this text.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {report.commonGround.map((item) => (
            <li key={item.id} className="surface-card rounded-xl border border-[var(--border-default)] p-4">
              <p className="text-[var(--text-primary)]">{item.statement}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-[var(--text-muted)]">
                {item.basis === "explicit" ? "Explicit" : "Strongly implied"}
              </p>
              {item.grounding.length > 0 ? (
                <details className="mt-2">
                  <summary className="min-h-11 cursor-pointer text-sm text-[#3a6965]">Show source basis</summary>
                  {item.grounding.map((ref) => (
                    <blockquote key={ref.id} className="mt-2 border-l-2 border-[#3a6965] pl-3 text-sm">
                      {ref.quote}
                    </blockquote>
                  ))}
                </details>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
