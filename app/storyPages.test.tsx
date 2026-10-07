import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { loadHomeCrux } from "@/components/home/homeModel";
import { retiredTermsIn } from "@/lib/learn/retiredVocabulary";

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

/** Every `/about#anchor` the site links to or redirects to, read from source. */
function aboutAnchorsLinkedFromElsewhere(): string[] {
  const anchors = new Set<string>();
  const visit = (entry: string) => {
    const full = path.join(process.cwd(), entry);
    if (statSync(full).isDirectory()) {
      for (const child of readdirSync(full)) {
        if (child === "node_modules" || child.startsWith(".")) continue;
        visit(path.join(entry, child));
      }
      return;
    }
    if (!/\.(tsx?|js|mdx?)$/.test(entry) || /\.test\.tsx?$/.test(entry)) return;
    if (entry.startsWith(path.join("app", "about"))) return;
    for (const match of readFileSync(full, "utf8").matchAll(/\/about#([\w-]+)/g)) {
      anchors.add(match[1]);
    }
  };
  for (const root of ["app", "components", "data", "lib", "next.config.js"]) visit(root);
  return [...anchors].sort();
}

describe("/about", () => {
  it("carries every anchored section the redirects and links point at", () => {
    const linked = aboutAnchorsLinkedFromElsewhere();
    // /how-it-works and /community redirect to these two, and Learn, search,
    // the FAQ and the glossary link to them.
    expect(linked).toEqual(expect.arrayContaining(["read-a-map", "contribute"]));
    const view = render(<AboutPage />);
    for (const id of new Set([...linked, "why", "principles", "how-maps-are-made"])) {
      expect(view.container.querySelector(`section#${id}`), `#${id}`).not.toBeNull();
    }
  });

  it("reads a map from one real crux card: the flagship's crux #1, as the map shows it", () => {
    const crux = loadHomeCrux();
    expect(crux).not.toBeNull();
    const view = render(<AboutPage />);
    const section = view.container.querySelector("section#read-a-map")!;
    const card = section.querySelector(`[data-worked-crux="${crux!.claimId}"]`);
    expect(card, "the crux card").not.toBeNull();
    expect(crux!.claimId).toBe("c-firms-cut-hiring-not-output");
    expect(within(card as HTMLElement).getByRole("heading", { level: 3 }).textContent).toBe(
      "When AI makes a firm more productive, does it hire fewer people — or just sell more?",
    );
    // The map's own settle line, verbatim.
    expect(card!.textContent).toContain("What would settle it");
    expect(card!.textContent).toContain(
      "Firm-level panels linking AI adoption to headcount, output, and pricing decisions over multiple years.",
    );
    // Defined the way Learn defines it.
    expect(section.textContent).toContain("A crux is the question a fight turns on, and what would settle it.");
    expect(section.textContent).toContain("It records movement, not a winner.");
    const hrefs = [...section.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/topics/ai-mass-unemployment");
  });

  it("keeps the rules: settle over verdict, never a winner, sources shown, voluntary", () => {
    const view = render(<AboutPage />);
    const text = view.container.textContent ?? "";
    expect(text).toContain("What would settle it, not who won.");
    expect(text).toContain("Never a winner.");
    expect(text).toContain("Sources shown.");
    expect(text).toContain("Voluntary before imposed.");
    // The legacy anatomy and the invented example citation are gone.
    expect(text).not.toContain("NRC Safety Report 2023");
    expect(text).not.toMatch(/Meta Claim|five types of nodes/i);
  });

  it("claims only what runs: no constructed thread as a finding, no diagram on 'most maps'", () => {
    const view = render(<AboutPage />);
    const text = (view.container.textContent ?? "").replace(/\s+/g, " ");
    // r3 review #12: the rent-control thread was written for the post, so it
    // is not a finding about real arguments.
    expect(text).not.toMatch(/written to mirror|rent-control thread/i);
    // Flagship maps have no diagram; phones get an outline.
    expect(text).not.toMatch(/most maps also have an interactive diagram/i);
    expect(text).toContain("The two-sided maps, which set a skeptic’s case against the best reply, also have a diagram");
    // Maps are named by shape, not by age.
    expect(text).not.toMatch(/\b(older|newer) maps?\b/i);
    expect(text).toContain("an outline on a phone");
    // The card weighting the overhaul retired from the interface.
    expect(text).not.toMatch(/challenge a weighting|four measures/i);
  });

  it("uses none of the retired vocabulary", () => {
    const view = render(<AboutPage />);
    const text = view.container.textContent ?? "";
    expect(retiredTermsIn(text)).toEqual([]);
    expect(retiredTermsIn(String(aboutMetadata.description))).toEqual([]);
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

  it("says the one-line reading was removed, without describing a lean or a score", () => {
    const view = render(<MethodologyPage />);
    const text = (view.container.textContent ?? "").replace(/\s+/g, " ");
    expect(view.container.querySelectorAll("[data-kept]")).toHaveLength(0);
    expect(text).toContain(
      "The two-sided maps once printed a one-line reading of where their cards tipped. It read as a verdict, so it was removed.",
    );
    expect(text).not.toMatch(/out of 40|0 to 10|leans one way|moon landing|open API/i);
    expect(text).not.toMatch(/\b(older|newer) maps?\b/i);
  });

  it("describes the four measures, the side audit, the crux engine and the ledger", () => {
    const view = render(<MethodologyPage />);
    const text = view.container.textContent ?? "";
    for (const measure of ["Source reliability", "Independence", "Replicability", "Directness"]) {
      expect(text).toContain(measure);
    }
    expect(text).toContain("not by who cites it");
    expect(text).toContain("deterministic engine");
    expect(text.replace(/\s+/g, " ")).toContain("A crux is the question a fight turns on, and what would settle it.");
    expect(text).toContain("nothing reaches the page until a person has reviewed it");
  });
});
