import { beforeEach, describe, expect, it, vi } from "vitest";
import { OG_IMAGE_CACHE_CONTROL, OG_NOT_FOUND_CACHE_CONTROL } from "@/lib/og";

vi.mock("next/og", () => ({
  ImageResponse: class extends Response {
    constructor(_element: unknown, options: ResponseInit & { width: number; height: number }) {
      const headers = new Headers(options.headers);
      headers.set("Content-Type", "image/png");
      super(new Uint8Array([137, 80, 78, 71]), { ...options, headers });
    }
  },
}));

import { GET } from "./route";

const request = new Request("https://argumend.org/api/og/nuclear-energy-safety");

describe("GET /api/og/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a cacheable PNG from the lightweight topic summary index", async () => {
    const response = await GET(request, { params: Promise.resolve({ id: "nuclear-energy-safety" }) });

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("image/png");
    expect(response.headers.get("Cache-Control")).toBe(OG_IMAGE_CACHE_CONTROL);
  });

  it("distinguishes malformed and unknown topic IDs", async () => {
    const malformed = await GET(request, { params: Promise.resolve({ id: "../secret" }) });
    expect(malformed.status).toBe(400);

    const unknown = await GET(request, { params: Promise.resolve({ id: "unknown-topic" }) });
    expect(unknown.status).toBe(404);
    expect(unknown.headers.get("Cache-Control")).toBe(OG_NOT_FOUND_CACHE_CONTROL);
  });
});
