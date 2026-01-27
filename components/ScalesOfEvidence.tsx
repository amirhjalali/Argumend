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

function WeightBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  const percentage = (value / max) * 100;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-24 text-stone-500 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full bg-amber-600 rounded-full"
        />
      </div>
      <span className="w-6 text-right font-mono text-stone-600">{value}</span>
    </div>
  );
}

function EvidenceCard({ evidence, index }: EvidenceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalScore = calculateEvidenceScore(evidence.weight);
  const sideColor = evidence.side === "for" ? "border-l-amber-600" : "border-l-stone-500";
  const sideBg = evidence.side === "for" ? "bg-amber-50/50" : "bg-stone-50/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`rounded-lg border border-stone-200 ${sideBg} border-l-4 ${sideColor} overflow-hidden`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left hover:bg-white/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-semibold text-primary text-sm leading-tight">
              {evidence.title}
            </h4>
            <p className="text-xs text-stone-600 mt-1 line-clamp-2">
              {evidence.description}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-lg font-bold font-mono text-amber-700">
              {totalScore}
            </span>
            <span className="text-xs text-stone-400">/40</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-stone-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-stone-400" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4 space-y-3 border-t border-stone-100"
        >
          <div className="pt-3 space-y-2">
            <WeightBar label="Source Reliability" value={evidence.weight.sourceReliability} />
            <WeightBar label="Independence" value={evidence.weight.independence} />
            <WeightBar label="Replicability" value={evidence.weight.replicability} />
            <WeightBar label="Directness" value={evidence.weight.directness} />
          </div>

          {evidence.reasoning && (
            <p className="text-xs text-stone-500 italic border-t border-stone-100 pt-3">
              {evidence.reasoning}
            </p>
          )}

          {evidence.sourceUrl && (
            <a
              href={evidence.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              {evidence.source || "View source"}
              <ExternalLink className="h-3 w-3" />
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
  const tiltAngle = (forRatio - 0.5) * 30; // Max 15 degrees tilt

  return (
    <div className="flex flex-col items-center py-8">
      {/* Scale beam */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: tiltAngle }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-64 h-1 bg-stone-400 rounded-full origin-center"
        style={{ transformOrigin: "center" }}
      >
        {/* Fulcrum */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-stone-400" />
        </div>

        {/* Left pan (FOR) */}
        <motion.div
          className="absolute -left-4 -top-8 flex flex-col items-center"
          animate={{ y: -tiltAngle * 2 }}
        >
          <div className="w-20 h-1 bg-amber-600 rounded" />
          <div className="w-16 h-12 bg-amber-100 border-2 border-amber-600 rounded-b-lg flex items-center justify-center">
            <span className="text-xs font-bold text-amber-700">{forWeight}</span>
          </div>
        </motion.div>

        {/* Right pan (AGAINST) */}
        <motion.div
          className="absolute -right-4 -top-8 flex flex-col items-center"
          animate={{ y: tiltAngle * 2 }}
        >
          <div className="w-20 h-1 bg-stone-500 rounded" />
          <div className="w-16 h-12 bg-stone-100 border-2 border-stone-500 rounded-b-lg flex items-center justify-center">
            <span className="text-xs font-bold text-stone-600">{againstWeight}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scale icon */}
      <div className="mt-8">
        <Scale className="h-8 w-8 text-stone-400" />
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
  const verdictColor = confidence >= 95 ? "text-green-700 bg-green-50 border-green-200"
    : confidence >= 75 ? "text-amber-700 bg-amber-50 border-amber-200"
    : confidence >= 50 ? "text-orange-700 bg-orange-50 border-orange-200"
    : "text-stone-700 bg-stone-50 border-stone-200";

  return (
    <div className={`rounded-lg border-2 p-4 ${verdictColor}`}>
      <div className="text-center">
        <div className="text-xs font-medium uppercase tracking-wide opacity-70 mb-1">
          Verdict
        </div>
        <div className="font-serif text-lg font-semibold">
          {verdictLabel}
        </div>
        <div className="mt-2 flex items-center justify-center gap-4 text-sm">
          <span className="font-mono">
            <span className="text-amber-600 font-bold">{forWeight}</span>
            <span className="opacity-60"> FOR</span>
          </span>
          <span className="opacity-40">|</span>
          <span className="font-mono">
            <span className="text-stone-600 font-bold">{againstWeight}</span>
            <span className="opacity-60"> AGAINST</span>
          </span>
          <span className="opacity-40">|</span>
          <span className="font-mono font-bold">{confidence}%</span>
        </div>
      </div>
    </div>
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
      <div className="flex items-center justify-center h-full text-stone-500">
        No topic selected
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-[#fefcf9]">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl font-bold text-primary">
            The Question at Issue
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {topic.meta_claim}
          </p>
        </div>

        {/* Scale Visualization */}
        <ScaleVisualization
          forWeight={forWeight}
          againstWeight={againstWeight}
          confidence={topic.confidence_score}
        />

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* FOR Column */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-amber-600">
              <div className="w-3 h-3 rounded-full bg-amber-600" />
              <h2 className="font-serif text-lg font-semibold text-amber-800">
                FOR (Prosecution)
              </h2>
              <span className="ml-auto text-sm font-mono text-amber-700">
                {forWeight} pts
              </span>
            </div>
            <div className="space-y-3">
              {forEvidence.map((evidence, index) => (
                <EvidenceCard key={evidence.id} evidence={evidence} index={index} />
              ))}
              {forEvidence.length === 0 && (
                <p className="text-sm text-stone-400 italic">No evidence for this position</p>
              )}
            </div>
          </div>

          {/* AGAINST Column */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-stone-500">
              <div className="w-3 h-3 rounded-full bg-stone-500" />
              <h2 className="font-serif text-lg font-semibold text-stone-700">
                AGAINST (Defense)
              </h2>
              <span className="ml-auto text-sm font-mono text-stone-600">
                {againstWeight} pts
              </span>
            </div>
            <div className="space-y-3">
              {againstEvidence.map((evidence, index) => (
                <EvidenceCard key={evidence.id} evidence={evidence} index={index} />
              ))}
              {againstEvidence.length === 0 && (
                <p className="text-sm text-stone-400 italic">No evidence against this position</p>
              )}
            </div>
          </div>
        </div>

        {/* Verdict */}
        <VerdictDisplay
          confidence={topic.confidence_score}
          forWeight={forWeight}
          againstWeight={againstWeight}
        />
      </div>
    </div>
  );
}
