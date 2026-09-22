import "@/test/setup-dom";
import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { footerColumns, legalLinks } from "@/lib/nav";
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

  it("gives the legal links a 44px touch target like every other footer link", () => {
    const view = render(<Footer />);
    const legal = within(view.getByRole("navigation", { name: "Legal" }));

    for (const link of legalLinks) {
      expect(legal.getByRole("link", { name: link.label }).className).toContain(
        "min-h-11",
      );
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
});
