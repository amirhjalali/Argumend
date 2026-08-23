import type { ReactNode } from "react";
import type { DisagreementReportV1 } from "@/types/disagreement";
import { AnalysisCaveat } from "./AnalysisCaveat";
import { ArgumentHinge } from "./ArgumentHinge";
import { ClaimStakeLedger } from "./ClaimStakeLedger";
import { CommonGroundSection } from "./CommonGroundSection";
import { DisagreementBriefs } from "./DisagreementBriefs";
import { PositionBriefs } from "./PositionBriefs";
import { ReportMasthead } from "./ReportMasthead";
import { ReportProvenance } from "./ReportProvenance";
import { ResolutionSection } from "./ResolutionSection";

/**
 * The editorial report: one document, not a pile of cards. Bordered panels
 * are reserved for the crux, the caveat, and publication actions; everything
 * else is typography, whitespace, and hairline rules. Desktop runs a 7/4
 * two-column grid with a provenance rail; mobile collapses to one column.
 */
export function DisagreementReportView({
  report,
  footer,
  renderPositionFeedback,
}: {
  report: DisagreementReportV1;
  footer?: ReactNode;
  renderPositionFeedback?: (positionId: string) => ReactNode;
}) {
  const hasStakes = Boolean(report.accountability?.stakes.length);

  return (
    <article className="mx-auto w-full max-w-5xl">
      <ReportMasthead report={report} />
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
        <div className="min-w-0 space-y-12">
          <CommonGroundSection report={report} />
          <ArgumentHinge report={report} />
          {hasStakes ? <ClaimStakeLedger report={report} /> : null}
          <PositionBriefs report={report} renderFeedback={renderPositionFeedback} />
          <DisagreementBriefs report={report} />
          <ResolutionSection report={report} />
          <AnalysisCaveat />
          {footer}
        </div>
        <div className="min-w-0 lg:border-l lg:border-[var(--border-divider)] lg:pl-10">
          <div className="lg:sticky lg:top-24">
            <ReportProvenance report={report} />
          </div>
        </div>
      </div>
    </article>
  );
}
