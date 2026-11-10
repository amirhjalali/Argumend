import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { setAnalyticsConfigForTesting } from "@/lib/analytics";
import { SEARCH_SETTLE_MS, useSearchAnalytics } from "./useSearchAnalytics";

let gtag: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.useFakeTimers();
  gtag = vi.fn();
  window.gtag = gtag as unknown as Window["gtag"];
  setAnalyticsConfigForTesting({ provider: "ga", measurementId: "G-TEST123" });
});

afterEach(() => {
  vi.useRealTimers();
  setAnalyticsConfigForTesting(undefined);
  delete window.gtag;
});

function render(initial: string, count = 0) {
  return renderHook(({ query, n }) => useSearchAnalytics("library", query, n), {
    initialProps: { query: initial, n: count },
  });
}

describe("useSearchAnalytics", () => {
  it("counts one search when typing settles, with a results bucket and never the query", () => {
    const hook = render("");
    hook.rerender({ query: "nuc", n: 9 });
    hook.rerender({ query: "nuclear waste", n: 3 });
    vi.advanceTimersByTime(SEARCH_SETTLE_MS - 1);
    expect(gtag).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(gtag).toHaveBeenCalledTimes(1);
    const [, name, params] = gtag.mock.calls[0];
    expect(name).toBe("search_used");
    expect(params).toMatchObject({ surface: "library", resultsBucket: "1-5" });
    expect(JSON.stringify(gtag.mock.calls)).not.toMatch(/nuc/);
  });

  it("does not count a query the page started with, the same query again, or clearing the box", () => {
    const hook = render("from-the-url", 4);
    vi.advanceTimersByTime(SEARCH_SETTLE_MS * 2);
    hook.rerender({ query: "", n: 0 });
    vi.advanceTimersByTime(SEARCH_SETTLE_MS * 2);
    expect(gtag).not.toHaveBeenCalled();

    hook.rerender({ query: "tariffs", n: 0 });
    vi.advanceTimersByTime(SEARCH_SETTLE_MS);
    hook.rerender({ query: "tariffs ", n: 0 });
    vi.advanceTimersByTime(SEARCH_SETTLE_MS);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag.mock.calls[0][2]).toMatchObject({ resultsBucket: "0" });
  });

  it("sets no timer at all when analytics is off", () => {
    setAnalyticsConfigForTesting(null);
    const hook = render("");
    hook.rerender({ query: "anything", n: 2 });
    expect(vi.getTimerCount()).toBe(0);
  });
});
