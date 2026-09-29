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
  it("starts closed on desktop by default: the header owns navigation now", () => {
    mockViewport(true);
    const { result } = renderHook(() => useSidebarState());
    expect(result.current.isOpen).toBe(false);
  });

  it("still opens on desktop when a caller asks for the old default", () => {
    mockViewport(true);
    const { result } = renderHook(() => useSidebarState({ desktopDefaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("can be toggled open and closed", () => {
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
