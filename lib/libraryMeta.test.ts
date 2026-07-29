import { describe, it, expect } from "vitest";
import {
  libraryShelves,
  libraryShelfOrder,
  libraryResources,
  getLibraryShelf,
  groupResourcesByShelf,
  libraryCatalogNumbers,
} from "./libraryMeta";

describe("libraryMeta", () => {
  it("assigns every resource to a declared shelf (no silent fallback)", () => {
    for (const resource of libraryResources) {
      expect(libraryShelfOrder).toContain(resource.shelf);
      expect(getLibraryShelf(resource.shelf)).toBe(libraryShelves[resource.shelf]);
    }
  });

  it("falls back to foundations for an unknown shelf id", () => {
    expect(getLibraryShelf("not-a-shelf")).toBe(libraryShelves.foundations);
  });

  it("gives every resource a distinct icon", () => {
    const icons = libraryResources.map((r) => r.icon);
    expect(new Set(icons).size).toBe(libraryResources.length);
  });

  it("gives every shelf a distinct icon, numeral, and label", () => {
    const shelves = libraryShelfOrder.map((id) => libraryShelves[id]);
    expect(new Set(shelves.map((s) => s.icon)).size).toBe(shelves.length);
    expect(new Set(shelves.map((s) => s.numeral)).size).toBe(shelves.length);
    expect(new Set(shelves.map((s) => s.label)).size).toBe(shelves.length);
  });

  it("does not reuse a shelf icon as a resource icon", () => {
    const shelfIcons = new Set(libraryShelfOrder.map((id) => libraryShelves[id].icon));
    for (const resource of libraryResources) {
      expect(shelfIcons.has(resource.icon)).toBe(false);
    }
  });

  it("keys libraryShelves consistently with each entry's own id", () => {
    for (const id of libraryShelfOrder) {
      expect(libraryShelves[id].id).toBe(id);
    }
    expect(Object.keys(libraryShelves).sort()).toEqual([...libraryShelfOrder].sort());
  });

  it("groups the full catalog with no duplicates or omissions", () => {
    const groups = groupResourcesByShelf();
    expect(groups).toHaveLength(libraryShelfOrder.length);

    const total = groups.reduce((sum, g) => sum + g.items.length, 0);
    expect(total).toBe(libraryResources.length);

    const titles = new Set(groups.flatMap((g) => g.items.map((r) => r.title)));
    expect(titles.size).toBe(libraryResources.length);
  });

  it("orders groups by libraryShelfOrder and drops empty shelves", () => {
    const groups = groupResourcesByShelf();
    expect(groups.map((g) => g.shelf.id)).toEqual([...libraryShelfOrder]);

    const oneShelf = groupResourcesByShelf(
      libraryResources.filter((r) => r.shelf === "judgment")
    );
    expect(oneShelf.map((g) => g.shelf.id)).toEqual(["judgment"]);
  });

  it("preserves catalog order within each group", () => {
    for (const { items } of groupResourcesByShelf()) {
      const numbers = items.map((r) => libraryCatalogNumbers.get(r.title));
      expect(numbers).toEqual([...numbers].sort((a, b) => (a ?? 0) - (b ?? 0)));
    }
  });

  it("numbers every resource uniquely from 1..N", () => {
    expect(libraryCatalogNumbers.size).toBe(libraryResources.length);
    const numbers = [...libraryCatalogNumbers.values()].sort((a, b) => a - b);
    expect(numbers).toEqual(
      Array.from({ length: libraryResources.length }, (_, i) => i + 1)
    );
  });

  it("has unique titles and https urls", () => {
    expect(new Set(libraryResources.map((r) => r.title)).size).toBe(
      libraryResources.length
    );
    expect(new Set(libraryResources.map((r) => r.url)).size).toBe(
      libraryResources.length
    );
    for (const resource of libraryResources) {
      expect(resource.url.startsWith("https://")).toBe(true);
      expect(resource.description.length).toBeGreaterThan(0);
    }
  });

  it("stays inside the on-brand palette (no amber/tangerine/indigo/violet/sky)", () => {
    const banned = /amber|tangerine|orange|yellow|indigo|violet|sky|emerald|green|blue|purple|pink/;
    for (const id of libraryShelfOrder) {
      const shelf = libraryShelves[id];
      const classes = [shelf.chip, shelf.iconBg, shelf.iconText, shelf.hoverBorder].join(" ");
      expect(classes).not.toMatch(banned);
    }
  });
});
