"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swords,
  Play,
  Pause,
  RotateCcw,
  Loader2,
  Quote,
  MessageCircle,
  Sword,
  Shield,
  Eye,
  RefreshCw,
  AlertCircle,
  Gavel,
} from "lucide-react";
import { JudgingResults } from "@/components/JudgingResults";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";
import type { DebateMessage } from "@/types/debate";
import {
  LLM_OPTIONS,
  getLLMOption,
  ClaudeIcon,
  OpenAIIcon,
} from "@/components/icons/LLMIcons";
import type { LLMOption } from "@/components/icons/LLMIcons";
import { DEBATE, THINKING_DOTS } from "@/lib/constants";
import type { LLMModel } from "@/types/logic";
import {
  useDebateOrchestrator,
  type DebateState,
} from "@/hooks/useDebateOrchestrator";

// ============================================================================
// Sub-Components
// ============================================================================

interface DebaterCardProps {
  side: "for" | "against";
  selectedModel: LLMModel | null;
  onSelect: (model: LLMModel) => void;
  disabled: boolean;
}

function DebaterCard({
  side,
  selectedModel,
  onSelect,
  disabled,
}: DebaterCardProps) {
  const isFor = side === "for";

  return (
    <div className="flex-1">
      {/* Side Label */}
      <div
        className={`flex items-center gap-2 mb-4 ${isFor ? "" : "justify-end"}`}
      >
        {isFor ? (
          <Sword className="w-4 h-4 text-rust-600" />
        ) : (
          <Shield className="w-4 h-4 text-stone-500" />
        )}
        <span
          className={`font-serif text-sm md:text-base tracking-[0.15em] uppercase ${
            isFor ? "text-rust-800" : "text-stone-600"
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
                relative p-2 md:p-3 rounded-xl border-2 transition-all duration-200 text-left
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${
                  isSelected
                    ? isFor
                      ? "border-rust-400 bg-gradient-to-br from-rust-50 to-rust-100/50 shadow-md"
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
                    isFor ? "bg-rust-500" : "bg-stone-500"
                  }`}
                >
                  &#10003;
                </motion.div>
              )}

              {/* Model icon */}
              <div
                className="w-9 h-9 rounded-lg mb-2 flex items-center justify-center"
                style={{ backgroundColor: llm.bgLight }}
              >
                <Icon className="w-5 h-5" style={{ color: llm.color }} />
              </div>
              <div className="font-serif font-semibold text-xs md:text-sm text-primary">
                {llm.name}
              </div>
              <div className="text-xs text-stone-500 mt-0.5 truncate">{llm.fullName}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

interface ArgumentBubbleProps {
  message: DebateMessage;
}

function ArgumentBubble({ message }: ArgumentBubbleProps) {
  const llm = getLLMOption(message.model);
  const isFor = message.side === "for";
  const Icon = llm?.Icon ?? ClaudeIcon;

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

      <div className={`flex gap-2 md:gap-4 ${isFor ? "" : "flex-row-reverse"}`}>
        {/* Avatar column */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md border border-stone-200/50"
            style={{ backgroundColor: llm?.bgLight }}
          >
            <Icon className="w-6 h-6" style={{ color: llm?.color }} />
          </div>
          <div
            className={`w-0.5 flex-1 min-h-[20px] ${
              isFor ? "bg-rust-200/60" : "bg-stone-200/60"
            }`}
          />
        </div>

        {/* Content */}
        <div className={`flex-1 ${isFor ? "pr-3 md:pr-8" : "pl-3 md:pl-8"}`}>
          {/* Header */}
          <div
            className={`flex items-center gap-2 mb-2 ${
              isFor ? "" : "justify-end"
            }`}
          >
            <span className="font-serif font-semibold text-primary">
              {llm?.name}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium ${
                isFor
                  ? "bg-rust-100/80 text-rust-700 border border-rust-200/50"
                  : "bg-stone-100/80 text-stone-600 border border-stone-200/50"
              }`}
            >
              {isFor ? (
                <Sword className="w-3 h-3" />
              ) : (
                <Shield className="w-3 h-3" />
              )}
              {isFor ? "Pro" : "Con"}
            </span>
          </div>

          {/* Message card */}
          <div
            className={`rounded-2xl p-5 border shadow-sm ${
              isFor
                ? "bg-gradient-to-br from-rust-50/60 to-rust-100/30 border-rust-200/40"
                : "bg-gradient-to-br from-stone-50/60 to-stone-50/30 border-stone-200/40"
            }`}
          >
            {/* Quote decoration */}
            <Quote
              className={`w-5 h-5 mb-2 opacity-40 ${
                isFor ? "text-rust-400" : "text-stone-400"
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

interface ThinkingIndicatorProps {
  side: "for" | "against";
  model: LLMModel;
}

function ThinkingIndicator({ side, model }: ThinkingIndicatorProps) {
  const llm = getLLMOption(model);
  const isFor = side === "for";
  const Icon = llm?.Icon ?? ClaudeIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex gap-2 md:gap-4 ${isFor ? "" : "flex-row-reverse"}`}
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
            ? "bg-rust-50/40 border-rust-200/40"
            : "bg-stone-50/40 border-stone-200/40"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-500 italic font-serif">
            {llm?.name} is composing...
          </span>
          <div className="flex gap-1">
            {Array.from({ length: THINKING_DOTS.COUNT }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: THINKING_DOTS.ANIMATION_DURATION,
                  repeat: Infinity,
                  delay: i * THINKING_DOTS.DOT_DELAY,
                }}
                className={`w-1.5 h-1.5 rounded-full ${
                  isFor ? "bg-rust-400" : "bg-stone-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface DebateHeaderProps {
  state: DebateState;
  forLlm: LLMOption | undefined;
  againstLlm: LLMOption | undefined;
  onTogglePause: () => void;
  onReset: () => void;
}

function DebateHeader({
  state,
  forLlm,
  againstLlm,
  onTogglePause,
  onReset,
}: DebateHeaderProps) {
  const ForIcon = forLlm?.Icon ?? ClaudeIcon;
  const AgainstIcon = againstLlm?.Icon ?? OpenAIIcon;
  const isDebating = state.phase === "debating";
  const isPaused = state.phase === "paused";
  const isMockView = state.phase === "mockView";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-stone-200/60 shadow-sm flex-wrap"
    >
      <div className="flex items-center gap-2 md:gap-6 flex-wrap">
        {/* Debaters */}
        <div className="flex items-center gap-2">
          <Sword className="w-4 h-4 text-rust-600" />
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-stone-200/50"
            style={{ backgroundColor: forLlm?.bgLight }}
          >
            <ForIcon className="w-4 h-4" style={{ color: forLlm?.color }} />
          </div>
          <span className="font-serif text-rust-700 font-medium">
            {forLlm?.name}
          </span>
        </div>

        <span className="text-stone-400 font-serif italic">vs</span>

        <div className="flex items-center gap-2">
          <span className="font-serif text-stone-600 font-medium">
            {againstLlm?.name}
          </span>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-stone-200/50"
            style={{ backgroundColor: againstLlm?.bgLight }}
          >
            <AgainstIcon
              className="w-4 h-4"
              style={{ color: againstLlm?.color }}
            />
          </div>
          <Shield className="w-4 h-4 text-stone-500" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-50/80">
          <span className="text-xs text-stone-500">Round</span>
          <span className="font-serif font-bold text-primary">
            {state.currentRound}
          </span>
          <span className="text-xs text-stone-400">of {state.maxRounds}</span>
        </div>

        {isDebating && (
          <div className="flex items-center gap-1.5 text-rust-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs font-medium">Live</span>
          </div>
        )}

        {isMockView && (
          <div className="flex items-center gap-1.5 text-stone-500">
            <Eye className="h-4 w-4" />
            <span className="text-xs font-medium">Example</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          {(isDebating || isPaused) && (
            <button
              onClick={onTogglePause}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
              aria-label={isPaused ? "Resume debate" : "Pause debate"}
            >
              {isPaused ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </button>
          )}
          <button
            onClick={onReset}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
            aria-label="Reset debate"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function DebateView() {
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const topic = topics.find((t) => t.id === currentTopicId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    state,
    displayMessages,
    canStart,
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
  } = useDebateOrchestrator(topic, currentTopicId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (state.messages.length > 0 || state.phase === "mockView") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages, state.typingSide, state.phase]);

  // No topic selected state
  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-500 gap-4">
        <MessageCircle className="h-16 w-16 opacity-30" />
        <p className="font-serif text-lg">Select a topic to begin a debate</p>
      </div>
    );
  }

  const forLlm = getLLMOption(state.forModel ?? "claude");
  const againstLlm = getLLMOption(state.againstModel ?? "gpt-4");

  const isDebating = state.phase === "debating" || state.phase === "paused";
  const showHeader = isDebating || displayMessages.length > 0;
  const showComplete = !isDebating && displayMessages.length > 0;

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-5 md:py-8 space-y-8">
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
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08] max-w-3xl mx-auto">
            {topic.meta_claim}
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            Select your debaters and witness a structured exchange of arguments.
          </p>
          {!liveDebateEnabled && (
            <p className="text-xs text-rust-700 bg-rust-50 border border-rust-200 rounded-lg inline-block px-3 py-1.5">
              Offline mode active: debates are generated locally without API calls.
            </p>
          )}
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
                <h3 className="font-serif text-lg text-primary">
                  Select Your Debaters
                </h3>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch md:items-start">
                <DebaterCard
                  side="for"
                  selectedModel={state.forModel}
                  onSelect={setForModel}
                  disabled={isDebating}
                />

                {/* Center divider with VS */}
                <div className="flex flex-col items-center justify-center py-4 md:py-8 px-2 self-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-300/50 flex items-center justify-center shadow-inner">
                    <span className="font-serif text-stone-500 font-semibold text-sm">
                      vs
                    </span>
                  </div>
                </div>

                <DebaterCard
                  side="against"
                  selectedModel={state.againstModel}
                  onSelect={setAgainstModel}
                  disabled={isDebating}
                />
              </div>
            </div>

            {/* Round Selection */}
            <div className="flex items-center justify-center gap-6">
              <span className="font-serif text-stone-600">Number of Rounds</span>
              <div className="flex gap-2">
                {DEBATE.ROUND_OPTIONS.map((num) => (
                  <motion.button
                    key={num}
                    onClick={() => setMaxRounds(num)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl font-serif font-semibold transition-all ${
                      state.maxRounds === num
                        ? "bg-gradient-to-br from-rust-500 to-rust-600 text-white shadow-md"
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
                  flex items-center gap-3 px-4 md:px-8 py-3.5 rounded-xl font-serif font-semibold text-lg transition-all
                  ${
                    canStart
                      ? "bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-stone-100 text-stone-400 cursor-not-allowed"
                  }
                `}
              >
                <Play className="h-5 w-5" />
                {liveDebateEnabled ? "Begin Debate" : "Generate Debate"}
              </motion.button>

              {topicHasMockData && (
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
        {showHeader && (
          <DebateHeader
            state={state}
            forLlm={forLlm}
            againstLlm={againstLlm}
            onTogglePause={togglePause}
            onReset={resetDebate}
          />
        )}

        {/* Error with Retry */}
        {state.error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-50/80 border border-red-200/60 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-700 text-sm font-medium">
                  {state.failedModel
                    ? `${state.failedModel.charAt(0).toUpperCase() + state.failedModel.slice(1)} API Error`
                    : "Error"}
                </p>
                <p className="text-red-600 text-sm mt-1">{state.error}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearError}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={resetDebate}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Restart
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Messages */}
        {displayMessages.length > 0 && (
          <div className="space-y-6 pb-4">
            <AnimatePresence mode="popLayout">
              {displayMessages.map((message) => (
                <ArgumentBubble
                  key={message.id}
                  message={message}
                />
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {state.typingSide && state.forModel && state.againstModel && (
                <ThinkingIndicator
                  side={state.typingSide}
                  model={
                    state.typingSide === "for"
                      ? state.forModel
                      : state.againstModel
                  }
                />
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Debate Complete */}
        {showComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-5 md:py-8 border-t border-stone-200/60"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-rust-50 to-rust-100 border border-rust-200/60 rounded-full">
                <Swords className="h-4 w-4 text-rust-600" />
                <span className="font-serif text-rust-800 font-medium">
                  {state.phase === "mockView" ? "Example Debate" : "Debate Concluded"}{" "}
                  &mdash; {state.maxRounds} Rounds
                </span>
              </div>
              <p className="mt-4 text-stone-500 max-w-md mx-auto">
                {state.phase === "mockView"
                  ? "This is a pre-generated example. Start your own debate to see live AI responses."
                  : "Both sides have presented their arguments. Consider the evidence and form your own conclusion."}
              </p>

              {/* Action buttons - only for completed debates, not mock views */}
              {state.phase === "complete" && topic && state.forModel && state.againstModel && (
                <div className="mt-6 flex justify-center gap-3">
                  {/* Request AI Judgment button */}
                  {!state.judgingResult && (
                    <motion.button
                      onClick={requestJudgment}
                      disabled={state.isJudging}
                      whileHover={!state.isJudging ? { scale: 1.02 } : {}}
                      whileTap={!state.isJudging ? { scale: 0.98 } : {}}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 font-medium rounded-xl transition-colors shadow-md ${
                        state.isJudging
                          ? "bg-purple-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white`}
                    >
                      {state.isJudging ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Judging...
                        </>
                      ) : (
                        <>
                          <Gavel className="h-4 w-4" />
                          Request AI Judgment
                        </>
                      )}
                    </motion.button>
                  )}

                </div>
              )}
            </div>

            {/* Judging Results */}
            {state.judgingResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <JudgingResults result={state.judgingResult} />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
