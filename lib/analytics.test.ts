import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  analyticsEnabled,
  analyticsParams,
  flushAnalyticsQueue,
  resultsBucket,
  setAnalyticsConfigForTesting,
  trackEvent,
  trackPageView,
} from "./analytics";

const GA = { provider: "ga", measurementId: "G-TEST123" } as const;

function resetWindow() {
  delete window.gtag;
  delete window.plausible;
  delete window.umami;
  delete window.dataLayer;
}

beforeEach(() => {
  resetWindow();
  window.history.replaceState(null, "", "/");
});

afterEach(() => {
  setAnalyticsConfigForTesting(undefined);
  resetWindow();
});

describe("with analytics off", () => {
  beforeEach(() => setAnalyticsConfigForTesting(null));

  it("is a no-op: nothing called, nothing queued", () => {
    const gtag = vi.fn();
    expect(analyticsEnabled()).toBe(false);
    trackEvent({ action: "topic_view", topicId: "nuclear-energy-safety", topicKind: "legacy" });
    trackPageView("/topics", "");
    // A provider function that appears later receives nothing either.
    window.gtag = gtag;
    flushAnalyticsQueue();
    expect(gtag).not.toHaveBeenCalled();
  });

  it("does not touch a provider function another script defined", () => {
    const plausible = vi.fn() as unknown as NonNullable<Window["plausible"]>;
    window.plausible = plausible;
    trackEvent({ action: "share_click", platform: "copy" });
    expect(plausible).not.toHaveBeenCalled();
  });
});

describe("with Google Analytics", () => {
  beforeEach(() => setAnalyticsConfigForTesting(GA));

  it("sends the event name and parameters, with a sanitised page_location", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    window.history.replaceState(null, "", "/topics/x?q=something+personal&view=graph");
    trackEvent({ action: "evidence_expand", topicId: "x", cruxIndex: 2 });
    expect(gtag).toHaveBeenCalledWith("event", "evidence_expand", {
      topicId: "x",
      cruxIndex: 2,
      page_location: `${window.location.origin}/topics/x?view=graph`,
      send_to: "G-TEST123",
    });
  });

  it("queues events fired before gtag exists and delivers them in order once it does", () => {
    trackEvent({ action: "topic_view", topicId: "a", topicKind: "flagship" });
    trackEvent({ action: "first_crux_seen", topicId: "a" });
    const gtag = vi.fn();
    window.gtag = gtag;
    flushAnalyticsQueue();
    expect(gtag.mock.calls.map((call) => call[1])).toEqual(["topic_view", "first_crux_seen"]);
    flushAnalyticsQueue();
    expect(gtag).toHaveBeenCalledTimes(2);
  });

  it("sends page views with the search query stripped from the path", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    window.history.replaceState(null, "", "/topics?q=who+i+voted+for&category=politics");
    trackPageView("/topics", "q=who+i+voted+for&category=politics");
    const [, name, params] = gtag.mock.calls[0];
    expect(name).toBe("page_view");
    expect(params.page_path).toBe("/topics?category=politics");
    expect(JSON.stringify(params)).not.toContain("voted");
  });
});

describe("with a cookieless provider", () => {
  it("sends Plausible custom events as props", () => {
    setAnalyticsConfigForTesting({ provider: "plausible", scriptSrc: "https://plausible.io/js/script.js" });
    const plausible = vi.fn() as unknown as NonNullable<Window["plausible"]>;
    window.plausible = plausible;
    trackEvent({ action: "paste_result", result: "closest", lengthBucket: "m" });
    expect(plausible).toHaveBeenCalledWith("paste_result", { props: { result: "closest", lengthBucket: "m" } });
  });

  it("leaves page views to the Plausible and Umami scripts", () => {
    setAnalyticsConfigForTesting({
      provider: "umami",
      scriptSrc: "https://cloud.umami.is/script.js",
      websiteId: "94db1cb1-74f4-4a40-ad6c-962362670409",
    });
    const track = vi.fn();
    window.umami = { track };
    trackPageView("/topics", "");
    trackEvent({ action: "search_used", surface: "library", resultsBucket: "1-5" });
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith("search_used", { surface: "library", resultsBucket: "1-5" });
  });
});

describe("no text leaks", () => {
  it("drops any string parameter that is not a short token", () => {
    expect(
      analyticsParams({
        topicId: "nuclear-energy-safety",
        contentType: "conversation",
        bucket: "xl",
        sentence: "I think my neighbour is wrong about vaccines",
        email: "someone@example.com",
        long: "a".repeat(65),
        empty: "",
        count: 3,
        infinite: Number.POSITIVE_INFINITY,
        flag: true,
        nested: { text: "hidden" },
      }),
    ).toEqual({ topicId: "nuclear-energy-safety", contentType: "conversation", bucket: "xl", count: 3, flag: true });
  });

  it("applies the filter at runtime, whatever a caller passes", () => {
    setAnalyticsConfigForTesting(GA);
    const gtag = vi.fn();
    window.gtag = gtag;
    // A caller that slips a sentence past the type system sends nothing of it.
    trackEvent({ action: "cta_click", ctaName: "Pasted text goes here", location: "analyze" } as never);
    const params = gtag.mock.calls[0][2];
    expect(params).not.toHaveProperty("ctaName");
    expect(params.location).toBe("analyze");
  });
});

describe("resultsBucket", () => {
  it("buckets counts", () => {
    expect([0, 1, 5, 6, 20, 21, 400].map(resultsBucket)).toEqual(["0", "1-5", "1-5", "6-20", "6-20", "21+", "21+"]);
  });
});
