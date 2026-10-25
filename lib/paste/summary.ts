/**
 * "Copy a summary": the paste result as plain text a reader can take back to
 * the conversation.
 *
 * No names and no scores. Participant labels from the diagnosis are replaced
 * before anything is copied, because the text is written for a thread whose
 * other members never asked to be read; and no weight, percentage or
 * threshold goes in, because a number beside a side reads as that side
 * ahead. What remains is the question the argument turns on and the map
 * that lays out both sides.
 */
import { SITE_URL } from "@/lib/site";
import { ANSWER_SIDES, CLAIM_SIDES } from "@/lib/mapNaming";
import type { DisagreementReportV1 } from "@/types/disagreement";
import type { PasteMapsResult } from "./types";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Replaces whole participant labels across case and equivalent Unicode spellings. */
export function withoutNames(text: string, labels: readonly string[]): string {
  const names = [...labels]
    .map((label) => label.trim().normalize("NFC"))
    .filter((label) => label.length > 0)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (names.length === 0) return text;
  // One pass avoids redacting our replacement again when a label is "one".
  // Longest alternatives win, and combining marks stay inside word boundaries.
  const pattern = new RegExp(`(^|[^\\p{L}\\p{N}\\p{M}_])(?:${names.join("|")})(?=$|[^\\p{L}\\p{N}\\p{M}_])`, "giu");
  return text.normalize("NFC").replace(pattern, "$1one participant");
}

export function buildPasteSummary({
  maps,
  report,
}: {
  maps: PasteMapsResult | null;
  report: DisagreementReportV1 | null;
}): string {
  const lines: string[] = ["Questions to explore together (from Argumend)"];

  if (report) {
    const labels = report.participants.map((participant) => participant.label);
    lines.push("", withoutNames(report.diagnosis.headline, labels));
    const crux = report.cruxes[0]?.question;
    if (crux) lines.push(`It turns on: ${withoutNames(crux, labels)}`);
  }

  const match = maps?.match;
  if (match) {
    const named = /[.?!]$/.test(match.title) ? match.title : `${match.title}.`;
    lines.push("", `A map to explore: ${named}`);
    if (match.kind === "flagship" && match.claim !== match.title) {
      lines.push(`Scope: ${match.claim}`);
    }
    if (match.crux) {
      const words = match.cardsAbout === "map-question" ? ANSWER_SIDES : CLAIM_SIDES;
      lines.push(
        match.alsoCrux
          ? `Possible questions from the map: ${match.crux.question}`
          : `A question from the map: ${match.crux.question}`,
      );
      if (match.crux.supporterFlip) lines.push(`${words.yesChangesMind}: ${match.crux.supporterFlip}`);
      if (match.crux.skepticFlip) lines.push(`${words.noChangesMind}: ${match.crux.skepticFlip}`);
      if (match.alsoCrux) lines.push(`Or: ${match.alsoCrux.question} ${SITE_URL}${match.alsoCrux.href}`);
    }
    const evidenceHref = match.crux?.href ?? match.href;
    lines.push(`Read the evidence: ${SITE_URL}${evidenceHref}`);
    const linkedQuestions = new Set([evidenceHref]);
    if (match.crux && match.alsoCrux) linkedQuestions.add(match.alsoCrux.href);
    for (const card of match.cards) {
      if (!card.crux || linkedQuestions.has(card.crux.href)) continue;
      linkedQuestions.add(card.crux.href);
      lines.push(`Related evidence: ${card.crux.question} ${SITE_URL}${card.crux.href}`);
    }
    const sibling = maps.related?.[0];
    if (sibling) lines.push(`Closely related map: ${sibling.title}, ${SITE_URL}${sibling.href}`);
  } else if (maps && maps.closest.length > 0) {
    lines.push("", `Closest map: ${maps.closest[0].title}, ${SITE_URL}${maps.closest[0].href}`);
  }

  lines.push("", "What would make each of us think again?");
  return lines.join("\n");
}
