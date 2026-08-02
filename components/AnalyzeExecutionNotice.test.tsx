import "@/test/setup-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AnalyzeExecutionNotice } from "./AnalyzeExecutionNotice";

describe("AnalyzeExecutionNotice", () => {
  afterEach(cleanup);

  it("labels fully offline results as programmatic rather than AI", () => {
    const view = render(
      <AnalyzeExecutionNotice
        execution={{
          analysis: { requested: "offline", actual: "offline" },
          judging: { requested: "offline", actual: "offline" },
        }}
      />,
    );

    expect(view.getByText("Programmatic analysis")).toBeTruthy();
    expect(view.getByText("Programmatic judging")).toBeTruthy();
    const notice = view.getByRole("region", { name: "How this report was produced" });
    expect(notice.textContent).toContain("not a live AI model");
    expect(notice.textContent).toContain("not live AI models");
    expect(notice.textContent).toContain("No model provider received it");
  });

  it("discloses when requested live execution fell back to heuristics", () => {
    const view = render(
      <AnalyzeExecutionNotice
        execution={{
          analysis: {
            requested: "live",
            actual: "offline",
            fallbackCode: "ANALYSIS_PROVIDER_ERROR",
          },
          judging: {
            requested: "live",
            actual: "offline",
            fallbackCode: "JUDGING_PROVIDER_ERROR",
          },
        }}
      />,
    );

    const notice = view.getByRole("region", { name: "How this report was produced" });
    expect(notice.textContent).toContain(
      "Live AI analysis was unavailable",
    );
    expect(notice.textContent).toContain(
      "Live AI judging was unavailable",
    );
  });

  it("explains source processing when a live provider was used", () => {
    const view = render(
      <AnalyzeExecutionNotice
        execution={{
          analysis: { requested: "live", actual: "live" },
          judging: { requested: "disabled", actual: "disabled" },
        }}
      />,
    );

    const notice = view.getByRole("region", { name: "How this report was produced" });
    expect(notice.textContent).toContain("Live AI analysis");
    expect(notice.textContent).toContain("configured model provider for this analysis request");
  });

  it("distinguishes a failed live attempt from a provider-free report", () => {
    const view = render(
      <AnalyzeExecutionNotice
        execution={{
          analysis: {
            requested: "live",
            actual: "offline",
            fallbackCode: "ANALYSIS_PROVIDER_ERROR",
          },
          judging: { requested: "disabled", actual: "disabled" },
        }}
      />,
    );

    const notice = view.getByRole("region", { name: "How this report was produced" });
    expect(notice.textContent).toContain("live analysis request was attempted");
    expect(notice.textContent).toContain("provider’s data handling may apply");
  });
});
