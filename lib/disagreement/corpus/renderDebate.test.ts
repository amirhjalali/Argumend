import { describe, expect, it } from "vitest";
import { renderDebateFromGraph } from "./renderDebate";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import { workedExampleGraph } from "@/lib/argument/fixtures";
import type {
  ArgumentEdge,
  ArgumentGraph,
  Claim,
  EdgeType,
  EpistemicType,
  Position,
  Question,
} from "@/types/argument";
import capitalismAfterAiDraft from "@/data/topics/drafts/capitalism-after-ai.draft.json";

const PROVENANCE = { origin: "curator" as const };
const CREATED_AT = "2026-08-11T00:00:00.000Z";

function makeQuestion(id: string, statement: string): Question {
  return {
    id,
    type: "question",
    statement,
    provenance: PROVENANCE,
    createdAt: CREATED_AT,
    modelVersion: 2,
  };
}

function makePosition(id: string, label: string, statement: string, displayRank: number): Position {
  return {
    id,
    type: "position",
    label,
    statement,
    constituency: "test constituency",
    steelmanBasis: "test steelman basis",
    displayRank,
    provenance: PROVENANCE,
    createdAt: CREATED_AT,
    modelVersion: 2,
  };
}

function makeClaim(id: string, statement: string, epistemicType: EpistemicType = "empirical"): Claim {
  return {
    id,
    type: "claim",
    statement,
    epistemicType,
    status: "contested",
    statusBasis: "test status basis",
    provenance: PROVENANCE,
    createdAt: CREATED_AT,
    modelVersion: 2,
  };
}

function makeEdge(id: string, from: string, to: string, type: EdgeType): ArgumentEdge {
  return { id, from, to, type };
}

function buildGraph(
  topicId: string,
  positions: Position[],
  claims: Claim[],
  edges: ArgumentEdge[],
): ArgumentGraph {
  const question = makeQuestion(`q-${topicId}`, `Question about ${topicId}?`);
  return {
    topicId,
    modelVersion: 2,
    question,
    nodes: [question, ...positions, ...claims],
    edges,
  };
}

/** A graph with enough body content to make truncation meaningfully exercised. */
function longGraph(): ArgumentGraph {
  const positions = Array.from({ length: 5 }, (_, i) =>
    makePosition(
      `p-${i}`,
      `Label ${i}`,
      `This is a fairly long opening statement for position number ${i} that describes its overall stance on the topic in real detail.`,
      i + 1,
    ),
  );
  const claims: Claim[] = [];
  const edges: ArgumentEdge[] = [];
  positions.forEach((position, i) => {
    for (let j = 0; j < 3; j += 1) {
      const claimId = `c-${i}-${j}`;
      claims.push(
        makeClaim(
          claimId,
          `This is supporting claim number ${j} for position ${i}, spelled out with enough words to add real length to the transcript body.`,
        ),
      );
      edges.push(makeEdge(`edge-${i}-${j}`, position.id, claimId, "depends_on"));
    }
    const objectionId = `c-obj-${i}`;
    claims.push(
      makeClaim(
        objectionId,
        `This is the strongest objection raised against position ${i}, described in enough detail that it actually matters to the case.`,
      ),
    );
    edges.push(makeEdge(`edge-obj-${i}`, objectionId, position.id, "opposes"));
  });
  return buildGraph("long", positions, claims, edges);
}

describe("renderDebateFromGraph", () => {
  it("assigns one speaker per position and voices each position's statement", () => {
    const positions = [
      makePosition("p-alpha", "Alpha label", "Statement alpha content for the first position.", 1),
      makePosition("p-beta", "Beta label", "Statement beta content for the second position.", 2),
      makePosition("p-gamma", "Gamma label", "Statement gamma content for the third position.", 3),
    ];
    const graph = buildGraph("one-speaker", positions, [], []);
    const rendered = renderDebateFromGraph(graph);

    const lines = rendered.source.split("\n");
    const openingLines = lines.slice(0, positions.length);
    const speakerNames = openingLines.map((line) => line.split(":")[0]);
    expect(new Set(speakerNames).size).toBe(positions.length);

    for (const position of positions) {
      expect(rendered.source).toContain(position.statement);
    }
  });

  it("does not leak position labels, node ids, or the word crux into the transcript", () => {
    const positions = [
      makePosition("p-secret-alpha", "SECRET-LABEL-ALPHA", "The first camp thinks the plan works.", 1),
      makePosition("p-secret-beta", "SECRET-LABEL-BETA", "The second camp thinks the plan fails.", 2),
    ];
    const claims = [makeClaim("c-secret-claim", "A key fact everyone should weigh is the total cost.")];
    const edges = [makeEdge("e1", "p-secret-alpha", "c-secret-claim", "depends_on")];
    const graph = buildGraph("neutral", positions, claims, edges);
    const rendered = renderDebateFromGraph(graph);

    for (const position of positions) {
      expect(rendered.source).not.toContain(position.id);
      expect(rendered.source).not.toContain(position.label);
    }
    expect(rendered.source).not.toContain("c-secret-claim");
    expect(rendered.source.toLowerCase()).not.toContain("crux");
  });

  it("renders positions in displayRank order regardless of node array order", () => {
    const positions = [
      makePosition("p-third", "Third", "Statement for the third-ranked position.", 3),
      makePosition("p-first", "First", "Statement for the first-ranked position.", 1),
      makePosition("p-second", "Second", "Statement for the second-ranked position.", 2),
    ];
    const graph = buildGraph("order", positions, [], []);
    const rendered = renderDebateFromGraph(graph);

    const idxFirst = rendered.source.indexOf("Statement for the first-ranked position.");
    const idxSecond = rendered.source.indexOf("Statement for the second-ranked position.");
    const idxThird = rendered.source.indexOf("Statement for the third-ranked position.");

    expect(idxFirst).toBeGreaterThanOrEqual(0);
    expect(idxFirst).toBeLessThan(idxSecond);
    expect(idxSecond).toBeLessThan(idxThird);
    expect(rendered.truth.positionIds).toEqual(["p-first", "p-second", "p-third"]);
  });

  it("voices claims a position depends_on in that position's own speaker turn", () => {
    const positions = [
      makePosition("p-a", "A", "Position A statement.", 1),
      makePosition("p-b", "B", "Position B statement.", 2),
    ];
    const claims = [makeClaim("c-dep", "The dependent claim statement content.")];
    const edges = [makeEdge("e1", "p-a", "c-dep", "depends_on")];
    const graph = buildGraph("depends", positions, claims, edges);
    const rendered = renderDebateFromGraph(graph);

    const speakerA = rendered.source.split("\n")[0].split(":")[0];
    expect(rendered.source).toContain(`${speakerA}: The dependent claim statement content.`);
  });

  it("produces a rebuttal turn for a claim that opposes a position", () => {
    const positions = [
      makePosition("p-a", "A", "Position A statement.", 1),
      makePosition("p-b", "B", "Position B statement.", 2),
    ];
    const claims = [makeClaim("c-obj", "The objection points to a real weakness.")];
    const edges = [makeEdge("e1", "c-obj", "p-a", "opposes")];
    const graph = buildGraph("rebuttal", positions, claims, edges);
    const rendered = renderDebateFromGraph(graph);

    const speakerA = rendered.source.split("\n")[0].split(":")[0];
    expect(rendered.source).toContain(
      `${speakerA}: I know the reply is that The objection points to a real weakness. I do not think that settles it.`,
    );
  });

  it("produces a rebuttal turn for a claim that undercuts a position", () => {
    const positions = [
      makePosition("p-a", "A", "Position A statement.", 1),
      makePosition("p-b", "B", "Position B statement.", 2),
    ];
    const claims = [makeClaim("c-undercut", "The mechanism does not hold the way it is claimed.")];
    const edges = [makeEdge("e1", "c-undercut", "p-b", "undercuts")];
    const graph = buildGraph("undercut", positions, claims, edges);
    const rendered = renderDebateFromGraph(graph);

    const speakerB = rendered.source.split("\n")[1].split(":")[0];
    expect(rendered.source).toContain(
      `${speakerB}: I know the reply is that The mechanism does not hold the way it is claimed. I do not think that settles it.`,
    );
  });

  it("limits supporting claims per speaker via claimsPerSpeaker", () => {
    const positions = [
      makePosition("p-a", "A", "Position A statement.", 1),
      makePosition("p-b", "B", "Position B statement.", 2),
    ];
    const claims = [
      makeClaim("c-1", "First supporting claim content here."),
      makeClaim("c-2", "Second supporting claim content here."),
      makeClaim("c-3", "Third supporting claim content here."),
    ];
    const edges = [
      makeEdge("e1", "p-a", "c-1", "depends_on"),
      makeEdge("e2", "p-a", "c-2", "depends_on"),
      makeEdge("e3", "p-a", "c-3", "depends_on"),
    ];
    const graph = buildGraph("limit", positions, claims, edges);
    const rendered = renderDebateFromGraph(graph, { claimsPerSpeaker: 1 });

    // The cap governs ordinary supporting claims only. Crux claims are always
    // voiced, because a transcript missing the answer key would measure the
    // renderer rather than the pipeline.
    const spoken = claims.filter((claim) => rendered.source.includes(claim.statement));
    const cruxCount = rendered.truth.cruxStatements.length;
    expect(spoken.length).toBeLessThanOrEqual(cruxCount + 1);
    expect(spoken.length).toBeGreaterThanOrEqual(1);
  });

  it("always voices every crux claim so the answer key is present in the input", () => {
    const positions = [
      makePosition("p-a", "A", "Position A statement.", 1),
      makePosition("p-b", "B", "Position B statement.", 2),
    ];
    const claims = [
      makeClaim("c-1", "First supporting claim content here."),
      makeClaim("c-2", "Second supporting claim content here."),
      makeClaim("c-3", "Third supporting claim content here."),
    ];
    const edges = [
      makeEdge("e1", "p-a", "c-1", "depends_on"),
      makeEdge("e2", "p-a", "c-2", "depends_on"),
      makeEdge("e3", "p-a", "c-3", "depends_on"),
    ];
    const graph = buildGraph("crux-present", positions, claims, edges);
    const rendered = renderDebateFromGraph(graph, { claimsPerSpeaker: 0 });

    for (const statement of rendered.truth.cruxStatements) {
      expect(rendered.source).toContain(statement);
    }
  });

  it("truncates at maxCharacters without leaving a dangling partial line", () => {
    const graph = longGraph();
    const full = renderDebateFromGraph(graph, { maxCharacters: 1_000_000 });
    expect(full.source.length).toBeGreaterThan(500);

    const target = full.source.length - 30;
    const truncated = renderDebateFromGraph(graph, { maxCharacters: target });

    expect(truncated.source.length).toBeLessThanOrEqual(target);
    expect(truncated.source.length).toBeLessThan(full.source.length);
    expect(full.source.startsWith(truncated.source)).toBe(true);

    const nextChar = full.source.charAt(truncated.source.length);
    // Either truncation exactly matched a line boundary, or the character
    // immediately following the kept text is the newline that started the
    // dropped, partial line -- never a mid-word cut left dangling.
    expect(nextChar === "\n" || truncated.source.length === full.source.length).toBe(true);
  });

  it("throws when the graph has fewer than two positions", () => {
    const positions = [makePosition("p-only", "Only", "The only position statement.", 1)];
    const graph = buildGraph("solo", positions, [], []);
    expect(() => renderDebateFromGraph(graph)).toThrow(/fewer than two positions/i);
  });

  it("throws when positions outnumber available speaker names", () => {
    const positions = [
      makePosition("p-a", "A", "Position A statement.", 1),
      makePosition("p-b", "B", "Position B statement.", 2),
    ];
    const graph = buildGraph("names", positions, [], []);
    expect(() => renderDebateFromGraph(graph, { speakerNames: ["OnlyOne"] })).toThrow(
      /more positions than available speaker names/i,
    );
  });

  it("computes ground truth that matches the source graph", () => {
    const graph = workedExampleGraph();
    const rendered = renderDebateFromGraph(graph);

    const positions = graph.nodes
      .filter((node): node is Position => node.type === "position")
      .sort((a, b) => a.displayRank - b.displayRank);

    expect(rendered.truth.positionCount).toBe(positions.length);
    expect(rendered.truth.positionIds).toEqual(positions.map((p) => p.id));
    expect(rendered.truth.positionStatements).toEqual(positions.map((p) => p.statement));

    const claimsById = new Map(
      graph.nodes.filter((node): node is Claim => node.type === "claim").map((c) => [c.id, c]),
    );

    expect(rendered.truth.cruxClaimIds.length).toBeGreaterThan(0);
    for (const id of rendered.truth.cruxClaimIds) {
      expect(claimsById.has(id)).toBe(true);
    }
    expect(rendered.truth.cruxStatements.length).toBe(rendered.truth.cruxClaimIds.length);
    expect(rendered.truth.cruxEpistemicTypes.length).toBe(rendered.truth.cruxStatements.length);

    rendered.truth.cruxClaimIds.forEach((id, index) => {
      const claim = claimsById.get(id);
      expect(claim).toBeDefined();
      expect(rendered.truth.cruxStatements[index]).toBe(claim?.statement);
      expect(rendered.truth.cruxEpistemicTypes[index]).toBe(claim?.epistemicType);
    });
  });

  it("renders the real capitalism-after-ai draft without throwing", () => {
    const parsed = parseArgumentGraph(capitalismAfterAiDraft);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const rendered = renderDebateFromGraph(parsed.graph);

    expect(rendered.truth.positionCount).toBeGreaterThan(2);
    expect(rendered.source.length).toBeGreaterThanOrEqual(400);
  });
});
