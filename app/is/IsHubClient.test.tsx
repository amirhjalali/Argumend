import "@/test/setup-dom";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { IsHubClient, type IsCategoryGroup } from "./IsHubClient";
import { getVerdict } from "@/lib/schemas/topic";

beforeEach(() => {
  window.history.replaceState(null, "", "/is");
});

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "/");
});

// Two categories, three questions total — enough to exercise default render,
// search filtering, category narrowing, and the no-match empty state.
const groups: IsCategoryGroup[] = [
  {
    id: "policy",
    label: "Policy",
    entries: [
      { slug: "nuclear-safe", question: "Is nuclear power safe?", balance: 88, weight: 82, verdict: getVerdict(88, 82) },
      { slug: "rent-control", question: "Does rent control work?", balance: 42, weight: 45, verdict: getVerdict(42, 45) },
    ],
  },
  {
    id: "science",
    label: "Science",
    entries: [
      { slug: "moon-landing", question: "Did humans land on the moon?", balance: 99, weight: 91, verdict: getVerdict(99, 91) },
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
    expect(view.queryByText("Is nuclear power safe?") === null).toBe(true);
    fireEvent.click(view.getByRole("button", { name: "Clear filters" }));
    await waitFor(() =>
      expect(document.activeElement).toBe(view.getByLabelText("Search questions")),
    );
  });

  it("restores shareable controls from URL and responds to history navigation", async () => {
    window.history.replaceState(
      null,
      "",
      "/is?q=moon&category=science&sort=least_evidence",
    );
    const view = render(<IsHubClient groups={groups} totalCount={totalCount} />);

    await waitFor(() =>
      expect(
        (view.getByLabelText("Search questions") as HTMLInputElement).value,
      ).toBe("moon"),
    );
    expect(
      (view.getByLabelText("Filter by category") as HTMLSelectElement).value,
    ).toBe("science");
    expect(
      (view.getByLabelText("Sort questions") as HTMLSelectElement).value,
    ).toBe("least_evidence");
    expect(view.getByText("Did humans land on the moon?")).toBeTruthy();

    window.history.pushState(null, "", "/is?q=rent&category=policy");
    window.dispatchEvent(new PopStateEvent("popstate"));

    await waitFor(() =>
      expect(
        (view.getByLabelText("Search questions") as HTMLInputElement).value,
      ).toBe("rent"),
    );
    expect(view.getByText("Does rent control work?")).toBeTruthy();
    expect(window.location.search).toBe("?q=rent&category=policy");
  });
});
