"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData, NodeVariant } from "@/types/graph";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { ArrowDownRight, FlaskConical, Layers2 } from "lucide-react";

const VARIANT_TOKENS: Record<
  NodeVariant,
  { border: string; accent: string; label: string }
> = {
  meta: {
    border: "border-accent-truth/50",
    accent: "text-accent-truth",
    label: "Meta",
  },
  pillar: {
    border: "border-white/15",
    accent: "text-white",
    label: "Pillar",
  },
  skeptic: {
    border: "border-accent-doubt/50",
    accent: "text-accent-doubt",
    label: "Skeptic Vector",
  },
  proponent: {
    border: "border-accent-truth/50",
    accent: "text-accent-truth",
    label: "Proponent Vector",
  },
  crux: {
    border: "border-accent-crux/60",
    accent: "text-accent-crux",
    label: "Crux Node",
  },
  evidence: {
    border: "border-accent-purple/50",
    accent: "text-accent-purple",
    label: "Evidence",
  },
};

const gradientByVariant: Record<NodeVariant, string> = {
  meta: "from-accent-truth/5 via-void/80 to-accent-purple/5",
  pillar: "from-white/5 via-void/80 to-white/5",
  skeptic: "from-accent-doubt/10 via-void/85 to-accent-doubt/5",
  proponent: "from-accent-truth/10 via-void/85 to-accent-truth/5",
  crux: "from-accent-crux/10 via-void/90 to-accent-crux/5",
  evidence: "from-accent-purple/10 via-void/85 to-accent-purple/5",
};

export function RichNode({ id, data }: NodeProps<LogicNodeData>) {
  const expandNode = useLogicGraph((state) => state.expandNode);
  const openCrux = useLogicGraph((state) => state.openCrux);
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const tokens = VARIANT_TOKENS[data.variant ?? "pillar"];
  const gradient = gradientByVariant[data.variant ?? "pillar"];

  const canOpenCrux = data.variant === "crux" && data.detail;

  return (
    <div
      className={`relative w-[320px] rounded-[30px] border ${tokens.border} bg-gradient-to-br ${gradient} p-6 shadow-glass backdrop-blur-xl`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="logic-handle"
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="logic-handle"
        isConnectable={false}
      />

      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] ${tokens.accent}`}
        >
          {tokens.label}
        </span>
        {data.subtitle && (
          <span className="text-xs text-secondary/80">{data.subtitle}</span>
        )}
      </div>

      <h3 className="text-2xl font-semibold leading-snug">{data.title}</h3>

      {data.content && (
        <p className="mt-3 text-sm text-secondary leading-relaxed">
          {data.content}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <button
          className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-accent-truth/60 hover:text-accent-truth disabled:opacity-40"
          onClick={() => expandNode(id)}
          disabled={expanded}
        >
          {expanded ? "Branch Rendered" : "Expand Downward"}
          <ArrowDownRight className="h-4 w-4" />
        </button>

        {canOpenCrux && (
          <button
            className="inline-flex items-center justify-between rounded-2xl border border-accent-crux/40 bg-accent-crux/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent-crux transition hover:bg-accent-crux/20"
            onClick={() => openCrux(id)}
          >
            Open Crux Dossier
            <FlaskConical className="h-4 w-4" />
          </button>
        )}

        {!canOpenCrux && data.variant === "evidence" && (
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-purple">
            <Layers2 className="h-4 w-4" />
            Evidence Stream
          </div>
        )}
      </div>
    </div>
  );
}


