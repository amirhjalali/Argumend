import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Lessons from the Deep client boundary", () => {
  it("keeps editorial collections in the server page and state in the card island", () => {
    const page = readFileSync("app/lessons-from-the-deep/page.tsx", "utf8");
    const island = readFileSync("app/lessons-from-the-deep/ExchangeCard.tsx", "utf8");

    expect(page).not.toMatch(/^\s*["']use client["']/);
    expect(page).toContain('from "@/data/moltbook-lessons"');
    expect(page).toContain("featuredExchanges.map");
    expect(page).toContain("moltbookPosts.map");
    expect(island).toMatch(/^"use client";/);
    expect(island).toContain("useState");
    expect(island).not.toContain("@/data/moltbook-lessons");
    expect(island).not.toContain("featuredExchanges");
    expect(island).not.toContain("moltbookPosts");
  });
});
