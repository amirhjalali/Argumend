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
  DISAGREEMENT_LIMITS,
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

function normalizeQuestion(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[?.]+$/, "");
}

const QUESTION_STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "if", "is", "are", "was", "were", "be", "to", "of", "in",
  "on", "for", "with", "as", "by", "at", "from", "it", "its", "not", "do", "does", "will", "would",
  "should", "can", "could", "this", "that", "what", "which", "how", "why", "whether", "true",
]);

function questionWords(value: string): Set<string> {
  return new Set(
    normalizeQuestion(value)
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !QUESTION_STOP_WORDS.has(word)),
  );
}

/**
 * True when a crux question just restates the disagreement's own question.
 *
 * Such a crux is not load-bearing: it hands the reader back the thing they
 * asked about instead of naming what would settle it. The spec asks for a crux
 * that is downstream-relevant rather than merely memorable.
 */
function restatesMainQuestion(cruxQuestion: string, mainQuestion: string): boolean {
  const crux = questionWords(cruxQuestion);
  const main = questionWords(mainQuestion);
  if (crux.size === 0 || main.size === 0) return false;
  let shared = 0;
  for (const word of crux) {
    if (main.has(word)) shared += 1;
  }
  return shared / crux.size >= 0.8 && shared / main.size >= 0.8;
}

/**
 * Says what this crux actually decides, in terms of the positions it moves.
 *
 * The old fallback — "Resolving this would change the structure of the
 * disagreement" — is true of every crux ever selected, so it tells the reader
 * nothing while occupying the field that is supposed to justify the selection.
 * Naming the affected positions is at least specific to this one.
 */
function whyItMatters(input: {
  related?: { summary: string };
  claim?: { statement: string };
  positionLabels: Map<string, string>;
  affected: string[];
}): string {
  if (input.related?.summary) return input.related.summary;

  const named = input.affected
    .map((id) => input.positionLabels.get(id))
    .filter((label): label is string => Boolean(label));

  if (named.length >= 2) {
    return `Settling this moves ${named.slice(0, 3).join(", ")} — they do not stand or fall together on it.`;
  }
  if (named.length === 1) {
    return `${named[0]} depends on this; the other positions do not turn on it.`;
  }
  return "The positions diverge here, though the source does not say how much rests on it.";
}

/** Trims a claim so it reads as a clause inside "If ... holds". */
function asCondition(statement: string): string {
  return statement.trim().replace(/\s+/g, " ").replace(/[.]+$/, "");
}

/**
 * A crux splits the disagreement, so the same condition cannot strengthen every
 * position it touches. Direction comes from how each position stands to the
 * claim: a position the claim supports gains if it holds, a position it opposes
 * loses. Emitting "becomes stronger" for both sides states something
 * impossible, and it is the crux — the product's central object — that says it.
 */
function cruxBranches(input: {
  claim?: { statement: string; stanceByPosition: Array<{ positionId: string; relation: "supports" | "opposes" }> };
  affectedPositionIds: string[];
  positionLabels: Map<string, string>;
}): Array<{ condition: string; consequence: string }> {
  const { claim, affectedPositionIds, positionLabels } = input;
  if (!claim) return [];

  // A claim that already opens with "If" would otherwise read "If If ...".
  const stated = asCondition(claim.statement);
  const condition = /^if\s/i.test(stated) ? `${stated}, and that holds` : `If ${stated} holds`;
  const stanceFor = new Map(claim.stanceByPosition.map((stance) => [stance.positionId, stance.relation]));
  const named = affectedPositionIds.filter((id) => stanceFor.has(id));
  const strengthened = named.filter((id) => stanceFor.get(id) === "supports");
  const weakened = named.filter((id) => stanceFor.get(id) === "opposes");

  const label = (id: string) => positionLabels.get(id) ?? id;
  const branches: Array<{ condition: string; consequence: string }> = [];

  if (strengthened.length > 0) {
    branches.push({
      condition,
      consequence: `${strengthened.map(label).join(" and ")} becomes stronger.`,
    });
  }
  if (weakened.length > 0) {
    branches.push({
      condition,
      consequence: `${weakened.map(label).join(" and ")} becomes weaker.`,
    });
  }

  // With no recorded stance there is no defensible direction to assert.
  if (branches.length === 0 && affectedPositionIds.length > 0) {
    branches.push({
      condition,
      consequence: "The balance between the positions shifts, but the source does not say which way.",
    });
  }
  return branches.slice(0, DISAGREEMENT_LIMITS.maxBranchesPerCrux);
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

  const commonGround: CommonGroundItem[] = extraction.commonGroundCandidates.map((item, index) => {
    const grounding = ground(item.groundingQuotes, `cg-${index + 1}`);
    // "Explicit" tells the reader these people said this. When the quotes that
    // were supposed to show it did not survive grounding — because the model
    // invented them — the label is a claim we cannot back, and it lands on real
    // named people taking positions on contested subjects. Demote rather than
    // assert. Confidence follows, since the basis for it is gone.
    const unsupported = item.basis === "explicit" && grounding.length === 0;
    return {
      id: `cg-${index + 1}`,
      statement: item.statement,
      participantIds: item.participantIds,
      basis: unsupported ? ("strongly-implied" as const) : item.basis,
      confidence: unsupported && item.confidence === "high" ? ("medium" as const) : item.confidence,
      grounding,
    };
  });

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

  const positionLabels = new Map(positions.map((position) => [position.id, position.label]));
  const ranked = input.graphValid ? identifyCruxes(graph) : [];
  const claimsById = new Map(extraction.claims.map((claim) => [claim.id, claim]));

  // Several ranked claims can belong to one disagreement candidate. Reusing that
  // candidate's question for each would render the same crux two or three times,
  // so a claim whose preferred question is taken falls back to its own statement
  // and is dropped only when that collides too.
  const cruxes: ReportCrux[] = [];
  const seenQuestions = new Set<string>();
  type Candidate = { result: (typeof ranked)[number]; question: string };
  const deferredRestatements: Candidate[] = [];

  const addCrux = ({ result, question }: Candidate) => {
    const claim = claimsById.get(result.claimId);
    const related = disagreements.find((item) => item.relatedClaimIds.includes(result.claimId));
    const type = related?.type ?? (claim ? typeFromEpistemic(claim.epistemicType) : "empirical");
    const resolutionKind = claim?.resolution?.kind ?? (
      type === "normative" ? "value-difference" :
      type === "definitional" ? "definitional-choice" :
      type === "predictive" ? "future-observable" :
      "existing-evidence"
    );
    const affected = result.affectedPositions.map((item) => item.id);
    seenQuestions.add(normalizeQuestion(question));
    cruxes.push({
      id: `crux-${cruxes.length + 1}`,
      claimId: result.claimId,
      question,
      type,
      whyItMatters: whyItMatters({ related, claim, positionLabels, affected }),
      affectedPositionIds: affected,
      branches: cruxBranches({ claim, affectedPositionIds: affected, positionLabels }),
      resolution: {
        kind: resolutionKind,
        condition: claim?.resolution?.condition ?? related?.resolutionCondition ?? "Further clarification is required.",
      },
      evidenceState: "not-independently-checked",
      confidence: (claim?.confidence ?? "medium") as ConfidenceBand,
    });
  };

  for (const result of ranked) {
    if (cruxes.length >= DISAGREEMENT_LIMITS.maxCruxes) break;
    const claim = claimsById.get(result.claimId);
    const related = disagreements.find((item) => item.relatedClaimIds.includes(result.claimId));
    const claimQuestion = claim ? `Is this true: ${claim.statement}` : undefined;
    const question = [related?.question, claimQuestion].find(
      (candidate) => candidate && !seenQuestions.has(normalizeQuestion(candidate)),
    );
    if (!question) continue;
    // A crux that just restates the disagreement's own question hands the
    // reader back what they asked instead of naming what would settle it. Defer
    // rather than drop: if nothing more specific survives, it still beats
    // showing no crux at all.
    if (restatesMainQuestion(question, extraction.mainQuestion)) {
      deferredRestatements.push({ result, question });
      continue;
    }
    addCrux({ result, question });
  }

  for (const candidate of deferredRestatements) {
    if (cruxes.length > 0) break;
    addCrux(candidate);
  }

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
