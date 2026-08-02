import { describe, expect, it } from "vitest";
import type { Edge, Node } from "@xyflow/react";
import { getFocusFrameNodes } from "./graphViewport";
import type { LogicNodeData } from "@/types/graph";

const node = (id: string, variant: LogicNodeData["variant"]): Node<LogicNodeData> => ({
  id,
  position: { x: 0, y: 0 },
  data: { title: id, variant },
});

describe("getFocusFrameNodes", () => {
  it("frames the root and pillar backbone for the initial expansion", () => {
    const nodes = [
      node("root", "meta"),
      node("question", "question"),
      node("pillar-a", "pillar"),
      node("pillar-b", "pillar"),
    ];
    const edges: Edge[] = nodes.slice(1).map((child) => ({
      id: `root-${child.id}`,
      source: "root",
      target: child.id,
    }));

    expect(
      getFocusFrameNodes(nodes, edges, ["question", "pillar-a", "pillar-b"]).map(
        ({ id }) => id,
      ),
    ).toEqual(["root", "pillar-a", "pillar-b"]);
  });

  it("keeps the parent and all children for deeper expansions", () => {
    const nodes = [
      node("root", "meta"),
      node("pillar", "pillar"),
      node("skeptic", "skeptic"),
      node("crux", "crux"),
      node("proponent", "proponent"),
    ];
    const edges: Edge[] = nodes.slice(2).map((child) => ({
      id: `pillar-${child.id}`,
      source: "pillar",
      target: child.id,
    }));

    expect(
      getFocusFrameNodes(nodes, edges, ["skeptic", "crux", "proponent"]).map(
        ({ id }) => id,
      ),
    ).toEqual(["pillar", "skeptic", "crux", "proponent"]);
  });
});
