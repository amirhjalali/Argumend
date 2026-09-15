/**
 * Zod schema, loader, and date helpers for per-map review manifests.
 *
 * Manifests live at data/topics/drafts/<topicId>.manifest.json and are read
 * from disk by convention, so "every registered map has a manifest" is a real
 * file-existence check rather than a static import that would fail at compile
 * time. This module is server/script-only: it uses node:fs and must not be
 * imported from client discovery surfaces (see lib/argument/topicIds.ts for the
 * bundle boundary).
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type {
  ArgumentReviewManifest,
  IsoDate,
  ReviewCadence,
} from "@/types/argumentReview";

export interface ReviewCadenceSpec {
  headlineCheckDays: number;
  fullReviewDays: number;
  /** Where the interval comes from, so the number never travels without it. */
  basis: string;
}

/**
 * Cadences from the north-star "Ongoing-war and fast-moving-topic gate":
 * ongoing war or live legal regime — headline facts every 7 days, full map
 * every 30; fast-moving AI/economic statistics — 30-day headline review,
 * 90-day full-map review.
 */
export const REVIEW_CADENCES: Record<ReviewCadence, ReviewCadenceSpec> = {
  "ongoing-war": {
    headlineCheckDays: 7,
    fullReviewDays: 30,
    basis:
      "north-star gate 3: ongoing war or live legal regime — re-check headline facts and governing authorities at least every seven days; re-review the full map at least every thirty days",
  },
  "fast-moving-statistics": {
    headlineCheckDays: 30,
    fullReviewDays: 90,
    basis:
      "north-star gate 3: fast-moving AI/economic statistics — thirty-day headline review and ninety-day full-map review",
  },
};

export const MANIFEST_DIR = path.join("data", "topics", "drafts");
const TOPIC_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isIsoDate(value: string): boolean {
  const match = ISO_DATE_PATTERN.exec(value);
  if (match === null) return false;
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return date.toISOString().slice(0, 10) === value;
}

export function addDays(date: IsoDate, days: number): IsoDate {
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
}

/** Whole days from `from` to `to`; negative when `to` is earlier. */
export function daysBetween(from: IsoDate, to: IsoDate): number {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  return Math.round((end - start) / 86_400_000);
}

const IsoDateSchema = z
  .string()
  .regex(ISO_DATE_PATTERN, "must be an ISO calendar date (YYYY-MM-DD)")
  .refine(isIsoDate, "must be a real calendar date");

const NonEmptyStringSchema = z.string().trim().min(1);

const FastMovingNodeSchema = z
  .object({
    id: NonEmptyStringSchema,
    why: NonEmptyStringSchema,
  })
  .strict();

const CorrectionLogEntrySchema = z
  .object({
    date: IsoDateSchema,
    origin: z.enum([
      "adversarial-review",
      "freshness-check",
      "source-audit",
      "reader-report",
      "editorial",
    ]),
    summary: NonEmptyStringSchema,
    factualChanges: z.array(NonEmptyStringSchema),
    topologyChanges: z.array(NonEmptyStringSchema),
    cruxOrderMoved: z.boolean(),
    nodeIds: z.array(NonEmptyStringSchema).optional(),
  })
  .strict();

export const ArgumentReviewManifestSchema = z
  .object({
    topicId: z.string().regex(TOPIC_ID_PATTERN, "topicId must be a lowercase slug"),
    manifestVersion: z.literal(1),
    owner: NonEmptyStringSchema,
    cadence: z.enum(["ongoing-war", "fast-moving-statistics"]),
    lastFullReview: IsoDateSchema,
    lastHeadlineCheck: IsoDateSchema,
    nextHeadlineCheckDue: IsoDateSchema,
    nextFullReviewDue: IsoDateSchema,
    fastMovingNodes: z.array(FastMovingNodeSchema),
    triggerEvents: z.array(NonEmptyStringSchema).min(1),
    correctionLog: z.array(CorrectionLogEntrySchema),
    notes: z.array(NonEmptyStringSchema).optional(),
  })
  .strict()
  .superRefine((manifest, ctx) => {
    const cadence = REVIEW_CADENCES[manifest.cadence];

    // Field-level date issues are already reported; Zod still runs this
    // refinement, so skip the arithmetic rather than compute on garbage.
    const datesValid = [
      manifest.lastFullReview,
      manifest.lastHeadlineCheck,
      manifest.nextHeadlineCheckDue,
      manifest.nextFullReviewDue,
    ].every(isIsoDate);

    if (datesValid && manifest.lastHeadlineCheck < manifest.lastFullReview) {
      ctx.addIssue({
        code: "custom",
        message: "lastHeadlineCheck cannot precede lastFullReview (a full review is also a headline check)",
        path: ["lastHeadlineCheck"],
      });
    }

    const latestHeadlineDue = datesValid
      ? addDays(manifest.lastHeadlineCheck, cadence.headlineCheckDays)
      : undefined;
    if (latestHeadlineDue !== undefined && manifest.nextHeadlineCheckDue > latestHeadlineDue) {
      ctx.addIssue({
        code: "custom",
        message: `nextHeadlineCheckDue must be no later than ${latestHeadlineDue} (lastHeadlineCheck + ${cadence.headlineCheckDays} days for cadence "${manifest.cadence}")`,
        path: ["nextHeadlineCheckDue"],
      });
    }

    const latestFullDue = datesValid
      ? addDays(manifest.lastFullReview, cadence.fullReviewDays)
      : undefined;
    if (latestFullDue !== undefined && manifest.nextFullReviewDue > latestFullDue) {
      ctx.addIssue({
        code: "custom",
        message: `nextFullReviewDue must be no later than ${latestFullDue} (lastFullReview + ${cadence.fullReviewDays} days for cadence "${manifest.cadence}")`,
        path: ["nextFullReviewDue"],
      });
    }

    const seenIds = new Set<string>();
    manifest.fastMovingNodes.forEach((node, index) => {
      if (seenIds.has(node.id)) {
        ctx.addIssue({
          code: "custom",
          message: `duplicate fast-moving node id "${node.id}"`,
          path: ["fastMovingNodes", index, "id"],
        });
      }
      seenIds.add(node.id);
    });

    let previousDate: string | undefined;
    manifest.correctionLog.forEach((entry, index) => {
      if (previousDate !== undefined && entry.date < previousDate) {
        ctx.addIssue({
          code: "custom",
          message: "correctionLog must be in chronological order",
          path: ["correctionLog", index, "date"],
        });
      }
      previousDate = entry.date;
    });
  });

export type ParseArgumentReviewManifestResult =
  | { ok: true; manifest: ArgumentReviewManifest }
  | { ok: false; errors: string[] };

export function parseArgumentReviewManifest(
  input: unknown
): ParseArgumentReviewManifestResult {
  const result = ArgumentReviewManifestSchema.safeParse(input);
  if (result.success) {
    return { ok: true, manifest: result.data };
  }
  return {
    ok: false,
    errors: result.error.issues.map((issue) => {
      const issuePath = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      return `${issuePath}${issue.message}`;
    }),
  };
}

export function reviewManifestPath(topicId: string, rootDir = process.cwd()): string {
  if (!TOPIC_ID_PATTERN.test(topicId)) {
    throw new Error(`Refusing to resolve a manifest path for non-slug topic id "${topicId}"`);
  }
  return path.resolve(rootDir, MANIFEST_DIR, `${topicId}.manifest.json`);
}

export type LoadArgumentReviewManifestResult =
  | { ok: true; manifest: ArgumentReviewManifest; path: string }
  | { ok: false; reason: "missing" | "unreadable" | "invalid"; path: string; errors: string[] };

/**
 * Loads and validates the manifest for a topic. Never throws for a missing or
 * malformed file; callers decide whether that is a hard error (the freshness
 * script does) or a soft one.
 */
export function loadArgumentReviewManifest(
  topicId: string,
  rootDir = process.cwd()
): LoadArgumentReviewManifestResult {
  const manifestPath = reviewManifestPath(topicId, rootDir);
  if (!existsSync(manifestPath)) {
    return { ok: false, reason: "missing", path: manifestPath, errors: ["manifest file not found"] };
  }

  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    return {
      ok: false,
      reason: "unreadable",
      path: manifestPath,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }

  const parsed = parseArgumentReviewManifest(raw);
  if (!parsed.ok) {
    return { ok: false, reason: "invalid", path: manifestPath, errors: parsed.errors };
  }
  if (parsed.manifest.topicId !== topicId) {
    return {
      ok: false,
      reason: "invalid",
      path: manifestPath,
      errors: [`manifest topicId "${parsed.manifest.topicId}" does not match file name "${topicId}"`],
    };
  }
  return { ok: true, manifest: parsed.manifest, path: manifestPath };
}
