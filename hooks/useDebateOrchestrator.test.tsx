import "@/test/setup-dom";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Topic } from "@/types/logic";

vi.mock("@/lib/constants", () => ({
  DEBATE: {
    DEFAULT_ROUNDS: 2,
    MIN_ROUNDS: 1,
    MAX_ROUNDS: 5,
    TURN_DELAY: 0,
    ROUND_DELAY: 0,
    ROUND_OPTIONS: [1, 2, 3],
    ENABLE_LIVE_API: true,
    ENABLE_LIVE_JUDGING: false,
  },
}));

vi.mock("@/data/mockDebates", () => ({
  getMockDebate: () => [
    {
      id: "mock-for-1",
      side: "for",
      model: "claude",
      content: "Example proposition",
      round: 1,
    },
    {
      id: "mock-against-1",
      side: "against",
      model: "gpt-4",
      content: "Example opposition",
      round: 1,
    },
  ],
  getMockDebateModels: () => ({ forModel: "claude", againstModel: "gpt-4" }),
  getMockDebateRounds: () => 1,
}));

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { useDebateOrchestrator } from "./useDebateOrchestrator";

const encoder = new TextEncoder();

function topic(id: string): Topic {
  return {
    id,
    title: id,
    meta_claim: `Claim for ${id}`,
    pillars: [],
  } as unknown as Topic;
}

function jsonResponse(data: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    body: null,
  } as unknown as Response;
}

function controlledSse() {
  let streamController!: ReadableStreamDefaultController<Uint8Array>;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
    },
  });
  return {
    response: {
      ok: true,
      status: 200,
      json: async () => ({}),
      body: stream,
    } as unknown as Response,
    token(value: string) {
      streamController.enqueue(
        encoder.encode(`data: ${JSON.stringify({ token: value })}\n\n`)
      );
    },
    close() {
      streamController.close();
    },
  };
}

function completedSse(value: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "token", token: value })}\n\n`)
      );
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({
          type: "complete",
          execution: {
            requested: "live",
            actual: "live",
            requestedModel: "claude",
            actualModel: "claude",
          },
        })}\n\n`)
      );
      controller.close();
    },
  });
  return {
    ok: true,
    status: 200,
    json: async () => ({}),
    body: stream,
  } as unknown as Response;
}

function fallbackSse(partial: string, replacement: string): Response {
  const events = [
    { type: "token", token: partial },
    { type: "replace" },
    { type: "token", token: replacement },
    {
      type: "complete",
      execution: {
        requested: "live",
        actual: "programmatic",
        requestedModel: "claude",
        actualModel: null,
        fallbackCode: "PROVIDER_ERROR",
      },
    },
  ];
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const event of events) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
        );
      }
      controller.close();
    },
  });
  return {
    ok: true,
    status: 200,
    json: async () => ({}),
    body: stream,
  } as unknown as Response;
}

function bodyOf(call: unknown[]): Record<string, unknown> | null {
  const init = call[1] as RequestInit | undefined;
  return typeof init?.body === "string" ? JSON.parse(init.body) : null;
}

function setupFetch(streamResponses: Response[]) {
  const streamQueue = [...streamResponses];
  const fetchMock = vi.fn(
    async (input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
    const url = String(input);
    if (url === "/api/debate/persist") {
      return jsonResponse({ id: "debate-1" });
    }
    if (url === "/api/debate/stream") {
      const response = streamQueue.shift();
      if (!response) throw new Error("Unexpected stream request");
      return response;
    }
    if (url === "/api/judge") {
      return jsonResponse({ winner: "draw" });
    }
    throw new Error(`Unexpected request: ${url}`);
    }
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function selectModels(
  result: { current: ReturnType<typeof useDebateOrchestrator> }
) {
  act(() => {
    result.current.setForModel("claude");
    result.current.setAgainstModel("gpt-4");
  });
  await waitFor(() => expect(result.current.canStart).toBe(true));
}

describe("useDebateOrchestrator lifecycle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exposes live debate and judging modes independently", () => {
    const { result } = renderHook(() =>
      useDebateOrchestrator(topic("one"), "one")
    );

    expect(result.current.liveDebateEnabled).toBe(true);
    expect(result.current.liveJudgingEnabled).toBe(false);
  });

  it("aborts and persists cancellation when reset during a stream", async () => {
    const stream = controlledSse();
    const fetchMock = setupFetch([stream.response]);
    const { result } = renderHook(() =>
      useDebateOrchestrator(topic("one"), "one")
    );
    await selectModels(result);

    let run!: Promise<void>;
    act(() => {
      run = result.current.startDebate();
    });
    await waitFor(() => expect(result.current.state.messages).toHaveLength(1));

    act(() => result.current.resetDebate());

    const streamCall = fetchMock.mock.calls.find(
      ([url]) => String(url) === "/api/debate/stream"
    );
    expect((streamCall?.[1] as RequestInit).signal?.aborted).toBe(true);
    expect(result.current.state.phase).toBe("setup");
    expect(result.current.state.messages).toEqual([]);
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some(
          (call) => bodyOf(call)?.status === "cancelled"
        )
      ).toBe(true)
    );

    stream.token("late");
    stream.close();
    await act(async () => run);
  });

  it("resets and aborts the old run when the topic changes", async () => {
    const stream = controlledSse();
    const fetchMock = setupFetch([stream.response]);
    const first = topic("one");
    const second = topic("two");
    const { result, rerender } = renderHook(
      ({ selectedTopic, id }) =>
        useDebateOrchestrator(selectedTopic, id),
      { initialProps: { selectedTopic: first, id: first.id } }
    );
    await selectModels(result);

    let run!: Promise<void>;
    act(() => {
      run = result.current.startDebate();
    });
    await waitFor(() => expect(result.current.state.messages).toHaveLength(1));

    rerender({ selectedTopic: second, id: second.id });
    await waitFor(() => expect(result.current.state.phase).toBe("setup"));

    const streamCall = fetchMock.mock.calls.find(
      ([url]) => String(url) === "/api/debate/stream"
    );
    expect((streamCall?.[1] as RequestInit).signal?.aborted).toBe(true);
    expect(result.current.state.messages).toEqual([]);
    expect(result.current.state.forModel).toBeNull();

    stream.close();
    await act(async () => run);
  });

  it("ignores chunks delivered after a run token has been invalidated", async () => {
    const stream = controlledSse();
    setupFetch([stream.response]);
    const { result } = renderHook(() =>
      useDebateOrchestrator(topic("one"), "one")
    );
    await selectModels(result);

    let run!: Promise<void>;
    act(() => {
      run = result.current.startDebate();
    });
    await waitFor(() => expect(result.current.state.messages).toHaveLength(1));
    act(() => result.current.resetDebate());

    stream.token("stale content must never return");
    stream.close();
    await act(async () => run);

    expect(result.current.state.messages).toEqual([]);
    expect(result.current.state.phase).toBe("setup");
  });

  it("marks a provider failure as failed instead of completed", async () => {
    const fetchMock = setupFetch([
      completedSse("A complete first-side argument"),
      jsonResponse({ error: "provider unavailable" }, 502),
    ]);
    const { result } = renderHook(() =>
      useDebateOrchestrator(topic("one"), "one")
    );
    await selectModels(result);

    await act(async () => result.current.startDebate());

    expect(result.current.state.phase).toBe("failed");
    expect(result.current.state.messages).toHaveLength(1);
    expect(result.current.state.error).toBe(
      "This debate turn could not be generated. Please try again."
    );
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some((call) => bodyOf(call)?.status === "failed")
      ).toBe(true)
    );
    expect(
      fetchMock.mock.calls.some((call) => bodyOf(call)?.status === "completed")
    ).toBe(false);
  });

  it("does not judge a partial or failed debate", async () => {
    const fetchMock = setupFetch([
      completedSse("Only one side completed"),
      jsonResponse({ error: "second side failed" }, 502),
    ]);
    const { result } = renderHook(() =>
      useDebateOrchestrator(topic("one"), "one")
    );
    await selectModels(result);
    await act(async () => result.current.startDebate());

    await act(async () => result.current.requestJudgment());

    expect(result.current.state.phase).toBe("failed");
    expect(result.current.state.judgingResult).toBeNull();
    expect(
      fetchMock.mock.calls.some(([url]) => String(url) === "/api/judge")
    ).toBe(false);
  });

  it("rejects malformed successful judgment responses", async () => {
    setupFetch([
      completedSse("A complete proposition argument"),
      completedSse("A complete opposition argument"),
    ]);
    const { result } = renderHook(() =>
      useDebateOrchestrator(topic("one"), "one")
    );
    await selectModels(result);
    act(() => result.current.setMaxRounds(1));
    await waitFor(() => expect(result.current.state.maxRounds).toBe(1));
    await act(async () => result.current.startDebate());

    await act(async () => result.current.requestJudgment());

    expect(result.current.state.judgingResult).toBeNull();
    expect(result.current.state.isJudging).toBe(false);
    expect(result.current.state.error).toBe(
      "The judging service returned an invalid response. Please try again."
    );
  });

  it("treats a provider fallback completion as success and replaces partial live output", async () => {
    setupFetch([
      fallbackSse("private partial live output", "Programmatic replacement"),
      completedSse("Opposition response"),
    ]);
    const { result } = renderHook(() =>
      useDebateOrchestrator(topic("one"), "one")
    );
    await selectModels(result);
    act(() => result.current.setMaxRounds(1));
    await waitFor(() => expect(result.current.state.maxRounds).toBe(1));

    await act(async () => result.current.startDebate());

    expect(result.current.state.phase).toBe("complete");
    expect(result.current.state.error).toBeNull();
    expect(result.current.state.messages[0]?.content).toBe(
      "Programmatic replacement"
    );
    expect(result.current.state.messages[0]?.content).not.toContain("private");
    expect(result.current.state.messages[0]?.execution).toEqual({
      requested: "live",
      actual: "programmatic",
      requestedModel: "claude",
      actualModel: null,
      fallbackCode: "PROVIDER_ERROR",
    });
  });

  it("aborts an active stream on unmount", async () => {
    const stream = controlledSse();
    const fetchMock = setupFetch([stream.response]);
    const { result, unmount } = renderHook(() =>
      useDebateOrchestrator(topic("one"), "one")
    );
    await selectModels(result);

    let run!: Promise<void>;
    act(() => {
      run = result.current.startDebate();
    });
    await waitFor(() => expect(result.current.state.messages).toHaveLength(1));
    unmount();

    const streamCall = fetchMock.mock.calls.find(
      ([url]) => String(url) === "/api/debate/stream"
    );
    expect((streamCall?.[1] as RequestInit).signal?.aborted).toBe(true);
    stream.close();
    await act(async () => run);
  });

  it("loads example messages only when the user requests the mock debate", async () => {
    const { result } = renderHook(() =>
      useDebateOrchestrator(topic("ai-risk"), "ai-risk")
    );

    expect(result.current.topicHasMockData).toBe(true);
    expect(result.current.displayMessages).toEqual([]);

    await act(async () => result.current.viewMockDebate());

    expect(result.current.state.phase).toBe("mockView");
    expect(result.current.displayMessages).toHaveLength(2);
    expect(result.current.state.currentRound).toBe(1);
  });
});
