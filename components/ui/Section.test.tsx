import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Section } from "./Section";

describe("Section", () => {
  afterEach(cleanup);

  it("opens with a hairline and a serif h2 that names the section", () => {
    const view = render(
      <Section id="cruxes" title="Cruxes" lede="What would change a mind." aside="3 of 5">
        <p>Body</p>
      </Section>,
    );
    const section = view.getByRole("region", { name: "Cruxes" });
    expect(section.id).toBe("cruxes");
    expect(section.className).toContain("border-t");
    const heading = view.getByRole("heading", { level: 2, name: "Cruxes" });
    expect(heading.id).toBe("cruxes-heading");
    expect(heading.className).toMatch(/font-serif/);
    expect(view.getByText("What would change a mind.")).toBeTruthy();
    expect(view.getByText("3 of 5").className).toMatch(/text-muted/);
    expect(view.getByText("Body")).toBeTruthy();
  });

  it("renders an h3 when nested", () => {
    const view = render(<Section level={3} title="Evidence" />);
    expect(view.getByRole("heading", { level: 3, name: "Evidence" })).toBeTruthy();
    expect(view.queryByRole("heading", { level: 2 })).toBeNull();
  });

  it("only labels the section when it has an id to label it with", () => {
    const view = render(<Section title="Untitled anchor" />);
    expect(view.container.querySelector("section")!.hasAttribute("aria-labelledby")).toBe(false);
  });
});
