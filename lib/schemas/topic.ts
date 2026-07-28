import { z } from "zod";
import { BALANCE, VERDICT, WEIGHT } from "@/lib/constants";

// ============================================================================
// Evidence Weight Schema
// ============================================================================

export const EvidenceWeightSchema = z.object({
  sourceReliability: z.number().min(0).max(10), // Track record, peer review, expertise
  independence: z.number().min(0).max(10), // Free from conflicts, corroborated
  replicability: z.number().min(0).max(10), // Can others verify? Reproduced?
  directness: z.number().min(0).max(10), // How directly addresses claim?
});

// ============================================================================
// Evidence Schema
// ============================================================================

export const EvidenceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  side: z.enum(["for", "against"]),
  weight: EvidenceWeightSchema,
  source: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  reasoning: z.string().optional(), // Why these weights were assigned
});

// ============================================================================
// Crux Schema
// ============================================================================

export const CruxSchema = z.object({
  id: z.string(),
  title: z.string(), // e.g., "The Retroreflector Test"
  description: z.string(), // The explanation of the test
  methodology: z.string(), // Step-by-step verification method
  equation: z.string().optional(), // LaTeX string if applicable
  verification_status: z.enum(["verified", "theoretical", "impossible"]),
  cost_to_verify: z.string(), // e.g. "$0 (Data Analysis)" or "$50M (New Probe)"
});

// ============================================================================
// Icon Names (Lucide icons)
// ============================================================================

export const IconNameSchema = z.enum([
  "Target",
  "Zap",
  "HelpCircle",
  "Shield",
  "Atom",
  "Telescope",
  "Microscope",
  "Scale",
  "Gavel",
  "FileText",
  "Users",
  "AlertTriangle",
]);

// ============================================================================
// Pillar Schema
// ============================================================================

export const PillarSchema = z.object({
  id: z.string(),
  title: z.string(), // e.g., "The Physical Trace"
  short_summary: z.string(),
  image_url: z.string().url().optional(),
  icon_name: IconNameSchema, // mapping to Lucide icon
  skeptic_premise: z.string(), // Steel-manned argument against
  proponent_rebuttal: z.string(), // The scientific defense
  crux: CruxSchema, // The definitive way to solve this specific pillar
  evidence: z.array(EvidenceSchema).optional(), // Evidence for scales view
});

// ============================================================================
// Reference Schema (for topic metadata)
// ============================================================================

export const ReferenceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

// ============================================================================
// Question Schema (for Logic Map nodes)
// ============================================================================

export const QuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().url().optional(),
  references: z.array(ReferenceSchema).optional(),
});

// ============================================================================
// Topic Category Schema
// ============================================================================

export const TopicCategorySchema = z.enum([
  "policy",
  "technology",
  "science",
  "economics",
  "philosophy",
]);

// ============================================================================
// Topic Status Schema
// ============================================================================

export const TopicStatusSchema = z.enum([
  "settled",
  "contested",
  "highly_speculative",
]);

// ============================================================================
// Topic Schema (unified with embedded questions/references)
// ============================================================================

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(), // e.g., "The Moon Landing"
  meta_claim: z.string(),
  confidence_score: z.number().min(0).max(100), // 0 to 100
  status: TopicStatusSchema,
  category: TopicCategorySchema,
  pillars: z.array(PillarSchema),
  evidence: z.array(EvidenceSchema).optional(), // Topic-level evidence for scales view
  // Embedded metadata (previously in topicConfigs)
  imageUrl: z.string().url().optional(),
  references: z.array(ReferenceSchema).optional(),
  questions: z.array(QuestionSchema).optional(),
});

// ============================================================================
// Two-Axis Confidence: Balance + Weight
// ============================================================================

export const VerdictQuadrantSchema = z.enum(["settled", "contested", "moderate", "open"]);
export const VerdictSchema = z.object({
  label: z.string(),
  quadrant: VerdictQuadrantSchema,
});
export type VerdictQuadrant = z.infer<typeof VerdictQuadrantSchema>;
export type Verdict = z.infer<typeof VerdictSchema>;

/**
 * Balance of evidence — which way it tips. 0–100, 50 = even.
 * forStrength / (forStrength + againstStrength) over the 0–40 evidence scores.
 */
export function computeBalance(pillars: Pillar[]): number {
  const allEvidence = pillars.flatMap((p) => p.evidence ?? []);
  const forScore = allEvidence
    .filter((e) => e.side === "for")
    .reduce((sum, e) => sum + calculateEvidenceScore(e.weight), 0);
  const againstScore = allEvidence
    .filter((e) => e.side === "against")
    .reduce((sum, e) => sum + calculateEvidenceScore(e.weight), 0);
  const total = forScore + againstScore;
  if (total === 0) return 50;
  return Math.round((forScore / total) * 100);
}

const RESOLVABILITY: Record<Crux["verification_status"], number> = {
  verified: 1,
  theoretical: 0.5,
  impossible: 0,
};

/**
 * Weight of argument — how much actually bears on the question. 0–100.
 * Composite of evidential mass (saturating), average quality, and crux
 * resolvability. Coefficients live in lib/constants.ts and are calibrated
 * against the full topic corpus (scripts/calibrate-weight.ts).
 */
export function computeWeight(pillars: Pillar[]): number {
  const strengths = pillars
    .flatMap((p) => p.evidence ?? [])
    .map((e) => calculateEvidenceScore(e.weight));
  const totalStrength = strengths.reduce((sum, s) => sum + s, 0);

  const mass = 1 - Math.exp(-totalStrength / WEIGHT.MASS_K);
  const quality = strengths.length > 0 ? totalStrength / strengths.length / 40 : 0;
  const resolvability =
    pillars.length > 0
      ? pillars.reduce((sum, p) => sum + RESOLVABILITY[p.crux.verification_status], 0) /
        pillars.length
      : 0;

  return Math.round(
    100 *
      (WEIGHT.W_MASS * mass +
        WEIGHT.W_QUALITY * quality +
        WEIGHT.W_RESOLVABILITY * resolvability)
  );
}

function favoredSide(balance: number): string {
  return balance >= 50 ? "the claim" : "the counterclaim";
}

/** Human label for the lean magnitude alone (no weight information). */
export function getLeanLabel(balance: number): string {
  const d = Math.abs(balance - 50);
  if (d < BALANCE.EVEN_D) return "Evenly balanced";
  if (d < BALANCE.LEAN_D)
    return balance >= 50 ? "Leans toward the claim" : "Leans toward the counterclaim";
  if (d < BALANCE.CLEAR_D) return `Clearly favors ${favoredSide(balance)}`;
  return `Strongly favors ${favoredSide(balance)}`;
}

/** 2-D verdict from both axes. Replaces the old 1-D getVerdictLabel. */
export function getVerdict(balance: number, weight: number): Verdict {
  const d = Math.abs(balance - 50);
  if (weight >= VERDICT.HIGH_WEIGHT && d >= VERDICT.SETTLED_D) {
    return {
      label: `Settled — evidence strongly favors ${favoredSide(balance)}`,
      quadrant: "settled",
    };
  }
  if (weight >= VERDICT.HIGH_WEIGHT) {
    return { label: "Well-mapped, genuinely contested", quadrant: "contested" };
  }
  if (weight >= VERDICT.LOW_WEIGHT) {
    const lean =
      d < BALANCE.EVEN_D
        ? "Balanced"
        : balance >= 50
          ? "Leans toward the claim"
          : "Leans toward the counterclaim";
    return { label: `${lean} — moderately evidenced`, quadrant: "moderate" };
  }
  return { label: "Open question — limited evidence so far", quadrant: "open" };
}

// ============================================================================
// Type Inference
// ============================================================================

export type EvidenceWeight = z.infer<typeof EvidenceWeightSchema>;
export type Evidence = z.infer<typeof EvidenceSchema>;
export type Crux = z.infer<typeof CruxSchema>;
export type IconName = z.infer<typeof IconNameSchema>;
export type Pillar = z.infer<typeof PillarSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type TopicCategory = z.infer<typeof TopicCategorySchema>;
export type TopicStatus = z.infer<typeof TopicStatusSchema>;
export type Topic = z.infer<typeof TopicSchema>;

// ============================================================================
// Confidence Score Computation
// ============================================================================

/** @deprecated Use computeBalance — this was always a balance, never a confidence. */
export const computeConfidenceScore = computeBalance;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Calculate total score for a single evidence item.
 */
export function calculateEvidenceScore(weight: EvidenceWeight): number {
  return (
    weight.sourceReliability +
    weight.independence +
    weight.replicability +
    weight.directness
  );
}

/**
 * Get verdict label based on confidence score.
 * @deprecated 1-D verdict — replaced by getVerdict(balance, weight). Deleted once all callers are migrated (Task 9).
 */
export function getVerdictLabel(confidenceScore: number): string {
  if (confidenceScore >= 95) return "Established beyond reasonable doubt";
  if (confidenceScore >= 75) return "Preponderance of evidence supports";
  if (confidenceScore >= 50) return "Evidence leans toward, but contested";
  return "Insufficient evidence";
}

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Parse and validate a topic, throwing if invalid.
 */
export function parseTopic(data: unknown): Topic {
  return TopicSchema.parse(data);
}

/**
 * Safely parse a topic, returning result object.
 */
export function safeParseTopics(data: unknown[]): {
  success: boolean;
  topics: Topic[];
  errors: string[];
} {
  const topics: Topic[] = [];
  const errors: string[] = [];

  for (const item of data) {
    const result = TopicSchema.safeParse(item);
    if (result.success) {
      topics.push(result.data);
    } else {
      const topicId = (item as { id?: string })?.id ?? "unknown";
      errors.push(`Topic "${topicId}": ${result.error.message}`);
    }
  }

  return {
    success: errors.length === 0,
    topics,
    errors,
  };
}
