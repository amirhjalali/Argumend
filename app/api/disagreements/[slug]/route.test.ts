import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { hashOpaque } from "@/lib/disagreement/publication";

const mocks = vi.hoisted(() => ({ configured: vi.fn(), getReport: vi.fn(), deleteReport: vi.fn() }));
vi.mock("@/lib/db", () => ({ isDatabaseConfigured: mocks.configured }));
vi.mock("@/lib/db/queries", () => ({
  getDisagreementReportBySlug: mocks.getReport,
  softDeleteDisagreementReport: mocks.deleteReport,
}));

import { DELETE } from "./route";

const TOKEN = "a-private-management-token";
const context = { params: Promise.resolve({ slug: "a-report" }) };

function request(authorization: string | null = `Bearer ${TOKEN}`) {
  return new NextRequest("http://localhost/api/disagreements/a-report", {
    method: "DELETE",
    headers: {
      "x-request-id": "delete-request",
      ...(authorization === null ? {} : { authorization }),
    },
  });
}

describe("DELETE /api/disagreements/[slug]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.configured.mockReturnValue(true);
    mocks.getReport.mockResolvedValue({
      id: "report-1",
      visibility: "unlisted",
      manageTokenHash: hashOpaque(TOKEN),
    });
    mocks.deleteReport.mockResolvedValue({ id: "report-1" });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deletes only after verifying the stored management token hash", async () => {
    const response = await DELETE(request(), context);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(mocks.getReport).toHaveBeenCalledWith("a-report");
    expect(mocks.deleteReport).toHaveBeenCalledWith("a-report");
    expect(JSON.stringify(mocks.deleteReport.mock.calls)).not.toContain(TOKEN);
  });

  it.each([null, "", "Basic credentials", "Bearer "])("refuses a missing management token (%s)", async (authorization) => {
    const response = await DELETE(request(authorization), context);
    expect(response.status).toBe(401);
    expect(mocks.getReport).not.toHaveBeenCalled();
    expect(mocks.deleteReport).not.toHaveBeenCalled();
  });

  it("makes wrong-token and missing-report responses indistinguishable", async () => {
    const wrongToken = await DELETE(request("Bearer another-token"), context);
    mocks.getReport.mockResolvedValueOnce(undefined);
    const missing = await DELETE(request(), context);

    expect(wrongToken.status).toBe(404);
    expect(missing.status).toBe(404);
    expect(await wrongToken.json()).toEqual(await missing.json());
    expect(mocks.deleteReport).not.toHaveBeenCalled();
  });

  it("refuses a report that was already deleted", async () => {
    mocks.getReport.mockResolvedValueOnce({ visibility: "deleted", manageTokenHash: hashOpaque(TOKEN) });
    const response = await DELETE(request(), context);
    expect(response.status).toBe(404);
    expect(mocks.deleteReport).not.toHaveBeenCalled();
  });

  it("does not access the database when persistence is unavailable", async () => {
    mocks.configured.mockReturnValueOnce(false);
    const response = await DELETE(request(), context);
    expect(response.status).toBe(404);
    expect(mocks.getReport).not.toHaveBeenCalled();
    expect(mocks.deleteReport).not.toHaveBeenCalled();
  });

  it("does not acknowledge a failed deletion", async () => {
    mocks.deleteReport.mockRejectedValueOnce(new Error("Database unavailable"));
    const response = await DELETE(request(), context);
    expect(response.status).toBe(500);
    expect(await response.json()).toMatchObject({ code: "INTERNAL_ERROR" });
  });

  it("does not attempt a deletion if the report lookup fails", async () => {
    mocks.getReport.mockRejectedValueOnce(new Error("Database unavailable"));
    const response = await DELETE(request(), context);
    expect(response.status).toBe(500);
    expect(mocks.deleteReport).not.toHaveBeenCalled();
  });
});
