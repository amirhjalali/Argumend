import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Landmark } from "lucide-react";
import { TONES, toneStyles } from "@/lib/categoryColors";
import { Chip } from "./Chip";

describe("Chip", () => {
  afterEach(cleanup);

  it.each(TONES)("renders the %s tone from the shared tone map", (tone) => {
    const view = render(<Chip tone={tone}>Label</Chip>);
    const chip = view.getByText("Label");
    expect(chip.tagName).toBe("SPAN");
    expect(chip.className).toContain(toneStyles[tone].chip);
    expect(chip.className).toContain("rounded-full border");
    expect(chip.className).not.toMatch(/crux/);
  });

  it("defaults to the neutral tone at the small size", () => {
    const view = render(<Chip>Tag</Chip>);
    const chip = view.getByText("Tag");
    expect(chip.className).toContain(toneStyles.neutral.chip);
    expect(chip.className).toContain("text-xs");
  });

  it("becomes a touch-sized link with href and hides its icon from assistive tech", () => {
    const view = render(
      <Chip tone="teal" icon={Landmark} href="/topics?category=policy">
        Policy
      </Chip>,
    );
    const link = view.getByRole("link", { name: "Policy" });
    expect(link.getAttribute("href")).toBe("/topics?category=policy");
    expect(link.className).toContain("min-h-11");
    expect(link.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
  });
});
