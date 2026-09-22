"use client";

import type { Topic } from "@/lib/schemas/topic";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReadModeView } from "@/components/ReadModeView";

interface TopicPageClientProps {
  topic: Topic;
}

export default function TopicPageClient({ topic }: TopicPageClientProps) {
  return (
    <AppShell>
      {/* Same gutter and left edge as ReadModeView's article column; the
          breadcrumb used to sit flush against the viewport edge on mobile. */}
      <div className="mx-auto max-w-[88rem] px-5 pt-3 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Topics", href: "/topics" },
            { label: topic.title },
          ]}
        />
      </div>
      <ReadModeView topic={topic} />
    </AppShell>
  );
}
