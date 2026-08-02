import { describe, expect, it } from "vitest";
import { sanitizeServerLog } from "./sanitizeServerLog";

describe("sanitizeServerLog", () => {
  it.each([
    "connect postgresql://admin:p%40ssword@db.internal:5432/argumend failed",
    "connect postgres://reader:correct-horse@db.internal/app?sslmode=require failed",
  ])("removes database URLs and credentials from %s", (input) => {
    const output = sanitizeServerLog(input);
    expect(output).toContain("[redacted database URL]");
    expect(output).not.toMatch(/admin|reader|p%40ssword|correct-horse|db\.internal/);
    expect(output).toContain("connect");
    expect(output).toContain("failed");
  });

  it("redacts bearer tokens, named secrets, and common provider key shapes", () => {
    const secrets = [
      "eyJhbGciOiJIUzI1NiJ9.payload.signature",
      "newsletter-secret-value-123456",
      "sk-proj-abcdefghijklmnopqrstuvwxyz123456",
      "xai-abcdefghijklmnopqrstuvwxyz123456",
      "AIzaSyA1234567890abcdefghijklmnop",
      "AKIAABCDEFGHIJKLMNOP",
    ];
    const output = sanitizeServerLog(
      `Authorization: Bearer ${secrets[0]}; api_key=${secrets[1]}; ${secrets
        .slice(2)
        .join(" ")}`,
    );

    for (const secret of secrets) expect(output).not.toContain(secret);
    expect(output).toContain("Authorization: [redacted]");
    expect(sanitizeServerLog(`request failed: Bearer ${secrets[0]}`)).toContain(
      "Bearer [redacted]",
    );
  });

  it("redacts sensitive fields in nested and circular unknown objects", () => {
    const input: Record<string, unknown> = {
      operation: "newsletter insert",
      retryable: true,
      headers: { authorization: "Bearer deeply-secret-token" },
      apiKey: "api-key-value-that-must-not-escape",
    };
    input.self = input;

    const output = sanitizeServerLog(input);
    expect(output).toContain("newsletter insert");
    expect(output).toContain('"retryable":true');
    expect(output).toContain("[circular]");
    expect(output).not.toMatch(/deeply-secret-token|api-key-value-that-must-not-escape/);
  });

  it("keeps ordinary Error diagnostics useful", () => {
    const output = sanitizeServerLog(
      new TypeError("column detected_biases does not exist at migration 0001"),
    );
    expect(output).toContain("column detected_biases does not exist");
    expect(output).toContain("migration 0001");
  });

  it("removes bound database parameters that can contain private content", () => {
    const output = sanitizeServerLog(
      new Error(
        'Failed query: insert into "analyses" ("topic") values ($1)\nparams: private user argument text',
      ),
    );

    expect(output).toContain('insert into "analyses"');
    expect(output).toContain("params: [redacted]");
    expect(output).not.toContain("private user argument text");
  });

  it("does not alter ordinary URLs or diagnostic identifiers", () => {
    const input = "GET https://api.example.test/health failed with request req_42";
    expect(sanitizeServerLog(input)).toBe(input);
  });

  it("is idempotent after mixed credentials have been redacted", () => {
    const once = sanitizeServerLog(
      "postgres://user:pass@db/app Authorization: Bearer secret-token-123456789",
    );
    expect(sanitizeServerLog(once)).toBe(once);
    expect(once).toBe(
      "[redacted database URL] Authorization: [redacted]",
    );
  });
});
