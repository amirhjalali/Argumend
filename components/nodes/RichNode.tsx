"use client";

import { InteractiveContent } from "@/components/InteractiveContent";
import { CitationCard } from "@/components/CitationCard";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import {
  ChevronDown,
  Scale,
  FileText,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import { getVariantStyle } from "@/lib/variantStyles";

function getStatusStyle(status: string): string {
  switch (status) {
    case "verified":
      return "bg-[#4f7b77]/20 text-[#3d6360]";
    case "theoretical":
      return "bg-[#C4613C]/20 text-[#8b3f27]";
    default:
      return "bg-stone-200 text-stone-600";
  }
}

export function RichNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expandNode = useLogicGraph((state) => state.expandNode);
  const openCrux = useLogicGraph((state) => state.openCrux);
  const loadEvidence = useLogicGraph((state) => state.loadEvidence);
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const evidenceLoaded = useLogicGraph((state) => state.evidenceLoadedNodes[id]);
  const style = getVariantStyle(data.variant);

  const canOpenCrux = data.variant === "crux" && data.detail;
  const isCrux = data.variant === "crux";
  const isPillar = data.variant === "pillar";
  const hasChildren = data.hasChildren ?? false;
  const hasEvidence = data.hasEvidence ?? false;
  const hasReferences = data.references && data.references.length > 0;

  return (
    <div
      className={`relative w-[340px] rounded-xl border border-stone-200/80 border-l-[3px] ${style.borderClass} bg-[#fefcf9] shadow-[0_1px_3px_rgba(120,100,80,0.08)] transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(120,100,80,0.12)] node-enter`}
      style={{ animationDelay: `${((data.birthOrder as number) ?? 0) * 80}ms` }}
    >
      {/* Handles for various layout directions */}
      <Handle type="target" position={Position.Top} id="top" className="logic-handle" isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" className="logic-handle" isConnectable={false} />
      <Handle type="source" position={Position.Bottom} id="bottom" className="logic-handle" isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" className="logic-handle" isConnectable={false} />

      {/* Optional Image */}
      {data.imageUrl && (
        <div className="h-36 w-full overflow-hidden rounded-t-xl border-b border-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5">
        {/* Header with Icon */}
        <div className="-mx-5 -mt-5 mb-4 px-5 py-2.5 rounded-t-xl border-b border-stone-100">
          <div className="flex items-center gap-2">
            <style.Icon className="h-3.5 w-3.5" style={{ color: style.accentColor }} strokeWidth={1.8} />
            <span className="text-[11px] font-sans font-medium text-stone-500">
              {style.label}
            </span>
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
                <span className={`text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${getStatusStyle(data.detail.status)}`}>
                  {data.detail.status}
                </span>
                <span className="text-[11px] text-stone-500">
                  Cost: {data.detail.cost}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Evidence Sources */}
        {hasReferences && (
          <div className="mt-3 -mx-5 -mb-5 px-5 py-3 border-t border-stone-100 rounded-b-xl bg-stone-50/50">
            <div className="mb-2 flex items-center gap-1.5">
              <FileText className="h-3 w-3 text-stone-400" strokeWidth={1.8} />
              <span className="text-[11px] font-medium text-stone-500">
                Sources ({data.references!.length})
              </span>
            </div>
            <ul className="space-y-1.5">
              {data.references!.map((ref, i) => (
                <li key={i}>
                  <CitationCard reference={ref} index={i + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="mt-3 flex flex-col gap-2 border-t border-stone-100 pt-3">
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <button
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  expanded
                    ? "text-stone-400 bg-stone-50"
                    : "text-stone-700 bg-stone-100 hover:bg-stone-200"
                }`}
                onClick={() => expandNode(id)}
                disabled={expanded}
              >
                {expanded ? "Expanded" : "Explore"}
                <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
            ) : (
              <div className="flex flex-1 items-center justify-center px-3 py-2 text-[11px] text-stone-300">
                Leaf node
              </div>
            )}

            {canOpenCrux && (
              <button
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#a23b3b] px-3 py-2 text-xs font-medium text-white hover:bg-[#8a3232] transition-colors"
                onClick={() => openCrux(id)}
              >
                Deep Dive
                <Scale className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Show Evidence button for pillars with evidence */}
          {isPillar && hasEvidence && (
            <button
              className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                evidenceLoaded
                  ? "text-rust-500 bg-rust-50/50 border border-rust-200/50"
                  : "text-rust-700 bg-rust-100/80 hover:bg-rust-200/80 border border-rust-200/50"
              }`}
              onClick={() => loadEvidence(id)}
              disabled={evidenceLoaded}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              {evidenceLoaded ? "Evidence Loaded" : "Show Evidence"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
