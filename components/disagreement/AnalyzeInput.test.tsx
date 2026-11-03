import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { AnalyzeInput } from "./AnalyzeInput";

function renderInput(content: string) {
  return render(
    <AnalyzeInput
      content={content}
      contentType="conversation"
      disabled={false}
      onContentChange={() => {}}
      onTypeChange={() => {}}
    />,
  );
}

describe("AnalyzeInput", () => {
  it("starts four lines tall, so the submit button stays on the first screen", () => {
    // r10 live review #3: eleven empty lines (320px) pushed the button below
    // the fold at 390×844 and at 1440×900.
    const view = renderInput("");
    const textarea = view.getByRole("textbox");
    expect(textarea.getAttribute("rows")).toBe("4");
    expect(textarea.style.height).toBe("");
  });

  it("grows with pasted text up to a cap, then scrolls", () => {
    const view = renderInput("");
    const textarea = view.getByRole("textbox") as HTMLTextAreaElement;
    Object.defineProperty(textarea, "scrollHeight", { configurable: true, value: 900 });
    Object.defineProperty(textarea, "clientHeight", { configurable: true, value: 136 });
    view.rerender(
      <AnalyzeInput
        content={"word ".repeat(500)}
        contentType="conversation"
        disabled={false}
        onContentChange={() => {}}
        onTypeChange={() => {}}
      />,
    );
    expect(textarea.style.height).toBe("420px");
    expect(textarea.className).toContain("overflow-y-auto");
  });
});
