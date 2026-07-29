import { describe, it, expect } from "vitest";
import { guides, getGuideById } from "./guides";
import { getGuideIcon, getGuideTrack } from "@/lib/guideMeta";

describe("guides data integrity", () => {
  it("has at least one guide", () => {
    expect(guides.length).toBeGreaterThan(0);
  });

  it("all guides have unique IDs", () => {
    const ids = guides.map((g) => g.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("all guides have non-empty title", () => {
    guides.forEach((g) => {
      expect(g.title.trim().length).toBeGreaterThan(0);
    });
  });

  it("all guides have non-empty subtitle", () => {
    guides.forEach((g) => {
      expect(g.subtitle.trim().length).toBeGreaterThan(0);
    });
  });

  it("all guides have non-empty description", () => {
    guides.forEach((g) => {
      expect(g.description.trim().length).toBeGreaterThan(0);
    });
  });

  it("all guides have at least 3 sections", () => {
    guides.forEach((g) => {
      expect(g.sections.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("all sections have non-empty title and content", () => {
    guides.forEach((g) => {
      g.sections.forEach((s) => {
        expect(s.title.trim().length).toBeGreaterThan(0);
        expect(s.content.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("all subsections (if present) have non-empty title and content", () => {
    guides.forEach((g) => {
      g.sections.forEach((s) => {
        if (s.subsections) {
          s.subsections.forEach((sub) => {
            expect(sub.title.trim().length).toBeGreaterThan(0);
            expect(sub.content.trim().length).toBeGreaterThan(0);
          });
        }
      });
    });
  });

  it("all guides have at least 3 key takeaways", () => {
    guides.forEach((g) => {
      expect(g.keyTakeaways.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("all key takeaways are non-empty strings", () => {
    guides.forEach((g) => {
      g.keyTakeaways.forEach((kt) => {
        expect(kt.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("all guides have at least 2 further reading items", () => {
    guides.forEach((g) => {
      expect(g.furtherReading.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("all further reading items have non-empty title and author", () => {
    guides.forEach((g) => {
      g.furtherReading.forEach((fr) => {
        expect(fr.title.trim().length).toBeGreaterThan(0);
        expect(fr.author.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("readTime follows 'X min read' format", () => {
    const pattern = /^\d+ min read$/;
    guides.forEach((g) => {
      expect(g.readTime).toMatch(pattern);
    });
  });

  it("carries no presentation fields — icon and color live in lib/guideMeta", () => {
    // The old per-guide `icon`/`color` produced duplicate icons and off-brand
    // hexes (indigo #5b6abf, amber #b37d1e). Presentation now lives in
    // lib/guideMeta.ts, keyed by id; keep the data module prose-only.
    guides.forEach((g) => {
      expect(g).not.toHaveProperty("icon");
      expect(g).not.toHaveProperty("color");
    });
  });

  it("gives every guide the distinct icon and track guideMeta maps for its id", () => {
    const icons = guides.map((g) => getGuideIcon(g.id));
    expect(new Set(icons).size).toBe(guides.length);
    guides.forEach((g) => {
      expect(getGuideTrack(g.id)).toBeDefined();
    });
  });
});

describe("getGuideById", () => {
  it("returns correct guide for existing ID", () => {
    const firstGuide = guides[0];
    const found = getGuideById(firstGuide.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(firstGuide.id);
    expect(found!.title).toBe(firstGuide.title);
  });

  it("returns undefined for non-existent ID", () => {
    const found = getGuideById("nonexistent-guide-id-xyz");
    expect(found).toBeUndefined();
  });

  it("returns each guide by its ID", () => {
    guides.forEach((g) => {
      const found = getGuideById(g.id);
      expect(found).toBeDefined();
      expect(found!.id).toBe(g.id);
    });
  });
});
