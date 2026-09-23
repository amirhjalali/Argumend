import { describe, expect, it } from "vitest";
import { replyLede } from "./replyLede";

describe("replyLede", () => {
  it("returns the opening paragraph after the title and claim", () => {
    const markdown = [
      "**Argumend map: Housing**",
      "The map's claim: Something.",
      "",
      "Most of this thread (5 of 8 turns) is arguing about **Supply Effects**.",
      "",
      "**Pattern:** Mixed disagreement (60%).",
    ].join("\n");
    expect(replyLede(markdown)).toBe(
      "Most of this thread (5 of 8 turns) is arguing about **Supply Effects**.",
    );
  });

  it("returns null when the markdown does not have that shape", () => {
    expect(replyLede("")).toBeNull();
    expect(replyLede("**Argumend map: X**\n\n**Pattern:** Y (50%).")).toBeNull();
    expect(replyLede("**Argumend map: X**\n\n- a list item")).toBeNull();
  });
});
