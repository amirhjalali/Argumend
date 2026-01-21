"use client";

import { InteractiveContent } from "@/components/InteractiveContent";
import { ConfidenceGauge } from "@/components/ConfidenceGauge";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { ChevronRight, ScrollText, Landmark } from "lucide-react";

export function MetaNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const expandNode = useLogicGraph((state) => state.expandNode);

  if (data.variant !== "meta") {
    return null;
  }

  return (
    <div className="relative w-[420px] rounded-2xl border border-stone-200/80 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08),0_12px_40px_-8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-[#D4A012]/30 hover:shadow-[0_8px_30px_-6px_rgba(212,160,18,0.15),0_20px_50px_-10px_rgba(0,0,0,0.1)]">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#D4A012] to-transparent rounded-full" />

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

      {data.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      )}

      <div className="space-y-5 p-7">
        {/* Header: Meta Claim Label & Title */}
        <div className="mb-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4A012]/15 to-[#CF7B3E]/10">
              <Landmark className="h-4 w-4 text-[#D4A012]" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#B8890F]">
              Meta Claim
            </p>
          </div>
          <h2 className="text-2xl font-serif font-normal leading-snug text-primary tracking-tight">
            {data.title}
          </h2>
        </div>

        {/* Content */}
        {data.content && (
          <div className="text-base font-sans leading-relaxed text-secondary">
            <InteractiveContent
              content={data.content}
              concepts={data.concepts}
              nodeId={id}
            />
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="border-t border-stone-200 pt-4">
            <div className="mb-2 flex items-center gap-1.5">
              <ScrollText className="h-3 w-3 text-stone-400" strokeWidth={1.5} />
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-stone-400">
                Key Sources
              </p>
            </div>
            <ul className="space-y-2">
              {data.references.map((ref, i) => (
                <li key={i} className="text-xs font-serif text-secondary">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-1 leading-tight text-secondary transition-colors hover:text-accent-link"
                  >
                    {ref.title}
                    {ref.url && <ScrollText className="h-3 w-3 opacity-40 flex-shrink-0 mt-0.5" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: Score & Action */}
        <div className="flex items-center justify-between border-t border-stone-200 pt-5">
          {typeof data.score === "number" && (
            <ConfidenceGauge score={data.score} size={100} />
          )}

          {data.hasChildren ? (
            <button
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#D4A012] to-[#CF7B3E] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#D4A012]/30 transition-all hover:shadow-lg hover:shadow-[#D4A012]/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              onClick={() => expandNode(id)}
              disabled={expanded}
            >
              {expanded ? "Graph Expanded" : "View Analysis"}
              {expanded ? null : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-stone-200 px-5 py-2.5 text-sm font-semibold text-stone-400 cursor-default">
              Terminus
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
