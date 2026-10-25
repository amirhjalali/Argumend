import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import rawLedger from "@/data/argument/capitalism-after-ai.ledger.json";
import { loadArgumentTopic } from "./draftTopics";
import { currentLedgerEntries, parseCruxLedger, publicLedgerEntries } from "./ledger";
import { validateArgumentGraph } from "./validate";

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value !== null && typeof value === "object") {
    return `{${Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b, "en"))
      .map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

describe("capitalism evidence integration and append-only ledger", () => {
  const topic = loadArgumentTopic("capitalism-after-ai", { readLedger: () => null })!;
  const parsed = parseCruxLedger(rawLedger, topic.graph);
  if (!parsed.ok) throw new Error(parsed.errors.join("\n"));
  const entries = parsed.ledger.entries;

  it("validates the combined graph and ledger without ledger warnings", () => {
    expect(validateArgumentGraph(topic.graph).filter((issue) => issue.severity === "error")).toEqual([]);
    expect(parsed.warnings).toEqual([]);
  });

  it("preserves the original seven entries apart from their supersession pointers", () => {
    const originals = entries.filter((entry) => entry.createdAt === "2026-09-22T00:00:00Z");
    expect(originals).toHaveLength(7);
    const history = originals.map(({ supersededBy, ...original }) => {
      const correction = entries.find((entry) => entry.id === supersededBy);
      expect(correction).toMatchObject({
        claimId: original.claimId,
        noticedAt: "2026-10-25",
        createdAt: "2026-10-25",
        status: original.status,
      });
      expect(correction!.evidenceNodeIds.length).toBeGreaterThan(0);
      return original;
    });
    // Hash of the published September record before this integration, with
    // object keys sorted and array order preserved. Corrections must append.
    expect(createHash("sha256").update(canonicalJson(history)).digest("hex")).toBe(
      "38baf093fa010ff02304691d88262b3ebf81609ca5a83f451b8bd5635ef7f56d",
    );
  });

  it("publishes the corrected source dates without upgrading forecast statuses", () => {
    expect(entries).toHaveLength(14);
    expect(publicLedgerEntries(entries)).toHaveLength(7);
    const current = currentLedgerEntries(entries);
    expect(Object.fromEntries(Object.entries(current).map(([id, entry]) => [id, entry.status]))).toEqual({
      "c-survival-definition-contested": "unresolvable",
      "c-ai-ownership-stays-concentrated": "narrowed",
      "c-reallocation-keeps-pace": "open",
      "c-demand-collapse-without-recycling": "open",
      "c-wage-channel-loses-primacy": "open",
    });
    expect(current["c-reallocation-keeps-pace"].date).toBe("2026-10-14");
    expect(current["c-demand-collapse-without-recycling"].date).toBe("2026-09-30");
    expect(current["c-wage-channel-loses-primacy"].date).toBe("2026-09-30");
  });
});
