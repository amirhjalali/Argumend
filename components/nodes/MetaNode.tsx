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
    <div className="relative w-[420px] rounded-xl border border-stone-200/80 border-t-2 border-t-[#2563eb] bg-[#fefcf9] shadow-[0_2px_6px_rgba(120,100,80,0.1)]">

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
        <div className="h-44 w-full overflow-hidden rounded-t-xl border-b border-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="space-y-4 p-6">
        {/* Header: Meta Claim Label & Title */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-[#2563eb]" strokeWidth={1.8} />
            <p className="text-[11px] font-sans font-medium text-stone-500">
              Meta Claim
            </p>
          </div>
          <h2 className="text-xl font-serif font-normal leading-snug text-primary tracking-tight">
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

        {/* Evidence Sources */}
        {data.references && data.references.length > 0 && (
          <div className="-mx-6 -mb-6 mt-4 px-6 py-4 border-t border-stone-100 rounded-b-xl bg-stone-50/50">
            <div className="mb-2 flex items-center gap-1.5">
              <FileText className="h-3 w-3 text-stone-400" strokeWidth={1.8} />
              <span className="text-[11px] font-medium text-stone-500">
                Sources ({data.references.length})
              </span>
            </div>
            <ul className="space-y-1.5">
              {data.references.map((ref, i) => (
                <li key={i}>
                  <CitationCard reference={ref} index={i + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: Score & Action */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-4">
          {typeof data.score === "number" && (
            <ConfidenceGauge score={data.score} size={100} />
          )}

          {data.hasChildren ? (
            <button
              className="flex items-center gap-1.5 rounded-md bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => expandNode(id)}
              disabled={expanded}
            >
              {expanded ? "Expanded" : "Explore"}
              {expanded ? null : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          ) : (
            <div className="text-sm text-stone-300">
              Leaf
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
