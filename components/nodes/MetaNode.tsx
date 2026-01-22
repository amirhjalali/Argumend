"use client";

import { InteractiveContent } from "@/components/InteractiveContent";
import { CitationCard } from "@/components/CitationCard";
import { ConfidenceGauge } from "@/components/ConfidenceGauge";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { ChevronRight, Crown, FileText } from "lucide-react";

export function MetaNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const expandNode = useLogicGraph((state) => state.expandNode);

  if (data.variant !== "meta") {
    return null;
  }

  return (
    <div className="relative w-[420px] rounded-2xl border-2 border-[#2563eb]/30 bg-white shadow-[0_4px_20px_-4px_rgba(37,99,235,0.1),0_12px_40px_-8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-[#2563eb]/50 hover:shadow-[0_8px_30px_-6px_rgba(37,99,235,0.18),0_20px_50px_-10px_rgba(0,0,0,0.1)]">
      {/* Distinct top accent line - blue for Meta Claim */}
      <div className="absolute top-0 left-4 right-4 h-[3px] bg-gradient-to-r from-transparent via-[#2563eb] to-transparent rounded-full" />

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="logic-handle"
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="logic-handle"
        isConnectable={false}
      />

      {data.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      )}

      <div className="space-y-5 p-7">
        {/* Header: Meta Claim Label & Title */}
        <div className="mb-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#2563eb]/15 to-[#3b82f6]/10">
              <Crown className="h-4 w-4 text-[#2563eb]" strokeWidth={1.5} />
            </div>
            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-[#1d4ed8]">
              Meta Claim
            </p>
          </div>
          <h2 className="text-2xl font-serif font-normal leading-snug text-primary tracking-tight">
            {data.title}
          </h2>
        </div>

        {/* Content */}
        {data.content && (
          <div className="text-base font-sans leading-relaxed text-secondary">
            <InteractiveContent
              content={data.content}
              concepts={data.concepts}
              nodeId={id}
            />
          </div>
        )}

        {/* Evidence Sources - promoted to first-class element */}
        {data.references && data.references.length > 0 && (
          <div className="-mx-7 -mb-7 mt-5 px-7 py-5 bg-gradient-to-b from-stone-50/80 to-stone-100/60 border-t border-stone-200 rounded-b-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#CF7B3E]/15">
                  <FileText className="h-3.5 w-3.5 text-[#CF7B3E]" strokeWidth={2} />
                </div>
                <span className="text-[13px] font-sans font-bold text-stone-700">
                  Evidence
                </span>
              </div>
              <span className="flex items-center justify-center min-w-[24px] h-6 rounded-full bg-[#CF7B3E]/15 px-2 text-[12px] font-bold text-[#CF7B3E] tabular-nums">
                {data.references.length}
              </span>
            </div>
            <ul className="space-y-2.5">
              {data.references.map((ref, i) => (
                <li key={i}>
                  <CitationCard reference={ref} index={i + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: Score & Action */}
        <div className="flex items-center justify-between border-t border-stone-200 pt-5">
          {typeof data.score === "number" && (
            <ConfidenceGauge score={data.score} size={100} />
          )}

          {data.hasChildren ? (
            <button
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#2563eb]/25 transition-all hover:shadow-lg hover:shadow-[#2563eb]/35 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              onClick={() => expandNode(id)}
              disabled={expanded}
            >
              {expanded ? "Expanded" : "Explore"}
              {expanded ? null : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-stone-200 px-5 py-2.5 text-sm font-semibold text-stone-400 cursor-default">
              Terminus
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
