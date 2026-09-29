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

  it("orders the page: kind of question, agreement, cruxes, the two sides, then the map", async () => {
    const view = await renderQuestion("is-nuclear-energy-safe");
    expect(view.getByRole("heading", { level: 1, name: "Is nuclear energy safe?" })).toBeTruthy();
    expect(view.getByText("A question of fact.")).toBeTruthy();

    const headings = Array.from(view.container.querySelectorAll("h2")).map((h) => h.textContent);
    const at = (text: string | RegExp) =>
      headings.findIndex((h) => (typeof text === "string" ? h === text : text.test(h ?? "")));
    expect(at("What both sides already agree on")).toBeGreaterThanOrEqual(0);
    expect(at("What both sides already agree on")).toBeLessThan(at(/^This turns on/));
    expect(at(/^This turns on/)).toBeLessThan(at("The two sides"));
    expect(at("The two sides")).toBeLessThan(at("Next step"));
    expect(view.getAllByText("What would settle it").length).toBeGreaterThan(0);

    const map = view.getByRole("link", { name: /Read the whole map/i });
    expect(map.getAttribute("href")).toBe("/topics/nuclear-energy-safety");
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
