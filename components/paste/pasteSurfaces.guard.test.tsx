import "@/test/setup-dom";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "@/lib/disagreement/prompts/v1/examples";
import { findMaps } from "@/lib/paste/maps";
import { buildPasteSummary } from "@/lib/paste/summary";
import type { PasteLanes, PasteMapsResult } from "@/lib/paste/types";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));
// The shell is not a paste surface; render the page content alone.
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

import RetiredAnalysisPage from "@/app/analysis/[id]/page";
import { MapMatch, MapNoMatch, RelatedMaps } from "./MapResult";
import { PasteClient } from "./PasteClient";

/**
 * Guard: no paste surface names a side's score or a winner.
 *
 * The paste tool used to end in "Aggregate Scores FOR 4.7 / AGAINST 5.0",
 * three rule-based "evaluators" and a judging checkbox that was on by
 * default. The north star rules that out for good ("never a winner"), so
 * every state of every paste surface is rendered here and its visible text
 * checked. Upper-case FOR / AGAINST are the old side badges; "for" and
 * "against" in ordinary prose are fine.
 */
function forbiddenWords(text: string): string[] {
  return [
    ...(text.match(/\b(?:FOR|AGAINST)\b/g) ?? []),
    ...(text.match(/aggregate|winner|judg|\bverdict\b|\d+\s*\/\s*(?:10|40)\b/gi) ?? []),
  ];
}

const FIXTURES: PasteLanes = {
  maps: true,
  diagnosis: { enabled: true, providerIds: [], fixtures: true },
};
const OFFLINE: PasteLanes = { maps: true, diagnosis: { enabled: false } };

let matched: PasteMapsResult;
let flagship: PasteMapsResult;
let unmatched: PasteMapsResult;
let diagnosis: {
  report: Awaited<ReturnType<typeof analyzeDisagreement>>["report"];
  graph: unknown;
};

beforeAll(async () => {
  matched = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
  flagship = await findMaps(
    "Capitalism can't survive AI: if machines do the work, labor's share of income collapses and wages stop being how people get money.",
  );
  unmatched = await findMaps("Pineapple on pizza is great. It's an abomination, fruit does not belong on pizza.");
  const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
  const bundle = await analyzeDisagreement({
    content: `${example.source}\n\n${"Context for length. ".repeat(8)}`,
    contentType: "conversation",
    requestId: "11111111-1111-1111-1111-111111111111",
    provider: new FakeDisagreementProvider(example.extraction),
  });
  diagnosis = { report: bundle.report, graph: bundle.graph };
}, 60_000);

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("paste surfaces never score sides or name a winner", () => {
  it.each([
    ["the input, lanes off", OFFLINE],
    ["the input, diagnosis on", FIXTURES],
  ])("%s", (_label, lanes) => {
    vi.stubGlobal("fetch", vi.fn());
    const view = render(<PasteClient lanes={lanes} />);
    expect(forbiddenWords(view.container.textContent ?? "")).toEqual([]);
  });

  it("a full result: diagnosis, map, next step, closest maps and how it was read", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) =>
        Promise.resolve({
          ok: true,
          json: async () =>
            url === "/api/analyze"
              ? { maps: matched }
              : { ...diagnosis, publishing: { available: false } },
        } as Response),
      ),
    );
    const view = render(<PasteClient lanes={FIXTURES} />);
    fireEvent.click(view.getByRole("button", { name: "See an example" }));
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));
    await waitFor(() => view.getByText("Argumend diagnosis"));
    fireEvent.click(view.getByText("How this was read"));

    expect(forbiddenWords(view.container.textContent ?? "")).toEqual([]);
  });

  it.each([
    ["a pillar map", () => matched],
    ["a flagship map", () => flagship],
  ])("the map block for %s", (_label, result) => {
    const match = result().match;
    expect(match).not.toBeNull();
    const view = render(<MapMatch match={match!} related={result().related} />);
    expect(forbiddenWords(view.container.textContent ?? "")).toEqual([]);
  });

  it("the closely related maps", () => {
    expect(matched.related.length).toBeGreaterThan(0);
    const view = render(<RelatedMaps maps={matched.related} />);
    expect(forbiddenWords(view.container.textContent ?? "")).toEqual([]);
  });

  it("the no-map answer", () => {
    const view = render(<MapNoMatch maps={unmatched} />);
    expect(forbiddenWords(view.container.textContent ?? "")).toEqual([]);
  });

  it("the copied summary, which also carries no participant names", () => {
    const summary = buildPasteSummary({ maps: matched, report: diagnosis.report });
    expect(forbiddenWords(summary)).toEqual([]);
    for (const participant of diagnosis.report.participants) {
      expect(summary).not.toMatch(new RegExp(`\\b${participant.label}\\b`));
    }
  });

  it("the retired saved-analysis page", () => {
    const view = render(<RetiredAnalysisPage />);
    expect(forbiddenWords(view.container.textContent ?? "")).toEqual([]);
  });
});

describe("paste surfaces import no judging or scoreboard component", () => {
  const roots = ["components/paste", "components/disagreement", "app/analyze", "app/analysis", "app/api/analyze"];
  const walk = (dir: string): string[] =>
    readdirSync(join(process.cwd(), dir), { withFileTypes: true }).flatMap((entry) => {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) return walk(path);
      return /\.tsx?$/.test(entry.name) && !entry.name.includes(".test.") ? [path] : [];
    });
  const files = roots.flatMap((root) => walk(root));

  it.each(files)("%s", (file) => {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    expect(source).not.toMatch(/JudgingResults|ShareVerdictCard|@\/lib\/judge\/|SplitStrengthBar|StrengthBadge/);
  });
});
