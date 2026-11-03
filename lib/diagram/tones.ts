import type { DiagramCruxNode } from "./model";

type SettleTone = NonNullable<DiagramCruxNode["settleLine"]>["tone"];

/**
 * How a crux could close, as the diagram colours its one settle line: teal
 * when a test can be run on evidence that exists, brown when evidence cannot
 * settle it, muted ink otherwise. Shared by the desktop boxes
 * (components/nodes/DiagramNode) and the phone outline
 * (components/MobileArgumentList), which must not import React Flow.
 */
export const SETTLE_TONE: Record<SettleTone, { dot: string; text: string }> = {
  testable: { dot: "bg-deep dark:bg-[#7fb5b0]", text: "text-deep dark:text-[#8fc0bb]" },
  open: { dot: "bg-stone-400 dark:bg-stone-500", text: "text-secondary dark:text-stone-400" },
  standing: { dot: "bg-skeptic dark:bg-[#cfa88a]", text: "text-skeptic-dark dark:text-[#d9b89d]" },
};
