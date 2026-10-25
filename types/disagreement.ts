import type { ArgumentGraph } from "@/types/argument";

export const DISAGREEMENT_REPORT_SCHEMA_VERSION = 1 as const;

export type DisagreementContentType = "conversation" | "article" | "freeform";

export type DisagreementType =
  | "empirical"
  | "causal"
  | "predictive"
  | "definitional"
  | "normative"
  | "procedural"
  | "priority"
  | "trust";

export type DiagnosisPattern =
  | "mostly-common-ground"
  | "single-empirical-crux"
  | "causal-model-split"
  | "forecast-split"
  | "definition-mismatch"
  | "value-conflict"
  | "priority-tradeoff"
  | "trust-split"
  | "mixed-disagreement"
  | "not-a-disagreement"
  | "insufficient-context";

export type ConfidenceBand = "low" | "medium" | "high";
export type ResolvabilityBand = "low" | "medium" | "high" | "unknown";
export type SharedGroundBand = "none" | "low" | "moderate" | "high" | "unknown";
export type Explicitness = "explicit" | "inferred";
export type CommonGroundBasis = "explicit" | "strongly-implied";
export type ParticipantKind = "named" | "speaker-label" | "author" | "implicit";

export type ClaimRelationType =
  | "supports"
  | "opposes"
  | "depends_on"
  | "qualifies"
  | "contradicts"
  | "undercuts";

export type ClaimEpistemicType =
  | "empirical"
  | "predictive"
  | "normative"
  | "definitional"
  | "procedural";

export type ResolutionKind =
  | "existing-evidence"
  | "future-observable"
  | "definitional-choice"
  | "value-difference"
  | "authority-allocation"
  | "source-audit";

export type ResolutionPathKind =
  | "evidence"
  | "definition"
  | "forecast"
  | "value-clarification"
  | "procedure"
  | "source-trust"
  | "scope";

/**
 * What role a claim plays in the argument it is attached to — the answer to
 * "if this claim were false, what would change?"
 *
 * Internal terminology only. User-facing copy lives in the stakes projection
 * and never uses these words directly.
 */
export type StakeRole =
  | "hinge"
  | "material"
  | "supporting"
  | "context"
  | "rebuttal-only"
  | "unclear";

/** What the represented argument does when the claim fails. */
export type UpdateEffect =
  | "withdraw"
  | "substantially-weaken"
  | "somewhat-weaken"
  | "reconsider"
  | "no-change"
  | "not-stated";

/** Deterministic classification of how the stated stake behaves. */
export type StakeDiagnostic =
  | "clear-stake"
  | "commitment-gap"
  | "overdetermined"
  | "non-load-bearing"
  | "rebuttal-only"
  | "unclear";

/** Whether the participant themselves stated the consequence. */
export type StakeBasis = "explicit" | "inferred" | "unstated";

export type EvidenceState =
  | "not-independently-checked"
  | "asserted-in-source"
  | "no-evidence-provided";

export type DisagreementErrorCode =
  | "FEATURE_DISABLED"
  | "INVALID_REQUEST"
  | "CONTENT_TOO_SHORT"
  | "CONTENT_TOO_LONG"
  | "URL_INGESTION_NOT_AVAILABLE"
  | "RATE_LIMITED"
  | "MODEL_TIMEOUT"
  | "MODEL_UNAVAILABLE"
  | "MODEL_SCHEMA_INVALID"
  | "INSUFFICIENT_ARGUMENT_STRUCTURE"
  | "INTERNAL_ERROR";

/**
 * A verbatim quote and where it sits in the source. `start` and `end` index
 * the source after §10.1 normalisation (`normalizeSourceText`: CRLF and CR
 * become LF, NUL and control characters are removed), which is the text the
 * pipeline grounds against and the text a browser textarea already holds. The
 * report never carries the source itself; `provenance.sourceCharacterCount`
 * is the normalised length, so a consumer can tell which text it has.
 */
export interface GroundingRef {
  id: string;
  quote: string;
  participantId?: string;
  start: number;
  end: number;
}

export interface ReportParticipant {
  id: string;
  label: string;
  kind: ParticipantKind;
}

export interface ReportPosition {
  id: string;
  label: string;
  participantIds: string[];
  thesis: string;
  steelman: string;
  explicitness: Explicitness;
  confidence: ConfidenceBand;
  grounding: GroundingRef[];
}

export interface CommonGroundItem {
  id: string;
  statement: string;
  participantIds: string[];
  basis: CommonGroundBasis;
  confidence: ConfidenceBand;
  grounding: GroundingRef[];
}

export interface ParticipantStance {
  participantId: string;
  positionId?: string;
  stance: string;
}

export interface DisagreementItem {
  id: string;
  question: string;
  type: DisagreementType;
  summary: string;
  participantStances: ParticipantStance[];
  relatedClaimIds: string[];
  resolvability: ResolvabilityBand;
  resolutionCondition: string;
  confidence: ConfidenceBand;
  grounding: GroundingRef[];
}

export interface CruxBranch {
  condition: string;
  consequence: string;
}

export interface ReportCrux {
  id: string;
  claimId: string;
  question: string;
  type: DisagreementType;
  whyItMatters: string;
  affectedPositionIds: string[];
  branches: CruxBranch[];
  resolution: {
    kind: ResolutionKind;
    condition: string;
  };
  evidenceState: EvidenceState;
  confidence: ConfidenceBand;
}

export interface ResolutionPath {
  id: string;
  label: string;
  description: string;
  kind: ResolutionPathKind;
  disagreementIds: string[];
}

/**
 * A model-proposed answer to "if this claim is wrong, what changes?" for one
 * claim used by one participant. Attribution is required at the raw layer: a
 * stake without an owner is an application question, and application-generated
 * stakes are minted only by the projection fallback — never accepted from the
 * model.
 */
export interface RawClaimStakeCandidate {
  id: string;
  claimId: string;
  participantId: string;
  positionId?: string;
  targetConclusion: string;
  role: StakeRole;
  ifFalseEffect: UpdateEffect;
  consequence: string;
  basis: StakeBasis;
  falsificationCondition?: string;
  alternativeBasis?: string;
  groundingQuotes: RawGroundingQuote[];
}

/** Published form of a claim stake with grounded quotes and a derived diagnostic. */
export interface ClaimStake {
  id: string;
  claimId: string;
  participantId?: string;
  positionId?: string;
  claim: string;
  targetConclusion: string;
  role: StakeRole;
  ifFalseEffect: UpdateEffect;
  consequence: string;
  basis: StakeBasis;
  falsificationCondition?: string;
  alternativeBasis?: string;
  diagnostic: StakeDiagnostic;
  grounding: GroundingRef[];
}

/**
 * The "What is actually at stake?" section: makes reasons answerable by asking
 * what changes when each major reason fails. Optional so every report written
 * before this feature stays valid.
 */
export interface ArgumentAccountability {
  headline: string;
  summary: string;
  stakes: ClaimStake[];
  gapCount: number;
  clearStakeCount: number;
}

export interface DisagreementReportV1 {
  schemaVersion: 1;
  title: string;
  question: string;
  sourceMode: "source-only";
  summary: string;

  diagnosis: {
    pattern: DiagnosisPattern;
    headline: string;
    insight: string;
    primaryType?: DisagreementType;
    sharedGround: SharedGroundBand;
    resolvability: ResolvabilityBand;
    confidence: ConfidenceBand;
    confidenceBasis: string;
  };

  participants: ReportParticipant[];
  positions: ReportPosition[];
  commonGround: CommonGroundItem[];
  disagreements: DisagreementItem[];
  cruxes: ReportCrux[];
  resolutionPaths: ResolutionPath[];
  caveats: string[];

  /** Present only when the pipeline projected claim stakes (prompt v1.2.0+). */
  accountability?: ArgumentAccountability;

  share: {
    eyebrow: "THE REAL DISAGREEMENT";
    headline: string;
    subheadline: string;
    metrics: {
      positionCount: number;
      commonGroundCount: number;
      disagreementCount: number;
      cruxCount: number;
    };
  };

  quality: {
    groundingCoverage: number;
    droppedUngroundedQuoteCount: number;
    inferredPositionCount: number;
    warnings: string[];
  };

  provenance: {
    promptVersion: string;
    provider: string;
    model: string;
    generatedAt: string;
    sourceCharacterCount: number;
    independentlyVerified: false;
  };
}

export interface DisagreementAnalysisBundleV1 {
  report: DisagreementReportV1;
  graph: ArgumentGraph;
  execution: {
    mode: "live";
    provider: string;
    model: string;
    promptVersion: string;
    latencyMs: number;
    inputCharacters: number;
    outputTokens?: number;
  };
}

export interface RawGroundingQuote {
  quote: string;
  participantId?: string;
}

export interface RawDisagreementExtractionV1 {
  mainQuestion: string;

  participants: Array<{
    id: string;
    label: string;
    kind: ParticipantKind;
  }>;

  positions: Array<{
    id: string;
    label: string;
    participantIds: string[];
    thesis: string;
    steelman: string;
    explicitness: Explicitness;
    confidence: ConfidenceBand;
    groundingQuotes: RawGroundingQuote[];
  }>;

  claims: Array<{
    id: string;
    statement: string;
    participantIds: string[];
    epistemicType: ClaimEpistemicType;
    explicitness: Explicitness;
    stanceByPosition: Array<{
      positionId: string;
      relation: "supports" | "opposes";
    }>;
    acceptedByParticipantIds: string[];
    disputedByParticipantIds: string[];
    confidence: ConfidenceBand;
    resolution?: {
      kind: Exclude<ResolutionKind, "source-audit">;
      condition: string;
    };
    groundingQuotes: RawGroundingQuote[];
  }>;

  claimRelations: Array<{
    fromClaimId: string;
    toClaimId: string;
    type: ClaimRelationType;
  }>;

  commonGroundCandidates: Array<{
    statement: string;
    participantIds: string[];
    basis: CommonGroundBasis;
    confidence: ConfidenceBand;
    groundingQuotes: RawGroundingQuote[];
  }>;

  disagreementCandidates: Array<{
    id: string;
    question: string;
    type: DisagreementType;
    summary: string;
    claimIds: string[];
    participantStances: ParticipantStance[];
    resolutionCondition: string;
    confidence: ConfidenceBand;
    groundingQuotes: RawGroundingQuote[];
  }>;

  /** Optional so every fixture and stored payload from v1.0/1.1 stays parseable. */
  claimStakeCandidates?: RawClaimStakeCandidate[];

  caveats: string[];
}

export interface DisagreementReferenceIssue {
  path: string;
  message: string;
}
