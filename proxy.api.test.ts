import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { config, proxy } from "./proxy";
import { CORS_HEADERS } from "@/app/api/v1/_shared/http";

const prefixes = ["/api/v1/topics", "/api/og", "/api/verdict-card"];

describe("public API path decoding", () => {
  it.each(prefixes)("matches only topic-id requests beneath %s", (prefix) => {
    for (const id of ["nuclear-energy-safety", "not-a-topic", "%6eot-a-topic", "%ZZ"]) {
      expect(unstable_doesMiddlewareMatch({ config, url: `${prefix}/${id}` })).toBe(true);
    }
    expect(unstable_doesMiddlewareMatch({ config, url: prefix })).toBe(false);
  });

  it.each(["/api/analyze", "/api/debate/stream", "/api/auth/session", "/api/analysis/%ZZ"])(
    "does not add the unrelated API route %s to the proxy",
    (url) => {
      expect(unstable_doesMiddlewareMatch({ config, url })).toBe(false);
    },
  );

  it.each(prefixes.flatMap((prefix) => ["%", "%ZZ", "%C3%28", "%E0%A4"].map(
    (id) => `${prefix}/${id}`,
  )))("returns a non-cacheable 400 before decoding malformed path %s", async (path) => {
    const response = proxy(new NextRequest(`http://localhost${path}`));

    expect(response.status).toBe(400);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.has("x-middleware-rewrite")).toBe(false);
    expect(response.headers.has("x-middleware-next")).toBe(false);
    if (path.startsWith("/api/verdict-card/")) {
      await expect(response.text()).resolves.toBe("Invalid topic ID encoding");
    } else {
      await expect(response.json()).resolves.toMatchObject({ code: "INVALID_TOPIC_ID" });
    }
    if (path.startsWith("/api/v1/")) {
      for (const [name, value] of Object.entries(CORS_HEADERS)) {
        expect(response.headers.get(name)).toBe(value);
      }
    } else {
      expect(response.headers.has("Access-Control-Allow-Origin")).toBe(false);
    }
  });

  it.each(prefixes.flatMap((prefix) => [
    "nuclear-energy-safety",
    "not-a-topic",
    "%6eot-a-topic",
    "missing%2Fchild",
  ].map((id) => `${prefix}/${id}?format=instagram&query=%ZZ`)))(
    "leaves validly encoded path %s to its API handler",
    (path) => {
      const response = proxy(new NextRequest(`http://localhost${path}`));

      expect(response.headers.get("x-middleware-next")).toBe("1");
      expect(response.headers.has("x-middleware-rewrite")).toBe(false);
      expect(response.headers.has("Cache-Control")).toBe(false);
      expect(response.headers.has("Content-Type")).toBe(false);
      expect(response.headers.has("Access-Control-Allow-Origin")).toBe(false);
    },
  );
});
