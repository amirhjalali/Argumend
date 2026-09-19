// Reads a human-evaluation-kit item's source text (everything after "## Source text").
import { readFileSync } from "node:fs";
import { join } from "node:path";

const KIT = join(process.cwd(), "docs/research/2026-09-15-v2-human-evaluation-kit/disagreements");

export function kitSource(id: string): string {
  const md = readFileSync(join(KIT, `${id}.md`), "utf8");
  const idx = md.indexOf("## Source text");
  if (idx < 0) throw new Error(`no source text in ${id}`);
  return md.slice(md.indexOf("\n", idx) + 1).trim();
}
