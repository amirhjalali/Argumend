import type { ReactNode } from "react";
import type { DisagreementReportV1 } from "@/types/disagreement";
import { AnalysisCaveat } from "./AnalysisCaveat";
import { AuditStrip } from "./AuditStrip";
import { CommonGroundSection } from "./CommonGroundSection";
import { CruxSection } from "./CruxSection";
import { DiagnosisHero } from "./DiagnosisHero";
import { DisagreementsSection } from "./DisagreementsSection";
import { PositionsSection } from "./PositionsSection";
import { ResolutionSection } from "./ResolutionSection";

export function DisagreementReportView({
  report,
  footer,
  renderPositionFeedback,
}: {
  report: DisagreementReportV1;
  footer?: ReactNode;
  renderPositionFeedback?: (positionId: string) => ReactNode;
}) {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <DiagnosisHero report={report} />
      <AuditStrip report={report} />
      <CommonGroundSection report={report} />
      <PositionsSection report={report} renderFeedback={renderPositionFeedback} />
      <DisagreementsSection report={report} />
      <CruxSection report={report} />
      <ResolutionSection report={report} />
      <AnalysisCaveat />
      {footer}
    </article>
  );
}
