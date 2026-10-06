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

/** Replaces every participant label, longest first so "Ann Lee" goes before "Ann". */
export function withoutNames(text: string, labels: readonly string[]): string {
  return [...labels]
    .map((label) => label.trim())
    .filter((label) => label.length > 0)
    .sort((a, b) => b.length - a.length)
    .reduce(
      (current, label) =>
        current.replace(new RegExp(`(^|[^\\p{L}\\p{N}_])${escapeRegExp(label)}(?=$|[^\\p{L}\\p{N}_])`, "gu"), "$1one participant"),
      text,
    );
}

export function buildPasteSummary({
  maps,
  report,
}: {
  maps: PasteMapsResult | null;
  report: DisagreementReportV1 | null;
}): string {
  const lines: string[] = ["What this argument turns on (read with Argumend)"];

  if (report) {
    const labels = report.participants.map((participant) => participant.label);
    lines.push("", withoutNames(report.diagnosis.headline, labels));
    const crux = report.cruxes[0]?.question;
    if (crux) lines.push(`It turns on: ${withoutNames(crux, labels)}`);
  }

  const match = maps?.match;
  if (match) {
    const named = /[.?!]$/.test(match.title) ? match.title : `${match.title}.`;
    lines.push("", `It is already mapped: ${named} ${match.claim}`);
    if (match.crux) {
      const words = match.cardsAbout === "map-question" ? ANSWER_SIDES : CLAIM_SIDES;
      lines.push(
        match.alsoCrux
          ? `It may turn on one of these questions from the map: ${match.crux.question}`
          : `The question the map says it turns on: ${match.crux.question}`,
      );
      if (match.crux.supporterFlip) lines.push(`${words.yesChangesMind}: ${match.crux.supporterFlip}`);
      if (match.crux.skepticFlip) lines.push(`${words.noChangesMind}: ${match.crux.skepticFlip}`);
      if (match.alsoCrux) lines.push(`Or: ${match.alsoCrux.question} ${SITE_URL}${match.alsoCrux.href}`);
    }
    lines.push(`Both sides' best evidence: ${SITE_URL}${match.crux?.href ?? match.href}`);
    const sibling = maps.related?.[0];
    if (sibling) lines.push(`Closely related map: ${sibling.title}, ${SITE_URL}${sibling.href}`);
  } else if (maps && maps.closest.length > 0) {
    lines.push("", `Closest map: ${maps.closest[0].title}, ${SITE_URL}${maps.closest[0].href}`);
  }

  return lines.join("\n");
}
