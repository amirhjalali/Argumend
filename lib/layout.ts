import type { XYPosition } from "@xyflow/react";
import type { ChildSlot } from "@/types/graph";

export const VERTICAL_GAP = 300;
export const HORIZONTAL_GAP = 400;

const SLOT_OFFSETS: Record<ChildSlot, XYPosition> = {
  left: { x: -HORIZONTAL_GAP, y: VERTICAL_GAP },
  center: { x: 0, y: VERTICAL_GAP },
  right: { x: HORIZONTAL_GAP, y: VERTICAL_GAP },
};

export function getChildPosition(
  parent: XYPosition,
  slot: ChildSlot,
): XYPosition {
  const offset = SLOT_OFFSETS[slot] ?? SLOT_OFFSETS.center;
  return {
    x: parent.x + offset.x,
    y: parent.y + offset.y,
  };
}


