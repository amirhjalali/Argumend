import { z } from "zod";
import { ArgumentGraphSchema } from "@/lib/schemas/argument";
import { DisagreementReportSchema } from "@/lib/schemas/disagreement";
import type { PasteMapsResult } from "./types";

const CandidateSchema = z.object({
  id: z.string(),
  title: z.string(),
  claim: z.string(),
  href: z.string(),
});

const CruxSchema = z.object({
  question: z.string(),
  supporterFlip: z.string().optional(),
  skepticFlip: z.string().optional(),
  settle: z.string().optional(),
  fight: z.string().optional(),
  href: z.string(),
});

/** Validate network data before it reaches the result components. */
export const PasteMapsResultSchema: z.ZodType<PasteMapsResult> = z.object({
  status: z.enum(["matched", "closest", "none"]),
  match: CandidateSchema.extend({
    kind: z.enum(["map", "flagship"]),
    crux: CruxSchema.nullable(),
    alsoCrux: CruxSchema.pick({ question: true, href: true }).optional(),
    cards: z.array(z.object({
      id: z.string(),
      side: z.enum(["for", "against"]),
      title: z.string(),
      description: z.string(),
      source: z.string().optional(),
      sourceUrl: z.string().optional(),
    })),
    cardsAbout: z.enum(["map-question", "map-claim", "crux-claim"]),
  }).nullable(),
  related: z.array(CandidateSchema),
  closest: z.array(CandidateSchema),
  reading: z.object({
    method: z.literal("keyword-index"),
    mapsSearched: z.number().int().nonnegative(),
    topScore: z.number().nullable(),
    rivalScore: z.number().nullable(),
    lead: z.number().nullable(),
    exclusiveLead: z.number().nullable(),
    coverage: z.number().min(0).max(1).nullable(),
    minLead: z.number(),
    minExclusiveLead: z.number(),
    minScore: z.number(),
    minCoverage: z.number().min(0).max(1),
    matchMs: z.number().nonnegative(),
    elapsedMs: z.number().nonnegative(),
  }),
}).refine((maps) => (maps.status === "matched") === (maps.match !== null), {
  message: "A matched result must name a map, and other results must not.",
});

export const PasteMapsResponseSchema = z.object({ maps: PasteMapsResultSchema });

export const PasteDiagnosisResponseSchema = z.object({
  report: DisagreementReportSchema,
  graph: ArgumentGraphSchema,
  execution: z.object({
    model: z.string().optional(),
    promptVersion: z.string().optional(),
    latencyMs: z.number().nonnegative().optional(),
  }).optional(),
  publishing: z.object({
    token: z.string().optional(),
    unavailableReason: z.string().optional(),
  }).optional(),
});

export const PasteErrorResponseSchema = z.object({
  error: z.string().optional(),
  code: z.string().optional(),
});

export const PastePrefillSchema = z.object({
  content: z.string(),
  contentType: z.unknown().optional(),
});
