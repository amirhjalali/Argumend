import { describe, expect, it } from "vitest";
import { FakeJevProvider } from "@/lib/jev/fake";
import { runMapReply } from "./pipeline";
import { formatPercent, renderMapReplyMarkdown } from "./render";
import type { MapReplyMatch } from "./types";
import { RENT_CONTROL_JEV_FIXTURES, RENT_CONTROL_THREAD } from "./__fixtures__";

async function rentControlReply() {
  const result = await runMapReply({
    text: RENT_CONTROL_THREAD,
    provider: new FakeJevProvider(RENT_CONTROL_JEV_FIXTURES),
  });
  if (!result.ok) throw new Error("expected a match");
  return result;
}

describe("formatPercent", () => {
  it("rounds to whole percents", () => {
    expect(formatPercent(0)).toBe("0%");
    expect(formatPercent(0.775)).toBe("78%");
    expect(formatPercent(1)).toBe("100%");
  });
});

describe("renderMapReplyMarkdown", () => {
  it("renders the recorded rent-control reply", async () => {
    const result = await rentControlReply();
    expect(result.markdown).toMatchSnapshot();
  });

  it("says only things that are a Jev number or a sentence from the map", async () => {
    const result = await rentControlReply();

    expect(result.markdown).toContain(result.topic.title);
    expect(result.markdown).toContain(result.topic.metaClaim);
    expect(result.markdown).toContain(result.dominantSection?.cruxTitle ?? "");
    expect(result.markdown).toContain(result.dominantSection?.cruxDescription ?? "");
    for (const item of result.evidence) {
      expect(result.markdown).toContain(item.title);
      expect(result.markdown).toContain(`${item.score}/40`);
    }
    expect(result.markdown).toContain(result.topic.url);
  });

  it("labels the side of every evidence item", async () => {
    const result = await rentControlReply();
    expect(result.markdown).toContain("For the map's claim");
    expect(result.markdown).toContain("Against the map's claim");
  });

  it("reports a minority section honestly rather than calling it 'most'", async () => {
    const result = await rentControlReply();
    const minority: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      dominantSection: { ...result.dominantSection!, count: 2 },
      thread: { ...result.thread, substantiveCount: 9 },
    };
    expect(renderMapReplyMarkdown(minority)).toContain(
      "The largest share of this thread (2 of 9 turns)",
    );
  });

  it("drops the talking-past and definitional lines below the threshold", async () => {
    const result = await rentControlReply();
    const quiet: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      signals: { ...result.signals, talkingPast: 0.2, definitional: 0.1 },
    };
    const markdown = renderMapReplyMarkdown(quiet);
    expect(markdown).not.toContain("arguing about different sections");
    expect(markdown).not.toContain("key term to mean different things");
  });

  it("handles a map whose cruxes the thread never reached", async () => {
    const result = await rentControlReply();
    const untouched: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      cruxes: result.cruxes.map((crux) => ({ ...crux, touched: 0.05 })),
    };
    const markdown = renderMapReplyMarkdown(untouched);
    expect(markdown).toContain("This thread reached none of the map's cruxes:");
    expect(markdown).not.toContain("Cruxes this thread touched");
  });

  it("handles a section with no evidence and no dominant section", async () => {
    const result = await rentControlReply();
    const empty: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      dominantSection: null,
      evidence: [],
    };
    const markdown = renderMapReplyMarkdown(empty);
    expect(markdown).toContain("No section of this map received an argument from this thread.");
    expect(markdown).not.toContain("Strongest evidence");
    expect(markdown).toContain(result.topic.url);
  });

  it("hedges a dominant section that no turn placed confidently", async () => {
    const result = await rentControlReply();
    const weak: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      dominantSection: { ...result.dominantSection!, tentative: true, count: 3 },
      unplacedCount: 3,
    };
    const markdown = renderMapReplyMarkdown(weak);
    expect(markdown).toContain("This thread is probably arguing about **Supply Effects**");
    expect(markdown).toContain("no turn was placed on the map with confidence");
    expect(markdown).not.toContain("Most of this thread");
  });

  it("says how many turns could not be placed", async () => {
    const result = await rentControlReply();
    const markdown = renderMapReplyMarkdown({ ...result, unplacedCount: 2 });
    expect(markdown).toContain("2 turns could not be placed on the map with confidence.");
    expect(renderMapReplyMarkdown({ ...result, unplacedCount: 1 })).toContain(
      "1 turn could not be placed",
    );
    expect(renderMapReplyMarkdown(result)).not.toContain("could not be placed");
  });

  it("does not claim more coverage than it had", async () => {
    const result = await rentControlReply();
    const partial: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      thread: { ...result.thread, turnCount: 13, unprobedCount: 5 },
    };
    const markdown = renderMapReplyMarkdown(partial);
    expect(markdown).toContain("of the 8 turns we could check");
    expect(markdown).toContain("5 shorter turns were too brief to check.");
  });

  it("says when only the first N turns were checked", async () => {
    const result = await rentControlReply();
    const truncated: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      thread: { ...result.thread, turnCount: 132, unprobedCount: 124, truncated: true },
    };
    expect(renderMapReplyMarkdown(truncated)).toContain(
      "Only the first 8 of 132 turns were checked.",
    );
  });

  it("qualifies a speaker whose turns were not all probed", async () => {
    const result = await rentControlReply();
    const qualified: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      notArguing: [],
      notArguingInProbedTurns: ["gary_1962"],
    };
    const markdown = renderMapReplyMarkdown(qualified);
    expect(markdown).toContain(
      "gary_1962 did not make an argument about the topic in the turns we could check.",
    );
  });

  it("lists several silent speakers in one sentence", async () => {
    const result = await rentControlReply();
    const quiet: Omit<MapReplyMatch, "markdown"> = {
      ...result,
      notArguing: ["gary_1962", "lurker_99", "throwaway"],
    };
    expect(renderMapReplyMarkdown(quiet)).toContain(
      "gary_1962, lurker_99 and throwaway did not make arguments about the topic.",
    );
  });
});
