import "@/test/setup-dom";
import { Component, type ReactNode } from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { FakeJevProvider } from "@/lib/jev/fake";
import { RENT_CONTROL_JEV_FIXTURES, RENT_CONTROL_THREAD } from "@/lib/mapReply/__fixtures__";
import { runMapReply } from "@/lib/mapReply/pipeline";
import { MapReplyResultSchema } from "@/lib/mapReply/schema";
import type { MapReplyMatch, MapReplyNoMatch } from "@/lib/mapReply/types";
import { MapReplyClient } from "./MapReplyClient";

class RenderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p>Client render failed</p> : this.props.children; }
}

let match: MapReplyMatch;
let noMatch: MapReplyNoMatch;

beforeAll(async () => {
  const matched = await runMapReply({ text: RENT_CONTROL_THREAD, provider: new FakeJevProvider(RENT_CONTROL_JEV_FIXTURES) });
  const missed = await runMapReply({ text: RENT_CONTROL_THREAD, provider: new FakeJevProvider(RENT_CONTROL_JEV_FIXTURES), topicConfidenceThreshold: 0.99 });
  if (!matched.ok || missed.ok) throw new Error("Expected both real pipeline result variants");
  match = matched;
  noMatch = missed;
});

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function setup() {
  const view = render(<RenderBoundary><MapReplyClient /></RenderBoundary>);
  fireEvent.click(view.getByRole("button", { name: "Load example" }));
  return view;
}

describe("MapReplyClient API boundary", () => {
  it.each(["match", "no-match"] as const)("renders a genuine %s pipeline response", async (kind) => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ requestId: "boundary-real", ...(kind === "match" ? match : noMatch) }));
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    await view.findByRole("button", { name: "Map another thread" });
    expect(view.queryByText("Client render failed")).toBeNull();
    expect(view.queryByRole("alert")).toBeNull();
  });

  it.each([true, false])("rejects an incomplete successful response with ok=%s", async (ok) => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ ok }));
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    expect(await view.findByRole("alert")).toBeTruthy();
    expect(view.queryByText("Client render failed")).toBeNull();
    expect((view.getByRole("button", { name: "Map this thread" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it.each(["nested", "source-url", "topic-path", "probability"] as const)("rejects invalid %s fields before rendering", async (kind) => {
    const body = structuredClone(match) as unknown as Record<string, unknown>;
    if (kind === "nested") body.execution = { redactions: null };
    if (kind === "source-url") body.evidence = [{ ...match.evidence[0], sourceUrl: "javascript:alert(1)" }];
    if (kind === "topic-path") body.topic = { ...match.topic, path: "javascript:alert(1)" };
    if (kind === "probability") body.topicChoice = { ...match.topicChoice, confidence: 7 };
    vi.mocked(fetch).mockResolvedValueOnce(Response.json(body));
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    expect((await view.findByRole("alert")).textContent).toContain("Something went wrong");
    expect(view.queryByText("Client render failed")).toBeNull();
  });

  it("keeps typed input available and allows retry after a malformed response", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json({ ok: true }))
      .mockResolvedValueOnce(Response.json(match));
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    await view.findByRole("alert");
    expect((view.getByRole("textbox", { name: "Thread to map" }) as HTMLTextAreaElement).value).toBe(RENT_CONTROL_THREAD);
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    await view.findByRole("link", { name: match.topic.title });
    expect(view.queryByRole("alert")).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("uses a typed server error message for an unknown error code", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ code: "NEW_SERVER_CODE", error: "Please try again soon." }, { status: 503 }));
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    expect((await view.findByRole("alert")).textContent).toContain("Please try again soon.");
  });

  it.each([
    { error: { privateDetail: "not display copy" }, requestId: { invalid: true } },
    { code: "constructor" },
  ])("handles malformed error envelopes: %j", async (body) => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json(body, { status: 503 }));
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    expect((await view.findByRole("alert")).textContent).toContain("Something went wrong");
    expect(view.queryByText("Client render failed")).toBeNull();
  });

  it("cancels the request when the client unmounts", () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => undefined));
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    const signal = vi.mocked(fetch).mock.calls[0][1]?.signal;
    expect(signal).toBeInstanceOf(AbortSignal);
    expect(signal?.aborted).toBe(false);
    view.unmount();
    expect(signal?.aborted).toBe(true);
  });

  it("does not read a response returned after unmount", async () => {
    let finish!: (response: Response) => void;
    vi.mocked(fetch).mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
    const view = setup();
    fireEvent.click(view.getByRole("button", { name: "Map this thread" }));
    view.unmount();
    const json = vi.fn(async () => match);
    await act(async () => finish({ ok: true, json } as unknown as Response));
    expect(json).not.toHaveBeenCalled();
  });

  it("cancels while the response body is pending", async () => {
    let finish!: (body: unknown) => void;
    const json = vi.fn(() => new Promise((resolve) => { finish = resolve; }));
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true, json } as unknown as Response);
    const view = setup();
    await act(async () => fireEvent.click(view.getByRole("button", { name: "Map this thread" })));
    expect(json).toHaveBeenCalledOnce();
    const signal = vi.mocked(fetch).mock.calls[0][1]?.signal;
    view.unmount();
    expect(signal?.aborted).toBe(true);
    await act(async () => finish({ ok: true }));
  });

  it("dispatches one request for two submissions before React rerenders", () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => undefined));
    const view = setup();
    const form = view.getByRole("button", { name: "Map this thread" }).closest("form")!;
    act(() => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("MapReplyResultSchema genuine refusal variants", () => {
  it.each(["no_turns", "no_candidates", "map_unavailable"] as const)("accepts the pipeline's %s result", async (reason) => {
    const result = await runMapReply({
      text: reason === "no_turns" ? "   " : reason === "no_candidates" ? "the and of to a" : RENT_CONTROL_THREAD,
      provider: new FakeJevProvider(RENT_CONTROL_JEV_FIXTURES),
      ...(reason === "map_unavailable" ? { loadTopic: async () => null } : {}),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe(reason);
    expect(MapReplyResultSchema.safeParse(result).success).toBe(true);
  });
});
