import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Button, TextAction, buttonClasses } from "./Button";

describe("Button", () => {
  afterEach(cleanup);

  it("renders the primary action as the rust gradient, 44px tall", () => {
    const view = render(<Button href="/topics">Browse maps</Button>);
    const link = view.getByRole("link", { name: "Browse maps" });
    expect(link.getAttribute("href")).toBe("/topics");
    expect(link.className).toContain("bg-gradient-to-b from-rust-600 to-rust-700");
    expect(link.className).toContain("text-white");
    expect(link.className).toContain("rounded-lg");
    expect(link.className).toContain("min-h-11");
    expect(link.className).toMatch(/focus-visible:ring-2/);
  });

  it("renders a type=button element without href and forwards clicks", () => {
    const onClick = vi.fn();
    const view = render(
      <Button variant="secondary" onClick={onClick}>
        Cancel
      </Button>,
    );
    const button = view.getByRole("button", { name: "Cancel" });
    expect(button.getAttribute("type")).toBe("button");
    expect(button.className).not.toContain("from-rust-600");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("keeps submit buttons submit, and disabled buttons disabled", () => {
    const view = render(
      <Button type="submit" disabled>
        Send
      </Button>,
    );
    const button = view.getByRole("button", { name: "Send" });
    expect(button.getAttribute("type")).toBe("submit");
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it("gives each variant and size a different look", () => {
    const variants = ["primary", "secondary", "quiet"] as const;
    const classes = variants.map((variant) => buttonClasses({ variant }));
    expect(new Set(classes).size).toBe(3);
    expect(buttonClasses({ size: "lg" })).toContain("min-h-12");
    for (const cls of classes) expect(cls).toContain("min-h-11");
  });

  it("never uses amber, orange or crux crimson for an action", () => {
    for (const variant of ["primary", "secondary", "quiet"] as const) {
      expect(buttonClasses({ variant })).not.toMatch(/amber|orange|crux/);
    }
  });
});

describe("TextAction", () => {
  afterEach(cleanup);

  it("renders the underlined teal quiet action as a link or a button", () => {
    const view = render(
      <>
        <TextAction href="/analyze">Paste an argument</TextAction>
        <TextAction onClick={() => {}}>See an example</TextAction>
      </>,
    );
    const link = view.getByRole("link", { name: "Paste an argument" });
    const button = view.getByRole("button", { name: "See an example" });
    for (const el of [link, button]) {
      expect(el.className).toContain("underline");
      expect(el.className).toContain("text-deep");
      expect(el.className).toContain("dark:text-accent-text");
      expect(el.className).toContain("min-h-11");
    }
    expect(button.getAttribute("type")).toBe("button");
  });
});
