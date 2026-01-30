"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Play, Pause, RotateCcw, Loader2, Sparkles, Quote, MessageCircle, Sword, Shield, Eye } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";
import type { LLMModel } from "@/types/logic";

// Brand-accurate SVG icons for each AI
interface IconProps { className?: string; style?: React.CSSProperties }

function ClaudeIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M4.709 15.955l4.72-2.647.08-.046 2.698-1.514c.263-.147.263-.533 0-.68l-2.699-1.514-.08-.045-4.72-2.647c-.527-.296-1.166.074-1.166.68v7.733c0 .606.64.976 1.167.68zm8.582-.565l-2.56 1.436 6.967 3.907c.528.296 1.168-.074 1.168-.68V6.947c0-.606-.64-.976-1.168-.68l-6.966 3.907 2.559 1.436c.789.442.789 1.338 0 1.78z"/>
    </svg>
  );
}

function OpenAIIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  );
}

function GeminiIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/>
    </svg>
  );
}

function GrokIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M13.982 10.622 20.54 3h-1.554l-5.693 6.618L8.745 3H3.5l6.876 10.007L3.5 21h1.554l6.012-6.989L15.868 21h5.245l-7.131-10.378Zm-2.128 2.474-.697-.997-5.543-7.93H8l4.474 6.4.697.996 5.815 8.318h-2.387l-4.745-6.787Z"/>
    </svg>
  );
}

const LLM_OPTIONS: { id: LLMModel; name: string; fullName: string; color: string; bgLight: string; Icon: React.FC<IconProps> }[] = [
  { id: "claude", name: "Claude", fullName: "Claude Sonnet", color: "#D97706", bgLight: "#FEF3C7", Icon: ClaudeIcon },
  { id: "gpt-4", name: "GPT-4", fullName: "GPT-4 Omni", color: "#10B981", bgLight: "#D1FAE5", Icon: OpenAIIcon },
  { id: "gemini", name: "Gemini", fullName: "Gemini Pro", color: "#4285F4", bgLight: "#DBEAFE", Icon: GeminiIcon },
  { id: "grok", name: "Grok", fullName: "Grok 2", color: "#1C1C1E", bgLight: "#E5E5E5", Icon: GrokIcon },
];

interface DebateMessage {
  id: string;
  side: "for" | "against";
  model: LLMModel;
  content: string;
  round: number;
}

// Mock debate data for demonstration
const MOCK_DEBATES: Record<string, DebateMessage[]> = {
  "moon-landing": [
    {
      id: "mock-1",
      side: "for",
      model: "claude",
      content: "The Apollo moon landings represent one of humanity's most thoroughly documented achievements. We have 382 kilograms of lunar samples that have been studied by scientists worldwide for over 50 years, with isotopic compositions that could not have been created on Earth. The retroreflectors placed on the lunar surface are still used today by observatories globally to measure the Earth-Moon distance with millimeter precision.\n\nFurthermore, the Soviet Union—America's rival in the Space Race—tracked and verified the missions independently. They had every incentive to expose a hoax, yet their scientists confirmed the authenticity of the landings.",
      round: 1,
    },
    {
      id: "mock-2",
      side: "against",
      model: "gpt-4",
      content: "While I must argue the skeptic's position, let me steelman it properly: The Cold War context created enormous pressure for the U.S. to demonstrate technological supremacy. Some argue the Van Allen radiation belts would have been lethal to astronauts with 1960s technology, and the flag appearing to wave in a vacuum raises questions.\n\nHowever, I should note that these concerns have been thoroughly addressed by physics—the flag had a horizontal rod, and the radiation exposure was within survivable limits for the trajectory taken. The skeptic position, while worth examining, does not withstand scientific scrutiny.",
      round: 1,
    },
    {
      id: "mock-3",
      side: "for",
      model: "claude",
      content: "My opponent raises valid points about the importance of scrutiny, but concedes the key issue: every technical objection has been definitively answered. The radiation concern is particularly illustrative—astronauts passed through the Van Allen belts quickly on trajectories that minimized exposure, receiving doses comparable to a few CT scans.\n\nThe 'waving flag' demonstrates how intuition can mislead us. In vacuum, without air resistance, a flag disturbed by handling continues moving longer than on Earth. This is exactly what physics predicts.\n\nPerhaps most compelling: faking the landings with 1960s technology would have been harder than actually going. The consistent lighting, absence of atmospheric haze, and lunar dust behavior across thousands of hours of footage would have been impossible to simulate.",
      round: 2,
    },
    {
      id: "mock-4",
      side: "against",
      model: "gpt-4",
      content: "I appreciate Claude's thorough response. To continue the adversarial examination: some point to inconsistencies in photographs—stars absent from the lunar sky, seemingly duplicate backgrounds in different mission photos.\n\nYet again, these have explanations. Camera exposures were set for brightly lit surfaces, washing out dim stars. The lunar landscape has limited features, and similar-looking hills appear in different photos simply because the terrain is repetitive.\n\nThe strongest skeptic argument might be 'why haven't we returned since 1972?' But this reflects economics and political will, not capability. We've sent robots, and multiple nations are now planning crewed returns. The original achievement stands uncontested by any credible scientific analysis.",
      round: 2,
    },
  ],
};

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

  return (
    <div className="flex-1">
      {/* Side Label */}
      <div className={`flex items-center gap-2 mb-4 ${isFor ? "" : "justify-end"}`}>
        {isFor ? (
          <Sword className="w-4 h-4 text-amber-600" />
        ) : (
          <Shield className="w-4 h-4 text-stone-500" />
        )}
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
          const Icon = llm.Icon;
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
                    : "border-stone-400 bg-gradient-to-br from-stone-100 to-stone-50 shadow-md"
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

              {/* Model icon */}
              <div
                className="w-9 h-9 rounded-lg mb-2 flex items-center justify-center"
                style={{ backgroundColor: llm.bgLight }}
              >
                <Icon className="w-5 h-5" style={{ color: llm.color }} />
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
  const Icon = llm?.Icon || ClaudeIcon;

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
          <div className="px-4 py-1.5 bg-stone-100/80 rounded-full border border-stone-200/50">
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
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md border border-stone-200/50"
            style={{ backgroundColor: llm?.bgLight }}
          >
            <Icon className="w-6 h-6" style={{ color: llm?.color }} />
          </div>
          <div className={`w-0.5 flex-1 min-h-[20px] ${isFor ? "bg-amber-200/60" : "bg-stone-200/60"}`} />
        </div>

        {/* Content */}
        <div className={`flex-1 ${isFor ? "pr-8" : "pl-8"}`}>
          {/* Header */}
          <div className={`flex items-center gap-2 mb-2 ${isFor ? "" : "justify-end"}`}>
            <span className="font-serif font-semibold text-primary">{llm?.name}</span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium ${
                isFor
                  ? "bg-amber-100/80 text-amber-700 border border-amber-200/50"
                  : "bg-stone-100/80 text-stone-600 border border-stone-200/50"
              }`}
            >
              {isFor ? <Sword className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
              {isFor ? "Pro" : "Con"}
            </span>
          </div>

          {/* Message card */}
          <div
            className={`rounded-2xl p-5 border shadow-sm ${
              isFor
                ? "bg-gradient-to-br from-amber-50/60 to-orange-50/30 border-amber-200/40"
                : "bg-gradient-to-br from-stone-50/60 to-gray-50/30 border-stone-200/40"
            }`}
          >
            {/* Quote decoration */}
            <Quote
              className={`w-5 h-5 mb-2 opacity-40 ${
                isFor ? "text-amber-400" : "text-stone-400"
              }`}
            />
            <p className="text-stone-700 leading-relaxed whitespace-pre-wrap text-[15px]">
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
  const Icon = llm?.Icon || ClaudeIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex gap-4 ${isFor ? "" : "flex-row-reverse"}`}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md border border-stone-200/50"
        style={{ backgroundColor: llm?.bgLight }}
      >
        <Icon className="w-6 h-6" style={{ color: llm?.color }} />
      </div>
      <div
        className={`rounded-2xl px-5 py-4 border ${
          isFor
            ? "bg-amber-50/40 border-amber-200/40"
            : "bg-stone-50/40 border-stone-200/40"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-500 italic font-serif">
            {llm?.name} is composing...
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
  const [showMockDebate, setShowMockDebate] = useState(false);

  const canStart = forModel && againstModel && !isDebating;
  const isSetupPhase = messages.length === 0 && !isDebating && !showMockDebate;
  const hasMockData = currentTopicId && MOCK_DEBATES[currentTopicId];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 || showMockDebate) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingSide, showMockDebate]);

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

    setShowMockDebate(false);
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
    setShowMockDebate(false);
  }, []);

  const viewMockDebate = useCallback(() => {
    if (hasMockData) {
      setShowMockDebate(true);
      setForModel("claude");
      setAgainstModel("gpt-4");
      setCurrentRound(2);
      setMaxRounds(2);
    }
  }, [hasMockData]);

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
  const ForIcon = forLlm?.Icon || ClaudeIcon;
  const AgainstIcon = againstLlm?.Icon || OpenAIIcon;

  const displayMessages = showMockDebate && hasMockData ? MOCK_DEBATES[currentTopicId] : messages;

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100/80 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider border border-stone-200/50">
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
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-stone-200/60 p-6 shadow-sm">
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-300/50 flex items-center justify-center shadow-inner">
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
                        ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md"
                        : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <motion.button
                onClick={startDebate}
                disabled={!canStart}
                whileHover={canStart ? { scale: 1.02 } : {}}
                whileTap={canStart ? { scale: 0.98 } : {}}
                className={`
                  flex items-center gap-3 px-8 py-3.5 rounded-xl font-serif font-semibold text-lg transition-all
                  ${canStart
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-stone-100 text-stone-400 cursor-not-allowed"
                  }
                `}
              >
                <Play className="h-5 w-5" />
                Begin Debate
              </motion.button>

              {hasMockData && (
                <motion.button
                  onClick={viewMockDebate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-serif font-medium text-stone-600 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all"
                >
                  <Eye className="h-4 w-4" />
                  View Example
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Active Debate Header */}
        {(isDebating || displayMessages.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-stone-200/60 shadow-sm"
          >
            <div className="flex items-center gap-6">
              {/* Debaters */}
              <div className="flex items-center gap-2">
                <Sword className="w-4 h-4 text-amber-600" />
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-stone-200/50"
                  style={{ backgroundColor: forLlm?.bgLight }}
                >
                  <ForIcon className="w-4 h-4" style={{ color: forLlm?.color }} />
                </div>
                <span className="font-serif text-amber-700 font-medium">{forLlm?.name}</span>
              </div>

              <span className="text-stone-400 font-serif italic">vs</span>

              <div className="flex items-center gap-2">
                <span className="font-serif text-stone-600 font-medium">{againstLlm?.name}</span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-stone-200/50"
                  style={{ backgroundColor: againstLlm?.bgLight }}
                >
                  <AgainstIcon className="w-4 h-4" style={{ color: againstLlm?.color }} />
                </div>
                <Shield className="w-4 h-4 text-stone-500" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-50/80">
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

              {showMockDebate && (
                <div className="flex items-center gap-1.5 text-stone-500">
                  <Eye className="h-4 w-4" />
                  <span className="text-xs font-medium">Example</span>
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
            className="p-4 bg-red-50/80 border border-red-200/60 rounded-xl text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Messages */}
        {displayMessages.length > 0 && (
          <div className="space-y-6 pb-4">
            <AnimatePresence mode="popLayout">
              {displayMessages.map((message, index) => (
                <ArgumentBubble
                  key={message.id}
                  message={message}
                  isLatest={index === displayMessages.length - 1}
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
        {!isDebating && displayMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 border-t border-stone-200/60"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-full">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span className="font-serif text-amber-800 font-medium">
                {showMockDebate ? "Example Debate" : "Debate Concluded"} — {maxRounds} Rounds
              </span>
            </div>
            <p className="mt-4 text-stone-500 max-w-md mx-auto">
              {showMockDebate
                ? "This is a pre-generated example. Start your own debate to see live AI responses."
                : "Both sides have presented their arguments. Consider the evidence and form your own conclusion."
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
