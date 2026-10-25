import "@/test/setup-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ClaimStakeLedger } from "./ClaimStakeLedger";
import { reportFromFixture } from "./reportFixture.test-helper";

describe("ClaimStakeLedger", () => {
  afterEach(() => cleanup());

  it("does not dress a paraphrased claim as a verbatim quote", async () => {
    const report = await reportFromFixture("explicit-update-commitment");
    const stake = report.accountability?.stakes[0];
    expect(stake).toBeDefined();
    // The claim statement is the model's restatement, not a source substring.
    expect(report.provenance.sourceCharacterCount).toBeGreaterThan(0);

    const view = render(<ClaimStakeLedger report={report} />);
    const claimCells = view.getAllByText((_, element) =>
      element?.tagName === "P" && (element.textContent ?? "").startsWith(stake!.claim),
    );
    expect(claimCells.length).toBeGreaterThan(0);
    for (const cell of claimCells) {
      expect(cell.textContent).not.toMatch(/^[“"]/);
    }
    expect(view.container.textContent).not.toContain(`“${stake!.claim}`);
  });

  it("keeps the verbatim source note quoted", async () => {
    const report = await reportFromFixture("explicit-update-commitment");
    const quote = report.accountability?.stakes.flatMap((stake) => stake.grounding)[0]?.quote;
    expect(quote).toBeDefined();
    const view = render(<ClaimStakeLedger report={report} />);
    expect(view.container.textContent).toContain(`“${quote}”`);
  });
});
