import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { RouteNotFound } from "./RouteNotFound";

describe("RouteNotFound", () => {
  afterEach(cleanup);

  it("renders a named page landmark and keyboard-sized recovery links", () => {
    const view = render(
      <RouteNotFound
        eyebrow="Topic unavailable"
        title="We could not find this argument map"
        description="Choose another topic."
        primaryHref="/topics"
        primaryLabel="Browse Topics"
      />,
    );

    const heading = view.getByRole("heading", {
      level: 1,
      name: "We could not find this argument map",
    });
    const main = view.getByRole("main");
    expect(main.getAttribute("id")).toBe("main-content");
    expect(heading.getAttribute("id")).toBe("route-not-found-title");
    expect(view.getByRole("navigation", { name: "Not found navigation" })).toBeTruthy();

    const links = view.getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["/topics", "/"]);
    for (const link of links) expect(link.className).toContain("min-h-11");
  });
});
