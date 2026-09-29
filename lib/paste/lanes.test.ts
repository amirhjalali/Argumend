import { describe, expect, it } from "vitest";
import { resolveDiagnosisLane, resolvePasteLanes } from "./lanes";

describe("resolvePasteLanes", () => {
  it("runs only the offline map lane with every flag off (production today)", () => {
    expect(resolvePasteLanes({})).toEqual({ maps: true, diagnosis: { enabled: false } });
  });

  it("keeps the diagnosis off when the flag is on but no provider can run", () => {
    expect(resolveDiagnosisLane({ ENABLE_DISAGREEMENT_V2: "true" })).toEqual({ enabled: false });
    expect(
      resolveDiagnosisLane({ ENABLE_DISAGREEMENT_V2: "true", ARGUMEND_DISAGREEMENT_MODEL: "m" }),
    ).toEqual({ enabled: false });
  });

  it("names Anthropic when the hosted lane is configured", () => {
    expect(
      resolveDiagnosisLane({
        ENABLE_DISAGREEMENT_V2: "true",
        ARGUMEND_DISAGREEMENT_MODEL: "m",
        ANTHROPIC_API_KEY: "k",
      }),
    ).toEqual({ enabled: true, providerIds: ["anthropic"], fixtures: false });
  });

  it("sends nothing anywhere on the fixture lane", () => {
    expect(
      resolveDiagnosisLane({ ENABLE_DISAGREEMENT_V2: "true", ARGUMEND_DISAGREEMENT_PROVIDER: "fake" }),
    ).toEqual({ enabled: true, providerIds: [], fixtures: true });
  });

  it("never offers the local CLI lane in production", () => {
    expect(
      resolveDiagnosisLane({
        ENABLE_DISAGREEMENT_V2: "true",
        ARGUMEND_DISAGREEMENT_PROVIDER: "cli",
        NODE_ENV: "production",
      }),
    ).toEqual({ enabled: false });
    expect(
      resolveDiagnosisLane({
        ENABLE_DISAGREEMENT_V2: "true",
        ARGUMEND_DISAGREEMENT_PROVIDER: "cli",
        ARGUMEND_DISAGREEMENT_CLI: "codex",
        NODE_ENV: "development",
      }),
    ).toEqual({ enabled: true, providerIds: ["openai"], fixtures: false });
  });
});
