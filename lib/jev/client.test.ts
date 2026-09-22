import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  HttpJevProvider,
  JEV_DEFAULT_MODEL,
  backoffDelayMs,
  getJevProvider,
  isJevMapReplyEnabled,
  parseJevResponse,
  parseRetryAfterMs,
  resolveJevLane,
  resolveJevModel,
} from "./client";
import { jevTokensSpentToday, resetJevBudget } from "./budget";
import { FakeJevProvider } from "./fake";
import { JevError } from "./errors";
import type { JevQuestionSet } from "./types";

const QUESTIONS: JevQuestionSet = {
  probe: { type: "noul", instructions: "Is this a test?" },
};

function ok(body: unknown, headers?: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json", ...headers },
  });
}

function fail(status: number, headers?: Record<string, string>) {
  return new Response(JSON.stringify({ error: "nope" }), { status, headers });
}

const ANSWER = {
  model: "jev-1.13.0",
  answers: { probe: { type: "noul", noul: 0.42 } },
  usage: { input_tokens: 100, output_tokens: 3 },
};

function provider(fetchImpl: typeof fetch, overrides: Record<string, unknown> = {}) {
  return new HttpJevProvider({
    apiKey: "test-key",
    fetchImpl,
    sleepImpl: async () => undefined,
    ...overrides,
  });
}

describe("HttpJevProvider", () => {
  beforeEach(() => {
    resetJevBudget();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetJevBudget();
  });

  it("posts the pinned model with a bearer token and returns typed answers", async () => {
    const fetchImpl = vi.fn(async () => ok(ANSWER)) as unknown as typeof fetch;
    const result = await provider(fetchImpl).systemOne({ pasted_thread: "hi" }, QUESTIONS, {
      label: "probe",
    });

    expect(result.answers.probe.noul).toBe(0.42);
    expect(result.retries).toBe(0);
    expect(result.label).toBe("probe");
    expect(result.usage.input_tokens).toBe(100);

    const [, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    const request = init as RequestInit & { headers: Record<string, string> };
    expect(request.headers.Authorization).toBe("Bearer test-key");
    expect(JSON.parse(String(request.body)).model).toBe(JEV_DEFAULT_MODEL);
  });

  it("retries 429 and 5xx, including TypeSafe's 529, then succeeds", async () => {
    const statuses = [429, 503, 529];
    let call = 0;
    const fetchImpl = vi.fn(async () => {
      const status = statuses[call];
      call += 1;
      return status ? fail(status) : ok(ANSWER);
    }) as unknown as typeof fetch;

    const result = await provider(fetchImpl).systemOne({}, QUESTIONS);
    expect(result.retries).toBe(3);
    expect(call).toBe(4);
  });

  it("allows five retries before giving up", async () => {
    const fetchImpl = vi.fn(async () => fail(529)) as unknown as typeof fetch;
    await expect(provider(fetchImpl).systemOne({}, QUESTIONS)).rejects.toMatchObject({
      code: "JEV_UNAVAILABLE",
    });
    expect((fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(6);
  });

  it("does not retry a 4xx that is not 408 or 429", async () => {
    const fetchImpl = vi.fn(async () => fail(401)) as unknown as typeof fetch;
    await expect(provider(fetchImpl).systemOne({}, QUESTIONS)).rejects.toMatchObject({
      code: "JEV_REQUEST_FAILED",
      status: 401,
    });
    expect((fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(1);
  });

  it("honours Retry-After instead of its own backoff", async () => {
    const slept: number[] = [];
    let call = 0;
    const fetchImpl = vi.fn(async () => {
      call += 1;
      return call === 1 ? fail(429, { "retry-after": "2" }) : ok(ANSWER);
    }) as unknown as typeof fetch;

    await provider(fetchImpl, {
      sleepImpl: async (ms: number) => {
        slept.push(ms);
      },
    }).systemOne({}, QUESTIONS);

    expect(slept).toEqual([2000]);
  });

  it("fails fast instead of retrying early when Retry-After exceeds the cap", async () => {
    // A 429 that says "wait ten minutes" is a refusal. Retrying inside the
    // 45s budget just spends attempts to earn another 429.
    const slept: number[] = [];
    const fetchImpl = vi.fn(async () => fail(429, { "retry-after": "600" })) as unknown as typeof fetch;

    await expect(
      provider(fetchImpl, {
        sleepImpl: async (ms: number) => {
          slept.push(ms);
        },
      }).systemOne({}, QUESTIONS),
    ).rejects.toMatchObject({ code: "JEV_UNAVAILABLE", status: 429 });

    expect(slept).toEqual([]);
    expect((fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(1);
  });

  it("surfaces the wait the vendor asked for", async () => {
    const fetchImpl = vi.fn(async () => fail(503, { "retry-after": "120" })) as unknown as typeof fetch;
    let error: unknown;
    try {
      await provider(fetchImpl).systemOne({}, QUESTIONS);
    } catch (caught) {
      error = caught;
    }
    expect((error as JevError).message).toContain("120s wait");
  });

  it("still sits out a short Retry-After", async () => {
    const slept: number[] = [];
    let call = 0;
    const fetchImpl = vi.fn(async () => {
      call += 1;
      return call === 1 ? fail(429, { "retry-after": "9" }) : ok(ANSWER);
    }) as unknown as typeof fetch;

    await provider(fetchImpl, {
      sleepImpl: async (ms: number) => {
        slept.push(ms);
      },
    }).systemOne({}, QUESTIONS);

    expect(slept).toEqual([9000]);
  });

  it("charges a billed but unusable 200 to the daily ceiling", async () => {
    vi.stubEnv("JEV_DAILY_TOKEN_CEILING", "1000000");
    const fetchImpl = vi.fn(async () =>
      ok({ model: "jev-1.13.0", usage: { input_tokens: 800, output_tokens: 40 } }),
    ) as unknown as typeof fetch;

    await expect(provider(fetchImpl).systemOne({}, QUESTIONS)).rejects.toMatchObject({
      code: "JEV_BAD_RESPONSE",
    });
    expect(jevTokensSpentToday()).toBe(840);
  });

  it("never puts the API key into an error message", async () => {
    const fetchImpl = vi.fn(async () => fail(403)) as unknown as typeof fetch;
    let error: unknown;
    try {
      await provider(fetchImpl).systemOne({}, QUESTIONS);
    } catch (caught) {
      error = caught;
    }
    expect(error).toBeInstanceOf(JevError);
    expect((error as JevError).message).not.toContain("test-key");
  });

  it("times out a slow attempt and reports a timeout when attempts run out", async () => {
    const fetchImpl = vi.fn(
      (_url: string | URL | Request, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    ) as unknown as typeof fetch;

    await expect(
      provider(fetchImpl, { timeoutMs: 5, maxAttempts: 1 }).systemOne({}, QUESTIONS),
    ).rejects.toMatchObject({ code: "JEV_TIMEOUT" });
  });

  it("propagates a caller abort rather than swallowing it", async () => {
    const controller = new AbortController();
    const fetchImpl = vi.fn(
      (_url: string | URL | Request, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
          controller.abort();
        }),
    ) as unknown as typeof fetch;

    await expect(
      provider(fetchImpl).systemOne({}, QUESTIONS, { signal: controller.signal }),
    ).rejects.toThrow(/Aborted/);
  });

  it("refuses once the daily token ceiling is reached", async () => {
    vi.stubEnv("JEV_DAILY_TOKEN_CEILING", "150");
    const fetchImpl = vi.fn(async () => ok(ANSWER)) as unknown as typeof fetch;
    const client = provider(fetchImpl);

    await client.systemOne({}, QUESTIONS); // 103 tokens
    await client.systemOne({}, QUESTIONS); // 206 tokens, over the ceiling
    await expect(client.systemOne({}, QUESTIONS)).rejects.toMatchObject({
      code: "JEV_BUDGET_EXCEEDED",
    });
    expect((fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(2);
  });

  it("rejects an empty question set before spending anything", async () => {
    const fetchImpl = vi.fn(async () => ok(ANSWER)) as unknown as typeof fetch;
    await expect(provider(fetchImpl).systemOne({}, {})).rejects.toMatchObject({
      code: "JEV_REQUEST_FAILED",
    });
    expect((fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(0);
  });
});

describe("parseJevResponse", () => {
  it("defaults a missing model and usage rather than throwing", () => {
    const parsed = parseJevResponse({ answers: { a: { type: "noul", noul: 1 } } });
    expect(parsed.model).toBe("unknown");
    expect(parsed.usage).toEqual({ input_tokens: 0, output_tokens: 0 });
  });

  it("rejects a payload with no answers object", () => {
    expect(() => parseJevResponse({ model: "x" })).toThrow(JevError);
    expect(() => parseJevResponse(null)).toThrow(JevError);
  });
});

describe("parseRetryAfterMs", () => {
  it("reads delta-seconds and HTTP dates without clamping either", () => {
    expect(parseRetryAfterMs("3")).toBe(3000);
    // Unclamped: the caller has to be able to tell 3 seconds from 10 minutes.
    expect(parseRetryAfterMs("600")).toBe(600_000);
    expect(parseRetryAfterMs(null)).toBeNull();
    expect(parseRetryAfterMs("")).toBeNull();
    expect(parseRetryAfterMs("not-a-date")).toBeNull();
    const now = Date.parse("2026-09-21T00:00:00Z");
    expect(parseRetryAfterMs("Mon, 21 Sep 2026 00:00:02 GMT", now)).toBe(2000);
    expect(parseRetryAfterMs("Mon, 21 Sep 2026 00:10:00 GMT", now)).toBe(600_000);
  });
});

describe("backoffDelayMs", () => {
  it("grows and is capped", () => {
    expect(backoffDelayMs(1, () => 0)).toBe(800);
    expect(backoffDelayMs(2, () => 0)).toBe(1600);
    expect(backoffDelayMs(9, () => 0)).toBe(4000);
  });
});

describe("lane selection", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is off by default", () => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "");
    vi.stubEnv("TYPESAFE_API_KEY", "");
    vi.stubEnv("ARGUMEND_JEV_PROVIDER", "");
    expect(isJevMapReplyEnabled()).toBe(false);
    expect(resolveJevLane()).toBe("fake");
    expect(getJevProvider()).toBeInstanceOf(FakeJevProvider);
  });

  it("stays on the fake lane when the flag is on but no key is set", () => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "true");
    vi.stubEnv("TYPESAFE_API_KEY", "");
    expect(resolveJevLane()).toBe("fake");
    expect(getJevProvider().lane).toBe("fake");
  });

  it("uses the HTTP lane when the flag is on and a key is set", () => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "true");
    vi.stubEnv("TYPESAFE_API_KEY", "abc");
    expect(resolveJevLane()).toBe("http");
    expect(getJevProvider().lane).toBe("http");
  });

  it("lets ARGUMEND_JEV_PROVIDER force the fake lane", () => {
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "true");
    vi.stubEnv("TYPESAFE_API_KEY", "abc");
    vi.stubEnv("ARGUMEND_JEV_PROVIDER", "fake");
    expect(resolveJevLane()).toBe("fake");
  });

  it("pins the model unless JEV_MODEL overrides it", () => {
    vi.stubEnv("JEV_MODEL", "");
    expect(resolveJevModel()).toBe("jev-1.13.0");
    vi.stubEnv("JEV_MODEL", "jev-2.0.0");
    expect(resolveJevModel()).toBe("jev-2.0.0");
  });
});
