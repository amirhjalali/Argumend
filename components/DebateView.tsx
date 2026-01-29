"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Play, Pause, RotateCcw, Loader2, Sparkles, Quote, MessageCircle } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";
import type { LLMModel } from "@/types/logic";

const LLM_OPTIONS: { id: LLMModel; name: string; fullName: string; color: string }[] = [
  { id: "claude", name: "Claude", fullName: "Claude Sonnet", color: "#D97706" },
  { id: "gpt-4", name: "GPT-4", fullName: "GPT-4 Omni", color: "#059669" },
  { id: "gemini", name: "Gemini", fullName: "Gemini Pro", color: "#2563EB" },
  { id: "llama", name: "Llama", fullName: "Llama 3", color: "#7C3AED" },
];

interface DebateMessage {
  id: string;
  side: "for" | "against";
  model: LLMModel;
  content: string;
  round: number;
}

function DebaterCard({
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
  const isFor = side === "for";
  const selectedLlm = LLM_OPTIONS.find((l) => l.id === selectedModel);

  return (
    <div className="flex-1">
      {/* Side Label */}
      <div className={`flex items-center gap-3 mb-4 ${isFor ? "" : "justify-end"}`}>
        <div
          className={`w-3 h-3 rounded-full ${
            isFor
              ? "bg-gradient-to-br from-amber-400 to-amber-600"
              : "bg-gradient-to-br from-stone-400 to-stone-500"
          }`}
        />
        <span
          className={`font-serif text-sm tracking-[0.15em] uppercase ${
            isFor ? "text-amber-800" : "text-stone-600"
          }`}
        >
          {isFor ? "Proposition" : "Opposition"}
        </span>
      </div>

      {/* Model Selection Grid */}
      <div className="grid grid-cols-2 gap-3">
        {LLM_OPTIONS.map((llm) => {
          const isSelected = selectedModel === llm.id;
          return (
            <motion.button
              key={llm.id}
              onClick={() => onSelect(llm.id)}
              disabled={disabled}
              whileHover={!disabled ? { y: -2 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${isSelected
                  ? isFor
                    ? "border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50/50 shadow-md"
                    : "border-stone-400 bg-gradient-to-br from-stone-50 to-gray-50 shadow-md"
                  : "border-stone-200 bg-white/60 hover:border-stone-300 hover:bg-white/80"
                }
              `}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
                    isFor ? "bg-amber-500" : "bg-stone-500"
                  }`}
                >
                  ✓
                </motion.div>
              )}

              {/* Model info */}
              <div
                className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: llm.color }}
              >
                {llm.name.charAt(0)}
              </div>
              <div className="font-serif font-semibold text-primary">{llm.name}</div>
              <div className="text-xs text-stone-500 mt-0.5">{llm.fullName}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ArgumentBubble({ message, isLatest }: { message: DebateMessage; isLatest: boolean }) {
  const llm = LLM_OPTIONS.find((l) => l.id === message.model);
  const isFor = message.side === "for";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      {/* Round indicator - centered between messages */}
      {message.round > 0 && message.side === "for" && (
        <div className="flex justify-center mb-6">
          <div className="px-4 py-1.5 bg-stone-100 rounded-full">
            <span className="text-xs font-medium text-stone-500 tracking-wider uppercase">
              Round {message.round}
            </span>
          </div>
        </div>
      )}

      <div className={`flex gap-4 ${isFor ? "" : "flex-row-reverse"}`}>
        {/* Avatar column */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
            style={{ backgroundColor: llm?.color }}
          >
            {llm?.name.charAt(0)}
          </div>
          <div className={`w-0.5 flex-1 ${isFor ? "bg-amber-200" : "bg-stone-200"}`} />
        </div>

        {/* Content */}
        <div className={`flex-1 ${isFor ? "pr-12" : "pl-12"}`}>
          {/* Header */}
          <div className={`flex items-center gap-2 mb-2 ${isFor ? "" : "justify-end"}`}>
            <span className="font-serif font-semibold text-primary">{llm?.name}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                isFor
                  ? "bg-amber-100 text-amber-700"
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {isFor ? "For" : "Against"}
            </span>
          </div>

          {/* Message card */}
          <div
            className={`rounded-2xl p-5 border ${
              isFor
                ? "bg-gradient-to-br from-amber-50/80 to-orange-50/40 border-amber-200/60"
                : "bg-gradient-to-br from-stone-50/80 to-gray-50/40 border-stone-200/60"
            }`}
          >
            {/* Quote decoration */}
            <Quote
              className={`w-5 h-5 mb-2 ${
                isFor ? "text-amber-300" : "text-stone-300"
              }`}
            />
            <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ThinkingIndicator({ side, model }: { side: "for" | "against"; model: LLMModel }) {
  const llm = LLM_OPTIONS.find((l) => l.id === model);
  const isFor = side === "for";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex gap-4 ${isFor ? "" : "flex-row-reverse"}`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
        style={{ backgroundColor: llm?.color }}
      >
        {llm?.name.charAt(0)}
      </div>
      <div
        className={`rounded-2xl px-5 py-4 border ${
          isFor
            ? "bg-amber-50/60 border-amber-200/60"
            : "bg-stone-50/60 border-stone-200/60"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-500 italic">
            {llm?.name} is formulating a response
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className={`w-1.5 h-1.5 rounded-full ${
                  isFor ? "bg-amber-400" : "bg-stone-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function DebateView() {
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const topic = topics.find((t) => t.id === currentTopicId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingSide]);

  const generateArgument = useCallback(
    async (
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
    },
    [topic]
  );

  const runDebateRound = useCallback(
    async (round: number, existingMessages: DebateMessage[]) => {
      if (!forModel || !againstModel || !topic) return existingMessages;

      let updatedMessages = [...existingMessages];

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
        setError("Failed to generate proposition argument");
        throw e;
      }
      setTypingSide(null);

      await new Promise((resolve) => setTimeout(resolve, 800));

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
        setError("Failed to generate opposition argument");
        throw e;
      }
      setTypingSide(null);

      return updatedMessages;
    },
    [forModel, againstModel, topic, generateArgument]
  );

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

        if (round < maxRounds) {
          await new Promise((resolve) => setTimeout(resolve, 1200));
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
        <MessageCircle className="h-16 w-16 opacity-30" />
        <p className="font-serif text-lg">Select a topic to begin a debate</p>
      </div>
    );
  }

  const forLlm = LLM_OPTIONS.find((l) => l.id === forModel);
  const againstLlm = LLM_OPTIONS.find((l) => l.id === againstModel);

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-[#fefcf9] via-[#faf8f4] to-[#f5f2eb]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider">
            <Swords className="h-3.5 w-3.5" />
            Debate Chamber
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary leading-tight max-w-3xl mx-auto">
            {topic.meta_claim}
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            Select your debaters and witness a structured exchange of arguments.
          </p>
        </motion.div>

        {/* Setup Phase */}
        {isSetupPhase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Debater Selection */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-stone-200/60 p-6 shadow-sm">
              <div className="flex items-center justify-center gap-8 mb-6">
                <h3 className="font-serif text-lg text-primary">Select Your Debaters</h3>
              </div>

              <div className="flex gap-8 items-start">
                <DebaterCard
                  side="for"
                  selectedModel={forModel}
                  onSelect={setForModel}
                  disabled={isDebating}
                />

                {/* Center divider with VS */}
                <div className="flex flex-col items-center justify-center py-8 px-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-300 flex items-center justify-center shadow-inner">
                    <span className="font-serif text-stone-500 font-semibold text-sm">vs</span>
                  </div>
                </div>

                <DebaterCard
                  side="against"
                  selectedModel={againstModel}
                  onSelect={setAgainstModel}
                  disabled={isDebating}
                />
              </div>
            </div>

            {/* Round Selection */}
            <div className="flex items-center justify-center gap-6">
              <span className="font-serif text-stone-600">Number of Rounds</span>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map((num) => (
                  <motion.button
                    key={num}
                    onClick={() => setMaxRounds(num)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-xl font-serif font-semibold transition-all ${
                      maxRounds === num
                        ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md"
                        : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={startDebate}
                disabled={!canStart}
                whileHover={canStart ? { scale: 1.02 } : {}}
                whileTap={canStart ? { scale: 0.98 } : {}}
                className={`
                  flex items-center gap-3 px-8 py-3.5 rounded-xl font-serif font-semibold text-lg transition-all
                  ${canStart
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-stone-100 text-stone-400 cursor-not-allowed"
                  }
                `}
              >
                <Play className="h-5 w-5" />
                Begin Debate
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Active Debate Header */}
        {(isDebating || messages.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-stone-200/60 shadow-sm"
          >
            <div className="flex items-center gap-6">
              {/* Debaters */}
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: forLlm?.color }}
                >
                  {forLlm?.name.charAt(0)}
                </div>
                <span className="font-serif text-amber-700 font-medium">{forLlm?.name}</span>
              </div>

              <span className="text-stone-400 font-serif italic">versus</span>

              <div className="flex items-center gap-2">
                <span className="font-serif text-stone-600 font-medium">{againstLlm?.name}</span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: againstLlm?.color }}
                >
                  {againstLlm?.name.charAt(0)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-50">
                <span className="text-xs text-stone-500">Round</span>
                <span className="font-serif font-bold text-primary">{currentRound}</span>
                <span className="text-xs text-stone-400">of {maxRounds}</span>
              </div>

              {isDebating && (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-xs font-medium">Live</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                {isDebating && (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
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
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="space-y-6 pb-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <ArgumentBubble
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {typingSide && (
                <ThinkingIndicator
                  side={typingSide}
                  model={typingSide === "for" ? forModel! : againstModel!}
                />
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Debate Complete */}
        {!isDebating && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 border-t border-stone-200"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="font-serif text-emerald-800 font-medium">
                Debate Concluded — {maxRounds} Rounds Complete
              </span>
            </div>
            <p className="mt-4 text-stone-500 max-w-md mx-auto">
              Both sides have presented their arguments. Consider the evidence and form your own conclusion.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
