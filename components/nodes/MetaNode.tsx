"use client";

import { memo } from "react";
import Image from "next/image";
import { InteractiveContent } from "@/components/InteractiveContent";
import { CitationCard } from "@/components/CitationCard";
import { ConfidenceGauge } from "@/components/ConfidenceGauge";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { LogicNodeData } from "@/types/graph";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { ChevronRight, Crown, FileText } from "lucide-react";

export const MetaNode = memo(function MetaNode({ id, data }: NodeProps<Node<LogicNodeData>>) {
  const expanded = useLogicGraph((state) => state.expandedNodes[id]);
  const expandNode = useLogicGraph((state) => state.expandNode);
  const collapseNode = useLogicGraph((state) => state.collapseNode);

  if (data.variant !== "meta") {
    return null;
  }

  return (
    <div
      className="relative w-[360px] md:w-[420px] rounded-xl border border-stone-200/80 dark:border-[var(--border-default)] border-t-2 border-t-deep dark:border-t-deep-light bg-[#fefcf9] dark:bg-[var(--bg-card)] shadow-[0_2px_6px_rgba(120,100,80,0.1)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-shadow duration-200 hover:shadow-[0_6px_20px_rgba(120,100,80,0.14)] dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] node-enter"
      tabIndex={0}
      role="group"
      aria-label={`Meta Claim: ${data.title || "Untitled"}`}
    >

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
        <div className="relative h-44 w-full overflow-hidden rounded-t-xl border-b border-stone-100 dark:border-[#302e2a]">
          <Image
            src={data.imageUrl}
            alt={data.title || "Topic illustration"}
            fill
            sizes="420px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="space-y-4 p-6">
        {/* Header: Meta Claim Label & Title */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-deep dark:text-deep-light" strokeWidth={1.8} />
            <p className="text-[11px] font-sans font-medium text-stone-500 dark:text-[var(--text-muted)]">
              Meta Claim
            </p>
          </div>
          <h2 className="text-xl font-serif font-normal leading-snug text-primary dark:text-[var(--text-primary)] tracking-tight">
            {data.title}
          </h2>
        </div>

        {/* Content */}
        {data.content && (
          <div className="text-base font-sans leading-relaxed text-secondary dark:text-[var(--text-secondary)]">
            <InteractiveContent
              content={data.content}
              concepts={data.concepts}
              nodeId={id}
            />
          </div>
        )}

        {/* Evidence Sources */}
        {data.references && data.references.length > 0 && (
          <div className="-mx-6 -mb-6 mt-4 px-6 py-4 border-t border-stone-100 dark:border-[#302e2a] rounded-b-xl bg-stone-50/50 dark:bg-[#201f1c]">
            <div className="mb-2 flex items-center gap-1.5">
              <FileText className="h-3 w-3 text-stone-400 dark:text-[var(--text-muted)]" strokeWidth={1.8} />
              <span className="text-[11px] font-medium text-stone-500 dark:text-[var(--text-muted)]">
                Sources ({data.references.length})
              </span>
            </div>
            <ul className="space-y-1.5">
              {data.references.map((ref, i) => (
                <li key={i}>
                  <CitationCard reference={ref} index={i + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: Score & Action */}
        <div className="flex items-center justify-between border-t border-stone-100 dark:border-[#302e2a] pt-4">
          {typeof data.score === "number" && (
            <ConfidenceGauge score={data.score} size={100} />
          )}

          {data.hasChildren ? (
            <button
              className="flex items-center gap-1.5 rounded-md bg-deep px-4 py-2 text-sm font-medium text-white hover:bg-deep-dark transition-colors"
              onClick={() => (expanded ? collapseNode(id) : expandNode(id))}
              aria-expanded={expanded}
            >
              {expanded ? "Collapse" : "Explore"}
              <ChevronRight className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
            </button>
          ) : (
            <div className="text-sm text-stone-300 dark:text-stone-600">
              Leaf
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
