/**
 * Source-URL health check (Citation Moat maintenance).
 *
 * Fetches every evidence `sourceUrl` and categorizes the response so dead
 * citations can be found and repaired:
 *   - DEAD   : 404 / 410 / DNS failure / connection refused  → must fix
 *   - BLOCKED: 403 / 429 (live page, anti-bot)               → spot-check only
 *   - ERROR  : timeout / other network error                  → re-check
 *   - OK     : 2xx / 3xx
 *
 * Crawlers and LLMs follow these links; a 404 is as bad as a fabricated cite.
 *
 * Usage: bun scripts/check-source-urls.ts          (summary + DEAD list)
 *        bun scripts/check-source-urls.ts --all     (list BLOCKED/ERROR too)
 *        bun scripts/check-source-urls.ts --json     (machine-readable)
 */
import { topics } from "../data/topics";

type Item = { topic: string; evidenceId: string; url: string };
type Status = "OK" | "DEAD" | "BLOCKED" | "ERROR";
type Result = Item & { status: Status; code: number | string };

const URL_RE = /^https?:\/\/\S+\.\S+/;
const CONCURRENCY = 16;
const TIMEOUT_MS = 15000;

const items: Item[] = [];
for (const t of topics) {
  for (const p of t.pillars) {
    for (const e of p.evidence ?? []) {
      const url = (e as { sourceUrl?: string }).sourceUrl;
      const id = (e as { id?: string }).id ?? "?";
      if (typeof url === "string" && URL_RE.test(url)) {
        items.push({ topic: t.id, evidenceId: id, url });
      }
    }
  }
}

async function check(item: Item): Promise<Result> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const headers = {
    // A realistic UA reduces false 403s from anti-bot filters.
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/pdf,*/*",
  };
  try {
    // Prefer GET (many servers 405/403 a HEAD); we don't read the body.
    const res = await fetch(item.url, {
      method: "GET",
      redirect: "follow",
      signal: ctrl.signal,
      headers,
    });
    const code = res.status;
    let status: Status = "OK";
    if (code === 404 || code === 410) status = "DEAD";
    else if (code === 403 || code === 429) status = "BLOCKED";
    else if (code >= 400) status = "ERROR";
    return { ...item, status, code };
  } catch (err) {
    const msg = (err as Error)?.message ?? String(err);
    // DNS / refused / cert failures mean the resource is effectively gone.
    const dead = /ENOTFOUND|ECONNREFUSED|getaddrinfo|ERR_TLS|certificate/i.test(msg);
    return { ...item, status: dead ? "DEAD" : "ERROR", code: msg.slice(0, 40) };
  } finally {
    clearTimeout(timer);
  }
}

// Simple concurrency-limited map.
async function run(): Promise<Result[]> {
  const out: Result[] = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await check(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return out;
}

const results = await run();
const by = (s: Status) => results.filter((r) => r.status === s);
const dead = by("DEAD");
const blocked = by("BLOCKED");
const error = by("ERROR");

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ total: results.length, dead, blocked, error }, null, 2));
} else {
  console.log(
    `Checked ${results.length} source URLs — OK ${by("OK").length} | DEAD ${dead.length} | BLOCKED(anti-bot) ${blocked.length} | ERROR ${error.length}\n`,
  );
  const show = (label: string, rs: Result[]) => {
    if (!rs.length) return;
    console.log(`${label} (${rs.length}):`);
    for (const r of rs) console.log(`  [${r.code}] ${r.topic} :: ${r.evidenceId}\n     ${r.url}`);
    console.log("");
  };
  show("DEAD — must fix", dead);
  if (process.argv.includes("--all")) {
    show("ERROR — re-check", error);
    show("BLOCKED — likely live (anti-bot), spot-check", blocked);
  }
}
