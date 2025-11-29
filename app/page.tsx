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
import { TopBar } from "@/components/TopBar";
import { PostFeed } from "@/components/PostFeed";
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
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-primary">
      <Sidebar topics={topics} currentTopicId={currentTopicId} onSelectTopic={setTopic} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          <PostFeed />

          <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#050B1F] via-[#101B33] to-[#1F2D46]">
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
                color="#2B3B57"
                gap={40}
                size={1}
                variant={BackgroundVariant.Dots}
                className=""
              />
              <Controls
                position="bottom-left"
                className="!bg-white/80 !border !border-white/30 !shadow-lw !text-secondary !rounded-full"
              />
            </ReactFlow>

            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#050B1F] via-transparent" />

            <div className="pointer-events-none absolute bottom-10 left-10 z-20">
              <div className="flex items-center gap-4 rounded-full border border-white/30 bg-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur">
                <div className="flex items-center gap-2">
                  <Compass className="h-3.5 w-3.5" />
                  <span>Pan</span>
                </div>
                <div className="flex items-center gap-2">
                  <MousePointerClick className="h-3.5 w-3.5" />
                  <span>Expand</span>
                </div>
                <div className="flex items-center gap-2">
                  <ScanLine className="h-3.5 w-3.5" />
                  <span>Inspect</span>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto absolute right-10 top-14 z-20 max-w-sm rounded-2xl border border-white/20 bg-white/10 px-6 py-6 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-white/80">Solstice Season</p>
              <h3 className="mt-2 font-serif text-3xl">Celebrate the longest night</h3>
              <p className="mt-2 text-sm text-white/80">
                Visit a megameetup at a major city, or host a gathering for your friends on the night of the
                21st. Community rituals keep our discourse humane.
              </p>
              <div className="mt-4 flex gap-3 text-sm font-semibold">
                <span className="rounded-full bg-white/20 px-3 py-1">Berkeley — Dec 6</span>
                <span className="rounded-full bg-white/20 px-3 py-1">New York — Dec 20</span>
              </div>
            </div>

            <CruxDrawer />
          </div>
        </div>
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

