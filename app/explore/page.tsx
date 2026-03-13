import type { Metadata } from "next";
import { CROSS_CATEGORY_CLUSTERS, CATEGORY_LABELS } from "@/data/topics";
import { TopicExplorer } from "@/components/TopicExplorer";
import topicSummaries from "@/data/topicSummaries.json";
import type { TopicSummary } from "@/data/topicIndex";

export const metadata: Metadata = {
  title: "Topic Explorer Map | Argumend",
  description:
    "Interactive map of all Argumend topics. Explore connections between debates across policy, technology, science, economics, and philosophy.",
  openGraph: {
    title: "Topic Explorer Map | Argumend",
    description:
      "Interactive map of all Argumend topics. Explore connections between debates across policy, technology, science, economics, and philosophy.",
    url: "https://argumend.org/explore",
    type: "website",
  },
  alternates: {
    canonical: "https://argumend.org/explore",
  },
};

export default function ExplorePage() {
  const summaries = topicSummaries as TopicSummary[];
  const categoryLabels = CATEGORY_LABELS;

  // Build edge list from cross-category clusters (deduplicated)
  const edgeSet = new Set<string>();
  const edges: { source: string; target: string }[] = [];

  for (const [sourceId, targets] of Object.entries(CROSS_CATEGORY_CLUSTERS)) {
    for (const targetId of targets) {
      // Create a canonical key so A->B and B->A are the same edge
      const key = [sourceId, targetId].sort().join("--");
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ source: sourceId, target: targetId });
      }
    }
  }

  return (
    <TopicExplorer
      topics={summaries}
      edges={edges}
      categoryLabels={categoryLabels}
    />
  );
}
