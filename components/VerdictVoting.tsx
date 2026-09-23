"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Users } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface VerdictVotingProps {
  topicId: string;
  topicTitle: string;
  balance: number; // The AI's evidence-balance (0 = against, 100 = for) for comparison
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

// One neutral scale. The options used to run charcoal (disagree) to rust
// (agree, the proponent colour), which made one end of the scale look like the
// warm, right answer. Every option now gets the same treatment; only the
// reader's own choice is marked, in deep teal (2026-09-22 design audit).
const NEUTRAL_OPTION = {
  color: "bg-transparent border border-stone-300 dark:border-stone-600",
  hoverColor: "hover:border-deep hover:bg-deep/5 dark:hover:border-[#8bb5b1] dark:hover:bg-deep/10",
  textColor: "text-stone-700 dark:text-stone-200",
  ringColor: "focus-visible:ring-deep/40",
  barColor: "bg-stone-400 dark:bg-stone-500",
} as const;

const VOTE_OPTIONS = [
  { min: 0, max: 20, label: "Strong disagree", ...NEUTRAL_OPTION },
  { min: 20, max: 40, label: "Lean disagree", ...NEUTRAL_OPTION },
  { min: 40, max: 60, label: "Undecided", ...NEUTRAL_OPTION },
  { min: 60, max: 80, label: "Lean agree", ...NEUTRAL_OPTION },
  { min: 80, max: 100, label: "Strong agree", ...NEUTRAL_OPTION },
] as const;

const CHOSEN_OPTION_CLASS = "bg-deep text-white";

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

export function VerdictVoting({ topicId, balance }: VerdictVotingProps) {
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

  const votedOptionIndex = userVote !== null ? getVoteIndex(userVote) : null;
  const votedLabel = votedOptionIndex !== null ? VOTE_OPTIONS[votedOptionIndex].label : "";

  return (
    <section className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl text-primary dark:text-stone-200 mb-2">
          Where do you land, for now?
        </h2>
        <p className="text-sm text-secondary dark:text-stone-400 leading-relaxed max-w-lg mx-auto">
          There is no right answer to pick here. Change it whenever the
          evidence changes your mind.
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
                  className={`flex-1 min-h-11 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${option.color} ${option.hoverColor} ${option.textColor} focus-visible:ring-2 focus-visible:ring-offset-2 ${option.ringColor}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted dark:text-stone-400 text-center">
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${CHOSEN_OPTION_CLASS}`}
              >
                For now: {votedLabel}
              </motion.div>
            </div>

            {/* No scoreboard (north star): the aggregate is still recorded,
                but readers see no per-option share and no head count, only
                that other people have weighed this too. */}
            {aggregate && aggregate.count > 1 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400"
              >
                <Users className="h-3.5 w-3.5" aria-hidden />
                <span>You&rsquo;re not alone &mdash; readers land all over this one.</span>
              </motion.p>
            )}

            {/* Comparison with AI analysis */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="rounded-lg border border-stone-200/60 bg-gradient-to-br from-[#faf8f5] to-[#f4f1eb] p-4 sm:p-5 dark:border-[var(--border-default)] dark:from-[#252420] dark:to-[#302e2a]"
            >
              <p className="text-sm text-stone-600 leading-relaxed dark:text-stone-300">
                {/* No verdict language: the reader's answer is set beside the
                    map's evidence balance, never graded against it. */}
                <span className="font-medium text-primary dark:text-stone-200">
                  How that compares with the map:
                </span>{" "}
                the evidence balance for this topic is{" "}
                <span className="font-mono font-semibold text-deep tabular-nums dark:text-[#8bb5b1]">{balance}/100</span>{" "}
                (0 = against, 100 = for).
                {userVote !== null && Math.abs(userVote - balance) <= 15 && (
                  <span className="font-medium">
                    {" "}You land close to where the weighed evidence sits.
                  </span>
                )}
                {userVote !== null && Math.abs(userVote - balance) > 15 && userVote > balance && (
                  <span className="font-medium">
                    {" "}You lean further toward &ldquo;for&rdquo; than the weighed evidence does; the skeptic&rsquo;s strongest points above are where to test that.
                  </span>
                )}
                {userVote !== null && Math.abs(userVote - balance) > 15 && userVote < balance && (
                  <span className="font-medium">
                    {" "}You lean further toward &ldquo;against&rdquo; than the weighed evidence does; the proponent&rsquo;s strongest points above are where to test that.
                  </span>
                )}
              </p>
            </motion.div>

            {/* Change vote */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleChangeVote}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[var(--bg-overlay)] transition-colors"
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
