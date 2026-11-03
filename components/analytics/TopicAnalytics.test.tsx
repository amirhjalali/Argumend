import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { DebateView } from "@/components/argument/DebateView";
import { ReadModeView } from "@/components/ReadModeView";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { isPublicEntry } from "@/lib/argument/ledger";
import { loadTopicById } from "@/data/topicLoader";
import { setAnalyticsConfigForTesting } from "@/lib/analytics";
import { CRUX_SHEET_SELECTOR, EVIDENCE_ATTRIBUTE, TopicAnalytics } from "./TopicAnalytics";

type ObserverRecord = { callback: IntersectionObserverCallback; targets: Element[]; disconnected: boolean };
let observers: ObserverRecord[] = [];
let gtag: ReturnType<typeof vi.fn>;

class FakeIntersectionObserver {
  record: ObserverRecord;
  constructor(callback: IntersectionObserverCallback) {
    this.record = { callback, targets: [], disconnected: false };
    observers.push(this.record);
  }
  observe(target: Element) {
    this.record.targets.push(target);
  }
  disconnect() {
    this.record.disconnected = true;
  }
  unobserve() {}
  takeRecords() {
    return [];
  }
}

function events(): Array<[string, Record<string, unknown>]> {
  return gtag.mock.calls.map((call) => [call[1] as string, call[2] as Record<string, unknown>]);
}

function observersOf(target: Element) {
  return observers.filter((record) => record.targets.includes(target));
}

function open(details: Element) {
  (details as HTMLDetailsElement).open = true;
  details.dispatchEvent(new Event("toggle"));
}

beforeEach(() => {
  observers = [];
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  gtag = vi.fn();
  window.gtag = gtag as unknown as Window["gtag"];
  setAnalyticsConfigForTesting({ provider: "ga", measurementId: "G-TEST123" });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  setAnalyticsConfigForTesting(undefined);
  delete window.gtag;
  window.localStorage.clear();
});

async function renderLegacy() {
  const topic = (await loadTopicById("nuclear-energy-safety"))!;
  return render(
    <>
      <ReadModeView topic={topic} />
      <TopicAnalytics topicId={topic.id} topicKind="legacy" />
    </>,
  );
}

describe("the DOM hooks TopicAnalytics reads from the page template", () => {
  it("are rendered by a legacy map: a crux sheet of <li> entries, one with an evidence disclosure", async () => {
    const { container } = await renderLegacy();
    const sheet = container.querySelector(CRUX_SHEET_SELECTOR);
    expect(sheet, "TopicPage must keep [data-crux-sheet] or analytics loses the crux funnel").not.toBeNull();
    const entries = sheet!.querySelectorAll(":scope > li");
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0].querySelector(":scope > details")).not.toBeNull();
    expect(container.querySelector(`details[${EVIDENCE_ATTRIBUTE}]`)).not.toBeNull();
  });

  it("are rendered by a flagship map too", () => {
    const topic = loadArgumentTopic("ai-mass-unemployment")!;
    const { container } = render(
      <DebateView meta={topic.meta} graph={topic.graph} cruxes={topic.cruxes} ledger={topic.ledger.filter(isPublicEntry)} />,
    );
    expect(container.querySelector(`${CRUX_SHEET_SELECTOR} > li > details`)).not.toBeNull();
    expect(container.querySelector(`${CRUX_SHEET_SELECTOR} details[${EVIDENCE_ATTRIBUTE}]`)).not.toBeNull();
  });
});

describe("TopicAnalytics", () => {
  it("counts the view, the first crux in view, crux and evidence opens once each", async () => {
    const { container } = await renderLegacy();
    expect(events()[0]).toEqual(["topic_view", expect.objectContaining({ topicId: "nuclear-energy-safety", topicKind: "legacy" })]);

    // The first crux, and only it, is observed (the page's own observers aside).
    const firstCrux = container.querySelector(`${CRUX_SHEET_SELECTOR} > li`)!;
    const mine = observersOf(firstCrux);
    expect(mine).toHaveLength(1);
    expect(mine[0].targets).toEqual([firstCrux]);
    act(() => {
      mine[0].callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(mine[0].disconnected).toBe(true);

    const entry = container.querySelector(`details[${EVIDENCE_ATTRIBUTE}]`)!.closest("li")!;
    const index = Array.from(entry.parentElement!.children).indexOf(entry) + 1;
    open(entry.querySelector(":scope > details")!);
    open(entry.querySelector(`details[${EVIDENCE_ATTRIBUTE}]`)!);
    // Closing and reopening the same disclosure is not a second event.
    open(entry.querySelector(`details[${EVIDENCE_ATTRIBUTE}]`)!);

    const names = events().map(([name]) => name);
    expect(names).toEqual(["topic_view", "first_crux_seen", "crux_open", "evidence_expand"]);
    expect(events()[3][1]).toMatchObject({ topicId: "nuclear-energy-safety", cruxIndex: index });
  });

  it("ignores disclosures outside the crux sheet", async () => {
    const { container } = await renderLegacy();
    const fold = container.querySelector("details#researcher")!;
    open(fold);
    expect(events().map(([name]) => name)).toEqual(["topic_view"]);
  });

  it("reports scroll milestones once each, only after the visitor scrolls", async () => {
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => frames.push(fn));
    vi.stubGlobal("cancelAnimationFrame", () => {});
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 4000 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });
    await renderLegacy();
    expect(events().some(([name]) => name === "scroll_depth")).toBe(false);

    const scrollTo = (y: number) => {
      Object.defineProperty(window, "scrollY", { configurable: true, value: y });
      window.dispatchEvent(new Event("scroll"));
      for (const frame of frames.splice(0)) frame(0);
    };
    scrollTo(1000); // 50% seen
    scrollTo(1100);
    scrollTo(3000); // 100%
    const depths = events()
      .filter(([name]) => name === "scroll_depth")
      .map(([, params]) => params.percent);
    expect(depths).toEqual([25, 50, 75, 100]);
  });

  it("counts the first crux once when a jump scrolls straight past it", async () => {
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => frames.push(fn));
    vi.stubGlobal("cancelAnimationFrame", () => {});
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
    const { container } = await renderLegacy();
    const first = container.querySelector(`${CRUX_SHEET_SELECTOR} > li`)!;
    let top = 1200; // below the fold
    first.getBoundingClientRect = () => ({ top, bottom: top + 300 }) as DOMRect;
    const scroll = () => {
      window.dispatchEvent(new Event("scroll"));
      for (const frame of frames.splice(0)) frame(0);
    };
    scroll();
    expect(events().some(([name]) => name === "first_crux_seen")).toBe(false);
    top = -2000; // an anchor link or a fling carried the page past it
    scroll();
    scroll();
    expect(events().filter(([name]) => name === "first_crux_seen")).toHaveLength(1);
  });

  it("attaches nothing and sends nothing when analytics is off", async () => {
    setAnalyticsConfigForTesting(null);
    const add = vi.spyOn(document, "addEventListener");
    const { container } = await renderLegacy();
    open(container.querySelector(`${CRUX_SHEET_SELECTOR} > li > details`)!);
    expect(gtag).not.toHaveBeenCalled();
    expect(observersOf(container.querySelector(`${CRUX_SHEET_SELECTOR} > li`)!)).toHaveLength(0);
    expect(add.mock.calls.some(([type]) => type === "toggle")).toBe(false);
    add.mockRestore();
  });
});
