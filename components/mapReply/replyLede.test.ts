import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { renderInlineBold, replyLede } from "./replyLede";

function markup(text: string): string {
  return renderToStaticMarkup(createElement(Fragment, null, renderInlineBold(text)));
}

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

  it("returns null when the opening paragraph is missing or blank", () => {
    expect(replyLede("**Argumend map: X**\nThe map's claim: Y.")).toBeNull();
    expect(replyLede("**Argumend map: X**\n\n   \n\n")).toBeNull();
  });
});

describe("renderInlineBold", () => {
  it("bolds paired markers and leaves everything else as text", () => {
    expect(markup("about **Supply Effects**.")).toBe(
      'about <strong class="font-semibold text-[var(--text-heading)]">Supply Effects</strong>.',
    );
  });

  it("escapes markup a pasted speaker name could carry", () => {
    const html = markup('<img src=x onerror="alert(1)"> and **<b>x</b>** did not make an argument.');
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<b>");
    expect(html).toContain("&lt;img");
  });

  it("prints an unpaired marker as-is", () => {
    expect(markup("a ** b")).toBe("a ** b");
  });
});
