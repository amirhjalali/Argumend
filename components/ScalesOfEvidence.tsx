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

function WeightBar({ label, value, max = 10, color = "amber" }: { label: string; value: number; max?: number; color?: "amber" | "stone" }) {
  const percentage = (value / max) * 100;
  const barColor = color === "amber"
    ? "bg-gradient-to-r from-amber-500 to-amber-600"
    : "bg-gradient-to-r from-stone-400 to-stone-500";
  const textColor = color === "amber" ? "text-amber-700" : "text-stone-600";

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
    ? "border-l-amber-500 bg-gradient-to-r from-amber-50/80 to-amber-50/30 hover:from-amber-50 hover:to-amber-50/50"
    : "border-l-stone-400 bg-gradient-to-r from-stone-50/80 to-stone-50/30 hover:from-stone-50 hover:to-stone-50/50";

  const scoreStyles = isFor
    ? "text-amber-700 bg-amber-100/80"
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
        className="w-full p-5 text-left transition-colors"
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
          className="px-5 pb-5 space-y-4 border-t border-stone-200/50"
        >
          <div className="pt-4 space-y-3">
            <WeightBar label="Source Reliability" value={evidence.weight.sourceReliability} color={isFor ? "amber" : "stone"} />
            <WeightBar label="Independence" value={evidence.weight.independence} color={isFor ? "amber" : "stone"} />
            <WeightBar label="Replicability" value={evidence.weight.replicability} color={isFor ? "amber" : "stone"} />
            <WeightBar label="Directness" value={evidence.weight.directness} color={isFor ? "amber" : "stone"} />
          </div>

          {evidence.reasoning && (
            <div className="bg-white/60 rounded-lg p-3 border border-stone-100">
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
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
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

function ScaleVisualization({ forWeight, againstWeight, confidence }: {
  forWeight: number;
  againstWeight: number;
  confidence: number;
}) {
  const total = forWeight + againstWeight;
  const forRatio = total > 0 ? forWeight / total : 0.5;

  // Use exponential curve to make extreme disparities more dramatic
  // deviation from 0.5, scaled exponentially
  const deviation = forRatio - 0.5; // -0.5 to 0.5
  const absDeviation = Math.abs(deviation);
  // Apply power curve: small differences = small tilt, large differences = dramatic tilt
  const curvedDeviation = Math.pow(absDeviation * 2, 1.5) / 2; // Normalize and apply curve
  const signedCurvedDeviation = deviation >= 0 ? curvedDeviation : -curvedDeviation;

  // Max tilt of 40 degrees for overwhelming evidence
  // NEGATIVE because: heavier FOR (positive deviation) should tilt LEFT end DOWN
  // In CSS, negative rotation = counter-clockwise = left end goes down
  const tiltAngle = -signedCurvedDeviation * 80; // Results in -40 to +40 degrees

  // Pan displacement: positive = down, negative = up
  // When FOR is heavier: tiltAngle is negative, so we negate again for left pan to go DOWN
  const panDisplacement = Math.abs(tiltAngle) * 2.5;
  // Left pan goes down when FOR heavier (signedCurvedDeviation > 0)
  const leftPanY = signedCurvedDeviation > 0 ? panDisplacement : -panDisplacement;
  // Right pan does the opposite
  const rightPanY = signedCurvedDeviation > 0 ? -panDisplacement : panDisplacement;

  return (
    <div className="flex flex-col items-center py-16 select-none">
      {/* Ornate frame */}
      <div className="relative" style={{ height: 280 }}>
        {/* Decorative top finial */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
          <div className="w-4 h-4 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 shadow-lg border border-amber-300" />
          <div className="w-1.5 h-6 bg-gradient-to-b from-amber-500 to-amber-700 mx-auto -mt-1 rounded-b" />
        </div>

        {/* Main pillar/stand */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 z-0">
          <div className="w-3 h-40 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-t shadow-xl" />
        </div>

        {/* Scale beam with chains */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: tiltAngle }}
          transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.2 }}
          className="relative z-20"
          style={{ transformOrigin: "center top" }}
        >
          {/* The beam itself - ornate golden bar */}
          <div className="relative w-96 h-3 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-full shadow-xl mx-auto">
            {/* Decorative end caps */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md border border-amber-300" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md border border-amber-300" />
            {/* Center pivot decoration */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 shadow-lg border-2 border-amber-300" />
          </div>

          {/* Left chain and pan (FOR) - heavier goes DOWN */}
          <motion.div
            className="absolute left-0 top-3 flex flex-col items-center"
            animate={{ y: leftPanY }}
            transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.2 }}
          >
            {/* Chain links - longer chain */}
            <div className="flex flex-col items-center">
              <div className="w-1 h-10 bg-gradient-to-b from-amber-600 to-amber-700 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-amber-500 -mt-0.5" />
              <div className="w-1 h-10 bg-gradient-to-b from-amber-700 to-amber-600 rounded-full -mt-0.5" />
            </div>
            {/* Pan - golden bowl style, larger */}
            <div className="relative -mt-1">
              <div className="w-28 h-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full shadow" />
              <div className="w-24 h-14 mx-auto bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 border-3 border-amber-500 rounded-b-full shadow-lg flex items-center justify-center">
                <span className="text-2xl font-bold font-mono text-amber-700">{forWeight}</span>
              </div>
              {/* Inner glow */}
              <div className="absolute inset-x-3 top-2 h-10 bg-gradient-to-b from-amber-200/40 to-transparent rounded-b-full pointer-events-none" />
            </div>
          </motion.div>

          {/* Right chain and pan (AGAINST) - heavier goes DOWN */}
          <motion.div
            className="absolute right-0 top-3 flex flex-col items-center"
            animate={{ y: rightPanY }}
            transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.2 }}
          >
            {/* Chain links - longer chain */}
            <div className="flex flex-col items-center">
              <div className="w-1 h-10 bg-gradient-to-b from-stone-500 to-stone-600 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-stone-400 -mt-0.5" />
              <div className="w-1 h-10 bg-gradient-to-b from-stone-600 to-stone-500 rounded-full -mt-0.5" />
            </div>
            {/* Pan - silver/gray bowl style, larger */}
            <div className="relative -mt-1">
              <div className="w-28 h-1.5 bg-gradient-to-r from-stone-500 via-stone-400 to-stone-500 rounded-full shadow" />
              <div className="w-24 h-14 mx-auto bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 border-3 border-stone-400 rounded-b-full shadow-lg flex items-center justify-center">
                <span className="text-2xl font-bold font-mono text-stone-600">{againstWeight}</span>
              </div>
              {/* Inner glow */}
              <div className="absolute inset-x-3 top-2 h-10 bg-gradient-to-b from-stone-200/40 to-transparent rounded-b-full pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        {/* Base pedestal - larger and lower */}
        <div className="absolute left-1/2 -translate-x-1/2 top-36 flex flex-col items-center">
          <div className="w-8 h-3 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t" />
          <div className="w-14 h-2 bg-gradient-to-b from-amber-800 to-amber-900" />
          <div className="w-20 h-3 bg-gradient-to-b from-amber-800 via-amber-900 to-stone-800 rounded-b-lg shadow-xl" />
        </div>
      </div>

      {/* Labels below scale */}
      <div className="mt-8 flex items-center justify-center gap-20 text-base">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md" />
          <span className="font-serif text-amber-800 font-semibold tracking-wide">FOR</span>
        </div>
        <div className="w-px h-5 bg-stone-300" />
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-stone-400 to-stone-500 shadow-md" />
          <span className="font-serif text-stone-600 font-semibold tracking-wide">AGAINST</span>
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

  const verdictStyles = confidence >= 95
    ? { bg: "from-emerald-50 to-green-50", border: "border-emerald-300", text: "text-emerald-800", accent: "bg-emerald-500" }
    : confidence >= 75
    ? { bg: "from-amber-50 to-yellow-50", border: "border-amber-300", text: "text-amber-800", accent: "bg-amber-500" }
    : confidence >= 50
    ? { bg: "from-orange-50 to-amber-50", border: "border-orange-300", text: "text-orange-800", accent: "bg-orange-500" }
    : { bg: "from-stone-50 to-gray-50", border: "border-stone-300", text: "text-stone-700", accent: "bg-stone-500" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`rounded-2xl border-2 ${verdictStyles.border} bg-gradient-to-br ${verdictStyles.bg} p-6 shadow-lg`}
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
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
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
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
            <span className="font-mono">
              <span className="text-amber-700 font-bold text-lg">{forWeight}</span>
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

          <div className={`px-3 py-1 rounded-full ${verdictStyles.accent} text-white font-mono font-bold`}>
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
    <div className="h-full overflow-auto bg-gradient-to-b from-[#fefcf9] via-[#faf8f4] to-[#f5f2eb]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
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
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary leading-tight max-w-3xl mx-auto">
            {topic.meta_claim}
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Weigh the evidence on both sides. Each piece is scored on reliability, independence, replicability, and directness.
          </p>
        </motion.div>

        {/* Scale Visualization */}
        <ScaleVisualization
          forWeight={forWeight}
          againstWeight={againstWeight}
          confidence={topic.confidence_score}
        />

        {/* Two Columns */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* FOR Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-amber-400">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md" />
              <h2 className="font-serif text-xl font-bold text-amber-800">
                Evidence FOR
              </h2>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-amber-600">{forEvidence.length} items</span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-mono font-bold text-sm">
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
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-stone-400">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-stone-400 to-stone-500 shadow-md" />
              <h2 className="font-serif text-xl font-bold text-stone-700">
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
