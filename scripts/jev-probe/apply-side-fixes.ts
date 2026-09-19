// Applies the evidence `side` corrections found by expF-side-audit.ts on 2026-09-17.
// Per-card Jev judgments (see docs/reviews/2026-09-16-jev-typesafe-probe.md, addendum F):
//   open-weight-ai-models        15/17 inverted at >= 0.9, the other two Jev-uncertain -> flip the whole map
//   transgender-athletes-sports   7/8 inverted, the Olympic-gold card Jev-uncertain      -> flip the whole map
//   obesity-personal-responsibility 8/12 "for" cards inverted at 0.99+; Jev agreed with the 4 "against" cards, but
//     reading them shows they are the skeptic's (pro-meta-claim) evidence, so the whole map is inverted -> flip all 12
// APPLIED 2026-09-17 (all three maps). Re-running would undo the fix; kept for the record and for the next audit.
// Run once:  bun scripts/jev-probe/apply-side-fixes.ts    (idempotence is NOT guaranteed; check git diff first)
import { readFileSync, writeFileSync } from "node:fs";

function flipAll(path: string) {
  let s = readFileSync(path, "utf8");
  const nFor = (s.match(/side: "for"/g) ?? []).length;
  const nAgainst = (s.match(/side: "against"/g) ?? []).length;
  s = s.replace(/side: "for"/g, 'side: "__AGAINST__"').replace(/side: "against"/g, 'side: "for"').replace(/side: "__AGAINST__"/g, 'side: "against"');
  writeFileSync(path, s);
  console.log(`${path}: ${nFor} for -> against, ${nAgainst} against -> for`);
}

// Kept for partial fixes on future audits.
export function flipTitled(path: string, titles: string[]) {
  let s = readFileSync(path, "utf8");
  let done = 0;
  for (const t of titles) {
    const i = s.indexOf(t);
    if (i < 0) throw new Error(`title not found: ${t}`);
    const j = s.indexOf('side: "for"', i);
    const next = s.indexOf("title:", i + t.length);
    if (j < 0 || (next >= 0 && j > next)) throw new Error(`no adjacent side: "for" for ${t}`);
    s = s.slice(0, j) + 'side: "against"' + s.slice(j + 'side: "for"'.length);
    done++;
  }
  writeFileSync(path, s);
  console.log(`${path}: ${done} cards for -> against`);
}

flipAll("data/topics/open-weight-ai-models.ts");
flipAll("data/topics/transgender-athletes-sports.ts");
flipAll("data/topics/obesity-personal-responsibility.ts");
console.log("Done. Run `bunx vitest run data/` and open the three topic pages before committing.");
