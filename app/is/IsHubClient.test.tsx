import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
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
    render(<IsHubClient groups={groups} totalCount={totalCount} />);

    expect(screen.getByText("Is nuclear power safe?")).toBeTruthy();
    expect(screen.getByText("Does rent control work?")).toBeTruthy();
    expect(screen.getByText("Did humans land on the moon?")).toBeTruthy();
    // Unfiltered count line shows the bare total, not "Showing X of Y".
    expect(screen.getByText("3 questions")).toBeTruthy();
  });

  it("shows both category section headings and a jump-nav when nothing is filtered", () => {
    render(<IsHubClient groups={groups} totalCount={totalCount} />);

    expect(screen.getByRole("heading", { name: "Policy" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Science" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Jump to category" })).toBeTruthy();
  });

  it("filters questions as you type in the search box", () => {
    render(<IsHubClient groups={groups} totalCount={totalCount} />);

    fireEvent.change(screen.getByLabelText("Search questions"), {
      target: { value: "nuclear" },
    });

    expect(screen.getByText("Is nuclear power safe?")).toBeTruthy();
    expect(screen.queryByText("Does rent control work?")).toBeNull();
    expect(screen.queryByText("Did humans land on the moon?")).toBeNull();
    expect(screen.getByText("Showing 1 of 3 questions")).toBeTruthy();
  });

  it("narrows to a single category via the category select", () => {
    render(<IsHubClient groups={groups} totalCount={totalCount} />);

    fireEvent.change(screen.getByLabelText("Filter by category"), {
      target: { value: "science" },
    });

    expect(screen.getByText("Did humans land on the moon?")).toBeTruthy();
    expect(screen.queryByText("Is nuclear power safe?")).toBeNull();
    // The Policy section heading should be gone once we narrow to Science.
    expect(screen.queryByRole("heading", { name: "Policy" })).toBeNull();
  });

  it("shows the empty state with a clear-filters action for a no-match query", () => {
    render(<IsHubClient groups={groups} totalCount={totalCount} />);

    fireEvent.change(screen.getByLabelText("Search questions"), {
      target: { value: "zzzznomatch" },
    });

    expect(screen.getByText(/No questions match/)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Clear filters" })).toBeTruthy();
    expect(screen.queryByText("Is nuclear power safe?")).toBeNull();
  });
});
