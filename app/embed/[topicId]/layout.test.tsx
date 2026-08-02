import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmbedLayout from "./layout";

describe("EmbedLayout", () => {
  it("uses valid nested-layout markup without a second document shell", () => {
    const { container } = render(
      <EmbedLayout>
        <p>Embedded argument</p>
      </EmbedLayout>,
    );

    expect(screen.getByText("Embedded argument")).toBeTruthy();
    expect(container.firstElementChild?.tagName).toBe("DIV");
    expect(container.querySelector("html, body, script")).toBeNull();
  });
});
