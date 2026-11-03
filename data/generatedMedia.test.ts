import { existsSync, readFileSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { generatedMedia, getGeneratedMedia } from "./generatedMedia";
import { topicSummaries } from "./topicIndex";

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

  it("registers topic heroes only for maps that exist, as real JPEGs of the declared size", () => {
    const topicIds = new Set(topicSummaries.map((topic) => topic.id));
    for (const item of generatedMedia.filter((media) => media.kind === "topic")) {
      expect(topicIds.has(item.id), `topic:${item.id} is not a map id`).toBe(true);

      const bytes = readFileSync(path.join(process.cwd(), "public", item.hero.src.slice(1)));
      expect(bytes[0], item.id).toBe(0xff);
      expect(bytes[1], item.id).toBe(0xd8);
      expect(jpegDimensions(bytes), item.id).toEqual({
        width: item.hero.width,
        height: item.hero.height,
      });
      // Keep repo weight sensible: one hero stays well under a megabyte.
      expect(bytes.length, item.id).toBeLessThan(800 * 1024);
    }
  });
});

// Width and height from the first start-of-frame marker (SOF0-SOF15, minus
// DHT/JPG/DAC), which baseline and progressive JPEGs both carry.
function jpegDimensions(bytes: Buffer): { width: number; height: number } {
  let offset = 2;
  while (offset < bytes.length) {
    if (bytes[offset] !== 0xff) throw new Error(`bad JPEG marker at ${offset}`);
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return {
        height: bytes.readUInt16BE(offset + 5),
        width: bytes.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  throw new Error("no JPEG frame header");
}
