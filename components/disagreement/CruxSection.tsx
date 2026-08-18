import type { DisagreementReportV1 } from "@/types/disagreement";

export function CruxSection({ report }: { report: DisagreementReportV1 }) {
  const primary = report.cruxes[0];
  const secondary = report.cruxes.slice(1);
  return (
    <section>
      <h2 className="font-serif text-2xl text-[var(--text-heading)]">The question everything turns on</h2>
      {!primary ? (
        <p className="mt-3 text-[var(--text-secondary)]">
          The text contains positions but no single load-bearing proposition could be established.
        </p>
      ) : (
        <article className="mt-4 rounded-xl border border-[#a23b3b]/30 bg-[#a23b3b]/5 p-4">
          <h3 className="font-serif text-2xl text-[var(--text-heading)]">{primary.question}</h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{primary.whyItMatters}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {primary.branches.map((branch, index) => (
              <li key={`${primary.id}-${index}`}>
                <strong>If {branch.condition}:</strong> {branch.consequence}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">{primary.resolution.condition}</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-[var(--text-muted)]">
            No independent verification performed
          </p>
        </article>
      )}
      {secondary.length > 0 ? (
        <div className="mt-4">
          <h3 className="font-serif text-xl">Secondary cruxes</h3>
          <ul className="mt-2 space-y-2">
            {secondary.map((crux) => (
              <li key={crux.id} className="rounded-lg border border-[var(--border-default)] p-3 text-sm">
                {crux.question}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
