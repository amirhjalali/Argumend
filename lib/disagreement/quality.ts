import { DISAGREEMENT_PUBLICATION_MIN_GROUNDING_COVERAGE } from "./constants";
import { collectReportQuoteCharacters } from "@/lib/schemas/disagreement";
import type { DisagreementReportV1 } from "@/types/disagreement";

export function computeGroundingCoverage(input: {
  expectedQuotes: number;
  groundedQuotes: number;
}): number {
  if (input.expectedQuotes <= 0) return 1;
  return Number((input.groundedQuotes / input.expectedQuotes).toFixed(3));
}

export function canPublishReport(report: DisagreementReportV1): {
  ok: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  const explicit = report.positions.filter((position) => position.explicitness === "explicit");
  if (explicit.length < 1) reasons.push("Need at least one explicit position.");
  if (report.quality.groundingCoverage < DISAGREEMENT_PUBLICATION_MIN_GROUNDING_COVERAGE) {
    reasons.push("Grounding coverage is below 0.60.");
  }
  if (report.quality.warnings.some((warning) => warning.toLowerCase().includes("critical"))) {
    reasons.push("Critical quality warnings remain.");
  }
  if (report.diagnosis.pattern === "insufficient-context") {
    reasons.push("The diagnosis is insufficient-context.");
  }
  if (
    report.commonGround.length === 0 &&
    report.disagreements.length === 0 &&
    report.cruxes.length === 0
  ) {
    reasons.push("Need common ground, a disagreement, or a crux.");
  }
  if (collectReportQuoteCharacters(report) > 1500) {
    reasons.push("Persisted quotes exceed the publication cap.");
  }

  return { ok: reasons.length === 0, reasons };
}

export function sanitizeForPublication(report: DisagreementReportV1): DisagreementReportV1 {
  return {
    ...report,
    provenance: {
      ...report.provenance,
      independentlyVerified: false,
    },
  };
}
