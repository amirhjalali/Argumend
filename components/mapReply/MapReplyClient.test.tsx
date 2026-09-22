import "@/test/setup-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { buildMapReplyConsentLine } from "@/lib/aiProviders";
import { FakeJevProvider } from "@/lib/jev/fake";
import { MAP_REPLY_LIMITS } from "@/lib/mapReply/constants";
import {
  RENT_CONTROL_JEV_FIXTURES,
  RENT_CONTROL_THREAD,
} from "@/lib/mapReply/__fixtures__";
import { runMapReply } from "@/lib/mapReply/pipeline";
import type { MapReplyMatch, MapReplyNoMatch } from "@/lib/mapReply/types";
import { MapReplyClient } from "./MapReplyClient";
import { MapReplyResult } from "./MapReplyResult";

/**
 * The reply objects these tests render are produced by the real pipeline on
 * the recorded rent-control answers, not hand-written. A fixture typed by
 * hand would let the view drift away from the shape the route actually sends;
 * replaying the recorded model answers means a change to composition shows up
 * here as a rendering failure, which is the point.
 */
let match: MapReplyMatch;
let noMatch: MapReplyNoMatch;

beforeAll(async () => {
  const matched = await runMapReply({
    text: RENT_CONTROL_THREAD,
    provider: new FakeJevProvider(RENT_CONTROL_JEV_FIXTURES),
  });
  if (!matched.ok) throw new Error("the recorded fixtures should match a map");
  match = matched;

  // The same thread against an unreachable bar: a real `ok: false` result
  // with real candidates, rather than an invented one.
  const missed = await runMapReply({
    text: RENT_CONTROL_THREAD,
    provider: new FakeJevProvider(RENT_CONTROL_JEV_FIXTURES),
    topicConfidenceThreshold: 0.99,
  });
  if (missed.ok) throw new Error("a 99% bar should refuse this thread");
  noMatch = missed;
});

function mockJson(body: unknown, ok = true) {
  vi.mocked(fetch).mockResolvedValue({
    ok,
    json: async () => body,
  } as Response);
}

function submitExample(view: ReturnType<typeof render>) {
  fireEvent.click(view.getByRole("button", { name: "Load example" }));
  fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
}

describe("MapReplyClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders a paste box that shows the name: text format and an example", () => {
    const view = render(<MapReplyClient />);
    const box = view.getByLabelText("Thread to map") as HTMLTextAreaElement;

    expect(box.placeholder).toContain("name: what they said");
    expect(box.placeholder).toContain("marisol_k:");
    expect(box.placeholder).toContain("dtown_renter:");
    expect(view.getByRole("button", { name: "Map this thread" })).toBeTruthy();
    expect(view.getByText(/0 \/ 12,000 characters/)).toBeTruthy();
  });

  it("puts the consent line above the submit button and links it to /privacy", () => {
    const view = render(<MapReplyClient />);

    const consent = view.getByRole("note", { name: "How your text is handled" });
    // The exact sentence, spelled out rather than read from the builder, so a
    // change to the builder cannot quietly reword the disclosure.
    expect(consent.textContent).toContain(
      "By submitting, you agree that this text is sent to TypeSafe AI (processed in the United States) and is not stored. Identifiers are removed first. Don't paste private information about other people.",
    );
    expect(consent.textContent).toBe(buildMapReplyConsentLine().text);

    const policyLink = view.getByRole("link", { name: "Privacy" });
    expect(policyLink.getAttribute("href")).toBe("/privacy");

    const submit = view.getByRole("button", { name: "Map this thread" });
    expect(submit.getAttribute("aria-describedby")).toBe(consent.id);
    // The disclosure must precede the control it describes in document order.
    expect(consent.compareDocumentPosition(submit) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("enforces the 12,000-character cap in the browser", () => {
    const view = render(<MapReplyClient />);
    const box = view.getByLabelText("Thread to map") as HTMLTextAreaElement;

    expect(box.maxLength).toBe(MAP_REPLY_LIMITS.maxCharacters);

    fireEvent.change(box, { target: { value: "a".repeat(MAP_REPLY_LIMITS.maxCharacters + 500) } });

    expect(
      (view.getByLabelText("Thread to map") as HTMLTextAreaElement).value.length,
    ).toBe(MAP_REPLY_LIMITS.maxCharacters);
    expect(view.getByText(/12,000 \/ 12,000 characters/)).toBeTruthy();
  });

  it("loads the example thread and renders the composed reply", async () => {
    mockJson({ requestId: "req-1", ...match });

    const view = render(<MapReplyClient />);
    expect((view.getByLabelText("Thread to map") as HTMLTextAreaElement).value).toBe("");
    submitExample(view);

    await waitFor(() => {
      expect(view.getByRole("link", { name: match.topic.title })).toBeTruthy();
    });

    // Header: the map, its claim, and how sure the topic Choice was.
    expect(
      view.getByRole("link", { name: match.topic.title }).getAttribute("href"),
    ).toBe("/topics/rent-control-effectiveness");
    expect(view.getByText(match.topic.metaClaim)).toBeTruthy();
    expect(view.getByText("95%")).toBeTruthy();

    // What the thread is about, and who was not arguing.
    expect(view.getByText("What this thread is about")).toBeTruthy();
    expect(view.getAllByText("Supply Effects").length).toBeGreaterThan(0);
    expect(view.getByText("Not an argument about the topic")).toBeTruthy();
    expect(view.getAllByText("gary_1962").length).toBe(2);
    expect(view.getAllByText("Not an argument").length).toBe(1);

    // Pattern, signals, cruxes, evidence.
    expect(view.getByText("Mixed disagreement")).toBeTruthy();
    expect(view.getByText("A key term being used to mean two things")).toBeTruthy();
    expect(view.getByText("This thread touched")).toBeTruthy();
    expect(view.getByText("It never reached")).toBeTruthy();
    expect(view.getByText("The Construction Response Test")).toBeTruthy();
    expect(view.getByText("The Displacement vs Mobility Net Welfare Test")).toBeTruthy();
    expect(view.getByText("For the map's claim")).toBeTruthy();
    expect(view.getByText("Against the map's claim")).toBeTruthy();
    expect(view.getByText("34 / 40")).toBeTruthy();

    // The receipt that makes the consent line credible.
    expect(
      view.getByText(/^4 requests, \d+ ms, model jev-1\.13\.0, 0 identifiers removed$/),
    ).toBeTruthy();

    // The product rule.
    expect(view.queryByText(/who won/i)).toBeNull();
    expect(view.getByText("Argumend does not say who is right. Nothing below is a verdict."))
      .toBeTruthy();

    expect(fetch).toHaveBeenCalledWith(
      "/api/map-reply",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("copies the composed markdown from the reply footer", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    mockJson({ requestId: "req-2", ...match });

    const view = render(<MapReplyClient />);
    submitExample(view);

    const copy = await waitFor(() => view.getByRole("button", { name: /Copy reply/ }));
    fireEvent.click(copy);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(match.markdown);
    });
    await waitFor(() => {
      expect(view.getByRole("button", { name: /Copied/ })).toBeTruthy();
    });
  });

  it("shows a no-map result as an answer, with the closest maps", async () => {
    mockJson({ requestId: "req-3", ...noMatch });

    const view = render(<MapReplyClient />);
    submitExample(view);

    await waitFor(() => {
      expect(view.getByText("No map, rather than the wrong map")).toBeTruthy();
    });
    expect(view.getByText(noMatch.message)).toBeTruthy();
    expect(view.getByText("Closest maps")).toBeTruthy();

    const closest = view.getByRole("link", { name: /Does Rent Control Help or Hurt Renters/ });
    expect(closest.getAttribute("href")).toBe("/topics/rent-control-effectiveness");
    expect(view.queryByText("Copy reply")).toBeNull();
  });

  it.each([
    ["CONTENT_TOO_LONG", 400, /over the 12,000-character cap/],
    ["RATE_LIMITED", 429, /10 an hour and 40 a day/],
    ["SPEND_LIMIT_REACHED", 503, /daily model budget/],
    ["PROVIDER_NOT_CONFIGURED", 503, /no model is configured/],
  ])("explains a %s response in plain words", async (code, _status, expected) => {
    mockJson({ error: "server copy", code, requestId: "req-err" }, false);

    const view = render(<MapReplyClient />);
    submitExample(view);

    await waitFor(() => {
      expect(view.getByRole("alert").textContent).toMatch(expected);
    });
    expect(view.getByText("Reference req-err")).toBeTruthy();
  });
});

describe("MapReplyResult", () => {
  afterEach(cleanup);

  it("hedges the header when the map itself was chosen below 70%", () => {
    const unsure: MapReplyMatch = {
      ...match,
      topicChoice: { ...match.topicChoice, confidence: 0.55 },
    };

    const view = render(<MapReplyResult match={unsure} onReset={() => undefined} />);

    expect(view.getAllByText("55%").length).toBeGreaterThan(0);
    expect(view.getByText(/Below 70%, treat the map itself as a guess/)).toBeTruthy();
  });

  it("does not hedge a confident map", () => {
    const view = render(<MapReplyResult match={match} onReset={() => undefined} />);

    expect(view.queryByText(/treat the map itself as a guess/)).toBeNull();
  });
});
