"use client";

import { logicBlueprint } from "@/data/logicBlueprint";
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

const rootBlueprint =
  logicBlueprint["root"] ?? ({
    id: "root",
    variant: "meta",
    title: "ARGUMEND",
    subtitle: "Meta Claim",
    content: "Define a topic to begin the infinite canvas.",
    score: 0,
  } satisfies BlueprintNode);

const rootNode: LogicNode = {
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

function resolveChildTemplates(
  nodeId: string,
  parentNode: LogicNode,
  sequence: number,
): { templates: ChildTemplate[]; nextSequence: number } {
  const blueprint = logicBlueprint[nodeId];
  if (blueprint?.children?.length) {
    const templates = blueprint.children
      .map((child) => {
        const childBlueprint = logicBlueprint[child.id];
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

  // Return empty templates to prevent infinite generation
  return { templates: [], nextSequence: sequence };
}


// Fallback generation removed to prevent infinite "filler" content
// If a node has no defined children in logicBlueprint, it is a leaf node.

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
  nodes: [rootNode],
  edges: [],
  expandedNodes: {},
  selectedCrux: null,
  focusTargets: ["root"],
  sequence: 0,

  expandNode: (nodeId: string) => {
    const { expandedNodes, nodes, edges, sequence } = get();
    if (expandedNodes[nodeId]) return;

    const parentNode = nodes.find((node) => node.id === nodeId);
    if (!parentNode) return;

    const { templates, nextSequence } = resolveChildTemplates(
      nodeId,
      parentNode,
      sequence,
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

