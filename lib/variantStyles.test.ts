import { describe, it, expect } from "vitest";
import {
  VARIANT_STYLES,
  VARIANT_EDGE_COLORS,
  MINIMAP_COLORS,
  DEFAULT_VARIANT_COLOR,
  getVariantStyle,
  getEdgeColor,
  getMiniMapColor,
} from "./variantStyles";
import type { NodeVariant } from "@/types/graph";

const ALL_VARIANTS: NodeVariant[] = [
  "meta",
  "pillar",
  "skeptic",
  "proponent",
  "crux",
  "evidence",
  "question",
];

describe("VARIANT_STYLES", () => {
  it("defines a style for every NodeVariant (exact key parity)", () => {
    expect(Object.keys(VARIANT_STYLES).sort()).toEqual([...ALL_VARIANTS].sort());
  });

  it("renders the meta claim in deep teal (#3a6965), not blue", () => {
    expect(VARIANT_STYLES.meta.accentColor).toBe("#3a6965");
  });

  it("uses no off-brand accent hexes (no #2563eb blue, no #6b5b95 violet)", () => {
    const banned = new Set(["#2563eb", "#6b5b95"]);
    for (const v of ALL_VARIANTS) {
      expect(
        banned.has(VARIANT_STYLES[v].accentColor.toLowerCase()),
        `variant ${v} uses an off-brand accent: ${VARIANT_STYLES[v].accentColor}`,
      ).toBe(false);
    }
  });
});

describe("VARIANT_EDGE_COLORS / MINIMAP_COLORS", () => {
  it("both derive from the same per-variant accent color", () => {
    for (const v of ALL_VARIANTS) {
      expect(VARIANT_EDGE_COLORS[v]).toBe(VARIANT_STYLES[v].accentColor);
      expect(MINIMAP_COLORS[v]).toBe(VARIANT_STYLES[v].accentColor);
      // Single source of truth: edge and minimap palettes never diverge.
      expect(VARIANT_EDGE_COLORS[v]).toBe(MINIMAP_COLORS[v]);
    }
  });
});

describe("variant lookup helpers", () => {
  it("getVariantStyle falls back to pillar for undefined", () => {
    expect(getVariantStyle()).toBe(VARIANT_STYLES.pillar);
    expect(getVariantStyle("crux")).toBe(VARIANT_STYLES.crux);
  });

  it("getEdgeColor returns the variant accent, else the default color", () => {
    expect(getEdgeColor("evidence")).toBe(VARIANT_STYLES.evidence.accentColor);
    expect(getEdgeColor("not-a-variant")).toBe(DEFAULT_VARIANT_COLOR);
    expect(getEdgeColor()).toBe(VARIANT_STYLES.pillar.accentColor);
  });

  it("getMiniMapColor returns the variant accent, else the default color", () => {
    expect(getMiniMapColor("skeptic")).toBe(VARIANT_STYLES.skeptic.accentColor);
    expect(getMiniMapColor()).toBe(VARIANT_STYLES.pillar.accentColor);
  });
});
