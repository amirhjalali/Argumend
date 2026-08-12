import { z } from "zod";
import type { ArgumentGraph } from "@/types/argument";

const NonEmptyStringSchema = z.string().trim().min(1);

const HttpUrlSchema = z
  .string()
  .url()
  .refine((value) => {
    if (!URL.canParse(value)) return false;
    const protocol = new URL(value).protocol;
    return protocol === "https:" || protocol === "http:";
  }, "Source URL must use HTTP or HTTPS");

const ProvenanceSchema = z
  .object({
    origin: z.enum(["source", "extracted", "curator"]),
    modelId: z.string().optional(),
    sourceRef: z.string().optional(),
  })
  .strict();

const NodeBaseSchema = z
  .object({
    id: NonEmptyStringSchema,
    type: z.enum(["question", "position", "claim", "inference", "evidence"]),
    statement: NonEmptyStringSchema,
    summary: z.string().max(140).optional(),
    tags: z.array(z.string()).optional(),
    provenance: ProvenanceSchema,
    createdAt: NonEmptyStringSchema,
    updatedAt: z.string().optional(),
    modelVersion: z.literal(2),
  })
  .strict();

export const ConfidenceSchema = z
  .object({
    value: z.number().min(0).max(1),
    basis: NonEmptyStringSchema,
  })
  .strict();

export const WeightSchema = z
  .object({
    sourceReliability: z.number().min(0).max(10),
    independence: z.number().min(0).max(10),
    replicability: z.number().min(0).max(10),
    directness: z.number().min(0).max(10),
    weightBasis: NonEmptyStringSchema,
  })
  .strict();

export const QuestionSchema = NodeBaseSchema.extend({
  type: z.literal("question"),
})
  .strict()
  .refine((question) => question.statement.trim().endsWith("?"), {
    message: "QUESTION statement must end with ?",
    path: ["statement"],
  });

export const ClaimSchema = NodeBaseSchema.extend({
  type: z.literal("claim"),
  epistemicType: z.enum([
    "empirical",
    "predictive",
    "normative",
    "definitional",
    "procedural",
  ]),
  status: z.enum([
    "uncontested",
    "broadly_accepted",
    "contested",
    "unresolved",
    "superseded",
  ]),
  statusBasis: NonEmptyStringSchema,
  implicit: z.boolean().optional(),
  attributedTo: z.array(NonEmptyStringSchema).optional(),
  resolution: z
    .object({
      kind: z.enum([
        "existing-evidence",
        "future-observable",
        "definitional-choice",
        "value-difference",
        "authority-allocation",
      ]),
      condition: NonEmptyStringSchema,
    })
    .strict()
    .optional(),
  confidence: ConfidenceSchema.optional(),
  cruxOverride: z.enum(["pin", "suppress"]).optional(),
  overrideBasis: z.string().optional(),
})
  .strict()
  .superRefine((claim, ctx) => {
    const hasOverride = claim.cruxOverride !== undefined;
    const hasBasis =
      claim.overrideBasis !== undefined && claim.overrideBasis.trim().length > 0;

    if (hasOverride && !hasBasis) {
      ctx.addIssue({
        code: "custom",
        message: "overrideBasis is required when cruxOverride is present",
        path: ["overrideBasis"],
      });
    }

    if (!hasOverride && hasBasis) {
      ctx.addIssue({
        code: "custom",
        message: "overrideBasis is forbidden unless cruxOverride is present",
        path: ["overrideBasis"],
      });
    }
  });

export const PositionSchema = NodeBaseSchema.extend({
  type: z.literal("position"),
  label: NonEmptyStringSchema,
  constituency: NonEmptyStringSchema,
  steelmanBasis: NonEmptyStringSchema,
  displayRank: z.number(),
}).strict();

export const InferenceSchema = NodeBaseSchema.extend({
  type: z.literal("inference"),
  warrant: NonEmptyStringSchema,
  warrantImplicit: z.boolean(),
  warrantKind: z.enum([
    "statistical-generalization",
    "causal-identification",
    "analogy",
    "aggregation-model",
    "is-to-ought",
    "normative-principle-application",
    "authority",
  ]),
}).strict();

export const SourceSchema = z
  .object({
    title: NonEmptyStringSchema,
    url: HttpUrlSchema.optional(),
    author: z.string().optional(),
    institution: z.string().optional(),
    publishedAt: z.string().optional(),
    kind: z.enum([
      "peer-reviewed",
      "government",
      "institutional",
      "industry",
      "advocacy",
      "journalism",
      "primary-document",
      "other",
    ]),
    interest: z.string().optional(),
    verification: z.enum([
      "verified-live",
      "verified-content",
      "bot-blocked-assumed-live",
      "unverified",
    ]),
    verifiedAt: z.string().optional(),
  })
  .strict();

export const EvidenceSchema = NodeBaseSchema.extend({
  type: z.literal("evidence"),
  finding: NonEmptyStringSchema,
  source: SourceSchema,
  relevance: NonEmptyStringSchema,
  status: z.enum(["current", "superseded"]).optional(),
  weight: WeightSchema.optional(),
  unverifiedFlags: z.array(z.string()).optional(),
})
  .strict()
  .refine((evidence) => evidence.finding === evidence.statement, {
    message: "EVIDENCE finding must equal statement",
    path: ["finding"],
  });

export const ArgumentNodeSchema = z.discriminatedUnion("type", [
  QuestionSchema,
  PositionSchema,
  ClaimSchema,
  InferenceSchema,
  EvidenceSchema,
]);

export const ArgumentEdgeSchema = z
  .object({
    id: NonEmptyStringSchema,
    from: NonEmptyStringSchema,
    to: NonEmptyStringSchema,
    type: z.enum([
      "supports",
      "opposes",
      "premise_of",
      "concludes",
      "undercuts",
      "evidences",
      "limits_scope",
      "qualifies",
      "depends_on",
      "contradicts",
      "supersedes",
    ]),
    polarity: z.enum(["supporting", "challenging", "qualifying"]).optional(),
    note: z.string().optional(),
  })
  .strict()
  .superRefine((edge, ctx) => {
    if (edge.type === "evidences" && edge.polarity === undefined) {
      ctx.addIssue({
        code: "custom",
        message: "polarity is required when edge type is evidences",
        path: ["polarity"],
      });
    }

    if (edge.type !== "evidences" && edge.polarity !== undefined) {
      ctx.addIssue({
        code: "custom",
        message: "polarity is forbidden unless edge type is evidences",
        path: ["polarity"],
      });
    }
  });

export const ArgumentGraphSchema = z
  .object({
    topicId: NonEmptyStringSchema,
    modelVersion: z.literal(2),
    question: QuestionSchema,
    nodes: z.array(ArgumentNodeSchema),
    edges: z.array(ArgumentEdgeSchema),
  })
  .strict()
  .superRefine((graph, ctx) => {
    const questionNodes = graph.nodes.filter((node) => node.type === "question");

    if (questionNodes.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "ArgumentGraph must contain exactly one QUESTION node",
        path: ["nodes"],
      });
      return;
    }

    const [questionNode] = questionNodes;
    if (
      questionNode.id !== graph.question.id ||
      questionNode.statement !== graph.question.statement
    ) {
      ctx.addIssue({
        code: "custom",
        message: "ArgumentGraph.question must mirror the canonical QUESTION node",
        path: ["question"],
      });
    }
  });

export type ParseArgumentGraphResult =
  | { ok: true; graph: ArgumentGraph }
  | { ok: false; errors: string[] };

export function parseArgumentGraph(input: unknown): ParseArgumentGraphResult {
  const result = ArgumentGraphSchema.safeParse(input);

  if (result.success) {
    return { ok: true, graph: result.data };
  }

  return {
    ok: false,
    errors: result.error.issues.map((issue) => {
      const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      return `${path}${issue.message}`;
    }),
  };
}
