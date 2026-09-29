import { DISAGREEMENT_USER_FACING_TYPES } from "./constants";
import type { ConfidenceBand, DisagreementType, ResolvabilityBand } from "@/types/disagreement";

export function disagreementTypeLabel(type: DisagreementType): string {
  return DISAGREEMENT_USER_FACING_TYPES[type];
}

export function bandLabel(band: ConfidenceBand | ResolvabilityBand): string {
  return band.charAt(0).toUpperCase() + band.slice(1);
}

/**
 * What a question is about, as the end of a plain sentence: "a question
 * about causes". The one-word type labels ("Cause", "Value") read as
 * operator categories on their own; the report says them in words instead.
 */
const ABOUT: Record<DisagreementType, string> = {
  empirical: "about the facts",
  causal: "about causes",
  predictive: "about what will happen",
  definitional: "about what a word means",
  normative: "about values",
  procedural: "about how to decide",
  priority: "about what matters most",
  trust: "about which sources to trust",
};

export function disagreementAbout(type: DisagreementType): string {
  return ABOUT[type];
}

/**
 * How settleable a question is, in a sentence rather than a band. The band
 * follows the crux's resolution kind (lib/disagreement/diagnosis.ts): checkable
 * or agreeable is "high", waiting on the future is "medium", values are "low".
 */
const RESOLVABILITY_SENTENCE: Record<ResolvabilityBand, string> = {
  high: "Something checkable, or a shared definition, could settle much of it.",
  medium: "It could be settled in part, or only with time.",
  low: "Evidence alone is unlikely to settle it: it rests on values.",
  unknown: "The text doesn’t show what would settle it.",
};

export function resolvabilitySentence(band: ResolvabilityBand): string {
  return RESOLVABILITY_SENTENCE[band];
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
