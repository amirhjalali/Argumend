/**
 * Source-URL health check (Citation Moat maintenance).
 *
 * Fetches every evidence `sourceUrl` and categorizes the response so dead
 * citations can be found and repaired:
 *   - DEAD   : 404 / 410 / DNS failure / connection refused  → must fix
 *   - MALFORMED: invalid or placeholder source URL            → must fix
 *   - REDIRECTED: live URL forwarding to a new location       → canonicalize
 *   - BLOCKED: 403 / 429 (live page, anti-bot)               → spot-check only
 *   - ERROR  : timeout / other network error                  → re-check
 *   - OK     : direct 2xx response
 *
 * Crawlers and LLMs follow these links; a 404 is as bad as a fabricated cite.
 *
 * Usage: npm run check:sources              (summary + DEAD list)
 *        npm run check:sources -- --redirects (include redirect destinations)
 *        npm run check:sources -- --all      (list BLOCKED/ERROR too)
 *        npm run check:sources -- --json     (machine-readable)
 */
import { topics } from "../data/topics";
import { isKnownSoft404Url, validateSourceUrl } from "./source-url-health";

type Item = { topic: string; evidenceId: string; url: string };
type Status = "OK" | "REDIRECTED" | "DEAD" | "MALFORMED" | "BLOCKED" | "ERROR";
type Result = Item & {
  status: Status;
  code: number | string;
  finalUrl?: string;
};

const CONCURRENCY = 16;
const TIMEOUT_MS = 15000;

const items: Item[] = [];
for (const t of topics) {
  for (const p of t.pillars) {
    for (const e of p.evidence ?? []) {
      const url = (e as { sourceUrl?: string }).sourceUrl;
      const id = (e as { id?: string }).id ?? "?";
      if (typeof url === "string") {
        items.push({ topic: t.id, evidenceId: id, url });
      }
    }
  }
}

async function check(item: Item): Promise<Result> {
  const validation = validateSourceUrl(item.url);
  if (!validation.valid) {
    return {
      ...item,
      status: "MALFORMED",
      code: validation.reason,
    };
  }

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
    // We only need response metadata; releasing the body avoids keeping
    // hundreds of HTTP connections alive after the report has printed.
    await res.body?.cancel();
    const code = res.status;
    let status: Status = "OK";
    if (code === 404 || code === 410 || isKnownSoft404Url(res.url)) {
      status = "DEAD";
    }
    else if (code === 403 || code === 429) status = "BLOCKED";
    else if (code >= 400) status = "ERROR";
    else if (res.redirected && res.url !== validation.normalized) {
      status = "REDIRECTED";
    }
    return {
      ...item,
      status,
      code,
      ...(res.redirected ? { finalUrl: res.url } : {}),
    };
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

async function main() {
  const results = await run();
  const by = (status: Status) => results.filter((result) => result.status === status);
  const dead = by("DEAD");
  const malformed = by("MALFORMED");
  const redirected = by("REDIRECTED");
  const blocked = by("BLOCKED");
  const error = by("ERROR");

  if (process.argv.includes("--json")) {
    console.log(
      JSON.stringify(
        { total: results.length, dead, malformed, redirected, blocked, error },
        null,
        2,
      ),
    );
  } else {
    console.log(
      `Checked ${results.length} source URLs — OK ${by("OK").length} | REDIRECTED ${redirected.length} | DEAD ${dead.length} | MALFORMED ${malformed.length} | BLOCKED(anti-bot) ${blocked.length} | ERROR ${error.length}\n`,
    );
    const show = (label: string, resultSet: Result[]) => {
      if (!resultSet.length) return;
      console.log(`${label} (${resultSet.length}):`);
      for (const result of resultSet) {
        const destination = result.finalUrl
          ? `\n     → ${result.finalUrl}`
          : "";
        console.log(
          `  [${result.code}] ${result.topic} :: ${result.evidenceId}\n     ${result.url}${destination}`,
        );
      }
      console.log("");
    };
    show("DEAD — must fix", dead);
    show("MALFORMED — must fix", malformed);
    if (
      process.argv.includes("--all") ||
      process.argv.includes("--redirects")
    ) {
      show("REDIRECTED — consider canonicalizing", redirected);
    }
    if (process.argv.includes("--all")) {
      show("ERROR — re-check", error);
      show("BLOCKED — likely live (anti-bot), spot-check", blocked);
    }
  }
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
