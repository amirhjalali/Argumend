import type { XYPosition } from "@xyflow/react";
import type { ChildSlot } from "@/types/graph";

export const VERTICAL_GAP = 450; // Increased to accommodate taller cards with images
export const HORIZONTAL_GAP = 520; // Wider to match larger cards
export const COLLISION_PADDING = 0.85;

// Smaller gap for evidence nodes
export const EVIDENCE_VERTICAL_GAP = 320;
export const EVIDENCE_HORIZONTAL_GAP = 300;

export function getChildPosition(
  parent: XYPosition,
  slot: ChildSlot,
  indexInSlot: number = 0,
  totalInSlot: number = 1
): XYPosition {

  // Center slot: Vertically below, spread horizontally
  if (slot === "center") {
    const siblingsWidth = (totalInSlot - 1) * HORIZONTAL_GAP;
    const startX = -(siblingsWidth / 2);
    const relativeX = startX + indexInSlot * HORIZONTAL_GAP;

    return {
      x: parent.x + relativeX,
      y: parent.y + VERTICAL_GAP * 1.7 // More gap for pillars section
    };
  }

  // Left slot: For skeptic nodes - positioned to the left and slightly down
  if (slot === "left") {
    const horizontalOffset = -HORIZONTAL_GAP * 0.9;
    const siblingsHeight = (totalInSlot - 1) * (VERTICAL_GAP * 0.7);
    const startY = -(siblingsHeight / 2);
    const relativeY = startY + indexInSlot * (VERTICAL_GAP * 0.7);

    return {
      x: parent.x + horizontalOffset,
      y: parent.y + VERTICAL_GAP * 0.5 + relativeY,
    };
  }

  // Right slot: For proponent nodes and Logic Map questions
  const horizontalOffset = HORIZONTAL_GAP * 0.9;
  const siblingsHeight = (totalInSlot - 1) * (VERTICAL_GAP * 0.7);
  const startY = -(siblingsHeight / 2);
  const relativeY = startY + indexInSlot * (VERTICAL_GAP * 0.7);

  return {
    x: parent.x + horizontalOffset,
    y: parent.y + VERTICAL_GAP * 0.5 + relativeY,
  };
}
