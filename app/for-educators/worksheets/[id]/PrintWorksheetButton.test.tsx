import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { PrintWorksheetButton } from "./PrintWorksheetButton";

describe("PrintWorksheetButton", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("opens the browser print dialog from a React click handler", () => {
    const print = vi.fn();
    Object.defineProperty(window, "print", {
      configurable: true,
      value: print,
    });

    const view = render(<PrintWorksheetButton />);
    fireEvent.click(view.getByRole("button", { name: /print worksheet/i }));

    expect(print).toHaveBeenCalledOnce();
  });
});
