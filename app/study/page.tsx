import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadModeView } from "@/components/ReadModeView";
import { StudyFlow } from "@/components/study/StudyFlow";
import { loadTopicById } from "@/data/topicLoader";
import { STUDY_TOPICS, type StudyTopic } from "@/lib/study/constants";
import { prolificParamsFrom } from "@/lib/study/prolific";

/**
 * The perception-gap study (pre-registration:
 * docs/plans/2026-11-03-study-plan.md).
 *
 * Gated like /reply: the page 404s unless NEXT_PUBLIC_ENABLE_STUDY=true (read
 * at build time). Writes are a separate server flag, ENABLE_STUDY_RESPONSES,
 * on the two API routes, so rendering this page for review never opens them.
 * Noindex and out of the sitemap. Only reachable with Prolific's URL
 * parameters; anyone else gets a one-line explanation.
 *
 * No site header, navigation or footer: a participant should not be able to
 * wander off mid-study. The page provides its own <main id="main-content">
 * for the skip link.
 *
 * Arm (a) is the real topic page. The server renders all three study maps
 * with the same component /topics/[id] uses (ReadModeView, without the
 * "Keep exploring" links), and the client shows only the one the server's
 * assignment picks.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reading study",
  description: "A short reading study run through Prolific.",
  robots: { index: false, follow: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function StudyPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  if (process.env.NEXT_PUBLIC_ENABLE_STUDY !== "true") {
    notFound();
  }

  const prolific = prolificParamsFrom(await searchParams);

  return (
    <main id="main-content" role="main" className="min-h-[100svh] w-full pb-20 pt-10 font-sans text-primary sm:pt-14">
      {prolific ? (
        <StudyFlow prolific={prolific} mapStimuli={await renderMapStimuli()} />
      ) : (
        <div className="mx-auto w-full max-w-[44rem] px-4 sm:px-6">
          <h1 className="font-serif text-[2rem] leading-[1.15] text-primary sm:text-[2.5rem]">A short reading study</h1>
          <p className="mt-4 font-serif text-xl leading-[1.5] text-secondary">
            This study is open only to participants invited through Prolific. Please start it from the link in your
            Prolific study listing.
          </p>
        </div>
      )}
    </main>
  );
}

async function renderMapStimuli(): Promise<Record<StudyTopic, React.ReactNode>> {
  const entries = await Promise.all(
    STUDY_TOPICS.map(async (id) => {
      const topic = await loadTopicById(id);
      if (!topic) throw new Error(`study map ${id} is missing`);
      return [id, <ReadModeView key={id} topic={topic} />] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<StudyTopic, React.ReactNode>;
}
