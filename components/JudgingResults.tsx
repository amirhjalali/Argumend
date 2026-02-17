"use client";

import { motion } from "framer-motion";
import {
  Gavel,
  Trophy,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Users,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import type { JudgingResult, JudgeVerdict, RubricDimension } from "@/lib/judge/rubric";
import { DEFAULT_RUBRIC } from "@/lib/judge/rubric";
import { getConfidenceInfo } from "@/lib/analyze/extractor";
import { getLLMOption, LLMIconRenderer } from "./icons/LLMIcons";
import type { LLMModel } from "@/types/logic";

interface JudgingResultsProps {
  result: JudgingResult;
  rubric?: RubricDimension[];
}

function WinnerBanner({ result }: { result: JudgingResult }) {
  const { winner, hasConsensus } = result;

  const bannerStyles = {
    for: "from-rust-500 to-rust-600",
    against: "from-stone-500 to-stone-600",
    draw: "from-purple-500 to-purple-600",
    null: "from-gray-400 to-gray-500",
  };

  const winnerLabel = winner === "for"
    ? "Proponent Wins"
    : winner === "against"
    ? "Skeptic Wins"
    : winner === "draw"
    ? "Draw"
    : "No Verdict";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl bg-gradient-to-r ${bannerStyles[winner ?? "null"]} p-4 md:p-6 text-white shadow-lg`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Trophy className="h-8 w-8" />
          <div>
            <h2 className="text-lg md:text-2xl font-serif font-bold">{winnerLabel}</h2>
            <p className="text-sm opacity-90 mt-1">
              {hasConsensus ? (
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Unanimous consensus from all judges
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Split decision - judges disagreed
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-sm opacity-80">Aggregate Scores</div>
          <div className="flex gap-2 md:gap-4 mt-1">
            <div>
              <span className="text-xs opacity-70 truncate">FOR</span>
              <div className="text-lg md:text-xl font-mono font-bold">
                {result.aggregatedScores.for.average.toFixed(1)}
              </div>
            </div>
            <div>
              <span className="text-xs opacity-70 truncate">AGAINST</span>
              <div className="text-lg md:text-xl font-mono font-bold">
                {result.aggregatedScores.against.average.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScoreBar({
  label,
  forScore,
  againstScore,
  weight,
}: {
  label: string;
  forScore: number;
  againstScore: number;
  weight: number;
}) {
  const maxScore = 10;
  const forWidth = (forScore / maxScore) * 50;
  const againstWidth = (againstScore / maxScore) * 50;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-stone-600 font-medium">{label}</span>
        <span className="text-stone-400">{Math.round(weight * 100)}% weight</span>
      </div>
      <div className="flex h-3 md:h-4 rounded-full overflow-hidden bg-stone-100">
        {/* FOR side (left) */}
        <div className="flex-1 flex justify-end">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${forWidth}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-l from-rust-500 to-rust-400 rounded-l-full"
          />
        </div>
        {/* Center divider */}
        <div className="w-px bg-stone-300" />
        {/* AGAINST side (right) */}
        <div className="flex-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${againstWidth}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-stone-500 to-stone-400 rounded-r-full"
          />
        </div>
      </div>
      <div className="flex justify-between text-xs font-mono">
        <span className="text-rust-600 font-semibold">{forScore.toFixed(1)}</span>
        <span className="text-stone-600 font-semibold">{againstScore.toFixed(1)}</span>
      </div>
    </div>
  );
}

function VerdictConfidenceSummary({ result }: { result: JudgingResult }) {
  // Average confidence across all judges for each side
  const avgForConf = result.verdicts.length > 0
    ? result.verdicts.reduce((sum, v) => sum + v.forScore.confidence, 0) / result.verdicts.length
    : 0;
  const avgAgainstConf = result.verdicts.length > 0
    ? result.verdicts.reduce((sum, v) => sum + v.againstScore.confidence, 0) / result.verdicts.length
    : 0;
  const overallConf = (avgForConf + avgAgainstConf) / 2;
  const confInfo = getConfidenceInfo(overallConf);

  // Score difference for verdict strength
  const scoreDiff = Math.abs(result.aggregatedScores.for.average - result.aggregatedScores.against.average);
  const verdictStrength = scoreDiff >= 2 ? "Decisive" : scoreDiff >= 0.8 ? "Close" : "Very Close";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="surface-card p-4 md:p-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-stone-400">Verdict Strength</p>
          <p className="text-lg font-serif font-bold text-primary">{verdictStrength}</p>
          <p className="text-[10px] text-stone-500">{scoreDiff.toFixed(1)} point margin</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-stone-400">Judge Confidence</p>
          <p className="text-lg font-serif font-bold text-primary">{Math.round(overallConf * 100)}%</p>
          <p className="text-[10px] text-stone-500">{confInfo.label}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-stone-400">Agreement</p>
          <p className="text-lg font-serif font-bold text-primary">
            {result.hasConsensus ? "Unanimous" : `${result.verdicts.filter(v => v.winner === result.winner).length}/${result.verdicts.length}`}
          </p>
          <p className="text-[10px] text-stone-500">
            {result.hasConsensus ? "All judges agree" : "Split decision"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function DimensionBreakdown({
  result,
  rubric,
}: {
  result: JudgingResult;
  rubric: RubricDimension[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="surface-card p-4 md:p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-5 w-5 text-deep" />
        <h3 className="font-serif font-semibold text-primary">Score Breakdown by Dimension</h3>
      </div>

      <div className="flex justify-between text-xs md:text-sm uppercase tracking-widest text-stone-400 mb-4 px-1">
        <span className="truncate">FOR</span>
        <span className="truncate">AGAINST</span>
      </div>

      <div className="space-y-5">
        {rubric.map((dim) => (
          <ScoreBar
            key={dim.id}
            label={dim.name}
            forScore={result.aggregatedScores.for.byDimension[dim.id] ?? 0}
            againstScore={result.aggregatedScores.against.byDimension[dim.id] ?? 0}
            weight={dim.weight}
          />
        ))}
      </div>
    </motion.div>
  );
}

function JudgeCard({
  verdict,
  index,
}: {
  verdict: JudgeVerdict;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const llmOption = getLLMOption(verdict.model);

  const winnerLabel = verdict.winner === "for"
    ? "For"
    : verdict.winner === "against"
    ? "Against"
    : "Draw";

  const avgConf = (verdict.forScore.confidence + verdict.againstScore.confidence) / 2;

  const winnerColor = verdict.winner === "for"
    ? "text-rust-600 bg-rust-50"
    : verdict.winner === "against"
    ? "text-stone-600 bg-stone-100"
    : "text-purple-600 bg-purple-50";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="surface-card overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-5 text-left hover:bg-stone-50/50 transition-colors"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: llmOption?.bgLight }}
            >
              <LLMIconRenderer
                modelId={verdict.model}
                className="h-5 w-5"
                style={{ color: llmOption?.color }}
              />
            </div>
            <div>
              <h4 className="font-semibold text-primary">{verdict.judgeName}</h4>
              <p className="text-xs text-stone-500">{llmOption?.fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-medium ${winnerColor}`}>
              {winnerLabel}
            </div>
            <span className={`hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full font-medium ${
              avgConf >= 0.8 ? "bg-emerald-100 text-emerald-700" : avgConf >= 0.5 ? "bg-stone-100 text-stone-600" : "bg-red-100 text-red-600"
            }`}>
              {Math.round(avgConf * 100)}% conf
            </span>
            <div className="flex gap-2 md:gap-3 text-sm">
              <div className="text-center">
                <div className="text-xs text-stone-400 truncate">FOR</div>
                <div className="font-mono font-semibold text-rust-600">
                  {verdict.forScore.totalScore.toFixed(1)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-stone-400 truncate">AGAINST</div>
                <div className="font-mono font-semibold text-stone-600">
                  {verdict.againstScore.totalScore.toFixed(1)}
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-5 w-5 text-stone-400" />
            </motion.div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 md:px-5 pb-4 md:pb-5 border-t border-stone-100"
        >
          <div className="pt-4 space-y-4">
            {/* Overall Reasoning */}
            <div className="surface-paper p-4">
              <h5 className="text-sm font-medium text-stone-700 mb-2">Overall Assessment</h5>
              <p className="text-sm text-stone-600 leading-relaxed">
                {verdict.overallReasoning}
              </p>
            </div>

            {/* For Side Summary */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 p-3 md:p-4 bg-rust-50/50 rounded-lg border border-rust-100">
                <h5 className="text-sm font-medium text-rust-800 mb-2 flex items-center gap-2">
                  <span className="text-xs md:text-sm truncate">FOR Side</span>
                  <span className="text-xs bg-rust-100 text-rust-700 px-2 py-0.5 rounded-full">
                    Confidence: {Math.round(verdict.forScore.confidence * 100)}%
                  </span>
                </h5>
                <p className="text-sm text-rust-900/80 leading-relaxed">
                  {verdict.forScore.summary}
                </p>
              </div>

              <div className="flex-1 p-3 md:p-4 bg-stone-50 rounded-lg border border-stone-200">
                <h5 className="text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                  <span className="text-xs md:text-sm truncate">AGAINST Side</span>
                  <span className="text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full">
                    Confidence: {Math.round(verdict.againstScore.confidence * 100)}%
                  </span>
                </h5>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {verdict.againstScore.summary}
                </p>
              </div>
            </div>

            {/* Dimension Details */}
            <details className="group">
              <summary className="cursor-pointer text-sm text-stone-500 hover:text-stone-700 transition-colors">
                View dimension-by-dimension scores
              </summary>
              <div className="mt-3 space-y-3">
                {verdict.forScore.dimensions.map((dim) => {
                  const againstDim = verdict.againstScore.dimensions.find(
                    (d) => d.dimensionId === dim.dimensionId
                  );
                  return (
                    <div key={dim.dimensionId} className="text-sm border-l-2 border-stone-200 pl-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-stone-700 capitalize">
                          {dim.dimensionId.replace(/-/g, " ")}
                        </span>
                        <div className="flex gap-2 md:gap-4 text-xs font-mono">
                          <span className="text-rust-600 truncate">FOR: {dim.score}</span>
                          <span className="text-stone-600 truncate">AGAINST: {againstDim?.score ?? "—"}</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-2">{dim.reasoning}</p>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function DisagreementWarnings({ disagreements }: { disagreements: JudgingResult["disagreements"] }) {
  if (disagreements.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-5"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-yellow-800">Significant Disagreements Detected</h4>
          <p className="text-sm text-yellow-700 mt-1">
            Judges had substantially different views on the following dimensions:
          </p>
          <ul className="mt-3 space-y-2">
            {disagreements.map((d) => (
              <li key={d.dimensionId} className="text-sm">
                <span className="font-medium text-yellow-800">{d.dimensionName}</span>
                <span className="text-yellow-600"> — {d.spread.toFixed(1)} point spread</span>
                <div className="flex gap-2 mt-1">
                  {d.scores.map((s) => (
                    <span key={s.judgeId} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                      {s.judgeId}: {s.score}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function JudgingResults({ result, rubric = DEFAULT_RUBRIC }: JudgingResultsProps) {
  return (
    <div className="space-y-6">
      {/* Section divider with horizontal rule */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Gavel className="h-4 w-4 text-deep" />
          <h2 className="text-lg font-serif font-semibold text-primary">Judge Council Verdict</h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-stone-200/80 to-transparent" />
        <span className="text-xs text-stone-400 flex-shrink-0">
          {result.verdicts.length} judges
        </span>
      </div>

      {/* Winner Banner */}
      <WinnerBanner result={result} />

      {/* Verdict Confidence Summary */}
      <VerdictConfidenceSummary result={result} />

      {/* Disagreement Warnings */}
      <DisagreementWarnings disagreements={result.disagreements} />

      {/* Review Flag */}
      {result.flaggedForReview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-rust-50 border border-rust-200 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertTriangle className="h-5 w-5 text-rust-600" />
          <p className="text-sm text-rust-800">
            <span className="font-medium">Flagged for manual review:</span> This debate had significant
            disagreements among judges or other factors that warrant human review.
          </p>
        </motion.div>
      )}

      {/* Dimension Breakdown */}
      <DimensionBreakdown result={result} rubric={rubric} />

      {/* Individual Judge Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Users className="h-4 w-4 text-deep" />
            <h3 className="font-serif font-semibold text-primary">Individual Judge Verdicts</h3>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-stone-200/80 to-transparent" />
        </div>
        {result.verdicts.map((verdict, index) => (
          <JudgeCard key={verdict.judgeId} verdict={verdict} index={index} />
        ))}
      </div>
    </div>
  );
}
