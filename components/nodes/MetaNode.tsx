"use client";

import { InteractiveContent } from "@/components/InteractiveContent";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { ChevronRight, ExternalLink } from "lucide-react";

export function MetaNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const expandNode = useLogicGraph((state) => state.expandNode);

  if (data.variant !== "meta") {
    return null;
  }

  return (
    <div className="relative w-[420px] rounded-2xl border border-white/50 bg-paper/95 shadow-lw transition-shadow hover:border-white/80 hover:shadow-[0px_25px_60px_rgba(40,30,20,0.18)]">
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
        <div className="h-56 w-full overflow-hidden rounded-t-2xl border-b border-white/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="space-y-6 p-8">
        {/* Header: Meta Claim Label & Title */}
        <div className="mb-6">
          <p className="mb-2 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-accent-main">
            Meta Claim
          </p>
          <h2 className="text-3xl font-serif font-bold leading-tight text-primary">
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
          <div className="border-t border-white/40 pt-4">
            <p className="mb-2 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-muted">
              Key Sources
            </p>
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
                    {ref.url && <ExternalLink className="h-3 w-3 opacity-40 flex-shrink-0 mt-0.5" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: Score & Action */}
        <div className="flex items-center justify-between border-t border-white/40 pt-5">
          {typeof data.score === "number" && (
            <div className="flex items-center gap-3">
              <span className="font-sans text-4xl font-bold text-accent-main">
                {data.score.toFixed(0)}%
              </span>
              <span className="font-sans text-xs uppercase leading-tight tracking-[0.3em] text-secondary">
                Confidence<br />Score
              </span>
            </div>
          )}

          {data.hasChildren ? (
            <button
              className="flex items-center gap-2 rounded-full border border-white/60 px-4 py-2 text-sm font-semibold text-secondary transition-all hover:border-accent-main/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => expandNode(id)}
              disabled={expanded}
            >
              {expanded ? "Graph Expanded" : "View Analysis"}
              {expanded ? null : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-muted opacity-50 cursor-default">
              End of Line
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
