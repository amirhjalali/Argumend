import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/missing",
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock("next/dynamic", () => ({ default: () => () => null }));
vi.mock("@/components/NewsletterSignup", () => ({ NewsletterSignup: () => null }));

import { RouteNotFound } from "./RouteNotFound";

describe("RouteNotFound", () => {
  afterEach(cleanup);

  it("renders inside the shell with a named h1 and keyboard-sized recovery links", () => {
    const view = render(
      <RouteNotFound
        eyebrow="Topic unavailable"
        title="We could not find this argument map"
        description="Choose another topic."
        primaryHref="/topics"
        primaryLabel="Browse maps"
      />,
    );

    const heading = view.getByRole("heading", {
      level: 1,
      name: "We could not find this argument map",
    });
    const main = view.getByRole("main");
    expect(main.getAttribute("id")).toBe("main-content");
    expect(heading.getAttribute("id")).toBe("route-not-found-title");
    // The shell's header and footer are there, so a dead link is not a dead end.
    expect(view.container.querySelector('header[role="banner"]')).toBeTruthy();
    expect(view.getByRole("contentinfo")).toBeTruthy();

    const recovery = within(view.getByRole("navigation", { name: "Not found navigation" }));
    const links = recovery.getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["/topics", "/"]);
    expect(links.map((link) => link.textContent)).toEqual(["Browse maps", "Back to home"]);
    for (const link of links) expect(link.className).toContain("min-h-11");
    // One rust fill: the primary action only.
    expect(links[0].className).toContain("from-rust-600");
    expect(links[1].className).not.toContain("from-rust-600");
  });

  it("takes a custom second way out", () => {
    const view = render(
      <RouteNotFound
        eyebrow="404"
        title="Insufficient evidence for this page"
        description="Not mapped yet."
        primaryHref="/topics"
        primaryLabel="Browse maps"
        secondaryHref="/analyze"
        secondaryLabel="Paste an argument"
      />,
    );
    const recovery = within(view.getByRole("navigation", { name: "Not found navigation" }));
    expect(recovery.getByRole("link", { name: "Paste an argument" }).getAttribute("href")).toBe(
      "/analyze",
    );
  });
});
