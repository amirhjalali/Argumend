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

describe("maps library redirects", () => {
  it("folds the category, tag and compare pages into /topics with 301s", async () => {
    const redirects = (await nextConfig.redirects()) as unknown as Array<{
      source: string;
      destination: string;
      statusCode?: number;
    }>;
    const bySource = new Map(redirects.map((rule) => [rule.source, rule]));
    expect(bySource.get("/topics/category/:slug")).toEqual({
      source: "/topics/category/:slug",
      destination: "/topics?category=:slug",
      statusCode: 301,
    });
    expect(bySource.get("/topics/tag/:slug")).toEqual({
      source: "/topics/tag/:slug",
      destination: "/topics?q=:slug",
      statusCode: 301,
    });
    for (const source of ["/topics/compare", "/topics/compare/:path+"]) {
      expect(bySource.get(source)).toEqual({ source, destination: "/topics", statusCode: 301 });
    }
  });
});

describe("home + story redirects", () => {
  it("leaves legacy home-canvas URLs to the proxy", async () => {
    // `/?topic=:id` is redirected by proxy.ts (covered in
    // lib/dynamicRoutePolicy.test.ts). A rule here would run first and merge
    // the stale `topic`/`view` query into the map's URL.
    const redirects = (await nextConfig.redirects()) as Array<{
      source: string;
      has?: Array<{ type: string; key?: string }>;
    }>;
    const home = redirects.filter(
      (rule) => rule.source === "/" && !rule.has?.some((c) => c.type === "host"),
    );
    expect(home).toEqual([]);
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

  it("sends the retired Learn ideas somewhere true, in one hop", async () => {
    const redirects = await nextConfig.redirects();
    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/concepts/confidence-calibration",
          destination: "/methodology#older-maps",
          permanent: true,
        },
        { source: "/concepts/pillars", destination: "/concepts/cruxes", permanent: true },
      ]),
    );
  });
});

describe("retired map redirects (one map per question, 2026-10-06)", () => {
  // Spelled out so a change to data/retiredMaps.json that moves a live URL
  // shows up here; lib/retiredMaps.test.ts checks the table itself.
  const expected: Array<[string, string]> = [
    ["/topics/government-platform-bans", "/topics/tiktok-ban"],
    ["/topics/government-platform-bans/map", "/topics/tiktok-ban/map"],
    ["/embed/government-platform-bans", "/embed/tiktok-ban"],
    ["/questions/should-governments-ban-social-media-platforms", "/questions/should-tiktok-be-banned"],
    ["/questions/is-it-right-for-governments-to-ban-apps", "/questions/should-tiktok-be-banned"],
    ["/questions/do-government-platform-bans-protect-citizens", "/questions/should-tiktok-be-banned"],
    ["/is/governments-ban-social-platforms", "/questions/should-tiktok-be-banned"],
  ];

  it.each(expected)("%s → %s, permanently", async (source, destination) => {
    const redirects = await nextConfig.redirects();
    expect(redirects).toContainEqual({ source, destination, permanent: true });
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

  it("lets Cloudflare Web Analytics load its beacon and report, on pages and embeds alike", async () => {
    const rules = await nextConfig.headers();
    const csp = (source: (s: string) => boolean) =>
      rules
        .find((rule) => source(rule.source))
        ?.headers.find(({ key }) => key === "Content-Security-Policy")?.value ?? "";
    const policies = [csp((s) => s.includes("?!embed/")), csp((s) => s === "/embed/:path*")];
    for (const policy of policies) {
      const directive = (name: string) =>
        policy.split("; ").find((d) => d.startsWith(`${name} `)) ?? "";
      expect(directive("script-src")).toContain("https://static.cloudflareinsights.com");
      expect(directive("connect-src")).toContain("https://cloudflareinsights.com");
    }
    // The two policies differ only in who may frame the page.
    const [page, embed] = policies;
    expect(embed.replace("frame-ancestors *", "frame-ancestors 'none'")).toBe(page);
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
