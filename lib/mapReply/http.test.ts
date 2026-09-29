import { describe, expect, it } from "vitest";
import { MAP_REPLY_LIMITS } from "./constants";
import { MapReplyError } from "./errors";
import { exceedsDeclaredBodySize, mapReplyJsonError, resolveRequestId } from "./http";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe("resolveRequestId", () => {
  it("generates an id when none is supplied", () => {
    expect(resolveRequestId(null)).toMatch(UUID);
    expect(resolveRequestId(undefined)).toMatch(UUID);
    expect(resolveRequestId("  ")).toMatch(UUID);
  });

  it("adopts a well-formed UUID so a trace can be followed", () => {
    const uuid = "7f1c2b3a-4d5e-4f60-8a91-0b2c3d4e5f60";
    expect(resolveRequestId(uuid)).toBe(uuid);
    expect(resolveRequestId(` ${uuid.toUpperCase()} `)).toBe(uuid.toUpperCase());
  });

  it("refuses anything else rather than reflecting it", () => {
    // It lands in a response header, a response body and a log line.
    for (const injected of [
      "<script>alert(1)</script>",
      "not-a-uuid",
      "7f1c2b3a-4d5e-4f60-8a91-0b2c3d4e5f60\r\nx-evil: 1",
      "../../etc/passwd",
      "7f1c2b3a4d5e4f608a910b2c3d4e5f60",
      "a".repeat(500),
    ]) {
      const resolved = resolveRequestId(injected);
      expect(resolved).not.toBe(injected);
      expect(resolved).toMatch(UUID);
    }
  });
});

describe("exceedsDeclaredBodySize", () => {
  it("refuses a body that declares itself past the cap", () => {
    expect(exceedsDeclaredBodySize(String(MAP_REPLY_LIMITS.maxRequestBytes + 1))).toBe(true);
    expect(exceedsDeclaredBodySize("10000000")).toBe(true);
  });

  it("allows a body at or under the cap", () => {
    expect(exceedsDeclaredBodySize(String(MAP_REPLY_LIMITS.maxRequestBytes))).toBe(false);
    expect(exceedsDeclaredBodySize("2048")).toBe(false);
    expect(exceedsDeclaredBodySize("0")).toBe(false);
  });

  it("defers to the character check when the header is missing or junk", () => {
    expect(exceedsDeclaredBodySize(null)).toBe(false);
    expect(exceedsDeclaredBodySize(undefined)).toBe(false);
    expect(exceedsDeclaredBodySize("banana")).toBe(false);
  });

  it("leaves room for JSON escaping and multi-byte characters", () => {
    // A legitimate 12,000-character paste must never be refused unread.
    const worstCase = MAP_REPLY_LIMITS.maxCharacters * 4;
    expect(worstCase).toBeLessThanOrEqual(MAP_REPLY_LIMITS.maxRequestBytes);
  });
});

describe("mapReplyJsonError", () => {
  it("returns a typed, uncacheable body carrying the request id", async () => {
    const requestId = "7f1c2b3a-4d5e-4f60-8a91-0b2c3d4e5f60";
    const response = mapReplyJsonError(requestId, new MapReplyError("CONTENT_TOO_LONG"));

    expect(response.status).toBe(400);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("x-request-id")).toBe(requestId);
    await expect(response.json()).resolves.toEqual({
      error: "That text is too long. Paste up to 12,000 characters.",
      code: "CONTENT_TOO_LONG",
      requestId,
    });
  });

  it("carries extra headers without losing the defaults", () => {
    const response = mapReplyJsonError("id", new MapReplyError("RATE_LIMITED"), {
      "Retry-After": "60",
    });
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
