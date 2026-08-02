import { describe, expect, it } from "vitest";
import { buildVerdictCardSvg } from "./verdictCardImage";

describe("buildVerdictCardSvg", () => {
  it("exports the displayed verdict and truthful offline provenance", () => {
    const svg = buildVerdictCardSvg({
      topicTitle: "Nuclear <Energy> & Climate",
      winnerLabel: "DRAW",
      forScore: 6.3,
      againstScore: 6.6,
      drivingDimension: "Evidence Quality",
      consensus: "3/3 unanimous evaluators",
      mode: "programmatic",
      format: "twitter",
    });
    expect(svg).toContain("6.3");
    expect(svg).toContain("6.6");
    expect(svg).toContain("Programmatic rubric");
    expect(svg).toContain("3/3 unanimous evaluators");
    expect(svg).toContain("Nuclear &lt;Energy&gt; &amp; Climate");
    expect(svg).not.toContain("AI judges");
  });

  it("uses square social-card dimensions for Instagram", () => {
    const svg = buildVerdictCardSvg({
      topicTitle: "A topic",
      winnerLabel: "FOR WINS",
      forScore: 8,
      againstScore: 4,
      drivingDimension: null,
      consensus: "2/3 split judges",
      mode: "live",
      format: "instagram",
    });
    expect(svg).toContain('width="1080" height="1080"');
    expect(svg).toContain("AI judges");
  });
});
