import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import type { JudgingResult } from "@/lib/judge/rubric";
import { getConsensusLabel, ShareVerdictCard } from "./ShareVerdictCard";

const result: JudgingResult = {
  verdicts: [],
  winner: "for",
  hasConsensus: false,
  aggregatedScores: {
    for: { average: 7.4, byDimension: {} },
    against: { average: 6.1, byDimension: {} },
  },
  disagreements: [],
  flaggedForReview: false,
  timestamp: 0,
};

describe("ShareVerdictCard utility lifecycle", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("describes evaluator agreement in plain language", () => {
    const unanimous = {
      ...result,
      hasConsensus: true,
      verdicts: Array.from({ length: 3 }, (_, index) => ({
        judgeId: `evaluator-${index}`,
        winner: "for" as const,
      })),
    } as JudgingResult;

    expect(getConsensusLabel(unanimous, "programmatic")).toBe(
      "3/3 evaluators agree",
    );
    expect(getConsensusLabel(unanimous, "live")).toBe("3/3 judges agree");
  });

  it("shows a safe retry state when image generation is unavailable", async () => {
    class FailingImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_value: string) {
        queueMicrotask(() => this.onerror?.());
      }
    }
    vi.stubGlobal("Image", FailingImage);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const view = render(
      <ShareVerdictCard
        result={result}
        topicTitle="A test topic"
        topicId="test-topic"
      />,
    );

    fireEvent.click(view.getByRole("button", { name: "Share verdict" }));
    fireEvent.click(view.getByRole("button", { name: "Download Image" }));

    const alert = await view.findByRole("alert");
    expect(alert.textContent).toMatch(/check your connection and try again/i);
    expect(alert.textContent).not.toMatch(/provider|credential|database/i);

    fireEvent.click(view.getByRole("button", { name: "Try download again" }));
    await waitFor(() => expect(consoleError).toHaveBeenCalledTimes(2));
  });

  it("traps focus, closes with Escape, and restores the trigger", async () => {
    const view = render(
      <ShareVerdictCard result={result} topicTitle="A test topic" topicId="test-topic" />,
    );
    const trigger = view.getByRole("button", { name: "Share verdict" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = view.getByRole("dialog", { name: "Share Verdict" });
    const close = view.getByRole("button", { name: "Close" });
    await waitFor(() => expect(document.activeElement).toBe(close));
    expect(dialog.getAttribute("aria-modal")).toBe("true");

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("uses a durable topic URL and truthful programmatic share text", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const view = render(
      <ShareVerdictCard
        result={result}
        topicTitle="A test topic"
        topicId="test topic"
        mode="programmatic"
      />,
    );

    fireEvent.click(view.getByRole("button", { name: "Share verdict" }));
    fireEvent.click(view.getByRole("button", { name: "Copy Link" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0]?.[0]).toMatch(/\/topics\/test%20topic$/);
    expect(writeText.mock.calls[0]?.[0]).not.toContain("#verdict");

    fireEvent.click(view.getByRole("button", { name: "Post on X" }));
    const intentUrl = String(open.mock.calls[0]?.[0]);
    expect(decodeURIComponent(intentUrl)).toContain("programmatic rubric");
    expect(decodeURIComponent(intentUrl)).not.toContain("AI judges have spoken");
  });

  it("shows a manually selectable URL when clipboard copy fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn().mockReturnValue(false),
    });
    const view = render(
      <ShareVerdictCard result={result} topicTitle="A test topic" topicId="test-topic" />,
    );

    fireEvent.click(view.getByRole("button", { name: "Share verdict" }));
    fireEvent.click(view.getByRole("button", { name: "Copy Link" }));

    const alert = await view.findByRole("alert");
    expect(alert.textContent).toContain("could not be copied");
    expect(view.getByRole("button", { name: "Copy Link" }).textContent).not.toContain("Copied");
    expect((view.getByRole("textbox", { name: "Verdict share link" }) as HTMLInputElement).value).toMatch(
      /\/topics\/test-topic$/,
    );
  });
});
