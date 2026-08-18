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

  caveats: string[];
}

export interface DisagreementReferenceIssue {
  path: string;
  message: string;
}
