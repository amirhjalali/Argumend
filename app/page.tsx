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
import { Sidebar } from "@/components/Sidebar";
import { Compass, ScanLine, MousePointerClick } from "lucide-react";
import { topics } from "@/data/topics";

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
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setTopic = useLogicGraph((state) => state.setTopic);

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
    <div className="flex h-screen w-screen bg-canvas overflow-hidden font-sans">
      <Sidebar 
        topics={topics} 
        currentTopicId={currentTopicId} 
        onSelectTopic={setTopic} 
      />
      
      <div className="flex-1 relative h-full">
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
            color="#E5E5E5"
            gap={40}
            size={1}
            variant={BackgroundVariant.Dots}
            className=""
          />
          <Controls position="bottom-left" className="!bg-white !border !border-gray-200 !shadow-lw !text-secondary !rounded" />
        </ReactFlow>

        <div className="pointer-events-none absolute bottom-10 left-10 z-20">
          <div className="flex items-center gap-6 rounded bg-white border border-gray-200 px-5 py-3 text-sm text-secondary shadow-lw">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span className="font-sans font-semibold text-xs uppercase">Pan</span>
            </div>
            <div className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4" />
              <span className="font-sans font-semibold text-xs uppercase">Expand</span>
            </div>
            <div className="flex items-center gap-2">
              <ScanLine className="h-4 w-4" />
              <span className="font-sans font-semibold text-xs uppercase">Inspect</span>
            </div>
          </div>
        </div>

        <CruxDrawer />
      </div>
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

