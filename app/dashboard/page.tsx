import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Bookmark,
  Swords,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getSavedTopicIds, listUserDebates } from "@/lib/db/queries";
import { topicSummaries, CATEGORY_LABELS } from "@/data/topicIndex";
import type { TopicCategory, TopicStatus } from "@/data/topicIndex";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Dashboard | ARGUMEND",
  description: "Your saved topics and recent debate history.",
  robots: { index: false, follow: false },
};

const statusIcons: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const statusColors: Record<TopicStatus, string> = {
  settled: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  contested: "bg-rust-50 text-rust-700 border-rust-200/60",
  highly_speculative: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const statusLabels: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Speculative",
};

const categoryColors: Record<TopicCategory, string> = {
  policy: "bg-deep/10 text-deep border-deep/20",
  technology: "bg-stone-100 text-stone-600 border-stone-200/60",
  science: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  economics: "bg-rust-50 text-rust-700 border-rust-200/60",
  philosophy: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const categoryTopBorder: Record<TopicCategory, string> = {
  policy: "border-t-deep",
  technology: "border-t-stone-400",
  science: "border-t-emerald-400",
  economics: "border-t-rust-400",
  philosophy: "border-t-stone-400",
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const [savedTopicIds, recentDebates] = await Promise.all([
    getSavedTopicIds(session.user.id),
    listUserDebates(session.user.id, 10),
  ]);

  // Resolve saved topic IDs to topic summaries
  const savedTopicSet = new Set(savedTopicIds);
  const savedTopicsList = topicSummaries.filter((t) =>
    savedTopicSet.has(t.id)
  );

  // Sort to match save order
  savedTopicsList.sort(
    (a, b) => savedTopicIds.indexOf(a.id) - savedTopicIds.indexOf(b.id)
  );

  const firstName = session.user.name?.split(" ")[0] ?? "there";

  return (
    <AppShell>
      <div className="min-h-screen bg-[#f4f1eb] dark:bg-[var(--bg-canvas)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-primary mb-2 leading-[1.08]">
              Welcome back, {firstName}
            </h1>
            <p className="text-base text-stone-500 dark:text-[var(--text-muted)] leading-relaxed">
              Your saved topics and recent debate activity.
            </p>
          </div>

          {/* Saved Topics */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <Bookmark className="h-5 w-5 text-rust-500" strokeWidth={1.8} />
              <h2 className="font-serif text-2xl text-primary">
                Saved Topics
              </h2>
              <span className="ml-auto text-sm text-stone-400 dark:text-[var(--text-muted)] font-mono tabular-nums">
                {savedTopicsList.length}
              </span>
            </div>

            {savedTopicsList.length === 0 ? (
              <div className="rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/60 dark:bg-[#252420]/60 p-8 text-center">
                <Bookmark className="h-8 w-8 text-stone-300 dark:text-[var(--text-muted)] mx-auto mb-3" />
                <p className="text-stone-500 dark:text-[var(--text-secondary)] mb-4">
                  No saved topics yet. Browse topics and hit the bookmark button
                  to save them here.
                </p>
                <Link
                  href="/topics"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
                >
                  Explore Topics
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {savedTopicsList.map((topic) => {
                  const StatusIcon = statusIcons[topic.status];
                  const confPct = Math.min(topic.confidence_score, 100);

                  return (
                    <Link
                      key={topic.id}
                      href={`/topics/${topic.id}`}
                      className={`group flex flex-col bg-white dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-default)] border-t-2 ${categoryTopBorder[topic.category]} rounded-xl p-5 hover:border-[#4f7b77]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                    >
                      <h3 className="font-serif text-base text-primary group-hover:text-deep transition-colors leading-snug mb-1.5">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-4 flex-1">
                        {topic.meta_claim}
                      </p>

                      {/* Confidence bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium text-stone-500 dark:text-[var(--text-muted)] uppercase tracking-widest">
                            Confidence
                          </span>
                          <span className="font-mono text-xs tabular-nums text-stone-600 dark:text-stone-400 font-semibold">
                            {topic.confidence_score}%
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full bg-stone-200/80 dark:bg-[var(--bg-overlay)] overflow-hidden"
                          role="meter"
                          aria-valuenow={topic.confidence_score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Confidence: ${topic.confidence_score}%`}
                        >
                          <div
                            className="h-full rounded-full bg-deep-light transition-all duration-300"
                            style={{ width: `${confPct}%` }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${categoryColors[topic.category]}`}
                          >
                            {CATEGORY_LABELS[topic.category]}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[topic.status]}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusLabels[topic.status]}
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-stone-300 dark:text-[var(--text-muted)] group-hover:text-deep group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Recent Debates */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Swords className="h-5 w-5 text-deep" strokeWidth={1.8} />
              <h2 className="font-serif text-2xl text-primary">
                Recent Debates
              </h2>
              <span className="ml-auto text-sm text-stone-400 dark:text-[var(--text-muted)] font-mono tabular-nums">
                {recentDebates.length}
              </span>
            </div>

            {recentDebates.length === 0 ? (
              <div className="rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/60 dark:bg-[#252420]/60 p-8 text-center">
                <Swords className="h-8 w-8 text-stone-300 dark:text-[var(--text-muted)] mx-auto mb-3" />
                <p className="text-stone-500 dark:text-[var(--text-secondary)] mb-4">
                  No debates yet. Start a debate on any topic to see it here.
                </p>
                <Link
                  href="/topics"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
                >
                  Find a Topic
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentDebates.map((debate) => (
                  <div
                    key={debate.id}
                    className="flex items-center gap-4 rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/80 dark:bg-[#252420]/80 p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-deep/10 flex items-center justify-center">
                      <Swords className="h-5 w-5 text-deep" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-primary truncate">
                        {debate.topicTitle}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-stone-400 dark:text-[var(--text-muted)] font-mono">
                          {debate.forModel} vs {debate.againstModel}
                        </span>
                        <span className="text-xs text-stone-400 dark:text-[var(--text-muted)] flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(debate.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          debate.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : debate.status === "in_progress"
                              ? "bg-deep/10 text-deep border-deep/20"
                              : "bg-stone-100 text-stone-600 border-stone-200/60"
                        }`}
                      >
                        {debate.status === "completed"
                          ? debate.winner
                            ? `Winner: ${debate.winner}`
                            : "Completed"
                          : debate.status === "in_progress"
                            ? "In Progress"
                            : debate.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
