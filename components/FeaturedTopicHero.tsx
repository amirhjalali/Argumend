"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Crosshair } from "lucide-react";
import {
  topicSummaries,
  featuredTopicId,
  featuredReason,
} from "@/data/topicIndex";
import type { Topic } from "@/lib/schemas/topic";

interface FeaturedTopicHeroProps {
  onTopicSelect: (id: string) => void;
}

// Extract the best evidence item for a given side across all pillars
function getBestEvidence(
  topic: Topic,
  side: "for" | "against"
): { title: string; source: string; score: number } | null {
  let best: { title: string; source: string; score: number } | null = null;
  for (const pillar of topic.pillars) {
    for (const ev of pillar.evidence ?? []) {
      if (ev.side !== side) continue;
      const score =
        (ev.weight?.sourceReliability ?? 0) +
        (ev.weight?.independence ?? 0) +
        (ev.weight?.replicability ?? 0) +
        (ev.weight?.directness ?? 0);
      if (!best || score > best.score) {
        best = { title: ev.title, source: ev.source ?? "Unknown", score };
      }
    }
  }
  return best;
}

export function FeaturedTopicHero({ onTopicSelect }: FeaturedTopicHeroProps) {
  const [topic, setTopic] = useState<Topic | null>(null);

  // Get lightweight summary (available immediately)
  const summary = topicSummaries.find((t) => t.id === featuredTopicId);

  // Dynamically import full topic data (~5KB for one topic)
  useEffect(() => {
    let cancelled = false;
    import("@/data/topics").then((mod) => {
      if (cancelled) return;
      const topics: Topic[] = mod.topics;
      const found = topics.find((t: Topic) => t.id === featuredTopicId);
      if (found) setTopic(found);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!summary) return null;

  const score = summary.confidence_score;
  const crux = topic?.pillars?.[0]?.crux;
  const forEvidence = topic ? getBestEvidence(topic, "for") : null;
  const againstEvidence = topic ? getBestEvidence(topic, "against") : null;

  return (
    <div className="flex flex-col items-center px-4 md:px-8 pt-8 pb-8 bg-gradient-to-b from-[#f4f1eb] to-stone-50 dark:from-[#1a1917] dark:to-[#201f1c]">
      <div className="w-full max-w-2xl space-y-6">
        {/* Title */}
        <div className="text-center space-y-3">
          <p className="text-xs font-medium text-deep/70 tracking-widest uppercase">
            Featured Analysis
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary leading-[1.08]">
            {summary.title}
          </h1>
          {featuredReason && (
            <p className="font-serif text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
              {featuredReason}
            </p>
          )}
        </div>

        {/* Confidence Score */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full max-w-xs bg-stone-200 dark:bg-[#302e2a] rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-deep transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-deep tabular-nums">
              {score}%
            </span>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              confidence
            </span>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 text-center max-w-md">
            {summary.meta_claim}
          </p>
        </div>

        {/* Crux */}
        {crux && (
          <div className="bg-[#faf5f0] dark:bg-[#1e1d1a] border-l-4 border-[#a23b3b] rounded-r-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Crosshair className="h-4 w-4 text-[#a23b3b]" />
              <span className="text-xs font-semibold text-[#a23b3b] tracking-wide uppercase">
                The Crux
              </span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-primary mb-1.5">
              {crux.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {crux.description}
            </p>
          </div>
        )}

        {/* Evidence Cards */}
        {(forEvidence || againstEvidence) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {forEvidence && (
              <div className="bg-white dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] rounded-xl p-4">
                <span className="text-xs font-semibold text-deep tracking-wide uppercase">
                  Strongest For
                </span>
                <p className="mt-2 text-sm font-medium text-primary leading-snug">
                  {forEvidence.title}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-stone-100 dark:bg-[#302e2a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-deep"
                      style={{ width: `${(forEvidence.score / 40) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-stone-400 tabular-nums">
                    {forEvidence.score}/40
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-stone-400">{forEvidence.source}</p>
              </div>
            )}
            {againstEvidence && (
              <div className="bg-white dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] rounded-xl p-4">
                <span className="text-xs font-semibold text-rust-600 dark:text-rust-400 tracking-wide uppercase">
                  Strongest Against
                </span>
                <p className="mt-2 text-sm font-medium text-primary leading-snug">
                  {againstEvidence.title}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-stone-100 dark:bg-[#302e2a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-rust-500"
                      style={{
                        width: `${(againstEvidence.score / 40) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-stone-400 tabular-nums">
                    {againstEvidence.score}/40
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-stone-400">
                  {againstEvidence.source}
                </p>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={() => onTopicSelect(featuredTopicId)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-serif font-semibold text-sm bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700 hover:scale-[1.03] hover:-translate-y-px active:scale-[0.97] transition-all duration-200"
          >
            See the full analysis
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
