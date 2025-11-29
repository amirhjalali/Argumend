"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData } from "@/types/graph";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { Plus, Sparkles } from "lucide-react";

export function MetaNode({ id, data }: NodeProps<LogicNodeData>) {
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const expandNode = useLogicGraph((state) => state.expandNode);

  if (data.variant !== "meta") {
    return null;
  }

  return (
    <div className="relative w-[360px] rounded-3xl border border-accent-truth/40 bg-void/85 p-6 shadow-glow-truth backdrop-blur-xl">
      <Handle
        type="source"
        position={Position.Bottom}
        className="logic-handle"
        isConnectable={false}
      />
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-truth/40 via-transparent to-accent-purple/30 opacity-70 blur-3xl" />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/5 p-3 text-accent-truth ring-1 ring-white/10">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-secondary">
              Meta Claim
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              {data.title}
            </h2>
          </div>
        </div>

        {data.content && (
          <p className="text-sm text-secondary leading-relaxed">
            {data.content}
          </p>
        )}

        {typeof data.score === "number" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-secondary">
              Confidence
            </p>
            <p className="text-4xl font-bold text-accent-truth">
              {data.score.toFixed(1)}%
            </p>
          </div>
        )}

        <button
          className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-accent-crux/40 bg-accent-crux/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-crux transition hover:bg-accent-crux/20 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => expandNode(id)}
          disabled={expanded}
        >
          {expanded ? "Constellation Online" : "Deploy Pillars"}
          <Plus className="h-4 w-4 transition group-hover:rotate-90" />
        </button>
      </div>
    </div>
  );
}
