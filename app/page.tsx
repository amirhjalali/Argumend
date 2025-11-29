"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
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
    <div className="star-chart relative flex h-screen w-screen flex-col text-primary">
      <div className="pointer-events-none absolute left-10 top-10 z-20 max-w-lg space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-logos/80 font-sans">
          Argumend · Logic Map
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-accent-logos font-serif">
          The Moon Landing
        </h1>
        <p className="text-sm text-secondary font-serif italic">
          Start at the Meta Node. Explore pillars, skeptic vectors, and the definitive tests that resolve them.
        </p>
      </div>

      <ReactFlow
        className="z-10 h-full w-full"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: -200, y: 0, zoom: 0.8 }}
        minZoom={0.2}
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
          color="#2C3E50"
          gap={40}
          size={1}
          variant={BackgroundVariant.Dots}
          className="opacity-5"
        />
        <Controls position="bottom-left" className="!bg-white !border !border-black/10 !shadow-sm !text-black" />
      </ReactFlow>

      <div className="pointer-events-none absolute bottom-10 left-10 z-20">
        <div className="flex items-center gap-6 rounded-sm border border-black/5 bg-white px-6 py-4 text-sm text-secondary shadow-sm">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-accent-logos" />
            <span className="font-sans font-bold text-xs uppercase tracking-wide">Pan</span>
          </div>
          <div className="flex items-center gap-2">
            <MousePointerClick className="h-4 w-4 text-accent-pathos" />
            <span className="font-sans font-bold text-xs uppercase tracking-wide">Expand</span>
          </div>
          <div className="flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-accent-ethos" />
            <span className="font-sans font-bold text-xs uppercase tracking-wide">Inspect</span>
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

