import type { ReactNode } from "react";
import type { DisagreementReportV1 } from "@/types/disagreement";
import { AnalysisCaveat } from "./AnalysisCaveat";
import { ArgumentHinge } from "./ArgumentHinge";
import { ClaimStakeLedger } from "./ClaimStakeLedger";
import { CommonGroundSection } from "./CommonGroundSection";
import { DisagreementBriefs } from "./DisagreementBriefs";
import { PositionBriefs } from "./PositionBriefs";
import { ReportMasthead } from "./ReportMasthead";
import { ReportContents, ReportProvenance } from "./ReportProvenance";
import { ResolutionSection } from "./ResolutionSection";

/**
 * The editorial report: one document, not a pile of cards. Bordered panels
 * are reserved for the crux, the caveat, and publication actions; everything
 * else is typography, whitespace, and hairline rules.
 *
 * Desktop runs a 7/4 grid with a sticky rail (contents, then provenance).
 * On a phone the same pieces are reordered into one column: headline, the
 * contents with their counts, the sections, provenance, then the actions. The
 * rail wrappers are `display: contents` below `lg`, which is what lets their
 * children take part in the column's ordering.
 */
export function DisagreementReportView({
  report,
  footer,
  renderPositionFeedback,
  headlineAs,
}: {
  report: DisagreementReportV1;
  footer?: ReactNode;
  renderPositionFeedback?: (positionId: string) => ReactNode;
  /** Pass "h2" when the page already has an h1. */
  headlineAs?: "h1" | "h2";
}) {
  const hasStakes = Boolean(report.accountability?.stakes.length);

  return (
    <article className="mx-auto w-full max-w-5xl">
      <ReportMasthead report={report} headlineAs={headlineAs} />
      <div className="mt-10 flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-x-14">
        <div className="order-2 min-w-0 space-y-12 lg:order-none lg:col-start-1 lg:row-start-1">
          <CommonGroundSection report={report} />
          <ArgumentHinge report={report} />
          {hasStakes ? <ClaimStakeLedger report={report} /> : null}
          <PositionBriefs report={report} renderFeedback={renderPositionFeedback} />
          <DisagreementBriefs report={report} />
          <ResolutionSection report={report} />
          <AnalysisCaveat />
        </div>
        <div className="contents lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:block lg:border-l lg:border-[var(--border-divider)] lg:pl-10">
          <div className="contents lg:sticky lg:top-24 lg:block lg:space-y-8">
            <ReportContents report={report} className="order-1 lg:order-none" />
            <ReportProvenance report={report} className="order-3 lg:order-none" />
          </div>
        </div>
        {footer ? (
          <div className="order-4 min-w-0 space-y-6 lg:order-none lg:col-start-1 lg:row-start-2">
            {footer}
          </div>
        ) : null}
      </div>
    </article>
  );
}
