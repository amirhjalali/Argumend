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

function ScaleVisualization({ forWeight, againstWeight }: {
  forWeight: number;
  againstWeight: number;
  confidence?: number;
}) {
  const total = forWeight + againstWeight;
  const forRatio = total > 0 ? forWeight / total : 0.5;

  // Calculate tilt: heavier FOR = left side down = negative angle
  // Use a gentler curve and limit max tilt to 25 degrees
  const deviation = forRatio - 0.5; // -0.5 to 0.5
  const maxTilt = 25; // degrees - keeps pans above the base
  const tiltAngle = -deviation * maxTilt * 2; // Linear scaling, max ±25°

  // SVG dimensions and geometry
  const width = 400;
  const height = 240;
  const centerX = width / 2;
  const pivotY = 60; // Where the beam pivots
  const beamLength = 300; // Total beam length
  const beamHalf = beamLength / 2;
  const chainLength = 70; // Length of chains
  const panWidth = 70;
  const panHeight = 45;

  // Calculate beam end positions based on tilt
  const angleRad = (tiltAngle * Math.PI) / 180;
  const leftEndX = centerX - Math.cos(angleRad) * beamHalf;
  const leftEndY = pivotY + Math.sin(angleRad) * beamHalf;
  const rightEndX = centerX + Math.cos(angleRad) * beamHalf;
  const rightEndY = pivotY - Math.sin(angleRad) * beamHalf;

  // Pan positions (hang straight down from beam ends)
  const leftPanY = leftEndY + chainLength;
  const rightPanY = rightEndY + chainLength;

  return (
    <div className="flex flex-col items-center py-8 select-none">
      <motion.svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          {/* Gradients for metallic look */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4a012" />
            <stop offset="50%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          <linearGradient id="goldLightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#d4a012" />
          </linearGradient>
          <linearGradient id="silverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9ca3af" />
            <stop offset="50%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#4b5563" />
          </linearGradient>
          <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="panGoldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
          <linearGradient id="panSilverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
          {/* Drop shadow */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Base/Pedestal */}
        <g filter="url(#shadow)">
          {/* Base platform */}
          <rect x={centerX - 40} y={height - 20} width={80} height={12} rx={3} fill="url(#pillarGradient)" />
          <rect x={centerX - 30} y={height - 28} width={60} height={10} rx={2} fill="url(#pillarGradient)" />
          {/* Pillar */}
          <rect x={centerX - 6} y={pivotY + 10} width={12} height={height - pivotY - 38} rx={2} fill="url(#pillarGradient)" />
        </g>

        {/* Beam assembly - animated rotation */}
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: tiltAngle }}
          transition={{ type: "spring", stiffness: 40, damping: 15, mass: 1 }}
          style={{ originX: `${centerX}px`, originY: `${pivotY}px` }}
        >
          {/* Beam */}
          <rect
            x={centerX - beamHalf}
            y={pivotY - 4}
            width={beamLength}
            height={8}
            rx={4}
            fill="url(#goldGradient)"
            filter="url(#shadow)"
          />
          {/* End caps */}
          <circle cx={centerX - beamHalf} cy={pivotY} r={8} fill="url(#goldLightGradient)" />
          <circle cx={centerX + beamHalf} cy={pivotY} r={8} fill="url(#goldLightGradient)" />
          {/* Center pivot ornament */}
          <circle cx={centerX} cy={pivotY} r={12} fill="url(#goldLightGradient)" filter="url(#shadow)" />
          <circle cx={centerX} cy={pivotY} r={6} fill="url(#goldGradient)" />
        </motion.g>

        {/* Left chain and pan (FOR) - counter-rotates to stay level */}
        <motion.g
          initial={{ x: 0, y: 0 }}
          animate={{
            x: leftEndX - (centerX - beamHalf),
            y: leftEndY - pivotY,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 15, mass: 1 }}
        >
          {/* Chain */}
          <line
            x1={centerX - beamHalf}
            y1={pivotY + 8}
            x2={centerX - beamHalf}
            y2={pivotY + 8 + chainLength}
            stroke="url(#goldGradient)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* Chain links decoration */}
          <circle cx={centerX - beamHalf} cy={pivotY + 25} r={4} fill="none" stroke="#b8860b" strokeWidth={2} />
          <circle cx={centerX - beamHalf} cy={pivotY + 45} r={4} fill="none" stroke="#b8860b" strokeWidth={2} />

          {/* Pan - stays level (no rotation) */}
          <g filter="url(#shadow)">
            {/* Pan rim */}
            <ellipse
              cx={centerX - beamHalf}
              cy={pivotY + chainLength + 8}
              rx={panWidth / 2}
              ry={6}
              fill="url(#goldGradient)"
            />
            {/* Pan bowl */}
            <path
              d={`M ${centerX - beamHalf - panWidth / 2} ${pivotY + chainLength + 8}
                  Q ${centerX - beamHalf - panWidth / 2} ${pivotY + chainLength + panHeight}
                    ${centerX - beamHalf} ${pivotY + chainLength + panHeight}
                  Q ${centerX - beamHalf + panWidth / 2} ${pivotY + chainLength + panHeight}
                    ${centerX - beamHalf + panWidth / 2} ${pivotY + chainLength + 8}`}
              fill="url(#panGoldGradient)"
              stroke="#d4a012"
              strokeWidth={2}
            />
          </g>
          {/* Weight number */}
          <text
            x={centerX - beamHalf}
            y={pivotY + chainLength + panHeight - 12}
            textAnchor="middle"
            className="fill-amber-700 font-mono font-bold text-lg"
            style={{ fontSize: "18px" }}
          >
            {forWeight}
          </text>
        </motion.g>

        {/* Right chain and pan (AGAINST) - counter-rotates to stay level */}
        <motion.g
          initial={{ x: 0, y: 0 }}
          animate={{
            x: rightEndX - (centerX + beamHalf),
            y: rightEndY - pivotY,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 15, mass: 1 }}
        >
          {/* Chain */}
          <line
            x1={centerX + beamHalf}
            y1={pivotY + 8}
            x2={centerX + beamHalf}
            y2={pivotY + 8 + chainLength}
            stroke="url(#silverGradient)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* Chain links decoration */}
          <circle cx={centerX + beamHalf} cy={pivotY + 25} r={4} fill="none" stroke="#6b7280" strokeWidth={2} />
          <circle cx={centerX + beamHalf} cy={pivotY + 45} r={4} fill="none" stroke="#6b7280" strokeWidth={2} />

          {/* Pan - stays level (no rotation) */}
          <g filter="url(#shadow)">
            {/* Pan rim */}
            <ellipse
              cx={centerX + beamHalf}
              cy={pivotY + chainLength + 8}
              rx={panWidth / 2}
              ry={6}
              fill="url(#silverGradient)"
            />
            {/* Pan bowl */}
            <path
              d={`M ${centerX + beamHalf - panWidth / 2} ${pivotY + chainLength + 8}
                  Q ${centerX + beamHalf - panWidth / 2} ${pivotY + chainLength + panHeight}
                    ${centerX + beamHalf} ${pivotY + chainLength + panHeight}
                  Q ${centerX + beamHalf + panWidth / 2} ${pivotY + chainLength + panHeight}
                    ${centerX + beamHalf + panWidth / 2} ${pivotY + chainLength + 8}`}
              fill="url(#panSilverGradient)"
              stroke="#9ca3af"
              strokeWidth={2}
            />
          </g>
          {/* Weight number */}
          <text
            x={centerX + beamHalf}
            y={pivotY + chainLength + panHeight - 12}
            textAnchor="middle"
            className="fill-stone-600 font-mono font-bold text-lg"
            style={{ fontSize: "18px" }}
          >
            {againstWeight}
          </text>
        </motion.g>
      </motion.svg>

      {/* Labels below scale */}
      <div className="mt-6 flex items-center justify-center gap-16 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
          <span className="font-serif text-amber-800 font-medium tracking-wide">FOR</span>
        </div>
        <div className="w-px h-4 bg-stone-300" />
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-stone-400 to-stone-500" />
          <span className="font-serif text-stone-600 font-medium tracking-wide">AGAINST</span>
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
