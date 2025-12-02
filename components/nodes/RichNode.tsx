"use client";

import { InteractiveContent } from "@/components/InteractiveContent";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData, NodeVariant } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { ArrowDown, BookOpen, ExternalLink } from "lucide-react";

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
  question: { label: "Inquiry", accentClass: "text-secondary" },
};

export function RichNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expandNode = useLogicGraph((state) => state.expandNode);
  const openCrux = useLogicGraph((state) => state.openCrux);
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const style = VARIANT_STYLES[data.variant ?? "pillar"] ?? VARIANT_STYLES.pillar;

  const canOpenCrux = data.variant === "crux" && data.detail;

  return (
    <div className="relative w-[320px] rounded-2xl border border-white/40 bg-paper/95 shadow-lw transition-all hover:border-white/80 hover:shadow-[0_22px_60px_rgba(40,30,20,0.18)]">
      {/* Handles for various layout directions - styled as solid dots in globals.css */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="logic-handle"
        isConnectable={false}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="logic-handle"
        isConnectable={false}
      />
      
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

      {/* Optional Image */}
      {data.imageUrl && (
        <div className="h-40 w-full overflow-hidden rounded-t-2xl border-b border-white/40">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={data.imageUrl} alt="" className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity" />
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.35em] ${style.accentClass}`}>
            {style.label}
          </span>
          {data.subtitle && (
            <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-secondary">
              {data.subtitle}
            </span>
          )}
        </div>

        {/* Title - Serif Bold */}
        <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-primary">
          {data.title}
        </h3>

        {/* Content - Inter Sans, readable line-height */}
        {data.content && (
          <div className="mb-4 text-sm font-sans leading-relaxed text-secondary">
            <InteractiveContent 
              content={data.content} 
              concepts={data.concepts} 
              nodeId={id} 
            />
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="mt-4 border-t border-white/40 pt-3">
            <p className="mb-2 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-muted">
              References
            </p>
            <ul className="space-y-2">
              {data.references.map((ref, i) => (
                <li key={i} className="text-xs font-serif text-secondary">
                  <a 
                    href={ref.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-start gap-1 leading-tight transition-colors hover:text-accent-link"
                  >
                    {ref.title}
                    {ref.url && <ExternalLink className="h-3 w-3 opacity-40 flex-shrink-0 mt-0.5" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="mt-2 flex items-center gap-3 border-t border-white/40 pt-4">
          <button
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/60 px-3 py-1.5 text-xs font-medium text-secondary transition-all hover:border-accent-main/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => expandNode(id)}
            disabled={expanded}
          >
            {expanded ? "Expanded" : "Expand"}
            <ArrowDown className="h-3 w-3 text-muted" />
          </button>

          {canOpenCrux && (
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-accent-link/50 bg-accent-link/10 px-3 py-1.5 text-xs font-medium text-accent-link transition-all hover:bg-accent-link/15"
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
