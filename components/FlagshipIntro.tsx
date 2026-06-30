import { ExternalLink } from "lucide-react";
import type { Topic } from "@/lib/schemas/topic";
import { confidenceTier } from "@/lib/schemas/topic";

/**
 * The flagship Stage-1 + Stage-2 intro, shown directly under the header.
 *
 * - Stage 1 (keystone): one counterintuitive, near-irrefutable fact with its
 *   confidence — the "wow" that collides with the reader's gut before any claim.
 * - Stage 2 (simple case): the honest argument in a few plain sentences.
 *
 * Renders nothing unless the topic opts in via `keystone_fact` / `simple_case`,
 * so every other topic is unaffected.
 */
export function FlagshipIntro({ topic }: { topic: Topic }) {
  const k = topic.keystone_fact;
  const sc = topic.simple_case;
  if (!k && !(sc && sc.length)) return null;

  return (
    <div className="mb-9">
      {k && (
        <section
          aria-label="Key fact"
          className="rounded-xl border border-deep/25 bg-deep/[0.06] dark:bg-deep/[0.12] px-6 py-5"
        >
          <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-deep mb-2">
            The fact that reframes this debate
          </div>
          <p className="font-serif text-[24px] sm:text-[26px] leading-[1.3] text-primary">
            {k.statement}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-deep px-2.5 py-1 font-sans font-semibold text-[11px] text-white">
              This fact: {confidenceTier(k.confidence)} · {k.confidence}%
            </span>
            {k.sourceUrl ? (
              <a
                href={k.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-secondary link-underline hover:text-primary"
              >
                {k.source}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ) : (
              <span className="text-secondary">{k.source}</span>
            )}
          </div>
        </section>
      )}

      {sc && sc.length > 0 && (
        <section aria-label="The simple case" className="mt-5">
          <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary mb-2">
            The honest version, in {sc.length === 3 ? "three" : sc.length} sentences
          </div>
          <ol className="space-y-2 list-none p-0 m-0">
            {sc.map((sentence, i) => (
              <li key={i} className="flex gap-3 font-serif text-[17px] leading-relaxed text-primary">
                <span
                  aria-hidden
                  className="flex-shrink-0 font-sans text-[12px] font-semibold text-deep/70 pt-1.5 tabular-nums"
                >
                  {i + 1}
                </span>
                <span>{sentence}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
