import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BalanceWeightChip, QUADRANT_STYLE } from "./BalanceWeightChip";
import { BalanceWeightReadout } from "./BalanceWeightReadout";
import { FRAGILE_VERDICT_NOTE } from "./FragileVerdictNote";

const verdict = { label: "Well-mapped, evidence still divided", quadrant: "contested" as const };

describe("BalanceWeightChip", () => {
  it("exposes both axes and the verdict to assistive tech", () => {
    render(<BalanceWeightChip balance={46} weight={70} verdict={verdict} />);
    const el = screen.getByTitle(/Balance 46\/100 · Weight 70\/100/);
    expect(el).toBeTruthy();
    expect(screen.getByText(/Balance 46 of 100/)).toBeTruthy();
  });

  it("shows the quadrant word when showLabel is set", () => {
    render(<BalanceWeightChip balance={46} weight={70} verdict={verdict} showLabel />);
    expect(screen.getByText("Divided")).toBeTruthy();
  });
});

describe("QUADRANT_STYLE", () => {
  it("draws contested in stone ink, keeping crux crimson for cruxes", () => {
    const all = JSON.stringify(QUADRANT_STYLE).toLowerCase();
    expect(all).not.toContain("#a23b3b");
    expect(all).not.toContain("162, 59, 59");
    // The theme variable is #564d45 on parchment and a light stone in dark
    // mode, so the chip stays legible on both canvases.
    expect(QUADRANT_STYLE.contested.color).toBe("rgb(var(--text-secondary-rgb))");
  });

  it("gives settled (stone, like the status chip) and open theme-aware ink", () => {
    expect(QUADRANT_STYLE.settled.color).toBe("rgb(var(--text-primary-rgb))");
    expect(QUADRANT_STYLE.open.color).toBe("rgb(var(--text-muted-rgb))");
  });

  it("gives every quadrant a text colour for type on its solid fill", () => {
    for (const style of Object.values(QUADRANT_STYLE)) {
      expect(style.onColor).toBeTruthy();
    }
  });
});

describe("BalanceWeightReadout", () => {
  it("renders the verdict label and both axis readouts", () => {
    render(<BalanceWeightReadout balance={46} weight={70} verdict={verdict} />);
    expect(screen.getByText("Well-mapped, evidence still divided")).toBeTruthy();
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
      label: "Evidence clearly leans toward the claim",
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
