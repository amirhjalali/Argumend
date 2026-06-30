"use client";

import { useSearchParams } from "next/navigation";
import type { Topic } from "@/lib/schemas/topic";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReadModeView } from "@/components/ReadModeView";
import { ReadGraphToggle } from "@/components/ReadGraphToggle";
import TopicDetailView from "./TopicDetailView";
import Link from "next/link";

// Topic + related topics are resolved SERVER-SIDE (app/topics/[id]/page.tsx) and
// passed as props, so this client component never imports the ~500KB `data/topics`
// module — the corpus stays out of the topic-page client bundle. Only the read/
// graph toggle (a URL query param) needs client reactivity.
interface TopicPageClientProps {
  topic: Topic | null;
  relatedTopics: Topic[];
  crossCategoryTopics: Topic[];
}

export default function TopicPageClient({
  topic,
  relatedTopics,
  crossCategoryTopics,
}: TopicPageClientProps) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "graph" ? "graph" : "read";

  if (!topic) {
    return (
      <AppShell>
        <div className="min-h-[100svh] flex items-center justify-center">
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

  if (view === "read") {
    return (
      <AppShell>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Topics", href: "/topics" },
            { label: topic.title },
          ]}
        />
        <ReadModeView topic={topic} />
      </AppShell>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Topics", href: "/topics" },
          { label: topic.title },
        ]}
      />
      <div className="fixed top-20 right-5 z-30">
        <ReadGraphToggle current="graph" />
      </div>
      <TopicDetailView
        topic={topic}
        relatedTopics={relatedTopics}
        crossCategoryTopics={crossCategoryTopics}
      />
    </>
  );
}
