import "@/test/setup-dom";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { useModalAccessibility } from "./useModalAccessibility";

function ModalHarness() {
  const [isOpen, setIsOpen] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const modalRef = useModalAccessibility<HTMLDivElement>({
    isOpen,
    // Intentionally unstable: normal inline callbacks must not retire an
    // active dialog's semantics or briefly unlock background scrolling.
    onClose: () => setIsOpen(false),
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      {isOpen ? (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Test dialog"
          tabIndex={-1}
        >
          <button data-modal-initial-focus>First action</button>
          <button onClick={() => setRenderCount((count) => count + 1)}>
            Rerender {renderCount}
          </button>
        </div>
      ) : null}
    </>
  );
}

describe("useModalAccessibility", () => {
  beforeEach(() => {
    document.body.style.overflow = "clip";
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
  });

  it("preserves an open modal across callback identity changes", async () => {
    const view = render(<ModalHarness />);
    const trigger = view.getByRole("button", { name: "Open dialog" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = view.getByRole("dialog", { name: "Test dialog" });
    await waitFor(() =>
      expect(document.activeElement).toBe(
        view.getByRole("button", { name: "First action" }),
      ),
    );
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(view.getByRole("button", { name: "Rerender 0" }));

    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(document.body.style.overflow).toBe("clip");
  });
});
