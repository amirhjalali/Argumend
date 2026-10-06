import "@/test/setup-dom";
import { act, cleanup, fireEvent, render, within } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { CruxReflection } from "@/components/topic/CruxReflection";
import { CHANGED_CHOICES, CHANGED_QUESTION } from "@/lib/changedQuestion";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { findMaps } from "@/lib/paste/maps";
import type { PasteMapsResult } from "@/lib/paste/types";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { MapMatch } from "./MapResult";
import { NextStep } from "./NextStep";

/**
 * The paste result on a phone (r3 review #11): the crux's action right under
 * the crux box, long text clamped behind an accessible "Show more", and one
 * mind-change question shared with the maps.
 */

let matched: PasteMapsResult;

// happy-dom lays nothing out, so a clamped block reports no overflow. Make
// every clamped block overflow, as the long texts do on a 390px screen.
const scrollHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollHeight");
const clientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "clientHeight");

beforeAll(async () => {
  matched = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
  Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
    configurable: true,
    get(this: HTMLElement) {
      return /line-clamp-/.test(this.className) ? 300 : 100;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    get: () => 100,
  });
}, 60_000);

afterAll(() => {
  if (scrollHeight) Object.defineProperty(HTMLElement.prototype, "scrollHeight", scrollHeight);
  if (clientHeight) Object.defineProperty(HTMLElement.prototype, "clientHeight", clientHeight);
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("the map block on a phone", () => {
  it("clamps what would change each side's mind and each card, behind a named Show more", () => {
    const match = matched.match!;
    const view = render(<MapMatch match={match} related={matched.related} />);
    const buttons = view.getAllByRole("button", { name: /^Show more/ });
    // Two in the crux box (one per side), two on the cards.
    expect(buttons).toHaveLength(4);
    // Each says what it opens, so a list of four "Show more" is not ambiguous.
    const names = buttons.map((button) => button.textContent);
    expect(new Set(names).size).toBe(4);
    expect(names[0]).toMatch(/^Show more: Someone who says yes/);

    const first = buttons[0];
    const target = document.getElementById(first.getAttribute("aria-controls")!)!;
    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(target.className).toMatch(/line-clamp-3/);
    // line-clamp sets its own display; a `block` beside it would undo the clamp.
    expect(target.className.split(/\s+/)).not.toContain("block");
    // The whole text is in the page even while clamped.
    expect(target.textContent).toBe(match.crux!.supporterFlip);

    fireEvent.click(first);
    expect(first.getAttribute("aria-expanded")).toBe("true");
    expect(first.textContent).toMatch(/^Show less/);
    expect(target.className).not.toMatch(/line-clamp/);
  });

  it("puts the crux's action right after the crux box, before the cards", () => {
    const view = render(<MapMatch match={matched.match!} related={matched.related} />);
    const cta = view.getByRole("link", { name: "Open the map at this crux" });
    const lastFlip = view.getAllByRole("button", { name: /^Show more/ })[1];
    const cardsHeading = view.getByRole("heading", { name: "The strongest card on each side" });
    expect(lastFlip.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(cta.compareDocumentPosition(cardsHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe("one mind-change question, on paste and on maps", () => {
  const answersOf = (group: HTMLElement) =>
    within(group)
      .getAllByRole("button")
      .map((button) => button.textContent);

  it("asks the same question with the same answers and the same control", async () => {
    const paste = render(<NextStep summary="A summary." />);
    const pasteGroup = paste.getByRole("group", { name: CHANGED_QUESTION });
    const pasteAnswers = answersOf(pasteGroup);
    const pasteClasses = within(pasteGroup).getAllByRole("button")[0].className;
    cleanup();

    const map = render(
      <CruxReflection topicId="t" options={[{ id: "crux-a", label: "Whether it holds" }]} />,
    );
    await act(async () => {
      fireEvent.click(map.getByRole("button", { name: /Whether it holds/ }));
    });
    const mapGroup = map.getByRole("group", { name: CHANGED_QUESTION });

    expect(pasteAnswers).toEqual(CHANGED_CHOICES.map((choice) => choice.label));
    expect(answersOf(mapGroup)).toEqual(pasteAnswers);
    expect(within(mapGroup).getAllByRole("button")[0].className).toBe(pasteClasses);
  });

  it("on paste, marks and announces the answer, and can change it", async () => {
    const view = render(<NextStep summary="A summary." />);
    const status = view.getAllByRole("status").at(-1)!;
    expect(status.textContent).toBe("");

    const little = view.getByRole("button", { name: "A little" });
    await act(async () => {
      fireEvent.click(little);
    });
    expect(little.getAttribute("aria-pressed")).toBe("true");
    expect(status.textContent).toBe("You answered a little. Your answer is not sent or counted.");

    const no = view.getByRole("button", { name: "No" });
    await act(async () => {
      fireEvent.click(no);
    });
    expect(no.getAttribute("aria-pressed")).toBe("true");
    expect(little.getAttribute("aria-pressed")).toBe("false");
  });
});
