import type {
  ArgumentEdge,
  ArgumentGraph,
  ArgumentNode,
  EdgeType,
  EvidencePolarity,
} from "@/types/argument";

export interface ValidationIssue {
  rule: string;
  severity: "error" | "warning";
  nodeId?: string;
  edgeId?: string;
  message: string;
}

type NodeType = ArgumentNode["type"];

export const ALLOWED_EDGE_MATRIX: Record<
  Exclude<NodeType, "question">,
  Partial<Record<Exclude<NodeType, "question">, readonly EdgeType[]>>
> = {
  claim: {
    claim: ["supports", "opposes", "depends_on", "qualifies", "contradicts", "supersedes"],
    position: ["supports", "opposes"],
    inference: ["premise_of", "undercuts"],
    evidence: ["limits_scope", "qualifies"],
  },
  evidence: {
    claim: ["evidences"],
    inference: ["undercuts"],
    evidence: ["supersedes"],
  },
  inference: {
    claim: ["concludes"],
  },
  position: {
    claim: ["depends_on"],
  },
};

const CYCLE_EDGE_TYPES = new Set<EdgeType>(["premise_of", "concludes", "depends_on"]);
const ATTRIBUTION_VERB_PATTERN =
  /\b(finds?|found|reports?|reported|estimates?|estimated|says?|said|puts?|according to|shows?|showed)\b/i;
const CONJUNCTION_PATTERN = /\b(and|because)\b/i;
const STOP_WORDS = new Set([
  "and",
  "are",
  "for",
  "from",
  "has",
  "have",
  "that",
  "the",
  "then",
  "this",
  "with",
]);

export function validateArgumentGraph(graph: ArgumentGraph): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
  const edgeById = new Set<string>();

  for (const edge of graph.edges) {
    if (edgeById.has(edge.id)) {
      addIssue(issues, {
        rule: "edge-id-unique",
        severity: "error",
        edgeId: edge.id,
        message: `Duplicate edge id "${edge.id}".`,
      });
    }
    edgeById.add(edge.id);
    validateEndpointAndMatrix(edge, nodesById, issues);
  }

  validateQuestionEdgeless(graph, issues);
  validateQuestionNeutrality(graph, issues);
  validateInferenceShape(graph, nodesById, issues);
  validateRelevantCycles(graph, nodesById, issues);
  validateForbiddenSupportDependencePair(graph, issues);
  validateContradictsStorage(graph, issues);
  validateEvidenceConnectivity(graph, nodesById, issues);
  validatePositionComponents(graph, nodesById, issues);
  validatePositionDiscrimination(graph, nodesById, issues);
  validateClaimAttributions(graph, issues);
  validateWarnings(graph, nodesById, issues);

  return issues;
}

function validateQuestionNeutrality(graph: ArgumentGraph, issues: ValidationIssue[]) {
  for (const node of graph.nodes) {
    if (node.type !== "question") continue;

    if (/^why\s+(does|do|did|is|are|was|were)\b/i.test(node.statement.trim())) {
      addIssue(issues, {
        rule: "question-not-loaded",
        severity: "error",
        nodeId: node.id,
        message: "QUESTION appears loaded; use an open interrogative that does not presuppose its answer.",
      });
    }
  }
}

function validateEndpointAndMatrix(
  edge: ArgumentEdge,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  const from = nodesById.get(edge.from);
  const to = nodesById.get(edge.to);

  if (from === undefined) {
    addIssue(issues, {
      rule: "edge-endpoints-exist",
      severity: "error",
      edgeId: edge.id,
      message: `Edge "${edge.id}" references missing from node "${edge.from}".`,
    });
  }

  if (to === undefined) {
    addIssue(issues, {
      rule: "edge-endpoints-exist",
      severity: "error",
      edgeId: edge.id,
      message: `Edge "${edge.id}" references missing to node "${edge.to}".`,
    });
  }

  if (from === undefined || to === undefined) return;

  if (from.type === "question" || to.type === "question") {
    addIssue(issues, {
      rule: "edge-matrix",
      severity: "error",
      edgeId: edge.id,
      message: `Edge "${edge.type}" is illegal from ${from.type} to ${to.type}.`,
    });
    return;
  }

  const allowed = ALLOWED_EDGE_MATRIX[from.type][to.type] ?? [];
  if (!allowed.includes(edge.type)) {
    addIssue(issues, {
      rule: "edge-matrix",
      severity: "error",
      edgeId: edge.id,
      message: `Edge "${edge.type}" is illegal from ${from.type} to ${to.type}.`,
    });
  }
}

function validateQuestionEdgeless(graph: ArgumentGraph, issues: ValidationIssue[]) {
  const questionIds = new Set(
    graph.nodes.filter((node) => node.type === "question").map((node) => node.id)
  );

  for (const edge of graph.edges) {
    if (questionIds.has(edge.from) || questionIds.has(edge.to)) {
      addIssue(issues, {
        rule: "question-edgeless",
        severity: "error",
        edgeId: edge.id,
        message: "QUESTION nodes participate in no edges.",
      });
    }
  }
}

function validateInferenceShape(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  for (const node of graph.nodes) {
    if (node.type !== "inference") continue;

    const premiseCount = graph.edges.filter(
      (edge) => edge.type === "premise_of" && edge.to === node.id
    ).length;
    const conclusionCount = graph.edges.filter(
      (edge) => edge.type === "concludes" && edge.from === node.id
    ).length;

    if (premiseCount < 1) {
      addIssue(issues, {
        rule: "inference-shape",
        severity: "error",
        nodeId: node.id,
        message: "INFERENCE requires at least one incoming premise_of edge.",
      });
    }

    if (conclusionCount !== 1) {
      addIssue(issues, {
        rule: "inference-shape",
        severity: "error",
        nodeId: node.id,
        message: "INFERENCE requires exactly one outgoing concludes edge.",
      });
    }

    const invalidPremise = graph.edges.find((edge) => {
      if (edge.type !== "premise_of" || edge.to !== node.id) return false;
      return nodesById.get(edge.from)?.type !== "claim";
    });

    if (invalidPremise !== undefined) {
      addIssue(issues, {
        rule: "inference-shape",
        severity: "error",
        edgeId: invalidPremise.id,
        message: "INFERENCE premises must be CLAIM nodes.",
      });
    }
  }
}

function validateRelevantCycles(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  const adjacency = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (
      !CYCLE_EDGE_TYPES.has(edge.type) ||
      !nodesById.has(edge.from) ||
      !nodesById.has(edge.to)
    ) {
      continue;
    }

    const next = adjacency.get(edge.from) ?? [];
    next.push(edge.to);
    adjacency.set(edge.from, next);
  }

  const state = new Map<string, "visiting" | "visited">();
  const path: string[] = [];

  const visit = (nodeId: string): boolean => {
    const current = state.get(nodeId);
    if (current === "visiting") {
      path.push(nodeId);
      return true;
    }
    if (current === "visited") return false;

    state.set(nodeId, "visiting");
    path.push(nodeId);
    for (const next of adjacency.get(nodeId) ?? []) {
      if (visit(next)) return true;
    }
    path.pop();
    state.set(nodeId, "visited");
    return false;
  };

  for (const node of graph.nodes) {
    path.length = 0;
    if (visit(node.id)) {
      addIssue(issues, {
        rule: "acyclic-reasoning",
        severity: "error",
        nodeId: node.id,
        message: "Cycle detected through premise_of/concludes/depends_on edges.",
      });
      return;
    }
  }
}

function validateForbiddenSupportDependencePair(
  graph: ArgumentGraph,
  issues: ValidationIssue[]
) {
  const supportsPairs = new Set(
    graph.edges
      .filter((edge) => edge.type === "supports")
      .map((edge) => `${edge.from}\u0000${edge.to}`)
  );

  for (const edge of graph.edges) {
    if (edge.type !== "depends_on") continue;
    if (supportsPairs.has(`${edge.to}\u0000${edge.from}`)) {
      addIssue(issues, {
        rule: "forbidden-support-dependence-pair",
        severity: "error",
        edgeId: edge.id,
        message: `Forbidden pair: ${edge.to} supports ${edge.from} coexists with ${edge.from} depends_on ${edge.to}.`,
      });
    }
  }
}

function validateContradictsStorage(graph: ArgumentGraph, issues: ValidationIssue[]) {
  const storedPairs = new Set<string>();

  for (const edge of graph.edges) {
    if (edge.type !== "contradicts") continue;

    if (edge.from >= edge.to) {
      addIssue(issues, {
        rule: "contradicts-lexicographic",
        severity: "error",
        edgeId: edge.id,
        message: "contradicts edges must be stored once with from/to in lexicographic id order.",
      });
    }

    const pair = [edge.from, edge.to].sort().join("\u0000");
    if (storedPairs.has(pair)) {
      addIssue(issues, {
        rule: "contradicts-stored-once",
        severity: "error",
        edgeId: edge.id,
        message: "Duplicate contradicts edge for the same unordered pair.",
      });
    }
    storedPairs.add(pair);
  }
}

function validateEvidenceConnectivity(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  for (const node of graph.nodes) {
    if (node.type !== "evidence") continue;

    const outgoingAnchors = graph.edges.filter(
      (edge) =>
        edge.from === node.id &&
        (edge.type === "evidences" || edge.type === "undercuts") &&
        nodesById.has(edge.to)
    );

    if (outgoingAnchors.length === 0) {
      addIssue(issues, {
        rule: "evidence-has-anchor",
        severity: "error",
        nodeId: node.id,
        message: "EVIDENCE requires at least one outgoing evidences or undercuts edge.",
      });
    }
  }
}

function validatePositionComponents(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  const connectedToPosition = nodesWeaklyConnectedToAnyPosition(graph, nodesById);

  for (const node of graph.nodes) {
    if ((node.type === "claim" || node.type === "evidence") && !connectedToPosition.has(node.id)) {
      addIssue(issues, {
        rule: "position-component-connectivity",
        severity: "error",
        nodeId: node.id,
        message: `${node.type.toUpperCase()} is not in the weakly-connected component of any POSITION.`,
      });
    }
  }
}

function nodesWeaklyConnectedToAnyPosition(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>
): Set<string> {
  const adjacency = new Map<string, string[]>();

  for (const edge of graph.edges) {
    if (!nodesById.has(edge.from) || !nodesById.has(edge.to)) continue;

    const fromNext = adjacency.get(edge.from) ?? [];
    fromNext.push(edge.to);
    adjacency.set(edge.from, fromNext);

    const toNext = adjacency.get(edge.to) ?? [];
    toNext.push(edge.from);
    adjacency.set(edge.to, toNext);
  }

  const connected = new Set<string>();
  const queue = graph.nodes
    .filter((node) => node.type === "position")
    .map((node) => node.id);

  for (const id of queue) connected.add(id);

  while (queue.length > 0) {
    const nodeId = queue.shift();
    if (nodeId === undefined) continue;

    for (const next of adjacency.get(nodeId) ?? []) {
      if (connected.has(next)) continue;
      connected.add(next);
      queue.push(next);
    }
  }

  return connected;
}

function validatePositionDiscrimination(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  const positionIds = graph.nodes
    .filter((node) => node.type === "position")
    .map((position) => position.id);
  const reach = computeClaimPositionReach(graph, nodesById);
  const supportsByPosition = new Map<string, Set<string>>();
  const negativesByPosition = new Map<string, Set<string>>();

  for (const positionId of positionIds) {
    supportsByPosition.set(positionId, new Set());
    negativesByPosition.set(positionId, new Set());
  }

  for (const [claimId, signsByPosition] of reach) {
    for (const [positionId, signs] of signsByPosition) {
      if (signs.has(1)) supportsByPosition.get(positionId)?.add(claimId);
      if (signs.has(-1)) negativesByPosition.get(positionId)?.add(claimId);
    }
  }

  for (const positionId of positionIds) {
    const supports = supportsByPosition.get(positionId) ?? new Set();
    const negatives = negativesByPosition.get(positionId) ?? new Set();
    const otherSupports = new Set<string>();

    for (const [otherPositionId, otherSet] of supportsByPosition) {
      if (otherPositionId === positionId) continue;
      for (const claimId of otherSet) otherSupports.add(claimId);
    }

    if (supports.size === 0) {
      addIssue(issues, {
        rule: "position-has-supporting-chain",
        severity: "error",
        nodeId: positionId,
        message: "POSITION requires at least one supporting claim chain.",
      });
    }

    if (negatives.size === 0 && otherSupports.size === 0) {
      addIssue(issues, {
        rule: "position-has-opposing-claim",
        severity: "error",
        nodeId: positionId,
        message: "POSITION requires at least one opposing claim.",
      });
    }
  }

  const seenSets = new Map<string, string>();
  for (const [positionId, claimSet] of supportsByPosition) {
    const key = [...claimSet].sort().join("\u0000");
    const existingPosition = seenSets.get(key);
    if (existingPosition !== undefined) {
      addIssue(issues, {
        rule: "position-supporting-sets-differ",
        severity: "error",
        nodeId: positionId,
        message: `POSITION shares an identical supporting-claim set with "${existingPosition}".`,
      });
    } else {
      seenSets.set(key, positionId);
    }
  }
}

function computeClaimPositionReach(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>
): Map<string, Map<string, Set<1 | -1>>> {
  const adjacency = new Map<string, Array<{ to: string; sign: 1 | -1 }>>();
  const conclusionsByInference = new Map<string, string[]>();

  for (const edge of graph.edges) {
    if (edge.type === "concludes") {
      const conclusions = conclusionsByInference.get(edge.from) ?? [];
      conclusions.push(edge.to);
      conclusionsByInference.set(edge.from, conclusions);
    }
  }

  for (const edge of graph.edges) {
    if (!nodesById.has(edge.from) || !nodesById.has(edge.to)) continue;

    if (edge.type === "supports" || edge.type === "premise_of" || edge.type === "concludes") {
      addSignedAdjacency(adjacency, edge.from, edge.to, 1);
    }
    if (edge.type === "opposes") addSignedAdjacency(adjacency, edge.from, edge.to, -1);
    if (edge.type === "contradicts") {
      addSignedAdjacency(adjacency, edge.from, edge.to, -1);
      addSignedAdjacency(adjacency, edge.to, edge.from, -1);
    }
    if (edge.type === "depends_on") addSignedAdjacency(adjacency, edge.to, edge.from, 1);
    if (edge.type === "evidences") {
      const sign = evidencePolaritySign(edge.polarity);
      if (sign !== undefined) addSignedAdjacency(adjacency, edge.from, edge.to, sign);
    }
    if (edge.type === "undercuts") {
      addSignedAdjacency(adjacency, edge.from, edge.to, -1);
      for (const conclusionId of conclusionsByInference.get(edge.to) ?? []) {
        addSignedAdjacency(adjacency, edge.from, conclusionId, -1);
      }
    }
  }

  const result = new Map<string, Map<string, Set<1 | -1>>>();
  const claimIds = graph.nodes
    .filter((node) => node.type === "claim")
    .map((claim) => claim.id);
  const positionIds = new Set(
    graph.nodes.filter((node) => node.type === "position").map((position) => position.id)
  );

  for (const claimId of claimIds) {
    const positionSigns = new Map<string, Set<1 | -1>>();
    const queue: Array<{ id: string; sign: 1 | -1 }> = [{ id: claimId, sign: 1 }];
    const visited = new Set<string>([`${claimId}:1`]);

    while (queue.length > 0) {
      const current = queue.shift();
      if (current === undefined) continue;

      if (positionIds.has(current.id)) {
        const signs = positionSigns.get(current.id) ?? new Set<1 | -1>();
        signs.add(current.sign);
        positionSigns.set(current.id, signs);
        continue;
      }

      for (const next of adjacency.get(current.id) ?? []) {
        const nextSign = (current.sign * next.sign) as 1 | -1;
        const key = `${next.to}:${nextSign}`;
        if (visited.has(key)) continue;
        visited.add(key);
        queue.push({ id: next.to, sign: nextSign });
      }
    }

    result.set(claimId, positionSigns);
  }

  return result;
}

function addSignedAdjacency(
  adjacency: Map<string, Array<{ to: string; sign: 1 | -1 }>>,
  from: string,
  to: string,
  sign: 1 | -1
) {
  const next = adjacency.get(from) ?? [];
  next.push({ to, sign });
  adjacency.set(from, next);
}

function evidencePolaritySign(polarity: EvidencePolarity | undefined): 1 | -1 | undefined {
  if (polarity === "supporting") return 1;
  if (polarity === "challenging") return -1;
  return undefined;
}

function validateClaimAttributions(graph: ArgumentGraph, issues: ValidationIssue[]) {
  const gazetteer = collectSourceGazetteer(graph);

  for (const node of graph.nodes) {
    if (node.type !== "claim") continue;

    const statement = node.statement;
    const containsEtAl = /\bet al\./i.test(statement);
    const containsAttributionVerb = ATTRIBUTION_VERB_PATTERN.test(statement);
    const namesSource =
      containsAttributionVerb && gazetteer.some((sourceName) => sourceName.test(statement));

    // Heuristic by design: it catches explicit source-naming claims and tolerates
    // false negatives rather than trying full named-entity attribution.
    if (containsEtAl || namesSource) {
      addIssue(issues, {
        rule: "claim-no-source-attribution",
        severity: "error",
        nodeId: node.id,
        message: "CLAIM statement appears to contain a source attribution; use EVIDENCE for findings.",
      });
    }
  }
}

function collectSourceGazetteer(graph: ArgumentGraph): RegExp[] {
  const values = new Set<string>();

  for (const node of graph.nodes) {
    if (node.type !== "evidence") continue;
    for (const value of [node.source.institution, node.source.author]) {
      const trimmed = value?.trim();
      if (trimmed !== undefined && trimmed.length > 0) {
        values.add(trimmed);
        for (const part of trimmed.split(/[/(,;]/)) {
          const normalized = part.replace(/[)\]]/g, "").trim();
          if (normalized.length > 0) values.add(normalized);
        }
      }
    }
  }

  return [...values].map((value) => new RegExp(`\\b${escapeRegExp(value)}\\b`, "i"));
}

function validateWarnings(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  validateConjunctionWarnings(graph, issues);
  validateEvidenceBalanceWarnings(graph, nodesById, issues);
  validateDependsOnIndependenceWarnings(graph, nodesById, issues);
  validateInferenceWarnings(graph, nodesById, issues);
}

function validateConjunctionWarnings(graph: ArgumentGraph, issues: ValidationIssue[]) {
  for (const node of graph.nodes) {
    if (node.type === "claim" && CONJUNCTION_PATTERN.test(node.statement)) {
      addIssue(issues, {
        rule: "claim-atomicity-conjunction",
        severity: "warning",
        nodeId: node.id,
        message: "CLAIM may contain multiple propositions joined by and/because.",
      });
    }
  }
}

function validateEvidenceBalanceWarnings(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  const evidenceByClaim = new Map<string, ArgumentEdge[]>();

  for (const edge of graph.edges) {
    if (edge.type !== "evidences") continue;
    const from = nodesById.get(edge.from);
    const to = nodesById.get(edge.to);
    if (from?.type !== "evidence" || to?.type !== "claim") continue;

    const edges = evidenceByClaim.get(edge.to) ?? [];
    edges.push(edge);
    evidenceByClaim.set(edge.to, edges);
  }

  for (const [claimId, edges] of evidenceByClaim) {
    const byPolarity = groupBy(edges, (edge) => edge.polarity ?? "missing");
    for (const [polarity, polarityEdges] of byPolarity) {
      if (polarity !== "missing" && polarityEdges.length >= 3) {
        addIssue(issues, {
          rule: "claim-same-polarity-evidence-density",
          severity: "warning",
          nodeId: claimId,
          message: `CLAIM has ${polarityEdges.length} ${polarity} evidences edges.`,
        });
      }
    }

    const bySource = groupBy(edges, (edge) => evidenceSourceKey(nodesById.get(edge.from)));
    for (const [sourceKey, sourceEdges] of bySource) {
      if (sourceKey !== "" && sourceEdges.length >= 3) {
        addIssue(issues, {
          rule: "claim-same-source-evidence-density",
          severity: "warning",
          nodeId: claimId,
          message: `CLAIM has ${sourceEdges.length} evidences edges sharing ${sourceKey}.`,
        });
      }
    }

    const polarityByInstitution = new Map<string, Set<EvidencePolarity>>();
    for (const edge of edges) {
      const sourceKey = evidenceSourceKey(nodesById.get(edge.from));
      if (sourceKey === "" || edge.polarity === undefined) continue;
      const polarities = polarityByInstitution.get(sourceKey) ?? new Set<EvidencePolarity>();
      polarities.add(edge.polarity);
      polarityByInstitution.set(sourceKey, polarities);
    }

    for (const [sourceKey, polarities] of polarityByInstitution) {
      if (polarities.has("supporting") && polarities.has("challenging")) {
        addIssue(issues, {
          rule: "claim-mixed-polarity-same-source",
          severity: "warning",
          nodeId: claimId,
          message: `CLAIM receives supporting and challenging evidence from ${sourceKey}.`,
        });
      }
    }
  }
}

function evidenceSourceKey(node: ArgumentNode | undefined): string {
  if (node?.type !== "evidence") return "";
  return node.source.institution?.trim() || node.source.author?.trim() || "";
}

function validateDependsOnIndependenceWarnings(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  const targetsBySource = new Map<string, string[]>();
  const adjacency = new Map<string, string[]>();

  for (const edge of graph.edges) {
    if (!nodesById.has(edge.from) || !nodesById.has(edge.to)) continue;

    const next = adjacency.get(edge.from) ?? [];
    next.push(edge.to);
    adjacency.set(edge.from, next);

    if (edge.type === "depends_on") {
      const targets = targetsBySource.get(edge.from) ?? [];
      targets.push(edge.to);
      targetsBySource.set(edge.from, targets);
    }
  }

  for (const [nodeId, targets] of targetsBySource) {
    if (targets.length < 2) continue;

    for (let i = 0; i < targets.length; i += 1) {
      for (let j = i + 1; j < targets.length; j += 1) {
        if (!hasDirectedPath(targets[i], targets[j], adjacency) && !hasDirectedPath(targets[j], targets[i], adjacency)) {
          addIssue(issues, {
            rule: "depends-on-independent-targets",
            severity: "warning",
            nodeId,
            message: "Node has multiple depends_on targets with no path between them.",
          });
          return;
        }
      }
    }
  }
}

function hasDirectedPath(from: string, to: string, adjacency: Map<string, string[]>): boolean {
  const queue = [from];
  const seen = new Set<string>([from]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) continue;
    if (current === to) return true;

    for (const next of adjacency.get(current) ?? []) {
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }

  return false;
}

function validateInferenceWarnings(
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  issues: ValidationIssue[]
) {
  for (const node of graph.nodes) {
    if (node.type !== "inference") continue;

    const incomingUndercuts = graph.edges.filter(
      (edge) => edge.type === "undercuts" && edge.to === node.id
    );
    if (node.warrantImplicit && incomingUndercuts.length === 0) {
      addIssue(issues, {
        rule: "unexamined-warrant",
        severity: "warning",
        nodeId: node.id,
        message: "INFERENCE has an implicit warrant with zero incoming undercuts.",
      });
    }

    const premiseAndConclusionStatements = graph.edges
      .filter(
        (edge) =>
          (edge.type === "premise_of" && edge.to === node.id) ||
          (edge.type === "concludes" && edge.from === node.id)
      )
      .map((edge) => (edge.type === "premise_of" ? edge.from : edge.to))
      .map((nodeId) => nodesById.get(nodeId)?.statement ?? "")
      .join(" ");

    if (tokenOverlap(node.warrant, premiseAndConclusionStatements) > 0.8) {
      addIssue(issues, {
        rule: "warrant-adequacy",
        severity: "warning",
        nodeId: node.id,
        message: "Warrant may be restated premises rather than a licensing principle.",
      });
    }
  }
}

function tokenOverlap(warrant: string, premiseAndConclusionText: string): number {
  const warrantTokens = tokenize(warrant);
  const bodyTokens = new Set(tokenize(premiseAndConclusionText));
  if (warrantTokens.length === 0) return 0;

  const overlap = warrantTokens.filter((token) => bodyTokens.has(token)).length;
  return overlap / warrantTokens.length;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.filter((token) => token.length > 2 && !STOP_WORDS.has(token)) ?? [];
}

function groupBy<T>(items: T[], keyFor: (item: T) => string): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFor(item);
    const group = grouped.get(key) ?? [];
    group.push(item);
    grouped.set(key, group);
  }
  return grouped;
}

function addIssue(issues: ValidationIssue[], issue: ValidationIssue) {
  issues.push(issue);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
