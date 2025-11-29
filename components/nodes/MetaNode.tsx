"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Plus, ChevronRight } from "lucide-react";

export function MetaNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const expandNode = useLogicGraph((state) => state.expandNode);

  if (data.variant !== "meta") {
    return null;
  }

  return (
    <div className="relative w-[360px] bg-paper rounded shadow-lw transition-shadow hover:shadow-lw-hover scale-90 origin-top">
      <Handle
        type="source"
        position={Position.Bottom}
        className="logic-handle"
        isConnectable={false}
      />
      
      <div className="p-6">
        {/* Header: Meta Claim Label & Title */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider text-secondary font-sans font-semibold mb-1">
            Meta Claim
          </p>
          <h2 className="text-3xl font-serif font-normal text-primary leading-tight">
            {data.title}
          </h2>
        </div>

        {/* Content */}
        {data.content && (
          <p className="text-lg text-primary/90 leading-relaxed font-serif mb-6">
            {data.content}
          </p>
        )}

        {/* Footer: Score & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {typeof data.score === "number" && (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-sans font-bold text-accent-main">
                {data.score.toFixed(0)}
              </span>
              <span className="text-xs text-secondary font-sans uppercase tracking-wide">
                Confidence
              </span>
            </div>
          )}

          <button
            className="flex items-center gap-1 text-accent-link hover:text-accent-main transition-colors text-sm font-sans font-semibold uppercase tracking-wide disabled:opacity-50"
            onClick={() => expandNode(id)}
            disabled={expanded}
          >
            {expanded ? "Expanded" : "Read More"}
            {expanded ? null : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
