import { describe, expect, it } from "vitest";
import { figureColumns, type FigureEntry } from "./figure";

const e = (id: string, date: string, status: FigureEntry["status"] = "open"): FigureEntry => ({
  id,
  date,
  status,
});

describe("figureColumns", () => {
  it("returns nothing without entries", () => {
    expect(figureColumns([], "2026-06-24", "2026-09-22")).toEqual([]);
  });

  it("runs month by month from the first entry to the as-of month, stacking entries", () => {
    const columns = figureColumns(
      [e("a", "2026-07-03"), e("b", "2026-07-20"), e("c", "2026-09-01")],
      "2026-06-24",
      "2026-09-22",
    );
    expect(columns.map((c) => (c.kind === "month" ? `${c.month}:${c.entries.length}` : "gap"))).toEqual([
      "2026-07:2",
      "2026-08:0",
      "2026-09:1",
    ]);
  });

  it("marks months and entries against the window at day precision", () => {
    const columns = figureColumns(
      [e("before", "2026-06-10"), e("inside", "2026-06-24")],
      "2026-06-24",
      "2026-09-22",
    );
    const june = columns[0];
    expect(june.kind === "month" && june.inWindow).toBe(true);
    expect(june.kind === "month" && june.entries.map((x) => x.inWindow)).toEqual([false, true]);
  });

  it("collapses a long empty stretch outside the window into one break, and keeps short ones", () => {
    const columns = figureColumns(
      [e("old", "2023-10-27"), e("mid", "2025-02-20"), e("new", "2025-05-01")],
      "2025-12-01",
      "2026-01-15",
    );
    const kinds = columns.map((c) => (c.kind === "gap" ? `gap:${c.months}` : c.month));
    expect(kinds[0]).toBe("2023-10");
    expect(kinds[1]).toBe("gap:15");
    expect(kinds.slice(2, 6)).toEqual(["2025-02", "2025-03", "2025-04", "2025-05"]);
    // Jun–Nov 2025 is six empty months outside the window: one break.
    expect(kinds[6]).toBe("gap:6");
    // Window months stay even when empty.
    expect(kinds.slice(7)).toEqual(["2025-12", "2026-01"]);
  });
});
