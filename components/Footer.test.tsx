import "@/test/setup-dom";
import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ANALYZE_HREF, GITHUB_URL, LEARN_HREF, footerColumns, legalLinks } from "@/lib/nav";
import { Footer } from "./Footer";

vi.mock("@/components/NewsletterSignup", () => ({
  NewsletterSignup: () => null,
}));

describe("Footer", () => {
  afterEach(cleanup);

  it("reaches the legal pages from every page that renders the footer", () => {
    const view = render(<Footer />);
    const legal = within(view.getByRole("navigation", { name: "Legal" }));

    for (const link of legalLinks) {
      expect(legal.getByRole("link", { name: link.label }).getAttribute("href")).toBe(
        link.href,
      );
    }
  });

  it("gives every footer link a 44px touch target", () => {
    const view = render(<Footer />);
    for (const link of view.getAllByRole("link")) {
      expect(link.className, link.textContent ?? "").toContain("min-h-11");
    }
  });

  it("keeps the legal links out of the curated discovery columns", () => {
    const view = render(<Footer />);
    const columns = within(view.getByRole("navigation", { name: "Footer navigation" }));
    const columnHrefs = footerColumns.flatMap((column) =>
      column.links.map((link) => link.href),
    );

    for (const link of legalLinks) {
      expect(columnHrefs).not.toContain(link.href);
      expect(columns.queryByRole("link", { name: link.label })).toBeNull();
    }
  });

  it("lists the Argumend and More columns from lib/nav", () => {
    const view = render(<Footer />);
    const argumend = within(view.getByRole("list", { name: "Argumend" }));
    expect(argumend.getAllByRole("link").map((l) => [l.textContent, l.getAttribute("href")])).toEqual([
      ["Maps", "/topics"],
      ["Paste an argument", ANALYZE_HREF],
      ["Learn", LEARN_HREF],
      ["About", "/about"],
    ]);

    const more = within(view.getByRole("list", { name: "More" }));
    expect(more.getAllByRole("link").map((l) => l.textContent)).toEqual([
      "FAQ",
      "Methodology",
      "Saved",
      "GitHub (opens in a new tab)",
    ]);
    const github = more.getByRole("link", { name: /GitHub/ });
    expect(github.getAttribute("href")).toBe(GITHUB_URL);
    expect(github.getAttribute("target")).toBe("_blank");
    expect(github.getAttribute("rel")).toContain("noopener");
  });

  it("ends with a plain copyright line and no claims", () => {
    const view = render(<Footer />);
    expect(view.getByText("© 2026 Argumend")).toBeTruthy();
    expect(view.container.textContent).not.toMatch(/stubbornness|peer review/i);
  });
});
