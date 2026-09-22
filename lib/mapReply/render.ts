/**
 * Markdown rendering of a composed map reply.
 *
 * Every sentence below is one of three things: fixed scaffolding, a number
 * that came back from Jev, or a string copied verbatim out of the topic data
 * (a title, a section name, a crux, an evidence title and its source). There
 * is no generated prose, no summary of anyone's argument, and no winner.
 */
import { MAP_REPLY_THRESHOLDS } from "./constants";
import type { MapReplyMatch, MapReplyNoMatch } from "./types";

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function joinList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function openingLine(match: Omit<MapReplyMatch, "markdown">): string {
  const { dominantSection, thread, notArguing, signals } = match;
  const sentences: string[] = [];

  if (dominantSection) {
    const share =
      dominantSection.count * 2 > thread.substantiveCount
        ? "Most of this thread"
        : "The largest share of this thread";
    const unit = thread.substantiveCount === 1 ? "turn" : "turns";
    sentences.push(
      `${share} (${dominantSection.count} of ${thread.substantiveCount} ${unit}) is arguing about **${dominantSection.title}**.`,
    );
  } else {
    sentences.push("No section of this map received an argument from this thread.");
  }

  if (notArguing.length > 0) {
    const verb = notArguing.length === 1 ? "did not make an argument" : "did not make arguments";
    sentences.push(`${joinList(notArguing)} ${verb} about the topic.`);
  }
  if (signals.talkingPast >= MAP_REPLY_THRESHOLDS.threadSignal) {
    sentences.push(
      "Some of you are arguing about different sections of the map while thinking you disagree.",
    );
  }
  if (signals.definitional >= MAP_REPLY_THRESHOLDS.threadSignal) {
    sentences.push("You are also using a key term to mean different things.");
  }

  return sentences.join(" ");
}

export function renderMapReplyMarkdown(match: Omit<MapReplyMatch, "markdown">): string {
  const lines: string[] = [];

  lines.push(`**Argumend map: ${match.topic.title}**`);
  lines.push(`The map's claim: ${match.topic.metaClaim}`);
  lines.push("");
  lines.push(openingLine(match));
  lines.push("");
  lines.push(`**Pattern:** ${match.pattern.label} (${formatPercent(match.pattern.confidence)}).`);

  if (match.dominantSection) {
    lines.push("");
    lines.push(
      `**The crux for this section:** ${match.dominantSection.cruxTitle}. ${match.dominantSection.cruxDescription}`,
    );
  }

  if (match.evidence.length > 0) {
    lines.push("");
    lines.push(
      "**Strongest evidence in this section** (weighted on source reliability, independence, replicability and directness, out of 40):",
    );
    for (const item of match.evidence) {
      const side = item.side === "for" ? "For the map's claim" : "Against the map's claim";
      const source = item.source ? ` ${item.source}` : "";
      lines.push(`- ${side} (${item.score}/40): ${item.title}.${source}`);
    }
  }

  const touched = match.cruxes.filter((crux) => crux.touched >= crux.touchedThreshold);
  const untouched = match.cruxes.filter((crux) => crux.touched < crux.touchedThreshold);
  lines.push("");
  if (touched.length > 0) {
    lines.push(
      `**Cruxes this thread touched:** ${touched
        .map((crux) => `${crux.cruxTitle} (${formatPercent(crux.touched)})`)
        .join(" | ")}`,
    );
    if (untouched.length > 0) {
      lines.push(`**Never reached:** ${untouched.map((crux) => crux.cruxTitle).join(" | ")}`);
    }
  } else if (untouched.length > 0) {
    // Naming them is the point: this is the thread that argued past every crux.
    lines.push(
      `**This thread reached none of the map's cruxes:** ${untouched
        .map((crux) => crux.cruxTitle)
        .join(" | ")}`,
    );
  }

  lines.push("");
  lines.push(`Full map: ${match.topic.url}`);

  return lines.join("\n");
}

export function renderNoMatchMarkdown(result: Omit<MapReplyNoMatch, "markdown">): string {
  const lines: string[] = ["**No Argumend map fits this thread.**", result.message];

  if (result.candidates.length > 0) {
    lines.push("");
    lines.push(
      `Closest maps considered: ${result.candidates
        .slice(0, 3)
        .map((candidate) => candidate.title)
        .join(" | ")}`,
    );
  }

  const choice = result.topicChoice;
  if (choice) {
    const chosen = result.candidates.find((candidate) => candidate.id === choice.choice);
    if (chosen) {
      // A real map that did not clear the bar: name it and name the bar.
      lines.push(
        `Best match ${chosen.title} scored ${formatPercent(choice.confidence)}, below the ${formatPercent(
          choice.threshold,
        )} bar for showing a map.`,
      );
    } else {
      // "none of these" won outright, which is a different statement entirely.
      lines.push(
        `"None of these maps" was the winning answer at ${formatPercent(choice.confidence)}.`,
      );
    }
  }

  return lines.join("\n");
}
