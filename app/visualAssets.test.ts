import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "./manifest";

function pngDimensions(filePath: string): { width: number; height: number } {
  const bytes = readFileSync(filePath);
  expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

describe("visual asset contracts", () => {
  it("keeps install and social artwork present at its declared dimensions", () => {
    const icon = path.join(process.cwd(), "public/icon.png");
    const social = path.join(process.cwd(), "public/og.png");

    expect(pngDimensions(icon)).toEqual({ width: 512, height: 512 });
    expect(pngDimensions(social)).toEqual({ width: 1200, height: 630 });
    expect(manifest().icons).toContainEqual({
      src: "/icon.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    });
  });

  it("does not serve JPEG perspective artwork under PNG filenames", () => {
    const page = readFileSync(
      path.join(process.cwd(), "app/perspectives/page.tsx"),
      "utf8",
    );
    const references = [...page.matchAll(/imageSrc: "(\/images\/perspectives\/[^"]+)"/g)]
      .map((match) => match[1]);

    expect(references).toHaveLength(7);
    for (const reference of references) {
      expect(reference).toMatch(/\.jpg$/);
      const filePath = path.join(process.cwd(), "public", reference.slice(1));
      expect(existsSync(filePath), `missing ${reference}`).toBe(true);
      const bytes = readFileSync(filePath);
      expect(bytes[0]).toBe(0xff);
      expect(bytes[1]).toBe(0xd8);
      expect(bytes.at(-2)).toBe(0xff);
      expect(bytes.at(-1)).toBe(0xd9);
    }
  });
});
