import "@/test/setup-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ExchangeCard } from "./ExchangeCard";

describe("Lessons from the Deep exchange disclosure", () => {
  afterEach(cleanup);

  it("connects the collapsed button to server-rendered details and toggles accessibly", () => {
    const view = render(
      <ExchangeCard topic="Evidence" insight="Incentives matter" lesson="Inspect incentives.">
        <p>Full static exchange</p>
      </ExchangeCard>,
    );
    const button = view.getByRole("button", { name: /incentives matter/i });
    const contentId = button.getAttribute("aria-controls");
    const details = contentId ? document.getElementById(contentId) : null;

    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(contentId).toBeTruthy();
    expect(details?.hidden).toBe(true);
    expect(view.getByText("Full static exchange")).toBeTruthy();

    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(details?.hidden).toBe(false);
  });
});
