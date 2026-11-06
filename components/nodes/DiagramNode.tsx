"use client";

import { createContext, memo, useContext } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { DiagramNode as DiagramNodeModel } from "@/lib/diagram/model";
import { NODE_SIZE } from "@/lib/diagram/layout";
import { SETTLE_TONE } from "@/lib/diagram/tones";

/**
 * One box of the diagram (/topics/[id]/map). Every kind draws exactly the size
 * lib/diagram/layout.ts reserved for it and clamps its text to fit, so boxes
 * never grow into each other.
 *
 * The box holds its label and nothing else: no photos, no scores, no buttons.
 * The whole node is the control (React Flow's wrapper is focusable, with role
 * "button"); Enter or a click opens the full text in DiagramDetail.
 *
 * Four tiers, so the tree reads at a glance before any box is read:
 *  - the question: the one filled plate, deep teal, largest type;
 *  - the cruxes: paper cards, a crimson rule and numeral (crimson is theirs
 *    alone), and one line saying how each could close;
 *  - the sides: washed in their side's colour, rust for yes and brown for no,
 *    so the split runs down the whole tree;
 *  - the evidence: quiet, unshadowed slips on a hairline in its side's colour.
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

const BOX =
  "relative h-full w-full overflow-hidden rounded-lg border transition-shadow duration-150 motion-reduce:transition-none";

const CARD = `${BOX} bg-[#fefcf9] shadow-[0_1px_3px_rgba(120,100,80,0.08)] group-hover:shadow-[0_3px_12px_rgba(120,100,80,0.14)] dark:bg-[var(--bg-card)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)]`;

/** The open node keeps a quiet teal outline while its detail is showing. */
function edge(active: boolean): string {
  return active
    ? "border-deep/60 dark:border-[#7fb5b0]/60"
    : "border-stone-200/90 dark:border-[var(--border-default)]";
}

const SIDE_STYLE = {
  supporters: {
    box: "border-rust-200/80 border-l-rust-500 bg-rust-50 dark:border-[#4a3328] dark:border-l-rust-400 dark:bg-[#2c221d]",
    label: "!text-rust-700 dark:!text-rust-300",
  },
  skeptics: {
    box: "border-[#e5d6c8] border-l-skeptic bg-[#f6f0e9] dark:border-[#463a30] dark:border-l-[#cfa88a] dark:bg-[#29241f]",
    label: "!text-skeptic-dark dark:!text-[#d9b89d]",
  },
} as const;

/** The evidence glyphs the map page uses: ＋ supports the claim, − challenges it. */
const EVIDENCE_STYLE = {
  for: {
    glyph: "＋",
    glyphClass: "text-rust-700 dark:text-rust-300",
    rule: "border-l-rust-400/80 dark:border-l-rust-400/70",
  },
  against: {
    glyph: "−",
    glyphClass: "text-skeptic-dark dark:text-[#d9b89d]",
    rule: "border-l-skeptic-light/80 dark:border-l-[#cfa88a]/70",
  },
} as const;

function DiagramNodeView({ id, data }: NodeProps<DiagramFlowNode>) {
  const { node } = data;
  const active = useContext(ActiveDiagramNode) === id;

  switch (node.kind) {
    case "question":
      return (
        <div style={NODE_SIZE.question} className="group">
          <div
            className={`${BOX} flex flex-col justify-center border-deep-dark bg-deep px-7 py-4 shadow-[0_4px_16px_rgba(45,82,79,0.22)] dark:border-[#3f6e6a] dark:bg-[#24423f] ${
              active ? "outline outline-2 outline-offset-2 outline-deep/60 dark:outline-[#7fb5b0]/60" : ""
            }`}
          >
            <span className="label-caps block !text-[0.9375rem] !text-white/85">The question</span>
            <span className="mt-1 line-clamp-2 text-balance font-serif text-[1.625rem] leading-[1.2] text-white">
              {node.label}
            </span>
          </div>
          <Handle type="source" position={Position.Bottom} id="out" className={HANDLE} isConnectable={false} />
        </div>
      );

    case "crux": {
      const tone = node.settleLine ? SETTLE_TONE[node.settleLine.tone] : undefined;
      return (
        <div style={NODE_SIZE.crux} className="group">
          <Handle type="target" position={Position.Top} id="in" className={HANDLE} isConnectable={false} />
          <div
            className={`${CARD} ${edge(active)} flex flex-col border-l-[3px] border-l-crux py-3.5 pl-4 pr-5 dark:border-l-crux-light`}
          >
            <span className="flex items-start gap-3">
              <span className="font-serif text-[1.875rem] leading-[1.6rem] text-crux-text">{node.number}</span>
              <span className="min-w-0">
                {node.kicker && (
                  <span className="mb-0.5 block truncate text-[12.5px] leading-snug text-muted dark:text-stone-400">
                    {node.kicker}
                  </span>
                )}
                <span className="line-clamp-3 text-pretty font-serif text-[1.1875rem] font-medium leading-[1.28] text-stone-900 dark:text-stone-100">
                  {node.label}
                </span>
              </span>
            </span>
            {node.settleLine && tone && (
              <span className="mt-2.5 flex items-center gap-2 pl-[2.375rem]">
                <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                <span className={`truncate text-[12.5px] leading-snug ${tone.text}`}>
                  {node.settleLine.text}
                </span>
              </span>
            )}
          </div>
          <Handle type="source" position={Position.Bottom} id="out" className={HANDLE} isConnectable={false} />
        </div>
      );
    }

    case "side": {
      const style = SIDE_STYLE[node.side];
      return (
        <div style={NODE_SIZE.side} className="group">
          <Handle type="target" position={Position.Top} id="in" className={HANDLE} isConnectable={false} />
          <div
            className={`${BOX} border-l-[3px] px-3.5 py-3 shadow-[0_1px_2px_rgba(120,100,80,0.06)] group-hover:shadow-[0_3px_10px_rgba(120,100,80,0.12)] ${style.box} ${
              active ? "outline outline-2 outline-offset-2 outline-deep/60 dark:outline-[#7fb5b0]/60" : ""
            }`}
          >
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
      const style = EVIDENCE_STYLE[node.side];
      return (
        <div style={NODE_SIZE.evidence} className="group">
          <Handle type="target" position={Position.Left} id="in" className={HANDLE} isConnectable={false} />
          <div
            className={`${BOX} ${edge(active)} border-l-2 ${style.rule} bg-[#faf8f4] px-3 py-2.5 group-hover:bg-[#fefcf9] dark:bg-[#211f1c] dark:group-hover:bg-[var(--bg-card)]`}
          >
            <span className="line-clamp-3 font-serif text-[14.5px] leading-[1.3] text-stone-700 dark:text-stone-300">
              <span aria-hidden="true" className={`mr-1 font-sans text-[13px] ${style.glyphClass}`}>
                {style.glyph}
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
