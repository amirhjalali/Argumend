"use client";

import { generateBlueprint } from "@/data/logicBlueprint";
import { moonLanding, topics } from "@/data/topics";
import { getChildPosition } from "@/lib/layout";
import type {
  BlueprintNode,
  ChildSlot,
  LogicNodeData,
} from "@/types/graph";
import {
  Edge,
  MarkerType,
  Node,
  NodeChange,
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
  openCrux: (nodeId: string) => void;
  closeCrux: () => void;
  consumeFocusTargets: () => void;
  onNodesChange: (changes: NodeChange<LogicNode>[]) => void;
};

const DEFAULT_CHILD_SLOTS: ChildSlot[] = ["left", "right", "center"];

const EDGE_STYLE: Partial<Edge> = {
  type: "bezier",
  animated: true,
  className: "logic-edge",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#00D9FF",
    width: 20,
    height: 20,
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
  };
}

function buildEdge(source: string, target: string): Edge {
  return {
    id: `edge-${source}-${target}`,
    source,
    target,
    ...EDGE_STYLE,
  };
}

// Helper to get blueprint for current topic
// Note: In a real app, we might store the blueprint in state or a ref
// Here we'll regenerate it or cache it outside.
// For simplicity, let's just use a getBlueprint function that looks up the topic.
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

// ... (createNodesFromTemplates remains the same)
function createNodesFromTemplates(
  parentNode: LogicNode,
  templates: ChildTemplate[],
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

      acc.nodes.push({
        id: template.id,
        type: template.data.variant === "meta" ? "metaNode" : "richNode",
        position,
        data: template.data,
      });
      acc.edges.push(buildEdge(parentNode.id, template.id));
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
    );

    set({
      nodes: [...nodes, ...childNodes],
      edges: [...edges, ...childEdges],
      expandedNodes: { ...expandedNodes, [nodeId]: true },
      focusTargets: childNodes.map((node) => node.id),
      sequence: nextSequence,
    });
  },

  // ... (rest of actions remain same)
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

  onNodesChange: (changes: NodeChange<LogicNode>[]) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
}));

