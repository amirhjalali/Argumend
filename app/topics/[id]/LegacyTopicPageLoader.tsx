"use client";

import dynamic from "next/dynamic";
import type { Topic } from "@/lib/schemas/topic";

// The new ArgumentGraph pages share this dynamic route with legacy topics, but
// they must not inherit the legacy reader's client graph. Keep that graph one
// asynchronous boundary below the small route-level client reference.
const TopicPageClient = dynamic(() => import("./TopicPageClient"));

export default function LegacyTopicPageLoader({ topic }: { topic: Topic }) {
  return <TopicPageClient topic={topic} />;
}
