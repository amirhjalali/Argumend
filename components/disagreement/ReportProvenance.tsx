import { bandLabel } from "@/lib/disagreement/labels";
import type { DisagreementReportV1 } from "@/types/disagreement";

function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

/**
 * The report's contents, with the count behind each section.
 *
 * On a phone it sits directly under the headline, so the shape of the
 * argument — how much is shared, how much is split — is visible before the
 * long scroll; on a desktop it heads the sticky rail. The counts are the ones
 * the old "at a glance" block showed: counts of items, never a share of
 * agreement.
 */
export function ReportContents({
  report,
  className = "",
}: {
  report: DisagreementReportV1;
  className?: string;
}) {
  const accountability = report.accountability;
  const rows: { href: string; label: string; value: string }[] = [
    {
      href: "#common-ground",
      label: "What they agree on",
      value: plural(report.commonGround.length, "premise", "premises"),
    },
  ];
  if (report.cruxes.length > 0) {
    rows.push({
      href: "#crux",
      label: "What it turns on",
      value: plural(report.cruxes.length, "crux", "cruxes"),
    });
  }
  if (accountability && accountability.stakes.length > 0) {
    rows.push({
      href: "#stakes",
      label: "What is at stake",
      value: plural(accountability.stakes.length, "claim", "claims"),
    });
  }
  rows.push({
    href: "#positions",
    label: "The positions",
    value: String(report.positions.length),
  });
  if (report.disagreements.length > 0) {
    rows.push({
      href: "#disagreements",
      label: "Still disputed",
      value: plural(report.disagreements.length, "question", "questions"),
    });
  }
  rows.push({
    href: "#resolution",
    label: "What could move it",
    value: plural(report.resolutionPaths.length, "path", "paths"),
  });

  // A phone gets the three counts that carry the diagnosis, side by side, in
  // place of the six-row list: what is shared, what is split, what it turns
  // on. The full list heads the desktop rail.
  const tally = [
    { href: "#common-ground", label: "Agree on", value: plural(report.commonGround.length, "premise", "premises") },
    {
      href: report.disagreements.length > 0 ? "#disagreements" : "#positions",
      label: "Split on",
      value: plural(report.disagreements.length, "question", "questions"),
    },
    { href: report.cruxes.length > 0 ? "#crux" : "#positions", label: "Turns on", value: plural(report.cruxes.length, "crux", "cruxes") },
  ];

  return (
    <nav aria-label="In this report" className={`font-sans text-sm ${className}`.trim()}>
      <ul className="grid grid-cols-3 divide-x divide-[var(--border-divider)] border-t border-[var(--border-divider)] lg:hidden">
        {tally.map((cell) => (
          <li key={cell.label} className="px-3 first:pl-0 last:pr-0">
            <a href={cell.href} className="block min-h-11 py-3">
              <span className="label-caps block">{cell.label}</span>
              <span className="mt-0.5 block font-serif text-lg leading-tight text-[var(--text-heading)]">
                {cell.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="label-caps hidden lg:block">In this report</p>
      <ul className="mt-2 hidden divide-y divide-[var(--border-divider)] border-y border-[var(--border-divider)] lg:block">
        {rows.map((row) => (
          <li key={row.href}>
            <a
              href={row.href}
              className="flex min-h-11 items-baseline justify-between gap-4 py-2.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-heading)]"
            >
              <span>{row.label}</span>
              <span className="shrink-0 font-serif text-base tabular-nums text-[var(--text-primary)]">
                {row.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * The source-only boundary and representation confidence, behind a
 * disclosure: metadata that should be findable, not a second headline.
 */
export function ReportProvenance({
  report,
  className = "",
}: {
  report: DisagreementReportV1;
  className?: string;
}) {
  const accountability = report.accountability;

  return (
    <aside aria-label="Report provenance" className={`space-y-4 font-sans text-sm ${className}`.trim()}>
      {accountability && accountability.gapCount > 0 ? (
        <p className="leading-relaxed text-[var(--text-secondary)]">
          {plural(accountability.gapCount, "major claim has", "major claims have")} no stated update
          if it turns out to be wrong.
        </p>
      ) : null}

      <p className="leading-relaxed text-[var(--text-secondary)]">
        This is a <span className="font-medium text-[var(--text-primary)]">source-only</span> analysis. It maps
        what the submitted text says. It does not fact-check claims, identify motives, or judge who is right.
      </p>

      <details className="group">
        <summary className="flex min-h-11 cursor-pointer items-center gap-1.5 text-[var(--text-secondary)] marker:content-none [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">
            ›
          </span>
          How confident is Argumend in this representation?
        </summary>
        <p className="pb-2 leading-relaxed text-[var(--text-secondary)]">
          {bandLabel(report.diagnosis.confidence)} — {report.diagnosis.confidenceBasis}
        </p>
      </details>
    </aside>
  );
}
