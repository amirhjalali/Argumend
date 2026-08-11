import type { InfluenceGraph } from "./influence";

export interface PropagationResult {
  activations: Map<string, number>;
  iterations: number;
  converged: boolean;
  cycleWarnings: string[];
}

const DEFAULT_LAMBDA = 0.8;
const TEMPERATURE = 1;
const MAX_ITERATIONS = 40;
const CONVERGENCE_DELTA = 0.001;

export function propagate(
  ig: InfluenceGraph,
  clamps: Map<string, number> = new Map()
): PropagationResult {
  const cycleNodeSets = stronglyConnectedComponents(ig).filter(
    (component) =>
      component.length > 1 ||
      ig.edges.some((edge) => edge.from === component[0] && edge.to === component[0])
  );
  const first = iterate(ig, clamps, DEFAULT_LAMBDA, cycleNodeSets);

  if (!first.needsCycleDamping) {
    return {
      activations: first.activations,
      iterations: first.iterations,
      converged: first.converged,
      cycleWarnings: [],
    };
  }

  const second = iterate(ig, clamps, DEFAULT_LAMBDA / 2, cycleNodeSets);
  return {
    activations: second.activations,
    iterations: first.iterations + second.iterations,
    converged: second.converged,
    cycleWarnings: cycleNodeSets.map(
      (component) => `Cycle damping applied to ${component.sort().join(", ")}.`
    ),
  };
}

interface IterationResult {
  activations: Map<string, number>;
  iterations: number;
  converged: boolean;
  needsCycleDamping: boolean;
}

function iterate(
  ig: InfluenceGraph,
  clamps: Map<string, number>,
  lambda: number,
  cycleNodeSets: string[][]
): IterationResult {
  let activations = new Map(
    ig.nodes.map((node) => [node.id, clamps.get(node.id) ?? Math.tanh(node.baseActivation)])
  );
  const incoming = incomingEdgesByTarget(ig);
  const signFlipsByNode = new Map<string, number>();
  let previousSigns = signsFor(activations);

  for (let iteration = 1; iteration <= MAX_ITERATIONS; iteration += 1) {
    const next = new Map<string, number>();
    let maxDelta = 0;

    for (const node of ig.nodes) {
      const clamp = clamps.get(node.id);
      const value =
        clamp ??
        Math.tanh(
          (node.baseActivation +
            lambda *
              (incoming.get(node.id) ?? []).reduce(
                (sum, edge) => sum + edge.weight * (activations.get(edge.from) ?? 0),
                0
              )) /
            TEMPERATURE
        );

      next.set(node.id, value);
      maxDelta = Math.max(maxDelta, Math.abs(value - (activations.get(node.id) ?? 0)));
    }

    const nextSigns = signsFor(next);
    for (const [nodeId, sign] of nextSigns) {
      const previousSign = previousSigns.get(nodeId) ?? 0;
      if (sign !== 0 && previousSign !== 0 && sign !== previousSign) {
        signFlipsByNode.set(nodeId, (signFlipsByNode.get(nodeId) ?? 0) + 1);
      }
    }

    activations = next;
    previousSigns = nextSigns;

    if (maxDelta < CONVERGENCE_DELTA) {
      return { activations, iterations: iteration, converged: true, needsCycleDamping: false };
    }
  }

  const cyclicOscillation = cycleNodeSets.some((component) =>
    component.some((nodeId) => (signFlipsByNode.get(nodeId) ?? 0) >= 2)
  );

  return {
    activations,
    iterations: MAX_ITERATIONS,
    converged: false,
    needsCycleDamping: cycleNodeSets.length > 0 && cyclicOscillation,
  };
}

function incomingEdgesByTarget(ig: InfluenceGraph) {
  const incoming = new Map<string, typeof ig.edges>();
  for (const edge of ig.edges) {
    incoming.set(edge.to, [...(incoming.get(edge.to) ?? []), edge]);
  }
  return incoming;
}

function signsFor(values: Map<string, number>): Map<string, number> {
  return new Map(
    [...values].map(([nodeId, value]) => [nodeId, Math.abs(value) < 0.0001 ? 0 : Math.sign(value)])
  );
}

function stronglyConnectedComponents(ig: InfluenceGraph): string[][] {
  const adjacency = new Map<string, string[]>();
  for (const node of ig.nodes) adjacency.set(node.id, []);
  for (const edge of ig.edges) adjacency.set(edge.from, [...(adjacency.get(edge.from) ?? []), edge.to]);

  let index = 0;
  const stack: string[] = [];
  const onStack = new Set<string>();
  const indexByNode = new Map<string, number>();
  const lowlinkByNode = new Map<string, number>();
  const components: string[][] = [];

  function connect(nodeId: string): void {
    indexByNode.set(nodeId, index);
    lowlinkByNode.set(nodeId, index);
    index += 1;
    stack.push(nodeId);
    onStack.add(nodeId);

    for (const next of adjacency.get(nodeId) ?? []) {
      if (!indexByNode.has(next)) {
        connect(next);
        lowlinkByNode.set(
          nodeId,
          Math.min(lowlinkByNode.get(nodeId) ?? 0, lowlinkByNode.get(next) ?? 0)
        );
      } else if (onStack.has(next)) {
        lowlinkByNode.set(
          nodeId,
          Math.min(lowlinkByNode.get(nodeId) ?? 0, indexByNode.get(next) ?? 0)
        );
      }
    }

    if (lowlinkByNode.get(nodeId) === indexByNode.get(nodeId)) {
      const component: string[] = [];
      let next: string | undefined;
      do {
        next = stack.pop();
        if (next !== undefined) {
          onStack.delete(next);
          component.push(next);
        }
      } while (next !== undefined && next !== nodeId);
      components.push(component);
    }
  }

  for (const node of ig.nodes) {
    if (!indexByNode.has(node.id)) connect(node.id);
  }

  return components;
}
