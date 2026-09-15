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
  /** Claims the extraction mapped, before graph building dropped any. */
  claimCount: number;
  disagreementCount: number;
  commonGroundCount: number;
  groundingCoverage: number;
  primaryType?: DisagreementType;
  /**
   * The report's own shared-ground band. Derived from `commonGroundCount` when
   * omitted, so the pattern can never claim more agreement than the band the
   * reader sees beside it.
   */
  sharedGround?: SharedGroundBand;
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
  // Positions with nothing behind them (§10.4, §10.6): two speakers stating
  // opposite conclusions, with no claim, typed disagreement, or shared premise
  // mapped. The graph builder emits a valid question-only graph for this, so
  // the guard above cannot fire, and every later branch would fall through to
  // "mixed-disagreement" — a headline asserting several stacked disagreements
  // where the extraction found none. There is no structure to diagnose.
  if (input.claimCount === 0 && input.disagreementCount === 0 && input.commonGroundCount === 0) {
    return "insufficient-context";
  }
  if (input.positionCount < 2) return "not-a-disagreement";
  // §10.6: "one high-reach empirical crux". The crux is the engine's choice and
  // the primary type follows it, so an empirical primary type with a crux is
  // that case. The old `disagreementCount <= 1` guard here was copied from the
  // common-ground rule below; models list a second, procedural "how should we
  // decide" disagreement almost every time, so the guard kept this pattern from
  // ever firing on textbook inputs while the typed branches below carry no such
  // guard.
  if (input.primaryType === "empirical" && input.hasCrux) return "single-empirical-crux";
  // §10.6: "high common ground and no more than one narrow disagreement". The
  // count alone let this fire beside a `sharedGround: "low"` band in the same
  // report; the band is the reader's measure, so it is the gate.
  const sharedGround = input.sharedGround ?? deriveSharedGround(input.commonGroundCount);
  const establishedSharedGround = sharedGround === "moderate" || sharedGround === "high";
  if (establishedSharedGround && input.disagreementCount <= 1) return "mostly-common-ground";
  if (input.primaryType === "causal") return "causal-model-split";
  if (input.primaryType === "predictive") return "forecast-split";
  if (input.primaryType === "definitional") return "definition-mismatch";
  if (input.primaryType === "normative") return "value-conflict";
  if (input.primaryType === "priority") return "priority-tradeoff";
  if (input.primaryType === "trust") return "trust-split";
  return "mixed-disagreement";
}

/**
 * The causal headline asserts that the facts are shared. That is only true
 * when the report itself established shared ground; over a text where the
 * facts are disputed or absent it must say only what the type says.
 */
const CAUSAL_HEADLINE_WITHOUT_SHARED_FACTS = "They disagree about what causes what.";

export function diagnosisHeadline(
  pattern: DiagnosisPattern,
  context: { sharedGround?: SharedGroundBand } = {},
): string {
  if (pattern === "causal-model-split") {
    const established = context.sharedGround === "moderate" || context.sharedGround === "high";
    return established ? HEADLINES[pattern] : CAUSAL_HEADLINE_WITHOUT_SHARED_FACTS;
  }
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
