/**
 * Verdict robustness report — how much of each topic's quadrant rests on one
 * evidence card's `side` label, and what the robustness guard changes.
 *
 * Usage:
 *   bun --bun tsx scripts/verdict-sensitivity.ts
 *   bun --bun tsx scripts/verdict-sensitivity.ts --markdown      # doc table
 *   bun --bun tsx scripts/verdict-sensitivity.ts --changed-only  # just the flips
 *
 * Comparing against another branch's evidence labels (e.g. an adjudication
 * pass that is changing `side` values concurrently):
 *
 *   mkdir -p /tmp/adj
 *   for f in $(git diff --name-only main <ref> -- data/topics); do \
 *     git show <ref>:$f > /tmp/adj/$(basename $f); done
 *   bun --bun tsx scripts/verdict-sensitivity.ts --overlay /tmp/adj
 *
 * Overlay files are authored `TopicInput` modules; they are rebuilt through
 * buildTopic and substituted for the same id. Nothing in data/ is touched.
 *
 * "before" is the raw two-axis verdict (lib/schemas/topic.ts getVerdict);
 * "after" is what buildTopic publishes once applyVerdictRobustness has run.
 */

import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { topics as builtTopics } from "../data/topics";
import { buildTopic } from "../data/buildTopic";
import { getVerdict, type Topic, type TopicInput } from "../lib/schemas/topic";
import { topicVerdictSensitivity, VERDICT_ROBUSTNESS } from "../lib/verdictSensitivity";

const args = process.argv.slice(2);
const markdown = args.includes("--markdown");
const changedOnly = args.includes("--changed-only");
const overlayIndex = args.indexOf("--overlay");
const overlayDir = overlayIndex >= 0 ? args[overlayIndex + 1] : undefined;

// ---------------------------------------------------------------------------
// Load topics (optionally with an overlay of alternate authored files)
// ---------------------------------------------------------------------------

function findTopicInput(module: unknown, expectedId: string): TopicInput | null {
  if (typeof module !== "object" || module === null) return null;
  for (const candidate of Object.values(module)) {
    if (
      typeof candidate === "object" &&
      candidate !== null &&
      "id" in candidate &&
      candidate.id === expectedId
    ) {
      return candidate as TopicInput;
    }
  }
  return null;
}

async function loadTopics(): Promise<{ topics: Topic[]; overlaid: string[] }> {
  if (!overlayDir) return { topics: [...builtTopics], overlaid: [] };

  const dir = resolve(overlayDir);
  const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
  const byId = new Map(builtTopics.map((t) => [t.id, t] as const));
  const overlaid: string[] = [];

  for (const file of files) {
    const id = file.replace(/\.ts$/, "");
    const loaded: unknown = await import(pathToFileURL(resolve(dir, file)).href);
    const input = findTopicInput(loaded, id);
    if (!input) {
      console.error(`  ! overlay ${file}: no exported TopicInput with id "${id}" — skipped`);
      continue;
    }
    byId.set(id, buildTopic(input));
    overlaid.push(id);
  }

  return { topics: builtTopics.map((t) => byId.get(t.id) ?? t), overlaid };
}

// ---------------------------------------------------------------------------
// Rows
// ---------------------------------------------------------------------------

interface Row {
  id: string;
  cards: number;
  balance: number;
  weight: number;
  before: string;
  after: string;
  flips: number | null;
  rangeMin: number;
  rangeMax: number;
  span: number;
  fragile: boolean;
  pinned: boolean;
}

function buildRow(topic: Topic): Row {
  const sensitivity = topicVerdictSensitivity(topic);
  return {
    id: topic.id,
    cards: sensitivity.cardCount,
    balance: topic.balance,
    weight: topic.weight,
    before: getVerdict(topic.balance, topic.weight).quadrant,
    after: topic.verdict.quadrant,
    flips: sensitivity.flipsToChange,
    rangeMin: sensitivity.oneCardBalanceRange.min,
    rangeMax: sensitivity.oneCardBalanceRange.max,
    span: sensitivity.oneCardBalanceRange.span,
    fragile: topic.verdict.fragile === true,
    pinned: topic.verdict.pinnedByStatus === true,
  };
}

const flipsText = (flips: number | null): string =>
  flips === null ? `>${VERDICT_ROBUSTNESS.MAX_FLIP_SEARCH}` : String(flips);

function histogram(values: (number | null)[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const v of values) {
    const key = flipsText(v);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return new Map([...counts].sort((a, b) => a[0].localeCompare(b[0])));
}

function tally<T extends string>(values: T[]): Map<T, number> {
  const counts = new Map<T, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return new Map([...counts].sort((a, b) => b[1] - a[1]));
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const { topics, overlaid } = await loadTopics();
  const rows = topics.map(buildRow).sort((a, b) => a.id.localeCompare(b.id));
  const changed = rows.filter((r) => r.before !== r.after);

  if (overlaid.length > 0) {
    console.log(`Overlay: ${overlaid.length} topic files replaced from ${overlayDir}`);
    console.log(`  ${overlaid.sort().join(", ")}\n`);
  }

  const shown = changedOnly ? changed : rows;

  if (markdown) {
    console.log("| topic | cards | balance | weight | before | after | flips | one-card range | fragile | pinned |");
    console.log("| --- | ---: | ---: | ---: | --- | --- | ---: | --- | --- | --- |");
    for (const r of shown) {
      console.log(
        `| \`${r.id}\` | ${r.cards} | ${r.balance} | ${r.weight} | ${r.before} | ${r.after} | ${flipsText(r.flips)} | ${r.rangeMin}–${r.rangeMax} (${r.span}) | ${r.fragile ? "**yes**" : ""} | ${r.pinned ? "**pin**" : ""} |`
      );
    }
  } else {
    const idWidth = Math.max(...rows.map((r) => r.id.length));
    console.log(
      `${"topic".padEnd(idWidth)}  cards  bal  wgt  before     after      flips  one-card range  flags`
    );
    for (const r of shown) {
      console.log(
        [
          r.id.padEnd(idWidth),
          String(r.cards).padStart(5),
          String(r.balance).padStart(4),
          String(r.weight).padStart(4),
          r.before.padEnd(10),
          r.after.padEnd(10),
          flipsText(r.flips).padStart(4),
          `${String(r.rangeMin).padStart(4)}–${String(r.rangeMax).padEnd(3)} (${String(r.span).padStart(2)})`,
          `${r.fragile ? "  FRAGILE" : ""}${r.pinned ? " (pinned by status)" : ""}`,
        ].join("  ")
      );
    }
  }

  // -- summary ---------------------------------------------------------------
  console.log(`\n${rows.length} topics · rule: settled requires flipsToChange >= ${VERDICT_ROBUSTNESS.MIN_FLIPS_TO_CHANGE} and cards >= ${VERDICT_ROBUSTNESS.MIN_CARDS}`);

  console.log("\nquadrant before:", [...tally(rows.map((r) => r.before))].map(([k, v]) => `${k} ${v}`).join(" · "));
  console.log("quadrant after: ", [...tally(rows.map((r) => r.after))].map(([k, v]) => `${k} ${v}`).join(" · "));

  console.log(`\n${changed.length} topics change quadrant under the rule:`);
  for (const r of changed) {
    console.log(
      `  ${r.id} — ${r.before} → ${r.after} (cards ${r.cards}, balance ${r.balance}, flips ${flipsText(r.flips)}, one card spans ${r.rangeMin}–${r.rangeMax})`
    );
  }

  const pinned = rows.filter((r) => r.pinned);
  console.log(
    `\n${pinned.length} topics keep "settled" on the authored-status pin (fragile, but not demoted):`
  );
  for (const r of pinned) {
    console.log(
      `  ${r.id} — cards ${r.cards}, balance ${r.balance}, flips ${flipsText(r.flips)}, one card spans ${r.rangeMin}–${r.rangeMax}`
    );
  }
  const earnedSettled = rows.filter((r) => r.after === "settled" && !r.pinned);
  console.log(`${earnedSettled.length} topics earn "settled" on their own evidence: ${earnedSettled.map((r) => r.id).join(", ")}`);

  const settled = rows.filter((r) => r.before === "settled");
  console.log(`\nflipsToChange across all ${rows.length} topics:`);
  for (const [k, v] of histogram(rows.map((r) => r.flips))) console.log(`  ${k.padStart(3)}: ${v}`);
  console.log(`flipsToChange across the ${settled.length} settled-before topics:`);
  for (const [k, v] of histogram(settled.map((r) => r.flips))) console.log(`  ${k.padStart(3)}: ${v}`);

  const contested = rows.filter((r) => r.before === "contested");
  console.log(`\nof the ${contested.length} contested topics, ${contested.filter((r) => r.flips === 1).length} are one card from settled`);

  const spans = rows.map((r) => r.span).sort((a, b) => a - b);
  const median = spans[Math.floor(spans.length / 2)] ?? 0;
  console.log(
    `\none-card balance span: min ${spans[0]} · median ${median} · max ${spans[spans.length - 1]}`
  );

  console.log("\none-card span by card count (n topics: median span, max span):");
  const buckets: [string, (c: number) => boolean][] = [
    ["<=7 ", (c) => c <= 7],
    ["8-11", (c) => c >= 8 && c <= 11],
    ["12-15", (c) => c >= 12 && c <= 15],
    [">=16", (c) => c >= 16],
  ];
  for (const [label, test] of buckets) {
    const group = rows.filter((r) => test(r.cards));
    if (group.length === 0) {
      console.log(`  ${label}: none`);
      continue;
    }
    const s = group.map((r) => r.span).sort((a, b) => a - b);
    console.log(
      `  ${label}: ${String(group.length).padStart(3)} topics, median ${s[Math.floor(s.length / 2)]}, max ${s[s.length - 1]}`
    );
  }

  const cardCounts = rows.map((r) => r.cards).sort((a, b) => a - b);
  console.log(
    `\ncards per topic: min ${cardCounts[0]} · median ${cardCounts[Math.floor(cardCounts.length / 2)]} · max ${cardCounts[cardCounts.length - 1]}`
  );
  console.log(`topics under the ${VERDICT_ROBUSTNESS.MIN_CARDS}-card minimum: ${rows.filter((r) => r.cards < VERDICT_ROBUSTNESS.MIN_CARDS).length}`);
}

void main();
