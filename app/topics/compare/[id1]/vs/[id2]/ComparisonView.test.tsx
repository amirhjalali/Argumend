import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { EvidenceBalanceBar, StatRow } from "./ComparisonView";

afterEach(cleanup);

describe("comparison metric semantics", () => {
  it("does not imply that a higher directional balance is a winner", () => {
    const view = render(
      <StatRow
        label="Balance (claim ↔ counterclaim)"
        value1={54}
        value2={85}
        suffix="/100"
      />,
    );

    expect(view.getByText("54/100").hasAttribute("data-highlighted")).toBe(false);
    expect(view.getByText("85/100").hasAttribute("data-highlighted")).toBe(false);
  });

  it("still identifies a higher evidence-weight value", () => {
    const view = render(
      <StatRow
        label="Weight of evidence"
        value1={76}
        value2={83}
        suffix="/100"
        highlight="higher"
      />,
    );

    expect(view.getByText("83/100").getAttribute("data-highlighted")).toBe("true");
    expect(view.getByText("76/100").hasAttribute("data-highlighted")).toBe(false);
  });

  it("labels the evidence chart as an item-count mix", () => {
    const view = render(
      <EvidenceBalanceBar forCount={3} againstCount={1} side="left" />,
    );

    expect(
      view.getByRole("img", {
        name: "3 supporting and 1 counter evidence items; 75% supporting and 25% counter by item count.",
      }),
    ).toBeTruthy();
    expect(view.getByText("75% supporting / 25% counter")).toBeTruthy();
  });

  it("does not fabricate a 50/50 split when no evidence is mapped", () => {
    const view = render(
      <EvidenceBalanceBar forCount={0} againstCount={0} side="right" />,
    );

    expect(view.getByRole("img", { name: "No evidence items mapped yet." })).toBeTruthy();
    expect(view.getByText("No evidence items mapped yet")).toBeTruthy();
    expect(view.queryByText(/50%/)).toBeNull();
  });
});
