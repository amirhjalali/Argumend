import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { absoluteMediaUrl, getGeneratedMedia } from "@/data/generatedMedia";
import { buildTopicOgUrl } from "@/lib/og";
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
  const name = mapDisplayTitle(topic);
  const title = `${name} — Diagram`;
  const description = `The argument map for “${name}” as an interactive diagram.`;
  const canonical = `https://argumend.org/topics/${topic.id}`;
  // The map's own social card, the one its topic page uses. Without an
  // openGraph here the /topics layout's library card ("Maps — N contested
  // questions") is what a shared diagram link would preview.
  const media = getGeneratedMedia("topic", topic.id);
  const image = media?.hero ? absoluteMediaUrl(media.hero.src) : buildTopicOgUrl(topic.id);
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${title} | ARGUMEND`,
      description,
      url: canonical,
      siteName: "ARGUMEND",
      images: [
        {
          url: image,
          width: media?.hero.width ?? 1200,
          height: media?.hero.height ?? 630,
          alt: media?.hero.alt ?? name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
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
