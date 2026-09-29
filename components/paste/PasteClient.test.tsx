import "@/test/setup-dom";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { PASTE_PREFILL_KEY } from "@/lib/paste/handoff";
import { findMaps } from "@/lib/paste/maps";
import type { PasteLanes, PasteMapsResult } from "@/lib/paste/types";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { PasteClient } from "./PasteClient";

const OFFLINE: PasteLanes = { maps: true, diagnosis: { enabled: false } };
const HOSTED: PasteLanes = {
  maps: true,
  diagnosis: { enabled: true, providerIds: ["anthropic"], fixtures: false },
};
const FIXTURES: PasteLanes = {
  maps: true,
  diagnosis: { enabled: true, providerIds: [], fixtures: true },
};

let matched: PasteMapsResult;
let unmatched: PasteMapsResult;

function jsonResponse(body: unknown, ok = true) {
  return Promise.resolve({ ok, json: async () => body } as Response);
}

function stubFetch(routes: Record<string, () => Promise<Response>>) {
  const fetchMock = vi.fn((url: string) => {
    const handler = routes[url];
    if (!handler) throw new Error(`unexpected request to ${url}`);
    return handler();
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeAll(async () => {
  // The first paste in a process reads every map to build the index.
  matched = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
  unmatched = await findMaps(
    "Pineapple on pizza is great, the sweetness balances the salty ham. It's an abomination, fruit does not belong on pizza.",
  );
}, 60_000);

describe("PasteClient with every lane off (production today)", () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders the one input: title, type selector, example, limit and the offline consent line", () => {
    stubFetch({});
    const view = render(<PasteClient lanes={OFFLINE} />);

    expect(view.getByRole("heading", { level: 1 }).textContent).toBe(
      "What is the argument really resting on?",
    );
    for (const type of ["Conversation", "Article", "My own draft"]) {
      expect(view.getByLabelText(type)).toBeTruthy();
    }
    expect(view.getByText("0 / 20,000 characters")).toBeTruthy();
    expect(view.getByRole("note", { name: "How your text is handled" }).textContent).toContain(
      "Nothing you paste leaves our server",
    );
    expect(view.queryByText(/Programmatic|Include .*Judg/i)).toBeNull();
  });

  it("shows the map, its crux and the next step, and asks only the map lane", async () => {
    const fetchMock = stubFetch({ "/api/analyze": () => jsonResponse({ maps: matched }) });
    const view = render(<PasteClient lanes={OFFLINE} />);

    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByRole("heading", { name: "This argument is already mapped" }));
    expect(view.getByText("Immigration and Wages")).toBeTruthy();
    expect(view.getByText("What would change a supporter’s mind")).toBeTruthy();
    expect(view.getByText("Supports it")).toBeTruthy();
    expect(view.getByText("Cuts against it")).toBeTruthy();
    expect(
      view.getByRole("link", { name: "Open the map at this crux" }).getAttribute("href"),
    ).toBe("/topics/immigration-wage-impact#crux-labor-market-economics");
    expect(view.getByRole("button", { name: "Copy a summary" })).toBeTruthy();
    expect(view.getByText("Did this change what you thought you were arguing about?")).toBeTruthy();
    // The same answers the question has under every map.
    for (const answer of ["Yes", "A little", "No"]) {
      expect(view.getByRole("button", { name: answer })).toBeTruthy();
    }
    expect(view.getByText("How this was read")).toBeTruthy();
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual(["/api/analyze"]);
  });

  it("names the map, its sibling once, then the crux with its action right under it", async () => {
    const sibling = { id: "open-borders", title: "The Case for Open Borders", claim: "A claim.", href: "/topics/open-borders" };
    stubFetch({ "/api/analyze": () => jsonResponse({ maps: { ...matched, related: [sibling], closest: [] } }) });
    const view = render(<PasteClient lanes={OFFLINE} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    const mapHeading = await waitFor(() => view.getByRole("heading", { name: "This argument is already mapped" }));
    const cruxHeading = view.getByRole("heading", { name: "What the map says it turns on" });
    const cta = view.getByRole("link", { name: "Open the map at this crux" });
    const cardsHeading = view.getByRole("heading", { name: "The strongest card on each side" });
    // Node.DOCUMENT_POSITION_FOLLOWING === 4: map, crux, its action, then the cards.
    expect(mapHeading.compareDocumentPosition(cruxHeading) & 4).toBe(4);
    expect(cruxHeading.compareDocumentPosition(cta) & 4).toBe(4);
    expect(cta.compareDocumentPosition(cardsHeading) & 4).toBe(4);
    // The sibling is named once, under the map's claim, on the first screen.
    const visible = view.getAllByText(/Closely related/).filter((el) => !el.closest(".sr-only"));
    expect(visible).toHaveLength(1);
    const links = view.getAllByRole("link", { name: /^The Case for Open Borders/ });
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/topics/open-borders");
    expect(view.queryByRole("heading", { name: "Closely related" })).toBeNull();
    // The announcement names the sibling too.
    const announcer = view.getAllByRole("status").find((el) => el.className.includes("sr-only"));
    expect(announcer?.textContent).toBe(
      "Result below. This argument is already mapped: Immigration and Wages. Closely related: The Case for Open Borders.",
    );
  });

  it("announces what came back through a status region that was there before the submit", async () => {
    stubFetch({ "/api/analyze": () => jsonResponse({ maps: { ...matched, related: [] } }) });
    const view = render(<PasteClient lanes={OFFLINE} />);
    const announcer = view
      .getAllByRole("status")
      .find((el) => el.className.includes("sr-only"));
    expect(announcer?.textContent).toBe("");

    // The too-short hint is announced once, not once per keystroke: its
    // countdown is hidden from the accessibility tree.
    fireEvent.change(view.getByLabelText("The argument to read"), { target: { value: "Too short" } });
    const hint = view.getByText(/Add a little more/);
    expect(hint.getAttribute("role")).toBe("status");
    expect(hint.querySelector('[aria-hidden="true"]')?.textContent).toMatch(/to go/);

    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));
    await waitFor(() =>
      expect(announcer?.textContent).toBe(
        "Result below. This argument is already mapped: Immigration and Wages.",
      ),
    );
  });

  it("answers 'no map' with the closest maps rather than a wrong map", async () => {
    stubFetch({ "/api/analyze": () => jsonResponse({ maps: unmatched }) });
    const view = render(<PasteClient lanes={OFFLINE} />);
    fireEvent.change(view.getByLabelText("The argument to read"), {
      target: { value: "Pineapple on pizza is great. It's an abomination, fruit does not belong on pizza." },
    });
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByRole("heading", { name: /^No map/ }));
    expect(view.queryByRole("link", { name: "Open the map at this crux" })).toBeNull();
    expect(view.queryByRole("heading", { name: "Closely related" })).toBeNull();
  });

  it("submits the home page's paste on arrival, once, under Strict Mode", async () => {
    const fetchMock = stubFetch({ "/api/analyze": () => jsonResponse({ maps: matched }) });
    sessionStorage.setItem(
      PASTE_PREFILL_KEY,
      JSON.stringify({ content: DISAGREEMENT_EXAMPLE_SOURCE, contentType: "freeform" }),
    );
    const view = render(
      <StrictMode>
        <PasteClient lanes={OFFLINE} />
      </StrictMode>,
    );

    await waitFor(() => view.getByRole("heading", { name: "This argument is already mapped" }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(PASTE_PREFILL_KEY)).toBeNull();
  });

  it("keeps the input and offers a retry when the map lane fails", async () => {
    stubFetch({
      "/api/analyze": () => jsonResponse({ error: "The maps could not be searched just now." }, false),
    });
    const view = render(<PasteClient lanes={OFFLINE} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByRole("alert"));
    expect(view.getByRole("alert").textContent).toContain("The maps could not be searched just now.");
    expect((view.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toContain("Immigration");
    expect(view.getByRole("button", { name: "Try again" })).toBeTruthy();
  });
});

describe("PasteClient with the diagnosis lane on", () => {
  let diagnosis: unknown;

  beforeAll(async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    const bundle = await analyzeDisagreement({
      content: `${example.source}\n\n${"Context for length. ".repeat(8)}`,
      contentType: "conversation",
      requestId: "11111111-1111-1111-1111-111111111111",
      provider: new FakeDisagreementProvider(example.extraction),
    });
    diagnosis = {
      report: bundle.report,
      graph: bundle.graph,
      execution: { model: "fixture", promptVersion: "v1", latencyMs: 450 },
      publishing: { available: false, unavailableReason: "Publishing is not configured." },
    };
  });

  beforeEach(() => sessionStorage.clear());
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("puts the diagnosis above the map, in one document, without Share when publishing is off", async () => {
    stubFetch({
      "/api/analyze": () => jsonResponse({ maps: matched }),
      "/api/disagreements/analyze": () => jsonResponse(diagnosis),
    });
    const view = render(<PasteClient lanes={FIXTURES} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByText("Argumend diagnosis"));
    const masthead = view.getByText("Argumend diagnosis");
    const mapHeading = view.getByRole("heading", { name: "This argument is already mapped" });
    // Node.DOCUMENT_POSITION_FOLLOWING === 4: the map comes after the diagnosis.
    expect(masthead.compareDocumentPosition(mapHeading) & 4).toBe(4);
    expect(view.queryByRole("button", { name: /shareable link/i })).toBeNull();
    expect(view.getByText(/test fixtures, not a live model/)).toBeTruthy();
  });

  it("still shows the map when the diagnosis fails", async () => {
    stubFetch({
      "/api/analyze": () => jsonResponse({ maps: matched }),
      "/api/disagreements/analyze": () =>
        jsonResponse({ error: "The analysis timed out. Please try again.", code: "MODEL_TIMEOUT" }, false),
    });
    const view = render(<PasteClient lanes={FIXTURES} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByText(/The full reading did not run this time/));
    expect(view.getByRole("heading", { name: "This argument is already mapped" })).toBeTruthy();
    expect(view.queryByRole("alert")).toBeNull();
  });

  it("waits for the button when the lane would send the handed-off text to a provider", async () => {
    const fetchMock = stubFetch({});
    sessionStorage.setItem(
      PASTE_PREFILL_KEY,
      JSON.stringify({ content: DISAGREEMENT_EXAMPLE_SOURCE, contentType: "freeform" }),
    );
    const view = render(<PasteClient lanes={HOSTED} />);

    await waitFor(() =>
      expect((view.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toContain(
        "Immigration",
      ),
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 80));
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(view.getByRole("note", { name: "How your text is handled" }).textContent).toContain(
      "sent to Anthropic",
    );
  });
});
