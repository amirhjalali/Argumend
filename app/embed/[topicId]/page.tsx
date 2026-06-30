import { notFound } from "next/navigation";
import { topics } from "@/data/topics";
import { getVerdictLabel } from "@/lib/schemas/topic";
import { getMockVerdict } from "@/data/mockVerdicts";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Static Generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return topics.map((topic) => ({ topicId: topic.id }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ topicId: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);
  if (!topic) return { title: "Not Found" };

  return {
    title: `${topic.title} — ARGUMEND Embed`,
    description: topic.meta_claim,
    robots: { index: false, follow: false },
  };
}

// ---------------------------------------------------------------------------
// Confidence Bar
// ---------------------------------------------------------------------------

function ConfidenceBar({ score }: { score: number }) {
  const color =
    score >= 75 ? "bg-deep" : score >= 50 ? "bg-rust-500" : "bg-stone-400";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted dark:text-stone-400">
          Confidence
        </span>
        <span className="text-sm font-mono font-semibold tabular-nums text-primary dark:text-stone-100">
          {score}%
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-700/60">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-[11px] mt-1 text-muted dark:text-stone-400">
        {getVerdictLabel(score)}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Argument Card
// ---------------------------------------------------------------------------

function ArgumentCard({
  side,
  arguments: args,
}: {
  side: "for" | "against";
  arguments: { title: string; summary: string }[];
}) {
  const isFor = side === "for";

  return (
    <div
      className={`rounded-lg border p-3 ${
        isFor
          ? "border-rust-200 bg-rust-50/60 dark:border-rust-800/40 dark:bg-rust-950/30"
          : "border-stone-200 bg-stone-50/60 dark:border-stone-700/50 dark:bg-stone-800/30"
      }`}
    >
      <h3
        className={`text-xs font-semibold uppercase tracking-wide mb-2 ${
          isFor
            ? "text-rust-600 dark:text-rust-400"
            : "text-stone-500 dark:text-stone-400"
        }`}
      >
        {isFor ? "For" : "Against"}
      </h3>
      <ul className="space-y-1.5">
        {args.map((arg, i) => (
          <li
            key={i}
            className="text-[13px] leading-[1.5] break-words text-primary dark:text-stone-200"
          >
            <span className="font-medium">{arg.title}:</span>{" "}
            <span className="text-stone-600 dark:text-stone-400">
              {arg.summary}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Verdict Banner
// ---------------------------------------------------------------------------

function VerdictBanner({
  winner,
  forAvg,
  againstAvg,
}: {
  winner: "for" | "against" | "draw" | null;
  forAvg: number;
  againstAvg: number;
}) {
  const margin = Math.abs(forAvg - againstAvg).toFixed(1);
  const label =
    winner === "for"
      ? "For side wins"
      : winner === "against"
        ? "Against side wins"
        : "Draw";

  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-2 border-deep/20 bg-deep/5 dark:border-deep-light/30 dark:bg-deep-light/10">
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-deep dark:text-deep-light">
          Verdict
        </span>
        <p className="text-sm font-semibold text-primary dark:text-stone-100">
          {label}
        </p>
      </div>
      <div className="text-right">
        <span className="text-[11px] text-muted dark:text-stone-400">
          Margin
        </span>
        <p className="text-sm font-mono font-semibold tabular-nums text-primary dark:text-stone-100">
          {margin}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page Component (Server)
// ---------------------------------------------------------------------------

export default async function EmbedPage({ params }: PageProps) {
  const { topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    notFound();
  }

  // Extract top for/against arguments from pillars. Keep summaries short so the
  // widget stays compact and never overflows at typical embed widths.
  const truncate = (text: string) =>
    text.length > 120 ? text.slice(0, 117) + "…" : text;

  const forArgs = topic.pillars.slice(0, 3).map((p) => ({
    title: p.title,
    summary: truncate(p.proponent_rebuttal),
  }));

  const againstArgs = topic.pillars.slice(0, 3).map((p) => ({
    title: p.title,
    summary: truncate(p.skeptic_premise),
  }));

  // Load verdict if available
  const verdict = getMockVerdict(topicId);

  // Back-link to the canonical topic page so the embed drives traffic to
  // argumend.org. Opens in a new tab because the widget lives in an iframe.
  const topicUrl = `https://argumend.org/topics/${topicId}`;

  return (
    <main className="w-full max-w-[600px] mx-auto px-4 py-5 font-sans">
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-serif text-xl sm:text-2xl tracking-tight leading-tight mb-2 break-words text-primary dark:text-stone-100">
          {topic.title}
        </h1>
        <p className="text-sm leading-relaxed text-secondary dark:text-stone-300">
          {topic.meta_claim}
        </p>
      </div>

      {/* Confidence */}
      <div className="mb-4">
        <ConfidenceBar score={topic.confidence_score} />
      </div>

      {/* Arguments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <ArgumentCard side="for" arguments={forArgs} />
        <ArgumentCard side="against" arguments={againstArgs} />
      </div>

      {/* Verdict (if available) */}
      {verdict && (
        <div className="mb-4">
          <VerdictBanner
            winner={verdict.winner}
            forAvg={verdict.aggregatedScores.for.average}
            againstAvg={verdict.aggregatedScores.against.average}
          />
        </div>
      )}

      {/* Attribution / CTA — drives traffic back to the full analysis. */}
      <div className="pt-3 border-t border-stone-200/70 dark:border-stone-700/50">
        <a
          href={topicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors border-rust-200 bg-rust-50 text-rust-700 hover:bg-rust-100 dark:border-rust-500/30 dark:bg-rust-500/10 dark:text-rust-300 dark:hover:bg-rust-500/20"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3Z" />
          </svg>
          Analyzed by Argumend
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </a>
      </div>
    </main>
  );
}
