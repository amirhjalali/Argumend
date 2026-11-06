import { describe, expect, it } from "vitest";
import { row } from "@/test/fixtures/study";
import {
  actualShares,
  analyseStudy,
  armsCsv,
  exclusionReason,
  healthSummary,
  holm,
  normalCdf,
  olsHc2,
  perceptionGap,
  responsesCsv,
  type StudyRow,
} from "./analysis";
import { STUDY_ARMS, STUDY_TOPICS, type StudyArm } from "./constants";

/** Seeded noise, so the synthetic studies are reproducible. */
function seeded(seed: number) {
  let state = seed;
  const uniform = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  return (spread: number) => (uniform() + uniform() + uniform() - 1.5) * spread;
}

/**
 * A synthetic study. Everyone agrees with statements 1–3 and not 4–5, so the
 * actual share is 100 for the first three and 0 for the last two. Before
 * reading, everyone guesses 50 (a 50-point gap). After reading, the gap falls
 * by `shrink[arm]` points, plus noise.
 */
function synthetic(perCell: number, shrink: Record<StudyArm, number>, seed = 3): StudyRow[] {
  const noise = seeded(seed);
  const rows: StudyRow[] = [];
  for (const topic of STUDY_TOPICS) {
    for (const arm of STUDY_ARMS) {
      for (const party of ["democrat", "republican"] as const) {
        for (let i = 0; i < perCell; i++) {
          const pre = 50 + noise(20);
          const post = Math.max(0, pre - shrink[arm] + noise(20));
          const clamp = (v: number) => Math.round(Math.max(0, Math.min(100, v)));
          rows.push(
            row(topic, arm, party, {
              ownAgreePre: [4, 3, 3, 1, 2],
              ownAgreePost: [4, 3, 3, 1, 2],
              otherEstimatePre: [100 - pre, 100 - pre, 100 - pre, pre, pre].map(clamp),
              otherEstimatePost: [100 - post, 100 - post, 100 - post, post, post].map(clamp),
            }),
          );
        }
      }
    }
  }
  return rows;
}

describe("perception gap", () => {
  it("benchmarks against the other party's own pre-reading answers", () => {
    const dem = row("gun-control-effectiveness", "map", "democrat", {
      ownAgreePre: [4, 4, 1, 1, 3],
      otherEstimatePre: [60, 60, 60, 60, 60],
      otherEstimatePost: [50, 50, 50, 50, 50],
    });
    const reps = [
      row("gun-control-effectiveness", "chatbot", "republican", { ownAgreePre: [4, 1, 1, 3, 3] }),
      row("gun-control-effectiveness", "article", "republican", { ownAgreePre: [3, 2, 1, 2, 4] }),
    ];
    const shares = actualShares([dem, ...reps]);
    expect(shares["gun-control-effectiveness"]?.republican).toEqual([100, 0, 0, 50, 100]);
    // |60-100| + |60-0| + |60-0| + |60-50| + |60-100| = 40+60+60+10+40 = 210, /5 = 42
    expect(perceptionGap(dem, shares, "pre")).toBe(42);
    expect(perceptionGap(dem, shares, "pre", true)).toBe((-40 + 60 + 60 + 10 - 40) / 5);
    // A topic with no other-party participants has no benchmark.
    expect(perceptionGap(row("immigration-border-crisis", "map", "democrat"), shares, "pre")).toBeNull();
  });
});

describe("pre-registered exclusions", () => {
  it("drops failed attention checks, sessions under four minutes and other instrument versions", () => {
    expect(exclusionReason(row("gun-control-effectiveness", "map", "democrat"))).toBeNull();
    expect(exclusionReason(row("gun-control-effectiveness", "map", "democrat", { attention: 3 }))).toBe("attention");
    expect(exclusionReason(row("gun-control-effectiveness", "map", "democrat", { totalSeconds: 239 }))).toBe("too-fast");
    expect(exclusionReason(row("gun-control-effectiveness", "map", "democrat", { version: "study-v0" }))).toBe("version");
  });
});

describe("statistics", () => {
  it("normal CDF matches known values", () => {
    expect(normalCdf(0)).toBeCloseTo(0.5, 6);
    expect(normalCdf(1.959964)).toBeCloseTo(0.975, 5);
    expect(normalCdf(-1)).toBeCloseTo(0.158655, 5);
  });

  it("OLS recovers a known line", () => {
    const xs = Array.from({ length: 50 }, (_, i) => i);
    const y = xs.map((x) => 3 + 2 * x + (x % 2 ? 0.5 : -0.5));
    const [intercept, slope] = olsHc2(y, xs.map((x) => [1, x]), ["intercept", "x"]);
    expect(intercept.estimate).toBeCloseTo(3, 1);
    expect(slope.estimate).toBeCloseTo(2, 2);
    expect(slope.se).toBeGreaterThan(0);
  });

  it("reports p = 1 when an outcome has no residual variance", () => {
    const y = [1, 1, 1, 1, 1, 1];
    const [, slope] = olsHc2(y, y.map((_, i) => [1, i % 2]), ["intercept", "x"]);
    expect(slope.p).toBeCloseTo(1, 6);
  });

  it("Holm adjusts in step-down order and keeps the input order", () => {
    expect(holm([0.01, 0.04, 0.03, 0.2])).toEqual([0.04, 0.09, 0.09, 0.2]);
  });
});

describe("the primary analysis", () => {
  it("supports H1 when the map arm shrinks the gap more than both other arms", () => {
    const report = analyseStudy(synthetic(20, { map: 15, chatbot: 5, article: 2 }));
    expect(report.h1).toBe("supported");
    const [vsChatbot, vsArticle] = report.primary;
    expect(vsChatbot.versus).toBe("chatbot");
    expect(vsChatbot.estimate).toBeGreaterThan(5);
    expect(vsArticle.estimate).toBeGreaterThan(vsChatbot.estimate);
    expect(vsChatbot.p).toBeLessThan(0.05);
  });

  it("does not support H1 when the map only beats the article", () => {
    const report = analyseStudy(synthetic(20, { map: 10, chatbot: 10, article: 0 }));
    expect(report.h1).toBe("not supported");
  });

  it("does not support H1 when nothing differs, and calls the arms equivalent only with enough data", () => {
    const small = analyseStudy(synthetic(20, { map: 5, chatbot: 5, article: 5 }, 11));
    expect(small.h1).toBe("not supported");
    const large = analyseStudy(synthetic(120, { map: 5, chatbot: 5, article: 5 }, 11));
    expect(large.primary.every((c) => c.equivalent)).toBe(true);
    const different = analyseStudy(synthetic(120, { map: 15, chatbot: 5, article: 5 }, 11));
    expect(different.primary.some((c) => c.equivalent)).toBe(false);
  });

  it("reports insufficient data rather than a model on a handful of rows", () => {
    expect(analyseStudy(synthetic(1, { map: 15, chatbot: 0, article: 0 })).h1).toBe("insufficient data");
  });

  it("applies exclusions before computing the benchmark", () => {
    const rows = synthetic(20, { map: 15, chatbot: 5, article: 2 });
    rows[0].attention = 4;
    rows[1].totalSeconds = 100;
    const report = analyseStudy(rows);
    expect(report.excluded).toEqual({ version: 0, attention: 1, "too-fast": 1 });
    expect(report.analysed).toHaveLength(rows.length - 2);
  });

  it("scores crux identification against the map and Holm-adjusts the secondary family", () => {
    const rows = synthetic(20, { map: 10, chatbot: 10, article: 10 }).map((r, i) =>
      r.arm === "map" || i % 3 === 0
        ? r
        : { ...r, cruxChoice: r.topic === "gun-control-effectiveness" ? "rate-vs-peers" : "court-backlog" },
    );
    const report = analyseStudy(rows);
    const map = report.arms.find((arm) => arm.arm === "map")!;
    const chatbot = report.arms.find((arm) => arm.arm === "chatbot")!;
    expect(map.cruxCorrect).toBeGreaterThan(chatbot.cruxCorrect);
    expect(report.secondary.map((c) => c.outcome)).toEqual(["crux", "crux", "charity", "charity"]);
    for (const c of report.secondary) expect(c.pAdjusted).toBeGreaterThanOrEqual(c.p);
  });

  it("exports one CSV row per analysed participant and one per arm, hashes only", () => {
    const report = analyseStudy(synthetic(12, { map: 10, chatbot: 5, article: 2 }));
    const responses = responsesCsv(report).trim().split("\n");
    expect(responses).toHaveLength(report.analysed.length + 1);
    expect(responses[0]).toContain("pid_hash");
    expect(responses[0]).not.toMatch(/prolific_pid|session/);
    const arms = armsCsv(report).trim().split("\n");
    expect(arms).toHaveLength(4);
    expect(arms[0].split(",")[0]).toBe("arm");
  });
});

describe("the blind health check", () => {
  it("counts drop-out, exclusions and timing per arm without any outcome", () => {
    const assignments = [
      ...Array(4).fill({ arm: "map" }),
      ...Array(2).fill({ arm: "chatbot" }),
    ] as { arm: StudyArm }[];
    const rows = [
      row("gun-control-effectiveness", "map", "democrat", { totalSeconds: 600 }),
      row("gun-control-effectiveness", "map", "democrat", { attention: 4, totalSeconds: 200 }),
      row("gun-control-effectiveness", "chatbot", "republican"),
    ];
    const cells = healthSummary(assignments, rows);
    expect(cells.find((c) => c.arm === "map")).toMatchObject({
      assigned: 4,
      completed: 2,
      dropOut: 0.5,
      failedAttention: 1,
      tooFast: 1,
      medianTotalSeconds: 400,
    });
    expect(Object.keys(cells[0]).join(" ")).not.toMatch(/gap|crux|charity|perceived/);
  });
});
