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
