import { DISAGREEMENT_USER_FACING_TYPES } from "./constants";
import type { ConfidenceBand, DiagnosisPattern, DisagreementType, ResolvabilityBand } from "@/types/disagreement";

const PATTERN_LABELS: Record<DiagnosisPattern, string> = {
  "mostly-common-ground": "Mostly common ground",
  "single-empirical-crux": "Single empirical crux",
  "causal-model-split": "Causal model split",
  "forecast-split": "Forecast split",
  "definition-mismatch": "Definition mismatch",
  "value-conflict": "Value conflict",
  "priority-tradeoff": "Priority tradeoff",
  "trust-split": "Trust split",
  "mixed-disagreement": "Mixed disagreement",
  "not-a-disagreement": "Not a disagreement",
  "insufficient-context": "Insufficient context",
};

/** The diagnosis pattern in plain words, for a report with no typed disagreement to name. */
export function diagnosisPatternLabel(pattern: DiagnosisPattern): string {
  return PATTERN_LABELS[pattern];
}

export function disagreementTypeLabel(type: DisagreementType): string {
  return DISAGREEMENT_USER_FACING_TYPES[type];
}

export function bandLabel(band: ConfidenceBand | ResolvabilityBand): string {
  return band.charAt(0).toUpperCase() + band.slice(1);
}

export function characterBucket(length: number): string {
  if (length < 250) return "xs";
  if (length < 800) return "s";
  if (length < 2500) return "m";
  if (length < 8000) return "l";
  return "xl";
}

export function latencyBucket(ms: number): string {
  if (ms < 1500) return "fast";
  if (ms < 5000) return "medium";
  if (ms < 15000) return "slow";
  return "very-slow";
}
