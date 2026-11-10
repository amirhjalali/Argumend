import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setAnalyticsConfigForTesting, trackEvent } from "@/lib/analytics";
import { bootstrapAnalytics, resetAnalyticsBootstrapForTesting } from "./AnalyticsScripts";

const GA = { provider: "ga", measurementId: "G-TEST123" } as const;

function reset() {
  delete window.gtag;
  delete window.dataLayer;
  delete window.plausible;
  resetAnalyticsBootstrapForTesting();
}

beforeEach(reset);
afterEach(() => {
  reset();
  setAnalyticsConfigForTesting(undefined);
});

describe("bootstrapAnalytics: Google Analytics", () => {
  it("defines gtag's queue stub, configures without an automatic page view, and drains queued events", () => {
    setAnalyticsConfigForTesting(GA);
    window.history.replaceState(null, "", "/topics?q=private+words");
    trackEvent({ action: "topic_view", topicId: "a", topicKind: "legacy" });
    expect(window.dataLayer).toBeUndefined();

    bootstrapAnalytics(GA);
    const layer = window.dataLayer as IArguments[];
    const commands = layer.map((args) => Array.from(args));
    expect(commands[0][0]).toBe("js");
    expect(commands[1]).toEqual([
      "config",
      "G-TEST123",
      { send_page_view: false, page_location: `${window.location.origin}/topics` },
    ]);
    expect(commands[2][0]).toBe("event");
    expect(commands[2][1]).toBe("topic_view");
    // gtag.js only reads Arguments objects, so the stub must push those.
    expect(Object.prototype.toString.call(layer[0])).toBe("[object Arguments]");
    expect(JSON.stringify(commands)).not.toContain("private");
  });

  it("configures once, however often React runs the effect", () => {
    setAnalyticsConfigForTesting(GA);
    bootstrapAnalytics(GA);
    bootstrapAnalytics(GA);
    const configs = (window.dataLayer as IArguments[]).filter((args) => args[0] === "config");
    expect(configs).toHaveLength(1);
  });
});

describe("bootstrapAnalytics: Plausible", () => {
  it("installs the queue stub and a URL filter that strips the search query", () => {
    const config = { provider: "plausible", scriptSrc: "https://plausible.io/js/script.js" } as const;
    setAnalyticsConfigForTesting(config);
    trackEvent({ action: "share_click", platform: "copy" });
    bootstrapAnalytics(config);

    const plausible = window.plausible!;
    expect(plausible.q?.map((args) => Array.from(args as IArguments))).toEqual([
      ["share_click", { props: { platform: "copy" } }],
    ]);
    const transform = plausible.o?.transformRequest as (p: { u: string }) => { u: string };
    expect(transform({ u: "https://argumend.org/questions?q=a+secret&page=2" }).u).toBe(
      "https://argumend.org/questions?page=2",
    );
  });
});

describe("root layout", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");

  it("loads analytics only through the resolved config, never an inline script with the ID", () => {
    expect(layout).toContain("{ANALYTICS ? <AnalyticsScripts config={ANALYTICS} /> : null}");
    expect(layout).not.toMatch(/gtag\(|googletagmanager/);
  });

  it("emits the Search Console verification tag from the build-time variable", () => {
    expect(layout).toContain("...siteVerificationMetadata()");
  });
});
