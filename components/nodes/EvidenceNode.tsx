"use client";

import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Scale, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";

export interface EvidenceNodeData {
  variant: "evidence";
  title: string;
  description: string;
  side: "for" | "against";
  score: number; // Total weight score (0-40)
  source?: string;
  sourceUrl?: string;
  birthOrder?: number;
  [key: string]: unknown;
}

function getScoreLabel(score: number): string {
  if (score >= 32) return "Strong";
  if (score >= 24) return "Moderate";
  if (score >= 16) return "Weak";
  return "Minimal";
}

export function EvidenceNode({ data }: NodeProps<Node<EvidenceNodeData>>) {
  const isFor = data.side === "for";
  const scoreLabel = getScoreLabel(data.score);

  return (
    <div
      className={`relative w-[280px] rounded-xl border shadow-[0_1px_3px_rgba(120,100,80,0.08)] transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(120,100,80,0.12)] node-enter ${
        isFor
          ? "bg-gradient-to-br from-rust-50/90 to-rust-100/60 border-rust-300/60 border-l-[3px] border-l-rust-500"
          : "bg-gradient-to-br from-stone-50/90 to-gray-50/60 border-stone-300/60 border-l-[3px] border-l-stone-500"
      }`}
      style={{ animationDelay: `${((data.birthOrder as number) ?? 0) * 60}ms` }}
    >
      {/* Handles */}
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

      <div className="p-4">
        {/* Header */}
        <div className="-mx-4 -mt-4 mb-3 px-4 py-2 border-b border-stone-100/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {isFor ? (
              <ThumbsUp
                className="h-3.5 w-3.5 text-rust-600"
                strokeWidth={2}
              />
            ) : (
              <ThumbsDown
                className="h-3.5 w-3.5 text-stone-500"
                strokeWidth={2}
              />
            )}
            <span
              className={`text-[10px] font-semibold uppercase tracking-wide ${
                isFor ? "text-rust-700" : "text-stone-600"
              }`}
            >
              {isFor ? "Supporting" : "Opposing"}
            </span>
          </div>

          {/* Score Badge */}
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
              isFor
                ? "bg-rust-100/80 text-rust-700"
                : "bg-stone-100/80 text-stone-600"
            }`}
          >
            <Scale className="h-3 w-3" />
            <span>
              {data.score}/40 · {scoreLabel}
            </span>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-serif text-[15px] font-medium leading-snug text-primary mb-2">
          {data.title}
        </h4>

        {/* Description */}
        <p className="text-[13px] leading-relaxed text-secondary line-clamp-3">
          {data.description}
        </p>

        {/* Source */}
        {data.source && (
          <div className="mt-3 pt-2 border-t border-stone-100/80">
            {data.sourceUrl ? (
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors ${
                  isFor
                    ? "text-rust-600 hover:text-rust-700"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {data.source}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="text-[11px] text-stone-400">{data.source}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
