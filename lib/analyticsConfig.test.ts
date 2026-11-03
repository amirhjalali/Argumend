import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  ANALYTICS_URL_PARAMS,
  resolveAnalyticsConfig,
  sanitizeAnalyticsPath,
  sanitizeAnalyticsUrl,
  siteVerificationMetadata,
} from "./analyticsConfig";

describe("resolveAnalyticsConfig", () => {
  it("is off with nothing set", () => {
    expect(resolveAnalyticsConfig({})).toBeNull();
  });

  it("treats a bare GA measurement ID as Google Analytics, as before the provider switch", () => {
    expect(resolveAnalyticsConfig({ NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-ABC123XYZ" })).toEqual({
      provider: "ga",
      measurementId: "G-ABC123XYZ",
    });
  });

  it("refuses a measurement ID that is not Google's shape, rather than interpolating it", () => {
    for (const id of ["UA-1234-1", "G-abc'); alert(1); ('", "G-", " "]) {
      expect(resolveAnalyticsConfig({ NEXT_PUBLIC_GA_MEASUREMENT_ID: id })).toBeNull();
    }
  });

  it("lets the provider switch turn analytics off even with a GA ID present", () => {
    expect(
      resolveAnalyticsConfig({
        NEXT_PUBLIC_ANALYTICS_PROVIDER: "none",
        NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-ABC123XYZ",
      }),
    ).toBeNull();
  });

  it("selects Plausible with an https script, the domain optional", () => {
    expect(
      resolveAnalyticsConfig({
        NEXT_PUBLIC_ANALYTICS_PROVIDER: "plausible",
        NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC: "https://plausible.io/js/script.js",
        NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "argumend.org",
      }),
    ).toEqual({ provider: "plausible", scriptSrc: "https://plausible.io/js/script.js", domain: "argumend.org" });
    expect(
      resolveAnalyticsConfig({
        NEXT_PUBLIC_ANALYTICS_PROVIDER: "Plausible",
        NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC: "https://plausible.io/js/pa-abc.js",
      }),
    ).toEqual({ provider: "plausible", scriptSrc: "https://plausible.io/js/pa-abc.js" });
  });

  it("selects Umami only with an https script and a UUID website id", () => {
    const umami = {
      NEXT_PUBLIC_ANALYTICS_PROVIDER: "umami",
      NEXT_PUBLIC_UMAMI_SCRIPT_SRC: "https://cloud.umami.is/script.js",
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: "94db1cb1-74f4-4a40-ad6c-962362670409",
    };
    expect(resolveAnalyticsConfig(umami)).toEqual({
      provider: "umami",
      scriptSrc: "https://cloud.umami.is/script.js",
      websiteId: "94db1cb1-74f4-4a40-ad6c-962362670409",
    });
    expect(resolveAnalyticsConfig({ ...umami, NEXT_PUBLIC_UMAMI_WEBSITE_ID: "abc" })).toBeNull();
    expect(
      resolveAnalyticsConfig({ ...umami, NEXT_PUBLIC_UMAMI_SCRIPT_SRC: "http://stats.example.com/script.js" }),
    ).toBeNull();
  });

  it("does not fall back to GA when another provider is requested but misconfigured", () => {
    expect(
      resolveAnalyticsConfig({
        NEXT_PUBLIC_ANALYTICS_PROVIDER: "plausible",
        NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-ABC123XYZ",
      }),
    ).toBeNull();
  });
});

describe("sanitizeAnalyticsUrl", () => {
  it("drops a search query, keeps the path and allow-listed parameters", () => {
    expect(
      sanitizeAnalyticsUrl("https://argumend.org/topics?q=my+private+worry&category=science&page=2#c1"),
    ).toBe("https://argumend.org/topics?category=science&page=2");
    expect(sanitizeAnalyticsUrl("https://argumend.org/questions?q=abortion")).toBe(
      "https://argumend.org/questions",
    );
  });

  it("keeps campaign parameters so a source can be attributed", () => {
    expect(sanitizeAnalyticsUrl("https://argumend.org/?utm_source=x&utm_campaign=launch&email=a%40b.c")).toBe(
      "https://argumend.org/?utm_source=x&utm_campaign=launch",
    );
  });

  it("never allow-lists a parameter the site uses for free text", () => {
    expect(ANALYTICS_URL_PARAMS).not.toContain("q");
    expect(ANALYTICS_URL_PARAMS).not.toContain("text");
  });

  it("returns an empty string for something that is not a URL", () => {
    expect(sanitizeAnalyticsUrl("not a url")).toBe("");
  });
});

describe("sanitizeAnalyticsPath", () => {
  it("builds GA's page_path without the query a search wrote", () => {
    expect(sanitizeAnalyticsPath("/topics", "q=secret&sort=newest")).toBe("/topics?sort=newest");
    expect(sanitizeAnalyticsPath("/topics/nuclear-energy-safety", "")).toBe("/topics/nuclear-energy-safety");
  });
});

describe("build plumbing", () => {
  it("passes every analytics variable into the Docker build, where the layout and CSP read it", () => {
    const source = readFileSync("lib/analyticsConfig.ts", "utf8");
    const names = new Set([...source.matchAll(/process\.env\.(NEXT_PUBLIC_[A-Z_]+)/g)].map((m) => m[1]));
    expect(names.size).toBeGreaterThanOrEqual(7);
    const dockerfile = readFileSync("Dockerfile", "utf8");
    for (const name of names) {
      expect(dockerfile, name).toMatch(new RegExp(`^ARG ${name}=`, "m"));
      expect(dockerfile, name).toContain(`${name}=$${name}`);
    }
  });
});

describe("siteVerificationMetadata", () => {
  it("emits the Search Console token when set, nothing otherwise", () => {
    expect(siteVerificationMetadata("abcDEF123_-xyz789")).toEqual({ verification: { google: "abcDEF123_-xyz789" } });
    expect(siteVerificationMetadata(undefined)).toEqual({});
    expect(siteVerificationMetadata("  ")).toEqual({});
    expect(siteVerificationMetadata('"><script>')).toEqual({});
  });
});
