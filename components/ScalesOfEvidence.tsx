"use client";

import { motion } from "framer-motion";
import { Scale, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useMemo } from "react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";
import type { Evidence, EvidenceWeight, Topic, Pillar } from "@/types/logic";
import { calculateEvidenceScore, getVerdictLabel } from "@/types/logic";

interface EvidenceCardProps {
  evidence: Evidence;
  index: number;
}

function WeightBar({
  label,
  value,
  max = 10,
  tone = "for",
}: {
  label: string;
  value: number;
  max?: number;
  tone?: "for" | "against";
}) {
  const percentage = (value / max) * 100;
  const barColor = tone === "for"
    ? "bg-gradient-to-r from-deep to-deep-dark"
    : "bg-gradient-to-r from-stone-400 to-stone-500";
  const textColor = tone === "for" ? "text-deep" : "text-stone-600";

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-28 text-stone-500 font-medium">{label}</span>
      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className={`h-full ${barColor} rounded-full`}
        />
      </div>
      <span className={`w-6 text-right font-mono font-semibold ${textColor}`}>{value}</span>
    </div>
  );
}

function EvidenceCard({ evidence, index }: EvidenceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalScore = calculateEvidenceScore(evidence.weight);
  const isFor = evidence.side === "for";

  const cardStyles = isFor
    ? "border-l-deep bg-gradient-to-r from-deep/10 to-panel/80 hover:from-deep/15 hover:to-panel/90"
    : "border-l-stone-400 bg-gradient-to-r from-stone-50/70 to-panel/80 hover:from-stone-50 hover:to-panel/90";

  const scoreStyles = isFor
    ? "text-deep bg-deep/10"
    : "text-stone-600 bg-stone-100/80";

  return (
    <motion.div
      initial={{ opacity: 0, x: isFor ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={`rounded-xl border border-stone-200/80 border-l-4 ${cardStyles} overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 md:p-5 text-left transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-semibold text-primary text-base leading-snug">
              {evidence.title}
            </h4>
            <p className="text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed">
              {evidence.description}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={`px-3 py-1.5 rounded-lg ${scoreStyles}`}>
              <span className="text-xl font-bold font-mono">{totalScore}</span>
              <span className="text-xs opacity-60 ml-0.5">/40</span>
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
          className="px-3 md:px-5 pb-3 md:pb-5 space-y-4 border-t border-stone-200/50"
        >
          <div className="pt-4 space-y-3">
            <WeightBar label="Source Reliability" value={evidence.weight.sourceReliability} tone={isFor ? "for" : "against"} />
            <WeightBar label="Independence" value={evidence.weight.independence} tone={isFor ? "for" : "against"} />
            <WeightBar label="Replicability" value={evidence.weight.replicability} tone={isFor ? "for" : "against"} />
            <WeightBar label="Directness" value={evidence.weight.directness} tone={isFor ? "for" : "against"} />
          </div>

          {evidence.reasoning && (
            <div className="surface-paper p-3">
              <p className="text-sm text-stone-600 italic leading-relaxed">
                {evidence.reasoning}
              </p>
            </div>
          )}

          {evidence.sourceUrl && (
            <a
              href={evidence.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-deep hover:text-deep-dark transition-colors font-medium"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {evidence.source || "View source"}
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function BalanceMeter({ forWeight, againstWeight }: {
  forWeight: number;
  againstWeight: number;
}) {
  const total = forWeight + againstWeight;
  const forPercent = total > 0 ? Math.round((forWeight / total) * 100) : 50;
  const againstPercent = 100 - forPercent;
  const tiltDeg = ((forPercent - 50) / 50) * -10;

  return (
    <div className="surface-card p-4 md:p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-stone-400">
          <Scale className="h-3.5 w-3.5 text-deep" />
          <span>Balance</span>
        </div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-stone-400">
          Scales of Evidence
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-stone-400">For</span>
          <span className="font-mono text-xl md:text-3xl font-bold text-deep">{forWeight}</span>
          <span className="text-xs text-stone-400">pts</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Balance</span>
          <div className="w-[140px] md:w-[180px]">
          <svg width="100%" height="70" viewBox="0 0 180 70" className="text-stone-400">
            <line x1="90" y1="24" x2="90" y2="58" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="58" x2="110" y2="58" stroke="currentColor" strokeWidth="2" />
            <g transform={`rotate(${tiltDeg} 90 24)`}>
              <line x1="30" y1="24" x2="150" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="30" cy="24" r="4" fill="#4f7b77" />
              <circle cx="150" cy="24" r="4" fill="#78716c" />
              <line x1="30" y1="24" x2="30" y2="40" stroke="#4f7b77" strokeWidth="2" />
              <line x1="150" y1="24" x2="150" y2="40" stroke="#78716c" strokeWidth="2" />
              <line x1="20" y1="40" x2="40" y2="40" stroke="#4f7b77" strokeWidth="2" />
              <line x1="140" y1="40" x2="160" y2="40" stroke="#78716c" strokeWidth="2" />
            </g>
            <circle cx="90" cy="24" r="6" fill="#fefcf9" stroke="#78716c" strokeWidth="2" />
          </svg>
          </div>
        </div>

        <div className="flex items-baseline justify-end gap-3">
          <span className="text-xs text-stone-400">pts</span>
          <span className="font-mono text-xl md:text-3xl font-bold text-stone-600">{againstWeight}</span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-stone-400">Against</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2.5 rounded-full bg-stone-200 overflow-hidden flex max-w-3xl mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${forPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-deep to-deep-dark"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${againstPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-stone-400 to-stone-500"
          />
        </div>

        <div className="relative mt-2 h-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ left: "50%" }}
            animate={{ left: `${forPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-0 h-4 w-px bg-stone-500"
            style={{ transform: "translateX(-50%)" }}
          />
        </div>

        <div className="mt-1 flex items-center justify-between text-xs text-stone-400 max-w-3xl mx-auto">
          <span className="font-medium">FOR {forPercent}%</span>
          <span className="font-medium">AGAINST {againstPercent}%</span>
        </div>
      </div>
    </div>
  );
}

function VerdictDisplay({ confidence, forWeight, againstWeight }: {
  confidence: number;
  forWeight: number;
  againstWeight: number;
}) {
  const verdictLabel = getVerdictLabel(confidence);
  const total = forWeight + againstWeight;
  const forPercent = total > 0 ? Math.round((forWeight / total) * 100) : 50;

  const verdictStyles = confidence >= 80
    ? { border: "border-score-high/40", text: "text-score-high", badge: "bg-score-high" }
    : confidence >= 55
    ? { border: "border-score-mid/40", text: "text-score-mid", badge: "bg-score-mid" }
    : { border: "border-score-low/40", text: "text-score-low", badge: "bg-score-low" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`rounded-2xl border ${verdictStyles.border} bg-panel/85 p-4 md:p-6 shadow-card`}
    >
      <div className="text-center space-y-4">
        {/* Verdict Label */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 mb-2">
            The Verdict
          </div>
          <div className={`font-serif text-2xl font-bold ${verdictStyles.text}`}>
            {verdictLabel}
          </div>
        </div>

        {/* Visual Weight Bar */}
        <div className="max-w-md mx-auto">
          <div className="h-3 rounded-full bg-stone-200 overflow-hidden shadow-inner flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${forPercent}%` }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-deep to-deep-dark"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${100 - forPercent}%` }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-stone-400 to-stone-500"
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-deep to-deep-dark" />
            <span className="font-mono">
              <span className="text-deep font-bold text-lg">{forWeight}</span>
              <span className="text-stone-500 ml-1">FOR</span>
            </span>
          </div>

          <div className="w-px h-6 bg-stone-300" />

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-stone-400 to-stone-500" />
            <span className="font-mono">
              <span className="text-stone-600 font-bold text-lg">{againstWeight}</span>
              <span className="text-stone-500 ml-1">AGAINST</span>
            </span>
          </div>

          <div className="w-px h-6 bg-stone-300" />

          <div className={`px-3 py-1 rounded-full ${verdictStyles.badge} text-white font-mono font-bold`}>
            {confidence}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Generate evidence from pillars if not explicitly defined
function generateEvidenceFromTopic(topic: Topic): Evidence[] {
  const evidence: Evidence[] = [];

  // Use explicit topic-level evidence if available
  if (topic.evidence && topic.evidence.length > 0) {
    return [...topic.evidence];
  }

  // Otherwise, generate from pillars
  topic.pillars.forEach((pillar, pillarIndex) => {
    // Use explicit pillar evidence if available
    if (pillar.evidence && pillar.evidence.length > 0) {
      evidence.push(...pillar.evidence);
      return;
    }

    // Generate evidence from proponent rebuttal (FOR)
    evidence.push({
      id: `${pillar.id}-for`,
      title: pillar.title,
      description: pillar.proponent_rebuttal.slice(0, 200) + (pillar.proponent_rebuttal.length > 200 ? "..." : ""),
      side: "for",
      weight: {
        sourceReliability: pillar.crux.verification_status === "verified" ? 9 : 6,
        independence: 8,
        replicability: pillar.crux.verification_status === "verified" ? 9 : 5,
        directness: 8,
      },
      reasoning: `Based on ${pillar.crux.title}: ${pillar.crux.verification_status}`,
    });

    // Generate evidence from skeptic premise (AGAINST)
    evidence.push({
      id: `${pillar.id}-against`,
      title: `Skeptic: ${pillar.title}`,
      description: pillar.skeptic_premise.slice(0, 200) + (pillar.skeptic_premise.length > 200 ? "..." : ""),
      side: "against",
      weight: {
        sourceReliability: 4,
        independence: 5,
        replicability: 3,
        directness: 5,
      },
      reasoning: "Steel-manned skeptic position for fair consideration",
    });
  });

  return evidence;
}

export function ScalesOfEvidence() {
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const topic = topics.find((t) => t.id === currentTopicId);

  const allEvidence = useMemo(() => {
    if (!topic) return [];
    return generateEvidenceFromTopic(topic);
  }, [topic]);

  const forEvidence = allEvidence.filter((e) => e.side === "for");
  const againstEvidence = allEvidence.filter((e) => e.side === "against");

  const forWeight = forEvidence.reduce((sum, e) => sum + calculateEvidenceScore(e.weight), 0);
  const againstWeight = againstEvidence.reduce((sum, e) => sum + calculateEvidenceScore(e.weight), 0);

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-500 gap-4">
        <Scale className="h-16 w-16 opacity-30" />
        <p className="font-serif text-lg">Select a topic to weigh the evidence</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 md:py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider">
            <Scale className="h-3.5 w-3.5" />
            Scales of Evidence
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08] max-w-3xl mx-auto">
            {topic.meta_claim}
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Weigh the evidence on both sides. Each piece is scored on reliability, independence, replicability, and directness.
          </p>
        </motion.div>

        {/* Scale Visualization */}
        <BalanceMeter
          forWeight={forWeight}
          againstWeight={againstWeight}
        />

        {/* Two Columns */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* FOR Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-deep/60">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-deep to-deep-dark shadow-md" />
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                Evidence FOR
              </h2>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-deep">{forEvidence.length} items</span>
                <span className="px-3 py-1 rounded-full bg-deep/10 text-deep font-mono font-bold text-sm">
                  {forWeight} pts
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {forEvidence.map((evidence, index) => (
                <EvidenceCard key={evidence.id} evidence={evidence} index={index} />
              ))}
              {forEvidence.length === 0 && (
                <div className="text-center py-12 text-stone-400">
                  <Scale className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p className="font-serif italic">No evidence presented for this position</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* AGAINST Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-stone-300">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-stone-400 to-stone-500 shadow-md" />
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                Evidence AGAINST
              </h2>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-stone-500">{againstEvidence.length} items</span>
                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-mono font-bold text-sm">
                  {againstWeight} pts
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {againstEvidence.map((evidence, index) => (
                <EvidenceCard key={evidence.id} evidence={evidence} index={index} />
              ))}
              {againstEvidence.length === 0 && (
                <div className="text-center py-12 text-stone-400">
                  <Scale className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p className="font-serif italic">No evidence presented against this position</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Verdict */}
        <VerdictDisplay
          confidence={topic.confidence_score}
          forWeight={forWeight}
          againstWeight={againstWeight}
        />

        {/* Footer note */}
        <p className="text-center text-xs text-stone-400 pb-8">
          Evidence scores are calculated from Source Reliability, Independence, Replicability, and Directness (each 0-10).
        </p>
      </div>
    </div>
  );
}
