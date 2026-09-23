import { describe, expect, it } from "vitest";
import type { DisagreementReportV1 } from "@/types/disagreement";
import type { MapReplyMatch, MapReplyTurn } from "@/lib/mapReply/types";
import {
  GAP_UNKNOWN_ID,
  GapObservationSchema,
  contestedShareOf,
  gapFromDisagreementReport,
  gapFromMapReply,
  gapOf,
  type GapObservation,
} from "./record";

// ─── Type-level ratchet ─────────────────────────────────────────────────────
// Every field whose type admits an arbitrary string must be one of these ids.
// Adding a new string field fails `tsc` here until it is argued for.
type FreeStringKeys<T> = {
  [K in keyof T]-?: string extends NonNullable<T[K]>
    ? K
    : NonNullable<T[K]> extends readonly (infer E)[]
      ? string extends E
        ? K
        : never
      : never;
}[keyof T];
type AllowedIdKeys = "topicId" | "modelId" | "promptVersion" | "observedOn" | "cruxClaimIds";
type Exact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
const onlyIdStrings: Exact<FreeStringKeys<GapObservation>, AllowedIdKeys> = true;

const PROSE = "Rent control hurts renters, says Gary.";

const valid: GapObservation = {
  lane: "map-reply",
  topicId: "rent-control-effectiveness",
  propositionCount: 3,
  talkingPastCount: 1,
  definitionalCount: 1,
  undisputedCount: 0,
  contestedCount: 1,
  unmatchedCount: 2,
  speakerCount: 2,
  cruxTouchedCount: 1,
  cruxClaimIds: ["supply-timeline-test"],
  confidenceBucket: "high",
  modelId: "jev-1.13.0",
  promptVersion: "map-reply-v1.0.0",
  observedOn: "2026-09-22",
};

describe("GapObservationSchema: no free text can be stored", () => {
  it("has only id-shaped string fields (type-level)", () => {
    expect(onlyIdStrings).toBe(true);
  });

  it("accepts a well-formed counts-only record", () => {
    expect(GapObservationSchema.parse(valid)).toEqual(valid);
  });

  it("rejects prose in every field", () => {
    for (const key of Object.keys(valid) as (keyof GapObservation)[]) {
      const value = key === "cruxClaimIds" ? [PROSE] : PROSE;
      expect(GapObservationSchema.safeParse({ ...valid, [key]: value }).success, key).toBe(false);
    }
  });

  it("rejects a single word that is not slug-shaped, and overlong ids", () => {
    expect(GapObservationSchema.safeParse({ ...valid, topicId: "Rent" }).success).toBe(false);
    expect(GapObservationSchema.safeParse({ ...valid, modelId: "a".repeat(65) }).success).toBe(false);
    expect(GapObservationSchema.safeParse({ ...valid, cruxClaimIds: ["x".repeat(81)] }).success).toBe(false);
  });

  it("rejects any extra key, so a paste cannot ride along", () => {
    expect(GapObservationSchema.safeParse({ ...valid, text: "hello" }).success).toBe(false);
    expect(GapObservationSchema.safeParse({ ...valid, speakers: ["gary"] }).success).toBe(false);
  });

  it("rejects labels that do not partition the propositions", () => {
    expect(GapObservationSchema.safeParse({ ...valid, contestedCount: 5 }).success).toBe(false);
  });
});

function turn(overrides: Partial<MapReplyTurn>): MapReplyTurn {
  return {
    index: 0,
    speaker: "gary_1962",
    text: PROSE,
    wordCount: 6,
    section: "supply",
    sectionTitle: "Supply",
    sectionConfidence: 0.9,
    sectionProbabilities: {},
    placement: "confident",
    stance: "for",
    stanceConfidence: 0.8,
    stanceProbabilities: {},
    fallacy: 0,
    factual: 0.5,
    notAnArgument: false,
    ...overrides,
  };
}

function match(overrides: Partial<MapReplyMatch> = {}): MapReplyMatch {
  return {
    ok: true,
    topic: { id: "rent-control-effectiveness", title: "T", metaClaim: "M", path: "/p", url: "https://x" },
    thread: {
      turnCount: 5,
      substantiveCount: 5,
      unprobedCount: 0,
      wordCount: 100,
      characterCount: 600,
      hasSpeakerLabels: true,
      speakers: ["gary_1962", "ann"],
      truncated: false,
    },
    thresholds: { topicConfidence: 0.5, sectionConfidence: 0.7, fallacy: 0.5, factual: 0.5, threadSignal: 0.5, cruxTouched: 0.5 },
    candidates: [],
    topicChoice: { choice: "rent-control-effectiveness", confidence: 0.9, probabilities: {}, threshold: 0.5 },
    sectionCounts: [],
    dominantSection: {
      id: "supply",
      title: "Supply",
      summary: "S",
      count: 3,
      tentative: false,
      cruxId: "supply-timeline-test",
      cruxTitle: "C",
      cruxDescription: "D",
    },
    turns: [
      turn({ index: 0, sectionConfidence: 0.75 }),
      turn({ index: 1, sectionConfidence: 0.8 }),
      turn({ index: 2, section: "equity" }),
      turn({ index: 3, placement: "tentative" }),
      turn({ index: 4, placement: "confident", notAnArgument: true }),
    ],
    unplacedCount: 1,
    notArguing: [],
    notArguingInProbedTurns: [],
    pattern: { pattern: "forecast-split", label: "Forecast split", confidence: 0.6, probabilities: {} },
    signals: { empiricalLever: 0.6, valueResidual: 0.2, talkingPast: 0.3, definitional: 0.1, threshold: 0.5 },
    cruxes: [
      { pillarId: "p", pillarTitle: "P", cruxId: "supply-timeline-test", cruxTitle: "C", cruxDescription: "D", touched: 0.8, touchedThreshold: 0.5, isDominantSection: true },
      { pillarId: "p", pillarTitle: "P", cruxId: "equity-test", cruxTitle: "C", cruxDescription: "D", touched: 0.2, touchedThreshold: 0.5, isDominantSection: false },
    ],
    evidence: [],
    markdown: PROSE,
    execution: {
      version: "map-reply-v1.0.0",
      lane: "fake",
      redactions: { emails: 0, urls: 0, phones: 0, handles: 0 } as never,
      model: "jev-1.13.0",
      requests: 1,
      retries: 0,
      usage: { inputTokens: 1, outputTokens: 1 },
      timings: { parseMs: 0, prefilterMs: 0, topicMs: 0, turnsMs: 0, threadMs: 0, cruxMs: 0, totalMs: 0 },
    },
    ...overrides,
  };
}

const NOW = new Date("2026-09-22T13:45:00Z");

describe("gapFromMapReply", () => {
  it("splits probed turns into talking-past, contested and unmatched", () => {
    const record = gapFromMapReply(match(), NOW)!;
    expect(record).toMatchObject({
      lane: "map-reply",
      topicId: "rent-control-effectiveness",
      propositionCount: 3,
      talkingPastCount: 1,
      definitionalCount: 0,
      undisputedCount: 0,
      contestedCount: 2,
      unmatchedCount: 2,
      speakerCount: 2,
      cruxTouchedCount: 1,
      cruxClaimIds: ["supply-timeline-test"],
      confidenceBucket: "medium",
      observedOn: "2026-09-22",
    });
    expect(GapObservationSchema.safeParse(record).success).toBe(true);
    expect(gapOf(record)).toBeCloseTo(1 / 3);
    expect(contestedShareOf(record)).toBeCloseTo(2 / 3);
  });

  it("labels dominant-section turns definitional when the definitional signal clears", () => {
    const record = gapFromMapReply(
      match({ signals: { empiricalLever: 0, valueResidual: 0, talkingPast: 0, definitional: 0.7, threshold: 0.5 } }),
      NOW,
    )!;
    expect(record.definitionalCount).toBe(2);
    expect(record.contestedCount).toBe(0);
  });

  it("buckets a tentative or missing dominant section", () => {
    const base = match();
    expect(gapFromMapReply(match({ dominantSection: { ...base.dominantSection!, tentative: true } }), NOW)!.confidenceBucket).toBe("tentative");
    const none = gapFromMapReply(match({ dominantSection: null }), NOW)!;
    expect(none.confidenceBucket).toBe("none");
    expect(none.talkingPastCount).toBe(3);
  });

  it("never carries speaker names, turn text or markdown", () => {
    const serialized = JSON.stringify(gapFromMapReply(match(), NOW));
    expect(serialized).not.toContain("gary");
    expect(serialized).not.toContain("Rent control");
  });

  it("drops a model id that is not id-shaped instead of storing it", () => {
    const base = match();
    const record = gapFromMapReply(match({ execution: { ...base.execution, model: "my model v2" } }), NOW)!;
    expect(record.modelId).toBe(GAP_UNKNOWN_ID);
  });

  it("drops hostile ids and still produces a record the schema accepts", () => {
    const base = match();
    const hostile = ["Rent control", "rent‐control", "rënt-control", "rent-control ", "a".repeat(81), "rent--control", ""];
    for (const id of hostile) {
      const record = gapFromMapReply(
        match({
          topic: { ...base.topic, id },
          cruxes: base.cruxes.map((crux) => ({ ...crux, cruxId: id })),
          execution: { ...base.execution, model: `${id} x`, version: "v1\nGary" },
          // A speaker named like a real id must not leak through anywhere.
          thread: { ...base.thread, speakers: ["supply-timeline-test", "equity-test"] },
        }),
        NOW,
      )!;
      expect(record.topicId, JSON.stringify(id)).toBeNull();
      expect(record.cruxClaimIds).toEqual([]);
      expect(record.modelId).toBe(GAP_UNKNOWN_ID);
      expect(record.promptVersion).toBe(GAP_UNKNOWN_ID);
      expect(record.speakerCount).toBe(2);
      expect(GapObservationSchema.safeParse(record).success).toBe(true);
    }
  });

  it("logs nothing for a no-match result", () => {
    const base = match();
    expect(
      gapFromMapReply(
        {
          ok: false,
          reason: "low_confidence",
          message: "m",
          thread: base.thread,
          thresholds: base.thresholds,
          candidates: [],
          topicChoice: null,
          markdown: "",
          execution: base.execution,
        },
        NOW,
      ),
    ).toBeNull();
  });
});

describe("gapFromDisagreementReport", () => {
  function report(overrides: Partial<DisagreementReportV1> = {}): DisagreementReportV1 {
    const disagreement = (type: DisagreementReportV1["disagreements"][number]["type"]) =>
      ({ id: `d-${type}`, question: PROSE, type }) as DisagreementReportV1["disagreements"][number];
    return {
      diagnosis: { confidence: "medium" },
      participants: [{ id: "a", label: "Gary", kind: "named" }, { id: "b", label: "Ann", kind: "named" }],
      commonGround: [{ id: "g1", statement: PROSE }, { id: "g2", statement: PROSE }],
      disagreements: [disagreement("definitional"), disagreement("empirical")],
      cruxes: [{ id: "c1", claimId: "wages-fall", question: PROSE }],
      provenance: { model: "claude-opus-4", promptVersion: "1.2.0" },
      ...overrides,
    } as unknown as DisagreementReportV1;
  }

  it("counts common ground as undisputed and splits disagreements by type", () => {
    const record = gapFromDisagreementReport(report(), NOW);
    expect(record).toMatchObject({
      lane: "analyze-v2",
      topicId: null,
      propositionCount: 4,
      talkingPastCount: 0,
      definitionalCount: 1,
      undisputedCount: 2,
      contestedCount: 1,
      unmatchedCount: 0,
      speakerCount: 2,
      cruxTouchedCount: 1,
      cruxClaimIds: [],
      confidenceBucket: "medium",
      modelId: "claude-opus-4",
      promptVersion: "1.2.0",
    });
    expect(GapObservationSchema.safeParse(record).success).toBe(true);
    expect(gapOf(record)).toBeCloseTo(3 / 4);
    expect(JSON.stringify(record)).not.toContain("Gary");
  });

  it("buckets a report with no disagreement and no crux as none", () => {
    expect(gapFromDisagreementReport(report({ disagreements: [], cruxes: [] }), NOW).confidenceBucket).toBe("none");
  });

});
