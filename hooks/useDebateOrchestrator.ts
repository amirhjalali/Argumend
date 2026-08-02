"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { DebateMessage } from "@/types/debate";
import type { JudgingResult } from "@/lib/judge/rubric";
import type { Topic, LLMModel } from "@/types/logic";
import { hasMockDebate } from "@/data/mockDebateIndex";
import { DEBATE } from "@/lib/constants";
import { generateOfflineDebate } from "@/lib/debate/offline";
import { trackEvent } from "@/lib/analytics";
import type { DebatePersistenceStatus } from "@/lib/debate/status";
import { parseJudgingResult } from "@/lib/analyze/contracts";
import {
  DEBATE_GENERATION_ERROR_MESSAGE,
  INVALID_DEBATE_RESPONSE_MESSAGE,
  parseDebateStreamEvent,
  type DebateTurnExecution,
} from "@/lib/debate/contracts";

export type DebatePhase =
  | "setup"
  | "debating"
  | "paused"
  | "complete"
  | "failed"
  | "cancelled"
  | "mockView";

export interface DebateState {
  phase: DebatePhase;
  forModel: LLMModel | null;
  againstModel: LLMModel | null;
  messages: DebateMessage[];
  currentRound: number;
  maxRounds: number;
  typingSide: "for" | "against" | null;
  error: string | null;
  failedModel: LLMModel | null;
  judgingResult: JudgingResult | null;
  isJudging: boolean;
}

function isPausedPhase(phase: DebatePhase): boolean {
  return phase === "paused";
}

const INITIAL_STATE: DebateState = {
  phase: "setup",
  forModel: null,
  againstModel: null,
  messages: [],
  currentRound: 0,
  maxRounds: DEBATE.DEFAULT_ROUNDS,
  typingSide: null,
  error: null,
  failedModel: null,
  judgingResult: null,
  isJudging: false,
};

// Fire-and-forget persist helper — logs errors but never blocks UI
async function persistDebate(body: Record<string, unknown>): Promise<string | null> {
  try {
    const res = await fetch("/api/debate/persist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.id ?? null;
  } catch {
    return null;
  }
}

interface DebateRun {
  token: number;
  controller: AbortController;
}

function createAbortError(): Error {
  const error = new Error("Debate cancelled");
  error.name = "AbortError";
  return error;
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

function waitForDelay(ms: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.reject(createAbortError());
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timeout);
      reject(createAbortError());
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/** A complete debate has one non-empty message from each side for every round. */
export function isCompleteDebate(
  messages: DebateMessage[],
  expectedRounds: number
): boolean {
  if (expectedRounds < 1 || messages.length !== expectedRounds * 2) return false;
  for (let round = 1; round <= expectedRounds; round++) {
    for (const side of ["for", "against"] as const) {
      const message = messages.find(
        (candidate) => candidate.round === round && candidate.side === side
      );
      if (!message?.content.trim()) return false;
    }
  }
  return true;
}

export function useDebateOrchestrator(
  topic: Topic | undefined,
  currentTopicId: string | undefined
) {
  const phaseRef = useRef<DebatePhase>("setup");
  const debateIdRef = useRef<string | null>(null);
  const runTokenRef = useRef(0);
  const activeRunRef = useRef<DebateRun | null>(null);
  const judgeControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const previousTopicIdRef = useRef(currentTopicId);
  const persistenceRef = useRef<{
    token: number;
    creation: Promise<string | null>;
  } | null>(null);

  const [state, setState] = useState<DebateState>(INITIAL_STATE);

  useEffect(() => {
    phaseRef.current = state.phase;
  }, [state.phase]);

  const isTokenCurrent = useCallback(
    (token: number) => mountedRef.current && runTokenRef.current === token,
    []
  );

  const isRunActive = useCallback(
    (run: DebateRun) =>
      isTokenCurrent(run.token) &&
      activeRunRef.current?.token === run.token &&
      !run.controller.signal.aborted,
    [isTokenCurrent]
  );

  // React may apply queued state updaters after the async run has reached its
  // terminal phase. Token + signal are the durable stale-write guard; unlike
  // activeRunRef they remain valid long enough to commit the final chunks.
  const canCommitRun = useCallback(
    (run: DebateRun) =>
      isTokenCurrent(run.token) && !run.controller.signal.aborted,
    [isTokenCurrent]
  );

  const persistRunStatus = useCallback(
    (token: number, status: DebatePersistenceStatus) => {
      const persistence = persistenceRef.current;
      if (!persistence || persistence.token !== token) return;
      const creation = persistence.creation;
      void creation.then((debateId) => {
        if (!debateId) return;
        return persistDebate({
          action: "updateStatus",
          debateId,
          status,
        });
      });
    },
    []
  );

  /** Invalidate before aborting so buffered chunks cannot win a final race. */
  const cancelActiveRun = useCallback(() => {
    const activeRun = activeRunRef.current;
    runTokenRef.current += 1;
    judgeControllerRef.current?.abort();
    judgeControllerRef.current = null;
    if (activeRun && !activeRun.controller.signal.aborted) {
      persistRunStatus(activeRun.token, "cancelled");
      activeRun.controller.abort();
    }
    activeRunRef.current = null;
    persistenceRef.current = null;
    debateIdRef.current = null;
  }, [persistRunStatus]);

  useEffect(() => {
    if (previousTopicIdRef.current === currentTopicId) return;
    previousTopicIdRef.current = currentTopicId;
    cancelActiveRun();
    phaseRef.current = "setup";
    setState(INITIAL_STATE);
  }, [cancelActiveRun, currentTopicId]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelActiveRun();
    };
  }, [cancelActiveRun]);

  const canStart = state.forModel && state.againstModel && state.phase === "setup";
  const isSetupPhase = state.messages.length === 0 && state.phase === "setup";
  const topicHasMockData = hasMockDebate(currentTopicId);
  const liveDebateEnabled = DEBATE.ENABLE_LIVE_API;
  const liveJudgingEnabled = DEBATE.ENABLE_LIVE_JUDGING;

  // Generate argument from streaming API with progressive display
  const generateArgument = useCallback(
    async (
      side: "for" | "against",
      model: LLMModel,
      round: number,
      previousMessages: DebateMessage[],
      run: DebateRun
    ): Promise<DebateMessage> => {
      if (!isRunActive(run)) throw createAbortError();
      const response = await fetch("/api/debate/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: run.controller.signal,
        body: JSON.stringify({
          topic: topic?.meta_claim,
          topicId: topic?.id,
          side,
          model,
          round,
          previousMessages: previousMessages.map((m) => ({
            side: m.side,
            content: m.content,
            round: m.round,
          })),
          pillars: topic?.pillars.map((p) => ({
            title: p.title,
            skepticPremise: p.skeptic_premise,
            proponentRebuttal: p.proponent_rebuttal,
          })),
        }),
      });

      if (!isRunActive(run)) throw createAbortError();

      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? "Too many debate requests. Please wait a moment and try again."
            : DEBATE_GENERATION_ERROR_MESSAGE
        );
      }

      if (!response.body) {
        throw new Error(INVALID_DEBATE_RESPONSE_MESSAGE);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";
      let execution: DebateTurnExecution | null = null;

      const placeholderId = `${side}-${round}-${Date.now()}`;
      const placeholderMsg: DebateMessage = {
        id: placeholderId,
        side,
        model,
        content: "",
        round,
      };

      setState((prev) =>
        canCommitRun(run)
          ? {
              ...prev,
              messages: [...prev.messages, placeholderMsg],
              typingSide: null,
            }
          : prev
      );

      while (true) {
        const { done, value } = await reader.read();
        if (!isRunActive(run)) throw createAbortError();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          let event: ReturnType<typeof parseDebateStreamEvent>;
          try {
            event = parseDebateStreamEvent(JSON.parse(trimmed.slice(6)));
          } catch {
            throw new Error(INVALID_DEBATE_RESPONSE_MESSAGE);
          }

          switch (event.type) {
            case "token":
              fullText += event.token;
              setState((prev) =>
                canCommitRun(run)
                  ? {
                      ...prev,
                      messages: prev.messages.map((m) =>
                        m.id === placeholderId
                          ? { ...m, content: fullText }
                          : m
                      ),
                    }
                  : prev
              );
              break;
            case "replace":
              fullText = "";
              setState((prev) =>
                canCommitRun(run)
                  ? {
                      ...prev,
                      messages: prev.messages.map((message) =>
                        message.id === placeholderId
                          ? { ...message, content: "" }
                          : message
                      ),
                    }
                  : prev
              );
              break;
            case "complete":
              execution = event.execution;
              break;
            case "error":
              throw new Error(event.message);
          }
        }
      }

      if (!fullText.trim() || !execution) {
        throw new Error(INVALID_DEBATE_RESPONSE_MESSAGE);
      }
      const completedMessage = { ...placeholderMsg, content: fullText, execution };
      setState((prev) =>
        canCommitRun(run)
          ? {
              ...prev,
              messages: prev.messages.map((message) =>
                message.id === placeholderId ? completedMessage : message
              ),
            }
          : prev
      );
      return completedMessage;
    },
    [canCommitRun, isRunActive, topic]
  );

  // Run a single debate round
  const runDebateRound = useCallback(
    async (
      round: number,
      existingMessages: DebateMessage[],
      forModel: LLMModel,
      againstModel: LLMModel,
      run: DebateRun
    ): Promise<DebateMessage[]> => {
      if (!topic) return existingMessages;

      let updatedMessages = [...existingMessages];

      setState((prev) =>
        canCommitRun(run)
          ? { ...prev, typingSide: "for", error: null, failedModel: null }
          : prev
      );
      try {
        const forMessage = await generateArgument(
          "for",
          forModel,
          round,
          updatedMessages,
          run
        );
        updatedMessages = [...updatedMessages, forMessage];
        setState((prev) =>
          canCommitRun(run) ? { ...prev, typingSide: null } : prev
        );
      } catch (e) {
        if (isAbortError(e) || !isRunActive(run)) throw e;
        const errorMsg = e instanceof Error ? e.message : "Failed to generate proposition argument";
        setState((prev) =>
          canCommitRun(run)
            ? {
                ...prev,
                error: errorMsg,
                failedModel: forModel,
                typingSide: null,
              }
            : prev
        );
        throw new Error(errorMsg);
      }

      await waitForDelay(DEBATE.TURN_DELAY, run.controller.signal);
      if (!isRunActive(run)) throw createAbortError();

      setState((prev) =>
        canCommitRun(run)
          ? { ...prev, typingSide: "against", error: null, failedModel: null }
          : prev
      );
      try {
        const againstMessage = await generateArgument(
          "against",
          againstModel,
          round,
          updatedMessages,
          run
        );
        updatedMessages = [...updatedMessages, againstMessage];
        setState((prev) =>
          canCommitRun(run) ? { ...prev, typingSide: null } : prev
        );
      } catch (e) {
        if (isAbortError(e) || !isRunActive(run)) throw e;
        const errorMsg = e instanceof Error ? e.message : "Failed to generate opposition argument";
        setState((prev) =>
          canCommitRun(run)
            ? {
                ...prev,
                error: errorMsg,
                failedModel: againstModel,
                typingSide: null,
              }
            : prev
        );
        throw new Error(errorMsg);
      }

      return updatedMessages;
    },
    [topic, generateArgument, isRunActive, canCommitRun]
  );

  const startDebate = useCallback(async () => {
    if (!canStart || !state.forModel || !state.againstModel || !topic) return;
    if (activeRunRef.current) return;

    const run: DebateRun = {
      token: runTokenRef.current + 1,
      controller: new AbortController(),
    };
    runTokenRef.current = run.token;
    activeRunRef.current = run;
    phaseRef.current = "debating";

    trackEvent({
      action: "debate_start",
      topicId: topic.id,
      forModel: state.forModel,
      againstModel: state.againstModel,
    });

    // Offline debates stay entirely local. Besides avoiding an unnecessary
    // auth/database request, this keeps the promise made by the offline badge.
    const persistCreate = liveDebateEnabled
      ? persistDebate({
          action: "create",
          topicId: topic.id,
          topicTitle: topic.meta_claim,
          forModel: state.forModel,
          againstModel: state.againstModel,
          totalRounds: state.maxRounds,
        })
      : Promise.resolve(null);
    persistenceRef.current = liveDebateEnabled
      ? { token: run.token, creation: persistCreate }
      : null;
    if (liveDebateEnabled) {
      void persistCreate.then((id) => {
        if (isTokenCurrent(run.token)) debateIdRef.current = id;
      });
    }

    if (!liveDebateEnabled) {
      const offlineMessages = generateOfflineDebate(
        topic,
        state.forModel,
        state.againstModel,
        state.maxRounds
      ).map((message) => ({
        ...message,
        execution: {
          requested: "programmatic" as const,
          actual: "programmatic" as const,
          requestedModel: message.model,
          actualModel: null,
        },
      }));

      if (!isRunActive(run)) return;
      if (!isCompleteDebate(offlineMessages, state.maxRounds)) {
        phaseRef.current = "failed";
        setState((prev) => ({
          ...prev,
          phase: "failed",
          error: "The generated debate was incomplete.",
          messages: offlineMessages,
          typingSide: null,
        }));
        persistRunStatus(run.token, "failed");
        activeRunRef.current = null;
        return;
      }

      phaseRef.current = "complete";
      setState((prev) =>
        isTokenCurrent(run.token)
          ? {
              ...prev,
              phase: "complete",
              error: null,
              messages: offlineMessages,
              currentRound: state.maxRounds,
              typingSide: null,
            }
          : prev
      );

      trackEvent({
        action: "debate_complete",
        topicId: topic.id,
        totalRounds: state.maxRounds,
      });

      // Persist offline rounds after debate ID is available
      void persistCreate.then((dbId) => {
        if (!dbId) return;
        for (let r = 1; r <= state.maxRounds; r++) {
          const forMsg = offlineMessages.find((m) => m.round === r && m.side === "for");
          const againstMsg = offlineMessages.find((m) => m.round === r && m.side === "against");
          if (forMsg && againstMsg) {
            persistDebate({
              action: "saveRound",
              debateId: dbId,
              roundNumber: r,
              forContent: forMsg.content,
              againstContent: againstMsg.content,
            });
          }
        }
        persistDebate({ action: "updateStatus", debateId: dbId, status: "completed" });
      });
      activeRunRef.current = null;
      return;
    }

    setState((prev) =>
      canCommitRun(run)
        ? {
            ...prev,
            phase: "debating",
            error: null,
            messages: [],
            currentRound: 1,
          }
        : prev
    );

    let currentMessages: DebateMessage[] = [];

    try {
      for (let round = 1; round <= state.maxRounds; round++) {
        while (isPausedPhase(phaseRef.current)) {
          await waitForDelay(100, run.controller.signal);
        }
        if (!isRunActive(run)) throw createAbortError();

        setState((prev) =>
          canCommitRun(run) ? { ...prev, currentRound: round } : prev
        );
        currentMessages = await runDebateRound(
          round,
          currentMessages,
          state.forModel!,
          state.againstModel!,
          run
        );

        // Persist round (fire-and-forget)
        const forMsg = currentMessages.find((m) => m.round === round && m.side === "for");
        const againstMsg = currentMessages.find((m) => m.round === round && m.side === "against");
        if (forMsg && againstMsg) {
          void persistCreate.then((debateId) => {
            if (!debateId) return;
            return persistDebate({
              action: "saveRound",
              debateId,
              roundNumber: round,
              forContent: forMsg.content,
              againstContent: againstMsg.content,
            });
          });
        }

        if (round < state.maxRounds) {
          await waitForDelay(DEBATE.ROUND_DELAY, run.controller.signal);
        }
      }

      if (!isRunActive(run)) throw createAbortError();
      if (!isCompleteDebate(currentMessages, state.maxRounds)) {
        throw new Error("The debate ended before every side completed each round.");
      }

      phaseRef.current = "complete";
      setState((prev) =>
        isTokenCurrent(run.token)
          ? { ...prev, phase: "complete", typingSide: null }
          : prev
      );
      trackEvent({
        action: "debate_complete",
        topicId: topic.id,
        totalRounds: state.maxRounds,
      });
      persistRunStatus(run.token, "completed");
    } catch (e) {
      // Reset/topic-change/unmount invalidates the token before aborting and
      // owns the cancellation state/persistence. A stale run must do nothing.
      if (!isTokenCurrent(run.token)) return;

      const cancelled = isAbortError(e) || run.controller.signal.aborted;
      const errorMessage =
        e instanceof Error ? e.message : "The debate could not be completed.";
      phaseRef.current = cancelled ? "cancelled" : "failed";
      setState((prev) => ({
        ...prev,
        phase: cancelled ? "cancelled" : "failed",
        error: cancelled ? null : errorMessage,
        typingSide: null,
      }));
      persistRunStatus(run.token, cancelled ? "cancelled" : "failed");
    } finally {
      if (activeRunRef.current?.token === run.token) {
        activeRunRef.current = null;
      }
    }
  }, [
    canStart,
    liveDebateEnabled,
    runDebateRound,
    state.againstModel,
    state.forModel,
    state.maxRounds,
    topic,
    canCommitRun,
    isRunActive,
    isTokenCurrent,
    persistRunStatus,
  ]);

  const resetDebate = useCallback(() => {
    cancelActiveRun();
    phaseRef.current = "setup";
    setState({
      ...INITIAL_STATE,
      forModel: state.forModel,
      againstModel: state.againstModel,
      maxRounds: state.maxRounds,
    });
  }, [cancelActiveRun, state.forModel, state.againstModel, state.maxRounds]);

  const requestJudgment = useCallback(async () => {
    if (
      state.phase !== "complete" ||
      !isCompleteDebate(state.messages, state.maxRounds) ||
      state.isJudging
    ) {
      return;
    }

    const token = runTokenRef.current;
    const controller = new AbortController();
    judgeControllerRef.current?.abort();
    judgeControllerRef.current = controller;

    setState((prev) => ({ ...prev, isJudging: true, error: null }));

    try {
      const response = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          type: "debate",
          topic: topic?.meta_claim,
          debateId: debateIdRef.current ?? undefined,
          messages: state.messages.map((m) => ({
            side: m.side,
            content: m.content,
            round: m.round,
          })),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.details || data.error || "Failed to get judgment");
      }

      const result = parseJudgingResult(await response.json());
      if (!isTokenCurrent(token) || controller.signal.aborted) return;
      setState((prev) => ({ ...prev, judgingResult: result, isJudging: false }));
    } catch (e) {
      if (
        isAbortError(e) ||
        controller.signal.aborted ||
        !isTokenCurrent(token)
      ) {
        return;
      }
      const errorMsg = e instanceof Error ? e.message : "Failed to get judgment";
      setState((prev) => ({ ...prev, error: errorMsg, isJudging: false }));
    } finally {
      if (judgeControllerRef.current === controller) {
        judgeControllerRef.current = null;
      }
    }
  }, [state.messages, state.maxRounds, state.phase, state.isJudging, topic, isTokenCurrent]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null, failedModel: null }));
  }, []);

  const togglePause = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "debating" && prev.phase !== "paused") return prev;
      const phase = prev.phase === "paused" ? "debating" : "paused";
      phaseRef.current = phase;
      return { ...prev, phase };
    });
  }, []);

  const viewMockDebate = useCallback(async () => {
    if (topicHasMockData && currentTopicId) {
      cancelActiveRun();
      try {
        const {
          getMockDebate,
          getMockDebateModels,
          getMockDebateRounds,
        } = await import("@/data/mockDebates");
        const mockModels = getMockDebateModels();
        const mockRounds = getMockDebateRounds(currentTopicId);
        const messages = getMockDebate(currentTopicId);
        setState((prev) => ({
          ...prev,
          phase: "mockView",
          forModel: mockModels.forModel,
          againstModel: mockModels.againstModel,
          messages,
          currentRound: mockRounds,
          maxRounds: mockRounds,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          error: "The example debate could not be loaded. Please try again.",
        }));
      }
    }
  }, [topicHasMockData, currentTopicId, cancelActiveRun]);

  const setForModel = useCallback((model: LLMModel) => {
    setState((prev) => ({ ...prev, forModel: model }));
  }, []);

  const setAgainstModel = useCallback((model: LLMModel) => {
    setState((prev) => ({ ...prev, againstModel: model }));
  }, []);

  const setMaxRounds = useCallback((rounds: number) => {
    setState((prev) => ({ ...prev, maxRounds: rounds }));
  }, []);

  const displayMessages = state.messages;

  return {
    state,
    displayMessages,
    canStart: Boolean(canStart),
    isSetupPhase,
    topicHasMockData,
    liveDebateEnabled,
    liveJudgingEnabled,
    startDebate,
    resetDebate,
    requestJudgment,
    clearError,
    togglePause,
    viewMockDebate,
    setForModel,
    setAgainstModel,
    setMaxRounds,
  };
}
