import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getSavedTopicIds } from "@/lib/db/queries";
import { topicSummaries } from "@/data/topicIndex";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { AppShell } from "@/components/AppShell";

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
      byId.set(topic.id, { id: topic.id, title: topic.title, line: topic.meta_claim });
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
      <div className="mx-auto w-full max-w-[44rem] px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <header>
          <p className="label-caps">{firstName ? `Signed in as ${firstName}` : "Signed in"}</p>
          <h1 className="mt-2 font-serif text-[2.375rem] font-normal leading-[1.06] tracking-[-0.015em] text-primary dark:text-stone-200 sm:text-[3rem]">
            Your saved maps
          </h1>
          <p className="mt-4 max-w-[36rem] font-serif text-xl leading-[1.5] text-secondary dark:text-stone-400">
            {savedMaps.length === 0
              ? "Nothing saved yet. Maps you save while signed in appear here, on any device."
              : `${savedMaps.length} saved, in the order you saved them.`}
          </p>
        </header>

        {savedMaps.length > 0 ? (
          <ul className="mt-8 divide-y divide-divider border-y border-divider">
            {savedMaps.map((map) => (
              <li key={map.id}>
                <Link
                  href={`/topics/${map.id}`}
                  className="group flex items-start justify-between gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep/50"
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
          <Link
            href="/topics"
            className="inline-flex min-h-11 items-center font-sans text-sm font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
          >
            Browse the maps
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
