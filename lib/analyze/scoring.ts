/** Client-safe display helpers derived from analysis scores. */
export type ArgumentStrength = "strong" | "moderate" | "weak" | "unsupported";

export function getArgumentStrength(score: number): ArgumentStrength {
  if (score >= 7) return "strong";
  if (score >= 4) return "moderate";
  if (score >= 1) return "weak";
  return "unsupported";
}

export type ConfidenceLevel =
  | "very-high"
  | "high"
  | "moderate"
  | "low"
  | "very-low";

export function getConfidenceInfo(score: number): {
  level: ConfidenceLevel;
  label: string;
  description: string;
} {
  if (score >= 0.9) {
    return {
      level: "very-high",
      label: "Very High Confidence",
      description: "Clear debate with well-defined, evidence-backed positions on both sides",
    };
  }
  if (score >= 0.75) {
    return {
      level: "high",
      label: "High Confidence",
      description: "Strong argumentative structure with minor ambiguities",
    };
  }
  if (score >= 0.5) {
    return {
      level: "moderate",
      label: "Moderate Confidence",
      description: "Identifiable positions but significant gaps in evidence or clarity",
    };
  }
  if (score >= 0.3) {
    return {
      level: "low",
      label: "Low Confidence",
      description: "Weak argumentative structure — positions unclear or one-sided",
    };
  }
  return {
    level: "very-low",
    label: "Very Low Confidence",
    description: "Content may not be argumentative — treat results with caution",
  };
}
