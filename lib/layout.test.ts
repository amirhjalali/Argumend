import { describe, it, expect } from "vitest";
import {
  getChildPosition,
  VERTICAL_GAP,
  HORIZONTAL_GAP,
} from "./layout";

describe("getChildPosition", () => {
  const parentPosition = { x: 0, y: 0 };

  describe("center slot (pillars)", () => {
    it("places single child directly below parent", () => {
      const position = getChildPosition(parentPosition, "center", 0, 1);

      expect(position.x).toBe(0);
      expect(position.y).toBeGreaterThan(0);
    });

    it("spreads multiple children horizontally", () => {
      const first = getChildPosition(parentPosition, "center", 0, 3);
      const second = getChildPosition(parentPosition, "center", 1, 3);
      const third = getChildPosition(parentPosition, "center", 2, 3);

      // First should be left of center
      expect(first.x).toBeLessThan(0);
      // Second (middle) should be at center
      expect(second.x).toBe(0);
      // Third should be right of center
      expect(third.x).toBeGreaterThan(0);

      // All should be at the same y position
      expect(first.y).toBe(second.y);
      expect(second.y).toBe(third.y);
    });

    it("maintains consistent horizontal spacing", () => {
      const first = getChildPosition(parentPosition, "center", 0, 2);
      const second = getChildPosition(parentPosition, "center", 1, 2);

      const horizontalDistance = Math.abs(second.x - first.x);
      expect(horizontalDistance).toBe(HORIZONTAL_GAP);
    });
  });

  describe("left slot (skeptic nodes)", () => {
    it("places node to the left of parent", () => {
      const position = getChildPosition(parentPosition, "left", 0, 1);

      expect(position.x).toBeLessThan(0);
    });

    it("places node below the parent horizontal line", () => {
      const position = getChildPosition(parentPosition, "left", 0, 1);

      expect(position.y).toBeGreaterThan(0);
    });
  });

  describe("right slot (proponent/questions)", () => {
    it("places node to the right of parent", () => {
      const position = getChildPosition(parentPosition, "right", 0, 1);

      expect(position.x).toBeGreaterThan(0);
    });

    it("spreads multiple children vertically", () => {
      const first = getChildPosition(parentPosition, "right", 0, 3);
      const second = getChildPosition(parentPosition, "right", 1, 3);
      const third = getChildPosition(parentPosition, "right", 2, 3);

      // All should be at same x position
      expect(first.x).toBe(second.x);
      expect(second.x).toBe(third.x);

      // Should have vertical spread
      expect(first.y).toBeLessThan(second.y);
      expect(second.y).toBeLessThan(third.y);
    });
  });

  describe("symmetry", () => {
    it("left and right slots are symmetric around parent", () => {
      const leftPos = getChildPosition(parentPosition, "left", 0, 1);
      const rightPos = getChildPosition(parentPosition, "right", 0, 1);

      // X positions should be symmetric (opposite sides of 0)
      expect(Math.abs(leftPos.x)).toBeCloseTo(Math.abs(rightPos.x), 1);

      // Y positions should be the same
      expect(leftPos.y).toBeCloseTo(rightPos.y, 1);
    });
  });
});

describe("layout constants", () => {
  it("VERTICAL_GAP is positive", () => {
    expect(VERTICAL_GAP).toBeGreaterThan(0);
  });

  it("HORIZONTAL_GAP is positive", () => {
    expect(HORIZONTAL_GAP).toBeGreaterThan(0);
  });

  it("gaps are reasonable for card sizes", () => {
    // Assuming cards are ~340px wide, horizontal gap should be larger
    expect(HORIZONTAL_GAP).toBeGreaterThan(340);

    // Assuming cards are ~300px tall, vertical gap should be larger
    expect(VERTICAL_GAP).toBeGreaterThan(300);
  });
});
