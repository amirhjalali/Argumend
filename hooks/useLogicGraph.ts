"use client";

import { moonLanding } from "@/data/topics";
import type { Pillar } from "@/types/logic";
import {
  Edge,
  MarkerType,
  Node,
  NodeChange,
  applyNodeChanges,
} from "@xyflow/react";
import { create } from "zustand";

export type MetaNodeData = {
  label: string;
  score: number;
};

export type ArgumentNodeVariant = "pillar" | "skeptic" | "proponent";

export type ArgumentNodeData = {
  pillarId: string;
  title: string;
  summary?: string;
  imageUrl?: string;
  variant: ArgumentNodeVariant;
  body?: string;
};

export type CruxNodeData = {
  pillarId: string;
  pillarTitle: string;
  title: string;
  description: string;
  methodology: string;
  equation?: string;
  status: string;
  cost: string;
};

export type LogicNodeData =
  | MetaNodeData
  | ArgumentNodeData
  | CruxNodeData;

export type LogicNode = Node<LogicNodeData>;

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
  expandRoot: () => void;
  expandPillar: (pillarId: string) => void;
  openCrux: (pillarId: string) => void;
  closeCrux: () => void;
  consumeFocusTargets: () => void;
  onNodesChange: (changes: NodeChange<LogicNodeData>[]) => void;
};

const rootNode: LogicNode = {
  id: "root",
  type: "metaNode",
  position: { x: 0, y: 0 },
  data: {
    label: moonLanding.title,
    score: moonLanding.confidence_score,
  },
};

const EDGE_STYLE: Partial<Edge> = {
  type: "smoothstep",
  animated: true,
  className: "logic-edge",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#00D9FF",
    width: 20,
    height: 20,
  },
};

const makeEdge = (source: string, target: string): Edge => ({
  id: `edge-${source}-${target}`,
  source,
  target,
  ...EDGE_STYLE,
});

const PILLAR_VERTICAL_GAP = 360;
const PILLAR_INITIAL_OFFSET = 360;

const buildPillarNode = (
  pillar: Pillar,
  index: number,
  _total: number,
): LogicNode => ({
  id: `pillar-${pillar.id}`,
  type: "argumentNode",
  position: {
    x: 0,
    y: PILLAR_INITIAL_OFFSET + index * PILLAR_VERTICAL_GAP,
  },
  data: {
    pillarId: pillar.id,
    title: pillar.title,
    summary: pillar.short_summary,
    imageUrl: pillar.image_url,
    variant: "pillar",
  },
});

const buildPillarNodes = (): LogicNode[] =>
  moonLanding.pillars.map((pillar, index) =>
    buildPillarNode(pillar, index, moonLanding.pillars.length),
  );

const branchOffset = {
  lateral: 280,
  drop: 200,
  cruxDrop: 520,
};

const buildBranchNodes = (
  pillar: Pillar,
  basePosition: { x: number; y: number },
): LogicNode[] => [
  {
    id: `pillar-${pillar.id}-skeptic`,
    type: "argumentNode",
    position: {
      x: basePosition.x - branchOffset.lateral,
      y: basePosition.y + branchOffset.drop,
    },
    data: {
      pillarId: pillar.id,
      title: "Skeptic Vector",
      variant: "skeptic",
      body: pillar.skeptic_premise,
    },
  },
  {
    id: `pillar-${pillar.id}-proponent`,
    type: "argumentNode",
    position: {
      x: basePosition.x + branchOffset.lateral,
      y: basePosition.y + branchOffset.drop,
    },
    data: {
      pillarId: pillar.id,
      title: "Proponent Response",
      variant: "proponent",
      body: pillar.proponent_rebuttal,
    },
  },
  {
    id: `pillar-${pillar.id}-crux`,
    type: "cruxNode",
    position: {
      x: basePosition.x,
      y: basePosition.y + branchOffset.cruxDrop,
    },
    data: {
      pillarId: pillar.id,
      pillarTitle: pillar.title,
      title: pillar.crux.title,
      description: pillar.crux.description,
      methodology: pillar.crux.methodology,
      equation: pillar.crux.equation,
      status: pillar.crux.verification_status,
      cost: pillar.crux.cost_to_verify,
    },
  },
];

export const useLogicGraph = create<GraphStore>((set, get) => ({
  nodes: [rootNode],
  edges: [],
  expandedNodes: {},
  selectedCrux: null,
  focusTargets: ["root"],

  expandRoot: () => {
    const { expandedNodes, nodes, edges } = get();
    if (expandedNodes.root) return;

    const pillars = buildPillarNodes();
    const pillarEdges = pillars.map((pillar) => makeEdge("root", pillar.id));

    set({
      nodes: [...nodes, ...pillars],
      edges: [...edges, ...pillarEdges],
      expandedNodes: { ...expandedNodes, root: true },
      focusTargets: ["root", ...pillars.map((pillar) => pillar.id)],
    });
  },

  expandPillar: (pillarId: string) => {
    const { expandedNodes, nodes, edges } = get();
    const nodeKey = `pillar-${pillarId}`;

    if (expandedNodes[nodeKey]) return;

    const pillarData = moonLanding.pillars.find(
      (pillar) => pillar.id === pillarId,
    );
    const pillarNode = nodes.find((node) => node.id === nodeKey);

    if (!pillarData || !pillarNode) return;

    const branchNodes = buildBranchNodes(pillarData, pillarNode.position);

    const branchEdges = [
      makeEdge(nodeKey, `pillar-${pillarId}-skeptic`),
      makeEdge(nodeKey, `pillar-${pillarId}-proponent`),
      makeEdge(`pillar-${pillarId}-skeptic`, `pillar-${pillarId}-crux`),
      makeEdge(`pillar-${pillarId}-proponent`, `pillar-${pillarId}-crux`),
    ];

    set({
      nodes: [...nodes, ...branchNodes],
      edges: [...edges, ...branchEdges],
      expandedNodes: { ...expandedNodes, [nodeKey]: true },
      focusTargets: branchNodes.map((node) => node.id),
    });
  },

  openCrux: (pillarId: string) => {
    const pillar = moonLanding.pillars.find((p) => p.id === pillarId);
    if (!pillar) return;

    set({
      selectedCrux: {
        pillarTitle: pillar.title,
        title: pillar.crux.title,
        description: pillar.crux.description,
        methodology: pillar.crux.methodology,
        equation: pillar.crux.equation,
        cost: pillar.crux.cost_to_verify,
        status: pillar.crux.verification_status,
      },
    });
  },

  closeCrux: () => set({ selectedCrux: null }),

  consumeFocusTargets: () => set({ focusTargets: [] }),

  onNodesChange: (changes: NodeChange<LogicNodeData>[]) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
}));


