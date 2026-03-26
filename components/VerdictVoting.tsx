"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vote, RotateCcw, Users, BarChart3, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface VerdictVotingProps {
  topicId: string;
  topicTitle: string;
  confidenceScore: number; // The AI's evidence-based score for comparison
}

interface StoredVote {
  vote: number;
  timestamp: string;
}

interface AggregateData {
  [topicId: string]: {
    votes: number[];
    count: number;
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const VOTE_OPTIONS = [
  { min: 0, max: 20, label: "Strong disagree", color: "bg-stone-600", hoverColor: "hover:bg-stone-700", textColor: "text-white", ringColor: "ring-stone-500/50", barColor: "bg-stone-600" },
  { min: 20, max: 40, label: "Lean disagree", color: "bg-stone-400", hoverColor: "hover:bg-stone-500", textColor: "text-white", ringColor: "ring-stone-400/50", barColor: "bg-stone-400" },
  { min: 40, max: 60, label: "Undecided", color: "bg-stone-300", hoverColor: "hover:bg-stone-400", textColor: "text-stone-700", ringColor: "ring-stone-300/50", barColor: "bg-stone-300" },
  { min: 60, max: 80, label: "Lean agree", color: "bg-rust-400", hoverColor: "hover:bg-rust-500", textColor: "text-white", ringColor: "ring-rust-400/50", barColor: "bg-rust-400" },
  { min: 80, max: 100, label: "Strong agree", color: "bg-rust-600", hoverColor: "hover:bg-rust-700", textColor: "text-white", ringColor: "ring-rust-600/50", barColor: "bg-rust-600" },
] as const;

const VOTE_KEY_PREFIX = "argumend-verdict-";
const AGGREGATE_KEY = "argumend-verdicts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getVoteIndex(vote: number): number {
  if (vote <= 20) return 0;
  if (vote <= 40) return 1;
  if (vote <= 60) return 2;
  if (vote <= 80) return 3;
  return 4;
}

function getStoredVote(topicId: string): StoredVote | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${VOTE_KEY_PREFIX}${topicId}`);
    if (!raw) return null;
    return JSON.parse(raw) as StoredVote;
  } catch {
    return null;
  }
}

function getAggregateData(): AggregateData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(AGGREGATE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AggregateData;
  } catch {
    return {};
  }
}

function saveVote(topicId: string, vote: number): void {
  if (typeof window === "undefined") return;

  // Save individual vote
  const stored: StoredVote = { vote, timestamp: new Date().toISOString() };
  localStorage.setItem(`${VOTE_KEY_PREFIX}${topicId}`, JSON.stringify(stored));

  // Update aggregate
  const aggregate = getAggregateData();
  const existing = aggregate[topicId] ?? { votes: [], count: 0 };

  // Check if user already voted (replace their vote)
  const previousVote = getStoredVote(topicId);
  if (previousVote && existing.votes.length > 0) {
    // Remove the old vote from aggregate (best-effort: remove first matching value)
    const oldIdx = existing.votes.indexOf(previousVote.vote);
    if (oldIdx !== -1) {
      existing.votes.splice(oldIdx, 1);
      existing.count = Math.max(0, existing.count - 1);
    }
  }

  existing.votes.push(vote);
  existing.count = existing.votes.length;
  aggregate[topicId] = existing;
  localStorage.setItem(AGGREGATE_KEY, JSON.stringify(aggregate));
}

function removeVote(topicId: string, currentVote: number): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`${VOTE_KEY_PREFIX}${topicId}`);

  const aggregate = getAggregateData();
  const existing = aggregate[topicId];
  if (existing) {
    const idx = existing.votes.indexOf(currentVote);
    if (idx !== -1) {
      existing.votes.splice(idx, 1);
      existing.count = existing.votes.length;
    }
    if (existing.count === 0) {
      const { [topicId]: _, ...rest } = aggregate;
      localStorage.setItem(AGGREGATE_KEY, JSON.stringify(rest));
      return;
    } else {
      aggregate[topicId] = existing;
    }
    localStorage.setItem(AGGREGATE_KEY, JSON.stringify(aggregate));
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VerdictVoting({ topicId, topicTitle, confidenceScore }: VerdictVotingProps) {
  const [userVote, setUserVote] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [aggregate, setAggregate] = useState<{ votes: number[]; count: number } | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  // Load existing vote on mount
  useEffect(() => {
    const stored = getStoredVote(topicId);
    const agg = getAggregateData();
    const handle = setTimeout(() => {
      if (stored) {
        setUserVote(stored.vote);
        setHasVoted(true);
      }
      setAggregate(agg[topicId] ?? null);
    }, 0);
    return () => clearTimeout(handle);
  }, [topicId]);

  const handleVote = useCallback(
    (optionIndex: number) => {
      // Map option index to midpoint of range
      const option = VOTE_OPTIONS[optionIndex];
      const vote = Math.round((option.min + option.max) / 2);

      saveVote(topicId, vote);
      setUserVote(vote);
      setHasVoted(true);
      setIsChanging(false);

      // Refresh aggregate
      const agg = getAggregateData();
      setAggregate(agg[topicId] ?? null);
    },
    [topicId],
  );

  const handleChangeVote = useCallback(() => {
    if (userVote !== null) {
      removeVote(topicId, userVote);
    }
    setHasVoted(false);
    setUserVote(null);
    setIsChanging(true);

    // Refresh aggregate
    const agg = getAggregateData();
    setAggregate(agg[topicId] ?? null);
  }, [topicId, userVote]);

  // Compute distribution for bar chart
  const distribution = VOTE_OPTIONS.map((_, i) => {
    if (!aggregate || aggregate.count === 0) return 0;
    return aggregate.votes.filter((v) => getVoteIndex(v) === i).length;
  });
  const maxDistribution = Math.max(...distribution, 1);

  const votedOptionIndex = userVote !== null ? getVoteIndex(userVote) : null;
  const votedLabel = votedOptionIndex !== null ? VOTE_OPTIONS[votedOptionIndex].label : "";

  return (
    <section className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100/80 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider border border-stone-200/50 mb-4">
          <Vote className="h-3.5 w-3.5" />
          Community Verdict
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-2">
          What&rsquo;s Your Verdict?
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-lg mx-auto">
          After reviewing the evidence, where do you stand?
        </p>
      </div>

      {/* Voting buttons or results */}
      <AnimatePresence mode="wait">
        {!hasVoted ? (
          <motion.div
            key="voting"
            initial={isChanging ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            {/* Voting buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
              {VOTE_OPTIONS.map((option, i) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleVote(i)}
                  className={`flex-1 px-3 py-3 sm:py-3.5 rounded-lg text-sm font-medium transition-all duration-200 ${option.color} ${option.hoverColor} ${option.textColor} shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-offset-2 ${option.ringColor}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone-400 text-center">
              Your vote is stored locally and never leaves your browser.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Confirmation */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  votedOptionIndex !== null ? VOTE_OPTIONS[votedOptionIndex].color : "bg-stone-300"
                } ${votedOptionIndex !== null ? VOTE_OPTIONS[votedOptionIndex].textColor : "text-stone-700"}`}
              >
                Your verdict: {votedLabel}
              </motion.div>
            </div>

            {/* Aggregate distribution bar */}
            {aggregate && aggregate.count > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-stone-500" />
                  <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">
                    Community Results
                  </span>
                </div>
                <div className="space-y-2">
                  {VOTE_OPTIONS.map((option, i) => {
                    const count = distribution[i];
                    const pct =
                      aggregate.count > 0
                        ? Math.round((count / aggregate.count) * 100)
                        : 0;
                    const isUserChoice = votedOptionIndex === i;

                    return (
                      <div key={option.label} className="flex items-center gap-3">
                        <span
                          className={`text-xs w-28 sm:w-32 text-right font-medium truncate ${
                            isUserChoice ? "text-primary font-semibold" : "text-stone-500"
                          }`}
                        >
                          {option.label}
                          {isUserChoice && " *"}
                        </span>
                        <div className="flex-1 h-6 rounded-md bg-stone-100 overflow-hidden relative">
                          <motion.div
                            className={`h-full rounded-md ${option.barColor} ${
                              isUserChoice ? "ring-2 ring-inset ring-white/30" : ""
                            }`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.max(
                                count > 0 ? (count / maxDistribution) * 100 : 0,
                                count > 0 ? 4 : 0,
                              )}%`,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: 0.3 + i * 0.08,
                              ease: "easeOut",
                            }}
                          />
                          {count > 0 && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-mono font-semibold text-stone-600 tabular-nums">
                              {pct}%
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vote count */}
                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-stone-500">
                  <Users className="h-3.5 w-3.5" />
                  <span>
                    {aggregate.count} {aggregate.count === 1 ? "person has" : "people have"} voted on this topic
                  </span>
                </div>
              </motion.div>
            )}

            {/* Comparison with AI analysis */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="rounded-lg border border-stone-200/60 bg-gradient-to-br from-[#faf8f5] to-[#f4f1eb] p-4 sm:p-5"
            >
              <p className="text-sm text-stone-600 leading-relaxed">
                <span className="font-medium text-primary">
                  Compare your verdict with our evidence-based analysis:
                </span>{" "}
                The AI confidence score for this topic is{" "}
                <span className="font-mono font-semibold text-deep tabular-nums">
                  {confidenceScore}%
                </span>
                .
                {userVote !== null && Math.abs(userVote - confidenceScore) <= 15 && (
                  <span className="text-emerald-700 font-medium">
                    {" "}Your verdict aligns closely with the evidence-based analysis.
                  </span>
                )}
                {userVote !== null && Math.abs(userVote - confidenceScore) > 15 && userVote > confidenceScore && (
                  <span className="text-rust-700 font-medium">
                    {" "}You seem more convinced than the evidence alone suggests -- explore the counterarguments in the analysis above.
                  </span>
                )}
                {userVote !== null && Math.abs(userVote - confidenceScore) > 15 && userVote < confidenceScore && (
                  <span className="text-deep font-medium">
                    {" "}You seem more skeptical than the evidence indicates -- the supporting evidence above may offer a new perspective.
                  </span>
                )}
              </p>
            </motion.div>

            {/* Change vote */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleChangeVote}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Change your vote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
