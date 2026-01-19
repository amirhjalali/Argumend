"use client";

import { useLogicGraph } from "@/hooks/useLogicGraph";
import { useReactFlow } from "@xyflow/react";
import { ChevronRight, Home, Target } from "lucide-react";
import { useMemo } from "react";

export function NavigationPath() {
  const nodes = useLogicGraph((state) => state.nodes);
  const edges = useLogicGraph((state) => state.edges);
  const focusTargets = useLogicGraph((state) => state.focusTargets);
  const { fitView } = useReactFlow();

  // Build path from root to the most recently focused node
  const path = useMemo(() => {
    if (nodes.length === 0) return [];

    // Find root node
    const rootNode = nodes.find((n) => n.id === "root");
    if (!rootNode) return [];

    // If no focus targets, just show root
    if (focusTargets.length === 0) {
      return [{ id: rootNode.id, title: rootNode.data.title, variant: rootNode.data.variant }];
    }

    // Build a parent map from edges
    const parentMap = new Map<string, string>();
    edges.forEach((edge) => {
      parentMap.set(edge.target, edge.source);
    });

    // Get the first focus target (most recently expanded)
    const targetId = focusTargets[0];
    const targetNode = nodes.find((n) => n.id === targetId);
    if (!targetNode) {
      return [{ id: rootNode.id, title: rootNode.data.title, variant: rootNode.data.variant }];
    }

    // Walk up from target to root
    const pathItems: { id: string; title: string; variant: string }[] = [];
    let currentId: string | undefined = targetId;

    while (currentId) {
      const node = nodes.find((n) => n.id === currentId);
      if (node) {
        pathItems.unshift({
          id: node.id,
          title: node.data.title,
          variant: node.data.variant || "pillar",
        });
      }
      currentId = parentMap.get(currentId);
    }

    return pathItems;
  }, [nodes, edges, focusTargets]);

  const handleNodeClick = (nodeId: string) => {
    const targetNode = nodes.find((n) => n.id === nodeId);
    if (targetNode) {
      fitView({
        nodes: [targetNode],
        padding: 0.4,
        duration: 500,
      });
    }
  };

  if (path.length <= 1) return null;

  const getVariantColor = (variant: string) => {
    switch (variant) {
      case "meta":
        return "#D4A012";
      case "proponent":
        return "#D4A012";
      case "skeptic":
        return "#8B5A3C";
      case "evidence":
        return "#CF7B3E";
      case "crux":
        return "#a23b3b";
      default:
        return "#78716c";
    }
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 max-w-[600px]">
      <div className="flex items-center gap-1 rounded-xl border-2 border-[#c9b896] bg-gradient-to-br from-[#f8f3e8]/95 to-[#f0ebe0]/95 px-3 py-2 shadow-md backdrop-blur-sm">
        <Home className="h-3.5 w-3.5 text-[#D4A012] flex-shrink-0" />

        {path.map((item, index) => (
          <div key={item.id} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 text-muted mx-1 flex-shrink-0" />
            )}
            <button
              onClick={() => handleNodeClick(item.id)}
              className="group flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-all hover:bg-stone-200"
            >
              <div
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: getVariantColor(item.variant) }}
              />
              <span
                className="font-medium truncate max-w-[120px] group-hover:text-primary"
                style={{ color: index === path.length - 1 ? getVariantColor(item.variant) : "#6d645c" }}
              >
                {item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title}
              </span>
              {index === path.length - 1 && (
                <Target className="h-3 w-3 text-[#D4A012] flex-shrink-0" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
