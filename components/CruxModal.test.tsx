import "@/test/setup-dom";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { CruxModal } from "./CruxModal";

const selectedCrux = {
  pillarTitle: "Evidence pillar",
  title: "The decisive test",
  description: "What result would settle the disagreement?",
  methodology: "Run a preregistered comparison.",
  cost: "$1M",
  status: "theoretical",
};

describe("CruxModal accessibility", () => {
  beforeEach(() => {
    document.body.style.overflow = "clip";
    act(() => useLogicGraph.setState({ selectedCrux: null }));
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
    act(() => useLogicGraph.setState({ selectedCrux: null }));
  });

  it("labels the dialog, contains focus, closes on Escape, and restores its trigger", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "View crux";
    document.body.appendChild(trigger);
    trigger.focus();
    act(() => useLogicGraph.setState({ selectedCrux }));

    const view = render(<CruxModal />);
    const dialog = view.getByRole("dialog", { name: "The decisive test" });
    const close = view.getByRole("button", { name: "Close crux details" });

    expect(dialog.getAttribute("aria-describedby")).toBe("crux-modal-description");
    await waitFor(() => expect(document.activeElement).toBe(close));
    expect(document.body.style.overflow).toBe("hidden");

    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Tab" });
    expect(document.activeElement).toBe(close);

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(document.body.style.overflow).toBe("clip");

    trigger.remove();
  });
});
