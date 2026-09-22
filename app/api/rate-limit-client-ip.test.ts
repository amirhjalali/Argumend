/**
 * The rate-limit bypass, replayed against every route that limits by address.
 *
 * A proxy *appends* the peer address it saw to `x-forwarded-for`; it does not
 * replace the list. So the first entry is whatever the caller wrote, and a
 * route keying its limiter on it hands a rotating value a fresh bucket every
 * request. A reviewer cleared a ten-per-hour limit with fifteen requests.
 *
 * Each case below sends `maxRequests + 5` requests whose first entry rotates
 * and whose last entry — the one the trusted proxy appended — is fixed. The
 * limiter must see one bucket, allow exactly `maxRequests`, and refuse five.
 *
 * This is not folded into `http-contracts.test.ts`: that matrix replaces
 * `@/lib/rate-limit` with a stub that always refuses, which is exactly the
 * behaviour a bucketing test has to observe for real.
 *
 * A new route that rate-limits by address belongs in `routes` below.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DISAGREEMENT_ANALYZE_RATE_LIMITS } from "@/lib/disagreement/constants";
import { MAP_REPLY_RATE_LIMITS } from "@/lib/mapReply/constants";

const hoisted = vi.hoisted(() => ({
  auth: vi.fn(),
  keys: [] as string[],
  denials: [] as string[],
}));

vi.mock("@/lib/auth", () => ({ auth: hoisted.auth }));

// The real limiter, wrapped so the test can read back the keys it was handed
// and which of them it refused. Stubbing it out would test nothing.
vi.mock("@/lib/rate-limit", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/rate-limit")>();
  return {
    rateLimit: (key: string, opts: Parameters<typeof actual.rateLimit>[1]) => {
      const result = actual.rateLimit(key, opts);
      hoisted.keys.push(key);
      if (!result.success) hoisted.denials.push(key);
      return result;
    },
  };
});

import { GET as analysisGet } from "./analysis/[id]/route";
import { GET as analyzeGet, POST as analyzePost } from "./analyze/route";
import { POST as debatePost } from "./debate/route";
import { POST as debatePersistPost } from "./debate/persist/route";
import { POST as debateStreamPost } from "./debate/stream/route";
import { POST as disagreementsPost } from "./disagreements/analyze/route";
import { POST as judgePost } from "./judge/route";
import { POST as mapReplyPost } from "./map-reply/route";
import { POST as moltbookPost } from "./moltbook/route";
import { POST as newsletterPost } from "./newsletter/route";
import { GET as topicViewsGet, POST as topicViewsPost } from "./topic-views/route";

function get(path: string, forwardedFor: string): NextRequest {
  return new NextRequest(new URL(path, "http://localhost"), {
    headers: { "x-forwarded-for": forwardedFor },
  });
}

function post(path: string, forwardedFor: string): NextRequest {
  return new NextRequest(new URL(path, "http://localhost"), {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": forwardedFor },
    body: "{}",
  });
}

interface Route {
  /** The label the matrix reports under. */
  label: string;
  /** The route's own limit — how many requests one bucket is worth. */
  maxRequests: number;
  /** Distinct limiter keys a single request touches (some routes hold two buckets). */
  buckets: number;
  /**
   * The status a refused request answers with, or null where the route
   * deliberately hides the refusal (topic-views swallows it so scrapers
   * cannot map the limit). Those cases are judged on the limiter alone.
   */
  refusedStatus: number | null;
  /** The address the trusted proxy appended — the only value that may key the limit. */
  trustedIp: string;
  call: (forwardedFor: string) => Promise<Response>;
}

const routes: Route[] = [
  {
    label: "POST /api/analyze",
    maxRequests: 10,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.11",
    call: (xff) => analyzePost(post("/api/analyze", xff)),
  },
  {
    label: "GET /api/analyze",
    maxRequests: 30,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.12",
    call: (xff) => analyzeGet(get("/api/analyze", xff)),
  },
  {
    label: "GET /api/analysis/[id]",
    maxRequests: 30,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.13",
    call: (xff) =>
      analysisGet(get("/api/analysis/not-a-uuid", xff), {
        params: Promise.resolve({ id: "not-a-uuid" }),
      }),
  },
  {
    label: "POST /api/debate",
    maxRequests: 20,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.14",
    call: (xff) => debatePost(post("/api/debate", xff)),
  },
  {
    label: "POST /api/debate/stream",
    maxRequests: 20,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.15",
    call: (xff) => debateStreamPost(post("/api/debate/stream", xff)),
  },
  {
    label: "POST /api/debate/persist",
    maxRequests: 30,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.16",
    call: (xff) => debatePersistPost(post("/api/debate/persist", xff)),
  },
  {
    label: "POST /api/judge",
    maxRequests: 10,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.17",
    call: (xff) => judgePost(post("/api/judge", xff)),
  },
  {
    label: "POST /api/newsletter",
    maxRequests: 5,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.18",
    call: (xff) => newsletterPost(post("/api/newsletter", xff)),
  },
  {
    label: "POST /api/moltbook",
    maxRequests: 15,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.19",
    call: (xff) => moltbookPost(post("/api/moltbook", xff)),
  },
  {
    label: "POST /api/topic-views",
    maxRequests: 60,
    buckets: 1,
    refusedStatus: null,
    trustedIp: "198.51.100.20",
    call: (xff) => topicViewsPost(post("/api/topic-views", xff)),
  },
  {
    label: "GET /api/topic-views",
    maxRequests: 30,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.21",
    call: (xff) => topicViewsGet(get("/api/topic-views", xff)),
  },
  {
    label: "POST /api/disagreements/analyze",
    // The hourly bucket is the binding one; the daily bucket is checked on the
    // same request and stays well inside its allowance over this many tries.
    maxRequests: DISAGREEMENT_ANALYZE_RATE_LIMITS.perHour,
    buckets: 2,
    refusedStatus: 429,
    trustedIp: "198.51.100.22",
    call: (xff) => disagreementsPost(post("/api/disagreements/analyze", xff)),
  },
  {
    label: "POST /api/map-reply",
    // The daily bucket is only spent on a request that is going to be served,
    // and an empty body never is, so only the hourly bucket is touched here.
    maxRequests: MAP_REPLY_RATE_LIMITS.perHour,
    buckets: 1,
    refusedStatus: 429,
    trustedIp: "198.51.100.23",
    call: (xff) => mapReplyPost(post("/api/map-reply", xff)),
  },
];

describe("rate limits key on the address the proxy vouched for", () => {
  beforeEach(() => {
    hoisted.keys.length = 0;
    hoisted.denials.length = 0;
    hoisted.auth.mockResolvedValue({ user: { id: "user-1" } });
    // Flag-gated routes must get past their gate to reach the limiter.
    vi.stubEnv("AUTH_SECRET", "test-secret");
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "true");
    vi.stubEnv("ARGUMEND_DISAGREEMENT_PROVIDER", "fake");
    vi.stubEnv("ENABLE_JEV_MAP_REPLY", "true");
    vi.stubEnv("ARGUMEND_JEV_PROVIDER", "fake");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it.each(routes.map((route) => [route.label, route] as const))(
    "%s cannot be escaped by rotating the first x-forwarded-for entry",
    async (_label, route) => {
      const attempts = route.maxRequests + 5;
      const statuses: number[] = [];
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        const response = await route.call(`spoof-${attempt}, ${route.trustedIp}`);
        statuses.push(response.status);
      }

      // The whole bug in one assertion: a rotating first entry used to mint a
      // bucket per request, so this set held `attempts` keys instead of one.
      expect(new Set(hoisted.keys).size).toBe(route.buckets);
      expect(hoisted.keys.join(" ")).not.toContain("spoof");
      expect(hoisted.keys).toHaveLength(attempts * route.buckets);

      // Exactly the overflow is refused — the limit itself is unchanged.
      expect(hoisted.denials).toHaveLength(5);

      if (route.refusedStatus !== null) {
        expect(statuses.filter((status) => status === route.refusedStatus)).toHaveLength(5);
        expect(statuses.filter((status) => status !== route.refusedStatus)).toHaveLength(
          route.maxRequests,
        );
      }
    },
  );

  it("still separates two genuinely different clients", async () => {
    // The fix must not over-correct into one global bucket.
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await newsletterPost(post("/api/newsletter", `spoof, 203.0.113.41`));
    }
    const exhausted = await newsletterPost(post("/api/newsletter", "spoof, 203.0.113.41"));
    expect(exhausted.status).toBe(429);

    const neighbour = await newsletterPost(post("/api/newsletter", "spoof, 203.0.113.42"));
    expect(neighbour.status).not.toBe(429);
  });

  it("keys on x-real-ip when the proxy sent no forwarded list", async () => {
    const request = (ip: string) =>
      new NextRequest(new URL("http://localhost/api/newsletter"), {
        method: "POST",
        headers: { "content-type": "application/json", "x-real-ip": ip },
        body: "{}",
      });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await newsletterPost(request("203.0.113.51"));
    }
    expect((await newsletterPost(request("203.0.113.51"))).status).toBe(429);
    expect((await newsletterPost(request("203.0.113.52"))).status).not.toBe(429);
  });

  it("honours TRUSTED_PROXY_HOPS when a second proxy sits in front", async () => {
    // Cloudflare in front of Traefik: two appended entries, so the client
    // address is the second from the end and the last is Cloudflare's peer.
    vi.stubEnv("TRUSTED_PROXY_HOPS", "2");

    const statuses: number[] = [];
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const response = await newsletterPost(
        post("/api/newsletter", `spoof-${attempt}, 203.0.113.61, 10.0.0.${attempt}`),
      );
      statuses.push(response.status);
    }

    expect(new Set(hoisted.keys).size).toBe(1);
    expect(statuses.filter((status) => status === 429)).toHaveLength(5);
  });
});
