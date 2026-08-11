import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { topicSummaries } from "@/data/topicIndex";

const push = vi.fn();
let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push }),
}));

vi.mock("@/components/TrendingTopics", () => ({
  TrendingTopics: () => null,
}));
vi.mock("@/components/ThemeToggle", () => ({ ThemeToggle: () => null }));
vi.mock("@/components/BalanceWeightChip", () => ({
  BalanceWeightChip: () => null,
}));

import { Sidebar } from "./Sidebar";

describe("Sidebar topic routing", () => {
  beforeEach(() => {
    pathname = "/";
    push.mockReset();
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(min-width: 768px)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("keeps topic selection in-place on the interactive home route", () => {
    const onTopicSelect = vi.fn();
    const view = render(
      <Sidebar
        isOpen
        onClose={vi.fn()}
        currentTopicId={topicSummaries[0].id}
        onTopicSelect={onTopicSelect}
      />,
    );

    fireEvent.click(
      view.getByRole("button", { name: topicSummaries[0].title }),
    );

    expect(
      view
        .getByRole("button", { name: topicSummaries[0].title })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(onTopicSelect).toHaveBeenCalledWith(topicSummaries[0].id);
    expect(push).not.toHaveBeenCalled();
  });

  it("navigates content routes to a shareable logic-map URL", () => {
    pathname = "/topics";
    const onTopicSelect = vi.fn();
    const view = render(
      <Sidebar
        isOpen
        onClose={vi.fn()}
        currentTopicId={topicSummaries[0].id}
        onTopicSelect={onTopicSelect}
      />,
    );

    fireEvent.click(
      view.getByRole("button", { name: topicSummaries[0].title }),
    );

    expect(push).toHaveBeenCalledWith(
      `/?topic=${encodeURIComponent(topicSummaries[0].id)}&view=logic-map`,
    );
    expect(onTopicSelect).not.toHaveBeenCalled();
  });

  it("marks Explore current for hidden /topics subroutes", () => {
    pathname = "/topics/compare";
    const view = render(
      <Sidebar isOpen onClose={vi.fn()} onTopicSelect={vi.fn()} />,
    );

    expect(
      view.getByRole("link", { name: "Explore" }).getAttribute("aria-current"),
    ).toBe("page");
    expect(
      view.getByRole("link", { name: "Analyze Text" }).hasAttribute("aria-current"),
    ).toBe(false);
  });

  it("does not render empty learn or meta navigation sections", () => {
    const view = render(
      <Sidebar isOpen onClose={vi.fn()} onTopicSelect={vi.fn()} />,
    );

    expect(view.queryByRole("button", { name: "Learn & Explore" })).toBeNull();
    expect(view.queryByRole("link", { name: "FAQ" })).toBeNull();
  });
});
