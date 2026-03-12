"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { DebateMessage } from "@/types/debate";
import type { JudgingResult } from "@/lib/judge/rubric";
import type { Topic, LLMModel } from "@/types/logic";
import {
  hasMockDebate,
  getMockDebate,
  getMockDebateModels,
  getMockDebateRounds,
} from "@/data/mockDebates";
import { DEBATE } from "@/lib/constants";
import { generateOfflineDebate } from "@/lib/debate/offline";

export type DebatePhase = "setup" | "debating" | "paused" | "complete" | "mockView";

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

export function useDebateOrchestrator(
  topic: Topic | undefined,
  currentTopicId: string | undefined
) {
  const phaseRef = useRef<DebatePhase>("setup");
  const debateIdRef = useRef<string | null>(null);

  const [state, setState] = useState<DebateState>(INITIAL_STATE);

  useEffect(() => {
    phaseRef.current = state.phase;
  }, [state.phase]);

  const canStart = state.forModel && state.againstModel && state.phase === "setup";
  const isSetupPhase = state.messages.length === 0 && state.phase === "setup";
  const topicHasMockData = hasMockDebate(currentTopicId);
  const liveDebateEnabled = DEBATE.ENABLE_LIVE_API;

  // Generate argument from streaming API with progressive display
  const generateArgument = useCallback(
    async (
      side: "for" | "against",
      model: LLMModel,
      round: number,
      previousMessages: DebateMessage[]
    ): Promise<string> => {
      const response = await fetch("/api/debate/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const errorMsg = data.details || data.error || "Failed to generate argument";
        throw new Error(`${model}: ${errorMsg}`);
      }

      if (!response.body) {
        throw new Error(`${model}: No response body`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      const placeholderId = `${side}-${round}-${Date.now()}`;
      const placeholderMsg: DebateMessage = {
        id: placeholderId,
        side,
        model,
        content: "",
        round,
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, placeholderMsg],
        typingSide: null,
      }));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(trimmed.slice(6));
            if (data.error) {
              throw new Error(`${model}: ${data.error}`);
            }
            if (data.token) {
              fullText += data.token;
              setState((prev) => ({
                ...prev,
                messages: prev.messages.map((m) =>
                  m.id === placeholderId ? { ...m, content: fullText } : m
                ),
              }));
            }
          } catch (e) {
            if (e instanceof Error && e.message.startsWith(model)) throw e;
          }
        }
      }

      return fullText;
    },
    [topic]
  );

  // Run a single debate round
  const runDebateRound = useCallback(
    async (
      round: number,
      existingMessages: DebateMessage[],
      forModel: LLMModel,
      againstModel: LLMModel
    ): Promise<DebateMessage[]> => {
      if (!topic) return existingMessages;

      let updatedMessages = [...existingMessages];

      setState((prev) => ({ ...prev, typingSide: "for", error: null, failedModel: null }));
      try {
        await generateArgument("for", forModel, round, updatedMessages);
        setState((prev) => {
          updatedMessages = prev.messages;
          return { ...prev, typingSide: null };
        });
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "Failed to generate proposition argument";
        setState((prev) => ({
          ...prev,
          error: errorMsg,
          failedModel: forModel,
          typingSide: null,
        }));
        throw new Error(errorMsg);
      }

      await new Promise((resolve) => setTimeout(resolve, DEBATE.TURN_DELAY));

      setState((prev) => ({ ...prev, typingSide: "against", error: null, failedModel: null }));
      try {
        await generateArgument("against", againstModel, round, updatedMessages);
        setState((prev) => {
          updatedMessages = prev.messages;
          return { ...prev, typingSide: null };
        });
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "Failed to generate opposition argument";
        setState((prev) => ({
          ...prev,
          error: errorMsg,
          failedModel: againstModel,
          typingSide: null,
        }));
        throw new Error(errorMsg);
      }

      return updatedMessages;
    },
    [topic, generateArgument]
  );

  const startDebate = useCallback(async () => {
    if (!canStart || !state.forModel || !state.againstModel || !topic) return;

    // Persist debate creation (fire-and-forget)
    const persistCreate = persistDebate({
      action: "create",
      topicId: topic.id,
      topicTitle: topic.meta_claim,
      forModel: state.forModel,
      againstModel: state.againstModel,
      totalRounds: state.maxRounds,
    }).then((id) => {
      debateIdRef.current = id;
    });

    if (!liveDebateEnabled) {
      const offlineMessages = generateOfflineDebate(
        topic,
        state.forModel,
        state.againstModel,
        state.maxRounds
      );

      setState((prev) => ({
        ...prev,
        phase: "complete",
        error: null,
        messages: offlineMessages,
        currentRound: state.maxRounds,
        typingSide: null,
      }));

      // Persist offline rounds after debate ID is available
      persistCreate.then(() => {
        if (!debateIdRef.current) return;
        const dbId = debateIdRef.current;
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
        persistDebate({ action: "updateStatus", debateId: dbId, status: "complete" });
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      phase: "debating",
      error: null,
      messages: [],
      currentRound: 1,
    }));

    let currentMessages: DebateMessage[] = [];

    try {
      for (let round = 1; round <= state.maxRounds; round++) {
        if (phaseRef.current === "paused") {
          await new Promise<void>((resolve) => {
            const checkPause = setInterval(() => {
              if (phaseRef.current !== "paused") {
                clearInterval(checkPause);
                resolve();
              }
            }, 100);
          });
        }

        setState((prev) => ({ ...prev, currentRound: round }));
        currentMessages = await runDebateRound(
          round,
          currentMessages,
          state.forModel!,
          state.againstModel!
        );

        // Persist round (fire-and-forget)
        if (debateIdRef.current) {
          const forMsg = currentMessages.find((m) => m.round === round && m.side === "for");
          const againstMsg = currentMessages.find((m) => m.round === round && m.side === "against");
          if (forMsg && againstMsg) {
            persistDebate({
              action: "saveRound",
              debateId: debateIdRef.current,
              roundNumber: round,
              forContent: forMsg.content,
              againstContent: againstMsg.content,
            });
          }
        }

        if (round < state.maxRounds) {
          await new Promise((resolve) => setTimeout(resolve, DEBATE.ROUND_DELAY));
        }
      }
    } catch (e) {
      console.error("Debate error:", e);
    } finally {
      setState((prev) => ({
        ...prev,
        phase: "complete",
        typingSide: null,
      }));
      // Persist completion status
      if (debateIdRef.current) {
        persistDebate({ action: "updateStatus", debateId: debateIdRef.current, status: "complete" });
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
  ]);

  const resetDebate = useCallback(() => {
    debateIdRef.current = null;
    setState({
      ...INITIAL_STATE,
      forModel: state.forModel,
      againstModel: state.againstModel,
      maxRounds: state.maxRounds,
    });
  }, [state.forModel, state.againstModel, state.maxRounds]);

  const requestJudgment = useCallback(async () => {
    if (state.messages.length === 0 || state.isJudging) return;

    setState((prev) => ({ ...prev, isJudging: true, error: null }));

    try {
      const response = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      const result: JudgingResult = await response.json();
      setState((prev) => ({ ...prev, judgingResult: result, isJudging: false }));
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Failed to get judgment";
      setState((prev) => ({ ...prev, error: errorMsg, isJudging: false }));
    }
  }, [state.messages, state.isJudging, topic]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null, failedModel: null }));
  }, []);

  const togglePause = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: prev.phase === "paused" ? "debating" : "paused",
    }));
  }, []);

  const viewMockDebate = useCallback(() => {
    if (topicHasMockData && currentTopicId) {
      const mockModels = getMockDebateModels();
      const mockRounds = getMockDebateRounds(currentTopicId);
      setState((prev) => ({
        ...prev,
        phase: "mockView",
        forModel: mockModels.forModel,
        againstModel: mockModels.againstModel,
        currentRound: mockRounds,
        maxRounds: mockRounds,
      }));
    }
  }, [topicHasMockData, currentTopicId]);

  const setForModel = useCallback((model: LLMModel) => {
    setState((prev) => ({ ...prev, forModel: model }));
  }, []);

  const setAgainstModel = useCallback((model: LLMModel) => {
    setState((prev) => ({ ...prev, againstModel: model }));
  }, []);

  const setMaxRounds = useCallback((rounds: number) => {
    setState((prev) => ({ ...prev, maxRounds: rounds }));
  }, []);

  // Compute display messages (mock or real)
  const displayMessages =
    state.phase === "mockView" && currentTopicId
      ? getMockDebate(currentTopicId)
      : state.messages;

  return {
    state,
    displayMessages,
    canStart: Boolean(canStart),
    isSetupPhase,
    topicHasMockData,
    liveDebateEnabled,
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
