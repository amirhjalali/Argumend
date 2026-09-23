import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { featuredTopicId } from "@/data/topicIndex";
import { FeaturedTopicHero } from "./FeaturedTopicHero";

const loadTopicById = vi.hoisted(() => vi.fn());

vi.mock("@/data/topicLoader", () => ({ loadTopicById }));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("FeaturedTopicHero", () => {
  afterEach(() => {
    cleanup();
    loadTopicById.mockReset();
  });

  it("leads with the crux and what would change each side's mind, not a score", async () => {
    loadTopicById.mockResolvedValue({
      id: "consciousness-ai-systems",
      pillars: [
        {
          crux: {
            title: "The decisive test",
            description: "A concrete test of the competing explanations.",
            falsification: {
              supporter_flip: "Supporters would move if the test came back empty.",
              skeptic_flip: "Skeptics would move if the test fired.",
              common_ground: "Both agree no test exists yet.",
              live_disagreement: "Whether a test is possible at all.",
            },
          },
          evidence: [
            { side: "for", title: "Evidence for", source: "Source A", weight: { sourceReliability: 8, independence: 8, replicability: 8, directness: 8 } },
            { side: "against", title: "Evidence against", source: "Source B", weight: { sourceReliability: 7, independence: 7, replicability: 7, directness: 7 } },
          ],
        },
      ],
    });
    const onTopicSelect = vi.fn();
    const view = render(<FeaturedTopicHero onTopicSelect={onTopicSelect} />);

    const section = view.getByRole("region", { name: "What would change your mind?" });
    const crux = await view.findByRole("heading", { level: 3, name: "The decisive test" });
    expect(section.contains(crux)).toBe(true);

    // Both resolution conditions appear, supporter first, and the page shows
    // no balance or weight readout and no evidence scores.
    const supporter = view.getByText("Supporters would move if the test came back empty.");
    const skeptic = view.getByText("Skeptics would move if the test fired.");
    expect(supporter.compareDocumentPosition(skeptic) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(view.getByText("Both agree no test exists yet.")).toBeTruthy();
    expect(within(section).queryByText(/\/40|\/100/)).toBeNull();
    expect(view.getByText("Evidence for")).toBeTruthy();
    expect(view.getByText("Evidence against")).toBeTruthy();

    // The primary action comes after the crux it invites you to explore.
    const action = view.getByRole("button", { name: "Open the interactive map" });
    expect(crux.compareDocumentPosition(action) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    fireEvent.click(action);
    expect(onTopicSelect).toHaveBeenCalledWith(featuredTopicId);
    expect(
      view.getByRole("link", { name: /Read every crux in/ }).getAttribute("href"),
    ).toBe(`/topics/${featuredTopicId}`);
    expect(loadTopicById).toHaveBeenCalledWith(featuredTopicId);
  });

  it("keeps the claim and action usable when full topic loading fails", async () => {
    loadTopicById.mockResolvedValue(null);
    const onTopicSelect = vi.fn();
    const view = render(<FeaturedTopicHero onTopicSelect={onTopicSelect} />);

    expect(view.getByRole("heading", { level: 2 })).toBeTruthy();
    expect(await view.findByText("The claim")).toBeTruthy();
    const action = view.getByRole("button", { name: "Open the interactive map" });
    fireEvent.click(action);
    expect(onTopicSelect).toHaveBeenCalledWith(featuredTopicId);
    await vi.waitFor(() => expect(loadTopicById).toHaveBeenCalled());
    expect(view.queryByText("The crux")).toBeNull();
  });
});
