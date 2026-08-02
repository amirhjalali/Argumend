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
