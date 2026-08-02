import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { featuredTopicId } from "@/data/topicIndex";

const loadTopicById = vi.hoisted(() => vi.fn());

vi.mock("@/data/topicLoader", () => ({ loadTopicById }));

import { FeaturedTopicHero } from "./FeaturedTopicHero";

describe("FeaturedTopicHero", () => {
  afterEach(() => {
    cleanup();
    loadTopicById.mockReset();
  });

  it("keeps the product promise and primary action together before featured detail", async () => {
    loadTopicById.mockResolvedValue({
      id: "consciousness-ai-systems",
      pillars: [
        {
          crux: {
            title: "The decisive test",
            description: "A concrete test of the competing explanations.",
          },
          evidence: [
            { side: "for", title: "Evidence for", source: "Source A", weight: { sourceReliability: 8, independence: 8, replicability: 8, directness: 8 } },
            { side: "against", title: "Evidence against", source: "Source B", weight: { sourceReliability: 7, independence: 7, replicability: 7, directness: 7 } },
          ],
        },
      ],
    });
    const onTopicSelect = vi.fn();
    const view = render(
      <FeaturedTopicHero
        onTopicSelect={onTopicSelect}
        preview={<div>Interactive map preview</div>}
      />
    );

    const section = view.getByRole("region", {
      name: "See both sides of any controversial topic, mapped",
    });
    const grid = section.firstElementChild as HTMLElement;
    const action = view.getByRole("button", { name: "Open the interactive map" });
    const featuredTitle = view.getByRole("heading", { level: 2 });

    expect(grid.className).toContain("lg:grid-cols-");
    expect(grid.children).toHaveLength(2);
    expect(within(grid.children[1] as HTMLElement).getByText("Interactive map preview")).toBeTruthy();
    expect(
      action.compareDocumentPosition(featuredTitle) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    fireEvent.click(action);
    expect(onTopicSelect).toHaveBeenCalledWith(featuredTopicId);

    // Await the lazy topic-data effect so it cannot race test-environment teardown.
    expect(await view.findByText("The Crux")).toBeTruthy();
    expect(loadTopicById).toHaveBeenCalledWith(featuredTopicId);
  });

  it("keeps the summary and action usable when full topic loading fails", async () => {
    loadTopicById.mockResolvedValue(null);
    const onTopicSelect = vi.fn();
    const view = render(<FeaturedTopicHero onTopicSelect={onTopicSelect} />);

    expect(view.getByRole("heading", { level: 2 })).toBeTruthy();
    const action = view.getByRole("button", { name: "Open the interactive map" });
    fireEvent.click(action);
    expect(onTopicSelect).toHaveBeenCalledWith(featuredTopicId);
    expect(await view.findByText("Featured analysis")).toBeTruthy();
  });
});
