/**
 * ReadModeView — legacy pillar maps on the one topic-page template.
 *
 * The map's own text, rearranged crux-first by lib/topicPage/legacy.ts and
 * rendered by components/topic/TopicPage.tsx, the same template the
 * ArgumentGraph maps use. What this file adds is only what is specific to the
 * legacy data: its evidence cards (without score bars), its tests, the
 * "How the evidence weighs" and "Common questions" folds and the link to the
 * diagram.
 *
 * Server-safe: no hooks, no client directive.
 */
import type { Topic } from "@/lib/schemas/topic";
import { getCrossCategoryRelatedSummaries, topicSummaries } from "@/data/topicIndex";
import {
  legacyTopicPage,
  type LegacyCrux,
  type LegacyEvidenceItem,
  type LegacyWeighing,
} from "@/lib/topicPage/legacy";
import type { RelatedMap } from "@/lib/topicPage/model";
import {
  CommonQuestions,
  TopicPage,
  type CruxEntryView,
  type TopicFold,
} from "@/components/topic/TopicPage";
import { DetailBlock, SOURCE_LINK } from "@/components/topic/cruxPrimitives";
import { FragileVerdictNote } from "@/components/FragileVerdictNote";
import { CitationCard } from "@/components/CitationCard";
import { TextAction } from "@/components/ui";

const MADE_BY =
  "Steel-manned positions for both sides, weighed evidence cards, and the test that could settle each crux.";

/** Three related maps: same category first, then the nearest other categories. */
function relatedMaps(topic: Topic): RelatedMap[] {
  const sameCategory = topicSummaries
    .filter((t) => t.category === topic.category && t.id !== topic.id)
    .slice(0, 3);
  const cross =
    sameCategory.length >= 3
      ? []
      : getCrossCategoryRelatedSummaries(topic.id, topic.category, 3 - sameCategory.length);
  return [...sameCategory, ...cross].map((t) => ({ id: t.id, title: t.title }));
}

export function ReadModeView({ topic }: { topic: Topic }) {
  const { page, cruxes, weighing, references } = legacyTopicPage(topic, relatedMaps(topic));

  const cruxViews: CruxEntryView[] = cruxes.map((crux) => ({
    ...crux,
    evidenceLabel:
      crux.evidence.length > 0 ? "Show the evidence on each side and the test" : "Show the test",
    evidence: <LegacyCruxEvidence crux={crux} />,
  }));

  const folds: TopicFold[] = [
    {
      id: "weighing",
      title: "How the evidence weighs",
      hint: "In words, from the weighed evidence cards on this map.",
      content: <EvidenceWeighs weighing={weighing} />,
    },
    {
      id: "researcher",
      title: "Researcher mode",
      hint: `Every test on this map${references.length ? ", and further reading" : ""}.`,
      content: <LegacyResearcher topic={topic} cruxes={cruxes} references={references} />,
    },
  ];
  // The route also ships these as FAQPage structured data, which must be
  // visible on the page.
  if (topic.questions?.length) {
    folds.push({
      id: "questions",
      title: "Common questions",
      hint: "What people ask about this, and the context behind each question.",
      content: <CommonQuestions questions={topic.questions} />,
    });
  }

  return (
    <TopicPage
      page={page}
      cruxes={cruxViews}
      afterCruxes={
        page.diagramHref ? (
          <p className="mt-2">
            <TextAction href={page.diagramHref}>See it as a diagram →</TextAction>
          </p>
        ) : undefined
      }
      folds={folds}
      madeBy={MADE_BY}
    />
  );
}

// ---------------------------------------------------------------------------

const SIDE = {
  for: { label: "Supports the claim", glyph: "＋", className: "text-rust-700 dark:text-[#d4805f]" },
  against: { label: "Challenges the claim", glyph: "−", className: "text-[#8B5A3C] dark:text-[#cfa88a]" },
} as const;

/** One pillar's evidence, grouped by side, strongest first. No score bars. */
function LegacyCruxEvidence({ crux }: { crux: LegacyCrux }) {
  const bySide = (side: "for" | "against") => crux.evidence.filter((e) => e.side === side);
  return (
    <>
      {(["for", "against"] as const).map((side) =>
        bySide(side).length > 0 ? (
          <DetailBlock key={side} label={SIDE[side].label}>
            <ul className="space-y-2.5">
              {bySide(side).map((item) => (
                <LegacyEvidenceRow key={item.id} item={item} />
              ))}
            </ul>
          </DetailBlock>
        ) : null,
      )}
      <DetailBlock label="The test">
        <p>
          <span className="font-medium text-stone-800 dark:text-stone-200">{crux.test.title}.</span>{" "}
          {crux.test.methodology}
        </p>
        <p className="mt-1 text-xs text-muted dark:text-stone-400">Cost to run it: {crux.test.cost}</p>
      </DetailBlock>
    </>
  );
}

function LegacyEvidenceRow({ item }: { item: LegacyEvidenceItem }) {
  const side = SIDE[item.side];
  return (
    <li className="text-sm leading-relaxed">
      <span className={`font-medium ${side.className}`}>
        <span aria-hidden="true">{side.glyph} </span>
        {item.title}.
      </span>{" "}
      <span className="text-secondary dark:text-stone-400">{item.description}</span>
      {item.source && (
        <span className="block text-xs text-muted dark:text-stone-400">
          {item.sourceUrl ? (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open source from ${item.source} (opens in a new tab)`}
              className={SOURCE_LINK}
            >
              {item.source} ↗
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center">{item.source}</span>
          )}
        </span>
      )}
    </li>
  );
}

/**
 * The balance/weight reading, moved out of the page body and into words:
 * converges, divided, or thin. Never a score out of 100, and never one side's
 * heaviest card without the other's.
 */
function EvidenceWeighs({ weighing }: { weighing: LegacyWeighing }) {
  return (
    <div className="space-y-3">
      <p className="font-serif text-[1.125rem] leading-snug text-stone-900 dark:text-stone-100">
        {weighing.label}
      </p>
      <FragileVerdictNote fragile={weighing.fragile} />
      {weighing.heaviest && (
        <p className="font-serif text-[1rem] leading-relaxed text-secondary dark:text-stone-400">
          <em className="font-medium text-stone-900 dark:text-stone-100">Heaviest card for:</em>{" "}
          {weighing.heaviest.forTitle}.{" "}
          <em className="font-medium text-stone-900 dark:text-stone-100">Heaviest card against:</em>{" "}
          {weighing.heaviest.againstTitle}.
        </p>
      )}
      <p className="text-xs leading-relaxed text-muted dark:text-stone-400">
        Each card is weighed on its source, independence, replicability and directness. That
        reading is one editorial judgment deep; the questions above are what would move it.{" "}
        <TextAction href="/methodology" className="!text-xs">
          How cards are weighed →
        </TextAction>
      </p>
    </div>
  );
}

function LegacyResearcher({
  topic,
  cruxes,
  references,
}: {
  topic: Topic;
  cruxes: LegacyCrux[];
  references: { title: string; url: string }[];
}) {
  const pillarTitle = new Map(topic.pillars.map((p) => [p.id, p.title]));
  return (
    <div className="space-y-5">
      <DetailBlock label="The tests">
        <ul className="space-y-3">
          {cruxes.map((crux) => (
            <li key={crux.anchor}>
              <p className="text-[12.5px] text-muted dark:text-stone-400">
                {pillarTitle.get(crux.pillarId)}
              </p>
              <p>
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  {crux.test.title}.
                </span>{" "}
                {crux.settle.condition}
              </p>
              <p className="mt-0.5">{crux.test.methodology}</p>
              <p className="mt-0.5 text-xs text-muted dark:text-stone-400">
                {crux.settle.note} Cost to run it: {crux.test.cost}
              </p>
            </li>
          ))}
        </ul>
      </DetailBlock>
      {references.length > 0 && (
        <DetailBlock label="Further reading">
          <ul className="list-none space-y-4 p-0">
            {references.map((ref, i) => (
              <li key={ref.url}>
                <CitationCard reference={ref} index={i + 1} />
              </li>
            ))}
          </ul>
        </DetailBlock>
      )}
    </div>
  );
}
