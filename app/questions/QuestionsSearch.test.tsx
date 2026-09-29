import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

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

import { QuestionsSearch } from "./QuestionsSearch";

const questions = [
  {
    slug: "nuclear-safe",
    question: "Is nuclear power safe?",
    topicTitle: "Nuclear Energy",
    topicId: "nuclear",
  },
  {
    slug: "rent-control",
    question: "Does rent control work?",
    topicTitle: "Housing Policy",
    topicId: "housing",
  },
];

describe("QuestionsSearch", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/questions");
  });

  afterEach(() => {
    cleanup();
    window.history.replaceState(null, "", "/");
  });

  it("announces an empty result and offers a focus-safe URL-synced reset", async () => {
    const view = render(<QuestionsSearch questions={questions} />);
    const input = view.getByRole("searchbox", { name: "Search questions" });

    // The live region is in the page before the first keystroke, so its
    // first text is announced.
    const status = view.getByRole("status");
    expect(status.textContent).toBe("");
    expect(input.getAttribute("aria-controls")).toBeNull();

    fireEvent.change(input, { target: { value: "no match" } });

    await waitFor(() =>
      expect(status.textContent).toBe("No questions found for “no match”"),
    );
    expect(input.getAttribute("aria-controls")).toBe("question-search-results");
    expect(document.getElementById("question-search-results")).toBeTruthy();
    expect(window.location.search).toBe("?q=no+match");

    fireEvent.click(view.getByRole("button", { name: "Clear search" }));

    await waitFor(() => expect(document.activeElement).toBe(input));
    expect(window.location.search).toBe("");
    expect(view.getByRole("status").textContent).toBe("");
    // No results region, so nothing for aria-controls to point at.
    expect(input.getAttribute("aria-controls")).toBeNull();
  });

  it("restores URL state on mount and browser history navigation", async () => {
    window.history.replaceState(null, "", "/questions?q=nuclear");
    const view = render(<QuestionsSearch questions={questions} />);
    const input = view.getByRole("searchbox", {
      name: "Search questions",
    }) as HTMLInputElement;

    await waitFor(() => expect(input.value).toBe("nuclear"));
    expect(view.getByText("Is nuclear power safe?")).toBeTruthy();

    window.history.pushState(null, "", "/questions?q=rent");
    window.dispatchEvent(new PopStateEvent("popstate"));

    await waitFor(() => expect(input.value).toBe("rent"));
    expect(view.getByText("Does rent control work?")).toBeTruthy();
  });
});
