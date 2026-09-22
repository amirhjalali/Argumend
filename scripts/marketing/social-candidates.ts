/**
 * Print candidate social posts drawn from the published argument maps.
 *
 * Every number the marketing kit quotes must come from the data, so the kit is
 * written against this script's output rather than from memory. For each
 * `verdict.quadrant === "contested"` topic it finds the pillar whose two sides
 * carry the strongest evidence, and prints the crux, the top card on each side
 * with its 0-40 score, and the ids needed to check the claim.
 *
 * Usage: bun run scripts/marketing/social-candidates.ts [--all] [--json] [--audit] [topicId...]
 *
 * Passing topic ids prints only those maps, which is how the numbers in
 * docs/marketing/2026-09-21-social-launch-kit.md are re-checked. `--audit`
 * prints the corpus-shape findings listed at the end of that file.
 */
import { topics } from "../../data/topics";
import { calculateEvidenceScore } from "../../lib/evidenceMetrics";
import type { Evidence, Pillar, Topic } from "../../lib/schemas/topic";

/** Maps whose for/against labels were rewritten on 2026-09-17 after the Jev
 *  evidence-side audit. Excluded from the kit unless a human re-reads the cards. */
const RELABELLED_2026_09_17 = new Set([
  "open-weight-ai-models",
  "obesity-personal-responsibility",
  "transgender-athletes-sports",
]);

type SideTop = { card: Evidence; score: number };

type Candidate = {
  topicId: string;
  title: string;
  category: string;
  balance: number;
  weight: number;
  verdictLabel: string;
  pillarId: string;
  pillarTitle: string;
  cruxTitle: string;
  cruxDescription: string;
  verificationStatus: string;
  metaClaim: string;
  keystoneFact?: string;
  for: SideTop;
  against: SideTop;
  /** min(top-for, top-against): how strong the *weaker* of the two sides is. */
  floor: number;
  relabelled: boolean;
};

function strongest(cards: Evidence[], side: Evidence["side"]): SideTop | null {
  const ranked = cards
    .filter((c) => c.side === side)
    .map((card) => ({ card, score: calculateEvidenceScore(card.weight) }))
    .sort((a, b) => b.score - a.score || a.card.id.localeCompare(b.card.id));
  return ranked[0] ?? null;
}

/** The pillar that best supports a two-sided post: both sides present, and the
 *  weaker side as strong as possible so neither quoted card is a straw man. */
function bestPillar(topic: Topic): { pillar: Pillar; for: SideTop; against: SideTop } | null {
  let best: { pillar: Pillar; for: SideTop; against: SideTop; floor: number } | null = null;
  for (const pillar of topic.pillars) {
    const cards = pillar.evidence ?? [];
    const topFor = strongest(cards, "for");
    const topAgainst = strongest(cards, "against");
    if (!topFor || !topAgainst) continue;
    const floor = Math.min(topFor.score, topAgainst.score);
    if (!best || floor > best.floor) {
      best = { pillar, for: topFor, against: topAgainst, floor };
    }
  }
  return best;
}

export function candidates(includeRelabelled = false): Candidate[] {
  const rows: Candidate[] = [];
  for (const topic of topics) {
    if (topic.verdict.quadrant !== "contested") continue;
    const relabelled = RELABELLED_2026_09_17.has(topic.id);
    if (relabelled && !includeRelabelled) continue;
    const pick = bestPillar(topic);
    if (!pick) continue;
    rows.push({
      topicId: topic.id,
      title: topic.title,
      category: topic.category,
      balance: topic.balance,
      weight: topic.weight,
      verdictLabel: topic.verdict.label,
      pillarId: pick.pillar.id,
      pillarTitle: pick.pillar.title,
      cruxTitle: pick.pillar.crux.title,
      cruxDescription: pick.pillar.crux.description,
      verificationStatus: pick.pillar.crux.verification_status,
      metaClaim: topic.meta_claim,
      keystoneFact: topic.keystone_fact?.statement,
      for: pick.for,
      against: pick.against,
      floor: Math.min(pick.for.score, pick.against.score),
      relabelled,
    });
  }
  return rows.sort((a, b) => b.floor - a.floor || a.topicId.localeCompare(b.topicId));
}

/** Corpus-shape findings the launch kit cites. Not a verdict on any map — a list to look at. */
function audit(): void {
  const contested = topics.filter((t) => t.verdict.quadrant === "contested");
  const cards = topics.flatMap((t) => t.pillars.flatMap((p) => p.evidence ?? []));
  const emptyPillars: string[] = [];
  const oneSided: string[] = [];
  for (const topic of topics) {
    for (const pillar of topic.pillars) {
      const ev = pillar.evidence ?? [];
      if (ev.length === 0) {
        emptyPillars.push(`${topic.id}/${pillar.id}`);
        continue;
      }
      const forCount = ev.filter((e) => e.side === "for").length;
      const againstCount = ev.filter((e) => e.side === "against").length;
      if (forCount === 0 || againstCount === 0) {
        oneSided.push(`${topic.id}/${pillar.id} (for ${forCount} / against ${againstCount})`);
      }
    }
  }
  const twoSidedContested = new Set(candidates(true).map((r) => r.topicId));
  const contestedWithoutPair = contested
    .filter((t) => !twoSidedContested.has(t.id))
    .map((t) => t.id);

  console.log(`topics: ${topics.length}`);
  console.log(`pillars: ${topics.reduce((n, t) => n + t.pillars.length, 0)}`);
  console.log(`evidence cards: ${cards.length}`);
  console.log(`cards without sourceUrl: ${cards.filter((c) => !c.sourceUrl).length}`);
  console.log(`contested maps: ${contested.length}`);
  console.log(`\npillars with no evidence (${emptyPillars.length}):`);
  for (const p of emptyPillars) console.log(`  ${p}`);
  console.log(`\ncontested maps with no two-sided pillar (${contestedWithoutPair.length}):`);
  for (const t of contestedWithoutPair) console.log(`  ${t}`);
  console.log(`\none-sided pillars (${oneSided.length}):`);
  for (const p of oneSided) console.log(`  ${p}`);
}

function main(): void {
  const argv = process.argv.slice(2);
  const flags = new Set(argv.filter((a) => a.startsWith("--")));
  const wanted = new Set(argv.filter((a) => !a.startsWith("--")));

  if (flags.has("--audit")) {
    audit();
    return;
  }

  let rows = candidates(flags.has("--all") || wanted.size > 0);
  if (wanted.size > 0) {
    rows = rows.filter((r) => wanted.has(r.topicId));
    for (const id of wanted) {
      if (!rows.some((r) => r.topicId === id)) {
        console.error(`!! no two-sided contested pillar found for "${id}"`);
      }
    }
  }

  if (flags.has("--json")) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  console.log(`${rows.length} contested maps with evidence on both sides of one pillar\n`);
  for (const r of rows) {
    console.log(`## ${r.title}  [${r.category}]`);
    console.log(`   topic: ${r.topicId}   pillar: ${r.pillarId}`);
    console.log(`   balance ${r.balance} / weight ${r.weight} — ${r.verdictLabel}`);
    console.log(`   claim: ${r.metaClaim}`);
    console.log(`   crux (${r.verificationStatus}): ${r.cruxTitle}`);
    console.log(`     ${r.cruxDescription}`);
    console.log(`   FOR     ${r.for.score}/40  [${r.for.card.id}] ${r.for.card.title}`);
    console.log(`   AGAINST ${r.against.score}/40  [${r.against.card.id}] ${r.against.card.title}`);
    console.log(`   url: https://argumend.org/topics/${r.topicId}`);
    console.log("");
  }
}

main();
