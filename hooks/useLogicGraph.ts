"use client";

import { generateBlueprint } from "@/data/logicBlueprint";
import { hasTopicLoader, loadTopicById } from "@/data/topicLoader";
import { trackEvent } from "@/lib/analytics";
import type { Topic } from "@/lib/schemas/topic";

const FALLBACK_TOPIC_ID = "moon-landing";
const loadedTopics = new Map<string, Topic>();
let selectionGeneration = 0;

async function loadAndRememberTopic(topicId: string): Promise<Topic | null> {
  const existing = loadedTopics.get(topicId);
  if (existing) return existing;
  const topic = await loadTopicById(topicId);
  if (topic) loadedTopics.set(topic.id, topic);
  return topic;
}

/**
 * Public synchronous access for lazy-loaded components (DebateView,
 * ScalesOfEvidence, etc.). Only individually requested topics are retained.
 */
export function getLoadedTopics() {
  return Array.from(loadedTopics.values());
}
import {
  COLLISION_HORIZONTAL_GAP,
  COLLISION_PADDING,
  VERTICAL_GAP,
  getChildPosition,
  getRootChildPosition,
} from "@/lib/layout";
import { getEdgeColor } from "@/lib/variantStyles";
import type {
  BlueprintNode,
  ChildSlot,
  LogicNodeData,
  ConceptData,
} from "@/types/graph";
import type { ArgumentView } from "@/types/logic";
import type {
  Edge,
  MarkerType,
  Node,
  XYPosition,
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
  loadInitialTopic: () => Promise<void>; // Loads only the default topic module
  setTopic: (topicId: string) => void;
  setView: (view: ArgumentView) => void;
  expandNode: (nodeId: string) => void;
  collapseNode: (nodeId: string) => void; // Remove a node's descendants; re-enables Explore
  loadEvidence: (pillarId: string) => void; // Lazy load evidence for a pillar
  spawnConceptNode: (sourceNodeId: string, concept: ConceptData) => void;
  openCrux: (nodeId: string) => void;
  closeCrux: () => void;
  consumeFocusTargets: () => void;
  setFocusTargets: (targets: string[]) => void;
};

// No initial topic is loaded until the graph is opened or a topic is selected.

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

/**
 * Whether edge "marching ants" dash animation should be enabled.
 * Respects the user's prefers-reduced-motion setting. React Flow drives the
 * dash animation via JS/SVG, so the CSS catch-all alone cannot stop it — we
 * must gate the `animated` flag at edge-build time.
 * Defaults to animated on the server (no matchMedia) so SSR markup matches the
 * motion-OK client; edges are (re)built on the client at expand time.
 */
function shouldAnimateEdges(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    animated: shouldAnimateEdges(),
    className: "logic-edge",
    style: { stroke: edgeColor, strokeOpacity: 0.5 },
    markerEnd: {
      type: "arrowclosed" as MarkerType,
      color: edgeColor,
      width: 18,
      height: 18,
    },
  };
}

// Helper to get a blueprint from the small in-memory loaded-topic cache.
function getBlueprintForTopic(topicId: string) {
  const topic =
    loadedTopics.get(topicId) ?? loadedTopics.get(FALLBACK_TOPIC_ID);
  if (!topic) {
    throw new Error("Topic not loaded yet. Load it before using graph actions.");
  }
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
  const minX = COLLISION_HORIZONTAL_GAP;
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

      const position = (parentNode.id === "root"
        ? getRootChildPosition
        : getChildPosition)(
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
    const generationAtStart = selectionGeneration;
    const moonLanding = await loadAndRememberTopic(FALLBACK_TOPIC_ID);
    if (
      !moonLanding ||
      get()._initialized ||
      get().currentTopicId !== FALLBACK_TOPIC_ID ||
      selectionGeneration !== generationAtStart
    ) {
      return;
    }
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
    // Auto-expand the root so the first canvas paint shows the pillar tree,
    // not a lone node on an empty grid (the biggest first-impression dead zone).
    get().expandNode("root");
  },

  setView: (view: ArgumentView) => set({ currentView: view }),

  setTopic: (topicId: string) => {
    const requestGeneration = ++selectionGeneration;
    const requestedTopicId = hasTopicLoader(topicId)
      ? topicId
      : FALLBACK_TOPIC_ID;

    // Set the validated ID immediately for selection/loading UI. Unknown IDs
    // resolve to the safe default and never trigger a broad corpus import.
    set({ currentTopicId: requestedTopicId });

    const doSetTopic = (topic: Topic) => {
      // A later selection won while this module was loading.
      if (
        get().currentTopicId !== topic.id ||
        selectionGeneration !== requestGeneration
      ) {
        return;
      }

      const newBlueprint = generateBlueprint(topic);
      const newRootBlueprint = newBlueprint["root"];

      const newRootNode: LogicNode = {
        id: newRootBlueprint.id,
        type: "metaNode",
        position: { x: 0, y: 0 },
        data: mapBlueprintToData(newRootBlueprint),
      };

      set({
        currentTopicId: topic.id,
        nodes: [newRootNode],
        edges: [],
        expandedNodes: {},
        evidenceLoadedNodes: {},
        selectedCrux: null,
        focusTargets: ["root"],
        sequence: 0,
        _initialized: true,
      });
      // Auto-expand the root so clicking a topic lands on a populated pillar
      // tree instead of a single lonely node.
      get().expandNode("root");
    };

    const loaded = loadedTopics.get(requestedTopicId);
    if (loaded) {
      doSetTopic(loaded);
    } else {
      void loadAndRememberTopic(requestedTopicId).then((topic) => {
        if (topic) {
          doSetTopic(topic);
        } else if (requestedTopicId !== FALLBACK_TOPIC_ID) {
          get().setTopic(FALLBACK_TOPIC_ID);
        }
      });
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

    // Funnel: a node expansion is the core "interacted with the map" signal.
    // Guarded above by the early `if (expandedNodes[nodeId]) return`, so this
    // fires at most once per node per session.
    trackEvent({
      action: "node_expand",
      topicId: currentTopicId ?? "unknown",
      nodeId,
    });
  },

  collapseNode: (nodeId: string) => {
    const { nodes, edges, expandedNodes, evidenceLoadedNodes } = get();

    // Build a parent→children adjacency map from edges, then collect every
    // descendant of nodeId so the whole subtree (children, evidence, concepts)
    // can be removed in one pass.
    const childrenOf = new Map<string, string[]>();
    for (const e of edges) {
      const list = childrenOf.get(e.source);
      if (list) list.push(e.target);
      else childrenOf.set(e.source, [e.target]);
    }

    const toRemove = new Set<string>();
    const stack = [...(childrenOf.get(nodeId) ?? [])];
    while (stack.length) {
      const id = stack.pop()!;
      if (toRemove.has(id)) continue;
      toRemove.add(id);
      for (const child of childrenOf.get(id) ?? []) stack.push(child);
    }

    if (toRemove.size === 0) return;

    // The collapsed node itself is no longer expanded (and its evidence, if any,
    // is gone), so its Explore / Show Evidence buttons reset — drop its key plus
    // every removed descendant's key by rebuilding the maps.
    const dropped = new Set(toRemove);
    dropped.add(nodeId);
    const prune = (record: Record<string, boolean>) =>
      Object.fromEntries(
        Object.entries(record).filter(([key]) => !dropped.has(key)),
      );
    const nextExpanded = prune(expandedNodes);
    const nextEvidence = prune(evidenceLoadedNodes);

    set({
      nodes: nodes.filter((node) => !toRemove.has(node.id)),
      edges: edges.filter(
        (e) => !toRemove.has(e.source) && !toRemove.has(e.target),
      ),
      expandedNodes: nextExpanded,
      evidenceLoadedNodes: nextEvidence,
      focusTargets: [nodeId],
    });
  },

  loadEvidence: (pillarId: string) => {
    const { evidenceLoadedNodes, nodes, edges, currentTopicId } = get();
    if (evidenceLoadedNodes[pillarId]) return;

    const topic = loadedTopics.get(currentTopicId);
    if (!topic) return;

    const pillar = topic.pillars.find((p) => p.id === pillarId);
    if (!pillar || !pillar.evidence || pillar.evidence.length === 0) return;

    const pillarNode = nodes.find((n) => n.id === pillarId);
    if (!pillarNode) return;

    const currentBlueprint = getBlueprintForTopic(currentTopicId);

    const newNodes: LogicNode[] = [];
    const newEdges: Edge[] = [];

    const forEvidence = pillar.evidence.filter((e) => e.side === "for");
    const againstEvidence = pillar.evidence.filter((e) => e.side === "against");

    const baseY = pillarNode.position.y + 450;
    const evidenceSpacing = 300;

    // Shared helper to create a node + edge for one piece of evidence
    const addEvidenceNode = (
      ev: (typeof pillar.evidence)[number],
      index: number,
      birthOrderOffset: number,
      xDirection: 1 | -1,
      edgeColor: string,
    ) => {
      const evidenceId = `evidence-${ev.id}`;
      const blueprintNode = currentBlueprint[evidenceId];
      if (!blueprintNode) return;

      newNodes.push({
        id: evidenceId,
        type: "evidenceNode",
        position: {
          x: pillarNode.position.x + xDirection * (200 + index * evidenceSpacing * 0.3),
          y: baseY + index * 320,
        },
        data: {
          variant: "evidence",
          title: ev.title,
          description: ev.description,
          side: ev.side,
          score: blueprintNode.evidenceData?.score ?? 0,
          source: ev.source,
          sourceUrl: ev.sourceUrl,
          birthOrder: birthOrderOffset + index,
        } as unknown as LogicNodeData,
      });

      newEdges.push({
        id: `edge-${pillarId}-${evidenceId}`,
        source: pillarId,
        target: evidenceId,
        sourceHandle: "bottom",
        targetHandle: "top",
        animated: false,
        style: { stroke: edgeColor, strokeOpacity: 0.5 },
      });
    };

    // "for" evidence positioned left-bottom; "against" positioned right-bottom
    forEvidence.forEach((ev, i) => addEvidenceNode(ev, i, 0, -1, "#C4613C"));
    againstEvidence.forEach((ev, i) => addEvidenceNode(ev, i, forEvidence.length, 1, "#78716C"));

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
}));
