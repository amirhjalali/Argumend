import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  isDatabaseConfigured: vi.fn(),
  getPublishedDisagreementReport: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ isDatabaseConfigured: mocks.isDatabaseConfigured }));
vi.mock("@/lib/db/queries", () => ({ getPublishedDisagreementReport: mocks.getPublishedDisagreementReport }));
vi.mock("next/navigation", () => ({
  notFound: () => { throw new Error("NOT_FOUND"); },
}));
vi.mock("@/components/AppShell", () => ({ AppShell: () => null }));

import PublicDisagreementPage, { generateMetadata } from "./page";

describe("published report load failures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.isDatabaseConfigured.mockReturnValue(true);
  });

  afterEach(() => vi.restoreAllMocks());

  it("keeps database credentials and private bound values out of page and metadata logs", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    mocks.getPublishedDisagreementReport.mockRejectedValue(new Error(
      "Failed query on postgres://fixture-user:fixture-password@db.invalid/fixture\nparams: private-first-line\nprivate-second-line",
    ));
    const props = { params: Promise.resolve({ slug: "private-report-slug" }) };

    await expect(PublicDisagreementPage(props)).rejects.toThrow("NOT_FOUND");
    expect(await generateMetadata(props)).toEqual({
      title: "Report not found",
      robots: { index: false, follow: false },
    });

    expect(log).toHaveBeenCalledTimes(2);
    const logged = JSON.stringify(log.mock.calls);
    expect(logged).toContain("[redacted database URL]");
    expect(logged).toContain("[redacted]");
    expect(logged).not.toMatch(/fixture-user|fixture-password|private-first-line|private-second-line|private-report-slug/);
  });
});
