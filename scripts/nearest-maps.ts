/**
 * Is there already a map for this? Run before adding a map.
 *
 *   npx tsx scripts/nearest-maps.ts "Should TikTok be banned?"
 *   npx tsx scripts/nearest-maps.ts --map tiktok-ban
 *
 * With text: ranks the existing maps against it the way the paste flow does
 * (lib/paste/mapIndex.ts) and prints the five nearest. With --map: prints the
 * five maps whose whole-map profiles are most like that map's, flagging any at
 * or above the duplicate line (lib/mapDuplicates.ts), which CI enforces.
 */
import { getMapIndex } from "@/lib/paste/maps";
import { mapSimilarity, rankMaps } from "@/lib/paste/mapIndex";
import { MAP_DUPLICATE_SIMILARITY } from "@/lib/mapDuplicates";

async function main() {
  const args = process.argv.slice(2);
  const index = await getMapIndex();

  if (args[0] === "--map") {
    const id = args[1];
    if (!id || !index.byId.has(id)) {
      console.error(`Unknown map id: ${id ?? "(none)"}`);
      process.exit(1);
    }
    const nearest = index.maps
      .map(({ document }) => document)
      .filter((document) => document.id !== id)
      .map((document) => ({ document, similarity: mapSimilarity(index, id, document.id) }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);
    for (const { document, similarity } of nearest) {
      const flag = similarity >= MAP_DUPLICATE_SIMILARITY ? "  << near-duplicate" : "";
      console.log(`${similarity.toFixed(3)}  ${document.id}  ${document.title}${flag}`);
    }
    return;
  }

  const text = args.join(" ").trim();
  if (!text) {
    console.error('Usage: npx tsx scripts/nearest-maps.ts "<question>" | --map <id>');
    process.exit(1);
  }
  const { ranked } = rankMaps(index, text);
  if (ranked.length === 0) {
    console.log("No existing map shares a word with this. It is likely new.");
    return;
  }
  for (const map of ranked.slice(0, 5)) {
    console.log(`${map.score.toFixed(1).padStart(6)}  ${map.id}  ${map.title}`);
  }
  console.log(
    "\nIf one of these asks the same question, add yours to it (an alias, an \"Also asked as\" phrasing, or a crux) instead of a new map.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
