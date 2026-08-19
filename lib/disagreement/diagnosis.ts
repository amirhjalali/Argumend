import type {
  ConfidenceBand,
  DiagnosisPattern,
  DisagreementReportV1,
  DisagreementType,
  ResolvabilityBand,
  SharedGroundBand,
} from "@/types/disagreement";

export interface DiagnosisInputs {
  positionCount: number;
  explicitPositionCount: number;
  disagreementCount: number;
  commonGroundCount: number;
  groundingCoverage: number;
  primaryType?: DisagreementType;
  hasCrux: boolean;
  graphValid: boolean;
}

const HEADLINES: Record<DiagnosisPattern, string> = {
  "mostly-common-ground": "They agree more than the argument makes it seem.",
  "single-empirical-crux": "This argument turns on one testable question.",
  "causal-model-split": "They agree on the facts but disagree about what causes them.",
  "forecast-split": "The divide is mostly about what happens next.",
  "definition-mismatch": "They are using the same word to mean different things.",
  "value-conflict": "More evidence alone will not settle this.",
  "priority-tradeoff": "They agree on the goods and disagree on the tradeoff.",
  "trust-split": "The evidence dispute is really a source-trust dispute.",
  "mixed-disagreement": "This is several disagreements stacked together.",
  "not-a-disagreement": "This text does not contain a disagreement.",
  "insufficient-context": "There is not enough structure to diagnose a disagreement.",
};

export function deriveDiagnosis(input: DiagnosisInputs): DiagnosisPattern {
  if (input.positionCount === 0) return "not-a-disagreement";

  // "Insufficient context" is a claim about the SOURCE: it tells the reader the
  // text did not carry a diagnosable disagreement. A graph that failed to build
  // is a fact about our pipeline, not about their text, so it must not produce
  // that headline over a report that did recover positions, shared ground, and
  // typed disagreements. Losing the graph costs the cruxes, which the report
  // reports honestly as absent; it does not license telling the reader we found
  // nothing when we found a great deal.
  const sourceIsThin = input.groundingCoverage < 0.2 || input.explicitPositionCount === 0;
  if (sourceIsThin) {
    if (input.positionCount < 2) return input.positionCount === 0 ? "not-a-disagreement" : "insufficient-context";
    return "insufficient-context";
  }
  if (!input.graphValid && input.disagreementCount === 0 && input.commonGroundCount === 0) {
    return "insufficient-context";
  }
  if (input.positionCount < 2) return "not-a-disagreement";
  if (input.commonGroundCount > 0 && input.disagreementCount <= 1 && input.hasCrux) {
    if (input.primaryType === "empirical") return "single-empirical-crux";
    if (input.disagreementCount === 1 && input.commonGroundCount >= 1) return "mostly-common-ground";
  }
  if (input.commonGroundCount >= 1 && input.disagreementCount <= 1) return "mostly-common-ground";
  if (input.primaryType === "empirical" && input.hasCrux && input.disagreementCount <= 1) {
    return "single-empirical-crux";
  }
  if (input.primaryType === "causal") return "causal-model-split";
  if (input.primaryType === "predictive") return "forecast-split";
  if (input.primaryType === "definitional") return "definition-mismatch";
  if (input.primaryType === "normative") return "value-conflict";
  if (input.primaryType === "priority") return "priority-tradeoff";
  if (input.primaryType === "trust") return "trust-split";
  return "mixed-disagreement";
}

export function diagnosisHeadline(pattern: DiagnosisPattern): string {
  return HEADLINES[pattern];
}

export function deriveResolvability(input: {
  resolutionKind?: DisagreementReportV1["cruxes"][number]["resolution"]["kind"];
  confidence: ConfidenceBand;
  groundingCoverage: number;
}): ResolvabilityBand {
  let band: ResolvabilityBand = "unknown";
  switch (input.resolutionKind) {
    case "existing-evidence":
      band = "high";
      break;
    case "definitional-choice":
      band = "high";
      break;
    case "future-observable":
    case "authority-allocation":
    case "source-audit":
      band = "medium";
      break;
    case "value-difference":
      band = "low";
      break;
    default:
      band = "unknown";
  }

  if (input.confidence === "low" || input.groundingCoverage < 0.4) {
    if (band === "high") return "medium";
    if (band === "medium") return "low";
  }
  return band;
}

export function deriveSharedGround(count: number): SharedGroundBand {
  if (count <= 0) return "none";
  if (count === 1) return "low";
  if (count === 2) return "moderate";
  return "high";
}

export function deriveConfidence(input: {
  groundingCoverage: number;
  inferredPositionCount: number;
  positionCount: number;
}): ConfidenceBand {
  if (input.groundingCoverage >= 0.75 && input.inferredPositionCount === 0) return "high";
  if (input.groundingCoverage >= 0.4) return "medium";
  return "low";
}
