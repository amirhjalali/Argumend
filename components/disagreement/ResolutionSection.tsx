import type { DisagreementReportV1 } from "@/types/disagreement";
import { ReportSection } from "./ReportSection";

/**
 * Resolution paths. Not numbered: they are alternatives, not steps, and a
 * number would suggest an order to take them in.
 */
export function ResolutionSection({ report }: { report: DisagreementReportV1 }) {
  return (
    <ReportSection id="resolution" title="What could move this forward">
      {report.resolutionPaths.length === 0 ? (
        <p className="max-w-[36rem] font-serif text-lg leading-relaxed text-[var(--text-secondary)]">
          No resolution path could be stated from this text.
        </p>
      ) : (
        <ul className="space-y-5">
          {report.resolutionPaths.map((path) => (
            <li key={path.id} className="border-l-2 border-deep/40 pl-4 dark:border-deep-light/50">
              <h3 className="font-serif text-[1.25rem] leading-snug text-[var(--text-heading)]">{path.label}</h3>
              <p className="mt-1 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                {path.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </ReportSection>
  );
}
