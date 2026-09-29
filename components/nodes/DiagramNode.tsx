"use client";

import { createContext, memo, useContext } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { DiagramNode as DiagramNodeModel } from "@/lib/diagram/model";
import { NODE_SIZE } from "@/lib/diagram/layout";

/**
 * One box of the diagram (/topics/[id]/map). Every kind draws exactly the size
 * lib/diagram/layout.ts reserved for it and clamps its text to fit, so boxes
 * never grow into each other.
 *
 * The box holds its label and nothing else: no photos, no scores, no buttons.
 * The whole node is the control (React Flow's wrapper is focusable, with role
 * "button"); Enter or a click opens the full text in DiagramDetail.
 *
 * Colour follows the site: teal for the question and the evidence, crimson
 * only for cruxes, rust for supporters and brown for skeptics.
 */

export type DiagramFlowNode = Node<{ node: DiagramNodeModel }, "diagram">;

/**
 * The id of the node whose detail is open. A context rather than node data,
 * so opening a detail never hands React Flow a new nodes array (which would
 * drop the boxes it has already measured).
 */
export const ActiveDiagramNode = createContext<string | null>(null);

/** Handles only anchor the edges; nobody connects anything here. */
const HANDLE = "!pointer-events-none !h-1 !min-h-0 !w-1 !min-w-0 !border-0 !bg-transparent !opacity-0";

const CARD =
  "relative h-full w-full overflow-hidden rounded-lg border bg-[#fefcf9] shadow-[0_1px_3px_rgba(120,100,80,0.08)] transition-shadow duration-150 group-hover:shadow-[0_3px_12px_rgba(120,100,80,0.14)] motion-reduce:transition-none dark:bg-[var(--bg-card)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)]";

/** The open node keeps a quiet teal outline while its detail is showing. */
function edge(active: boolean): string {
  return active
    ? "border-deep/60 dark:border-[#7fb5b0]/60"
    : "border-stone-200/90 dark:border-[var(--border-default)]";
}

const SIDE_STYLE = {
  supporters: {
    rule: "border-l-rust-500 dark:border-l-rust-400",
    label: "!text-rust-700 dark:!text-rust-400",
  },
  skeptics: {
    rule: "border-l-skeptic dark:border-l-[#cfa88a]",
    label: "!text-skeptic dark:!text-[#cfa88a]",
  },
} as const;

/** The evidence glyphs the map page uses: ＋ supports the claim, − challenges it. */
const EVIDENCE_GLYPH = {
  for: { glyph: "＋", className: "text-rust-700 dark:text-rust-400" },
  against: { glyph: "−", className: "text-skeptic dark:text-[#cfa88a]" },
} as const;

function DiagramNodeView({ id, data }: NodeProps<DiagramFlowNode>) {
  const { node } = data;
  const active = useContext(ActiveDiagramNode) === id;

  switch (node.kind) {
    case "question":
      return (
        <div style={NODE_SIZE.question} className="group">
          <div
            className={`${CARD} ${edge(active)} border-t-[3px] border-t-deep px-6 py-4 dark:border-t-[#7fb5b0]`}
          >
            <span className="label-caps block !text-[0.9375rem] !text-deep dark:!text-accent-text">
              The question
            </span>
            <span className="mt-1.5 line-clamp-2 text-balance font-serif text-[1.5rem] leading-[1.25] text-stone-900 dark:text-stone-100">
              {node.label}
            </span>
          </div>
          <Handle type="source" position={Position.Bottom} id="out" className={HANDLE} isConnectable={false} />
        </div>
      );

    case "crux":
      return (
        <div style={NODE_SIZE.crux} className="group">
          <Handle type="target" position={Position.Top} id="in" className={HANDLE} isConnectable={false} />
          <div
            className={`${CARD} ${edge(active)} border-l-[3px] border-l-crux py-3.5 pl-4 pr-5 dark:border-l-crux-light`}
          >
            <span className="flex items-baseline gap-2.5">
              <span className="font-serif text-[1.375rem] leading-none text-crux-text">{node.number}</span>
              {node.kicker && (
                <span className="min-w-0 truncate text-[12.5px] leading-snug text-muted dark:text-stone-400">
                  {node.kicker}
                </span>
              )}
            </span>
            <span className="mt-2 line-clamp-3 text-pretty font-serif text-[1.1875rem] font-medium leading-[1.3] text-stone-900 dark:text-stone-100">
              {node.label}
            </span>
          </div>
          <Handle type="source" position={Position.Bottom} id="out" className={HANDLE} isConnectable={false} />
        </div>
      );

    case "side": {
      const style = SIDE_STYLE[node.side];
      return (
        <div style={NODE_SIZE.side} className="group">
          <Handle type="target" position={Position.Top} id="in" className={HANDLE} isConnectable={false} />
          <div className={`${CARD} ${edge(active)} border-l-[3px] ${style.rule} px-3.5 py-3`}>
            <span className={`label-caps block !text-[0.9375rem] ${style.label}`}>{node.heading}</span>
            <span className="mt-1 line-clamp-4 font-serif text-[15px] leading-[1.4] text-stone-800 dark:text-stone-200">
              {node.label}
            </span>
          </div>
          {/* The spine the evidence hangs off, near the left edge. */}
          <Handle
            type="source"
            position={Position.Bottom}
            id="spine"
            className={HANDLE}
            style={{ left: 10 }}
            isConnectable={false}
          />
        </div>
      );
    }

    case "evidence": {
      const mark = EVIDENCE_GLYPH[node.side];
      return (
        <div style={NODE_SIZE.evidence} className="group">
          <Handle type="target" position={Position.Left} id="in" className={HANDLE} isConnectable={false} />
          <div
            className={`${CARD} ${edge(active)} border-l-2 border-l-deep/70 px-3 py-2.5 dark:border-l-[#7fb5b0]/70`}
          >
            <span className="line-clamp-3 font-serif text-[14.5px] leading-[1.3] text-stone-800 dark:text-stone-200">
              <span aria-hidden="true" className={`mr-1 font-sans text-[13px] ${mark.className}`}>
                {mark.glyph}
              </span>
              {node.label}
            </span>
          </div>
        </div>
      );
    }
  }
}

export const DiagramNode = memo(DiagramNodeView);
