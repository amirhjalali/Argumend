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
import { getPrimaryQuestionSlug, getTopicQuestionPhrasings } from "@/lib/questions";
import {
  legacyTopicPage,
  type LegacyCrux,
  type LegacyEvidenceItem,
  type LegacyWeighing,
} from "@/lib/topicPage/legacy";
import { strongestPair, type RelatedMap } from "@/lib/topicPage/model";
import { ANSWER_SIDES } from "@/lib/mapNaming";
import {
  CommonQuestions,
  TopicPage,
  type CruxEntryView,
  type TopicFold,
} from "@/components/topic/TopicPage";
import { DetailBlock, SOURCE_LINK } from "@/components/topic/cruxPrimitives";
import { CitationCard } from "@/components/CitationCard";
import { TextAction } from "@/components/ui";

const MADE_BY =
  "Steel-manned positions for both sides, weighed evidence cards, and the test that could settle each crux.";

export function ReadModeView({
  topic,
  related = [],
}: {
  topic: Topic;
  /** "Keep exploring": nearest subject first, from lib/relatedMaps.ts. */
  related?: RelatedMap[];
}) {
  const legacy = legacyTopicPage(topic, related);
  const { cruxes, weighing, references } = legacy;
  const questionSlug = getPrimaryQuestionSlug(topic.id);
  const question = getTopicQuestionPhrasings(topic.id)[0];
  const page =
    questionSlug && question
      ? { ...legacy.page, questionPage: { href: `/questions/${questionSlug}`, question } }
      : legacy.page;

  const labels = evidenceLabels(topic);
  const cruxViews: CruxEntryView[] = cruxes.map((crux) => ({
    ...crux,
    // The evidence is strongest first on each side (lib/topicPage/legacy.ts).
    strongest: strongestPair(
      strongestCard(crux.evidence, "for", labels),
      strongestCard(crux.evidence, "against", labels),
    ),
    evidenceLabel:
      crux.evidence.length > 0 ? "Show the evidence on each side and the test" : "Show the test",
    evidence: <LegacyCruxEvidence crux={crux} labels={labels} />,
  }));

  const folds: TopicFold[] = [
    {
      id: "weighing",
      title: "How the evidence weighs",
      hint: "One strong card from each side, and how every card is weighed.",
      content: <EvidenceWeighs weighing={weighing} labels={labels} />,
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

/**
 * The evidence blocks' labels. A map with a question names them by the
 * answer they point to, qualified because they sit under a crux question
 * that may be worded the other way round (lib/mapNaming.ts).
 */
function evidenceLabels(topic: Topic): Record<"for" | "against", string> {
  if (!topic.question?.trim()) return { for: SIDE.for.label, against: SIDE.against.label };
  return {
    for: `${ANSWER_SIDES.yesEvidence} on the map’s question`,
    against: `${ANSWER_SIDES.noEvidence} on the map’s question`,
  };
}

/** A side's first (strongest) card, in the reflection's shape. */
function strongestCard(
  evidence: LegacyEvidenceItem[],
  side: "for" | "against",
  labels: Record<"for" | "against", string>,
) {
  const item = evidence.find((e) => e.side === side);
  if (!item) return undefined;
  return { sideLabel: labels[side], title: item.title, source: item.source, sourceUrl: item.sourceUrl };
}

/** One pillar's evidence, grouped by side, strongest first. No score bars. */
function LegacyCruxEvidence({
  crux,
  labels,
}: {
  crux: LegacyCrux;
  labels: Record<"for" | "against", string>;
}) {
  const bySide = (side: "for" | "against") => crux.evidence.filter((e) => e.side === side);
  return (
    <>
      {(["for", "against"] as const).map((side) =>
        bySide(side).length > 0 ? (
          <DetailBlock key={side} label={labels[side]}>
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
 * One strong card from each side, by the map's own weights, and how a card
 * is weighed. No reading of where the cards tip ("evidence still divided"),
 * no ranking word, no score, and never one side's card without the other's.
 */
function EvidenceWeighs({
  weighing,
  labels,
}: {
  weighing: LegacyWeighing;
  labels: Record<"for" | "against", string>;
}) {
  const { strongest } = weighing;
  return (
    <div className="space-y-3">
      {strongest && (
        <>
          <p className="font-serif text-[1.125rem] leading-snug text-stone-900 dark:text-stone-100">
            One strong card on each side
          </p>
          <ul className="list-none space-y-2 p-0 font-serif text-[1rem] leading-relaxed text-secondary dark:text-stone-400">
            <li>
              <span className={`font-sans text-sm font-medium ${SIDE.for.className}`}>{labels.for}:</span>{" "}
              {strongest.forTitle}.
            </li>
            <li>
              <span className={`font-sans text-sm font-medium ${SIDE.against.className}`}>
                {labels.against}:
              </span>{" "}
              {strongest.againstTitle}.
            </li>
          </ul>
        </>
      )}
      <p className="text-xs leading-relaxed text-muted dark:text-stone-400">
        Each card is weighed on its source, independence, replicability and directness. Those
        weights are one editorial judgment deep; the questions above are what would move them.{" "}
        <TextAction href="/methodology#weighing" className="!text-xs">
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
              {crux.settle.note && (
                <p className="mt-0.5 text-xs text-muted dark:text-stone-400">{crux.settle.note}</p>
              )}
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
