import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { AppShell } from "@/components/AppShell";
import { buildDiagram } from "@/lib/diagram/model";
import { TopicDiagram } from "./TopicDiagram";
import { mapDisplayTitle } from "@/lib/mapNaming";

/**
 * The diagram of a legacy map: the topic page's question, cruxes, sides and
 * evidence drawn as one tree (lib/diagram/model.ts builds it from the page's
 * own model). Desktop gets the React Flow canvas, phones the same tree as an
 * outline. No Scales tab, no Debate tab, no balance ring, no scores.
 *
 * New-model (ArgumentGraph) maps have no diagram; their page is the outline.
 * Not indexed: the topic page is the canonical reading of the same map.
 */

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return topicSummaries.map((topic) => ({ id: topic.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const topic = topicSummaries.find((t) => t.id === id);
  if (!topic) return { title: "Topic Not Found" };
  return {
    title: `${mapDisplayTitle(topic)} — Diagram`,
    description: `The argument map for “${mapDisplayTitle(topic)}” as an interactive diagram.`,
    robots: { index: false, follow: true },
    alternates: { canonical: `https://argumend.org/topics/${topic.id}` },
  };
}

export default async function TopicDiagramPage({ params }: PageProps) {
  const { id } = await params;
  const summary = topicSummaries.find((t) => t.id === id);
  if (!summary) notFound();
  const topic = await loadTopicById(summary.id);
  if (!topic) notFound();

  return (
    <AppShell layout="reading">
      <TopicDiagram diagram={buildDiagram(topic)} />
    </AppShell>
  );
}
