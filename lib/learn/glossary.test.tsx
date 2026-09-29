import "@/test/setup-dom";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import { glossaryPageTerms } from "@/data/glossaryPageTerms";
import { GLOSSARY_ANCHOR_ALIASES, glossaryByLetter, glossaryEntries, glossaryOwnerPath } from "./glossary";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));

import GlossaryPage from "@/app/glossary/page";

afterEach(cleanup);

describe("glossary entries", () => {
  it("lists every term once, alphabetically, with stable anchors", () => {
    const entries = glossaryEntries();
    expect(entries).toHaveLength(glossaryPageTerms.length);
    const terms = entries.map((e) => e.term);
    expect(terms).toEqual([...terms].sort((a, b) => a.localeCompare(b)));
    const ids = entries.flatMap((e) => [e.id, ...e.aliases]);
    expect(new Set(ids).size).toBe(ids.length);
    expect(entries.find((e) => e.term === "Crux")?.id).toBe("crux");
  });

  it("keeps #confidence-score landing on Balance and Weight", () => {
    expect(GLOSSARY_ANCHOR_ALIASES["balance-and-weight"]).toContain("confidence-score");
    const entry = glossaryEntries().find((e) => e.id === "balance-and-weight");
    expect(entry?.aliases).toContain("confidence-score");
  });

  it("links each term to the concept or fallacy page that owns it, when one exists", () => {
    const owner = (term: string) =>
      glossaryOwnerPath(glossaryPageTerms.find((t) => t.term === term)!);
    expect(owner("Crux")).toBe("/concepts/cruxes");
    expect(owner("Steel-Manning")).toBe("/concepts/steel-manning");
    expect(owner("Ad Hominem")).toBe("/fallacies/ad-hominem");
    expect(owner("Straw Man")).toBe("/fallacies/straw-man");
    expect(owner("False Dichotomy")).toBe("/fallacies/false-dilemma");
    expect(owner("Balance and Weight")).toBe("/concepts/confidence-calibration");
    expect(owner("Anchoring")).toBeUndefined();

    const owned = glossaryEntries().filter((e) => e.readMore?.label.startsWith("Read the"));
    expect(owned.length).toBeGreaterThanOrEqual(15);
    for (const entry of owned) expect(entry.readMore!.href).toMatch(/^\/(concepts|fallacies)\/[a-z-]+$/);
  });

  it("points read-more links only at live pages, never a redirected route", () => {
    for (const entry of glossaryEntries()) {
      for (const link of [entry.readMore, entry.example]) {
        if (!link) continue;
        expect(link.href, entry.term).not.toMatch(/^\/(how-it-works|community|concepts$|guides$|library|is\/)/);
        const path = link.href.split("#")[0].replace(/^\//, "");
        const segments = path.split("/");
        if (["concepts", "fallacies", "guides", "blog", "topics"].includes(segments[0])) continue;
        expect(existsSync(join(process.cwd(), "app", path, "page.tsx")), link.href).toBe(true);
      }
    }
  });
});

describe("/glossary page", () => {
  it("renders an A–Z bar whose every letter has a target", () => {
    const view = render(<GlossaryPage />);
    const bar = within(view.getByRole("navigation", { name: "Alphabetical navigation" }));
    const letters = bar.getAllByRole("link");
    expect(letters.map((a) => a.textContent)).toEqual(glossaryByLetter().map((g) => g.letter));
    for (const link of letters) {
      expect(link.className).toContain("h-11");
      const target = link.getAttribute("href")!.slice(1);
      // The anchor is the letter group itself: "S" lands on the S terms.
      const group = view.container.querySelector(`#${target}`)!;
      expect(group.tagName).toBe("SECTION");
      expect(group.querySelector("dfn")?.textContent?.[0]).toBe(link.textContent);
    }
  });

  it("shows each term with a one-line definition and folds the rest", () => {
    const view = render(<GlossaryPage />);
    const crux = view.container.querySelector("#crux")!;
    expect(crux.querySelector("summary dfn")?.textContent).toBe("Crux");
    expect(crux.querySelector("summary")?.className).toContain("min-h-11");
    expect(crux.querySelector('a[href="/concepts/cruxes"]')).toBeTruthy();
    expect(view.container.querySelector("#confidence-score")?.closest("li")?.id).toBe("balance-and-weight");
    // No icons, chapters or duplicate A–Z list.
    expect(view.container.querySelectorAll("svg").length).toBeLessThanOrEqual(glossaryPageTerms.length + 2);
    expect(view.queryByText(/All Terms A/)).toBeNull();
  });
});
