/**
 * The opening contract over every map (round-6 review, issue A).
 *
 * Legacy maps: the lede is `keystone_fact.statement` (page.hook) and the
 * summary is `simple_case` joined (page.cruxLede), as lib/topicPage/legacy.ts
 * renders them. Flagship maps: `meta.hook` and `meta.tldr`, as
 * components/argument/DebateView.tsx renders them. Each is read against the
 * crux questions its own page lists. The rules are in ./ledeContract.ts.
 *
 * No allowlist: a lede or summary that breaks a rule is rewritten in the
 * map's data (two facts both sides accept, then what the fight is over),
 * never excused here and never fixed by loosening a pattern.
 */
import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { legacyTopicPage } from "./legacy";
import { ledeProblems, sentences, type LedeField, type LedeProblem } from "./ledeContract";

interface Audited {
  key: string;
  text: string;
  problems: LedeProblem[];
}

function audit(key: string, field: LedeField, text: string | undefined, cruxQuestions: string[]): Audited[] {
  if (!text?.trim()) return [];
  return [{ key: `${key} [${field}]`, text, problems: ledeProblems({ field, text, cruxQuestions }) }];
}

function auditLegacy(): Audited[] {
  return topics.flatMap((topic) => {
    const { page, cruxes } = legacyTopicPage(topic);
    const questions = cruxes.map((crux) => crux.question);
    return [
      ...audit(topic.id, "lede", page.hook?.text, questions),
      ...audit(topic.id, "summary", page.cruxLede, questions),
    ];
  });
}

function auditFlagship(): Audited[] {
  return argumentTopicIds.flatMap((topicId) => {
    const topic = loadArgumentTopic(topicId)!;
    const nodes = new Map(topic.graph.nodes.map((node) => [node.id, node]));
    const questions = topic.cruxes.flatMap((crux) => {
      const claim = nodes.get(crux.claimId);
      const note = topic.meta.cruxNotes?.[crux.claimId];
      const question = note?.question ?? claim?.summary ?? (claim && "statement" in claim ? claim.statement : undefined);
      return question ? [question] : [];
    });
    return [
      ...audit(topicId, "lede", topic.meta.hook, questions),
      ...audit(topicId, "summary", topic.meta.tldr, questions),
    ];
  });
}

const describeProblems = (rows: Audited[]) =>
  rows.map((row) => `${row.key}: ${row.problems.map((p) => `${p.rule} (${p.detail})`).join("; ")}`);

const rules = (text: string, cruxQuestions: string[] = [], field: LedeField = "lede") =>
  ledeProblems({ field, text, cruxQuestions }).map((problem) => problem.rule);

describe("opening contract", () => {
  it("catches the openings the round-6 review named", () => {
    // rent-control-effectiveness lede, before: an expert-panel percentage.
    expect(
      rules(
        "Rent control is one of the rare questions where economists left and right almost agree: asked whether it improved the supply and quality of affordable housing, a University of Chicago panel of top economists came down ~82% against — with exactly one of roughly 40 agreeing.",
      ),
    ).toContain("poll");
    // rent-control-effectiveness summary, before: experts' verdict.
    expect(
      rules(
        "But the strongest study (a San Francisco natural experiment) finds it shrinks rental supply and pushes up market rents for everyone else, which is why economists broadly judge it a poor tool for affordability overall.",
        [],
        "summary",
      ),
    ).toContain("verdict");
    // nuclear-energy-safety summary, before: dismisses the map's own safety crux.
    expect(
      rules(
        "The serious debate is no longer really about safety; it is about whether new reactors can be built fast enough and cheaply enough to matter on the climate timeline.",
        [],
        "summary",
      ),
    ).toContain("verdict");
    // housing-affordability-crisis lede, before: asserts the answer to crux 1.
    const housing = rules(
      "The most counterintuitive finding in housing economics is that building more market-rate housing — even pricey 'luxury' units — reliably lowers rents, including for lower-income renters, through moving chains: new high-end units free up cheaper older ones.",
      ["Does upzoning lower rents for median and lower-income renters within 5–10 years?"],
    );
    expect(housing).toContain("verdict");
    // global-housing-bubble lede, before: says the predicted crash didn't come.
    expect(
      rules(
        "The crash the 'bubble' narrative predicted didn't arrive: even as US 30-year mortgage rates spiked toward 8% in 2023, national home prices set fresh records.",
      ),
    ).toContain("verdict");
  });

  it("answers: catches a sentence asserting a crux's answer, not one that names the fight", () => {
    const question = "Do term limits shift power to governors, agencies and lobbyists, or loosen entrenched interests?";
    expect(
      rules(
        "Across the 15 states that adopted legislative term limits, the largest measured effect was a shift of power away from the legislature and toward governors, agencies, and lobbyists.",
        [question],
      ),
    ).toContain("answers");
    expect(
      rules(
        "Fifteen states adopted legislative term limits in the 1990s. The fight is over whether that shifted power to governors, agencies and lobbyists.",
        [question],
      ),
    ).toEqual([]);
  });

  it("passes the flagship pattern: two facts both sides accept, then what the fight is over", () => {
    expect(
      rules(
        "Among 22–25-year-olds in the most AI-exposed occupations, employment fell 16% relative to less-exposed peers since late 2022, after controlling for firm-level shocks — while overall U.S. unemployment sat near 4%. Both numbers are real. The fight is over what they mean.",
        ["Is AI what broke entry-level hiring, or did rates and the post-pandemic correction?"],
      ),
    ).toEqual([]);
  });

  it("splits sentences without breaking on initials or abbreviations", () => {
    expect(sentences("The U.S. spends more. Dr. Smith agrees, e.g. on cost. Both are real.")).toEqual([
      "The U.S. spends more.",
      "Dr. Smith agrees, e.g. on cost.",
      "Both are real.",
    ]);
  });

  it("every legacy map opens without a poll, a verdict or a crux's answer", () => {
    const rows = auditLegacy();
    // 108 maps carry a lede and a summary; a map dropping them is a regression too.
    expect(rows.length).toBeGreaterThanOrEqual(216);
    const failing = rows.filter((row) => row.problems.length > 0);
    expect(failing, describeProblems(failing).join("\n")).toEqual([]);
  });

  it("every flagship map opens without a poll, a verdict or a crux's answer", () => {
    const rows = auditFlagship();
    expect(rows.length).toBeGreaterThan(0);
    const failing = rows.filter((row) => row.problems.length > 0);
    expect(failing, describeProblems(failing).join("\n")).toEqual([]);
  });
});
