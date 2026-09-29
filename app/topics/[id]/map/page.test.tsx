import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import TopicDiagramPage, { generateMetadata, generateStaticParams } from "./page";
import type { DiagramModel } from "@/lib/diagram/model";

const params = (id: string) => ({ params: Promise.resolve({ id }) });

describe("/topics/[id]/map — the diagram route", () => {
  it("is not indexed and points search engines at the topic page", async () => {
    const metadata = await generateMetadata(params("climate-change"));
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(metadata.alternates?.canonical).toBe("https://argumend.org/topics/climate-change");
  });

  it("exists for legacy maps only; debate maps have no diagram", async () => {
    const ids = generateStaticParams().map((p) => p.id);
    expect(ids).toContain("nuclear-energy-safety");
    expect(ids).not.toContain("ai-mass-unemployment");
    await expect(TopicDiagramPage(params("ai-mass-unemployment"))).rejects.toThrow("NEXT_NOT_FOUND");
    await expect(TopicDiagramPage(params("definitely-missing"))).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("hands the diagram a model built on the server from the map's own data", async () => {
    const page = await TopicDiagramPage(params("nuclear-energy-safety"));
    const diagram = (page.props.children as { props: { diagram: DiagramModel } }).props.diagram;
    expect(diagram.topicId).toBe("nuclear-energy-safety");
    expect(diagram.nodes[0].kind).toBe("question");
    expect(diagram.nodes.some((n) => n.kind === "crux")).toBe(true);
  });
});
