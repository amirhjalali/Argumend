import "@/test/setup-dom";
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { FlagshipIntro } from "./FlagshipIntro";
import type { Topic } from "@/lib/schemas/topic";

afterEach(cleanup);

const base = {
  id: "t",
  title: "T",
  meta_claim: "m",
  confidence_score: 80,
  status: "contested",
  category: "policy",
  pillars: [],
} as unknown as Topic;

describe("FlagshipIntro", () => {
  it("renders the keystone fact, its confidence, and the simple case when present", () => {
    const topic = {
      ...base,
      keystone_fact: {
        statement: "Nuclear is roughly 800x safer than coal",
        confidence: 90,
        source: "Our World in Data",
        sourceUrl: "https://ourworldindata.org",
      },
      simple_case: ["First sentence.", "Second sentence.", "Third sentence."],
    } as Topic;

    const view = render(<FlagshipIntro topic={topic} />);

    expect(view.getByText(/800x safer than coal/)).toBeTruthy();
    expect(view.getByText(/This fact:.*90%/)).toBeTruthy();
    expect(view.getByText(/The honest version/)).toBeTruthy();
    expect(view.getByText("Second sentence.")).toBeTruthy();
  });

  it("renders nothing when neither keystone_fact nor simple_case is present", () => {
    const { container } = render(<FlagshipIntro topic={base} />);
    expect(container.innerHTML).toBe("");
  });
});
