import type { XYPosition } from "@xyflow/react";
import type { ChildSlot } from "@/types/graph";

export const VERTICAL_GAP = 250;
export const HORIZONTAL_GAP = 380;

export function getChildPosition(
  parent: XYPosition,
  slot: ChildSlot,
  indexInSlot: number = 0,
  totalInSlot: number = 1
): XYPosition {
  // Calculate total width needed for siblings in this slot
  const siblingsWidth = (totalInSlot - 1) * HORIZONTAL_GAP;
  const startX = -(siblingsWidth / 2);
  const relativeX = startX + indexInSlot * HORIZONTAL_GAP;

  let offsetX = 0;
  if (slot === "left") offsetX = -HORIZONTAL_GAP * 1.2; // Push further left
  if (slot === "right") offsetX = HORIZONTAL_GAP * 1.2; // Push further right
  
  // Center slot stays centered relative to parent, but spreads siblings
  if (slot === "center") {
    offsetX = 0;
  }

  return {
    x: parent.x + offsetX + (slot === "center" ? relativeX : 0),
    y: parent.y + VERTICAL_GAP,
  };
}


