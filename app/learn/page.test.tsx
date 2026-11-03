import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));

import LearnPage from "./page";
import { LEARN_HUB_SECTIONS } from "@/lib/learn/sections";

afterEach(cleanup);

/** Each hub section's links, by section id. */
function sectionLinks(container: HTMLElement): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const { id } of LEARN_HUB_SECTIONS) {
    const section = container.querySelector<HTMLElement>(`[id="${id}"]`);
    out[id] = section
      ? Array.from(section.querySelectorAll<HTMLAnchorElement>("a[href]")).map((a) => a.getAttribute("href")!)
      : [];
  }
  return out;
}

describe("/learn hub (round-10 review)", () => {
  it("lists each piece once, in one section", () => {
    const view = render(<LearnPage />);
    const seen = new Map<string, string>();
    const twice: string[] = [];
    for (const [section, hrefs] of Object.entries(sectionLinks(view.container))) {
      for (const href of hrefs) {
        const other = seen.get(href);
        if (other && other !== section) twice.push(`${href} in ${other} and ${section}`);
        seen.set(href, section);
      }
    }
    expect(twice).toEqual([]);
  });

  it("puts the fallacies idea with the fallacies, not under Core ideas", () => {
    const links = sectionLinks(render(<LearnPage />).container);
    expect(links.ideas).not.toContain("/concepts/fallacies");
    expect(links.fallacies[0]).toBe("/concepts/fallacies");
  });

  it("starts with the map-reading guide, and labels each item for what it is", () => {
    const view = render(<LearnPage />);
    const links = sectionLinks(view.container);
    expect(links.start).toContain("/guides/how-to-read-an-argument-map");
    expect(links.start).not.toContain("/about#read-a-map");
    expect(links.guides).not.toContain("/guides/how-to-read-an-argument-map");

    const factOrValue = view.container.querySelector<HTMLElement>('[id="ideas"] a[href="/questions#fact-or-value"]')!;
    const item = factOrValue.closest("li") ?? factOrValue;
    expect(item.textContent).toContain("Idea · the four kinds of question");
    expect(item.textContent).not.toMatch(/(^|\W)Questions(\W|$)/);
  });
});
