import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { FalsificationCrux } from "./FalsificationCrux";
import type { Crux } from "@/lib/schemas/topic";

afterEach(cleanup);

const baseCrux: Crux = {
  id: "c1",
  title: "The Deaths-Per-TWh Test",
  description: "Aggregate deaths across sources.",
  methodology: "Normalize per TWh.",
  verification_status: "verified",
  cost_to_verify: "$200K",
};

describe("FalsificationCrux", () => {
  it("leads with the falsification framing and shows both flips when present", () => {
    const crux: Crux = {
      ...baseCrux,
      falsification: {
        supporter_flip: "A supporter flips if hidden radiation deaths emerge",
        skeptic_flip: "A skeptic flips if reactors get cheap and fast",
        common_ground: "Both agree routine operation is low-harm",
        live_disagreement: "How to weigh tail risk versus fossil deaths",
      },
    };

    render(<FalsificationCrux crux={crux} />);

    expect(screen.getByText(/what would change your mind/)).toBeTruthy();
    expect(screen.getByText(/hidden radiation deaths emerge/)).toBeTruthy();
    expect(screen.getByText(/reactors get cheap and fast/)).toBeTruthy();
    expect(screen.getByText(/routine operation is low-harm/)).toBeTruthy();
    // empirical test is still available (collapsed)
    expect(screen.getByText(/How it could be settled empirically/)).toBeTruthy();
  });

  it("falls back to the settle-test view when no falsification is present", () => {
    render(<FalsificationCrux crux={baseCrux} />);

    expect(screen.getByText(/what would settle this/)).toBeTruthy();
    expect(screen.getByText("The Deaths-Per-TWh Test")).toBeTruthy();
    expect(screen.queryByText(/what would change your mind/)).toBeNull();
  });
});
