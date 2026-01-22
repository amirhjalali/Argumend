"use client";

import { InteractiveContent } from "@/components/InteractiveContent";
import { CitationCard } from "@/components/CitationCard";
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
  Lightbulb,
  type LucideIcon
} from "lucide-react";

// Bold variant styling with semantic colors - gold/copper palette
const VARIANT_STYLES: Record<
  NodeVariant,
  { label: string; accentColor: string; borderClass: string; bgClass: string; Icon: LucideIcon; tagline?: string }
> = {
  meta: { label: "Meta Claim", accentColor: "#D4A012", borderClass: "border-l-[#D4A012]", bgClass: "bg-[#D4A012]/5", Icon: Landmark },
  pillar: { label: "Pillar", accentColor: "#78716c", borderClass: "border-l-stone-400", bgClass: "bg-stone-50", Icon: Landmark, tagline: "Core argument" },
  skeptic: { label: "Skeptic", accentColor: "#8B5A3C", borderClass: "border-l-[#8B5A3C]", bgClass: "bg-[#8B5A3C]/5", Icon: Swords, tagline: "The strongest objection" },
  proponent: { label: "Proponent", accentColor: "#D4A012", borderClass: "border-l-[#D4A012]", bgClass: "bg-[#D4A012]/5", Icon: Shield, tagline: "The response" },
  crux: { label: "Crux", accentColor: "#a23b3b", borderClass: "border-l-[#a23b3b]", bgClass: "bg-[#a23b3b]/5", Icon: Scale, tagline: "What would settle this?" },
  evidence: { label: "Evidence", accentColor: "#CF7B3E", borderClass: "border-l-[#CF7B3E]", bgClass: "bg-[#CF7B3E]/5", Icon: ScrollText, tagline: "The data" },
  question: { label: "Open Question", accentColor: "#6b5b95", borderClass: "border-l-[#6b5b95]", bgClass: "bg-[#6b5b95]/5", Icon: MessageCircleQuestion, tagline: "Worth investigating" },
};

export function RichNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expandNode = useLogicGraph((state) => state.expandNode);
  const openCrux = useLogicGraph((state) => state.openCrux);
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const style = VARIANT_STYLES[data.variant ?? "pillar"] ?? VARIANT_STYLES.pillar;

  const canOpenCrux = data.variant === "crux" && data.detail;
  const isCrux = data.variant === "crux";

  return (
    <div className={`relative w-[340px] rounded-2xl border border-stone-200/70 border-l-4 ${style.borderClass} bg-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.06),0_8px_24px_-6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.08),0_14px_36px_-8px_rgba(0,0,0,0.06)]`}>
      {/* Handles for various layout directions */}
      <Handle type="target" position={Position.Top} id="top" className="logic-handle" isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" className="logic-handle" isConnectable={false} />
      <Handle type="source" position={Position.Bottom} id="bottom" className="logic-handle" isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" className="logic-handle" isConnectable={false} />

      {/* Optional Image */}
      {data.imageUrl && (
        <div className="h-40 w-full overflow-hidden rounded-t-2xl border-b border-white/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.imageUrl} alt="" className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity" />
        </div>
      )}

      <div className="p-5">
        {/* Header with Icon */}
        <div className={`-mx-5 -mt-5 mb-4 px-5 py-3 rounded-t-2xl ${style.bgClass} border-b border-stone-100/80`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ backgroundColor: `${style.accentColor}18` }}
              >
                <style.Icon className="h-3.5 w-3.5" style={{ color: style.accentColor }} strokeWidth={2} />
              </div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em]" style={{ color: style.accentColor }}>
                {style.label}
              </span>
            </div>
            {style.tagline && (
              <span className="text-[11px] font-sans text-stone-500 italic">
                {style.tagline}
              </span>
            )}
          </div>
        </div>

        {/* Title - Serif, lighter weight */}
        <h3 className="mb-3 font-serif text-[17px] font-normal leading-snug text-primary tracking-tight">
          {data.title}
        </h3>

        {/* Content */}
        {data.content && (
          <div className="mb-4 text-sm font-sans leading-relaxed text-secondary">
            <InteractiveContent
              content={data.content}
              concepts={data.concepts}
              nodeId={id}
            />
          </div>
        )}

        {/* Special Crux Callout - "What would change your mind?" */}
        {isCrux && data.detail && (
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-[#a23b3b]/10 to-[#a23b3b]/5 border border-[#a23b3b]/20">
            <div className="flex items-start gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-[#a23b3b] mt-0.5 flex-shrink-0" strokeWidth={2} />
              <p className="text-xs font-semibold text-[#a23b3b] uppercase tracking-wide">
                The Key Question
              </p>
            </div>
            <p className="text-sm font-serif italic text-[#7a2929] leading-relaxed">
              &ldquo;{data.detail.description}&rdquo;
            </p>
            {data.detail.status && (
              <div className="mt-2 flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                  data.detail.status === "verified"
                    ? "bg-[#D4A012]/20 text-[#8B6914]"
                    : data.detail.status === "theoretical"
                    ? "bg-[#CF7B3E]/20 text-[#A65F2A]"
                    : "bg-stone-200 text-stone-600"
                }`}>
                  {data.detail.status}
                </span>
                <span className="text-[11px] text-stone-500">
                  Cost: {data.detail.cost}
                </span>
              </div>
            )}
          </div>
        )}

        {/* References with Hoverable Citation Cards */}
        {data.references && data.references.length > 0 && (
          <div className="mt-4 border-t border-stone-200 pt-3">
            <div className="mb-2 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-stone-400" strokeWidth={1.5} />
              <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-stone-500">
                Sources ({data.references.length})
              </p>
            </div>
            <ul className="space-y-2">
              {data.references.map((ref, i) => (
                <li key={i}>
                  <CitationCard reference={ref} index={i + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="mt-3 flex items-center gap-3 border-t border-stone-200 pt-4">
          {data.hasChildren ? (
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-600 transition-all hover:border-stone-400 hover:bg-stone-50 hover:text-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => expandNode(id)}
              disabled={expanded}
            >
              {expanded ? "Expanded" : "Explore"}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          ) : (
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-xs font-medium text-stone-400 cursor-default">
              End of branch
            </div>
          )}

          {canOpenCrux && (
            <button
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#a23b3b] to-[#c45c5c] px-3 py-2 text-xs font-bold text-white shadow-md shadow-[#a23b3b]/20 transition-all hover:shadow-lg hover:shadow-[#a23b3b]/30 hover:-translate-y-0.5"
              onClick={() => openCrux(id)}
            >
              Deep Dive
              <Scale className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
