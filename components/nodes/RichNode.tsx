"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData, NodeVariant } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { ArrowDown, BookOpen, ChevronRight } from "lucide-react";

// Simpler variant mapping for LW style - mostly unified, just subtle accents
const VARIANT_STYLES: Record<
  NodeVariant,
  { label: string; accentClass: string }
> = {
  meta: { label: "Meta", accentClass: "text-accent-main" },
  pillar: { label: "Pillar", accentClass: "text-primary" },
  skeptic: { label: "Skeptic Argument", accentClass: "text-accent-warn" }, // Warning color for skepticism
  proponent: { label: "Counter Argument", accentClass: "text-accent-main" },
  crux: { label: "Crux", accentClass: "text-accent-link" },
  evidence: { label: "Evidence", accentClass: "text-accent-main" },
};

export function RichNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expandNode = useLogicGraph((state) => state.expandNode);
  const openCrux = useLogicGraph((state) => state.openCrux);
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const style = VARIANT_STYLES[data.variant ?? "pillar"];

  const canOpenCrux = data.variant === "crux" && data.detail;

  return (
    <div className="relative w-[320px] bg-paper rounded shadow-lw transition-all hover:shadow-lw-hover">
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

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-sans font-bold uppercase tracking-wider ${style.accentClass}`}>
            {style.label}
          </span>
          {data.subtitle && (
            <span className="text-[10px] text-secondary font-sans uppercase tracking-wider">
              {data.subtitle}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif text-primary mb-3 leading-tight">
          {data.title}
        </h3>

        {/* Content */}
        {data.content && (
          <p className="text-base text-primary/80 font-serif leading-relaxed mb-4">
            {data.content}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
          <button
            className="flex items-center gap-1 text-xs font-sans font-semibold text-secondary hover:text-primary transition-colors disabled:opacity-40"
            onClick={() => expandNode(id)}
            disabled={expanded}
          >
            {expanded ? "Expanded" : "Expand"}
            <ArrowDown className="h-3 w-3" />
          </button>

          {canOpenCrux && (
            <button
              className="flex items-center gap-1 text-xs font-sans font-semibold text-accent-link hover:text-accent-main transition-colors"
              onClick={() => openCrux(id)}
            >
              View Crux
              <BookOpen className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


