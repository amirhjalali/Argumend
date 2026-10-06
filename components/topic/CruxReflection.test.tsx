import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { CruxReflection } from "./CruxReflection";

const OPTIONS = [
  {
    id: "crux-a",
    label: "Whether the waste can be stored safely",
    settle: { mode: "evidence" as const, condition: "a sealed repository that holds for a century", resolved: false },
  },
  { id: "crux-b", label: "Whether the plants can be built on time" },
];

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("CruxReflection", () => {
  it("has its live region in the page before the first tap, then announces the answer", async () => {
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    // Present and empty: a status mounted together with its text is often
    // not read out, so the region has to exist before the answer does.
    const status = view.getByRole("status");
    expect(status.textContent).toBe("");

    const first = view.getByRole("button", { name: /plants can be built/ });
    expect(first.getAttribute("aria-pressed")).toBe("false");
    await act(async () => {
      fireEvent.click(first);
    });
    expect(first.getAttribute("aria-pressed")).toBe("true");
    expect(view.getByRole("status")).toBe(status);
    expect(status.textContent).toMatch(/^Noted in this browser only\. One more question below/);

    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: "A little" }));
    });
    expect(status.textContent).toBe("Kept in this browser only.");
  });

  it("names every option and the follow-up group", async () => {
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    expect(view.getByRole("heading", { level: 2, name: "Which question would change your mind?" })).toBeTruthy();
    expect(view.getByRole("button", { name: /None of these would/ })).toBeTruthy();
    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: /plants can be built/ }));
    });
    const group = view.getByRole("group", {
      name: "Did this change what you thought you were arguing about?",
    });
    expect(group.querySelectorAll("button[aria-pressed]")).toHaveLength(3);
  });

  it("leads somewhere: the picked question's settle line and a link to open it", async () => {
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    expect(view.queryByRole("link", { name: "Open this crux" })).toBeNull();
    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: /waste can be stored/ }));
    });
    expect(view.getByText("What would settle it")).toBeTruthy();
    expect(view.getByText("A sealed repository that holds for a century.")).toBeTruthy();
    expect(view.getByRole("link", { name: "Open this crux" }).getAttribute("href")).toBe("#crux-a");
    expect(view.getByRole("status").textContent).toMatch(/What would settle it is shown below, with a link to open this crux/);

    // "None of these would" has nothing to open.
    await act(async () => {
      fireEvent.click(view.getByRole("button", { name: /None of these would/ }));
    });
    expect(view.queryByRole("link", { name: "Open this crux" })).toBeNull();
  });

  it("never truncates an option", () => {
    const view = render(<CruxReflection topicId="t" options={OPTIONS} />);
    expect(view.container.querySelector("[class*='line-clamp'], [class*='truncate']")).toBeNull();
  });
});
