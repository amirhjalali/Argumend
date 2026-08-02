import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import { ConfidenceTimelineTable } from "./ConfidenceTimeline";

describe("ConfidenceTimelineTable", () => {
  afterEach(cleanup);

  it("exposes confidence events in chronological order through a native table", () => {
    const view = render(
      <ConfidenceTimelineTable
        topicTitle="Example topic"
        events={[
          { year: 2024, confidence: 72, event: "Later evidence", source: "Study B" },
          { year: 2018, confidence: 44, event: "Earlier evidence" },
        ]}
      />
    );

    expect(view.getByText("View timeline data").closest("summary")).not.toBeNull();
    expect(view.getByText("2 events")).not.toBeNull();
    expect(view.getByText("Chronological confidence history for Example topic").tagName).toBe("CAPTION");

    const rows = view.getAllByRole("row");
    expect(within(rows[1]).getByText("2018")).not.toBeNull();
    expect(within(rows[1]).getByText("44%")).not.toBeNull();
    expect(within(rows[2]).getByText("2024")).not.toBeNull();
    expect(within(rows[2]).getByText("Study B")).not.toBeNull();
  });
});
