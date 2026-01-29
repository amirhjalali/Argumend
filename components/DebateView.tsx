"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Play, Pause, RotateCcw, Loader2, Sparkles, Zap } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";
import type { LLMModel } from "@/types/logic";

const LLM_OPTIONS: { id: LLMModel; name: string; color: string; gradient: string; icon: string }[] = [
  { id: "claude", name: "Claude", color: "#D97706", gradient: "from-amber-500 to-orange-600", icon: "🧠" },
  { id: "gpt-4", name: "GPT-4", color: "#10B981", gradient: "from-emerald-500 to-teal-600", icon: "⚡" },
  { id: "gemini", name: "Gemini", color: "#3B82F6", gradient: "from-blue-500 to-indigo-600", icon: "💎" },
  { id: "llama", name: "Llama", color: "#8B5CF6", gradient: "from-violet-500 to-purple-600", icon: "🦙" },
];

interface DebateMessage {
  id: string;
  side: "for" | "against";
  model: LLMModel;
  content: string;
  round: number;
}

function ModelCard({
  llm,
  isSelected,
  onSelect,
  disabled,
  side,
}: {
  llm: typeof LLM_OPTIONS[0];
  isSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
  side: "for" | "against";
}) {
  return (
    <motion.button
      onClick={onSelect}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        relative overflow-hidden rounded-2xl p-4 transition-all duration-300
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${isSelected
          ? "ring-2 ring-offset-2 ring-offset-stone-900 shadow-2xl"
          : "hover:shadow-xl"
        }
      `}
      style={{
        background: isSelected
          ? `linear-gradient(135deg, ${llm.color}20, ${llm.color}40)`
          : "rgba(255,255,255,0.05)",
        borderColor: isSelected ? llm.color : "transparent",
        // @ts-expect-error CSS custom property
        "--tw-ring-color": llm.color,
      }}
    >
      {/* Glow effect when selected */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at center, ${llm.color}, transparent 70%)` }}
        />
      )}

      <div className="relative flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${llm.gradient} shadow-lg`}
        >
          {llm.icon}
        </div>
        <div className="text-left">
          <div className="font-bold text-white text-lg">{llm.name}</div>
          <div className="text-xs text-stone-400">AI Model</div>
        </div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
          style={{ backgroundColor: llm.color }}
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  );
}

function DebateMessageBubble({ message, isLatest }: { message: DebateMessage; isLatest: boolean }) {
  const llm = LLM_OPTIONS.find((l) => l.id === message.model);
  const isFor = message.side === "for";

  return (
    <motion.div
      initial={{ opacity: 0, x: isFor ? -30 : 30, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`flex gap-4 ${isFor ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${llm?.gradient} shadow-xl shrink-0`}
      >
        {llm?.icon}
      </motion.div>

      {/* Message bubble */}
      <div className={`flex-1 max-w-[85%] ${isFor ? "pr-8" : "pl-8"}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-bold text-lg text-white">{llm?.name}</span>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            isFor
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
          }`}>
            {isFor ? "FOR" : "AGAINST"} • Round {message.round}
          </span>
        </div>
        <div
          className={`rounded-2xl p-5 backdrop-blur-sm ${
            isFor
              ? "bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20"
              : "bg-gradient-to-br from-slate-500/10 to-gray-500/5 border border-slate-500/20"
          }`}
        >
          <p className="text-stone-200 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function TypingIndicator({ side, model }: { side: "for" | "against"; model: LLMModel }) {
  const llm = LLM_OPTIONS.find((l) => l.id === model);
  const isFor = side === "for";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex gap-4 ${isFor ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${llm?.gradient} shadow-xl`}>
        {llm?.icon}
      </div>
      <div className={`rounded-2xl px-6 py-4 ${
        isFor
          ? "bg-amber-500/10 border border-amber-500/20"
          : "bg-slate-500/10 border border-slate-500/20"
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-stone-400 text-sm">{llm?.name} is thinking</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: llm?.color }}
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

    await new Promise((resolve) => setTimeout(resolve, 500));

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
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-stone-900 to-stone-950 text-stone-500 gap-4">
        <Swords className="h-16 w-16 opacity-30" />
        <p className="font-serif text-lg">Select a topic to start a debate</p>
      </div>
    );
  }

  const forLlm = LLM_OPTIONS.find((l) => l.id === forModel);
  const againstLlm = LLM_OPTIONS.find((l) => l.id === againstModel);

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full"
          >
            <Zap className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">AI Debate Arena</span>
          </motion.div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl mx-auto">
            {topic.meta_claim}
          </h1>

          <p className="text-stone-400 max-w-xl mx-auto">
            Select your champions and watch them battle with logic and evidence.
          </p>
        </motion.div>

        {/* Setup Phase */}
        {isSetupPhase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* VS Battle Layout */}
            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
              {/* FOR Side */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
                  <span className="text-lg font-bold text-amber-400 tracking-wide">FOR THE CLAIM</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {LLM_OPTIONS.map((llm) => (
                    <ModelCard
                      key={llm.id}
                      llm={llm}
                      isSelected={forModel === llm.id}
                      onSelect={() => setForModel(llm.id)}
                      disabled={isDebating}
                      side="for"
                    />
                  ))}
                </div>
              </div>

              {/* VS Divider */}
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-slate-500 rounded-full blur-xl opacity-30" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 border-2 border-stone-700 flex items-center justify-center shadow-2xl">
                    <Swords className="h-8 w-8 text-stone-400" />
                  </div>
                </motion.div>
                <span className="mt-3 text-2xl font-black text-stone-600">VS</span>
              </div>

              {/* AGAINST Side */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-end">
                  <span className="text-lg font-bold text-slate-400 tracking-wide">AGAINST THE CLAIM</span>
                  <div className="w-3 h-3 rounded-full bg-slate-500 shadow-lg shadow-slate-500/50" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {LLM_OPTIONS.map((llm) => (
                    <ModelCard
                      key={llm.id}
                      llm={llm}
                      isSelected={againstModel === llm.id}
                      onSelect={() => setAgainstModel(llm.id)}
                      disabled={isDebating}
                      side="against"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Round Selection */}
            <div className="flex items-center justify-center gap-6">
              <span className="text-stone-400 font-medium">Number of Rounds</span>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map((num) => (
                  <motion.button
                    key={num}
                    onClick={() => setMaxRounds(num)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-xl font-bold text-lg transition-all ${
                      maxRounds === num
                        ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30"
                        : "bg-stone-800 text-stone-400 hover:bg-stone-700 border border-stone-700"
                    }`}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center pt-4">
              <motion.button
                onClick={startDebate}
                disabled={!canStart}
                whileHover={canStart ? { scale: 1.05 } : {}}
                whileTap={canStart ? { scale: 0.95 } : {}}
                className={`
                  relative overflow-hidden flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-xl transition-all
                  ${canStart
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-2xl shadow-orange-500/30"
                    : "bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700"
                  }
                `}
              >
                {canStart && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
                <Play className="h-6 w-6 relative" />
                <span className="relative">Begin Debate</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Active Debate Header */}
        {(isDebating || messages.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-stone-800/50 border border-stone-700 backdrop-blur-sm"
          >
            <div className="flex items-center gap-6">
              {/* Debaters */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-gradient-to-br ${forLlm?.gradient}`}>
                  {forLlm?.icon}
                </div>
                <span className="text-amber-400 font-bold">{forLlm?.name}</span>
              </div>

              <Swords className="h-5 w-5 text-stone-600" />

              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-bold">{againstLlm?.name}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-gradient-to-br ${againstLlm?.gradient}`}>
                  {againstLlm?.icon}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Round indicator */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/50">
                <span className="text-stone-400 text-sm">Round</span>
                <span className="text-2xl font-black text-white">{currentRound}</span>
                <span className="text-stone-500 text-sm">/ {maxRounds}</span>
              </div>

              {isDebating && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-2 text-amber-400"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">Live</span>
                </motion.div>
              )}

              <div className="flex items-center gap-1">
                {isDebating && (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-2 rounded-xl hover:bg-stone-700 transition-colors text-stone-400"
                  >
                    {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                  </button>
                )}
                <button
                  onClick={resetDebate}
                  className="p-2 rounded-xl hover:bg-stone-700 transition-colors text-stone-400"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Messages */}
        <div className="space-y-6 pb-8">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <DebateMessageBubble
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}
          </AnimatePresence>

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
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl"
            >
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-300 font-bold">Debate Complete</span>
              <span className="text-emerald-500">•</span>
              <span className="text-emerald-400">{maxRounds} rounds</span>
            </motion.div>
            <p className="mt-4 text-stone-500">
              Both champions have made their cases. The verdict is yours to decide.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
