import { describe, it, expect } from "vitest";
import { formatLongDate, formatShortDate } from "./formatDate";

// All exact-value assertions use *local-time* inputs (a bare `new Date(y, m, d)`
// or an ISO string without a `Z`/offset). A date-only string like "2026-01-15"
// is parsed as UTC midnight but rendered in the host timezone, so asserting on
// one would fail in any timezone behind UTC. See the note in formatDate.ts.

describe("formatLongDate", () => {
  it("formats a local ISO timestamp as month day, year", () => {
    expect(formatLongDate("2026-01-15T12:00:00")).toBe("January 15, 2026");
  });

  it("accepts a Date instance", () => {
    expect(formatLongDate(new Date(2026, 6, 29))).toBe("July 29, 2026");
  });

  it("handles a UTC-stamped instant without drifting out of its month", () => {
    // Mid-month + midday UTC, so no timezone offset can shift the month.
    expect(formatLongDate("2026-11-15T12:00:00.000Z")).toMatch(
      /^November \d{1,2}, 2026$/
    );
  });

  it("returns the raw string when the input is unparseable", () => {
    expect(formatLongDate("not a date")).toBe("not a date");
  });

  it("returns an empty string for an invalid Date instance", () => {
    expect(formatLongDate(new Date("nope"))).toBe("");
  });
});

describe("formatShortDate", () => {
  it("formats a local ISO timestamp with an abbreviated month", () => {
    expect(formatShortDate("2026-01-15T12:00:00")).toBe("Jan 15, 2026");
  });

  it("accepts a Date instance", () => {
    expect(formatShortDate(new Date(2026, 6, 29))).toBe("Jul 29, 2026");
  });

  it("returns the raw string when the input is unparseable", () => {
    expect(formatShortDate("")).toBe("");
  });
});

describe("locale pinning", () => {
  it("never emits a day-first ordering regardless of host locale", () => {
    // A hydration mismatch would show up here as "15 January 2026".
    expect(formatLongDate("2026-01-15T12:00:00")).toMatch(/^January/);
    expect(formatShortDate("2026-01-15T12:00:00")).toMatch(/^Jan/);
  });

  it("uses distinct month widths for the long and short variants", () => {
    const d = new Date(2026, 8, 4);
    expect(formatLongDate(d)).toBe("September 4, 2026");
    expect(formatShortDate(d)).toBe("Sep 4, 2026");
  });
});
