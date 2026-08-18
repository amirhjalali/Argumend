import { identifyCruxes } from "@/lib/crux";
import type { ArgumentGraph } from "@/types/argument";
import type {
  CommonGroundItem,
  ConfidenceBand,
  DisagreementItem,
  DisagreementReportV1,
  DisagreementType,
  ReportCrux,
  ReportPosition,
  ResolutionPath,
} from "@/types/disagreement";
import {
  DISAGREEMENT_PROMPT_VERSION,
  DISAGREEMENT_REPORT_SCHEMA_VERSION,
  DISAGREEMENT_SHARE_EYEBROW,
} from "./constants";
import {
  deriveConfidence,
  deriveDiagnosis,
  deriveResolvability,
  deriveSharedGround,
  diagnosisHeadline,
} from "./diagnosis";
import { groundQuotes } from "./grounding";
import type { NormalizedExtraction } from "./normalize";
import { computeGroundingCoverage } from "./quality";

function typeFromEpistemic(
  value: "empirical" | "predictive" | "normative" | "definitional" | "procedural",
): DisagreementType {
  if (value === "empirical") return "empirical";
  return value;
}

function resolutionPathKind(
  type: DisagreementType,
): ResolutionPath["kind"] {
  switch (type) {
    case "definitional":
      return "definition";
    case "predictive":
      return "forecast";
    case "normative":
    case "priority":
      return "value-clarification";
    case "procedural":
      return "procedure";
    case "trust":
      return "source-trust";
    default:
      return "evidence";
  }
}

function resolutionLabel(kind: ResolutionPath["kind"]): string {
  switch (kind) {
    case "evidence":
      return "Check the evidence";
    case "definition":
      return "Define the term";
    case "forecast":
      return "Wait for an observable outcome";
    case "value-clarification":
      return "Clarify the value tradeoff";
    case "procedure":
      return "Agree on a decision procedure";
    case "source-trust":
      return "Audit the source";
    case "scope":
      return "Narrow the scope";
  }
}

export function projectDisagreementReport(input: {
  extraction: NormalizedExtraction["extraction"];
  graph: ArgumentGraph;
  graphValid: boolean;
  source: string;
  provider: string;
  model: string;
  extraWarnings?: string[];
}): DisagreementReportV1 {
  const { extraction, graph, source } = input;
  let dropped = 0;
  const warnings = [...(input.extraWarnings ?? [])];
  let expectedQuotes = 0;
  let groundedQuotes = 0;

  const ground = (quotes: { quote: string; participantId?: string }[], prefix: string) => {
    expectedQuotes += quotes.length;
    const result = groundQuotes(source, quotes, prefix);
    dropped += result.dropped;
    groundedQuotes += result.refs.length;
    warnings.push(...result.warnings);
    return result.refs;
  };

  const positions: ReportPosition[] = extraction.positions.map((position) => ({
    id: position.id,
    label: position.label,
    participantIds: position.participantIds,
    thesis: position.thesis,
    steelman: position.steelman,
    explicitness: position.explicitness,
    confidence: position.confidence,
    grounding: ground(position.groundingQuotes, position.id),
  }));

  const commonGround: CommonGroundItem[] = extraction.commonGroundCandidates.map((item, index) => ({
    id: `cg-${index + 1}`,
    statement: item.statement,
    participantIds: item.participantIds,
    basis: item.basis,
    confidence: item.confidence,
    grounding: ground(item.groundingQuotes, `cg-${index + 1}`),
  }));

  const disagreements: DisagreementItem[] = extraction.disagreementCandidates.map((item) => ({
    id: item.id,
    question: item.question,
    type: item.type,
    summary: item.summary,
    participantStances: item.participantStances,
    relatedClaimIds: item.claimIds,
    resolvability: "unknown",
    resolutionCondition: item.resolutionCondition,
    confidence: item.confidence,
    grounding: ground(item.groundingQuotes, item.id),
  }));

  const ranked = input.graphValid ? identifyCruxes(graph).slice(0, 3) : [];
  const claimsById = new Map(extraction.claims.map((claim) => [claim.id, claim]));

  const cruxes: ReportCrux[] = ranked.map((result, index) => {
    const claim = claimsById.get(result.claimId);
    const related = disagreements.find((item) => item.relatedClaimIds.includes(result.claimId));
    const type = related?.type ?? (claim ? typeFromEpistemic(claim.epistemicType) : "empirical");
    const resolutionKind = claim?.resolution?.kind ?? (
      type === "normative" ? "value-difference" :
      type === "definitional" ? "definitional-choice" :
      type === "predictive" ? "future-observable" :
      "existing-evidence"
    );
    return {
      id: `crux-${index + 1}`,
      claimId: result.claimId,
      question: related?.question ?? (claim ? `Is this true: ${claim.statement}` : "What is the load-bearing question?"),
      type,
      whyItMatters: related?.summary ?? "Resolving this would change the structure of the disagreement.",
      affectedPositionIds: result.affectedPositions.map((item) => item.id),
      branches: result.affectedPositions.slice(0, 2).map((position) => ({
        condition: `If ${claim?.statement ?? "this claim"} holds`,
        consequence: `The "${position.id}" position becomes stronger.`,
      })),
      resolution: {
        kind: resolutionKind,
        condition: claim?.resolution?.condition ?? related?.resolutionCondition ?? "Further clarification is required.",
      },
      evidenceState: "not-independently-checked",
      confidence: (claim?.confidence ?? "medium") as ConfidenceBand,
    };
  });

  const groundingCoverage = computeGroundingCoverage({ expectedQuotes, groundedQuotes });
  const inferredPositionCount = positions.filter((position) => position.explicitness === "inferred").length;
  const primaryType = disagreements[0]?.type ?? cruxes[0]?.type;
  const pattern = deriveDiagnosis({
    positionCount: positions.length,
    explicitPositionCount: positions.filter((position) => position.explicitness === "explicit").length,
    disagreementCount: disagreements.length,
    commonGroundCount: commonGround.length,
    groundingCoverage,
    primaryType,
    hasCrux: cruxes.length > 0,
    graphValid: input.graphValid,
  });

  const confidence = deriveConfidence({
    groundingCoverage,
    inferredPositionCount,
    positionCount: positions.length,
  });
  const resolvability = deriveResolvability({
    resolutionKind: cruxes[0]?.resolution.kind,
    confidence,
    groundingCoverage,
  });

  for (const item of disagreements) {
    item.resolvability = deriveResolvability({
      resolutionKind:
        item.type === "normative" ? "value-difference" :
        item.type === "definitional" ? "definitional-choice" :
        item.type === "predictive" ? "future-observable" :
        "existing-evidence",
      confidence: item.confidence,
      groundingCoverage,
    });
  }

  const resolutionPaths: ResolutionPath[] = disagreements.slice(0, 4).map((item, index) => {
    const kind = resolutionPathKind(item.type);
    const description =
      item.type === "normative"
        ? "No factual study can determine how these values should be weighted. Progress requires making the tradeoff explicit or agreeing on a decision rule."
        : item.resolutionCondition;
    return {
      id: `path-${index + 1}`,
      label: resolutionLabel(kind),
      description,
      kind,
      disagreementIds: [item.id],
    };
  });

  const headline = diagnosisHeadline(pattern);
  const insight =
    cruxes[0]?.question
      ? `The argument turns on: ${cruxes[0].question}`
      : extraction.mainQuestion;

  const caveats = [
    ...extraction.caveats,
    "This analysis maps the submitted text. It does not independently verify factual claims, identify hidden motives, or prove that a participant would endorse every inferred formulation.",
  ];

  return {
    schemaVersion: DISAGREEMENT_REPORT_SCHEMA_VERSION,
    title: extraction.mainQuestion.replace(/\?$/, ""),
    question: extraction.mainQuestion.endsWith("?")
      ? extraction.mainQuestion
      : `${extraction.mainQuestion}?`,
    sourceMode: "source-only",
    summary: insight,
    diagnosis: {
      pattern,
      headline,
      insight,
      primaryType,
      sharedGround: deriveSharedGround(commonGround.length),
      resolvability,
      confidence,
      confidenceBasis:
        groundingCoverage >= 0.6
          ? "Most quoted support was found verbatim in the source."
          : "Many quotes could not be grounded, so representation confidence is limited.",
    },
    participants: extraction.participants,
    positions,
    commonGround,
    disagreements,
    cruxes,
    resolutionPaths,
    caveats,
    share: {
      eyebrow: DISAGREEMENT_SHARE_EYEBROW,
      headline,
      subheadline: cruxes[0]?.question ?? "No single crux could be established.",
      metrics: {
        positionCount: positions.length,
        commonGroundCount: commonGround.length,
        disagreementCount: disagreements.length,
        cruxCount: cruxes.length,
      },
    },
    quality: {
      groundingCoverage,
      droppedUngroundedQuoteCount: dropped,
      inferredPositionCount,
      warnings,
    },
    provenance: {
      promptVersion: DISAGREEMENT_PROMPT_VERSION,
      provider: input.provider,
      model: input.model,
      generatedAt: new Date().toISOString(),
      sourceCharacterCount: source.length,
      independentlyVerified: false,
    },
  };
}
