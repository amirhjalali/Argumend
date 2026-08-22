import type { Edge, Node } from "@xyflow/react";
import type { LogicNodeData } from "@/types/graph";

type LogicNode = Node<LogicNodeData>;

/**
 * Choose the nodes that should determine an automatic focus frame.
 *
 * The initial root expansion contains the pillar row plus the inquiry lane.
 * Framing only the pillars leaves inquiry cards straddling the viewport edge,
 * which reads as a rendering glitch, so first paint frames the root and ALL of
 * its first-level children. That set is bounded (a handful of cards), unlike
 * deeper expansions, which keep the clicked parent and every newly revealed
 * child in frame.
 */
export function getFocusFrameNodes(
  nodes: LogicNode[],
  edges: Edge[],
  focusTargets: string[],
): LogicNode[] {
  const focusSet = new Set(focusTargets);
  const parentIds = new Set(
    edges.filter((edge) => focusSet.has(edge.target)).map((edge) => edge.source),
  );
  const focusedNodes = nodes.filter((node) => focusSet.has(node.id));

  if (parentIds.size === 1 && parentIds.has("root")) {
    const root = nodes.find((node) => node.id === "root");

    if (root) return [root, ...focusedNodes];
    return focusedNodes;
  }

  return nodes.filter(
    (node) => focusSet.has(node.id) || parentIds.has(node.id),
  );
}
