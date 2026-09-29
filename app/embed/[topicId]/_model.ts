/**
 * What the embed widget shows, read from either topic model.
 *
 * The widget is the one Argumend artifact that travels to other people's
 * sites, so it carries what a map is for and nothing that scores it: the
 * question, what the sides already agree on, the question the fight turns on
 * first, and what would settle it. No verdict, margin, balance or winner on
 * either model; the tests pin that.
 *
 * It reads the same page model as /topics/[id] rather than a second adapter:
 * legacy maps through `legacyTopicPage` (lib/topicPage/legacy.ts), new-model
 * maps through the loader's ledger-aware crux ranking and the same authored
 * `agreementClaims` and `settleMode` the flagship page uses. So the first crux
 * here is the first crux on the map page, worded the same way.
 */
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { loadArgumentTopic, type ArgumentTopic } from "@/lib/argument/draftTopics";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { claimMovement, isPublicEntry } from "@/lib/argument/ledger";
import { legacyTopicPage } from "@/lib/topicPage/legacy";
import { numberWord, type SettleView } from "@/lib/topicPage/model";
import { settleMode } from "@/components/topic/cruxPrimitives";
import type { Topic } from "@/lib/schemas/topic";
import { mapDisplayTitle } from "@/lib/mapNaming";

/**
 * How many agreed facts the widget shows, so it stays one screen tall. A
 * new-model map's list is authored as a set (so it is shown whole, up to
 * three); an older map's list is each crux's common ground in pillar order,
 * and every item already speaks for both sides, so two are enough.
 */
export const EMBED_AGREEMENT_LIMIT = { flagship: 3, legacy: 2 } as const;

export interface EmbedModel {
  id: string;
  kind: "flagship" | "legacy";
  /** The map's title: a question on new-model maps, sometimes a label on older ones. */
  title: string;
  /** Older maps: "The claim: …" under a label title. */
  subtitle?: { lead: string; text: string };
  agreementHeading: string;
  /** What every side already accepts, as the map words it. Empty: no block. */
  agreement: string[];
  /** The first crux on the map page. */
  crux?: { question: string; settle: SettleView };
  /** How many questions the whole map turns on, for the link line. */
  cruxCount: number;
  href: string;
}

const SITE = "https://argumend.org";

/** Every id the embed can render: the older maps and the new-model ones. */
export function embedTopicIds(): string[] {
  return [
    ...topicSummaries.map((topic) => topic.id),
    ...argumentTopicIndex.map((topic) => topic.id),
  ];
}

/** Title and description for the embed's metadata, without loading the map. */
export function embedMeta(id: string): { title: string; description: string } | null {
  const map = argumentTopicIndex.find((topic) => topic.id === id);
  if (map) return { title: map.title, description: map.tagline };
  const topic = topicSummaries.find((summary) => summary.id === id);
  return topic ? { title: mapDisplayTitle(topic), description: topic.meta_claim } : null;
}

export async function loadEmbedModel(id: string): Promise<EmbedModel | null> {
  const argumentTopic = loadArgumentTopic(id);
  if (argumentTopic) return fromArgumentTopic(argumentTopic);
  const topic = await loadTopicById(id);
  return topic ? fromLegacyTopic(topic) : null;
}

// ---------------------------------------------------------------------------
// New-model maps (as components/argument/DebateView.tsx builds its page)
// ---------------------------------------------------------------------------

export function fromArgumentTopic(topic: ArgumentTopic): EmbedModel {
  const { meta, graph, cruxes } = topic;
  // The page renders only the public projection of the ledger.
  const ledger = topic.ledger.filter(isPublicEntry);
  const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
  const positionCount = graph.nodes.filter((node) => node.type === "position").length;

  let crux: EmbedModel["crux"];
  for (const ranked of cruxes) {
    const claim = nodesById.get(ranked.claimId);
    if (claim?.type !== "claim") continue;
    const latest = claimMovement(ledger, claim.id).at(-1)?.entry;
    const latestStatus = latest?.status;
    crux = {
      question: meta.cruxNotes?.[claim.id]?.question ?? claim.summary ?? claim.statement,
      settle: {
        mode: settleMode(claim, latestStatus),
        // A ledger that calls the crux unresolvable names the kind of fork.
        kind:
          latestStatus === "unresolvable"
            ? (latest?.resolutionKind ?? claim.resolution?.kind)
            : claim.resolution?.kind,
        condition: claim.resolution?.condition,
        resolved: latestStatus === "resolved",
      },
    };
    break;
  }

  const agreement = (meta.agreementClaims ?? []).flatMap((id) => {
    const node = nodesById.get(id);
    if (node?.type !== "claim") return [];
    if (node.status !== "uncontested" && node.status !== "broadly_accepted") return [];
    return [node.statement];
  });

  return {
    id: meta.id,
    kind: "flagship",
    title: meta.title,
    agreementHeading:
      positionCount === 2
        ? "What both sides already agree on"
        : `What all ${numberWord(positionCount).toLowerCase()} camps already accept`,
    agreement: agreement.slice(0, EMBED_AGREEMENT_LIMIT.flagship),
    crux,
    cruxCount: cruxes.length,
    href: `${SITE}/topics/${meta.id}`,
  };
}

// ---------------------------------------------------------------------------
// Older (pillar) maps, through the topic page's own adapter
// ---------------------------------------------------------------------------

export function fromLegacyTopic(topic: Topic): EmbedModel {
  const { page, cruxes } = legacyTopicPage(topic);
  const first = cruxes[0];
  return {
    id: page.id,
    kind: "legacy",
    title: page.title,
    subtitle: page.subtitle,
    agreementHeading: page.agreementHeading,
    agreement: page.agreement.slice(0, EMBED_AGREEMENT_LIMIT.legacy),
    // The testability note stays on the map page; the widget keeps the test.
    crux: first ? { question: first.question, settle: { ...first.settle, note: undefined } } : undefined,
    cruxCount: cruxes.length,
    href: `${SITE}/topics/${page.id}`,
  };
}
