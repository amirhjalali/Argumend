import type { DisagreementReportV1 } from "@/types/disagreement";

/**
 * The primary crux, rendered as one of the report's few bordered panels.
 * Secondary cruxes, when the engine ranked more than one, sit beneath as a
 * quiet list rather than sibling cards.
 */
export function ArgumentHinge({ report }: { report: DisagreementReportV1 }) {
  const primary = report.cruxes[0];
  if (!primary) return null;
  const secondary = report.cruxes.slice(1);

  return (
    <section aria-labelledby="argument-hinge-heading">
      <div className="border border-[var(--border-divider)] bg-[var(--bg-paper)] p-6 sm:p-8">
        <h2
          id="argument-hinge-heading"
          className="text-xs font-semibold tracking-[0.22em] text-[#a23b3b]"
        >
          WHAT THE ARGUMENT TURNS ON
        </h2>
        <p className="mt-4 font-serif text-2xl leading-snug text-[var(--text-heading)] sm:text-3xl">
          {primary.question}
        </p>
        {primary.branches.length > 0 ? (
          <dl className="mt-6 space-y-3 border-t border-[var(--border-divider)] pt-5">
            {primary.branches.map((branch) => (
              <div key={branch.condition} className="grid gap-1 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-4">
                <dt className="text-sm text-[var(--text-secondary)]">{branch.condition}</dt>
                <dd className="text-sm text-[var(--text-primary)]">{branch.consequence}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <p className="mt-6 border-t border-[var(--border-divider)] pt-4 text-sm text-[var(--text-secondary)]">
          <span className="font-medium text-[var(--text-primary)]">What could settle it: </span>
          {primary.resolution.condition}
        </p>
      </div>
      {secondary.length > 0 ? (
        <div className="mt-4">
          <p className="text-[11px] font-medium tracking-[0.18em] text-[var(--text-muted)]">
            ALSO LOAD-BEARING
          </p>
          <ul className="mt-2 space-y-2">
            {secondary.map((crux) => (
              <li key={crux.id} className="border-l-2 border-[var(--border-divider)] pl-4 font-serif text-lg text-[var(--text-primary)]">
                {crux.question}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
