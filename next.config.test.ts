import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const nextConfig = require("./next.config.js") as {
  redirects: () => Promise<
    Array<{ source: string; destination: string; permanent: boolean }>
  >;
  headers: () => Promise<
    Array<{ source: string; headers: Array<{ key: string; value: string }> }>
  >;
};

describe("offline account routing", () => {
  it("redirects direct account entry points to device-local bookmarks", async () => {
    const redirects = await nextConfig.redirects();
    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/auth/signin",
          destination: "/saved",
          permanent: false,
        },
        {
          source: "/dashboard",
          destination: "/saved",
          permanent: false,
        },
      ]),
    );
  });
});

describe("home + story redirects", () => {
  it("sends every legacy home-canvas URL to the map's own page", async () => {
    const redirects = (await nextConfig.redirects()) as Array<{
      source: string;
      destination: string;
      permanent: boolean;
      has?: Array<{ type: string; key?: string; value?: string }>;
    }>;
    const canvas = redirects.find(
      (rule) => rule.source === "/" && rule.has?.some((c) => c.type === "query" && c.key === "topic"),
    );
    expect(canvas).toBeDefined();
    expect(canvas?.permanent).toBe(true);
    expect(canvas?.has).toEqual([{ type: "query", key: "topic", value: "(?<id>.*)" }]);
    expect(canvas?.destination.startsWith("/topics/:id")).toBe(true);
    // The incoming query is merged into the destination. The destination
    // must pin `view` to something other than the legacy page's canvas
    // values, or `/?topic=x&view=logic-map` would bounce between the two.
    const view = new URLSearchParams(canvas?.destination.split("?")[1] ?? "").get("view");
    expect(view).not.toBeNull();
    expect(["logic-map", "graph"]).not.toContain(view);
  });

  it("folds /how-it-works and /community into /about", async () => {
    const redirects = await nextConfig.redirects();
    expect(redirects).toEqual(
      expect.arrayContaining([
        { source: "/how-it-works", destination: "/about#read-a-map", permanent: true },
        { source: "/community", destination: "/about#contribute", permanent: true },
      ]),
    );
  });
});

describe("Next.js response headers", () => {
  it("keeps ordinary pages protected while allowing the embed route to be framed", async () => {
    const rules = await nextConfig.headers();
    const protectedPages = rules.find(({ source }) => source.includes("?!embed/"));
    const embed = rules.find(({ source }) => source === "/embed/:path*");

    expect(protectedPages?.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: "X-Frame-Options", value: "DENY" }),
        expect.objectContaining({
          key: "Content-Security-Policy",
          value: expect.stringContaining("frame-ancestors 'none'"),
        }),
      ])
    );
    expect(embed?.headers.some(({ key }) => key === "X-Frame-Options")).toBe(false);
    expect(embed?.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "Content-Security-Policy",
          value: expect.stringContaining("frame-ancestors *"),
        }),
      ])
    );
  });

  it("caches stable machine-discovery documents at the edge", async () => {
    const rules = await nextConfig.headers();
    for (const source of [
      "/robots.txt",
      "/sitemap.xml",
      "/manifest.webmanifest",
    ]) {
      const rule = rules.find((candidate) => candidate.source === source);
      expect(rule?.headers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            key: "Cache-Control",
            value: expect.stringContaining("s-maxage=86400"),
          }),
        ]),
      );
    }
  });
});
