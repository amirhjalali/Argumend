export const DISAGREEMENT_REPORT_SCHEMA_VERSION = 1 as const;

export const DISAGREEMENT_PROMPT_VERSION = "disagreement-extraction-v1.0.0";

export const DISAGREEMENT_SOURCE_MODE = "source-only" as const;

export const DISAGREEMENT_SHARE_EYEBROW = "THE REAL DISAGREEMENT" as const;

export const DISAGREEMENT_LIMITS = {
  minSourceCharacters: 120,
  maxSourceCharacters: 20_000,
  maxParticipants: 8,
  maxPositions: 8,
  maxClaims: 40,
  maxClaimRelations: 80,
  maxCommonGround: 10,
  maxDisagreements: 12,
  maxCruxes: 3,
  maxGroundingPerObject: 4,
  maxQuoteCharacters: 280,
  maxPublishedQuoteCharactersTotal: 1_500,
  maxThesisCharacters: 500,
  maxSteelmanCharacters: 500,
  maxQuestionCharacters: 500,
  maxSummaryCharacters: 500,
  maxCaveatsCombinedCharacters: 1_000,
  maxCorrectionCharacters: 2_000,
  maxResolutionPaths: 8,
  maxBranchesPerCrux: 4,
} as const;

export const DISAGREEMENT_ANALYZE_RATE_LIMITS = {
  perHour: 3,
  perDay: 10,
  hourWindowMs: 60 * 60 * 1000,
  dayWindowMs: 24 * 60 * 60 * 1000,
} as const;

export const DISAGREEMENT_MODEL_TIMEOUT_MS = 45_000;

/**
 * The local CLI provider pays subprocess and cold-start cost that the HTTP
 * provider does not, and it never runs inside a request handler.
 */
export const DISAGREEMENT_CLI_TIMEOUT_MS = 300_000;

export const DISAGREEMENT_PUBLICATION_TOKEN_TTL_MS = 2 * 60 * 60 * 1000;

export const DISAGREEMENT_PUBLICATION_MIN_GROUNDING_COVERAGE = 0.6;

export const DISAGREEMENT_USER_FACING_TYPES = {
  empirical: "Fact",
  causal: "Cause",
  predictive: "Prediction",
  definitional: "Definition",
  normative: "Value",
  procedural: "Procedure",
  priority: "Priority",
  trust: "Source trust",
} as const;

export const DISAGREEMENT_EXAMPLE_SOURCE = `Alex: Immigration is destroying wages for working-class Americans.
Blair: That's complete nonsense. Immigrants grow the economy and create jobs.
Alex: The labor-supply effect hits the people who compete with new arrivals.
Blair: Complementarity and extra demand more than offset that.`;

export const DISAGREEMENT_ERROR_CODES = [
  "FEATURE_DISABLED",
  "INVALID_REQUEST",
  "CONTENT_TOO_SHORT",
  "CONTENT_TOO_LONG",
  "URL_INGESTION_NOT_AVAILABLE",
  "RATE_LIMITED",
  "MODEL_TIMEOUT",
  "MODEL_UNAVAILABLE",
  "MODEL_SCHEMA_INVALID",
  "INSUFFICIENT_ARGUMENT_STRUCTURE",
  "INTERNAL_ERROR",
] as const;
