import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { RouteErrorState } from "./RouteErrorState";

describe("RouteErrorState", () => {
  afterEach(cleanup);

  it("moves focus to a safe recovery message and exposes both actions", async () => {
    const reset = vi.fn();
    const view = render(
      <RouteErrorState
        title="The dashboard could not load"
        message="Your saved items have not been changed."
        reset={reset}
        backHref="/saved"
        backLabel="View Bookmarks"
      />,
    );

    const heading = view.getByRole("heading", {
      level: 1,
      name: "The dashboard could not load",
    });
    await waitFor(() => expect(document.activeElement).toBe(heading));

    fireEvent.click(view.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledOnce();
    expect(view.getByRole("link", { name: "View Bookmarks" }).getAttribute("href")).toBe("/saved");
    expect(view.getByText("Your saved items have not been changed.")).toBeTruthy();
  });

  it("never accepts or renders an underlying exception message", () => {
    const view = render(
      <RouteErrorState
        message="A safe public message."
        reset={() => {}}
      />,
    );

    expect(view.container.textContent).toContain("A safe public message.");
    expect(view.container.textContent).not.toMatch(/database|provider|credential/i);
  });
});
