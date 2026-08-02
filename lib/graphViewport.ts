import type { Edge, Node } from "@xyflow/react";
import type { LogicNodeData } from "@/types/graph";

type LogicNode = Node<LogicNodeData>;

/**
 * Choose the nodes that should determine an automatic focus frame.
 *
 * The initial root expansion may contain a tall inquiry lane as well as the
 * core pillars. Fitting every card makes all text illegible, so first paint
 * frames the root and its pillar backbone. The full graph remains rendered,
 * connected, and visible in the minimap. Deeper expansions retain the clicked
 * parent and every newly revealed child in frame.
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
    const pillars = focusedNodes.filter(
      (node) => node.data.variant === "pillar",
    );
    const backbone = root ? [root, ...pillars] : pillars;

    // Topics are expected to have pillars, but preserve a useful frame for
    // malformed or minimal topic data rather than returning only the root.
    if (backbone.length > 1) return backbone;
    return root ? [root, ...focusedNodes.slice(0, 2)] : focusedNodes;
  }

  return nodes.filter(
    (node) => focusSet.has(node.id) || parentIds.has(node.id),
  );
}
