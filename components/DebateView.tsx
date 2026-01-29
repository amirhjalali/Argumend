"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Play, Pause, RotateCcw, Loader2, Bot, Sparkles, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";
import type { LLMModel, Debater, DebateRound, DebateArgument } from "@/types/logic";

const LLM_OPTIONS: { id: LLMModel; name: string; color: string; avatar: string }[] = [
  { id: "claude", name: "Claude", color: "#D97706", avatar: "C" },
  { id: "gpt-4", name: "GPT-4", color: "#10B981", avatar: "G" },
  { id: "gemini", name: "Gemini", color: "#3B82F6", avatar: "Ge" },
  { id: "llama", name: "Llama", color: "#8B5CF6", avatar: "L" },
];

interface DebateMessage {
  id: string;
  side: "for" | "against";
  model: LLMModel;
  content: string;
  round: number;
}

function ModelSelector({
  side,
  selectedModel,
  onSelect,
  disabled,
}: {
  side: "for" | "against";
  selectedModel: LLMModel | null;
  onSelect: (model: LLMModel) => void;
  disabled: boolean;
}) {
  const sideColor = side === "for" ? "amber" : "slate";
  const sideLabel = side === "for" ? "FOR" : "AGAINST";

  return (
    <div className={`flex-1 p-4 rounded-xl border-2 ${
      side === "for"
        ? "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50"
        : "border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50"
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${side === "for" ? "bg-amber-500" : "bg-slate-500"}`} />
        <span className={`text-xs font-bold tracking-wider ${side === "for" ? "text-amber-700" : "text-slate-600"}`}>
          {sideLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {LLM_OPTIONS.map((llm) => (
          <button
            key={llm.id}
            onClick={() => onSelect(llm.id)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedModel === llm.id
                ? "ring-2 ring-offset-1 shadow-md"
                : "hover:bg-white/50"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            style={{
              backgroundColor: selectedModel === llm.id ? `${llm.color}15` : undefined,
              // @ts-expect-error CSS custom property for ring color
              "--tw-ring-color": selectedModel === llm.id ? llm.color : undefined,
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: llm.color }}
            >
              {llm.avatar}
            </div>
            <span className="text-stone-700">{llm.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DebateMessageBubble({ message, isLatest }: { message: DebateMessage; isLatest: boolean }) {
  const llm = LLM_OPTIONS.find((l) => l.id === message.model);
  const isFor = message.side === "for";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex gap-3 ${isFor ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg"
        style={{ backgroundColor: llm?.color }}
      >
        {llm?.avatar}
      </div>

      {/* Message bubble */}
      <div
        className={`flex-1 max-w-[80%] rounded-2xl p-4 shadow-sm ${
          isFor
            ? "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
            : "bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm" style={{ color: llm?.color }}>
            {llm?.name}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isFor ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-600"
          }`}>
            Round {message.round}
          </span>
        </div>
        <p className="text-stone-700 leading-relaxed text-sm whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}

function TypingIndicator({ side, model }: { side: "for" | "against"; model: LLMModel }) {
  const llm = LLM_OPTIONS.find((l) => l.id === model);
  const isFor = side === "for";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex gap-3 ${isFor ? "flex-row" : "flex-row-reverse"}`}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
        style={{ backgroundColor: llm?.color }}
      >
        {llm?.avatar}
      </div>
      <div
        className={`rounded-2xl px-4 py-3 ${
          isFor ? "bg-amber-50 border border-amber-200" : "bg-slate-50 border border-slate-200"
        }`}
      >
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 rounded-full bg-stone-400"
          />
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-stone-400"
          />
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-stone-400"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function DebateView() {
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const topic = topics.find((t) => t.id === currentTopicId);

  const [forModel, setForModel] = useState<LLMModel | null>(null);
  const [againstModel, setAgainstModel] = useState<LLMModel | null>(null);
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [maxRounds, setMaxRounds] = useState(3);
  const [isDebating, setIsDebating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [typingSide, setTypingSide] = useState<"for" | "against" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canStart = forModel && againstModel && !isDebating;
  const isSetupPhase = messages.length === 0 && !isDebating;

  const generateArgument = useCallback(async (
    side: "for" | "against",
    model: LLMModel,
    round: number,
    previousMessages: DebateMessage[]
  ): Promise<string> => {
    const response = await fetch("/api/debate", {
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
      throw new Error("Failed to generate argument");
    }

    const data = await response.json();
    return data.argument;
  }, [topic]);

  const runDebateRound = useCallback(async (
    round: number,
    existingMessages: DebateMessage[]
  ) => {
    if (!forModel || !againstModel || !topic) return existingMessages;

    let updatedMessages = [...existingMessages];

    // FOR side argues first
    setTypingSide("for");
    try {
      const forArgument = await generateArgument("for", forModel, round, updatedMessages);
      const forMessage: DebateMessage = {
        id: `for-${round}-${Date.now()}`,
        side: "for",
        model: forModel,
        content: forArgument,
        round,
      };
      updatedMessages = [...updatedMessages, forMessage];
      setMessages(updatedMessages);
    } catch (e) {
      setError("Failed to generate FOR argument");
      throw e;
    }
    setTypingSide(null);

    // Small delay between speakers
    await new Promise((resolve) => setTimeout(resolve, 500));

    // AGAINST side responds
    setTypingSide("against");
    try {
      const againstArgument = await generateArgument("against", againstModel, round, updatedMessages);
      const againstMessage: DebateMessage = {
        id: `against-${round}-${Date.now()}`,
        side: "against",
        model: againstModel,
        content: againstArgument,
        round,
      };
      updatedMessages = [...updatedMessages, againstMessage];
      setMessages(updatedMessages);
    } catch (e) {
      setError("Failed to generate AGAINST argument");
      throw e;
    }
    setTypingSide(null);

    return updatedMessages;
  }, [forModel, againstModel, topic, generateArgument]);

  const startDebate = useCallback(async () => {
    if (!canStart) return;

    setIsDebating(true);
    setError(null);
    setMessages([]);
    setCurrentRound(1);

    let currentMessages: DebateMessage[] = [];

    try {
      for (let round = 1; round <= maxRounds; round++) {
        if (isPaused) {
          await new Promise((resolve) => {
            const checkPause = setInterval(() => {
              if (!isPaused) {
                clearInterval(checkPause);
                resolve(null);
              }
            }, 100);
          });
        }

        setCurrentRound(round);
        currentMessages = await runDebateRound(round, currentMessages);

        // Delay between rounds
        if (round < maxRounds) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (e) {
      console.error("Debate error:", e);
    } finally {
      setIsDebating(false);
      setTypingSide(null);
    }
  }, [canStart, maxRounds, isPaused, runDebateRound]);

  const resetDebate = useCallback(() => {
    setMessages([]);
    setCurrentRound(0);
    setIsDebating(false);
    setIsPaused(false);
    setTypingSide(null);
    setError(null);
  }, []);

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-500 gap-4">
        <Swords className="h-16 w-16 opacity-30" />
        <p className="font-serif text-lg">Select a topic to start a debate</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-[#fefcf9] via-[#faf8f4] to-[#f5f2eb]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider">
            <Swords className="h-3.5 w-3.5" />
            AI Debate Arena
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary leading-tight max-w-2xl mx-auto">
            {topic.meta_claim}
          </h1>
          <p className="text-stone-500 text-sm max-w-xl mx-auto">
            Watch two AI models debate this topic from opposing perspectives.
          </p>
        </motion.div>

        {/* Setup Phase */}
        {isSetupPhase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Model Selection */}
            <div className="flex gap-4">
              <ModelSelector
                side="for"
                selectedModel={forModel}
                onSelect={setForModel}
                disabled={isDebating}
              />
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center">
                  <Swords className="h-5 w-5 text-stone-500" />
                </div>
              </div>
              <ModelSelector
                side="against"
                selectedModel={againstModel}
                onSelect={setAgainstModel}
                disabled={isDebating}
              />
            </div>

            {/* Round Selection */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-stone-600">Rounds:</span>
              {[2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setMaxRounds(num)}
                  className={`w-10 h-10 rounded-full font-medium transition-all ${
                    maxRounds === num
                      ? "bg-primary text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Start Button */}
            <div className="flex justify-center">
              <button
                onClick={startDebate}
                disabled={!canStart}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-lg transition-all
                  ${canStart
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                  }
                `}
              >
                <Play className="h-5 w-5" />
                Start Debate
              </button>
            </div>
          </motion.div>
        )}

        {/* Debate Progress */}
        {(isDebating || messages.length > 0) && (
          <div className="flex items-center justify-between px-4 py-2 bg-white/50 rounded-xl border border-stone-200">
            <div className="flex items-center gap-4">
              <span className="text-sm text-stone-600">
                Round <span className="font-bold text-primary">{currentRound}</span> of {maxRounds}
              </span>
              {isDebating && (
                <span className="flex items-center gap-1 text-xs text-amber-600">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  In progress...
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isDebating && (
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
              )}
              <button
                onClick={resetDebate}
                className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Messages */}
        <div className="space-y-4 pb-8">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <DebateMessageBubble
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {typingSide && (
              <TypingIndicator
                side={typingSide}
                model={typingSide === "for" ? forModel! : againstModel!}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Debate Complete */}
        {!isDebating && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6 border-t border-stone-200"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Debate Complete - {maxRounds} rounds
            </div>
            <p className="mt-3 text-stone-500 text-sm">
              Both sides have presented their arguments. Review the debate above.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
