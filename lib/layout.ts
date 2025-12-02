import type { XYPosition } from "@xyflow/react";
import type { ChildSlot } from "@/types/graph";

export const VERTICAL_GAP = 280;
export const HORIZONTAL_GAP = 520; // Wider to match larger cards
export const COLLISION_PADDING = 0.65;

export function getChildPosition(
  parent: XYPosition,
  slot: ChildSlot,
  indexInSlot: number = 0,
  totalInSlot: number = 1
): XYPosition {
  
  // Pillars: Vertically below, spread horizontally
  if (slot === "center") {
    const siblingsWidth = (totalInSlot - 1) * HORIZONTAL_GAP;
    const startX = -(siblingsWidth / 2);
    const relativeX = startX + indexInSlot * HORIZONTAL_GAP;
    
    return {
      x: parent.x + relativeX,
      y: parent.y + VERTICAL_GAP * 1.7 // More gap for pillars section
    };
  }

  // Logic Map: Horizontally to the side, spread vertically
  const isRight = slot === "right";
  // Use a much larger horizontal gap to separate the columns distinctly
  const horizontalOffset = isRight ? HORIZONTAL_GAP * 1.2 : -HORIZONTAL_GAP * 1.2;
  
  // Spread vertically centered around parent
  const siblingsHeight = (totalInSlot - 1) * (VERTICAL_GAP * 0.85);
  const startY = -(siblingsHeight / 2);
  const relativeY = startY + indexInSlot * (VERTICAL_GAP * 0.85);

  return {
    x: parent.x + horizontalOffset,
    y: parent.y + relativeY
  };
}
