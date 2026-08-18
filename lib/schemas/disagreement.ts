import { z } from "zod";
import {
  DISAGREEMENT_LIMITS,
  DISAGREEMENT_PROMPT_VERSION,
  DISAGREEMENT_REPORT_SCHEMA_VERSION,
  DISAGREEMENT_SHARE_EYEBROW,
  DISAGREEMENT_SOURCE_MODE,
} from "@/lib/disagreement/constants";
import type { DisagreementReferenceIssue } from "@/types/disagreement";

const L = DISAGREEMENT_LIMITS;

const NonEmptyId = z.string().trim().min(1).max(80);

const DisagreementTypeSchema = z.enum([
  "empirical",
  "causal",
  "predictive",
  "definitional",
  "normative",
  "procedural",
  "priority",
  "trust",
]);

const DiagnosisPatternSchema = z.enum([
  "mostly-common-ground",
  "single-empirical-crux",
  "causal-model-split",
  "forecast-split",
  "definition-mismatch",
  "value-conflict",
  "priority-tradeoff",
  "trust-split",
  "mixed-disagreement",
  "not-a-disagreement",
  "insufficient-context",
]);

const ConfidenceBandSchema = z.enum(["low", "medium", "high"]);
const ResolvabilityBandSchema = z.enum(["low", "medium", "high", "unknown"]);
const SharedGroundBandSchema = z.enum(["none", "low", "moderate", "high", "unknown"]);
const ExplicitnessSchema = z.enum(["explicit", "inferred"]);
const CommonGroundBasisSchema = z.enum(["explicit", "strongly-implied"]);
const ParticipantKindSchema = z.enum(["named", "speaker-label", "author", "implicit"]);

const ClaimRelationTypeSchema = z.enum([
  "supports",
  "opposes",
  "depends_on",
  "qualifies",
  "contradicts",
  "undercuts",
]);

const ClaimEpistemicTypeSchema = z.enum([
  "empirical",
  "predictive",
  "normative",
  "definitional",
  "procedural",
]);

const RawResolutionKindSchema = z.enum([
  "existing-evidence",
  "future-observable",
  "definitional-choice",
  "value-difference",
  "authority-allocation",
]);

const ReportResolutionKindSchema = z.enum([
  "existing-evidence",
  "future-observable",
  "definitional-choice",
  "value-difference",
  "authority-allocation",
  "source-audit",
]);

const ResolutionPathKindSchema = z.enum([
  "evidence",
  "definition",
  "forecast",
  "value-clarification",
  "procedure",
  "source-trust",
  "scope",
]);

const EvidenceStateSchema = z.enum([
  "not-independently-checked",
  "asserted-in-source",
  "no-evidence-provided",
]);

function boundedText(max: number) {
  return z.string().trim().min(1).max(max);
}

function caveatsCombinedLimit(caveats: string[]): boolean {
  return caveats.join("").length <= L.maxCaveatsCombinedCharacters;
}

export const RawGroundingQuoteSchema = z
  .object({
    quote: boundedText(L.maxQuoteCharacters),
    participantId: NonEmptyId.optional(),
  })
  .strict();

export const ParticipantStanceSchema = z
  .object({
    participantId: NonEmptyId,
    positionId: NonEmptyId.optional(),
    stance: boundedText(L.maxSummaryCharacters),
  })
  .strict();

export const RawParticipantSchema = z
  .object({
    id: NonEmptyId,
    label: boundedText(L.maxThesisCharacters),
    kind: ParticipantKindSchema,
  })
  .strict();

export const RawPositionSchema = z
  .object({
    id: NonEmptyId,
    label: boundedText(L.maxThesisCharacters),
    participantIds: z.array(NonEmptyId).min(1).max(L.maxParticipants),
    thesis: boundedText(L.maxThesisCharacters),
    steelman: boundedText(L.maxSteelmanCharacters),
    explicitness: ExplicitnessSchema,
    confidence: ConfidenceBandSchema,
    groundingQuotes: z.array(RawGroundingQuoteSchema).max(L.maxGroundingPerObject),
  })
  .strict();

export const RawClaimSchema = z
  .object({
    id: NonEmptyId,
    statement: boundedText(L.maxThesisCharacters),
    participantIds: z.array(NonEmptyId).max(L.maxParticipants),
    epistemicType: ClaimEpistemicTypeSchema,
    explicitness: ExplicitnessSchema,
    stanceByPosition: z
      .array(
        z
          .object({
            positionId: NonEmptyId,
            relation: z.enum(["supports", "opposes"]),
          })
          .strict(),
      )
      .max(L.maxPositions),
    acceptedByParticipantIds: z.array(NonEmptyId).max(L.maxParticipants),
    disputedByParticipantIds: z.array(NonEmptyId).max(L.maxParticipants),
    confidence: ConfidenceBandSchema,
    resolution: z
      .object({
        kind: RawResolutionKindSchema,
        condition: boundedText(L.maxSummaryCharacters),
      })
      .strict()
      .optional(),
    groundingQuotes: z.array(RawGroundingQuoteSchema).max(L.maxGroundingPerObject),
  })
  .strict();

export const RawClaimRelationSchema = z
  .object({
    fromClaimId: NonEmptyId,
    toClaimId: NonEmptyId,
    type: ClaimRelationTypeSchema,
  })
  .strict();

export const RawCommonGroundCandidateSchema = z
  .object({
    statement: boundedText(L.maxThesisCharacters),
    participantIds: z.array(NonEmptyId).min(1).max(L.maxParticipants),
    basis: CommonGroundBasisSchema,
    confidence: ConfidenceBandSchema,
    groundingQuotes: z.array(RawGroundingQuoteSchema).max(L.maxGroundingPerObject),
  })
  .strict();

export const RawDisagreementCandidateSchema = z
  .object({
    id: NonEmptyId,
    question: boundedText(L.maxQuestionCharacters),
    type: DisagreementTypeSchema,
    summary: boundedText(L.maxSummaryCharacters),
    claimIds: z.array(NonEmptyId).max(L.maxClaims),
    participantStances: z.array(ParticipantStanceSchema).max(L.maxParticipants),
    resolutionCondition: boundedText(L.maxSummaryCharacters),
    confidence: ConfidenceBandSchema,
    groundingQuotes: z.array(RawGroundingQuoteSchema).max(L.maxGroundingPerObject),
  })
  .strict();

export const RawDisagreementExtractionSchema = z
  .object({
    mainQuestion: boundedText(L.maxQuestionCharacters),
    participants: z.array(RawParticipantSchema).max(L.maxParticipants),
    positions: z.array(RawPositionSchema).max(L.maxPositions),
    claims: z.array(RawClaimSchema).max(L.maxClaims),
    claimRelations: z.array(RawClaimRelationSchema).max(L.maxClaimRelations),
    commonGroundCandidates: z
      .array(RawCommonGroundCandidateSchema)
      .max(L.maxCommonGround),
    disagreementCandidates: z
      .array(RawDisagreementCandidateSchema)
      .max(L.maxDisagreements),
    caveats: z.array(boundedText(L.maxSummaryCharacters)).max(12),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (!caveatsCombinedLimit(value.caveats)) {
      ctx.addIssue({
        code: "custom",
        message: `Caveats combined must be <= ${L.maxCaveatsCombinedCharacters} characters`,
        path: ["caveats"],
      });
    }
  });

export const GroundingRefSchema = z
  .object({
    id: NonEmptyId,
    quote: boundedText(L.maxQuoteCharacters),
    participantId: NonEmptyId.optional(),
    start: z.number().int().nonnegative(),
    end: z.number().int().nonnegative(),
  })
  .strict()
  .refine((value) => value.end > value.start, {
    message: "Grounding end must be greater than start",
    path: ["end"],
  });

export const ReportParticipantSchema = RawParticipantSchema;

export const ReportPositionSchema = z
  .object({
    id: NonEmptyId,
    label: boundedText(L.maxThesisCharacters),
    participantIds: z.array(NonEmptyId).min(1).max(L.maxParticipants),
    thesis: boundedText(L.maxThesisCharacters),
    steelman: boundedText(L.maxSteelmanCharacters),
    explicitness: ExplicitnessSchema,
    confidence: ConfidenceBandSchema,
    grounding: z.array(GroundingRefSchema).max(L.maxGroundingPerObject),
  })
  .strict();

export const CommonGroundItemSchema = z
  .object({
    id: NonEmptyId,
    statement: boundedText(L.maxThesisCharacters),
    participantIds: z.array(NonEmptyId).min(1).max(L.maxParticipants),
    basis: CommonGroundBasisSchema,
    confidence: ConfidenceBandSchema,
    grounding: z.array(GroundingRefSchema).max(L.maxGroundingPerObject),
  })
  .strict();

export const DisagreementItemSchema = z
  .object({
    id: NonEmptyId,
    question: boundedText(L.maxQuestionCharacters),
    type: DisagreementTypeSchema,
    summary: boundedText(L.maxSummaryCharacters),
    participantStances: z.array(ParticipantStanceSchema).max(L.maxParticipants),
    relatedClaimIds: z.array(NonEmptyId).max(L.maxClaims),
    resolvability: ResolvabilityBandSchema,
    resolutionCondition: boundedText(L.maxSummaryCharacters),
    confidence: ConfidenceBandSchema,
    grounding: z.array(GroundingRefSchema).max(L.maxGroundingPerObject),
  })
  .strict();

export const ReportCruxSchema = z
  .object({
    id: NonEmptyId,
    claimId: NonEmptyId,
    question: boundedText(L.maxQuestionCharacters),
    type: DisagreementTypeSchema,
    whyItMatters: boundedText(L.maxSummaryCharacters),
    affectedPositionIds: z.array(NonEmptyId).max(L.maxPositions),
    branches: z
      .array(
        z
          .object({
            condition: boundedText(L.maxSummaryCharacters),
            consequence: boundedText(L.maxSummaryCharacters),
          })
          .strict(),
      )
      .max(L.maxBranchesPerCrux),
    resolution: z
      .object({
        kind: ReportResolutionKindSchema,
        condition: boundedText(L.maxSummaryCharacters),
      })
      .strict(),
    evidenceState: EvidenceStateSchema,
    confidence: ConfidenceBandSchema,
  })
  .strict();

export const ResolutionPathSchema = z
  .object({
    id: NonEmptyId,
    label: boundedText(L.maxThesisCharacters),
    description: boundedText(L.maxSummaryCharacters),
    kind: ResolutionPathKindSchema,
    disagreementIds: z.array(NonEmptyId).max(L.maxDisagreements),
  })
  .strict();

export const DisagreementReportSchema = z
  .object({
    schemaVersion: z.literal(DISAGREEMENT_REPORT_SCHEMA_VERSION),
    title: boundedText(L.maxThesisCharacters),
    question: boundedText(L.maxQuestionCharacters),
    sourceMode: z.literal(DISAGREEMENT_SOURCE_MODE),
    summary: boundedText(L.maxSummaryCharacters),
    diagnosis: z
      .object({
        pattern: DiagnosisPatternSchema,
        headline: boundedText(L.maxThesisCharacters),
        insight: boundedText(L.maxSummaryCharacters),
        primaryType: DisagreementTypeSchema.optional(),
        sharedGround: SharedGroundBandSchema,
        resolvability: ResolvabilityBandSchema,
        confidence: ConfidenceBandSchema,
        confidenceBasis: boundedText(L.maxSummaryCharacters),
      })
      .strict(),
    participants: z.array(ReportParticipantSchema).max(L.maxParticipants),
    positions: z.array(ReportPositionSchema).max(L.maxPositions),
    commonGround: z.array(CommonGroundItemSchema).max(L.maxCommonGround),
    disagreements: z.array(DisagreementItemSchema).max(L.maxDisagreements),
    cruxes: z.array(ReportCruxSchema).max(L.maxCruxes),
    resolutionPaths: z.array(ResolutionPathSchema).max(L.maxResolutionPaths),
    caveats: z.array(boundedText(L.maxSummaryCharacters)).max(12),
    share: z
      .object({
        eyebrow: z.literal(DISAGREEMENT_SHARE_EYEBROW),
        headline: boundedText(L.maxThesisCharacters),
        subheadline: boundedText(L.maxSummaryCharacters),
        metrics: z
          .object({
            positionCount: z.number().int().nonnegative(),
            commonGroundCount: z.number().int().nonnegative(),
            disagreementCount: z.number().int().nonnegative(),
            cruxCount: z.number().int().nonnegative(),
          })
          .strict(),
      })
      .strict(),
    quality: z
      .object({
        groundingCoverage: z.number().min(0).max(1),
        droppedUngroundedQuoteCount: z.number().int().nonnegative(),
        inferredPositionCount: z.number().int().nonnegative(),
        warnings: z.array(z.string().max(280)).max(40),
      })
      .strict(),
    provenance: z
      .object({
        promptVersion: z.literal(DISAGREEMENT_PROMPT_VERSION),
        provider: boundedText(80),
        model: boundedText(120),
        generatedAt: boundedText(40),
        sourceCharacterCount: z.number().int().nonnegative(),
        independentlyVerified: z.literal(false),
      })
      .strict(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (!caveatsCombinedLimit(value.caveats)) {
      ctx.addIssue({
        code: "custom",
        message: `Caveats combined must be <= ${L.maxCaveatsCombinedCharacters} characters`,
        path: ["caveats"],
      });
    }

    const quoteChars = collectReportQuoteCharacters(value);
    if (quoteChars > L.maxPublishedQuoteCharactersTotal) {
      ctx.addIssue({
        code: "custom",
        message: `Persisted quotes must be <= ${L.maxPublishedQuoteCharactersTotal} characters`,
        path: ["quality"],
      });
    }
  });

export function uniqueIds(ids: string[]): boolean {
  return new Set(ids).size === ids.length;
}

export function collectReportQuoteCharacters(report: {
  positions: Array<{ grounding: Array<{ quote: string }> }>;
  commonGround: Array<{ grounding: Array<{ quote: string }> }>;
  disagreements: Array<{ grounding: Array<{ quote: string }> }>;
}): number {
  return [...report.positions, ...report.commonGround, ...report.disagreements]
    .flatMap((item) => item.grounding)
    .reduce((sum, ref) => sum + ref.quote.length, 0);
}

function addMissing(
  issues: DisagreementReferenceIssue[],
  path: string,
  id: string,
  known: Set<string>,
  kind: string,
) {
  if (!known.has(id)) {
    issues.push({ path, message: `Unknown ${kind} "${id}"` });
  }
}

export function collectRawExtractionReferenceIssues(
  extraction: z.infer<typeof RawDisagreementExtractionSchema>,
): DisagreementReferenceIssue[] {
  const issues: DisagreementReferenceIssue[] = [];
  const participantIds = extraction.participants.map((item) => item.id);
  const positionIds = extraction.positions.map((item) => item.id);
  const claimIds = extraction.claims.map((item) => item.id);
  const disagreementIds = extraction.disagreementCandidates.map((item) => item.id);

  if (!uniqueIds(participantIds)) {
    issues.push({ path: "participants", message: "Duplicate participant ids" });
  }
  if (!uniqueIds(positionIds)) {
    issues.push({ path: "positions", message: "Duplicate position ids" });
  }
  if (!uniqueIds(claimIds)) {
    issues.push({ path: "claims", message: "Duplicate claim ids" });
  }
  if (!uniqueIds(disagreementIds)) {
    issues.push({
      path: "disagreementCandidates",
      message: "Duplicate disagreement ids",
    });
  }

  const participants = new Set(participantIds);
  const positions = new Set(positionIds);
  const claims = new Set(claimIds);

  for (const [index, position] of extraction.positions.entries()) {
    for (const participantId of position.participantIds) {
      addMissing(
        issues,
        `positions.${index}.participantIds`,
        participantId,
        participants,
        "participant",
      );
    }
    for (const [quoteIndex, quote] of position.groundingQuotes.entries()) {
      if (quote.participantId) {
        addMissing(
          issues,
          `positions.${index}.groundingQuotes.${quoteIndex}.participantId`,
          quote.participantId,
          participants,
          "participant",
        );
      }
    }
  }

  for (const [index, claim] of extraction.claims.entries()) {
    for (const participantId of claim.participantIds) {
      addMissing(
        issues,
        `claims.${index}.participantIds`,
        participantId,
        participants,
        "participant",
      );
    }
    for (const participantId of claim.acceptedByParticipantIds) {
      addMissing(
        issues,
        `claims.${index}.acceptedByParticipantIds`,
        participantId,
        participants,
        "participant",
      );
    }
    for (const participantId of claim.disputedByParticipantIds) {
      addMissing(
        issues,
        `claims.${index}.disputedByParticipantIds`,
        participantId,
        participants,
        "participant",
      );
    }
    for (const [stanceIndex, stance] of claim.stanceByPosition.entries()) {
      addMissing(
        issues,
        `claims.${index}.stanceByPosition.${stanceIndex}.positionId`,
        stance.positionId,
        positions,
        "position",
      );
    }
    for (const [quoteIndex, quote] of claim.groundingQuotes.entries()) {
      if (quote.participantId) {
        addMissing(
          issues,
          `claims.${index}.groundingQuotes.${quoteIndex}.participantId`,
          quote.participantId,
          participants,
          "participant",
        );
      }
    }
  }

  for (const [index, relation] of extraction.claimRelations.entries()) {
    addMissing(
      issues,
      `claimRelations.${index}.fromClaimId`,
      relation.fromClaimId,
      claims,
      "claim",
    );
    addMissing(
      issues,
      `claimRelations.${index}.toClaimId`,
      relation.toClaimId,
      claims,
      "claim",
    );
  }

  for (const [index, item] of extraction.commonGroundCandidates.entries()) {
    for (const participantId of item.participantIds) {
      addMissing(
        issues,
        `commonGroundCandidates.${index}.participantIds`,
        participantId,
        participants,
        "participant",
      );
    }
  }

  for (const [index, item] of extraction.disagreementCandidates.entries()) {
    for (const claimId of item.claimIds) {
      addMissing(
        issues,
        `disagreementCandidates.${index}.claimIds`,
        claimId,
        claims,
        "claim",
      );
    }
    for (const [stanceIndex, stance] of item.participantStances.entries()) {
      addMissing(
        issues,
        `disagreementCandidates.${index}.participantStances.${stanceIndex}.participantId`,
        stance.participantId,
        participants,
        "participant",
      );
      if (stance.positionId) {
        addMissing(
          issues,
          `disagreementCandidates.${index}.participantStances.${stanceIndex}.positionId`,
          stance.positionId,
          positions,
          "position",
        );
      }
    }
  }

  return issues;
}

export function collectReportReferenceIssues(
  report: z.infer<typeof DisagreementReportSchema>,
): DisagreementReferenceIssue[] {
  const issues: DisagreementReferenceIssue[] = [];
  const participantIds = report.participants.map((item) => item.id);
  const positionIds = report.positions.map((item) => item.id);
  const disagreementIds = report.disagreements.map((item) => item.id);

  if (!uniqueIds(participantIds)) {
    issues.push({ path: "participants", message: "Duplicate participant ids" });
  }
  if (!uniqueIds(positionIds)) {
    issues.push({ path: "positions", message: "Duplicate position ids" });
  }
  if (!uniqueIds(disagreementIds)) {
    issues.push({ path: "disagreements", message: "Duplicate disagreement ids" });
  }
  if (!uniqueIds(report.cruxes.map((item) => item.id))) {
    issues.push({ path: "cruxes", message: "Duplicate crux ids" });
  }
  if (!uniqueIds(report.commonGround.map((item) => item.id))) {
    issues.push({ path: "commonGround", message: "Duplicate common-ground ids" });
  }

  const participants = new Set(participantIds);
  const positions = new Set(positionIds);
  const disagreements = new Set(disagreementIds);

  const checkGrounding = (
    path: string,
    grounding: Array<{ participantId?: string }>,
  ) => {
    for (const [index, ref] of grounding.entries()) {
      if (ref.participantId) {
        addMissing(
          issues,
          `${path}.${index}.participantId`,
          ref.participantId,
          participants,
          "participant",
        );
      }
    }
  };

  for (const [index, position] of report.positions.entries()) {
    for (const participantId of position.participantIds) {
      addMissing(
        issues,
        `positions.${index}.participantIds`,
        participantId,
        participants,
        "participant",
      );
    }
    checkGrounding(`positions.${index}.grounding`, position.grounding);
  }

  for (const [index, item] of report.commonGround.entries()) {
    for (const participantId of item.participantIds) {
      addMissing(
        issues,
        `commonGround.${index}.participantIds`,
        participantId,
        participants,
        "participant",
      );
    }
    checkGrounding(`commonGround.${index}.grounding`, item.grounding);
  }

  for (const [index, item] of report.disagreements.entries()) {
    for (const [stanceIndex, stance] of item.participantStances.entries()) {
      addMissing(
        issues,
        `disagreements.${index}.participantStances.${stanceIndex}.participantId`,
        stance.participantId,
        participants,
        "participant",
      );
      if (stance.positionId) {
        addMissing(
          issues,
          `disagreements.${index}.participantStances.${stanceIndex}.positionId`,
          stance.positionId,
          positions,
          "position",
        );
      }
    }
    checkGrounding(`disagreements.${index}.grounding`, item.grounding);
  }

  for (const [index, crux] of report.cruxes.entries()) {
    for (const positionId of crux.affectedPositionIds) {
      addMissing(
        issues,
        `cruxes.${index}.affectedPositionIds`,
        positionId,
        positions,
        "position",
      );
    }
  }

  for (const [index, path] of report.resolutionPaths.entries()) {
    for (const disagreementId of path.disagreementIds) {
      addMissing(
        issues,
        `resolutionPaths.${index}.disagreementIds`,
        disagreementId,
        disagreements,
        "disagreement",
      );
    }
  }

  if (report.share.metrics.positionCount !== report.positions.length) {
    issues.push({
      path: "share.metrics.positionCount",
      message: "Share metrics must match report counts",
    });
  }
  if (report.share.metrics.commonGroundCount !== report.commonGround.length) {
    issues.push({
      path: "share.metrics.commonGroundCount",
      message: "Share metrics must match report counts",
    });
  }
  if (report.share.metrics.disagreementCount !== report.disagreements.length) {
    issues.push({
      path: "share.metrics.disagreementCount",
      message: "Share metrics must match report counts",
    });
  }
  if (report.share.metrics.cruxCount !== report.cruxes.length) {
    issues.push({
      path: "share.metrics.cruxCount",
      message: "Share metrics must match report counts",
    });
  }

  return issues;
}

export function parseRawDisagreementExtraction(input: unknown) {
  const parsed = RawDisagreementExtractionSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error };
  }
  const issues = collectRawExtractionReferenceIssues(parsed.data);
  if (issues.length > 0) {
    return { success: false as const, issues };
  }
  return { success: true as const, data: parsed.data };
}

export function parseDisagreementReport(input: unknown) {
  const parsed = DisagreementReportSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error };
  }
  const issues = collectReportReferenceIssues(parsed.data);
  if (issues.length > 0) {
    return { success: false as const, issues };
  }
  return { success: true as const, data: parsed.data };
}

export type RawDisagreementExtractionParsed = z.infer<
  typeof RawDisagreementExtractionSchema
>;
export type DisagreementReportParsed = z.infer<typeof DisagreementReportSchema>;
