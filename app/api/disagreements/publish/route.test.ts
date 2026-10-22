import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { createPublicationToken, digestReportBundle, hashOpaque } from "@/lib/disagreement/publication";
import type { DisagreementAnalysisBundleV1 } from "@/types/disagreement";

const mocks = vi.hoisted(() => ({ enabled: vi.fn(), publish: vi.fn() }));
vi.mock("@/lib/disagreement/model", () => ({ isDisagreementPublishingEnabled: mocks.enabled }));
vi.mock("@/lib/db/queries", () => ({ publishDisagreementReport: mocks.publish }));

import { POST } from "./route";

const SECRET = "publication-test-secret";
let bundle: DisagreementAnalysisBundleV1;

function payload(extra: Record<string, unknown> = {}) {
  const digest = digestReportBundle(bundle.report, bundle.graph);
  return {
    report: bundle.report,
    graph: bundle.graph,
    publicationToken: createPublicationToken({ digest, secret: SECRET }).token,
    ...extra,
  };
}

function post(body: unknown, raw?: string) {
  return new NextRequest("http://localhost/api/disagreements/publish", {
    method: "POST",
    headers: { "content-type": "application/json", "x-request-id": "publish-request" },
    body: raw ?? JSON.stringify(body),
  });
}

function slugCollision() {
  return Object.assign(new Error("duplicate slug"), {
    code: "23505",
    constraint_name: "disagreement_reports_slug_idx",
  });
}

describe("POST /api/disagreements/publish", () => {
  beforeAll(async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    bundle = await analyzeDisagreement({
      content: example.source,
      requestId: "publication-fixture",
      provider: new FakeDisagreementProvider(example.extraction),
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("REPORT_PUBLICATION_SECRET", SECRET);
    mocks.enabled.mockReturnValue(true);
    mocks.publish.mockReset().mockResolvedValue({ id: "report-1" });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("publishes a signed bundle and stores only the management token hash", async () => {
    const response = await POST(post(payload()));
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.url).toBe(`/d/${result.slug}`);
    expect(result.slug).toMatch(/^[A-Za-z0-9_-]{12}$/);
    expect(result.manageToken).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(mocks.publish).toHaveBeenCalledOnce();
    expect(mocks.publish).toHaveBeenCalledWith(expect.objectContaining({
      slug: result.slug,
      report: bundle.report,
      graph: JSON.parse(JSON.stringify(bundle.graph)),
      reportDigest: digestReportBundle(bundle.report, bundle.graph),
      manageTokenHash: hashOpaque(result.manageToken),
    }));
    expect(JSON.stringify(mocks.publish.mock.calls)).not.toContain(result.manageToken);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("rejects an edited report even when the edited report is structurally valid", async () => {
    const body = payload();
    body.report = { ...bundle.report, title: "A different title" };
    const response = await POST(post(body));
    expect(response.status).toBe(401);
    expect(mocks.publish).not.toHaveBeenCalled();
  });

  it("rejects expired publication tokens", async () => {
    const token = createPublicationToken({
      digest: digestReportBundle(bundle.report, bundle.graph),
      secret: SECRET,
      now: 1,
    }).token;
    const response = await POST(post(payload({ publicationToken: token })));
    expect(response.status).toBe(401);
    expect(mocks.publish).not.toHaveBeenCalled();
  });

  it.each([{ report: {} }, { graph: {} }, { publicationToken: "not-a-token" }])(
    "rejects invalid publication fields before persistence: %j",
    async (fields) => {
      const response = await POST(post(payload(fields)));
      expect([400, 401]).toContain(response.status);
      expect(mocks.publish).not.toHaveBeenCalled();
    },
  );

  it("revalidates publication quality even for a signed bundle", async () => {
    const report = structuredClone(bundle.report);
    report.quality.groundingCoverage = 0;
    const token = createPublicationToken({ digest: digestReportBundle(report, bundle.graph), secret: SECRET }).token;
    const response = await POST(post(payload({ report, publicationToken: token })));
    expect(response.status).toBe(400);
    expect(mocks.publish).not.toHaveBeenCalled();
  });

  it.each([false, true])("retries a unique slug collision, wrapped by Drizzle: %s", async (wrapped) => {
    const collision = slugCollision();
    mocks.publish.mockRejectedValueOnce(wrapped ? new Error("Failed query", { cause: collision }) : collision);
    const response = await POST(post(payload()));
    expect(response.status).toBe(200);
    expect(mocks.publish).toHaveBeenCalledTimes(2);
    const [first, second] = mocks.publish.mock.calls.map(([input]) => input);
    expect(first.slug).not.toBe(second.slug);
    expect(first.manageTokenHash).toBe(second.manageTokenHash);
  });

  it.each([
    new Error("connection lost after commit"),
    Object.assign(new Error("other constraint"), { code: "23505", constraint_name: "another_unique_index" }),
    Object.assign(new Error("check violation"), { code: "23514", constraint_name: "disagreement_reports_slug_idx" }),
  ])("does not retry an unrelated or ambiguous database error: %s", async (error) => {
    mocks.publish.mockRejectedValue(error);
    const response = await POST(post(payload()));
    expect(response.status).toBe(500);
    expect(mocks.publish).toHaveBeenCalledOnce();
  });

  it("bounds repeated slug collisions at three insert attempts", async () => {
    mocks.publish.mockRejectedValue(slugCollision());
    const response = await POST(post(payload()));
    expect(response.status).toBe(500);
    expect(mocks.publish).toHaveBeenCalledTimes(3);
  });

  it("never logs report text included in database error messages", async () => {
    const privateText = "A private report sentence in SQL parameters";
    mocks.publish.mockRejectedValue(new Error(`Failed query: insert into reports; params: ${privateText}`));
    const response = await POST(post(payload()));
    expect(response.status).toBe(500);
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain(privateText);
    expect(JSON.stringify(await response.json())).not.toContain(privateText);
  });

  it("ignores extra source text and refuses executable source URLs", async () => {
    const privateText = "Do not store the full pasted source.";
    const response = await POST(post(payload({
      sourceText: privateText,
      source: { text: privateText, url: "javascript:alert(1)" },
    })));
    expect(response.status).toBe(200);
    expect(mocks.publish).toHaveBeenCalledWith(expect.objectContaining({ sourceUrl: null }));
    expect(JSON.stringify(mocks.publish.mock.calls)).not.toContain(privateText);
  });

  it("does not publish when the feature is disabled", async () => {
    mocks.enabled.mockReturnValueOnce(false);
    const response = await POST(post(payload()));
    expect(response.status).toBe(404);
    expect(mocks.publish).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(post({}, "{"));
    expect(response.status).toBe(400);
    expect(mocks.publish).not.toHaveBeenCalled();
  });
});
