import { describe, expect, it } from "vitest";
import { calculateReadingProgress } from "./client";

describe("blog reading progress", () => {
  it("uses the scroll container's scrollable distance", () => {
    expect(calculateReadingProgress(600, 1800, 600)).toBe(0.5);
  });

  it("clamps overscroll and handles content shorter than its viewport", () => {
    expect(calculateReadingProgress(-20, 1800, 600)).toBe(0);
    expect(calculateReadingProgress(1600, 1800, 600)).toBe(1);
    expect(calculateReadingProgress(0, 500, 600)).toBe(0);
  });
});
