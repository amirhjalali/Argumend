/**
 * Strict request schemas for the study API (docs/plans/2026-11-03-study-plan.md).
 *
 * NO FREE TEXT. Every field is an enum, a bounded integer, a fixed-length
 * array of bounded integers, or a Prolific id (24 hex characters). Objects are
 * `.strict()`, so an unknown key (a comment box, a user agent, an IP) is
 * refused rather than carried along. The raw Prolific participant id is
 * accepted only so the server can hash it; it is never stored.
 */
import { z } from "zod";
import { cruxOptionIds } from "@/data/study/instruments";
import {
  AGREE_MAX,
  AGREE_MIN,
  ATTITUDE_MAX,
  ATTITUDE_MIN,
  CHARITY_ITEM_COUNT,
  DEVICES,
  GAP_STATEMENT_COUNT,
  PARTY_STRENGTHS,
  PRIOR_EXPOSURE,
  STUDY_ARMS,
  STUDY_PARTIES,
  STUDY_TOPICS,
  STUDY_VERSION,
} from "./constants";

/** Prolific participant, study and session ids are 24 lowercase hex characters. */
export const PROLIFIC_ID_PATTERN = /^[a-f0-9]{24}$/;
export const prolificId = z.string().regex(PROLIFIC_ID_PATTERN);

const int = (min: number, max: number) => z.number().int().min(min).max(max);

export const StudyMeasuresSchema = z
  .object({
    /** How far apart Democrats and Republicans are on the question, 0–10. */
    perceived: int(0, 10),
    /** Own position on the map's question, 1 definitely no … 6 definitely yes. */
    attitude: int(ATTITUDE_MIN, ATTITUDE_MAX),
    /** Own agreement with each statement, 1–4. */
    ownAgree: z.array(int(AGREE_MIN, AGREE_MAX)).length(GAP_STATEMENT_COUNT),
    /** Estimated % of the other party's participants who agree with each statement. */
    otherEstimate: z.array(int(0, 100)).length(GAP_STATEMENT_COUNT),
    /** Reasonable, informed, good faith: the other party on this question, 0–10. */
    charity: z.array(int(0, 10)).length(CHARITY_ITEM_COUNT),
  })
  .strict();
export type StudyMeasures = z.infer<typeof StudyMeasuresSchema>;

export const StudyAssignRequestSchema = z
  .object({
    version: z.literal(STUDY_VERSION),
    prolificPid: prolificId,
    prolificStudyId: prolificId,
    /** "neither" screens the participant out before anything is stored. */
    party: z.enum([...STUDY_PARTIES, "neither"]),
  })
  .strict();
export type StudyAssignRequest = z.infer<typeof StudyAssignRequestSchema>;

export const StudyResponseSchema = z
  .object({
    version: z.literal(STUDY_VERSION),
    prolificPid: prolificId,
    prolificStudyId: prolificId,
    party: z.enum(STUDY_PARTIES),
    partyStrength: z.enum(PARTY_STRENGTHS),
    topic: z.enum(STUDY_TOPICS),
    arm: z.enum(STUDY_ARMS),
    pre: StudyMeasuresSchema,
    post: StudyMeasuresSchema,
    /** Id of the chosen crux option (data/study/instruments.ts), checked against the topic below. */
    cruxChoice: z.string().min(1).max(40).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    /** The instructed-response item's answer on the 1–4 agreement scale. */
    attention: int(AGREE_MIN, AGREE_MAX),
    /** How fair to both sides the reading was, 0–10. */
    fairness: int(0, 10),
    /** How much the participant learned, 0–10. */
    learned: int(0, 10),
    priorExposure: z.enum(PRIOR_EXPOSURE),
    /** Seconds the reading screen was visible. */
    stimulusSeconds: int(0, 7200),
    /** Seconds from consent to submit. */
    totalSeconds: int(0, 14_400),
    /** Disclosures opened on the reading screen (arm a only; 0 elsewhere). */
    stimulusOpened: int(0, 500),
    device: z.enum(DEVICES),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (!cruxOptionIds(value.topic).includes(value.cruxChoice)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cruxChoice"],
        message: "not an option for this topic",
      });
    }
    if (value.stimulusSeconds > value.totalSeconds) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["stimulusSeconds"],
        message: "reading time cannot exceed total time",
      });
    }
  });
export type StudyResponse = z.infer<typeof StudyResponseSchema>;
