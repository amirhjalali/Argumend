"use client";

import { generateBlueprint } from "@/data/logicBlueprint";
import { moonLanding, topics } from "@/data/topics";
import {
  COLLISION_PADDING,
  HORIZONTAL_GAP,
  VERTICAL_GAP,
  getChildPosition,
} from "@/lib/layout";
import type {
  BlueprintNode,
  ChildSlot,
  LogicNodeData,
  ConceptData,
} from "@/types/graph";
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
  selectedCrux: CruxSelection | null;
  focusTargets: string[];
  sequence: number;
  currentTopicId: string;

  // Actions
  setTopic: (topicId: string) => void;
  expandNode: (nodeId: string) => void;
  spawnConceptNode: (sourceNodeId: string, concept: ConceptData) => void;
  openCrux: (nodeId: string) => void;
  closeCrux: () => void;
  consumeFocusTargets: () => void;
  setFocusTargets: (targets: string[]) => void;
  onNodesChange: (changes: NodeChange<LogicNode>[]) => void;
};

const EDGE_STYLE: Partial<Edge> = {
  type: "bezier",
  animated: true,
  className: "logic-edge",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#CF7B3E", // Rich copper arrow
    width: 18,
    height: 18,
  },
};

// Initialize with Moon Landing
const initialBlueprint = generateBlueprint(moonLanding);
const rootBlueprint = initialBlueprint["root"];

const initialRootNode: LogicNode = {
  id: rootBlueprint.id,
  type: "metaNode",
  position: { x: 0, y: 0 },
  data: mapBlueprintToData(rootBlueprint),
};

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
  };
}

function buildEdge(source: string, target: string, slot: ChildSlot): Edge {
  let sourceHandle = "bottom";
  let targetHandle = "top";

  // If moving right (Logic Map), connect Right -> Left
  if (slot === "right") {
    sourceHandle = "right";
    targetHandle = "left";
  }
  // Pillars (center) use default bottom->top

  return {
    id: `edge-${source}-${target}`,
    source,
    target,
    sourceHandle,
    targetHandle,
    ...EDGE_STYLE,
  };
}

// Helper to get blueprint for current topic
function getBlueprintForTopic(topicId: string) {
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
        data: template.data,
      });
      acc.edges.push(buildEdge(parentNode.id, template.id, template.slot));
      return acc;
    },
    { nodes: [] as LogicNode[], edges: [] as Edge[] },
  );
}

export const useLogicGraph = create<GraphStore>((set, get) => ({
  nodes: [initialRootNode],
  edges: [],
  expandedNodes: {},
  selectedCrux: null,
  focusTargets: ["root"],
  sequence: 0,
  currentTopicId: moonLanding.id,

  setTopic: (topicId: string) => {
    const topic = topics.find((t) => t.id === topicId);
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
      selectedCrux: null,
      focusTargets: ["root"],
      sequence: 0,
    });
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
