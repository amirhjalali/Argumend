"use client";

import { generateBlueprint, getEvidenceIdsForPillar } from "@/data/logicBlueprint";
import type { EvidenceNodeData } from "@/components/nodes/EvidenceNode";

// Lazy-loaded to prevent 500KB topics.ts from being bundled into every page
let _topics: typeof import("@/data/topics").topics | null = null;
let _moonLanding: typeof import("@/data/topics").moonLanding | null = null;

async function getTopicsModule() {
  if (!_topics) {
    const mod = await import("@/data/topics");
    _topics = mod.topics;
    _moonLanding = mod.moonLanding;
  }
  return { topics: _topics!, moonLanding: _moonLanding! };
}

// Synchronous access after module is loaded (for use inside store actions)
function getTopicsSync() {
  return _topics;
}

function getMoonLandingSync() {
  return _moonLanding;
}
import {
  COLLISION_PADDING,
  HORIZONTAL_GAP,
  VERTICAL_GAP,
  getChildPosition,
} from "@/lib/layout";
import { getEdgeColor } from "@/lib/variantStyles";
import type {
  BlueprintNode,
  ChildSlot,
  LogicNodeData,
  ConceptData,
} from "@/types/graph";
import type { ArgumentView } from "@/types/logic";
import {
  Edge,
  MarkerType,
  Node,
  NodeChange,
  XYPosition,
  applyNodeChanges,
} from "@xyflow/react";
import { create } from "zustand";

type LogicNode = Node<LogicNodeData>;

type ChildTemplate = {
  id: string;
  slot: ChildSlot;
  data: LogicNodeData;
};

type CruxSelection = {
  pillarTitle: string;
  title: string;
  description: string;
  methodology: string;
  equation?: string;
  cost: string;
  status: string;
};

type GraphStore = {
  nodes: LogicNode[];
  edges: Edge[];
  expandedNodes: Record<string, boolean>;
  evidenceLoadedNodes: Record<string, boolean>; // Track which pillars have evidence loaded
  selectedCrux: CruxSelection | null;
  focusTargets: string[];
  sequence: number;
  currentTopicId: string;
  currentView: ArgumentView;
  _initialized: boolean;

  // Actions
  loadInitialTopic: () => Promise<void>; // Lazy-loads topics.ts and sets initial topic
  setTopic: (topicId: string) => void;
  setView: (view: ArgumentView) => void;
  expandNode: (nodeId: string) => void;
  loadEvidence: (pillarId: string) => void; // Lazy load evidence for a pillar
  spawnConceptNode: (sourceNodeId: string, concept: ConceptData) => void;
  openCrux: (nodeId: string) => void;
  closeCrux: () => void;
  consumeFocusTargets: () => void;
  setFocusTargets: (targets: string[]) => void;
  onNodesChange: (changes: NodeChange<LogicNode>[]) => void;
};

// No initial topic loaded — topics.ts is lazy-loaded to avoid bundling 500KB
// into every page. The first render will trigger loadInitialTopic().

function mapBlueprintToData(blueprint: BlueprintNode): LogicNodeData {
  return {
    variant: blueprint.variant,
    title: blueprint.title,
    content: blueprint.content,
    subtitle: blueprint.subtitle,
    score: blueprint.score,
    detail: blueprint.detail,
    imageUrl: blueprint.imageUrl,
    references: blueprint.references,
    hasChildren: blueprint.children && blueprint.children.length > 0,
    hasEvidence: blueprint.hasEvidence,
    evidenceData: blueprint.evidenceData,
  };
}

function buildEdge(source: string, target: string, slot: ChildSlot, targetVariant?: string): Edge {
  let sourceHandle = "bottom";
  let targetHandle = "top";

  // If moving right (Logic Map), connect Right -> Left
  if (slot === "right") {
    sourceHandle = "right";
    targetHandle = "left";
  }
  // Pillars (center) use default bottom->top

  const edgeColor = getEdgeColor(targetVariant);

  return {
    id: `edge-${source}-${target}`,
    source,
    target,
    sourceHandle,
    targetHandle,
    type: "bezier",
    animated: true,
    className: "logic-edge",
    style: { stroke: edgeColor, strokeOpacity: 0.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edgeColor,
      width: 18,
      height: 18,
    },
  };
}

// Helper to get blueprint for current topic (topics must be loaded first)
function getBlueprintForTopic(topicId: string) {
  const topics = getTopicsSync();
  const moonLanding = getMoonLandingSync();
  if (!topics || !moonLanding) {
    throw new Error("Topics not loaded yet. Call loadInitialTopic() first.");
  }
  const topic = topics.find(t => t.id === topicId) ?? moonLanding;
  return generateBlueprint(topic);
}

function resolveChildTemplates(
  nodeId: string,
  parentNode: LogicNode,
  sequence: number,
  currentBlueprint: Record<string, BlueprintNode>
): { templates: ChildTemplate[]; nextSequence: number } {
  const blueprintNode = currentBlueprint[nodeId];
  if (blueprintNode?.children?.length) {
    const templates = blueprintNode.children
      .map((child) => {
        const childBlueprint = currentBlueprint[child.id];
        if (!childBlueprint) {
          return null;
        }
        return {
          id: child.id,
          slot: child.slot,
          data: mapBlueprintToData(childBlueprint),
        };
      })
      .filter(Boolean) as ChildTemplate[];
    return { templates, nextSequence: sequence };
  }

  return { templates: [], nextSequence: sequence };
}

function avoidCollisions(
  position: XYPosition,
  placedNodes: LogicNode[],
): XYPosition {
  const minX = HORIZONTAL_GAP * 0.3;
  const minY = VERTICAL_GAP * COLLISION_PADDING;
  let adjusted = { ...position };
  let guard = 0;

  const overlaps = (pos: XYPosition) =>
    placedNodes.some((node) => {
      if (!node.position) return false;
      return (
        Math.abs(node.position.x - pos.x) < minX &&
        Math.abs(node.position.y - pos.y) < minY
      );
    });

  while (overlaps(adjusted) && guard < 12) {
    adjusted = { ...adjusted, y: adjusted.y + minY };
    guard += 1;
  }

  return adjusted;
}

function createNodesFromTemplates(
  parentNode: LogicNode,
  templates: ChildTemplate[],
  existingNodes: LogicNode[],
): { nodes: LogicNode[]; edges: Edge[] } {
  return templates.reduce(
    (acc, template, index) => {
      // Need to count siblings in the same slot to calculate offset
      const siblingsInSlot = templates.filter(t => t.slot === template.slot);
      const indexInSlot = siblingsInSlot.indexOf(template);

      const position = getChildPosition(
        parentNode.position,
        template.slot,
        indexInSlot,
        siblingsInSlot.length
      );

      const adjustedPosition = avoidCollisions(
        position,
        [...existingNodes, ...acc.nodes],
      );

      acc.nodes.push({
        id: template.id,
        type: template.data.variant === "meta" ? "metaNode" : "richNode",
        position: adjustedPosition,
        data: { ...template.data, birthOrder: index },
      });
      acc.edges.push(buildEdge(parentNode.id, template.id, template.slot, template.data.variant));
      return acc;
    },
    { nodes: [] as LogicNode[], edges: [] as Edge[] },
  );
}

export const useLogicGraph = create<GraphStore>((set, get) => ({
  nodes: [],
  edges: [],
  expandedNodes: {},
  evidenceLoadedNodes: {},
  selectedCrux: null,
  focusTargets: [],
  sequence: 0,
  currentTopicId: "moon-landing",
  currentView: "logic-map" as ArgumentView,
  _initialized: false,

  loadInitialTopic: async () => {
    if (get()._initialized) return;
    const { moonLanding } = await getTopicsModule();
    const blueprint = generateBlueprint(moonLanding);
    const rootBlueprint = blueprint["root"];
    const rootNode: LogicNode = {
      id: rootBlueprint.id,
      type: "metaNode",
      position: { x: 0, y: 0 },
      data: mapBlueprintToData(rootBlueprint),
    };
    set({
      nodes: [rootNode],
      focusTargets: ["root"],
      currentTopicId: moonLanding.id,
      _initialized: true,
    });
  },

  setView: (view: ArgumentView) => set({ currentView: view }),

  setTopic: (topicId: string) => {
    // Set the topic ID immediately for UI updates
    set({ currentTopicId: topicId });

    const doSetTopic = (topicsArr: typeof import("@/data/topics").topics) => {
      const topic = topicsArr.find((t) => t.id === topicId);
      if (!topic) return;

      const newBlueprint = generateBlueprint(topic);
      const newRootBlueprint = newBlueprint["root"];

      const newRootNode: LogicNode = {
        id: newRootBlueprint.id,
        type: "metaNode",
        position: { x: 0, y: 0 },
        data: mapBlueprintToData(newRootBlueprint),
      };

      set({
        currentTopicId: topicId,
        nodes: [newRootNode],
        edges: [],
        expandedNodes: {},
        evidenceLoadedNodes: {},
        selectedCrux: null,
        focusTargets: ["root"],
        sequence: 0,
        _initialized: true,
      });
    };

    const topics = getTopicsSync();
    if (topics) {
      doSetTopic(topics);
    } else {
      // Topics not loaded yet — load them first
      getTopicsModule().then(({ topics: t }) => doSetTopic(t));
    }
  },

  expandNode: (nodeId: string) => {
    const { expandedNodes, nodes, edges, sequence, currentTopicId } = get();
    if (expandedNodes[nodeId]) return;

    const parentNode = nodes.find((node) => node.id === nodeId);
    if (!parentNode) return;

    // Get the blueprint for the current active topic
    const currentBlueprint = getBlueprintForTopic(currentTopicId);

    const { templates, nextSequence } = resolveChildTemplates(
      nodeId,
      parentNode,
      sequence,
      currentBlueprint
    );

    if (!templates.length) return;

    const { nodes: childNodes, edges: childEdges } = createNodesFromTemplates(
      parentNode,
      templates,
      nodes,
    );

    set({
      nodes: [...nodes, ...childNodes],
      edges: [...edges, ...childEdges],
      expandedNodes: { ...expandedNodes, [nodeId]: true },
      focusTargets: childNodes.map((node) => node.id),
      sequence: nextSequence,
    });
  },

  loadEvidence: (pillarId: string) => {
    const { evidenceLoadedNodes, nodes, edges, currentTopicId } = get();
    if (evidenceLoadedNodes[pillarId]) return;

    const topicsArr = getTopicsSync();
    if (!topicsArr) return;
    const topic = topicsArr.find((t) => t.id === currentTopicId);
    if (!topic) return;

    const pillar = topic.pillars.find((p) => p.id === pillarId);
    if (!pillar || !pillar.evidence || pillar.evidence.length === 0) return;

    const pillarNode = nodes.find((n) => n.id === pillarId);
    if (!pillarNode) return;

    const currentBlueprint = getBlueprintForTopic(currentTopicId);
    const evidenceIds = getEvidenceIdsForPillar(topic, pillarId);

    // Create evidence nodes positioned below the pillar
    const newNodes: LogicNode[] = [];
    const newEdges: Edge[] = [];

    // Split evidence by side for layout
    const forEvidence = pillar.evidence.filter((e) => e.side === "for");
    const againstEvidence = pillar.evidence.filter((e) => e.side === "against");

    // Position "for" evidence to the left-bottom, "against" to the right-bottom
    const baseY = pillarNode.position.y + 450;
    const evidenceSpacing = 300;

    forEvidence.forEach((ev, index) => {
      const evidenceId = `evidence-${ev.id}`;
      const blueprintNode = currentBlueprint[evidenceId];
      if (!blueprintNode) return;

      const position = {
        x: pillarNode.position.x - 200 - (index * evidenceSpacing * 0.3),
        y: baseY + (index * 320),
      };

      newNodes.push({
        id: evidenceId,
        type: "evidenceNode",
        position,
        data: {
          variant: "evidence",
          title: ev.title,
          description: ev.description,
          side: ev.side,
          score: blueprintNode.evidenceData?.score ?? 0,
          source: ev.source,
          sourceUrl: ev.sourceUrl,
          birthOrder: index,
        } as unknown as LogicNodeData,
      });

      newEdges.push({
        id: `edge-${pillarId}-${evidenceId}`,
        source: pillarId,
        target: evidenceId,
        sourceHandle: "bottom",
        targetHandle: "top",
        type: "bezier",
        animated: false,
        style: { stroke: "#C4613C", strokeOpacity: 0.5 },
      });
    });

    againstEvidence.forEach((ev, index) => {
      const evidenceId = `evidence-${ev.id}`;
      const blueprintNode = currentBlueprint[evidenceId];
      if (!blueprintNode) return;

      const position = {
        x: pillarNode.position.x + 200 + (index * evidenceSpacing * 0.3),
        y: baseY + (index * 320),
      };

      newNodes.push({
        id: evidenceId,
        type: "evidenceNode",
        position,
        data: {
          variant: "evidence",
          title: ev.title,
          description: ev.description,
          side: ev.side,
          score: blueprintNode.evidenceData?.score ?? 0,
          source: ev.source,
          sourceUrl: ev.sourceUrl,
          birthOrder: forEvidence.length + index,
        } as unknown as LogicNodeData,
      });

      newEdges.push({
        id: `edge-${pillarId}-${evidenceId}`,
        source: pillarId,
        target: evidenceId,
        sourceHandle: "bottom",
        targetHandle: "top",
        type: "bezier",
        animated: false,
        style: { stroke: "#78716C", strokeOpacity: 0.5 },
      });
    });

    if (newNodes.length === 0) return;

    set({
      nodes: [...nodes, ...newNodes],
      edges: [...edges, ...newEdges],
      evidenceLoadedNodes: { ...evidenceLoadedNodes, [pillarId]: true },
      focusTargets: newNodes.map((n) => n.id),
    });
  },

  spawnConceptNode: (sourceNodeId: string, concept: ConceptData) => {
    const { nodes, edges } = get();

    // Check if node already exists
    const existingNode = nodes.find((n) => n.id === concept.targetId);
    if (existingNode) {
      set({ focusTargets: [concept.targetId] });
      return;
    }

    const sourceNode = nodes.find((n) => n.id === sourceNodeId);
    if (!sourceNode) return;

    // Calculate position: Right + ~400px, with slight random Y offset
    const randomOffset = Math.random() * 100 - 50;
    const position = {
      x: sourceNode.position.x + 400,
      y: sourceNode.position.y + randomOffset,
    };

    const newNode: LogicNode = {
      id: concept.targetId,
      type: "richNode",
      position,
      data: {
        variant: "pillar", // Default to pillar style for concepts
        title: concept.title,
        content: concept.description,
        subtitle: "Context",
      },
    };

    const newEdge: Edge = {
      id: `edge-${sourceNodeId}-${concept.targetId}`,
      source: sourceNodeId,
      target: concept.targetId,
      sourceHandle: 'right', // Concepts branch to right
      targetHandle: 'left',
      type: "bezier",
      animated: false,
      style: { strokeDasharray: "5,5", stroke: "#B0B0B0" }, // Dotted line for definitions
    };

    set({
      nodes: [...nodes, newNode],
      edges: [...edges, newEdge],
      focusTargets: [concept.targetId],
    });
  },

  openCrux: (nodeId: string) => {
    const node = get().nodes.find((item) => item.id === nodeId);
    if (!node) return;
    const data = node.data as LogicNodeData;
    if (!data.detail) return;

    set({
      selectedCrux: {
        pillarTitle: data.subtitle ?? data.title,
        title: data.title,
        description: data.detail.description,
        methodology: data.detail.methodology,
        equation: data.detail.equation,
        cost: data.detail.cost,
        status: data.detail.status,
      },
    });
  },

  closeCrux: () => set({ selectedCrux: null }),

  consumeFocusTargets: () => set({ focusTargets: [] }),

  setFocusTargets: (targets: string[]) => set({ focusTargets: targets }),

  onNodesChange: (changes: NodeChange<LogicNode>[]) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
}));
