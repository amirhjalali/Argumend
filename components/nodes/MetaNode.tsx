"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Plus, Sparkles } from "lucide-react";

export function MetaNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const expandNode = useLogicGraph((state) => state.expandNode);

  if (data.variant !== "meta") {
    return null;
  }

  return (
    <div className="relative w-[320px] rounded-sm border-2 border-accent-logos/10 bg-parchment p-6 shadow-card font-serif scale-90 origin-top">
      <Handle
        type="source"
        position={Position.Bottom}
        className="logic-handle"
        isConnectable={false}
      />
      <div className="absolute top-0 left-0 w-full h-1 bg-accent-logos/80" />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center gap-4 border-b border-accent-logos/10 pb-4">
          <div className="p-2 text-accent-logos">
            <Sparkles className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-logos/60 font-sans font-bold">
              Meta Claim
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-accent-logos">
              {data.title}
            </h2>
          </div>
        </div>

        {data.content && (
          <p className="text-sm text-primary/80 leading-relaxed font-sans">
            {data.content}
          </p>
        )}

        {typeof data.score === "number" && (
          <div className="bg-accent-logos/5 p-4 border border-accent-logos/10 rounded-sm">
            <div className="flex items-baseline justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-logos/60 font-sans font-bold">
                Confidence
              </p>
              <p className="text-3xl font-bold text-accent-logos font-serif">
                {data.score.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        <button
          className="group inline-flex items-center justify-center gap-2 rounded-sm border border-accent-logos text-accent-logos px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent-logos hover:text-parchment transition-all font-sans disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => expandNode(id)}
          disabled={expanded}
        >
          {expanded ? "Logic Deployed" : "Examine Logic"}
          <Plus className="h-4 w-4 transition group-hover:rotate-90" />
        </button>
      </div>
    </div>
  );
}
