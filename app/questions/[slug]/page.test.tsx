import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

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
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import QuestionPage, { generateMetadata, generateStaticParams } from "./page";

afterEach(cleanup);

/** Chrome words a question page must never print: it is not a fact-check. */
const VERDICT_WORDING = [/fact-?checked/i, /the evidence assessment is/i, /\bVerdict\b/];

async function renderQuestion(slug: string) {
  return render(await QuestionPage({ params: Promise.resolve({ slug }) }));
}

describe("question pages are crux-first and never a verdict", () => {
  it.each([
    "is-nuclear-energy-safe",
    "should-we-build-more-nuclear-power-plants",
    "is-fluoride-in-water-safe",
    "are-gmo-crops-safe-to-eat",
  ])("%s prints no verdict wording, on the page or in its JSON-LD", async (slug) => {
    const view = await renderQuestion(slug);
    const html = view.container.innerHTML;
    for (const pattern of VERDICT_WORDING) expect(html).not.toMatch(pattern);
    // The balance/weight readout belongs to the map, not to a question page.
    expect(html).not.toMatch(/balance of evidence|weight of evidence/i);
  });

  it("leads with the map's first crux and its settle line, then sends the reader to the map", async () => {
    const view = await renderQuestion("is-nuclear-energy-safe");
    expect(view.getByRole("heading", { level: 1, name: "Is nuclear energy safe?" })).toBeTruthy();
    expect(view.getByText("A question of fact.")).toBeTruthy();

    // The first h2 is the map's first crux question, worded as on the map.
    const { loadTopicById } = await import("@/data/topicLoader");
    const { legacyTopicPage } = await import("@/lib/topicPage/legacy");
    const topic = await loadTopicById("nuclear-energy-safety");
    const { cruxes } = legacyTopicPage(topic!);
    const headings = Array.from(view.container.querySelectorAll("h2")).map((h) => h.textContent);
    expect(headings[0]).toBe(cruxes[0].question);

    // Its settle line sits in the lead block, with the one prominent map link.
    const lead = view.container.querySelector<HTMLElement>("#crux")!;
    expect(lead.textContent).toContain("What would settle it");
    expect(lead.querySelector("[data-settle]")).not.toBeNull();
    const open = Array.from(lead.querySelectorAll("a")).find((a) => a.textContent === "Open the full map →");
    expect(open?.getAttribute("href")).toBe("/topics/nuclear-energy-safety");
    expect(
      Array.from(lead.querySelectorAll("a")).some(
        (a) => a.getAttribute("href") === `/topics/nuclear-energy-safety#${cruxes[0].anchor}`,
      ),
    ).toBe(true);

    // Then the other crux questions by name, each linked into the map;
    // their settle lines, the evidence and the two sides stay on the map.
    const at = (text: string) => headings.indexOf(text);
    expect(at("It also turns on")).toBeGreaterThan(0);
    expect(at("It also turns on")).toBeLessThan(at("What both sides already agree on"));
    expect(at("What both sides already agree on")).toBeLessThan(at("Next step"));
    for (const crux of cruxes.slice(1)) {
      expect(
        view.getByRole("link", { name: crux.question }).getAttribute("href"),
      ).toBe(`/topics/nuclear-energy-safety#${crux.anchor}`);
    }
    expect(view.getAllByText("What would settle it")).toHaveLength(1);
    expect(headings).not.toContain("The two sides");
    expect(headings.some((h) => /^This turns on/.test(h ?? ""))).toBe(false);

    const map = view.getByRole("link", { name: /Read the whole map/i });
    expect(map.getAttribute("href")).toBe("/topics/nuclear-energy-safety");
  });

  it("lists related questions by subject, never itself", async () => {
    const view = await renderQuestion("is-nuclear-energy-safe");
    const related = view.container.querySelector<HTMLElement>("#related")!;
    const hrefs = Array.from(related.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).toHaveLength(3);
    expect(hrefs).not.toContain("/questions/is-nuclear-energy-safe");
    // The other nuclear-power map comes first, as on the map page.
    const { getPrimaryQuestionSlug } = await import("@/lib/questions");
    expect(hrefs[0]).toBe(`/questions/${getPrimaryQuestionSlug("nuclear-renaissance-smr")}`);
    expect(hrefs.join(" ")).not.toMatch(/healthcare|gun/);
  });

  it("describes the crux, not a verdict, in its QAPage answer", async () => {
    const view = await renderQuestion("is-nuclear-energy-safe");
    const scripts = Array.from(
      view.container.querySelectorAll('script[type="application/ld+json"]'),
    ).map((s) => JSON.parse(s.innerHTML.replace(/\\u003c/g, "<")));
    const qa = scripts.find((data) => data["@type"] === "QAPage");
    expect(qa).toBeTruthy();
    const answer: string = qa.mainEntity.acceptedAnswer.text;
    expect(answer).toMatch(/^This question turns on \w+ questions?\./);
    expect(answer).toContain("What would settle it:");
    expect(answer).toContain("It also turns on:");
    // Only the lead crux's settle line is on the page, so only it is in the answer.
    expect(answer.match(/What would settle it:/g)).toHaveLength(1);
    for (const pattern of VERDICT_WORDING) expect(answer).not.toMatch(pattern);
  });

  it("lists the other phrasings and points their canonical at the primary", async () => {
    const primary = await renderQuestion("is-nuclear-energy-safe");
    expect(
      primary.getByRole("link", { name: "Should we build more nuclear power plants?" }).getAttribute("href"),
    ).toBe("/questions/should-we-build-more-nuclear-power-plants");
    cleanup();

    const secondaryMeta = await generateMetadata({
      params: Promise.resolve({ slug: "should-we-build-more-nuclear-power-plants" }),
    });
    expect(secondaryMeta.alternates?.canonical).toBe(
      "https://argumend.org/questions/is-nuclear-energy-safe",
    );
    const primaryMeta = await generateMetadata({
      params: Promise.resolve({ slug: "is-nuclear-energy-safe" }),
    });
    expect(primaryMeta.alternates?.canonical).toBe(
      "https://argumend.org/questions/is-nuclear-energy-safe",
    );
  });

  it("keeps every phrasing a real page", () => {
    const slugs = generateStaticParams().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain("should-we-build-more-nuclear-power-plants");
  });
});
