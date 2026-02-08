"use client";

import { useState } from "react";
import { topics } from "@/data/topics";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { calculateEvidenceScore } from "@/types/logic";
import type { Pillar, Evidence } from "@/types/logic";
import {
  ChevronDown,
  ChevronRight,
  Shield,
  AlertTriangle,
  FlaskConical,
  Scale,
  Swords,
  CheckCircle2,
  HelpCircle,
  XCircle,
} from "lucide-react";

function VerificationBadge({
  status,
}: {
  status: "verified" | "theoretical" | "impossible";
}) {
  const config = {
    verified: {
      icon: CheckCircle2,
      label: "Verified",
      className: "text-emerald-600 bg-emerald-50",
    },
    theoretical: {
      icon: HelpCircle,
      label: "Theoretical",
      className: "text-amber-600 bg-amber-50",
    },
    impossible: {
      icon: XCircle,
      label: "Impossible",
      className: "text-red-500 bg-red-50",
    },
  }[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${config.className}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function EvidenceItem({ evidence }: { evidence: Evidence }) {
  const [expanded, setExpanded] = useState(false);
  const score = calculateEvidenceScore(evidence.weight);
  const isFor = evidence.side === "for";

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left"
    >
      <div
        className={`rounded-lg border px-3 py-2.5 transition-colors ${
          isFor
            ? "border-emerald-200/60 bg-emerald-50/30"
            : "border-rose-200/60 bg-rose-50/30"
        }`}
      >
        <div className="flex items-start gap-2">
          <div
            className={`mt-0.5 flex-shrink-0 h-2 w-2 rounded-full ${
              isFor ? "bg-emerald-500" : "bg-rose-500"
            }`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13px] font-medium text-stone-700 leading-snug">
                {evidence.title}
              </p>
              <span className="flex-shrink-0 text-[11px] font-mono text-stone-400">
                {score}/40
              </span>
            </div>

            {expanded && (
              <div className="mt-2 space-y-2">
                <p className="text-[12px] text-stone-500 leading-relaxed">
                  {evidence.description}
                </p>

                {/* Weight bars */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {(
                    [
                      ["Source", evidence.weight.sourceReliability],
                      ["Independence", evidence.weight.independence],
                      ["Replicability", evidence.weight.replicability],
                      ["Directness", evidence.weight.directness],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <span className="text-[10px] text-stone-400 w-[72px] truncate">
                        {label}
                      </span>
                      <div className="flex-1 h-1.5 bg-stone-200/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isFor ? "bg-emerald-400" : "bg-rose-400"
                          }`}
                          style={{ width: `${value * 10}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono w-3 text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {evidence.source && (
                  <p className="text-[10px] text-stone-400 italic">
                    Source: {evidence.source}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [showCrux, setShowCrux] = useState(false);

  const evidence = pillar.evidence || [];
  const forEvidence = evidence.filter((e) => e.side === "for");
  const againstEvidence = evidence.filter((e) => e.side === "against");

  return (
    <div className="border border-stone-200/60 rounded-xl overflow-hidden bg-white/50">
      {/* Pillar header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-stone-50/50 transition-colors"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-[11px] font-medium text-stone-500 flex-shrink-0">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-stone-800 leading-snug">
            {pillar.title}
          </p>
          <p className="text-[12px] text-stone-400 mt-0.5 line-clamp-1">
            {pillar.short_summary}
          </p>
        </div>
        {expanded ? (
          <ChevronDown className="h-4 w-4 text-stone-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-stone-400 flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Arguments */}
          <div className="grid gap-3">
            {/* Proponent view */}
            <div className="rounded-lg bg-emerald-50/40 border border-emerald-100/60 p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[11px] font-medium text-emerald-700 uppercase tracking-wide">
                  Proponent
                </span>
              </div>
              <p className="text-[13px] text-stone-600 leading-relaxed">
                {pillar.proponent_rebuttal}
              </p>
            </div>

            {/* Skeptic view */}
            <div className="rounded-lg bg-rose-50/40 border border-rose-100/60 p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                <span className="text-[11px] font-medium text-rose-600 uppercase tracking-wide">
                  Skeptic
                </span>
              </div>
              <p className="text-[13px] text-stone-600 leading-relaxed">
                {pillar.skeptic_premise}
              </p>
            </div>
          </div>

          {/* Evidence */}
          {evidence.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide">
                Evidence ({forEvidence.length} for, {againstEvidence.length}{" "}
                against)
              </p>
              <div className="space-y-1.5">
                {evidence.map((e) => (
                  <EvidenceItem key={e.id} evidence={e} />
                ))}
              </div>
            </div>
          )}

          {/* Crux */}
          <div>
            <button
              onClick={() => setShowCrux(!showCrux)}
              className="flex items-center gap-1.5 text-[12px] text-amber-700 font-medium hover:text-amber-800 transition-colors"
            >
              <FlaskConical className="h-3.5 w-3.5" />
              Decisive Test: {pillar.crux.title}
              {showCrux ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>

            {showCrux && (
              <div className="mt-2 rounded-lg bg-amber-50/50 border border-amber-100/60 p-3 space-y-2">
                <p className="text-[12px] text-stone-600 leading-relaxed">
                  {pillar.crux.description}
                </p>
                <div className="flex items-center gap-2">
                  <VerificationBadge
                    status={pillar.crux.verification_status}
                  />
                  <span className="text-[10px] text-stone-400">
                    Cost: {pillar.crux.cost_to_verify}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileArgumentList() {
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setView = useLogicGraph((state) => state.setView);
  const currentView = useLogicGraph((state) => state.currentView);
  const topic = topics.find((t) => t.id === currentTopicId);

  if (!topic) return null;

  const statusColors = {
    settled: "bg-emerald-100 text-emerald-700",
    contested: "bg-amber-100 text-amber-700",
    highly_speculative: "bg-rose-100 text-rose-600",
  };

  return (
    <div className="h-full overflow-y-auto bg-[#faf8f5]">
      <div className="px-4 py-5 space-y-5 max-w-lg mx-auto">
        {/* Topic header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                statusColors[topic.status]
              }`}
            >
              {topic.status.replace("_", " ")}
            </span>
            <span className="text-[12px] font-mono text-stone-400">
              {topic.confidence_score}% confidence
            </span>
          </div>

          <h1 className="font-serif text-xl font-medium text-stone-900 leading-snug">
            {topic.title}
          </h1>

          <p className="text-[13px] text-stone-500 leading-relaxed">
            {topic.meta_claim}
          </p>
        </div>

        {/* View switcher (mobile-optimized) */}
        <div className="flex gap-1 p-1 rounded-lg bg-stone-100/80">
          {(
            [
              { id: "logic-map" as const, label: "Arguments", icon: Scale },
              { id: "scales" as const, label: "Evidence", icon: Scale },
              { id: "debate" as const, label: "Debate", icon: Swords },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-medium transition-colors ${
                currentView === id
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-500"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Pillar list (shown when in logic-map mode, which is the mobile default) */}
        {currentView === "logic-map" && (
          <div className="space-y-3">
            <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide">
              {topic.pillars.length} Key Arguments
            </p>
            {topic.pillars.map((pillar, i) => (
              <PillarSection key={pillar.id} pillar={pillar} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
