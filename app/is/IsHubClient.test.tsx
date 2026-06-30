import "@/test/setup-dom";
import { describe, it, expect, afterEach } from "vitest";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { IsHubClient, type IsCategoryGroup } from "./IsHubClient";

afterEach(cleanup);

// Two categories, three questions total — enough to exercise default render,
// search filtering, category narrowing, and the no-match empty state.
const groups: IsCategoryGroup[] = [
  {
    id: "policy",
    label: "Policy",
    entries: [
      { slug: "nuclear-safe", question: "Is nuclear power safe?", confidence: 88 },
      { slug: "rent-control", question: "Does rent control work?", confidence: 42 },
    ],
  },
  {
    id: "science",
    label: "Science",
    entries: [
      { slug: "moon-landing", question: "Did humans land on the moon?", confidence: 99 },
    ],
  },
];
const totalCount = 3;

describe("IsHubClient", () => {
  it("renders every question (SSR-equivalent) in the default unfiltered state", () => {
    const view = render(<IsHubClient groups={groups} totalCount={totalCount} />);

    expect(view.getByText("Is nuclear power safe?")).toBeTruthy();
    expect(view.getByText("Does rent control work?")).toBeTruthy();
    expect(view.getByText("Did humans land on the moon?")).toBeTruthy();
    // Unfiltered count line shows the bare total, not "Showing X of Y".
    expect(view.getByText("3 questions")).toBeTruthy();
  });

  it("shows both category section headings and a jump-nav when nothing is filtered", () => {
    const view = render(<IsHubClient groups={groups} totalCount={totalCount} />);

    expect(view.getByRole("heading", { name: "Policy" })).toBeTruthy();
    expect(view.getByRole("heading", { name: "Science" })).toBeTruthy();
    expect(view.getByRole("navigation", { name: "Jump to category" })).toBeTruthy();
  });

  it("filters questions as you type in the search box", async () => {
    const view = render(<IsHubClient groups={groups} totalCount={totalCount} />);
    const input = view.getByLabelText("Search questions") as HTMLInputElement;

    input.value = "nuclear";
    fireEvent.input(input);

    await waitFor(() => {
      expect(view.getByText("Showing 1 of 3 questions")).toBeTruthy();
    });
    expect(view.getByText("Is nuclear power safe?")).toBeTruthy();
    expect(view.queryByText("Does rent control work?") === null).toBe(true);
    expect(view.queryByText("Did humans land on the moon?") === null).toBe(true);
  });

  it("narrows to a single category via the category select", async () => {
    const view = render(<IsHubClient groups={groups} totalCount={totalCount} />);

    fireEvent.change(view.getByLabelText("Filter by category"), {
      target: { value: "science" },
    });

    await waitFor(() => {
      expect(view.getByText("Showing 1 of 3 questions")).toBeTruthy();
    });
    expect(view.getByText("Did humans land on the moon?")).toBeTruthy();
    expect(view.queryByText("Is nuclear power safe?") === null).toBe(true);
    // The Policy section heading should be gone once we narrow to Science.
    expect(view.queryByRole("heading", { name: "Policy" }) === null).toBe(true);
  });

  it("shows the empty state with a clear-filters action for a no-match query", async () => {
    const view = render(<IsHubClient groups={groups} totalCount={totalCount} />);
    const input = view.getByLabelText("Search questions") as HTMLInputElement;

    input.value = "zzzznomatch";
    fireEvent.input(input);

    await waitFor(() => {
      expect(view.getByText(/No questions match/)).toBeTruthy();
    });
    expect(view.getByText(/No questions match/)).toBeTruthy();
    expect(view.getByRole("button", { name: "Clear filters" })).toBeTruthy();
    expect(view.queryByText("Is nuclear power safe?") === null).toBe(true);
  });
});
