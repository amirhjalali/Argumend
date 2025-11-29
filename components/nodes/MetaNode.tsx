"use client";

import { MetaNodeData, useLogicGraph } from "@/hooks/useLogicGraph";
import { NodeProps } from "@xyflow/react";
import { Sparkles, Plus } from "lucide-react";

export function MetaNode({ id, data }: NodeProps<MetaNodeData>) {
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const expandRoot = useLogicGraph((state) => state.expandRoot);

  return (
    <div className="relative w-[320px] rounded-3xl bg-void/80 p-6 shadow-glow-truth ring-2 ring-accent-truth/40 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-truth/40 via-transparent to-accent-purple/20 opacity-80 blur-3xl" />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/5 p-3 text-accent-truth ring-1 ring-white/10">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">
              Meta Claim
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              {data.label}
            </h2>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-secondary">
            Confidence
          </p>
          <p className="text-4xl font-bold text-accent-truth">
            {data.score.toFixed(1)}%
          </p>
        </div>

        <button
          className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-accent-crux/40 bg-accent-crux/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-crux transition hover:bg-accent-crux/20 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={expandRoot}
          disabled={expanded}
        >
          {expanded ? "ORBITAL MAP ONLINE" : "EXPAND CONSTELLATION"}
          <Plus className="h-4 w-4 transition group-hover:rotate-90" />
        </button>
      </div>
    </div>
  );
}


