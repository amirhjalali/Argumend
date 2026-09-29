import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topicSummaries } from "@/data/topicIndex";
import { AppShell } from "@/components/AppShell";
import { TopicDiagram } from "./TopicDiagram";

/**
 * The diagram of a legacy map: the interactive logic map (claim → pillars →
 * tests) inside the site shell. Logic map only: no Scales tab, no Debate tab,
 * no balance ring. It replaces the topic page's old exit to the canvas at `/`.
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
    title: `${topic.title} — Diagram`,
    description: `The argument map for “${topic.title}” as an interactive diagram.`,
    robots: { index: false, follow: true },
    alternates: { canonical: `https://argumend.org/topics/${topic.id}` },
  };
}

export default async function TopicDiagramPage({ params }: PageProps) {
  const { id } = await params;
  const topic = topicSummaries.find((t) => t.id === id);
  if (!topic) notFound();

  return (
    <AppShell layout="reading">
      <TopicDiagram topicId={topic.id} title={topic.title} />
    </AppShell>
  );
}
