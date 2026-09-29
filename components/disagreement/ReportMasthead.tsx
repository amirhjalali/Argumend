import { disagreementAbout, resolvabilitySentence } from "@/lib/disagreement/labels";
import type { DisagreementReportV1 } from "@/types/disagreement";

/**
 * The report masthead: one document opener, not a card. The diagnosis
 * headline is the largest, quietest thing on the page. What kind of
 * disagreement it is, and how settleable, sits underneath as one plain
 * sentence rather than "Kind of disagreement: Cause · Resolvability: High",
 * which read as operator categories to anyone who had not built them.
 *
 * `headlineAs` lets a page that already has an h1 (the /analyze-v2 tool page)
 * keep one h1; the public report page leaves it as the page heading.
 */
export function ReportMasthead({
  report,
  headlineAs: Headline = "h1",
}: {
  report: DisagreementReportV1;
  headlineAs?: "h1" | "h2";
}) {
  const generated = new Date(report.provenance.generatedAt);
  const dateLabel = Number.isNaN(generated.getTime())
    ? ""
    : generated.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const kind = report.diagnosis.primaryType
    ? `Mostly a disagreement ${disagreementAbout(report.diagnosis.primaryType)}.`
    : null;

  return (
    <header id="report-masthead" className="scroll-mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--border-divider)] pb-3">
        <p className="label-caps">Argumend diagnosis</p>
        <p className="font-sans text-xs text-[var(--text-muted)]">
          Read from the text alone{dateLabel ? `, ${dateLabel}` : ""}
        </p>
      </div>
      <Headline className="mt-7 max-w-[22ch] font-serif text-[2.375rem] leading-[1.08] tracking-[-0.01em] text-[var(--text-heading)] sm:text-[3.25rem]">
        {report.diagnosis.headline}
      </Headline>
      <p className="mt-5 max-w-[36rem] font-serif text-xl leading-[1.5] text-[var(--text-secondary)] sm:text-[1.375rem]">
        {report.diagnosis.insight}
      </p>
      <p className="mt-6 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-primary)]">
        {kind ? `${kind} ` : ""}
        {resolvabilitySentence(report.diagnosis.resolvability)}
      </p>
      <p className="mt-2 font-sans text-sm text-[var(--text-muted)]">
        Argumend does not say who is right.
      </p>
    </header>
  );
}
