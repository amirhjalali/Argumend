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
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));

import ConceptDetailPage, { generateMetadata, generateStaticParams } from "./page";

afterEach(cleanup);

async function renderConcept(slug: string) {
  return render(await ConceptDetailPage({ params: Promise.resolve({ slug }) }));
}

describe("/concepts/cruxes", () => {
  it("defines a crux as the question a fight turns on, and what would settle it", async () => {
    const view = await renderConcept("cruxes");
    expect(view.getByRole("heading", { level: 1, name: "Cruxes" })).toBeTruthy();
    // The lede is the definition, word for word.
    expect(view.getByText("A crux is the question a fight turns on, and what would settle it.")).toBeTruthy();
    const text = view.container.textContent ?? "";
    expect(text).not.toMatch(/piece of evidence/i);
    expect(text).not.toMatch(/verification status/i);
  });

  it("uses a real flagship crux and the ledger's own labels", async () => {
    const text = (await renderConcept("cruxes")).container.textContent ?? "";
    expect(text).toContain("When AI makes a firm more productive, does it hire fewer people — or just sell more?");
    expect(text).toContain("How this has moved");
    expect(text).toContain("Unresolvable by evidence");
  });

  it("puts the definition in the page description too", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "cruxes" }) });
    expect(meta.description).toMatch(/^A crux is the question a fight turns on, and what would settle it\./);
  });
});

describe("concept routes and metadata", () => {
  it("generates the four core ideas, and no pages for balance and weight or pillars", () => {
    const slugs = generateStaticParams().map((p) => p.slug);
    expect(slugs).toEqual(["steel-manning", "cruxes", "evidence-weighting", "fallacies"]);
    expect(slugs).not.toContain("confidence-calibration");
    expect(slugs).not.toContain("pillars");
  });

  it("keeps unknown concepts out of search results", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "missing-concept" }) });
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it("uses a typographic separator in page and social titles", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "steel-manning" }) });
    expect(metadata.title).toBe("Steel-manning — Key Concept");
    expect(metadata.openGraph?.title).toBe("Steel-manning — Key Concept");
  });
});
