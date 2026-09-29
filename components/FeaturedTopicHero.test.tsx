import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import type { HomeCrux } from "@/components/home/homeModel";

vi.mock("next/image", () => ({ default: () => null }));

import { FeaturedTopicHero } from "./FeaturedTopicHero";

afterEach(cleanup);

const base: HomeCrux = {
  topicId: "demo-map",
  topicTitle: "Is the demo question real?",
  cruxCount: 5,
  rank: 1,
  claimId: "c-demo",
  question: "Does the test fire when it should?",
  implicit: true,
  mode: "evidence",
  kind: "existing-evidence",
  condition: "a replicated field test of the mechanism",
  resolved: false,
  fight: "Both sides accept the lab result and read the field data differently.",
  soWhat: "If it fires, one camp gains its mechanism. If not, the other's history holds.",
  movement: [],
};

describe("FeaturedTopicHero (home beat 2)", () => {
  it("works through one crux: the question, what would settle it, and why it is open", () => {
    const view = render(<FeaturedTopicHero crux={base} href="/topics/demo-map" />);
    const section = view.getByRole("region", { name: "What would change your mind?" });

    expect(within(section).getByRole("heading", { level: 3, name: base.question })).toBeTruthy();
    expect(section.textContent).toContain("the first of five on");
    expect(section.textContent).toContain(base.topicTitle);
    expect(section.textContent).toContain("A hidden assumption");
    expect(within(section).getByText("What would settle it")).toBeTruthy();
    expect(section.textContent).toContain("A replicated field test of the mechanism.");
    expect(section.textContent).toContain("Why it is still open.");
    expect(section.textContent).toContain(base.fight!);
    expect(section.textContent).toContain("What each answer changes.");
    expect(section.textContent).toContain(base.soWhat!);
  });

  it("shows no score, balance or weight", () => {
    const view = render(<FeaturedTopicHero crux={base} href="/topics/demo-map" />);
    const text = view.container.textContent ?? "";
    expect(text).not.toMatch(/\/40|\/100|balance|weight|verdict|winner/i);
  });

  it("links to the whole map, the same page the hero button opens", () => {
    const view = render(<FeaturedTopicHero crux={base} href="/topics/demo-map" />);
    expect(
      view.getByRole("link", { name: "Read the whole map" }).getAttribute("href"),
    ).toBe("/topics/demo-map");
    expect(view.container.innerHTML).not.toContain("?topic=");
  });

  it("uses the standing line when no evidence could settle the crux", () => {
    const view = render(
      <FeaturedTopicHero
        crux={{ ...base, implicit: false, mode: "standing", kind: "value-difference" }}
        href="/topics/demo-map"
      />,
    );
    const text = view.container.textContent ?? "";
    expect(text).toContain("Nothing does");
    expect(text).toContain("Where the sides part.");
    expect(text).not.toContain("A hidden assumption");
  });
});
