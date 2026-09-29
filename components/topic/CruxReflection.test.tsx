import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { CruxReflection } from "./CruxReflection";

const OPTIONS = [
  { id: "a", label: "Whether the waste can be stored safely" },
  { id: "b", label: "Whether the plants can be built on time" },
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

    const first = view.getByRole("button", { name: /waste can be stored/ });
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
      name: "Did this map change what you thought the argument was about?",
    });
    expect(group.querySelectorAll("button[aria-pressed]")).toHaveLength(3);
  });
});
