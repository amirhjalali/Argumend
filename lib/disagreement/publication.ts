import { createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { DISAGREEMENT_PUBLICATION_TOKEN_TTL_MS } from "./constants";
import { canPublishReport, sanitizeForPublication } from "./quality";
import { parseDisagreementReport } from "@/lib/schemas/disagreement";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import type { ArgumentGraph } from "@/types/argument";
import type { DisagreementReportV1 } from "@/types/disagreement";

export function hashOpaque(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function digestReportBundle(report: DisagreementReportV1, graph: ArgumentGraph): string {
  const payload = JSON.stringify({ report, graph });
  return createHash("sha256").update(payload).digest("hex");
}

export function createPublicationToken(input: {
  digest: string;
  secret: string;
  now?: number;
}): { token: string; expiresAt: string } {
  const expiresAt = (input.now ?? Date.now()) + DISAGREEMENT_PUBLICATION_TOKEN_TTL_MS;
  const nonce = randomBytes(16).toString("hex");
  const body = `${input.digest}.${expiresAt}.${nonce}`;
  const signature = createHmac("sha256", input.secret).update(body).digest("hex");
  return {
    token: Buffer.from(`${body}.${signature}`).toString("base64url"),
    expiresAt: new Date(expiresAt).toISOString(),
  };
}

export function verifyPublicationToken(input: {
  token: string;
  digest: string;
  secret: string;
  now?: number;
}): boolean {
  try {
    const decoded = Buffer.from(input.token, "base64url").toString("utf8");
    const [digest, expiresAtRaw, nonce, signature] = decoded.split(".");
    if (!digest || !expiresAtRaw || !nonce || !signature) return false;
    if (digest !== input.digest) return false;
    if (Number(expiresAtRaw) < (input.now ?? Date.now())) return false;
    const expected = createHmac("sha256", input.secret)
      .update(`${digest}.${expiresAtRaw}.${nonce}`)
      .digest("hex");
    const left = Buffer.from(signature, "hex");
    const right = Buffer.from(expected, "hex");
    return left.length === right.length && timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function tokensMatch(raw: string, hashed: string): boolean {
  const actual = Buffer.from(hashOpaque(raw), "hex");
  const expected = Buffer.from(hashed, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createManageToken(): { raw: string; hash: string } {
  const raw = randomBytes(32).toString("base64url");
  return { raw, hash: hashOpaque(raw) };
}

export function createReportSlug(): string {
  return randomBytes(9).toString("base64url");
}

export function validatePublishPayload(input: unknown): {
  report: DisagreementReportV1;
  graph: ArgumentGraph;
} | { error: string } {
  if (!input || typeof input !== "object") return { error: "Invalid payload" };
  const record = input as { report?: unknown; graph?: unknown };
  const parsedReport = parseDisagreementReport(record.report);
  if (!parsedReport.success) return { error: "Invalid report" };
  const parsedGraph = parseArgumentGraph(record.graph);
  if (!parsedGraph.ok) return { error: "Invalid graph" };
  const publication = canPublishReport(parsedReport.data);
  if (!publication.ok) return { error: publication.reasons[0] ?? "Quality threshold not met" };
  return {
    report: sanitizeForPublication(parsedReport.data),
    graph: parsedGraph.graph,
  };
}

export function hashClientKey(value: string): string {
  return hashOpaque(value).slice(0, 32);
}
