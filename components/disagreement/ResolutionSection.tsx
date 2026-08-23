import type { DisagreementReportV1 } from "@/types/disagreement";

export function ResolutionSection({ report }: { report: DisagreementReportV1 }) {
  return (
    <section aria-labelledby="resolution-heading">
      <h2 id="resolution-heading" className="font-serif text-2xl text-[var(--text-heading)] sm:text-3xl">
        What could move this forward
      </h2>
      {report.resolutionPaths.length === 0 ? (
        <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
          No resolution path could be stated from this text.
        </p>
      ) : (
        <ul className="mt-5 max-w-2xl space-y-4">
          {report.resolutionPaths.map((path, index) => (
            <li key={path.id} className="grid gap-1 border-l-2 border-[var(--border-divider)] pl-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4">
              <h3 className="flex items-baseline gap-2 font-medium text-[var(--text-primary)]">
                <span className="font-serif text-[var(--border-default)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{path.label}</span>
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{path.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
