import { identifyCruxes } from "@/lib/crux";
import type { ArgumentGraph } from "@/types/argument";
import type {
  ArgumentAccountability,
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
import { projectClaimStakes } from "./stakes";

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

/**
 * What the crux panel says when neither the claim nor its disagreement carries
 * a resolution condition. The old fallback, "Further clarification is
 * required.", read as advice; this states the gap and nothing else, and the
 * resolution-path list never carries it.
 */
export const RESOLUTION_NOT_STATED = "The source does not state what would settle this.";

/**
 * Model output that admits it has no resolution condition, phrased as one:
 * "Not stated in the source; would require agreement on <the question>".
 * Rendering that as a path hands the disagreement back to the reader as its
 * own resolution.
 */
const UNSTATED_RESOLUTION = /further clarification|not stated in the (?:source|text)|not (?:resolvable|determinable|specified|given|stated) (?:from|in) the (?:source|text)|cannot be (?:determined|resolved|stated) from the (?:source|text)/i;

function statedResolution(condition: string | undefined): string | undefined {
  if (!condition) return undefined;
  const trimmed = condition.trim();
  if (!trimmed || trimmed === RESOLUTION_NOT_STATED || UNSTATED_RESOLUTION.test(trimmed)) return undefined;
  return trimmed;
}

const VALUE_TYPES: ReadonlySet<DisagreementType> = new Set(["normative", "priority"]);
const EVIDENCE_TYPES: ReadonlySet<DisagreementType> = new Set(["empirical", "causal", "predictive"]);

/**
 * The headline type follows the primary crux, the engine's deterministic
 * choice, so the headline and the crux it introduces describe the same
 * dispute. Taking the first listed disagreement instead let the two contradict
 * each other, which is the mechanism behind every value dispute that reached
 * readers labelled empirical.
 *
 * One exception, from the spec's invariants ("never treat every disagreement
 * as empirically resolvable", "never label normative disagreement as a lack of
 * evidence"): an evidence-typed crux may not present a source that contains a
 * value disagreement as something evidence settles, so the value type leads.
 * The crux keeps its own type. With no crux, the first listed disagreement
 * stands as before.
 */
function derivePrimaryType(
  cruxType: DisagreementType | undefined,
  disagreements: Array<{ type: DisagreementType }>,
): DisagreementType | undefined {
  if (!cruxType) return disagreements[0]?.type;
  if (!EVIDENCE_TYPES.has(cruxType)) return cruxType;
  return disagreements.find((item) => VALUE_TYPES.has(item.type))?.type ?? cruxType;
}

/**
 * Common ground is a claim about two or more people. It is attested when the
 * grounded quotes come from at least two of the people it is attributed to
 * (or all of them), or from someone outside that set describing them, as a
 * reporter's "both agree that ..." does. One side's words, or no words at all,
 * do not show that the other side holds it.
 */
function commonGroundAttested(
  participantIds: string[],
  grounding: Array<{ participantId?: string }>,
): boolean {
  const attributed = new Set(participantIds);
  const quoted = new Set<string>();
  for (const ref of grounding) {
    if (!ref.participantId) continue;
    if (!attributed.has(ref.participantId)) return true;
    quoted.add(ref.participantId);
  }
  return quoted.size >= 2 || (attributed.size > 0 && quoted.size >= attributed.size);
}

export function projectDisagreementReport(input: {
  extraction: NormalizedExtraction["extraction"];
  graph: ArgumentGraph;
  graphValid: boolean;
  source: string;
  provider: string;
  model: string;
  extraWarnings?: string[];
  extraCaveats?: string[];
}): DisagreementReportV1 {
  const { extraction, graph, source } = input;
  let dropped = 0;
  const warnings = [...(input.extraWarnings ?? [])];
  let expectedQuotes = 0;
  let groundedQuotes = 0;
  // Every quote text already counted for another object. Stake quotes reuse
  // detection: a stake re-quoting a sentence already grounded elsewhere is
  // displayed but never counted twice toward grounding coverage.
  const seenQuoteTexts = new Set<string>();

  const ground = (quotes: { quote: string; participantId?: string }[], prefix: string) => {
    expectedQuotes += quotes.length;
    for (const item of quotes) {
      seenQuoteTexts.add(item.quote.trim().toLowerCase().replace(/\s+/g, " "));
    }
    const result = groundQuotes(source, quotes, prefix);
    dropped += result.dropped;
    groundedQuotes += result.refs.length;
    warnings.push(...result.warnings);
    return result.refs;
  };

  const positions: ReportPosition[] = extraction.positions.map((position) => {
    const grounding = ground(position.groundingQuotes, position.id);
    // "Explicit" means this person said it. That needs at least one verbatim
    // quote from that person; a quote that did not survive grounding, or that
    // another speaker said, is not one. Relabel rather than assert, and let
    // the confidence follow, since the basis for "high" is gone.
    const ownQuote = grounding.some(
      (ref) => ref.participantId !== undefined && position.participantIds.includes(ref.participantId),
    );
    const unsupported = position.explicitness === "explicit" && !ownQuote;
    if (unsupported) {
      warnings.push(
        `Relabelled position "${position.id}" inferred: no verbatim quote from its participant survived grounding`,
      );
    }
    return {
      id: position.id,
      label: position.label,
      participantIds: position.participantIds,
      thesis: position.thesis,
      steelman: position.steelman,
      explicitness: unsupported ? ("inferred" as const) : position.explicitness,
      confidence: unsupported && position.confidence === "high" ? ("medium" as const) : position.confidence,
      grounding,
    };
  });

  const commonGround: CommonGroundItem[] = [];
  extraction.commonGroundCandidates.forEach((item, index) => {
    const grounding = ground(item.groundingQuotes, `cg-${index + 1}`);
    // Shared ground is a claim about every person it is attributed to, and it
    // lands on real named people taking positions on contested subjects. With
    // quotes from one side only, or none (the model invented them, or inferred
    // the agreement), the report cannot back it for the others. The report has
    // no "inferred" label for common ground, so the item is dropped and the
    // gap recorded; §10.4 already refuses "uncontested" for such a claim.
    if (!commonGroundAttested(item.participantIds, grounding)) {
      warnings.push(
        `Dropped common-ground item cg-${index + 1}: quoted from fewer than two of the participants it is attributed to`,
      );
      return;
    }
    commonGround.push({
      id: `cg-${commonGround.length + 1}`,
      statement: item.statement,
      participantIds: item.participantIds,
      basis: item.basis,
      confidence: item.confidence,
      grounding,
    });
  });

  const disagreements: DisagreementItem[] = extraction.disagreementCandidates.map((item) => ({
    id: item.id,
    question: item.question,
    type: item.type,
    summary: item.summary,
    participantStances: item.participantStances,
    relatedClaimIds: item.claimIds,
    resolvability: "unknown",
    resolutionCondition: statedResolution(item.resolutionCondition) ?? RESOLUTION_NOT_STATED,
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
        condition:
          statedResolution(claim?.resolution?.condition) ??
          statedResolution(related?.resolutionCondition) ??
          RESOLUTION_NOT_STATED,
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

  // Make reasons answerable: project what each major claim is committed to
  // changing. Deterministic — selection, diagnostics, and the fallback are
  // all fixed rules; the model only proposed candidates. Warnings join the
  // quality block, which the default public UI does not render.
  let accountability: ArgumentAccountability | undefined;
  const stakeProjection = projectClaimStakes({
    extraction,
    source,
    cruxClaimIds: cruxes.map((crux) => crux.claimId),
    seenQuoteTexts,
  });
  expectedQuotes += stakeProjection.expectedQuoteCount;
  groundedQuotes += stakeProjection.groundedQuoteCount;
  dropped += stakeProjection.expectedQuoteCount - stakeProjection.groundedQuoteCount;
  warnings.push(...stakeProjection.warnings);
  if (stakeProjection.accountability.stakes.length > 0) {
    accountability = stakeProjection.accountability;
  }

  const groundingCoverage = computeGroundingCoverage({ expectedQuotes, groundedQuotes });
  const inferredPositionCount = positions.filter((position) => position.explicitness === "inferred").length;
  const primaryType = derivePrimaryType(cruxes[0]?.type, disagreements);
  const sharedGround = deriveSharedGround(commonGround.length);
  const pattern = deriveDiagnosis({
    positionCount: positions.length,
    explicitPositionCount: positions.filter((position) => position.explicitness === "explicit").length,
    claimCount: extraction.claims.length,
    disagreementCount: disagreements.length,
    commonGroundCount: commonGround.length,
    groundingCoverage,
    primaryType,
    sharedGround,
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

  // A path is something the reader could do. A disagreement whose only
  // "resolution" is that the source does not state one has no path; the
  // normative template is a real statement about value disputes and stays.
  const resolutionPaths: ResolutionPath[] = disagreements
    .filter((item) => item.type === "normative" || item.resolutionCondition !== RESOLUTION_NOT_STATED)
    .slice(0, 4)
    .map((item, index) => {
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

  const headline = diagnosisHeadline(pattern, { sharedGround });
  // §10.5: when positions exist but nothing load-bearing could be established,
  // say so. Echoing the main question in that slot reads as if the diagnosis
  // had an answer; it does not, and the reader should know why.
  const positionsWithoutReasons =
    pattern === "insufficient-context" && positions.length >= 2 && extraction.claims.length === 0;
  const insight =
    cruxes[0]?.question
      ? `The argument turns on: ${cruxes[0].question}`
      : positionsWithoutReasons
        ? "The text states opposing positions, but no reason, evidence, or shared premise could be mapped, so no load-bearing proposition could be established."
        : extraction.mainQuestion;

  const caveats = [
    ...extraction.caveats,
    ...(input.extraCaveats ?? []),
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
      sharedGround,
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
    accountability,
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
