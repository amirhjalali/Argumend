import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { judgeDebateOffline } from "@/lib/judge/offline";
import { JudgingResults } from "./JudgingResults";

const result = judgeDebateOffline(
  [
    {
      side: "for",
      round: 1,
      content: "The proposal has measurable benefits supported by evidence.",
    },
    {
      side: "against",
      round: 1,
      content: "The proposal has material costs and implementation risks.",
    },
  ],
  "A test proposal",
  ["claude", "gpt-4", "gemini"]
);

describe("JudgingResults execution labels", () => {
  it("does not present programmatic evaluators as provider models", () => {
    render(<JudgingResults result={result} mode="programmatic" />);

    expect(screen.getByText("Programmatic Rubric Verdict")).toBeTruthy();
    expect(screen.getByText("Programmatic evaluator 1")).toBeTruthy();
    expect(screen.getAllByText("Rule-based rubric")).toHaveLength(3);
    expect(screen.queryByText("Claude Sonnet 4")).toBeNull();
    expect(screen.queryByText("GPT-4o")).toBeNull();
    expect(screen.queryByText("Gemini 1.5 Pro")).toBeNull();
  });

  it("retains provider identities for live judging", () => {
    render(<JudgingResults result={result} mode="live" />);

    expect(screen.getByText("Judge Council Verdict")).toBeTruthy();
    expect(screen.getByText("Claude Sonnet 4")).toBeTruthy();
    expect(screen.getByText("GPT-4o")).toBeTruthy();
    expect(screen.getByText("Gemini 1.5 Pro")).toBeTruthy();
  });

  it("does not call a simple majority unanimous", () => {
    const majorityResult = {
      ...result,
      winner: "for" as const,
      hasConsensus: true,
      verdicts: result.verdicts.map((verdict, index) => ({
        ...verdict,
        winner: index < 2 ? ("for" as const) : ("against" as const),
      })),
    };

    render(<JudgingResults result={majorityResult} mode="programmatic" />);

    expect(screen.getByText("2 of 3 evaluators agree")).toBeTruthy();
    expect(screen.getByText("2/3")).toBeTruthy();
    expect(screen.getByText("Majority agreement")).toBeTruthy();
    expect(screen.queryByText("Unanimous")).toBeNull();
  });

  it("associates each expandable evaluator control with its detail panel", () => {
    render(<JudgingResults result={result} mode="programmatic" />);

    const control = screen.getByRole("button", {
      name: /Programmatic evaluator 1 verdict: .* expand details/,
    });
    const detailsId = control.getAttribute("aria-controls");
    expect(detailsId).toBeTruthy();
    expect(control.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(control);

    expect(control.getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById(detailsId ?? "")).toBeTruthy();
    expect(screen.getByText("Overall Assessment")).toBeTruthy();
  });
});
