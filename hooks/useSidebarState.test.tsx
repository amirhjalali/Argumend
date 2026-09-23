import { afterEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useSidebarState } from "./useSidebarState";

function mockViewport(desktop: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: desktop,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

afterEach(() => vi.unstubAllGlobals());

describe("useSidebarState", () => {
  it("opens on desktop by default", () => {
    mockViewport(true);
    const { result } = renderHook(() => useSidebarState());
    expect(result.current.isOpen).toBe(true);
  });

  it("starts closed on desktop for reading routes, and the reader can open it", () => {
    mockViewport(true);
    const { result } = renderHook(() => useSidebarState({ desktopDefaultOpen: false }));
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("stays closed on mobile either way", () => {
    mockViewport(false);
    expect(renderHook(() => useSidebarState()).result.current.isOpen).toBe(false);
  });
});
