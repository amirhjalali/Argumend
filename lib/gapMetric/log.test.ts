import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logGapObservation } from "./log";
import type { GapObservation } from "./record";

const mocks = vi.hoisted(() => ({ insert: vi.fn(), values: vi.fn() }));
vi.mock("@/lib/db", () => ({
  isDatabaseConfigured: () => true,
  getDb: () => ({ insert: mocks.insert }),
}));
vi.mock("@/lib/db/schema", () => ({ gapObservations: {} }));

const RECORD: GapObservation = {
  lane: "analyze-v2",
  topicId: null,
  propositionCount: 1,
  talkingPastCount: 0,
  definitionalCount: 0,
  undisputedCount: 0,
  contestedCount: 1,
  unmatchedCount: 0,
  speakerCount: 2,
  cruxTouchedCount: 1,
  cruxClaimIds: [],
  confidenceBucket: "medium",
  modelId: "test-model",
  promptVersion: "v1",
  observedOn: "2026-10-22",
};

describe("gap metric cancellation", () => {
  beforeEach(() => {
    vi.stubEnv("ENABLE_GAP_METRIC_LOGGING", "true");
    mocks.values.mockReset().mockResolvedValue(undefined);
    mocks.insert.mockReset().mockReturnValue({ values: mocks.values });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("still records a completed analysis", async () => {
    await logGapObservation(() => RECORD, new AbortController().signal);
    expect(mocks.values).toHaveBeenCalledWith(RECORD);
  });

  it("does not derive or insert a metric for an already-aborted request", async () => {
    const controller = new AbortController();
    controller.abort();
    const derive = vi.fn(() => RECORD);

    await logGapObservation(derive, controller.signal);

    expect(derive).not.toHaveBeenCalled();
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("does not start an insert when cancellation happens during lazy database loading", async () => {
    const controller = new AbortController();
    const logging = logGapObservation(() => RECORD, controller.signal);
    controller.abort();

    await logging;

    expect(mocks.insert).not.toHaveBeenCalled();
  });
});
