import type { CruxBranch, DisagreementReportV1, EvidenceState } from "@/types/disagreement";

/** Spec 6.6: the three evidence states, said plainly. */
const EVIDENCE_STATE_COPY: Record<EvidenceState, string> = {
  "not-independently-checked": "Argumend has not checked this against outside sources.",
  "asserted-in-source": "The text asserts evidence; Argumend has not checked it.",
  "no-evidence-provided": "The text gives no evidence for it.",
};

/**
 * Branches that share a condition are drawn once, with each consequence under
 * it, so "if X holds" is not printed twice in a row.
 */
function groupBranches(branches: CruxBranch[]): { condition: string; consequences: string[] }[] {
  const groups: { condition: string; consequences: string[] }[] = [];
  for (const branch of branches) {
    const existing = groups.find((group) => group.condition === branch.condition);
    if (existing) existing.consequences.push(branch.consequence);
    else groups.push({ condition: branch.condition, consequences: [branch.consequence] });
  }
  return groups;
}

/**
 * The primary crux, and the report's one emphasised panel: a crimson rule,
 * the question in the largest serif below the headline, what follows from
 * each answer, what could settle it, and what the report did (not) check.
 * Secondary cruxes sit beneath as a quiet list rather than sibling cards.
 */
export function ArgumentHinge({ report }: { report: DisagreementReportV1 }) {
  const primary = report.cruxes[0];
  if (!primary) return null;
  const secondary = report.cruxes.slice(1);
  const groups = groupBranches(primary.branches);

  return (
    <section id="crux" aria-labelledby="argument-hinge-heading" className="scroll-mt-24">
      <div className="rounded-md border border-[var(--border-divider)] border-t-[3px] border-t-crux bg-[var(--bg-paper)] px-5 pb-6 pt-5 dark:border-t-crux-light sm:px-8 sm:pb-8 sm:pt-6">
        <h2 id="argument-hinge-heading" className="label-caps text-crux dark:text-crux-text">
          What the argument turns on
        </h2>
        <p className="mt-3 font-serif text-[1.625rem] leading-[1.2] text-[var(--text-heading)] sm:text-[2rem]">
          {primary.question}
        </p>

        {groups.length > 0 ? (
          <div className="mt-6 space-y-4 border-t border-[var(--border-divider)] pt-5">
            {groups.map((group, groupIndex) => (
              <div key={`${primary.id}-branch-${groupIndex}`}>
                <p className="font-serif text-lg italic leading-snug text-[var(--text-secondary)]">
                  {group.condition}
                </p>
                <ul className="mt-1.5 space-y-1">
                  {group.consequences.map((consequence, index) => (
                    <li
                      key={`${primary.id}-branch-${groupIndex}-${index}`}
                      className="flex gap-2 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-primary)]"
                    >
                      <span aria-hidden="true" className="text-[var(--text-muted)]">
                        →
                      </span>
                      <span>{consequence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        <dl className="mt-6 grid gap-4 border-t border-[var(--border-divider)] pt-5 font-sans text-[0.9375rem] sm:grid-cols-2 sm:gap-8">
          <div>
            <dt className="label-caps">What could settle it</dt>
            <dd className="mt-1 leading-relaxed text-[var(--text-primary)]">
              {primary.resolution.condition}
            </dd>
          </div>
          <div>
            <dt className="label-caps">Evidence</dt>
            <dd className="mt-1 leading-relaxed text-[var(--text-primary)]">
              {EVIDENCE_STATE_COPY[primary.evidenceState] ?? EVIDENCE_STATE_COPY["not-independently-checked"]}
            </dd>
          </div>
        </dl>
      </div>

      {secondary.length > 0 ? (
        <div className="mt-6">
          <h3 className="label-caps">It also turns on</h3>
          <ul className="mt-2 space-y-3">
            {secondary.map((crux) => (
              <li
                key={crux.id}
                className="border-l-2 border-crux/40 pl-4 font-serif text-lg leading-snug text-[var(--text-primary)] dark:border-crux-light/50"
              >
                {crux.question}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
