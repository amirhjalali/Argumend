import "@/test/setup-dom";
import { act, cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { PASTE_PREFILL_KEY } from "@/lib/paste/handoff";
import { PASTE_LIMITS } from "@/lib/paste/limits";
import { findMaps } from "@/lib/paste/maps";
import { ASSISTED_LIVING_PASTE } from "@/lib/paste/testPastes";
import type { PasteLanes, PasteMapsResult } from "@/lib/paste/types";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { clearWorkingPaste, PasteClient } from "./PasteClient";

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

beforeEach(clearWorkingPaste);
afterEach(() => vi.restoreAllMocks());

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

  it("keeps an oversized draft intact and blocks submission until it is shortened", () => {
    const fetchMock = stubFetch({});
    const view = render(<PasteClient lanes={OFFLINE} />);
    const input = view.getByLabelText("The argument to read") as HTMLTextAreaElement;
    const draft = `${"a".repeat(PASTE_LIMITS.maxCharacters)} ORIGINAL ENDING`;
    fireEvent.change(input, { target: { value: draft } });
    expect(input.value).toBe(draft);
    expect(input.getAttribute("maxlength")).toBeNull();
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(view.getByRole("alert").textContent).toContain("Your full draft is still here");
    const submit = view.getByRole("button", { name: "Find what it turns on" }) as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    fireEvent.click(submit);
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: "a".repeat(PASTE_LIMITS.maxCharacters) } });
    expect(submit.disabled).toBe(false);
    expect(view.queryByRole("alert")).toBeNull();
  });

  it("preserves an oversized incoming handoff without auto-submitting a shortened draft", async () => {
    const fetchMock = stubFetch({ "/api/analyze": () => jsonResponse({ maps: matched }) });
    const draft = `${"a".repeat(PASTE_LIMITS.maxCharacters)} ORIGINAL ENDING`;
    sessionStorage.setItem(PASTE_PREFILL_KEY, JSON.stringify({ content: draft }));
    const view = render(<PasteClient lanes={OFFLINE} />);
    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).not.toHaveBeenCalled();
    expect((view.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe(draft);
    expect(view.getByRole("alert").textContent).toContain("Your full draft is still here");
  });

  it("shows the map, its crux and the next step, and asks only the map lane", async () => {
    const fetchMock = stubFetch({ "/api/analyze": () => jsonResponse({ maps: matched }) });
    const view = render(<PasteClient lanes={OFFLINE} />);

    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByRole("heading", { name: "This argument is already mapped" }));
    // Named by the question its map page asks, never the old Title-Case label.
    expect(view.getByRole("link", { name: "Does large-scale immigration significantly cut low-skilled native wages?" })).toBeTruthy();
    expect(view.queryByText("Immigration and Wages")).toBeNull();
    // Sides by the answer to that question, said in full under the crux.
    expect(
      view.getByText("What would change the mind of someone who says yes to the map’s question"),
    ).toBeTruthy();
    expect(view.getByText("Points to yes")).toBeTruthy();
    expect(view.getByText("Points to no")).toBeTruthy();
    expect(view.queryByText(/Supports it|Cuts against it/)).toBeNull();
    // The example exchange is about both of the map's cruxes (wages now,
    // growth later), so both are shown, and the action opens the first.
    expect(view.getByRole("heading", { name: "It may turn on one of these" })).toBeTruthy();
    expect(
      view.getByRole("link", { name: "Open the map at the first crux" }).getAttribute("href"),
    ).toBe("/topics/immigration-wage-impact#crux-labor-market-economics");
    expect(
      view
        .getByRole("link", { name: "Do long-run growth gains outweigh short-term costs for low-skill native workers?" })
        .getAttribute("href"),
    ).toBe("/topics/immigration-wage-impact#crux-long-term-economic-effects");
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
    const cruxHeading = view.getByRole("heading", { name: "It may turn on one of these" });
    const cta = view.getByRole("link", { name: "Open the map at the first crux" });
    const cardsHeading = view.getByRole("heading", { name: "The strongest card on each side" });
    // Node.DOCUMENT_POSITION_FOLLOWING === 4: map, crux, its action, then the cards.
    expect(mapHeading.compareDocumentPosition(cruxHeading) & 4).toBe(4);
    expect(cruxHeading.compareDocumentPosition(cta) & 4).toBe(4);
    expect(cta.compareDocumentPosition(cardsHeading) & 4).toBe(4);
    // The sibling is named once, under the map's claim, on the first screen.
    const mapBlock = within(view.getByRole("region", { name: "This argument is already mapped" }));
    expect(mapBlock.getAllByText(/Closely related/)).toHaveLength(1);
    const links = view.getAllByRole("link", { name: /^The Case for Open Borders/ });
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/topics/open-borders");
    expect(view.queryByRole("heading", { name: "Closely related" })).toBeNull();
    // The announcement names the sibling too.
    const announcer = view.getAllByRole("status").find((el) => el.className.includes("sr-only"));
    expect(announcer?.textContent).toBe(
      "Result below. This argument is already mapped: Does large-scale immigration significantly cut low-skilled native wages? Closely related: The Case for Open Borders.",
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
        "Result below. This argument is already mapped: Does large-scale immigration significantly cut low-skilled native wages?",
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
    expect(view.queryByRole("link", { name: /^Open the map at (this|the first) crux$/ })).toBeNull();
    expect(view.queryByRole("heading", { name: "Closely related" })).toBeNull();
  });

  it("preserves notes for unchanged text and clears them for a different argument or a fresh start", async () => {
    stubFetch({ "/api/analyze": () => jsonResponse({ maps: unmatched }) });
    const view = render(<PasteClient lanes={OFFLINE} />);
    const first = "My partner wants a holiday. I want to keep our savings for emergencies.";
    const second = "My sibling wants to sell our parents' house. I want to keep it in the family.";
    const waitForResult = () => waitFor(() => view.getByRole("heading", { name: /^No map/ }));
    const read = () => fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    fireEvent.change(view.getByLabelText("The argument to read"), { target: { value: first } });
    read();
    await waitForResult();
    for (const [label, value] of [
      ["You would think again if…", "we kept an emergency fund"],
      ["They would think again if…", "we planned time together"],
      ["We both agree that…", "we want less stress"],
    ]) {
      fireEvent.change(view.getByLabelText(label), { target: { value } });
    }
    fireEvent.click(view.getByRole("button", { name: "Edit" }));
    read();
    await waitForResult();
    expect((view.getByLabelText("You would think again if…") as HTMLInputElement).value).toBe("we kept an emergency fund");
    expect((view.getByLabelText("They would think again if…") as HTMLInputElement).value).toBe("we planned time together");
    expect((view.getByLabelText("We both agree that…") as HTMLInputElement).value).toBe("we want less stress");

    fireEvent.click(view.getByRole("button", { name: "Edit" }));
    fireEvent.change(view.getByLabelText("The argument to read"), { target: { value: second } });
    read();
    await waitForResult();
    expect(view.queryByRole("region", { name: "Your conversation notes" })).toBeNull();
    expect((view.getByLabelText("You would think again if…") as HTMLInputElement).value).toBe("");

    fireEvent.change(view.getByLabelText("We both agree that…"), { target: { value: "family matters" } });
    fireEvent.click(view.getByRole("button", { name: "Paste another" }));
    fireEvent.change(view.getByLabelText("The argument to read"), { target: { value: second } });
    read();
    await waitForResult();
    expect(view.queryByRole("region", { name: "Your conversation notes" })).toBeNull();
    expect((view.getByLabelText("We both agree that…") as HTMLInputElement).value).toBe("");
  });

  it("gives a family argument no map covers a guide to read it, and no closest maps", async () => {
    const assisted = await findMaps(ASSISTED_LIVING_PASTE);
    const fetchMock = stubFetch({ "/api/analyze": () => jsonResponse({ maps: assisted }) });
    const view = render(<PasteClient lanes={OFFLINE} />);
    const announcer = view.getAllByRole("status").find((el) => el.className.includes("sr-only"));
    fireEvent.change(view.getByLabelText("The argument to read"), { target: { value: ASSISTED_LIVING_PASTE } });
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByRole("heading", { name: "No map, rather than the wrong map" }));
    expect(view.queryByRole("heading", { name: "Closest maps" })).toBeNull();
    expect(view.getByRole("heading", { name: "Read it yourself" })).toBeTruthy();
    for (const question of [
      "Is this about a fact, a value, or a word?",
      "What would change each person’s mind?",
      "What do you both already agree on?",
    ]) {
      expect(view.getByRole("heading", { name: question })).toBeTruthy();
    }
    // Cues quote the reader's own sentence, labelled as a word search.
    expect(view.getByText("A word search, not a reading. It can be wrong.")).toBeTruthy();
    expect(view.getByText("“Assisted living is the responsible choice.”")).toBeTruthy();
    // The guide distinguishes the reader's notes from automated analysis.
    expect(view.getByText(/These are your notes, not an automated reading/)).toBeTruthy();
    expect(view.getByRole("link", { name: "What a crux is" }).getAttribute("href")).toBe("/concepts/cruxes");
    expect(view.getByRole("link", { name: "Browse all maps" }).getAttribute("href")).toBe("/topics");
    expect(announcer?.textContent).toBe(
      "Result below. No map stood out for this text. Then three questions to read it yourself.",
    );

    // What the reader writes stays in the page: no request, nothing stored.
    fireEvent.change(view.getByLabelText("You would think again if…"), {
      target: { value: "a nurse said she is safe alone" },
    });
    fireEvent.change(view.getByLabelText("We both agree that…"), { target: { value: "Mom's safety comes first" } });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sessionStorage.length).toBe(0);
  });

  it("restores the draft, result and notes on returning, without a request or durable browser writes", async () => {
    const fetchMock = stubFetch({ "/api/analyze": () => jsonResponse({ maps: unmatched }) });
    const storageWrite = vi.spyOn(window.sessionStorage, "setItem");
    const localWrite = vi.spyOn(window.localStorage, "setItem");
    const historyWrite = vi.spyOn(window.history, "replaceState");
    const first = render(<PasteClient lanes={OFFLINE} />);
    fireEvent.change(first.getByLabelText("The argument to read"), { target: { value: "Our argument about pineapple on pizza should stay private." } });
    fireEvent.click(first.getByRole("button", { name: "Find what it turns on" }));
    await waitFor(() => first.getByRole("heading", { name: "No map, rather than the wrong map" }));
    fireEvent.change(first.getByLabelText("You would think again if…"), { target: { value: "we tried it together" } });
    first.unmount();
    const returned = render(<StrictMode><PasteClient lanes={OFFLINE} /></StrictMode>);
    await waitFor(() => expect((returned.getByLabelText("You would think again if…") as HTMLInputElement).value).toBe("we tried it together"));
    fireEvent.click(returned.getByRole("button", { name: "Edit" }));
    expect((returned.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe("Our argument about pineapple on pizza should stay private.");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(storageWrite).not.toHaveBeenCalled();
    expect(localWrite).not.toHaveBeenCalled();
    expect(historyWrite).not.toHaveBeenCalled();
  });

  it("lets a new home handoff replace the working argument and clears it with Paste another", async () => {
    const fetchMock = stubFetch({ "/api/analyze": () => jsonResponse({ maps: matched }) });
    const first = render(<PasteClient lanes={OFFLINE} />);
    fireEvent.change(first.getByLabelText("The argument to read"), { target: { value: "An earlier unsent draft that must be replaced." } });
    first.unmount();
    sessionStorage.setItem(PASTE_PREFILL_KEY, JSON.stringify({ content: DISAGREEMENT_EXAMPLE_SOURCE, contentType: "article" }));
    const next = render(<PasteClient lanes={OFFLINE} />);
    await waitFor(() => next.getByRole("heading", { name: "This argument is already mapped" }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(PASTE_PREFILL_KEY)).toBeNull();
    fireEvent.click(next.getByRole("button", { name: "Paste another" }));
    next.unmount();
    const blank = render(<PasteClient lanes={OFFLINE} />);
    expect((blank.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe("");
    expect(blank.queryByRole("region", { name: "Result" })).toBeNull();
  });

  it("restores an interrupted input without restarting its request, and ignores a late response", async () => {
    let finish!: (response: Response) => void;
    const fetchMock = stubFetch({ "/api/analyze": () => new Promise<Response>((resolve) => { finish = resolve; }) });
    const first = render(<PasteClient lanes={OFFLINE} />);
    fireEvent.click(first.getByRole("button", { name: "See an example" }));
    fireEvent.click(first.getByRole("button", { name: "Find what it turns on" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    first.unmount();
    const returned = render(<PasteClient lanes={OFFLINE} />);
    await waitFor(() => expect((returned.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe(DISAGREEMENT_EXAMPLE_SOURCE));
    expect((returned.getByRole("button", { name: "Find what it turns on" }) as HTMLButtonElement).disabled).toBe(false);
    await act(async () => finish(await jsonResponse({ maps: matched })));
    expect(returned.queryByRole("region", { name: "Result" })).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("drops the working argument when its lane configuration changes and ignores its late result", async () => {
    let finish!: (response: Response) => void;
    const fetchMock = stubFetch({ "/api/analyze": () => new Promise<Response>((resolve) => { finish = resolve; }) });
    const view = render(<PasteClient lanes={OFFLINE} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));
    view.rerender(<PasteClient lanes={HOSTED} />);
    await waitFor(() => expect((view.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe(""));
    await act(async () => finish(await jsonResponse({ maps: matched })));
    expect(view.queryByRole("region", { name: "Result" })).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
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

  it.each(["null", "[]", "42", '"old format"', '{"content":null}', "invalid JSON"])(
    "ignores a malformed home-page handoff (%s) without submitting or breaking the input",
    async (prefill) => {
      const fetchMock = stubFetch({});
      sessionStorage.setItem(PASTE_PREFILL_KEY, prefill);
      const view = render(<PasteClient lanes={OFFLINE} />);

      await act(async () => { await Promise.resolve(); });

      expect((view.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe("");
      expect(fetchMock).not.toHaveBeenCalled();
      expect(sessionStorage.getItem(PASTE_PREFILL_KEY)).toBeNull();
    },
  );

  it.each([
    ["missing result fields", { maps: {} }],
    ["invalid reading fields", () => ({ maps: { ...matched, reading: { ...matched.reading, topScore: "high" } } })],
    ["a non-string error", { error: { message: "Unavailable" } }],
  ])("keeps a retryable input when the map response has %s", async (_label, body) => {
    stubFetch({ "/api/analyze": () => jsonResponse(typeof body === "function" ? body() : body) });
    const view = render(<PasteClient lanes={OFFLINE} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByRole("alert"));

    expect(view.getByRole("alert").textContent).toContain("The maps could not be searched just now.");
    expect(view.getByRole("button", { name: "Try again" })).toBeTruthy();
    expect(view.getByLabelText("The argument to read")).toBeTruthy();
    expect(view.queryByRole("region", { name: "Result" })).toBeNull();
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

  it("returns with the ready map when a diagnosis was interrupted, without restarting that lane", async () => {
    const fetchMock = stubFetch({
      "/api/analyze": () => jsonResponse({ maps: matched }),
      "/api/disagreements/analyze": () => new Promise<Response>(() => {}),
    });
    const first = render(<PasteClient lanes={FIXTURES} />);
    fireEvent.click(first.getByRole("button", { name: "See an example" }));
    fireEvent.click(first.getByRole("button", { name: "Find what it turns on" }));
    await waitFor(() => first.getByRole("heading", { name: "This argument is already mapped" }));
    first.unmount();
    const returned = render(<PasteClient lanes={FIXTURES} />);
    await waitFor(() => returned.getByRole("heading", { name: "This argument is already mapped" }));
    expect(returned.getByText(/The reading was interrupted when you left/)).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("keeps the map usable when a successful diagnosis response has an invalid graph", async () => {
    stubFetch({
      "/api/analyze": () => jsonResponse({ maps: matched }),
      "/api/disagreements/analyze": () => jsonResponse({ ...(diagnosis as object), graph: {} }),
    });
    const view = render(<PasteClient lanes={FIXTURES} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    await waitFor(() => view.getByText(/The full reading did not run this time: The reading failed/));

    expect(view.getByRole("heading", { name: "This argument is already mapped" })).toBeTruthy();
    expect(view.queryByText("Argumend diagnosis")).toBeNull();
    expect(view.queryByRole("alert")).toBeNull();
  });

  it("ignores an earlier diagnosis that arrives after starting another paste", async () => {
    let finishFirst!: (response: Response) => void;
    const firstDiagnosis = new Promise<Response>((resolve) => { finishFirst = resolve; });
    let readings = 0;
    stubFetch({
      "/api/analyze": () => jsonResponse({ maps: matched }),
      "/api/disagreements/analyze": () => ++readings === 1
        ? firstDiagnosis
        : jsonResponse({ error: "The second reading failed." }, false),
    });
    const view = render(<PasteClient lanes={FIXTURES} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));
    await waitFor(() => view.getByRole("heading", { name: "This argument is already mapped" }));

    fireEvent.click(view.getByRole("button", { name: "Paste another" }));
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));
    await waitFor(() => view.getByText(/The second reading failed/));

    await act(async () => { finishFirst(await jsonResponse(diagnosis)); });

    expect(view.queryByText("Argumend diagnosis")).toBeNull();
    expect(view.getByText(/The second reading failed/)).toBeTruthy();
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
