import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PID, STUDY_ID, validResponse } from "@/test/fixtures/study";

const db = vi.hoisted(() => ({ configured: false }));
const store = vi.hoisted(() => ({
  findAssignment: vi.fn(),
  countAssignments: vi.fn(),
  insertAssignment: vi.fn(),
  insertResponse: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  isDatabaseConfigured: () => db.configured,
  getDb: () => {
    throw new Error("tests never reach the real database");
  },
}));
vi.mock("@/lib/study/store", () => store);

import { POST as assignPost } from "./assign/route";
import { POST as responsePost } from "./response/route";

const SECRET = "s".repeat(40);

function post(path: string, body: unknown): NextRequest {
  return new NextRequest(new URL(path, "http://localhost"), {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.9" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const assignBody = (party = "democrat") => ({
  version: "study-v1",
  prolificPid: PID,
  prolificStudyId: STUDY_ID,
  party,
});

beforeEach(() => {
  vi.stubEnv("ENABLE_STUDY_RESPONSES", "true");
  vi.stubEnv("STUDY_COMPLETION_CODE", "C1A2B3C4");
  vi.stubEnv("STUDY_SCREENOUT_CODE", "");
  vi.stubEnv("STUDY_PID_SECRET", SECRET);
  db.configured = false;
  for (const fn of Object.values(store)) fn.mockReset();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("study API flag gate", () => {
  it("answers 404 on both routes while ENABLE_STUDY_RESPONSES is off, and touches nothing", async () => {
    vi.stubEnv("ENABLE_STUDY_RESPONSES", "");
    db.configured = true;
    expect((await assignPost(post("/api/study/assign", assignBody()))).status).toBe(404);
    expect((await responsePost(post("/api/study/response", validResponse()))).status).toBe(404);
    expect(store.findAssignment).not.toHaveBeenCalled();
    expect(store.insertResponse).not.toHaveBeenCalled();
  });

  it("is not opened by the page flag", async () => {
    vi.stubEnv("ENABLE_STUDY_RESPONSES", "");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "true");
    expect((await assignPost(post("/api/study/assign", assignBody()))).status).toBe(404);
  });
});

describe("POST /api/study/assign", () => {
  it("refuses malformed JSON, unknown keys and oversize bodies", async () => {
    expect((await assignPost(post("/api/study/assign", "{not json"))).status).toBe(400);
    expect((await assignPost(post("/api/study/assign", { ...assignBody(), arm: "map" }))).status).toBe(400);
    const huge = { ...assignBody(), pad: "x".repeat(20_000) };
    expect((await assignPost(post("/api/study/assign", huge))).status).toBe(413);
  });

  it("screens out a participant closer to neither party, storing nothing", async () => {
    db.configured = true;
    vi.stubEnv("STUDY_SCREENOUT_CODE", "SCREEN01");
    const res = await assignPost(post("/api/study/assign", assignBody("neither")));
    expect(await res.json()).toEqual({
      screenedOut: true,
      screenoutUrl: "https://app.prolific.com/submissions/complete?cc=SCREEN01",
    });
    expect(store.insertAssignment).not.toHaveBeenCalled();
  });

  it("runs dry without a database: a real cell, nothing stored, a warning", async () => {
    const res = await assignPost(post("/api/study/assign", assignBody()));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.stored).toBe(false);
    expect(["map", "chatbot", "article"]).toContain(data.arm);
    expect(store.insertAssignment).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("dry run"));
  });

  it("refuses to run against a database without a usable secret", async () => {
    db.configured = true;
    vi.stubEnv("STUDY_PID_SECRET", "short");
    const res = await assignPost(post("/api/study/assign", assignBody()));
    expect(res.status).toBe(503);
    expect(store.findAssignment).not.toHaveBeenCalled();
  });

  it("assigns the least-filled cell in the participant's stratum and stores only the hash", async () => {
    db.configured = true;
    store.findAssignment.mockResolvedValue(null);
    // Every cell has 3 but one.
    store.countAssignments.mockResolvedValue({
      "gun-control-effectiveness:map": 3,
      "gun-control-effectiveness:chatbot": 3,
      "gun-control-effectiveness:article": 3,
      "immigration-border-crisis:map": 3,
      "immigration-border-crisis:chatbot": 3,
      "immigration-border-crisis:article": 3,
      "transgender-athletes-sports:map": 3,
      "transgender-athletes-sports:chatbot": 3,
    });
    store.insertAssignment.mockImplementation(async (row) => ({ topic: row.topic, arm: row.arm, party: row.party }));
    const res = await assignPost(post("/api/study/assign", assignBody("republican")));
    expect(await res.json()).toEqual({ topic: "transgender-athletes-sports", arm: "article", stored: true });
    expect(store.countAssignments).toHaveBeenCalledWith(STUDY_ID, "republican");
    const stored = store.insertAssignment.mock.calls[0][0];
    expect(stored.pidHash).toMatch(/^[a-f0-9]{64}$/);
    expect(JSON.stringify(stored)).not.toContain(PID);
    expect(stored.assignedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("gives a returning participant the cell they already have", async () => {
    db.configured = true;
    store.findAssignment.mockResolvedValue({ topic: "immigration-border-crisis", arm: "chatbot", party: "democrat" });
    const res = await assignPost(post("/api/study/assign", assignBody()));
    expect(await res.json()).toMatchObject({ topic: "immigration-border-crisis", arm: "chatbot", returning: true });
    expect(store.insertAssignment).not.toHaveBeenCalled();
  });

  it("answers 503, not 500, when the database fails", async () => {
    db.configured = true;
    store.findAssignment.mockRejectedValue(new Error("connection refused postgres://user:pw@host/db"));
    const res = await assignPost(post("/api/study/assign", assignBody()));
    expect(res.status).toBe(503);
    expect(JSON.stringify(await res.json())).not.toContain("postgres://");
  });
});

describe("POST /api/study/response", () => {
  it("refuses a response with free text or out-of-range answers", async () => {
    db.configured = true;
    expect((await responsePost(post("/api/study/response", { ...validResponse(), comment: "hi" }))).status).toBe(400);
    expect((await responsePost(post("/api/study/response", validResponse({ attention: 9 })))).status).toBe(400);
    expect(store.insertResponse).not.toHaveBeenCalled();
  });

  it("runs dry without a database and still hands back the completion URL", async () => {
    const res = await responsePost(post("/api/study/response", validResponse()));
    expect(await res.json()).toEqual({
      stored: false,
      completionUrl: "https://app.prolific.com/submissions/complete?cc=C1A2B3C4",
    });
    expect(store.insertResponse).not.toHaveBeenCalled();
  });

  it("refuses a response from someone the server never assigned", async () => {
    db.configured = true;
    store.findAssignment.mockResolvedValue(null);
    const res = await responsePost(post("/api/study/response", validResponse()));
    expect(res.status).toBe(409);
    expect((await res.json()).completionUrl).toBeUndefined();
  });

  it("refuses a response that reports a different cell than the one assigned", async () => {
    db.configured = true;
    store.findAssignment.mockResolvedValue({ topic: "gun-control-effectiveness", arm: "chatbot", party: "democrat" });
    const res = await responsePost(post("/api/study/response", validResponse({ arm: "map" })));
    expect(res.status).toBe(409);
    expect(store.insertResponse).not.toHaveBeenCalled();
  });

  it("stores a matching response under the hash, without the raw Prolific id", async () => {
    db.configured = true;
    store.findAssignment.mockResolvedValue({ topic: "gun-control-effectiveness", arm: "map", party: "democrat" });
    store.insertResponse.mockResolvedValue(true);
    const res = await responsePost(post("/api/study/response", validResponse()));
    expect(await res.json()).toEqual({
      stored: true,
      duplicate: false,
      completionUrl: "https://app.prolific.com/submissions/complete?cc=C1A2B3C4",
    });
    const [response, pidHash, day] = store.insertResponse.mock.calls[0];
    expect(response).not.toHaveProperty("prolificPid");
    expect(JSON.stringify(response)).not.toContain(PID);
    expect(pidHash).toMatch(/^[a-f0-9]{64}$/);
    expect(day).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // The same id and secret give the same pseudonym as at assignment.
    expect(store.findAssignment).toHaveBeenCalledWith(pidHash);
  });

  it("accepts and ignores a second submission", async () => {
    db.configured = true;
    store.findAssignment.mockResolvedValue({ topic: "gun-control-effectiveness", arm: "map", party: "democrat" });
    store.insertResponse.mockResolvedValue(false);
    const res = await responsePost(post("/api/study/response", validResponse()));
    expect(await res.json()).toMatchObject({ stored: false, duplicate: true });
  });

  it("never caches a response", async () => {
    const res = await responsePost(post("/api/study/response", validResponse()));
    expect(res.headers.get("cache-control")).toBe("no-store");
  });
});
