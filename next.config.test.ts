import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { resolveAnalyticsConfig } from "./lib/analyticsConfig";

const require = createRequire(import.meta.url);
type NextConfigShape = {
  redirects: () => Promise<
    Array<{ source: string; destination: string; permanent: boolean }>
  >;
  headers: () => Promise<
    Array<{ source: string; headers: Array<{ key: string; value: string }> }>
  >;
};
const nextConfig = require("./next.config.js") as NextConfigShape;

/** next.config.js evaluated again, under whatever process.env holds now. */
function loadFreshConfig(): NextConfigShape {
  const path = require.resolve("./next.config.js");
  const cached = require.cache[path];
  require.cache[path] = undefined;
  try {
    return require("./next.config.js") as NextConfigShape;
  } finally {
    if (cached) require.cache[path] = cached;
  }
}

function withEnv<T>(env: Record<string, string>, run: () => T): T {
  const previous = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]));
  Object.assign(process.env, env);
  try {
    return run();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) Reflect.deleteProperty(process.env, key);
      else process.env[key] = value;
    }
  }
}

async function pagePolicy(config: NextConfigShape): Promise<string> {
  const rules = await config.headers();
  return (
    rules
      .find((rule) => rule.source.includes("?!embed/"))
      ?.headers.find(({ key }) => key === "Content-Security-Policy")?.value ?? ""
  );
}

function directiveOf(policy: string, name: string): string {
  return policy.split("; ").find((d) => d.startsWith(`${name} `)) ?? "";
}

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
          destination: "/guides/reading-confidence-like-a-forecaster",
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
    ["/topics/longevity-anti-aging", "/topics/longevity-science"],
    ["/topics/longevity-anti-aging/map", "/topics/longevity-science/map"],
    ["/embed/longevity-anti-aging", "/embed/longevity-science"],
    ["/questions/can-we-reverse-aging", "/questions/can-science-extend-human-lifespan"],
    ["/questions/is-anti-aging-medicine-real", "/questions/can-science-extend-human-lifespan"],
    ["/questions/will-we-be-able-to-live-to-150", "/questions/can-science-extend-human-lifespan"],
    ["/is/radical-life-extension-possible", "/questions/can-science-extend-human-lifespan"],
    ["/topics/lithium-mining-ev-impact", "/topics/ev-environmental-impact"],
    ["/topics/lithium-mining-ev-impact/map", "/topics/ev-environmental-impact/map"],
    ["/embed/lithium-mining-ev-impact", "/embed/ev-environmental-impact"],
    [
      "/questions/are-electric-vehicles-still-better-for-the-environment-once-lithium-mining-is-counted",
      "/questions/are-electric-cars-better-for-the-environment",
    ],
    ["/is/evs-better-despite-lithium-mining", "/questions/are-electric-cars-better-for-the-environment"],
    ["/topics/psychedelic-therapy-hype", "/topics/psychedelics-mental-health"],
    ["/topics/psychedelic-therapy-hype/map", "/topics/psychedelics-mental-health/map"],
    ["/embed/psychedelic-therapy-hype", "/embed/psychedelics-mental-health"],
    ["/questions/is-psychedelic-therapy-overhyped", "/questions/can-psychedelics-treat-depression"],
    ["/questions/does-psychedelic-therapy-actually-work", "/questions/can-psychedelics-treat-depression"],
    ["/questions/are-the-claims-about-psychedelic-therapy-exaggerated", "/questions/can-psychedelics-treat-depression"],
    ["/is/psychedelic-therapy-real-breakthrough", "/questions/can-psychedelics-treat-depression"],
    ["/topics/iran-war-justification", "/topics/us-iran-conflict"],
    ["/topics/iran-war-justification/map", "/topics/us-iran-conflict/map"],
    ["/embed/iran-war-justification", "/embed/us-iran-conflict"],
    ["/topics/ai-job-displacement", "/topics/ai-mass-unemployment"],
    ["/topics/ai-job-displacement/map", "/topics/ai-mass-unemployment"],
    ["/embed/ai-job-displacement", "/embed/ai-mass-unemployment"],
    ["/questions/will-ai-take-my-job", "/topics/ai-mass-unemployment"],
    ["/questions/how-many-jobs-will-ai-replace", "/topics/ai-mass-unemployment"],
    ["/questions/is-ai-automating-jobs-faster-than-creating-new-ones", "/topics/ai-mass-unemployment"],
    ["/is/ai-replace-white-collar-jobs", "/topics/ai-mass-unemployment"],
    ["/topics/ai-white-collar-displacement", "/topics/ai-mass-unemployment"],
    ["/topics/ai-white-collar-displacement/map", "/topics/ai-mass-unemployment"],
    ["/embed/ai-white-collar-displacement", "/embed/ai-mass-unemployment"],
    ["/questions/will-ai-replace-white-collar-workers", "/topics/ai-mass-unemployment"],
    ["/questions/is-ai-coming-for-office-jobs", "/topics/ai-mass-unemployment"],
    ["/questions/which-white-collar-jobs-are-most-at-risk-from-ai", "/topics/ai-mass-unemployment"],
    ["/is/ai-net-job-loss", "/topics/ai-mass-unemployment"],
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

  it("lets GA4 report to its regional collection hosts, not only www.google-analytics.com", async () => {
    const policy = await pagePolicy(nextConfig);
    // GA4 sends hits to region1.google-analytics.com / region1.analytics.google.com.
    expect(directiveOf(policy, "connect-src")).toContain("https://*.google-analytics.com");
    expect(directiveOf(policy, "connect-src")).toContain("https://*.analytics.google.com");
    expect(directiveOf(policy, "script-src")).toContain("https://www.googletagmanager.com");
    expect(directiveOf(policy, "img-src")).toContain("https://*.google-analytics.com");
  });

  it("allows no cookieless analytics origin unless one is configured", async () => {
    const policy = await pagePolicy(nextConfig);
    expect(policy).not.toMatch(/plausible|umami/);
  });

  it.each([
    [
      "plausible",
      {
        NEXT_PUBLIC_ANALYTICS_PROVIDER: "plausible",
        NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC: "https://plausible.io/js/pa-abc123.js",
      },
      "https://plausible.io",
    ],
    [
      "umami",
      {
        NEXT_PUBLIC_ANALYTICS_PROVIDER: "umami",
        NEXT_PUBLIC_UMAMI_SCRIPT_SRC: "https://stats.argumend.org/script.js",
        NEXT_PUBLIC_UMAMI_WEBSITE_ID: "94db1cb1-74f4-4a40-ad6c-962362670409",
      },
      "https://stats.argumend.org",
    ],
  ])("adds a configured %s origin to script-src and connect-src, the same origin the layout loads", async (_name, env, origin) => {
    const config = withEnv(env, () => loadFreshConfig());
    const policy = await pagePolicy(config);
    expect(directiveOf(policy, "script-src")).toContain(origin);
    expect(directiveOf(policy, "connect-src")).toContain(origin);
    // lib/analyticsConfig.ts, which the layout uses, resolves the same script.
    const resolved = resolveAnalyticsConfig(env);
    expect(resolved && "scriptSrc" in resolved ? new URL(resolved.scriptSrc).origin : null).toBe(origin);
  });

  it("refuses a plain-http analytics origin, as the layout does", async () => {
    const env = {
      NEXT_PUBLIC_ANALYTICS_PROVIDER: "umami",
      NEXT_PUBLIC_UMAMI_SCRIPT_SRC: "http://stats.example.com/script.js",
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: "94db1cb1-74f4-4a40-ad6c-962362670409",
    };
    const policy = await pagePolicy(withEnv(env, () => loadFreshConfig()));
    expect(policy).not.toContain("stats.example.com");
    expect(resolveAnalyticsConfig(env)).toBeNull();
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
