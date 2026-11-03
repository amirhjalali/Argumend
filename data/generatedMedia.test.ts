import { existsSync, readFileSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { articleSummaries } from "./blogIndex";
import { generatedMedia, getGeneratedMedia, type GeneratedMediaKind } from "./generatedMedia";
import { guides } from "./guides";
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

  it("registers heroes only for maps, guides and posts that exist", () => {
    const ids: Record<GeneratedMediaKind, Set<string>> = {
      topic: new Set(topicSummaries.map((topic) => topic.id)),
      guide: new Set(guides.map((guide) => guide.id)),
      blog: new Set(articleSummaries.map((article) => article.slug)),
    };
    const folders: Record<GeneratedMediaKind, string> = { topic: "topics", guide: "guides", blog: "blog" };
    for (const item of generatedMedia) {
      expect(ids[item.kind].has(item.id), `${item.kind}:${item.id} does not exist`).toBe(true);
      expect(item.hero.src).toBe(`/images/generated/${folders[item.kind]}/${item.id}/hero.jpg`);
    }
  });

  it("serves every hero as a real JPEG of the declared size", () => {
    for (const item of generatedMedia) {
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
