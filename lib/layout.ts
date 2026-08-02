import type { XYPosition } from "@xyflow/react";
import type { ChildSlot } from "@/types/graph";

// The meta card is about 600px tall. A 680px first-level offset (1.7× this
// value) leaves a real gutter below it without creating a low-zoom dead zone.
export const VERTICAL_GAP = 400;
export const HORIZONTAL_GAP = 520; // Wider to match larger cards
export const COLLISION_PADDING = 0.85;
// Node positions are top-left anchors. The widest common pairing is a 420px
// meta card beside a 340px rich card, so anchors need roughly half their
// combined width plus a small gutter before the boxes are truly separate.
export const COLLISION_HORIZONTAL_GAP = 400;

// Root inquiries live in their own right-hand lane. Using the generic branch
// offsets put that lane only 208px from the right-most pillar, so the collision
// fallback repeatedly pushed otherwise unrelated nodes hundreds of pixels down
// the canvas. These values leave room for the real 340px card bounds and keep
// inquiry cards vertically readable without inflating the whole graph.
export const ROOT_INQUIRY_HORIZONTAL_GAP = 720;
export const ROOT_INQUIRY_VERTICAL_GAP = 470;

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

/**
 * First-level topics use two semantic lanes: pillars form the centered
 * argument backbone while inquiries form a readable column to its right.
 * Deeper branches keep the generic symmetric positioning above.
 */
export function getRootChildPosition(
  parent: XYPosition,
  slot: ChildSlot,
  indexInSlot: number = 0,
  totalInSlot: number = 1,
): XYPosition {
  if (slot !== "right") {
    return getChildPosition(parent, slot, indexInSlot, totalInSlot);
  }

  const siblingsHeight = (totalInSlot - 1) * ROOT_INQUIRY_VERTICAL_GAP;
  const startY = -siblingsHeight / 2;

  return {
    x: parent.x + ROOT_INQUIRY_HORIZONTAL_GAP,
    y:
      parent.y +
      VERTICAL_GAP * 0.5 +
      startY +
      indexInSlot * ROOT_INQUIRY_VERTICAL_GAP,
  };
}
