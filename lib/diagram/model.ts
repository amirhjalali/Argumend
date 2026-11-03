/**
 * The diagram of a legacy map (/topics/[id]/map), as plain data.
 *
 * Built from the topic page's own model (lib/topicPage/legacy.ts), so the
 * diagram and the page say the same thing in the same words and cannot drift:
 *
 *   the question (the page's H1)
 *   └─ one branch per crux, labelled with the crux question the page shows
 *      ├─ Supporters: that pillar's case, as the page's position card folds it
 *      │  └─ the evidence that supports the claim, by title
 *      └─ Skeptics: the same, for the other side
 *         └─ the evidence that challenges it, by title
 *
 * Nothing here is written for the diagram. No placeholders, no photos, no
 * scores: every string is one the page already renders.
 *
 * Pure and serializable: the route builds it on the server and hands it to
 * both the desktop canvas and the phone outline.
 */
import type { Topic } from "@/lib/schemas/topic";
import {
  firstSentence,
  legacyTopicPage,
  type LegacyCrux,
  type LegacyEvidenceItem,
} from "@/lib/topicPage/legacy";
import {
  standingLineFor,
  type RunInText,
  type SettleView,
  type TopicHook,
} from "@/lib/topicPage/model";
import { evidenceLabels } from "@/lib/mapNaming";

export type DiagramSide = "supporters" | "skeptics";

export interface DiagramQuestionNode {
  kind: "question";
  id: string;
  /** The page's H1: `topic.question`, else the title. */
  label: string;
  /** "The claim: …" when the headline is a label rather than a question. */
  claim?: RunInText;
  hook?: TopicHook;
  agreementHeading: string;
  agreement: string[];
}

export interface DiagramCruxNode {
  kind: "crux";
  id: string;
  parentId: string;
  /** 1-based, as the page numbers its crux sheet. */
  number: number;
  /** The crux question, exactly as the page's crux sheet words it. */
  label: string;
  /** The pillar it belongs to (the page's kicker above the question). */
  kicker?: string;
  settle: SettleView;
  /**
   * The one line the box shows under the question: how this crux could close,
   * in the page's own words (its testability note, or the first clause of its
   * "nothing does" line). The tone colours it: teal when a test can be run on
   * evidence that exists, brown when evidence cannot settle it, muted otherwise.
   */
  settleLine?: { text: string; tone: "testable" | "open" | "standing" };
  runIns: RunInText[];
  flips?: LegacyCrux["flips"];
  test: LegacyCrux["test"];
  /** The same crux on the map page. */
  pageHref: string;
}

export interface DiagramSideNode {
  kind: "side";
  id: string;
  parentId: string;
  side: DiagramSide;
  /** "Says yes" / "Says no" (or "Supporters" / "Skeptics"), the page's position-card labels. */
  heading: string;
  /** The first sentence of this pillar's case, shown on the node. */
  label: string;
  /** The pillar title, the run-in lead the page's fold gives this text. */
  lead: string;
  /** This pillar's full case, as the page's "Read the full case" fold has it. */
  text: string;
}

export interface DiagramEvidenceNode {
  kind: "evidence";
  id: string;
  parentId: string;
  side: LegacyEvidenceItem["side"];
  /** The page's label, naming the map's question when one is authored. */
  sideLabel: string;
  /** The evidence card's title, as the page lists it. */
  label: string;
  description: string;
  source?: string;
  sourceUrl?: string;
}

export type DiagramNode =
  | DiagramQuestionNode
  | DiagramCruxNode
  | DiagramSideNode
  | DiagramEvidenceNode;

export interface DiagramModel {
  topicId: string;
  /** The map's name, as the page's H1 has it (lib/mapNaming.ts). */
  title: string;
  /** Every node in reading order: the order of the page, and the tab order. */
  nodes: DiagramNode[];
  /**
   * What the evidence marks mean, for the diagram's key: ＋ is a card that
   * points to yes (or supports the claim), − one that points to no.
   */
  evidenceLabels: Record<LegacyEvidenceItem["side"], string>;
}

/** Which side each evidence card sits under. */
const SIDE_FOR_EVIDENCE: Record<LegacyEvidenceItem["side"], DiagramSide> = {
  for: "supporters",
  against: "skeptics",
};

export const QUESTION_NODE_ID = "question";

export function buildDiagram(topic: Topic): DiagramModel {
  const { page, cruxes } = legacyTopicPage(topic);
  const positions = new Map(page.positions.map((card) => [card.id, card]));
  const labels = evidenceLabels(topic);
  const pillarStatus = new Map(topic.pillars.map((p) => [p.id, p.crux.verification_status]));

  const nodes: DiagramNode[] = [
    {
      kind: "question",
      id: QUESTION_NODE_ID,
      label: page.title,
      claim: page.subtitle,
      hook: page.hook,
      agreementHeading: page.agreementHeading,
      agreement: page.agreement,
    },
  ];

  cruxes.forEach((crux, index) => {
    const cruxId = crux.anchor;
    nodes.push({
      kind: "crux",
      id: cruxId,
      parentId: QUESTION_NODE_ID,
      number: index + 1,
      label: crux.question,
      kicker: crux.kicker,
      settle: crux.settle,
      settleLine: settleLine(crux, pillarStatus.get(crux.pillarId)),
      runIns: crux.runIns,
      flips: crux.flips,
      test: crux.test,
      pageHref: `/topics/${topic.id}#${crux.anchor}`,
    });

    for (const side of ["supporters", "skeptics"] as const) {
      const card = positions.get(side);
      // The page's fold lists one run-in per pillar, in pillar order.
      const run = card?.full[index];
      if (!card || !run) continue;
      const sideId = `${cruxId}--${side}`;
      nodes.push({
        kind: "side",
        id: sideId,
        parentId: cruxId,
        side,
        heading: card.label,
        label: firstSentence(run.text),
        lead: run.lead.replace(/\.$/, ""),
        text: run.text,
      });
      for (const item of crux.evidence) {
        if (SIDE_FOR_EVIDENCE[item.side] !== side) continue;
        nodes.push({
          kind: "evidence",
          id: `${sideId}--${item.id}`,
          parentId: sideId,
          side: item.side,
          sideLabel: labels[item.side],
          label: item.title,
          description: item.description,
          source: item.source,
          sourceUrl: item.sourceUrl,
        });
      }
    }
  });

  return { topicId: topic.id, title: page.title, nodes, evidenceLabels: labels };
}

function settleLine(
  crux: LegacyCrux,
  status: Topic["pillars"][number]["crux"]["verification_status"] | undefined,
): DiagramCruxNode["settleLine"] {
  if (crux.settle.mode === "standing") {
    // "Nothing does — this is a standing value disagreement", without the
    // clause about what the map holds.
    return { text: standingLineFor(crux.settle.kind).split(";")[0], tone: "standing" };
  }
  if (!crux.settle.note) return undefined;
  return { text: crux.settle.note, tone: status === "verified" ? "testable" : "open" };
}

/** A node's children, in model order. */
export function childrenOf(model: DiagramModel, parentId: string): DiagramNode[] {
  return model.nodes.filter((node) => "parentId" in node && node.parentId === parentId);
}
