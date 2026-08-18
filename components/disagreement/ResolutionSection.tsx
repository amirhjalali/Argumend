import type { DisagreementReportV1 } from "@/types/disagreement";

export function ResolutionSection({ report }: { report: DisagreementReportV1 }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-[var(--text-heading)]">What could move this forward</h2>
      {report.resolutionPaths.length === 0 ? (
        <p className="mt-3 text-[var(--text-secondary)]">No resolution path could be stated from this text.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {report.resolutionPaths.map((path) => (
            <li key={path.id} className="rounded-xl border border-[var(--border-default)] p-4">
              <h3 className="font-medium text-[var(--text-heading)]">{path.label}</h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{path.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
