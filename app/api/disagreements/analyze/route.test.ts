import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { createDisagreementProvider, FakeDisagreementProvider } from "@/lib/disagreement/model";
import { logGapObservation } from "@/lib/gapMetric/log";
import type { DisagreementExtractResult } from "@/lib/disagreement/model/provider";

vi.mock("@/lib/disagreement/model", async () => {
  const actual = await vi.importActual<typeof import("@/lib/disagreement/model")>(
    "@/lib/disagreement/model",
  );
  return {
    ...actual,
    createDisagreementProvider: vi.fn(),
    isDisagreementV2Enabled: () => process.env.ENABLE_DISAGREEMENT_V2 === "true",
    isDisagreementPublishingEnabled: () => false,
  };
});

vi.mock("@/lib/gapMetric/log", () => ({ logGapObservation: vi.fn().mockResolvedValue(undefined) }));

import { POST } from "./route";

function post(body: unknown, signal?: AbortSignal, ip = `test-${Math.random()}`) {
  return new NextRequest(new URL("http://localhost/api/disagreements/analyze"), {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
    signal,
  });
}

describe("POST /api/disagreements/analyze", () => {
  beforeEach(() => {
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "true");
    vi.stubEnv("ARGUMEND_DISAGREEMENT_PROVIDER", "fake");
    vi.mocked(createDisagreementProvider).mockReset().mockReturnValue(
      new FakeDisagreementProvider(DISAGREEMENT_FEW_SHOT_EXAMPLES[1].extraction),
    );
    vi.mocked(logGapObservation).mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("does not create a provider for an already-aborted request", async () => {
    const controller = new AbortController();
    controller.abort();

    const response = await POST(post({ content: "x".repeat(200) }, controller.signal));

    expect(response.status).toBe(499);
    expect((await response.json()).code).toBe("REQUEST_ABORTED");
    expect(createDisagreementProvider).not.toHaveBeenCalled();
    expect(logGapObservation).not.toHaveBeenCalled();
  });

  it.each(["reject", "resolve"] as const)(
    "cancels deferred extraction and skips metrics when it %ss",
    async (settlement) => {
      const controller = new AbortController();
      const fake = new FakeDisagreementProvider(DISAGREEMENT_FEW_SHOT_EXAMPLES[1].extraction);
      let started!: (signal: AbortSignal) => void;
      const providerStarted = new Promise<AbortSignal>((resolve) => { started = resolve; });
      let finish!: () => void;
      const extract = vi.fn((...args: Parameters<typeof fake.extract>) => {
        const signal = args[1]!.signal!;
        const reply = fake.extract(...args);
        started(signal);
        return new Promise<DisagreementExtractResult>((resolve, reject) => {
          finish = () => {
            if (settlement === "reject") reject(signal.reason);
            else resolve(reply);
          };
        });
      });
      vi.mocked(createDisagreementProvider).mockReturnValue({ extract });

      const responsePromise = POST(post({ content: "x".repeat(200) }, controller.signal));
      const providerSignal = await providerStarted;
      controller.abort(new Error("Client disconnected"));
      expect(providerSignal.aborted).toBe(true);
      finish();
      const response = await responsePromise;

      expect(response.status).toBe(499);
      expect((await response.json()).code).toBe("REQUEST_ABORTED");
      expect(extract).toHaveBeenCalledTimes(1);
      expect(logGapObservation).not.toHaveBeenCalled();
    },
  );

  it("preserves the 504 timeout contract when the server deadline expires", async () => {
    const deadline = new AbortController();
    vi.spyOn(AbortSignal, "timeout").mockReturnValue(deadline.signal);
    vi.mocked(createDisagreementProvider).mockReturnValue({
      extract: async () => {
        deadline.abort(new DOMException("Deadline exceeded", "TimeoutError"));
        throw deadline.signal.reason;
      },
    });

    const response = await POST(post({ content: "x".repeat(200) }));

    expect(response.status).toBe(504);
    expect((await response.json()).code).toBe("MODEL_TIMEOUT");
    expect(logGapObservation).not.toHaveBeenCalled();
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
