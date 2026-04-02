import { describe, expect, it } from "vitest";
import { extractArgumentsOffline } from "./offline";

const SAMPLE_CONTENT = `The debate over nuclear energy has intensified. Proponents argue that nuclear is essential for climate goals because it produces low-carbon baseload power. France gets much of its electricity from nuclear and has lower power-sector emissions.

Critics counter that nuclear plants are expensive and slow to build. The Vogtle expansion exceeded early cost estimates, while solar and wind became cheaper. Supporters respond that newer reactor designs could reduce deployment costs and timelines.`;

describe("extractArgumentsOffline", () => {
  it("returns structured extraction output with both sides", () => {
    const result = extractArgumentsOffline(SAMPLE_CONTENT, "article");

    expect(result.topic.length).toBeGreaterThan(10);
    expect(result.positions.length).toBeGreaterThanOrEqual(2);
    expect(result.positions.some((position) => position.side === "for")).toBe(true);
    expect(result.positions.some((position) => position.side === "against")).toBe(true);
    expect(result.summary.length).toBeGreaterThan(20);
    expect(result.confidence).toBeGreaterThan(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });

  it("is deterministic for identical input", () => {
    const a = extractArgumentsOffline(SAMPLE_CONTENT, "freeform");
    const b = extractArgumentsOffline(SAMPLE_CONTENT, "freeform");
    expect(a).toStrictEqual(b);
  });
});
