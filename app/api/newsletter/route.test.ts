import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const insert = vi.fn();
const values = vi.fn();
const onConflictDoNothing = vi.fn();

vi.mock("@/lib/db/index", () => ({
  getDb: vi.fn(() => ({ insert })),
}));

import { POST } from "./route";

function request(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `newsletter-test-${Math.random()}`,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    insert.mockReset();
    values.mockReset();
    onConflictDoNothing.mockReset();
    insert.mockReturnValue({ values });
    values.mockReturnValue({ onConflictDoNothing });
    onConflictDoNothing.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a service error instead of claiming an unavailable write succeeded", async () => {
    insert.mockImplementation(() => {
      throw new Error("Database is not available");
    });

    const response = await POST(request({ email: "reader@example.com", source: "footer" }));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.success).not.toBe(true);
    expect(body.error).toMatch(/temporarily unavailable/i);
    expect(console.warn).not.toHaveBeenCalledWith(expect.stringContaining("reader@example.com"));
  });

  it("keeps persistence credentials out of logs without changing the public error", async () => {
    insert.mockImplementation(() => {
      throw new Error(
        "connect postgresql://newsletter:super-secret@db.internal/app with Bearer eyJhbGciOiJIUzI1NiJ9.payload.signature",
      );
    });

    const response = await POST(
      request({ email: "reader@example.com", source: "footer" }),
    );
    const warning = vi.mocked(console.warn).mock.calls.flat().join(" ");

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      error: "Newsletter signup is temporarily unavailable. Please try again later.",
    });
    expect(warning).toContain("[redacted database URL]");
    expect(warning).toContain("Bearer [redacted]");
    expect(warning).not.toMatch(/newsletter:super-secret|eyJhbGci|db\.internal/);
  });

  it("normalizes and durably stores a valid subscription with its source", async () => {
    const response = await POST(request({
      email: "  Reader@Example.com ",
      source: "topic-read",
    }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(values).toHaveBeenCalledWith({
      email: "reader@example.com",
      source: "topic-read",
    });
  });

  it("rejects malformed email addresses before persistence", async () => {
    const response = await POST(request({ email: "not-an-email" }));

    expect(response.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });
});
