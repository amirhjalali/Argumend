import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import type { DisagreementReportV1 } from "@/types/disagreement";

const mocks = vi.hoisted(() => ({ configured: vi.fn(), getReport: vi.fn() }));
vi.mock("@/lib/db", () => ({ isDatabaseConfigured: mocks.configured }));
vi.mock("@/lib/db/queries", () => ({ getPublishedDisagreementReport: mocks.getReport }));
vi.mock("next/og", () => ({
  ImageResponse: class extends Response {
    constructor(_element: unknown, options?: ResponseInit) {
      super("report-image", options);
    }
  },
}));

import Image from "./opengraph-image";

const context = { params: Promise.resolve({ slug: "valid-report" }) };
let report: DisagreementReportV1;

describe("published disagreement social image privacy", () => {
  beforeAll(async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    const bundle = await analyzeDisagreement({
      content: example.source,
      requestId: "social-image-fixture",
      provider: new FakeDisagreementProvider(example.extraction),
    });
    report = bundle.report;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.configured.mockReturnValue(true);
    mocks.getReport.mockReset().mockResolvedValue({ report });
  });

  it("prevents shared caches from continuing to serve an image after report deletion", async () => {
    const published = await Image(context);
    expect(published.status).toBe(200);
    expect(published.headers.get("Cache-Control")).toBe("no-store");

    mocks.getReport.mockResolvedValueOnce(undefined);
    const deleted = await Image(context);
    expect(deleted.status).toBe(404);
    expect(deleted.headers.get("Cache-Control")).toBe("no-store");
    expect(mocks.getReport).toHaveBeenCalledTimes(2);
  });

  it.each(["", "short", "a".repeat(13), "invalid/slug", "invalid slug"])("rejects malformed slug %j before reading reports", async (slug) => {
    const response = await Image({ params: Promise.resolve({ slug }) });
    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(mocks.getReport).not.toHaveBeenCalled();
  });

  it("does not cache missing reports", async () => {
    mocks.getReport.mockResolvedValueOnce(undefined);
    const response = await Image(context);
    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("does not cache an unconfigured publishing service", async () => {
    mocks.configured.mockReturnValueOnce(false);
    const response = await Image(context);
    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(mocks.getReport).not.toHaveBeenCalled();
  });

  it("fails closed without caching when the published report cannot be read", async () => {
    mocks.getReport.mockRejectedValueOnce(new Error("Database unavailable"));
    const response = await Image(context);
    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
