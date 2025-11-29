"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import { CruxDrawer } from "@/components/CruxDrawer";
import { MetaNode } from "@/components/nodes/MetaNode";
import { RichNode } from "@/components/nodes/RichNode";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { Compass, ScanLine, MousePointerClick } from "lucide-react";

function CanvasExperience() {
  const nodeTypes = useMemo(
    () => ({
      metaNode: MetaNode,
      richNode: RichNode,
    }),
    [],
  );

  const nodes = useLogicGraph((state) => state.nodes);
  const edges = useLogicGraph((state) => state.edges);
  const onNodesChange = useLogicGraph((state) => state.onNodesChange);
  const focusTargets = useLogicGraph((state) => state.focusTargets);
  const consumeFocusTargets = useLogicGraph(
    (state) => state.consumeFocusTargets,
  );

  const reactFlow = useReactFlow();

  useEffect(() => {
    if (!focusTargets.length) return;
    const targetNodes = nodes.filter((node) =>
      focusTargets.includes(node.id),
    );
    if (!targetNodes.length) return;

    reactFlow.fitView({
      nodes: targetNodes,
      padding: 0.4,
      duration: 800,
    });
    consumeFocusTargets();
  }, [consumeFocusTargets, focusTargets, nodes, reactFlow]);

  return (
    <div className="star-chart relative flex h-screen w-screen flex-col text-white">
      <div className="pointer-events-none absolute left-10 top-10 z-20 max-w-lg space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.5em] text-accent-truth">
          Argumend · Infinite Logic Map
        </p>
        <h1 className="text-5xl font-semibold tracking-tight">
          The Moon Landing
        </h1>
        <p className="text-sm text-secondary">
          Start at the Meta Node. Expand downward to surface pillars,
          skeptic vectors, crux tests, and evidence streams.
        </p>
      </div>

      <ReactFlow
        className="z-10 h-full w-full"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: -200, y: 0, zoom: 0.6 }}
        minZoom={0.15}
        maxZoom={1.6}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll
        panOnScroll
        panOnDrag
        zoomOnDoubleClick={false}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background
          color="#1f2130"
          gap={26}
          size={1.6}
          variant="dots"
        />
        <Controls position="bottom-left" className="!bg-black/40" />
      </ReactFlow>

      <div className="pointer-events-none absolute bottom-10 left-10 z-20">
        <div className="flex items-center gap-6 rounded-3xl border border-white/5 bg-black/50 px-6 py-4 text-sm text-secondary backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-accent-truth" />
            Pan to explore
          </div>
          <div className="flex items-center gap-2">
            <MousePointerClick className="h-4 w-4 text-accent-crux" />
            Click nodes to expand
          </div>
          <div className="flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-accent-purple" />
            Crux opens drawer
          </div>
        </div>
      </div>

      <CruxDrawer />
    </div>
  );
}

export default function HomePage() {
  return (
    <ReactFlowProvider>
      <CanvasExperience />
    </ReactFlowProvider>
  );
}

