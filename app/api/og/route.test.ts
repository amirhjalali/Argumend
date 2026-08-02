import { beforeEach, describe, expect, it, vi } from "vitest";
import { OG_IMAGE_CACHE_CONTROL } from "@/lib/og";

vi.mock("next/og", () => ({
  ImageResponse: class extends Response {
    constructor(_element: unknown, options: ResponseInit & { width: number; height: number }) {
      const headers = new Headers(options.headers);
      headers.set("Content-Type", "image/png");
      headers.set("X-Test-Dimensions", `${options.width}x${options.height}`);
      super(new Uint8Array([137, 80, 78, 71]), { ...options, headers });
    }
  },
}));

import { GET } from "./route";

describe("GET /api/og", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns a cacheable 1200x630 PNG for a valid card", async () => {
    const response = await GET(new Request(
      "https://argumend.org/api/og?title=A%20clear%20argument&subtitle=Evidence%20map&verdict=for&score=72.5",
    ));

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("image/png");
    expect(response.headers.get("Cache-Control")).toBe(OG_IMAGE_CACHE_CONTROL);
    expect(response.headers.get("X-Test-Dimensions")).toBe("1200x630");
  });

  it("returns a stable JSON error for invalid or abusive input", async () => {
    const response = await GET(new Request("https://argumend.org/api/og?verdict=maybe&score=Infinity"));

    expect(response.status).toBe(400);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({
      error: "Unable to generate social image.",
      code: "INVALID_OG_QUERY",
    });
  });
});
