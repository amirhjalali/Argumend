import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { argumentTopicIndex } from "@/lib/argument/topicIds";

const logic = vi.hoisted(() => ({
  setTopic: vi.fn(),
  setView: vi.fn(),
  state: {
    currentTopicId: "consciousness-ai-systems",
    currentView: "scales" as const,
  },
}));

vi.mock("next/dynamic", () => ({
  default: () => function DynamicStub() {
    return <div data-testid="dynamic-view" />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("@/hooks/useLogicGraph", () => ({
  useLogicGraph: (selector: (state: typeof logic.state & {
    setTopic: typeof logic.setTopic;
    setView: typeof logic.setView;
  }) => unknown) => selector({ ...logic.state, setTopic: logic.setTopic, setView: logic.setView }),
}));

vi.mock("@/hooks/useSidebarState", () => ({
  useSidebarState: () => ({
    isOpen: false,
    mounted: true,
    toggle: vi.fn(),
    close: vi.fn(),
    open: vi.fn(),
  }),
}));
vi.mock("@/hooks/useMediaQuery", () => ({ useIsMobile: () => false }));
vi.mock("@/hooks/useMobileSidebarA11y", () => ({ useMobileSidebarA11y: vi.fn() }));
vi.mock("@/components/Sidebar", () => ({ Sidebar: () => null }));
vi.mock("@/components/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/HeroAnalyze", () => ({ HeroAnalyze: () => null }));
vi.mock("@/components/BalanceWeightChip", () => ({ BalanceWeightChip: () => null }));
vi.mock("@/components/FeaturedTopicHero", () => ({
  FeaturedTopicHero: ({ onTopicSelect }: { onTopicSelect: (id: string) => void }) => (
    <button onClick={() => onTopicSelect("consciousness-ai-systems")}>Open featured</button>
  ),
}));
vi.mock("@/components/TopBar", () => ({
  TopBar: ({ showBackToHero, onBackToHero }: { showBackToHero?: boolean; onBackToHero?: () => void }) =>
    showBackToHero ? <button onClick={onBackToHero}>Back to Home</button> : <div>Home header</div>,
}));

import HomeClient from "./HomeClient";

describe("HomeClient home reset", () => {
  beforeEach(() => {
    logic.setTopic.mockReset();
    logic.setView.mockReset();
    window.history.replaceState({}, "", "/");
  });

  afterEach(cleanup);

  it("resets a stale view and clears the URL when returning to the homepage", () => {
    const view = render(<HomeClient />);

    fireEvent.click(view.getByRole("button", { name: "Open featured" }));
    fireEvent.click(view.getByRole("button", { name: "Back to Home" }));

    expect(logic.setView).toHaveBeenLastCalledWith("logic-map");
    expect(window.location.pathname).toBe("/");
    expect(window.location.search).toBe("");
    expect(view.getByRole("button", { name: "Open featured" })).toBeTruthy();
  });

  it("names the interactive topic view with a page-level heading", () => {
    const view = render(<HomeClient />);

    fireEvent.click(view.getByRole("button", { name: "Open featured" }));

    expect(
      view.getByRole("heading", {
        level: 1,
        name: "Consciousness in AI Systems",
      }),
    ).toBeTruthy();
  });

  it("promotes every flagship debate map with a direct canonical route", () => {
    const view = render(<HomeClient />);

    const mapsHeading = view.getByRole("heading", {
        level: 1,
        name: "The whole fight, not a verdict.",
      });
    const legacyFeaturedTopic = view.getByRole("button", { name: "Open featured" });

    expect(mapsHeading.compareDocumentPosition(legacyFeaturedTopic)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );

    for (const topic of argumentTopicIndex) {
      expect(
        view
          .getByRole("link", { name: new RegExp(topic.title) })
          .getAttribute("href"),
      ).toBe(`/topics/${topic.id}`);
    }

    const headings = view.getAllByRole("heading");
    expect(headings[0]).toBe(mapsHeading);
    expect(view.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
