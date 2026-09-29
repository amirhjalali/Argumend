import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getSavedTopicIds } from "@/lib/db/queries";
import { topicSummaries } from "@/data/topicIndex";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { AppShell } from "@/components/AppShell";
import { PageContainer, PageHeader, TextAction } from "@/components/ui";
import { mapDisplayTitle } from "@/lib/mapNaming";

export const metadata: Metadata = {
  // Plain string — the root title template ("%s | ARGUMEND") adds the suffix;
  // baking it in here produced a doubled "Dashboard | ARGUMEND | ARGUMEND".
  title: "Your saved maps",
  description: "The maps you have saved, on any device you sign in on.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://argumend.org/dashboard",
  },
};

interface SavedMap {
  id: string;
  title: string;
  line: string;
}

/**
 * Resolve saved ids to maps: the flagship maps first (they are not in the
 * lightweight summaries), then the rest of the library. Unknown ids drop out.
 */
function resolveSavedMaps(ids: string[]): SavedMap[] {
  const byId = new Map<string, SavedMap>();
  for (const topic of argumentTopicIndex) {
    byId.set(topic.id, { id: topic.id, title: topic.title, line: topic.tagline });
  }
  for (const topic of topicSummaries) {
    if (!byId.has(topic.id)) {
      byId.set(topic.id, { id: topic.id, title: mapDisplayTitle(topic), line: topic.meta_claim });
    }
  }
  return ids.flatMap((id) => {
    const map = byId.get(id);
    return map ? [map] : [];
  });
}

/**
 * The signed-in home, shown only when NEXT_PUBLIC_ENABLE_AUTH is on: the
 * maps you saved, in the order you saved them. It carries no debate history,
 * no scores and no winners; an account exists to keep saved maps across
 * devices, and that is all this page shows.
 */
export default async function DashboardPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_AUTH !== "true") {
    redirect("/saved");
  }

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const savedMaps = resolveSavedMaps(await getSavedTopicIds(session.user.id));
  const firstName = session.user.name?.split(" ")[0];

  return (
    <AppShell layout="reading">
      <PageContainer width="reading">
        <PageHeader
          eyebrow={firstName ? `Signed in as ${firstName}` : "Signed in"}
          title="Your saved maps"
          lede={
            savedMaps.length === 0
              ? "Nothing saved yet. Maps you save while signed in appear here, on any device."
              : `${savedMaps.length} saved, in the order you saved them.`
          }
          className="!mb-8"
        />

        {savedMaps.length > 0 ? (
          <ul className="divide-y divide-divider border-y border-divider">
            {savedMaps.map((map) => (
              <li key={map.id}>
                <Link
                  href={`/topics/${map.id}`}
                  className="group flex items-start justify-between gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus"
                >
                  <span className="min-w-0">
                    <span className="block font-serif text-[1.25rem] leading-snug text-primary dark:text-stone-200 transition-colors group-hover:text-deep dark:group-hover:text-accent-text">
                      {map.title}
                    </span>
                    <span className="mt-1 block line-clamp-2 text-sm leading-relaxed text-secondary dark:text-stone-400">
                      {map.line}
                    </span>
                  </span>
                  <ChevronRight
                    className="mt-1.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 dark:text-stone-400"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-6">
          <TextAction href="/topics">Browse the maps</TextAction>
        </p>
      </PageContainer>
    </AppShell>
  );
}
