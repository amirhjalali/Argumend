import type { EvidenceWeight } from "@/lib/schemas/topic";

/** Calculate the 0–40 total score for one evidence item. */
export function calculateEvidenceScore(weight: EvidenceWeight): number {
  return (
    weight.sourceReliability +
    weight.independence +
    weight.replicability +
    weight.directness
  );
}

export type ConfidenceTier = "Established" | "Strong" | "Contested" | "Thin";

/** Map a 0–100 evidence percentage to its reader-facing confidence tier. */
export function confidenceTier(pct: number): ConfidenceTier {
  if (pct >= 90) return "Established";
  if (pct >= 75) return "Strong";
  if (pct >= 50) return "Contested";
  return "Thin";
}
