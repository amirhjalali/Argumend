"use client";

import { useState, useEffect, useRef, useCallback, forwardRef, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sword, Shield, Quote, Swords, ArrowRight, Trophy } from "lucide-react";
import { getMockDebate } from "@/data/mockDebates";
import { getMockVerdict } from "@/data/mockVerdicts";
import { getLLMOption, ClaudeIcon } from "@/components/icons/LLMIcons";
import type { DebateMessage } from "@/types/debate";
import type { LLMModel } from "@/types/logic";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Pick the "strongest" exchange (round) from a debate.
 * - If a verdict exists, pick the side that won and use the longest message
 *   from that side. Pair it with the opposing message from the same round.
 * - If draw or no verdict, pick the round whose combined content is longest.
 */
function pickHighlightExchange(
  messages: DebateMessage[],
  winner: "for" | "against" | "draw" | null,
): { forMsg: DebateMessage; againstMsg: DebateMessage } {
  const rounds = new Map<number, { for?: DebateMessage; against?: DebateMessage }>();
  for (const m of messages) {
    const entry = rounds.get(m.round) ?? {};
    entry[m.side] = m;
    rounds.set(m.round, entry);
  }

  // Filter to complete rounds only
  const completePairs = Array.from(rounds.values()).filter(
    (r): r is { for: DebateMessage; against: DebateMessage } =>
      r.for !== undefined && r.against !== undefined,
  );

  if (completePairs.length === 0) {
    // Fallback: just grab any for/against
    const forMsg = messages.find((m) => m.side === "for")!;
    const againstMsg = messages.find((m) => m.side === "against")!;
    return { forMsg, againstMsg };
  }

  if (winner === "for" || winner === "against") {
    // Pick the round where the winning side's argument is longest
    const sorted = [...completePairs].sort(
      (a, b) => b[winner].content.length - a[winner].content.length,
    );
    return { forMsg: sorted[0].for, againstMsg: sorted[0].against };
  }

  // Draw or null: pick round with longest combined text
  const sorted = [...completePairs].sort(
    (a, b) =>
      b.for.content.length + b.against.content.length -
      (a.for.content.length + a.against.content.length),
  );
  return { forMsg: sorted[0].for, againstMsg: sorted[0].against };
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const cut = text.lastIndexOf(" ", maxLen);
  return text.slice(0, cut > 0 ? cut : maxLen) + "\u2026";
}

// ---------------------------------------------------------------------------
// Typewriter hook
// ---------------------------------------------------------------------------

function useTypewriter(
  fullText: string,
  active: boolean,
  paused: boolean,
  msPerWord: number = 60,
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [prevText, setPrevText] = useState(fullText);

  // Derive words from fullText (pure computation)
  const words = useMemo(() => fullText.split(/\s+/), [fullText]);

  // Reset word index when fullText changes (React-recommended pattern)
  if (prevText !== fullText) {
    setPrevText(fullText);
    setWordIndex(0);
  }

  useEffect(() => {
    if (!active || paused) return;
    if (wordIndex >= words.length) return;

    const timer = setTimeout(() => {
      setWordIndex((i) => i + 1);
    }, msPerWord);

    return () => clearTimeout(timer);
  }, [active, paused, wordIndex, msPerWord, words.length]);

  const visibleText =
    wordIndex >= words.length
      ? fullText
      : words.slice(0, wordIndex).join(" ");

  const done = wordIndex >= words.length;

  return { visibleText, done };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface SpeechBubbleProps {
  side: "for" | "against";
  text: string;
  model: LLMModel;
  done: boolean;
}

function SpeechBubble({ side, text, model, done }: SpeechBubbleProps) {
  const llm = getLLMOption(model);
  const isFor = side === "for";
  const Icon = llm?.Icon ?? ClaudeIcon;

  return (
    <div className={`flex gap-3 ${isFor ? "" : "flex-row-reverse"}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm border border-stone-200/50"
          style={{ backgroundColor: llm?.bgLight }}
        >
          <Icon className="w-5 h-5" style={{ color: llm?.color }} />
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isFor ? "pr-2" : "pl-2"}`}>
        {/* Label */}
        <div
          className={`flex items-center gap-2 mb-1.5 ${isFor ? "" : "justify-end"}`}
        >
          <span className="font-serif font-semibold text-sm text-primary">
            {llm?.name ?? model}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium ${
              isFor
                ? "bg-rust-100/80 text-rust-700 border border-rust-200/50"
                : "bg-[#4f7b77]/10 text-[#4f7b77] border border-[#4f7b77]/20"
            }`}
          >
            {isFor ? <Sword className="w-2.5 h-2.5" /> : <Shield className="w-2.5 h-2.5" />}
            {isFor ? "Pro" : "Con"}
          </span>
        </div>

        {/* Bubble */}
        <div
          className={`rounded-xl p-4 border shadow-sm ${
            isFor
              ? "bg-gradient-to-br from-rust-50/60 to-rust-100/30 border-rust-200/40"
              : "bg-gradient-to-br from-[#4f7b77]/5 to-[#4f7b77]/10 border-[#4f7b77]/20"
          }`}
        >
          <Quote
            className={`w-4 h-4 mb-1.5 opacity-40 ${
              isFor ? "text-rust-400" : "text-[#4f7b77]"
            }`}
            aria-hidden="true"
          />
          <p className="font-serif text-sm text-stone-700 leading-relaxed min-h-[2.5rem]">
            {text}
            {!done && (
              <span className="inline-block w-0.5 h-4 ml-0.5 bg-stone-400 animate-pulse align-text-bottom" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function VerdictBadge({ winner }: { winner: "for" | "against" | "draw" | null }) {
  if (!winner) return null;

  const label =
    winner === "for"
      ? "Proponent wins"
      : winner === "against"
        ? "Skeptic wins"
        : "Draw";

  const style =
    winner === "for"
      ? "bg-rust-50 text-rust-700 border-rust-200/60"
      : winner === "against"
        ? "bg-[#4f7b77]/10 text-[#4f7b77] border-[#4f7b77]/20"
        : "bg-stone-100 text-stone-600 border-stone-200/60";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${style}`}
    >
      <Trophy className="w-3 h-3" />
      {label}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inner component (forwardRef so parent can attach IntersectionObserver)
// ---------------------------------------------------------------------------

interface DebateHighlightInnerProps {
  topicId: string;
  forMsg: DebateMessage;
  againstMsg: DebateMessage;
  forExcerpt: string;
  againstExcerpt: string;
  winner: "for" | "against" | "draw" | null;
  isVisible: boolean;
  isPaused: boolean;
  onPauseChange: (paused: boolean) => void;
}

const DebateHighlightInner = forwardRef<HTMLDivElement, DebateHighlightInnerProps>(
  function DebateHighlightInner(
    {
      topicId,
      forMsg,
      againstMsg,
      forExcerpt,
      againstExcerpt,
      winner,
      isVisible,
      isPaused,
      onPauseChange,
    },
    ref,
  ) {
    const { visibleText: forText, done: forDone } = useTypewriter(
      forExcerpt,
      isVisible,
      isPaused,
      55,
    );
    const { visibleText: againstText, done: againstDone } = useTypewriter(
      againstExcerpt,
      isVisible && forDone,
      isPaused,
      55,
    );

    const handleMouseEnter = useCallback(() => onPauseChange(true), [onPauseChange]);
    const handleMouseLeave = useCallback(() => onPauseChange(false), [onPauseChange]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="rounded-xl border border-stone-200/60 bg-[#faf8f5] shadow-sm overflow-hidden mb-6"
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-stone-500" />
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Debate Highlight &mdash; Round {forMsg.round}
            </span>
          </div>
          <VerdictBadge winner={winner} />
        </div>

        {/* Exchange */}
        <div className="px-5 pb-4 space-y-4">
          <SpeechBubble side="for" text={forText} model={forMsg.model} done={forDone} />
          <SpeechBubble side="against" text={againstText} model={againstMsg.model} done={againstDone} />
        </div>

        {/* CTA */}
        <div className="px-5 pb-5 flex justify-center">
          <Link
            href={`/?topic=${topicId}&view=debate`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C4613C] to-[#b05434] text-white text-sm font-medium hover:from-[#b05434] hover:to-[#8b3f27] transition-all shadow-sm"
          >
            Watch full debate
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  },
);

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

interface DebateHighlightProps {
  topicId: string;
}

export function DebateHighlight({ topicId }: DebateHighlightProps) {
  const messages = getMockDebate(topicId);
  const verdict = getMockVerdict(topicId);

  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: autoplay on scroll-into-view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!messages || messages.length === 0) return null;

  const winner = verdict?.winner ?? null;
  const { forMsg, againstMsg } = pickHighlightExchange(messages, winner);

  const forExcerpt = truncate(forMsg.content, 150);
  const againstExcerpt = truncate(againstMsg.content, 150);

  return (
    <DebateHighlightInner
      ref={containerRef}
      topicId={topicId}
      forMsg={forMsg}
      againstMsg={againstMsg}
      forExcerpt={forExcerpt}
      againstExcerpt={againstExcerpt}
      winner={winner}
      isVisible={isVisible}
      isPaused={isPaused}
      onPauseChange={setIsPaused}
    />
  );
}
