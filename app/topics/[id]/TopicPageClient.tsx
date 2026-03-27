"use client";

import { useParams } from "next/navigation";
import { topics, CATEGORY_LABELS, getCrossCategoryRelated } from "@/data/topics";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import TopicDetailView from "./TopicDetailView";
import Link from "next/link";

export default function TopicPageClient() {
  const params = useParams<{ id: string }>();
  const topic = topics.find((t) => t.id === params.id);

  if (!topic) {
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl text-primary mb-2">Topic Not Found</h1>
            <p className="text-secondary mb-4">This topic doesn&apos;t exist.</p>
            <Link href="/topics" className="text-deep hover:underline">
              Browse all topics
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const relatedTopics = topics
    .filter((t) => t.category === topic.category && t.id !== topic.id)
    .slice(0, 4);

  const crossCategoryTopics = getCrossCategoryRelated(topic.id, topic.category, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Topics", href: "/topics" },
          { label: topic.title },
        ]}
      />
      <TopicDetailView
        topic={topic}
        relatedTopics={relatedTopics}
        crossCategoryTopics={crossCategoryTopics}
      />
    </>
  );
}
