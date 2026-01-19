"use client";

import { InteractiveContent } from "@/components/InteractiveContent";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData, NodeVariant } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import {
  ChevronDown,
  Scale,
  ScrollText,
  Landmark,
  MessageCircleQuestion,
  Swords,
  Shield,
  FileText,
  type LucideIcon
} from "lucide-react";

// Bold variant styling with semantic colors - gold/copper palette
const VARIANT_STYLES: Record<
  NodeVariant,
  { label: string; accentClass: string; borderClass: string; bgClass: string; Icon: LucideIcon }
> = {
  meta: { label: "Meta", accentClass: "text-accent-main", borderClass: "border-l-accent-main", bgClass: "bg-accent-main/5", Icon: Landmark },
  pillar: { label: "Pillar", accentClass: "text-stone-600", borderClass: "border-l-stone-400", bgClass: "bg-stone-50", Icon: Landmark },
  skeptic: { label: "Skeptic", accentClass: "text-skeptic", borderClass: "border-l-skeptic", bgClass: "bg-skeptic/5", Icon: Swords },
  proponent: { label: "Proponent", accentClass: "text-proponent", borderClass: "border-l-proponent", bgClass: "bg-proponent/5", Icon: Shield },
  crux: { label: "Crux", accentClass: "text-crux", borderClass: "border-l-crux", bgClass: "bg-crux/5", Icon: Scale },
  evidence: { label: "Evidence", accentClass: "text-evidence", borderClass: "border-l-evidence", bgClass: "bg-evidence/5", Icon: ScrollText },
  question: { label: "Inquiry", accentClass: "text-stone-500", borderClass: "border-l-stone-300", bgClass: "bg-stone-50", Icon: MessageCircleQuestion },
};

export function RichNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expandNode = useLogicGraph((state) => state.expandNode);
  const openCrux = useLogicGraph((state) => state.openCrux);
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const style = VARIANT_STYLES[data.variant ?? "pillar"] ?? VARIANT_STYLES.pillar;

  const canOpenCrux = data.variant === "crux" && data.detail;

  return (
    <div className={`relative w-[320px] rounded-2xl border border-white/40 border-l-4 ${style.borderClass} bg-paper/95 shadow-lw transition-all hover:border-white/80 hover:shadow-[0_22px_60px_rgba(40,30,20,0.18)]`}>
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
        {/* Header with Icon */}
        <div className={`-mx-5 -mt-5 mb-4 px-5 py-3 rounded-t-2xl ${style.bgClass} border-b border-stone-100`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <style.Icon className={`h-4 w-4 ${style.accentClass}`} strokeWidth={2} />
              <span className={`text-[11px] font-sans font-bold uppercase tracking-[0.25em] ${style.accentClass}`}>
                {style.label}
              </span>
            </div>
            {data.subtitle && (
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-secondary">
                {data.subtitle}
              </span>
            )}
          </div>
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
          <div className="mt-4 border-t border-stone-200 pt-3">
            <div className="mb-2 flex items-center gap-1.5">
              <FileText className="h-3 w-3 text-stone-400" strokeWidth={1.5} />
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-stone-400">
                Sources
              </p>
            </div>
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
                    {ref.url && <ScrollText className="h-3 w-3 opacity-40 flex-shrink-0 mt-0.5" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="mt-2 flex items-center gap-3 border-t border-stone-200 pt-4">
          {data.hasChildren ? (
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 transition-all hover:border-stone-400 hover:text-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => expandNode(id)}
              disabled={expanded}
            >
              {expanded ? "Expanded" : "Expand"}
              <ChevronDown className="h-3 w-3" />
            </button>
          ) : (
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-transparent px-3 py-1.5 text-xs font-medium text-stone-400 cursor-default">
              Terminus
            </div>
          )}

          {canOpenCrux && (
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 border-crux bg-crux/10 px-3 py-2 text-xs font-bold text-crux transition-all hover:bg-crux hover:text-white hover:shadow-lg hover:shadow-crux/25"
              onClick={() => openCrux(id)}
            >
              View Crux
              <Scale className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
