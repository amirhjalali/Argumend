import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  isDatabaseConfigured: vi.fn(),
  listAnalyses: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  isDatabaseConfigured: mocks.isDatabaseConfigured,
}));

vi.mock("@/lib/db/queries", () => ({
  listAnalyses: mocks.listAnalyses,
}));

import AnalysesPage from "./page";

describe("AnalysesPage persistence boundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not probe persistence in the default offline mode", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(false);

    await expect(AnalysesPage()).resolves.toBeTruthy();

    expect(mocks.listAnalyses).not.toHaveBeenCalled();
  });

  it("loads the archive only when persistence is configured", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(true);
    mocks.listAnalyses.mockResolvedValue([]);

    await expect(AnalysesPage()).resolves.toBeTruthy();

    expect(mocks.listAnalyses).toHaveBeenCalledWith(50);
  });
});
