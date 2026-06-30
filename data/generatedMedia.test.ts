import { existsSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { generatedMedia, getGeneratedMedia } from "./generatedMedia";

describe("generatedMedia", () => {
  it("has unique keys and resolvable lookup entries", () => {
    const keys = generatedMedia.map((item) => `${item.kind}:${item.id}`);
    expect(new Set(keys).size).toBe(keys.length);

    for (const item of generatedMedia) {
      expect(getGeneratedMedia(item.kind, item.id)).toBe(item);
    }
  });

  it("points every manifest image at an existing public asset", () => {
    for (const item of generatedMedia) {
      expect(item.hero.src).toMatch(/^\/images\/generated\//);
      expect(item.hero.src).toMatch(/\/hero\.jpg$/);
      expect(item.hero.width).toBeGreaterThan(0);
      expect(item.hero.height).toBeGreaterThan(0);
      expect(item.hero.alt.length).toBeGreaterThan(20);
      expect(item.hero.prompt.length).toBeGreaterThan(40);

      const filePath = path.join(process.cwd(), "public", item.hero.src.slice(1));
      expect(existsSync(filePath), `${item.kind}:${item.id} missing ${item.hero.src}`).toBe(true);
    }
  });
});
