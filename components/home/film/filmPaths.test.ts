import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FILM } from "@/components/home/filmManifest";
import {
  coverRect,
  firstPassLength,
  frameUrl,
  loadOrder,
  nearestLoaded,
  stillUrl,
} from "@/components/home/film/filmPaths";

const PUBLIC = join(process.cwd(), "public");

describe("home film: frames on disk match the manifest", () => {
  for (const theme of FILM.themes) {
    for (const variant of ["desktop", "mobile"] as const) {
      const set = FILM[variant];
      it(`${theme} ${variant}: ${set.frames} frames and six stills`, () => {
        const dir = join(PUBLIC, FILM.base, theme, set.dir);
        const files = readdirSync(dir)
          .filter((name) => name.endsWith(".webp"))
          .sort();
        expect(files).toHaveLength(set.frames);
        expect(files[0]).toBe("001.webp");
        expect(
          existsSync(join(PUBLIC, frameUrl(theme, variant, set.frames - 1))),
        ).toBe(true);
        for (let beat = 0; beat < FILM.beats.length; beat += 1) {
          expect(
            existsSync(join(PUBLIC, stillUrl(theme, variant, beat))),
            `still ${beat}`,
          ).toBe(true);
        }
      });

      it(`${theme} ${variant}: the sequence stays inside its byte budget`, () => {
        const dir = join(PUBLIC, FILM.base, theme, set.dir);
        const bytes = readdirSync(dir).reduce(
          (sum, name) => sum + statSync(join(dir, name)).size,
          0,
        );
        // A visitor downloads one set. Desktop 8 MB, phone 3 MB.
        expect(bytes).toBeLessThanOrEqual(
          (variant === "desktop" ? 8 : 3) * 1024 * 1024,
        );
      });
    }
  }

  it("has a beat per step, from the first frame to the last", () => {
    expect(FILM.beats[0]).toBe(0);
    expect(FILM.beats[FILM.beats.length - 1]).toBe(1);
    expect(FILM.counts.agreed + FILM.counts.contested).toBe(FILM.counts.claims);
  });
});

describe("home film: loading and drawing", () => {
  it("fetches every frame once, coarse first, with both ends in the first pass", () => {
    const order = loadOrder(150);
    expect(new Set(order).size).toBe(150);
    expect(order).toHaveLength(150);
    expect(order.slice(0, 2)).toEqual([0, 149]);
    // The first dozen cover the whole film.
    expect(Math.max(...order.slice(0, 12))).toBe(149);
    expect(order.slice(2, 11).every((index) => index % 16 === 0)).toBe(true);
  });

  it("holds most of the film back until the first scroll", () => {
    for (const count of [150, 75]) {
      const first = firstPassLength(count);
      const pass = loadOrder(count).slice(0, first);
      // The first pass is both ends, every 16th frame and the opening run.
      expect(pass).toContain(0);
      expect(pass).toContain(count - 1);
      for (let index = 0; index < Math.ceil(count * 0.1); index += 1)
        expect(pass).toContain(index);
      expect(
        pass.every(
          (index) =>
            index % 16 === 0 || index === count - 1 || index < count * 0.1,
        ),
      ).toBe(true);
      // And it is a small part of the whole.
      expect(first).toBeLessThan(count / 4);
    }
  });

  it("draws the nearest frame that has arrived", () => {
    const loaded = Array.from({ length: 20 }, () => false);
    expect(nearestLoaded(loaded, 7)).toBe(-1);
    loaded[0] = true;
    loaded[16] = true;
    expect(nearestLoaded(loaded, 7)).toBe(0);
    expect(nearestLoaded(loaded, 9)).toBe(16);
    expect(nearestLoaded(loaded, 99)).toBe(16);
    loaded[9] = true;
    expect(nearestLoaded(loaded, 9.4)).toBe(9);
  });

  it("covers the box and keeps the focal point in view", () => {
    // A 16:9 frame in a narrower box: full height, cropped at the sides,
    // mostly from the left because the subject sits right of centre.
    const box = coverRect(1600, 900, 1000, 900, 0.68, 0.5);
    expect(box.height).toBe(900);
    expect(box.width).toBe(1600);
    expect(box.x).toBeCloseTo(-408);
    expect(box.x + box.width).toBeGreaterThanOrEqual(1000);
    expect(box.y).toBeCloseTo(0);
  });
});
