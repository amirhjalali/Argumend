import { z } from "zod";

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
  pillars: z.array(PillarSchema),
  evidence: z.array(EvidenceSchema).optional(), // Topic-level evidence for scales view
  // Embedded metadata (previously in topicConfigs)
  imageUrl: z.string().url().optional(),
  references: z.array(ReferenceSchema).optional(),
  questions: z.array(QuestionSchema).optional(),
});

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
export type TopicStatus = z.infer<typeof TopicStatusSchema>;
export type Topic = z.infer<typeof TopicSchema>;

// ============================================================================
// Confidence Score Computation
// ============================================================================

/**
 * Score a single piece of evidence based on its weights.
 * Returns a value 0-40 (sum of all four weight dimensions).
 */
function scoreEvidence(evidence: Evidence): number {
  const { weight } = evidence;
  return (
    weight.sourceReliability +
    weight.independence +
    weight.replicability +
    weight.directness
  );
}

/**
 * Compute confidence score from all evidence across all pillars.
 * Returns a value 0-100 representing the strength of the "for" position.
 *
 * Formula: forScore / (forScore + againstScore + 1) * 100
 * The +1 prevents division by zero and adds slight uncertainty.
 */
export function computeConfidenceScore(pillars: Pillar[]): number {
  const allEvidence = pillars.flatMap((p) => p.evidence ?? []);

  if (allEvidence.length === 0) {
    return 50; // No evidence means neutral
  }

  const forEvidence = allEvidence.filter((e) => e.side === "for");
  const againstEvidence = allEvidence.filter((e) => e.side === "against");

  const forScore = forEvidence.reduce((sum, e) => sum + scoreEvidence(e), 0);
  const againstScore = againstEvidence.reduce(
    (sum, e) => sum + scoreEvidence(e),
    0
  );

  // Normalize to 0-100 scale
  const rawScore = forScore / (forScore + againstScore + 1);
  return Math.round(rawScore * 100);
}

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
