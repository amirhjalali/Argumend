import "@/test/setup-dom";
import { act, cleanup, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useIsHydrated, useMediaQuery } from "./useMediaQuery";

function SnapshotHarness() {
  const hydrated = useIsHydrated();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <output
      data-hydrated={String(hydrated)}
      data-reduce-motion={String(reduceMotion)}
    />
  );
}

describe("external environment snapshots", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("uses a false hydration snapshot for SSR and true on the client", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(() => ({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    expect(renderToString(<SnapshotHarness />)).toContain(
      'data-hydrated="false"',
    );
    expect(render(<SnapshotHarness />).getByRole("status").dataset.hydrated).toBe(
      "true",
    );
  });

  it("reacts to reduced-motion media-query changes", () => {
    let matches = false;
    let notify = () => {};
    vi.spyOn(window, "matchMedia").mockImplementation(() => ({
      get matches() {
        return matches;
      },
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (
        _event: string,
        listener: EventListenerOrEventListenerObject,
      ) => {
        notify = () => {
          const event = new Event("change");
          if (typeof listener === "function") listener(event);
          else listener.handleEvent(event);
        };
      },
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const output = render(<SnapshotHarness />).getByRole("status");
    expect(output.dataset.reduceMotion).toBe("false");

    act(() => {
      matches = true;
      notify();
    });
    expect(output.dataset.reduceMotion).toBe("true");
  });
});
