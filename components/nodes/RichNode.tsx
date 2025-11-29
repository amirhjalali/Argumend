"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData, NodeVariant } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { ArrowDownRight, FlaskConical, Layers2 } from "lucide-react";

const VARIANT_TOKENS: Record<
  NodeVariant,
  { border: string; accent: string; label: string; bg: string }
> = {
  meta: {
    border: "border-accent-logos",
    accent: "text-accent-logos",
    label: "Meta",
    bg: "bg-parchment",
  },
  pillar: {
    border: "border-accent-logos/20",
    accent: "text-accent-logos",
    label: "Pillar",
    bg: "bg-parchment",
  },
  skeptic: {
    border: "border-accent-pathos/30",
    accent: "text-accent-pathos",
    label: "Skeptic",
    bg: "bg-parchment",
  },
  proponent: {
    border: "border-accent-logos/30",
    accent: "text-accent-logos",
    label: "Proponent",
    bg: "bg-parchment",
  },
  crux: {
    border: "border-accent-ethos/40",
    accent: "text-accent-ethos",
    label: "Crux",
    bg: "bg-parchment-dark",
  },
  evidence: {
    border: "border-accent-logos/20",
    accent: "text-accent-logos",
    label: "Evidence",
    bg: "bg-parchment",
  },
};

export function RichNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expandNode = useLogicGraph((state) => state.expandNode);
  const openCrux = useLogicGraph((state) => state.openCrux);
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const tokens = VARIANT_TOKENS[data.variant ?? "pillar"];

  const canOpenCrux = data.variant === "crux" && data.detail;

  return (
    <div
      className={`relative w-[320px] rounded-sm border ${tokens.border} ${tokens.bg} p-6 shadow-card transition-shadow hover:shadow-card-hover`}
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

      <div className="mb-4 flex items-center justify-between border-b border-black/5 pb-3">
        <span
          className={`text-xs font-bold uppercase tracking-[0.2em] font-sans ${tokens.accent}`}
        >
          {tokens.label}
        </span>
        {data.subtitle && (
          <span className="text-xs text-muted font-serif italic">
            {data.subtitle}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold leading-snug text-primary font-serif">
        {data.title}
      </h3>

      {data.content && (
        <p className="mt-3 text-sm text-secondary leading-relaxed font-sans">
          {data.content}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <button
          className="inline-flex items-center justify-between rounded-sm border border-black/10 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary transition hover:border-accent-logos hover:text-accent-logos disabled:opacity-40 disabled:cursor-not-allowed font-sans"
          onClick={() => expandNode(id)}
          disabled={expanded}
        >
          {expanded ? "Expanded" : "Expand Argument"}
          <ArrowDownRight className="h-3 w-3" />
        </button>

        {canOpenCrux && (
          <button
            className="inline-flex items-center justify-between rounded-sm border border-accent-ethos/30 bg-accent-ethos/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-ethos transition hover:bg-accent-ethos/10 font-sans"
            onClick={() => openCrux(id)}
          >
            View Crux
            <FlaskConical className="h-3 w-3" />
          </button>
        )}

        {!canOpenCrux && data.variant === "evidence" && (
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-logos/60 font-sans">
            <Layers2 className="h-3 w-3" />
            Evidence Stream
          </div>
        )}
      </div>
    </div>
  );
}


