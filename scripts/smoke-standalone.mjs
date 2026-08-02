import { readdir, stat } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");
const staticDir = join(standaloneDir, ".next", "static");
const port = process.env.SMOKE_PORT ?? "3217";
const origin = `http://127.0.0.1:${port}`;

async function firstFile(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isFile()) return path;
    if (entry.isDirectory()) {
      const nested = await firstFile(path);
      if (nested) return nested;
    }
  }
  return null;
}

async function waitForReady(child, logs) {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Standalone server exited before readiness.\n${logs()}`);
    }
    try {
      const response = await fetch(`${origin}/api/health`, {
        signal: AbortSignal.timeout(1_000),
      });
      if (response.ok) return response;
    } catch {
      // Server has not bound its socket yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Timed out waiting for standalone readiness.\n${logs()}`);
}

await stat(join(standaloneDir, "server.js"));
await stat(join(standaloneDir, "public", "icon.png"));
await stat(staticDir);

const childEnv = {
  ...process.env,
  NODE_ENV: "production",
  NEXT_TELEMETRY_DISABLED: "1",
  HOSTNAME: "127.0.0.1",
  PORT: port,
  DATABASE_URL: "",
  ANTHROPIC_API_KEY: "",
  OPENAI_API_KEY: "",
  GOOGLE_AI_API_KEY: "",
  GEMINI_API_KEY: "",
  XAI_API_KEY: "",
  GROK_API_KEY: "",
  REPLICATE_API_TOKEN: "",
  MOLTBOOK_API_KEY: "",
  AUTH_SECRET: "",
  AUTH_GOOGLE_ID: "",
  AUTH_GOOGLE_SECRET: "",
  NEXT_PUBLIC_GA_MEASUREMENT_ID: "",
  ENABLE_LIVE_ANALYZE_API: "false",
  ENABLE_LIVE_DEBATE_API: "false",
  ENABLE_LIVE_JUDGING_API: "false",
  NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API: "false",
  NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API: "false",
  NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API: "false",
  NEXT_PUBLIC_ENABLE_AUTH: "false",
};

const child = spawn(process.execPath, ["server.js"], {
  cwd: standaloneDir,
  env: childEnv,
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
child.stdout.on("data", (chunk) => (output += chunk));
child.stderr.on("data", (chunk) => (output += chunk));

try {
  const healthResponse = await waitForReady(child, () => output);
  const health = await healthResponse.json();
  if (health.status !== "ok" || health.mode !== "offline") {
    throw new Error(`Unexpected health payload: ${JSON.stringify(health)}`);
  }

  const publicResponse = await fetch(`${origin}/icon.png`);
  if (!publicResponse.ok) throw new Error("Standalone public asset returned non-200.");

  const staticFile = await firstFile(staticDir);
  if (!staticFile) throw new Error("No standalone static asset was found.");
  const staticPath = relative(staticDir, staticFile).split(sep).join("/");
  const staticResponse = await fetch(`${origin}/_next/static/${staticPath}`);
  if (!staticResponse.ok) throw new Error("Standalone Next static asset returned non-200.");

  const pageResponse = await fetch(origin);
  if (!pageResponse.ok) throw new Error("Standalone homepage returned non-200.");

  const apiResponse = await fetch(`${origin}/api/v1`);
  if (!apiResponse.ok) throw new Error("Standalone public API returned non-200.");

  const analyzeResponse = await fetch(`${origin}/api/analyze`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "standalone-smoke-analyze",
    },
    body: JSON.stringify({
      content:
        "Supporters argue the proposal has measurable benefits. Critics counter that implementation creates material risks.",
      contentType: "freeform",
    }),
  });
  if (!analyzeResponse.ok) {
    throw new Error(`Standalone offline analysis returned ${analyzeResponse.status}.`);
  }
  const analysis = await analyzeResponse.json();
  if (
    analysis.id !== undefined ||
    analysis.execution?.analysis?.actual !== "offline" ||
    analysis.execution?.judging?.actual !== "disabled" ||
    !Array.isArray(analysis.extracted?.positions)
  ) {
    throw new Error(`Unexpected offline analysis payload: ${JSON.stringify(analysis)}`);
  }

  const debateResponse = await fetch(`${origin}/api/debate`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "standalone-smoke-debate",
    },
    body: JSON.stringify({
      topic: "A test proposal",
      topicId: "standalone-smoke",
      side: "for",
      model: "claude",
      round: 1,
      previousMessages: [],
    }),
  });
  if (!debateResponse.ok) {
    throw new Error(`Standalone programmatic debate returned ${debateResponse.status}.`);
  }
  const debate = await debateResponse.json();
  if (
    debate.execution?.actual !== "programmatic" ||
    debate.execution?.actualModel !== null ||
    typeof debate.argument !== "string" ||
    debate.argument.length === 0
  ) {
    throw new Error(`Unexpected programmatic debate payload: ${JSON.stringify(debate)}`);
  }

  const judgeResponse = await fetch(`${origin}/api/judge`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "standalone-smoke-judge",
    },
    body: JSON.stringify({
      type: "debate",
      topic: "A test proposal",
      messages: [
        { side: "for", round: 1, content: "The proposal has measurable benefits." },
        { side: "against", round: 1, content: "The proposal has material risks." },
      ],
    }),
  });
  if (!judgeResponse.ok) {
    throw new Error(`Standalone offline judge returned ${judgeResponse.status}.`);
  }
  const judgment = await judgeResponse.json();
  if (
    judgment.id !== undefined ||
    !Array.isArray(judgment.verdicts) ||
    judgment.verdicts.length !== 3
  ) {
    throw new Error(`Unexpected offline judgment payload: ${JSON.stringify(judgment)}`);
  }

  if (/\[db\]|persistence skipped|degraded JWT mode/i.test(output)) {
    throw new Error(`Offline standalone unexpectedly initialized an optional service.\n${output}`);
  }

  console.log(
    `Standalone smoke passed on ${origin}: health, homepage, assets, API v1, offline analysis, programmatic debate, and offline judging.`,
  );
} finally {
  if (child.exitCode === null) child.kill("SIGTERM");
  const stopped =
    child.exitCode !== null
      ? { code: child.exitCode, signal: child.signalCode }
      : await Promise.race([
          new Promise((resolve) =>
            child.once("exit", (code, signal) => resolve({ code, signal })),
          ),
          new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(null), 10_000);
            timeout.unref();
          }),
        ]);
  if (!stopped) {
    child.kill("SIGKILL");
    throw new Error("Standalone server did not stop within 10s of SIGTERM.");
  }
}
