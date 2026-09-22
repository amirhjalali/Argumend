import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BalanceWeightChip } from "./BalanceWeightChip";
import { BalanceWeightReadout } from "./BalanceWeightReadout";
import { FRAGILE_VERDICT_NOTE } from "./FragileVerdictNote";

const verdict = { label: "Well-mapped, genuinely contested", quadrant: "contested" as const };

describe("BalanceWeightChip", () => {
  it("exposes both axes and the verdict to assistive tech", () => {
    render(<BalanceWeightChip balance={46} weight={70} verdict={verdict} />);
    const el = screen.getByTitle(/Balance 46\/100 · Weight 70\/100/);
    expect(el).toBeTruthy();
    expect(screen.getByText(/Balance 46 of 100/)).toBeTruthy();
  });

  it("shows the quadrant word when showLabel is set", () => {
    render(<BalanceWeightChip balance={46} weight={70} verdict={verdict} showLabel />);
    expect(screen.getByText("Contested")).toBeTruthy();
  });
});

describe("BalanceWeightReadout", () => {
  it("renders the verdict label and both axis readouts", () => {
    render(<BalanceWeightReadout balance={46} weight={70} verdict={verdict} />);
    expect(screen.getByText("Well-mapped, genuinely contested")).toBeTruthy();
    expect(screen.getByRole("meter", { name: /balance of evidence/i })).toBeTruthy();
    expect(screen.getByRole("meter", { name: /weight of evidence/i })).toBeTruthy();
  });

  it("links to the evidence when evidenceHref is given", () => {
    render(
      <BalanceWeightReadout balance={46} weight={70} verdict={verdict} evidenceHref="#evidence" />
    );
    expect(screen.getByRole("link", { name: /see the evidence/i })).toBeTruthy();
  });

  it("says so under the label when the reading is one card from changing", () => {
    const fragileVerdict = {
      label: "Clearly favors the claim",
      quadrant: "moderate" as const,
      fragile: true,
    };
    render(<BalanceWeightReadout balance={76} weight={82} verdict={fragileVerdict} />);
    expect(screen.getByText(FRAGILE_VERDICT_NOTE)).toBeTruthy();
    // The numbers are never softened — only the quadrant word is guarded.
    expect(screen.getByText(/Balance 76\/100 · Weight 82\/100/)).toBeTruthy();
  });

  it("stays quiet when the verdict is not fragile", () => {
    render(<BalanceWeightReadout balance={46} weight={70} verdict={verdict} />);
    expect(screen.queryByText(FRAGILE_VERDICT_NOTE)).toBeNull();
  });
});
