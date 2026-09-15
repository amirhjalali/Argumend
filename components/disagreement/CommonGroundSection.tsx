import type { DisagreementReportV1 } from "@/types/disagreement";

export function CommonGroundSection({ report }: { report: DisagreementReportV1 }) {
  return (
    <section aria-labelledby="common-ground-heading">
      <h2 id="common-ground-heading" className="font-serif text-2xl text-[var(--text-heading)] sm:text-3xl">
        What they agree on
      </h2>
      {report.commonGround.length === 0 ? (
        <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
          No reliable shared premise could be established from this text.
        </p>
      ) : (
        <ul className="mt-5 divide-y divide-[var(--border-divider)] border-t border-[var(--border-divider)]">
          {report.commonGround.map((item) => (
            <li key={item.id} className="py-4">
              <p className="leading-relaxed text-[var(--text-primary)]">{item.statement}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {item.basis === "explicit" ? "Stated by all sides" : "Strongly implied"}
              </p>
              {item.grounding.length > 0 ? (
                <details className="mt-2">
                  <summary className="min-h-11 cursor-pointer text-sm text-[#3a6965] dark:text-deep-bright">
                    Source notes ({item.grounding.length})
                  </summary>
                  <ul className="mt-2 space-y-2 border-l-2 border-[var(--border-divider)] pl-4">
                    {item.grounding.map((ref) => (
                      <li key={ref.id} className="text-sm leading-relaxed text-[var(--text-secondary)]">
                        &ldquo;{ref.quote}&rdquo;
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
