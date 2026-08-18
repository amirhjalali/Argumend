import { bandLabel, disagreementTypeLabel } from "@/lib/disagreement/labels";
import type { DisagreementReportV1 } from "@/types/disagreement";

export function DiagnosisHero({ report }: { report: DisagreementReportV1 }) {
  const primaryCrux = report.cruxes[0];
  return (
    <header className="surface-card rounded-2xl border border-[var(--border-default)] p-5 sm:p-6">
      <p className="text-xs font-medium tracking-[0.18em] text-[#3a6965]">ARGUMEND DIAGNOSIS</p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-[var(--text-heading)] sm:text-4xl">
        {report.diagnosis.headline}
      </h1>
      <p className="mt-3 text-base text-[var(--text-secondary)]">{report.diagnosis.insight}</p>
      <dl className="mt-5 flex flex-wrap gap-2 text-sm">
        {report.diagnosis.primaryType ? (
          <div className="rounded-full bg-[#3a6965]/10 px-3 py-1 text-[#3a6965]">
            {disagreementTypeLabel(report.diagnosis.primaryType)}
          </div>
        ) : null}
        <div className="rounded-full bg-[var(--bg-muted)] px-3 py-1">
          Resolvability: {bandLabel(report.diagnosis.resolvability)}
        </div>
        <div className="rounded-full bg-[var(--bg-muted)] px-3 py-1">
          Representation: {bandLabel(report.diagnosis.confidence)}
        </div>
      </dl>
      {primaryCrux ? (
        <p className="mt-5 border-l-4 border-[#a23b3b] pl-4 font-serif text-xl text-[var(--text-heading)]">
          {primaryCrux.question}
        </p>
      ) : null}
    </header>
  );
}
