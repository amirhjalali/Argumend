import {
  DEFAULT_CANDIDACY_FLOOR,
  describeProbeSkip,
  describeUncontestedReason,
  resolveCruxLeverFlags,
  uncontestedCruxReason,
  type CruxLeverFlags,
  identifyCruxes,
  jevProjectionGateEnabled,
  normalizeContestednessOverrides,
  PROPAGATION_NON_CONVERGENCE_WARNING,
} from "@/lib/crux";
import type { ArgumentGraph } from "@/types/argument";
import type {
  ArgumentAccountability,
  CommonGroundItem,
  ConfidenceBand,
  DisagreementItem,
  DisagreementReportV1,
  DisagreementType,
  GroundingRef,
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
import { deriveEvidenceState } from "./evidenceState";
import { groundQuotes } from "./grounding";
import type { NormalizedExtraction } from "./normalize";
import { computeGroundingCoverage } from "./quality";
import { countQuoteCoverage } from "./quoteCoverage";
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

function withinLimit(preferred: string, fallback: string, maxCharacters: number): string {
  return preferred.length <= maxCharacters ? preferred : fallback;
}

function projectQualityWarnings(warnings: string[], hasUnstableInfluence: boolean): string[] {
  const isCritical = (warning: string) => warning.toLowerCase().includes("critical");
  const numerical = hasUnstableInfluence ? [PROPAGATION_NON_CONVERGENCE_WARNING] : [];
  const remaining = warnings.filter((warning) => !numerical.includes(warning));
  // Publication checks these warnings for "critical". Reserve their slots and
  // retain that marker even when an overlong diagnostic needs shortening.
  const ordered = [...numerical, ...remaining.filter(isCritical), ...remaining.filter((warning) => !isCritical(warning))];
  const max = DISAGREEMENT_LIMITS.maxQualityWarningCharacters;
  return ordered.slice(0, DISAGREEMENT_LIMITS.maxQualityWarnings).map((warning) => {
    if (warning.length <= max) return warning;
    const prefix = isCritical(warning) ? "Critical quality warning: " : "";
    return `${prefix}${warning.slice(0, max - prefix.length - 1)}…`;
  });
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
    return withinLimit(
      `Settling this moves ${named.slice(0, 3).join(", ")}; they do not stand or fall together on it.`,
      `Settling this affects ${named.length} positions; their cases depend on how this claim is resolved.`,
      DISAGREEMENT_LIMITS.maxSummaryCharacters,
    );
  }
  if (named.length === 1) {
    return withinLimit(
      `${named[0]} depends on this; the other positions do not turn on it.`,
      "One position depends on this; the other positions do not turn on it.",
      DISAGREEMENT_LIMITS.maxSummaryCharacters,
    );
  }
  return "The positions diverge here, though the source does not say how much rests on it.";
}

/** Trims a claim so it reads as a clause inside "If ... holds". */
function asCondition(statement: string): string {
  return statement.trim().replace(/\s+/g, " ").replace(/[.]+$/, "");
}

/** Show the claim affirmed and negated, retaining the stated stance directions. */
function cruxBranches(input: {
  claim?: { statement: string; stanceByPosition: Array<{ positionId: string; relation: "supports" | "opposes" }> };
  affectedPositionIds: string[];
  positionLabels: Map<string, string>;
}): Array<{ condition: string; consequence: string }> {
  const { claim, affectedPositionIds, positionLabels } = input;
  if (!claim) return [];
  const stated = asCondition(claim.statement);
  const stanceFor = new Map(claim.stanceByPosition.map((stance) => [stance.positionId, stance.relation]));
  const named = affectedPositionIds.filter((id) => stanceFor.has(id));
  const supported = named.filter((id) => stanceFor.get(id) === "supports");
  const opposed = named.filter((id) => stanceFor.get(id) === "opposes");
  if (named.length === 0 && affectedPositionIds.length === 0) return [];

  const branch = (holds: boolean) => {
    const prefix = holds ? "If this holds: " : "If this does not hold: ";
    const wrapped = `${prefix}${stated}`;
    const condition = withinLimit(wrapped, claim.statement, DISAGREEMENT_LIMITS.maxSummaryCharacters);
    const consequencePrefix = condition === wrapped ? "" : prefix;
    const gain = holds ? supported : opposed;
    const lose = holds ? opposed : supported;
    const movement = (ids: string[], direction: string, concise: boolean) => {
      if (ids.length === 0) return "";
      if (concise) return `The case for ${ids.length === 1 ? "one affected position" : `${ids.length} affected positions`} gets ${direction}`;
      return `The case for ${ids.map((id) => positionLabels.get(id) ?? id).join(" and ")} gets ${direction}`;
    };
    const consequences = (concise: boolean) =>
      [movement(gain, "stronger", concise), movement(lose, "weaker", concise)].filter(Boolean).join("; ");
    const preferred = named.length > 0
      ? `${consequencePrefix}${consequences(false)}.`
      : `${consequencePrefix}The balance between the positions may change, but the source does not say which way.`;
    const fallback = `${consequencePrefix}${consequences(true)}.`;
    return {
      condition,
      consequence: withinLimit(preferred, fallback, DISAGREEMENT_LIMITS.maxSummaryCharacters),
    };
  };
  return [branch(true), branch(false)].slice(0, DISAGREEMENT_LIMITS.maxBranchesPerCrux);
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

type CruxResolutionKind = ReportCrux["resolution"]["kind"];

/**
 * The resolution kinds that can honestly describe what settles a question of
 * this type. An evidence question may be settled by evidence in hand, by an
 * observation still to come, or by auditing a source; a value or priority
 * question only by a value choice; a definitional question only by a
 * definition; a procedural one by allocating the decision; a trust one by
 * an audit. The first entry is the default when the claim offers none that fit.
 */
function kindsForType(type: DisagreementType): readonly CruxResolutionKind[] {
  switch (type) {
    case "normative":
    case "priority":
      return ["value-difference"];
    case "definitional":
      return ["definitional-choice"];
    case "procedural":
      return ["authority-allocation"];
    case "trust":
      return ["source-audit"];
    case "predictive":
      return ["future-observable", "existing-evidence", "source-audit"];
    default:
      return ["existing-evidence", "future-observable", "source-audit"];
  }
}

/**
 * Spec §10.5 maps a ranked claim to a crux using the associated disagreement
 * candidate when available, then the claim's resolution condition. When the
 * crux borrows the disagreement's question, the disagreement's stated
 * condition is what would settle the question the reader sees, so it leads;
 * the claim's condition is the fallback, then the honest not-stated sentence.
 * The claim's kind stays when it fits the question's type (an experiment
 * still to run is future-observable under a causal question too) and is
 * replaced by the type's own kind when it clashes, so a weighing question is
 * never shown as settled by an evidence check. A crux that keeps its claim's
 * own question keeps the claim's resolution as before.
 */
function cruxResolution(input: {
  borrowed: boolean;
  type: DisagreementType;
  claim?: { resolution?: { kind: CruxResolutionKind; condition: string } };
  related?: { resolutionCondition: string };
}): ReportCrux["resolution"] {
  const { borrowed, type, claim, related } = input;
  const claimCondition = statedResolution(claim?.resolution?.condition);
  const relatedCondition = statedResolution(related?.resolutionCondition);
  const claimKind: CruxResolutionKind = claim?.resolution?.kind ?? (
    type === "normative" ? "value-difference" :
    type === "definitional" ? "definitional-choice" :
    type === "predictive" ? "future-observable" :
    "existing-evidence"
  );
  if (!borrowed) {
    return { kind: claimKind, condition: claimCondition ?? relatedCondition ?? RESOLUTION_NOT_STATED };
  }
  const fitting = kindsForType(type);
  return {
    kind: fitting.includes(claimKind) ? claimKind : fitting[0]!,
    condition: relatedCondition ?? claimCondition ?? RESOLUTION_NOT_STATED,
  };
}

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
 * grounded quotes cover everyone it is attributed to, or an identified
 * narrator describes their agreement. One side's words cannot establish
 * agreement by an unquoted person, and an outside participant's own view is
 * not narrator attestation.
 */
function commonGroundAttested(
  participantIds: string[],
  grounding: GroundingRef[],
  narratorIds: ReadonlySet<string>,
): boolean {
  const attributed = new Set(participantIds);
  if (attributed.size < 2) return false;
  for (const ref of grounding) {
    if (ref.participantId && !attributed.has(ref.participantId) && narratorIds.has(ref.participantId)) {
      return true;
    }
  }
  // Model-supplied participant IDs do not turn one passage into independent
  // statements. Require a separate source span for each person, including when
  // a second quote is only a nested excerpt of the first. Try alternatives so a
  // duplicate reference cannot hide genuine, separately grounded agreement.
  const participants = [...attributed];
  const covered = (index: number, selected: GroundingRef[]): boolean => {
    if (index === participants.length) return true;
    return grounding.some((ref) => ref.participantId === participants[index] &&
      selected.every((other) => ref.end <= other.start || ref.start >= other.end) &&
      covered(index + 1, [...selected, ref]));
  };
  return covered(0, []);
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
  /** Experimental ranking and projection controls, all disabled by default. */
  cruxFlags?: Partial<CruxLeverFlags>;
  /**
   * Claim id -> 0..1 contestedness measured by a calibrated probe over this
   * same source (crux engine v1.2). Supplied by the caller; the projection
   * never calls out to anything. Without the gate flag it is inert.
   */
  contestedness?: Readonly<Record<string, number>>;
  /**
   * The projection's Jev gate (CRUX_PROJECTION_JEV_GATE, default off). An
   * explicit value wins over the environment.
   */
  jevGate?: boolean;
  /** Floor the gate compares against; defaults to the engine's 0.25. */
  contestednessFloor?: number;
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
    for (const item of quotes) {
      seenQuoteTexts.add(item.quote.trim().replace(/\s+/g, " "));
    }
    const result = groundQuotes(source, quotes, prefix);
    const coverage = countQuoteCoverage(quotes, result.refs);
    expectedQuotes += coverage.expected;
    dropped += coverage.dropped;
    groundedQuotes += coverage.grounded;
    warnings.push(...result.warnings);
    return result.refs;
  };

  const positions: ReportPosition[] = extraction.positions.map((position, index) => {
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
        `Relabelled position at index ${index} inferred: no verbatim quote from its participant survived grounding.`,
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
  const narratorIds = new Set(extraction.participants
    .filter((participant) => participant.kind === "author")
    .map((participant) => participant.id));
  extraction.commonGroundCandidates.forEach((item, index) => {
    const grounding = ground(item.groundingQuotes, `cg-${index + 1}`);
    // Shared ground is a claim about every person it is attributed to, and it
    // lands on real named people taking positions on contested subjects. With
    // quotes from one side only, or none (the model invented them, or inferred
    // the agreement), the report cannot back it for the others. The report has
    // no "inferred" label for common ground, so the item is dropped and the
    // gap recorded; §10.4 already refuses "uncontested" for such a claim.
    if (!commonGroundAttested(item.participantIds, grounding, narratorIds)) {
      warnings.push(
        `Dropped common-ground item cg-${index + 1}: agreement was not attested for every attributed participant in a group of at least two.`,
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
  const cruxFlags = resolveCruxLeverFlags(input.cruxFlags);
  const ranked = input.graphValid ? identifyCruxes(graph, { levers: cruxFlags }) : [];
  const hasUnstableInfluence = ranked.some((result) =>
    result.cycleWarnings.includes(PROPAGATION_NON_CONVERGENCE_WARNING),
  );
  const claimsById = new Map(extraction.claims.map((claim) => [claim.id, claim]));

  // Several ranked claims can belong to one disagreement candidate. Reusing that
  // candidate's question for each would render the same crux two or three times,
  // so a claim whose preferred question is taken falls back to its own statement
  // and is dropped only when that collides too.
  const cruxes: ReportCrux[] = [];
  const seenQuestions = new Set<string>();
  type Candidate = { result: (typeof ranked)[number]; question: string; borrowed: boolean };
  const deferredRestatements: Candidate[] = [];

  const addCrux = ({ result, question, borrowed }: Candidate) => {
    const claim = claimsById.get(result.claimId);
    const related = disagreements.find((item) => item.relatedClaimIds.includes(result.claimId));
    const type = borrowed && related ? related.type : (claim ? typeFromEpistemic(claim.epistemicType) : "empirical");
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
      resolution: cruxResolution({ borrowed, type, claim, related }),
      evidenceState: claim && EVIDENCE_TYPES.has(type)
        ? deriveEvidenceState({ claim, claims: extraction.claims, relations: extraction.claimRelations, source })
        : "not-independently-checked",
      confidence: (claim?.confidence ?? "medium") as ConfidenceBand,
    });
  };

  // Projection gate (CRUX_PROJECTION_JEV_GATE, default off): when the caller
  // supplies calibrated contestedness for this source, a ranked claim the
  // probe scores below the floor is not presented and the next engine-ranked
  // claim is taken. Like filter C this is presentation only — the engine's
  // order is untouched and nothing is re-ranked. It is deliberately separate
  // from the engine-level `contestednessOverrides`, so the two can be
  // measured apart.
  const jevGate = jevProjectionGateEnabled(input.jevGate);
  // Same validation as the engine: non-finite values are absent rather than
  // zero, values are clamped to 0..1, and the lookup is a Map so a claim id
  // like "__proto__" cannot resolve off the prototype chain.
  const contestedness = normalizeContestednessOverrides(input.contestedness);
  const contestednessFloor = input.contestednessFloor ?? DEFAULT_CANDIDACY_FLOOR;

  for (const [rankIndex, result] of ranked.entries()) {
    if (cruxes.length >= DISAGREEMENT_LIMITS.maxCruxes) break;
    const claim = claimsById.get(result.claimId);
    if (cruxFlags.projectionSkipUncontested && claim) {
      const reason = uncontestedCruxReason(claim, {
        commonGroundStatements: commonGround.map((item) => item.statement),
        claimRelations: extraction.claimRelations,
      });
      if (reason) {
        warnings.push(`Projection skipped engine crux at rank ${rankIndex + 1}: ${describeUncontestedReason(reason)}.`);
        continue;
      }
    }
    if (jevGate && claim) {
      const probe = contestedness.get(result.claimId);
      if (probe !== undefined && probe < contestednessFloor) {
        warnings.push(
          `Projection skipped engine crux at rank ${rankIndex + 1}: ${describeProbeSkip(probe, contestednessFloor)}.`,
        );
        continue;
      }
    }
    const related = disagreements.find((item) => item.relatedClaimIds.includes(result.claimId));
    // Statement first, question after: splicing the claim into "Is it true
    // that ..." would lowercase proper nouns or keep a stray capital.
    const claimQuestion = claim
      ? withinLimit(
        `${asCondition(claim.statement).replace(/[?!]+$/, "")}. Is that true?`,
        claim.statement,
        DISAGREEMENT_LIMITS.maxQuestionCharacters,
      )
      : undefined;
    const question = [related?.question, claimQuestion].find(
      (candidate) => candidate && !seenQuestions.has(normalizeQuestion(candidate)),
    );
    if (!question) continue;
    const borrowed = question === related?.question;
    // A crux that just restates the disagreement's own question hands the
    // reader back what they asked instead of naming what would settle it. Defer
    // rather than drop: if nothing more specific survives, it still beats
    // showing no crux at all.
    if (restatesMainQuestion(question, extraction.mainQuestion)) {
      deferredRestatements.push({ result, question, borrowed });
      continue;
    }
    addCrux({ result, question, borrowed });
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
      resolutionKind: kindsForType(item.type)[0],
      confidence: item.confidence,
      groundingCoverage,
    });
  }

  const resolutionPaths: ResolutionPath[] = disagreements
    .filter((item) => item.type === "normative" || item.resolutionCondition !== RESOLUTION_NOT_STATED)
    .slice(0, 4).map((item, index) => {
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
  const positionsWithoutReasons = pattern === "insufficient-context" && positions.length >= 2 && extraction.claims.length === 0;
  const insight =
    cruxes[0]?.question
      ? withinLimit(`The argument turns on: ${cruxes[0].question}`, cruxes[0].question, DISAGREEMENT_LIMITS.maxSummaryCharacters)
      : positionsWithoutReasons
        ? "The text states opposing positions, but no reason, evidence, or shared premise could be mapped, so no load-bearing proposition could be established."
        : extraction.mainQuestion;

  const sourceOnlyCaveat = "This analysis maps the submitted text. It does not independently verify factual claims, identify hidden motives, or prove that a participant would endorse every inferred formulation.";
  const caveats: string[] = [];
  let caveatCharacters = sourceOnlyCaveat.length;
  // Reserve room for the required caveat, retaining whole model caveats in
  // their original order rather than truncating a qualification mid-sentence.
  for (const caveat of [...(input.extraCaveats ?? []), ...extraction.caveats]) {
    if (caveats.length >= DISAGREEMENT_LIMITS.maxCaveats - 1 ||
      caveatCharacters + caveat.length > DISAGREEMENT_LIMITS.maxCaveatsCombinedCharacters) break;
    caveats.push(caveat);
    caveatCharacters += caveat.length;
  }
  caveats.push(sourceOnlyCaveat);

  return {
    schemaVersion: DISAGREEMENT_REPORT_SCHEMA_VERSION,
    title: extraction.mainQuestion.replace(/\?$/, "").trim() || extraction.mainQuestion,
    question: extraction.mainQuestion.endsWith("?")
      ? extraction.mainQuestion
      : withinLimit(`${extraction.mainQuestion}?`, extraction.mainQuestion, DISAGREEMENT_LIMITS.maxQuestionCharacters),
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
        expectedQuotes === 0
          ? "The report carries no quotes to check; nothing in the text was mapped to a quoted position."
          : groundingCoverage >= 0.6
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
      warnings: projectQualityWarnings(warnings, hasUnstableInfluence),
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
