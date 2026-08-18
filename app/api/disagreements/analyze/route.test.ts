import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";

vi.mock("@/lib/disagreement/model", async () => {
  const actual = await vi.importActual<typeof import("@/lib/disagreement/model")>(
    "@/lib/disagreement/model",
  );
  return {
    ...actual,
    createDisagreementProvider: () =>
      new actual.FakeDisagreementProvider(DISAGREEMENT_FEW_SHOT_EXAMPLES[1].extraction),
    isDisagreementV2Enabled: () => process.env.ENABLE_DISAGREEMENT_V2 === "true",
    isDisagreementPublishingEnabled: () => false,
  };
});

import { POST } from "./route";

function post(body: unknown, ip = `test-${Math.random()}`) {
  return new NextRequest(new URL("http://localhost/api/disagreements/analyze"), {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/disagreements/analyze", () => {
  beforeEach(() => {
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "true");
    vi.stubEnv("ARGUMEND_DISAGREEMENT_PROVIDER", "fake");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns FEATURE_DISABLED when the flag is off", async () => {
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "false");
    const response = await POST(post({ content: "x".repeat(200) }));
    expect(response.status).toBe(404);
    expect((await response.json()).code).toBe("FEATURE_DISABLED");
  });

  it("returns CONTENT_TOO_SHORT", async () => {
    const response = await POST(post({ content: "too short" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("CONTENT_TOO_SHORT");
  });

  it("returns URL_INGESTION_NOT_AVAILABLE", async () => {
    const response = await POST(post({ content: "https://x.com/someone/status/1" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("URL_INGESTION_NOT_AVAILABLE");
  });

  it("returns a diagnosis without a winner field", async () => {
    const source = `${DISAGREEMENT_FEW_SHOT_EXAMPLES[1].source}\n\n${"Context for length. ".repeat(8)}`;
    const response = await POST(post({ content: source, contentType: "conversation" }));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.report.sourceMode).toBe("source-only");
    expect(data.report.winner).toBeUndefined();
    expect(data.execution.mode).toBe("live");
  });
});
