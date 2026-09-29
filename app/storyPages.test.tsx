import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));

import AboutPage from "./about/page";
import MethodologyPage from "./methodology/page";
import { metadata as aboutMetadata } from "./about/layout";
import { metadata as methodologyMetadata } from "./methodology/layout";

afterEach(cleanup);

/**
 * The story pages must tell the product as it runs: no judge council, no
 * score aggregation, no verdict matrix, no "who is right". (The judging API
 * is off by default and no map is made that way.)
 */
const FORBIDDEN = ["judge", "Judge", "verdict matrix", "Score Aggregation", "who is right"];

describe.each([
  ["/about", AboutPage],
  ["/methodology", MethodologyPage],
])("%s", (_route, Page) => {
  it("renders none of the retired scoring story", () => {
    const view = render(<Page />);
    // The one paragraph kept verbatim from the old page ("When settled is
    // withheld") uses "judge" as a verb and "judgement call"; it is checked
    // word for word below, and excluded here.
    const copy = view.container.cloneNode(true) as HTMLElement;
    copy.querySelectorAll("[data-kept]").forEach((node) => node.remove());
    copy.querySelectorAll("script").forEach((node) => node.remove());
    const text = copy.textContent ?? "";
    for (const phrase of FORBIDDEN) {
      expect(text, `found "${phrase}"`).not.toContain(phrase);
    }
    expect(text).not.toMatch(/ChatGPT|GPT-4|Gemini/);
    expect(text).not.toMatch(/Our Mission|Transform How People Disagree/i);
  });

  it("is one left-aligned document with a single h1", () => {
    const view = render(<Page />);
    expect(view.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(view.container.innerHTML).not.toContain("text-center");
    expect(view.container.innerHTML).not.toMatch(/shadow-(md|lg|card)/);
  });
});

describe("/about", () => {
  it("carries every anchored section the redirects and links point at", () => {
    const view = render(<AboutPage />);
    for (const id of ["why", "principles", "read-a-map", "how-maps-are-made", "faq", "contribute"]) {
      expect(view.container.querySelector(`section#${id}`), `#${id}`).not.toBeNull();
    }
  });

  it("keeps the three principles and the /how-it-works steps", () => {
    const view = render(<AboutPage />);
    const text = view.container.textContent ?? "";
    expect(text).toContain("Crux over verdict.");
    expect(text).toContain("Never a winner, always the other side’s best card.");
    expect(text).toContain("Voluntary before imposed.");
    expect(text).toContain("It records movement, not a winner.");
    // The legacy anatomy and the invented example citation are gone.
    expect(text).not.toContain("NRC Safety Report 2023");
    expect(text).not.toMatch(/Meta Claim|five types of nodes/i);
    expect(text).not.toMatch(/balance and weight/i);
  });

  it("links the public write-up behind its numbers, and GitHub for contributions", () => {
    const view = render(<AboutPage />);
    const hrefs = [...view.container.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/blog/we-gave-a-model-that-cant-talk-1000-arguments");
    expect(hrefs).toContain("https://github.com/amirhjalali/Argumend");
    expect(hrefs).toContain("/methodology");
    expect(hrefs).toContain("/faq");
    expect(hrefs).not.toContain("/community");
    expect(hrefs).not.toContain("/how-it-works");
  });

  it("drops the mission-speak title", () => {
    const title = (aboutMetadata.title as { absolute: string }).absolute;
    expect(title).not.toMatch(/Mission|Transform/);
    expect(String(aboutMetadata.description)).not.toMatch(/balance and weight/i);
  });
});

describe("/methodology", () => {
  it("is titled 'How maps are made'", () => {
    const view = render(<MethodologyPage />);
    expect(view.getByRole("heading", { level: 1 }).textContent).toBe("How maps are made");
    expect(methodologyMetadata.title).toBe("How maps are made");
    expect(String(methodologyMetadata.description)).not.toMatch(/score/i);
  });

  it("keeps the 'When settled is withheld' paragraph verbatim", () => {
    const view = render(<MethodologyPage />);
    const kept = view.container.querySelectorAll("[data-kept]");
    expect(kept).toHaveLength(1);
    expect(kept[0].textContent?.replace(/\s+/g, " ").trim()).toBe(
      "When “settled” is withheld. Whether one piece of evidence counts for a claim or against it is a " +
        "judgement call, and on a map of a dozen cards one such call can move the balance by ten points — " +
        "half the gap “evidence largely converges” requires. So we test it: if reclassifying any single " +
        "card would take the word away, the map hasn’t earned it, and we show its lean instead. Either way " +
        "those maps carry a note saying one card could change the reading. A handful of questions where we judge " +
        "the evidence to have converged in the world — the moon landing — keep that reading on our own " +
        "editorial judgement while their maps are still too shallow to show it; those say so in the same line, " +
        "and deepening the map is the fix. The balance and weight numbers are never adjusted; only the reading is.",
    );
  });

  it("describes the four measures, the side audit, the crux engine and the ledger", () => {
    const view = render(<MethodologyPage />);
    const text = view.container.textContent ?? "";
    for (const measure of ["Source reliability", "Independence", "Replicability", "Directness"]) {
      expect(text).toContain(measure);
    }
    expect(text).toContain("not by who cites it");
    expect(text).toContain("deterministic engine");
    expect(text).toContain("nothing reaches the page until a person has reviewed it");
  });
});
