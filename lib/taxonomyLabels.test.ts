import { describe, expect, it } from "vitest";
import { formatTaxonomyLabel } from "./taxonomyLabels";

describe("formatTaxonomyLabel", () => {
  it.each([
    ["ai", "AI"],
    ["generative-ai", "Generative AI"],
    ["ai-bias", "AI Bias"],
    ["covid-19", "COVID-19"],
    ["e-waste", "E-Waste"],
    ["gmo", "GMO"],
    ["MOND", "MOND"],
    ["section-230", "Section 230"],
    ["end-of-life", "End of Life"],
    ["right-to-repair", "Right to Repair"],
    ["galaxy rotation curves", "Galaxy Rotation Curves"],
  ])("formats %s as %s", (value, label) => {
    expect(formatTaxonomyLabel(value)).toBe(label);
  });
});
