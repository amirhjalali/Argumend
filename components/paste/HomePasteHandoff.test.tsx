import "@/test/setup-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { clearWorkingPaste, PasteClient } from "./PasteClient";
import { clearPastePrefill } from "@/lib/paste/handoff";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => navigation }));
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

beforeEach(() => {
  navigation.push.mockReset();
  sessionStorage.clear();
  clearPastePrefill();
  clearWorkingPaste();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: "Test response" }), { status: 503 })));
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("home paste handoff with unavailable browser storage", () => {
  it.each(["SecurityError", "QuotaExceededError"])("keeps the paste through navigation after %s and consumes it once", async (name) => {
    const blocked = () => { throw new DOMException("Storage unavailable", name); };
    const storage = { setItem: vi.fn(blocked), getItem: vi.fn(blocked), removeItem: vi.fn(blocked) } as unknown as Storage;
    vi.spyOn(window, "sessionStorage", "get").mockReturnValue(storage);
    const content = "Nuclear energy has low carbon emissions, but its costs and long construction times are contested.";
    const home = render(<HeroAnalyze />);
    fireEvent.change(home.getByRole("textbox", { name: "Text to analyze" }), { target: { value: content } });

    fireEvent.click(home.getByRole("button", { name: "Find what it turns on" }));

    expect(navigation.push).toHaveBeenCalledWith("/analyze");
    expect(storage.setItem).toHaveBeenCalledTimes(1);
    home.unmount();
    const paste = render(<StrictMode><PasteClient lanes={{ maps: true, diagnosis: { enabled: false } }} /></StrictMode>);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(storage.removeItem).toHaveBeenCalledTimes(1);
    expect(JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body))).toEqual({ content, contentType: "freeform" });
    expect((paste.getByLabelText("The argument to read") as HTMLTextAreaElement).value).toBe(content);
    paste.unmount();

    render(<PasteClient lanes={{ maps: true, diagnosis: { enabled: false } }} />);
    await waitFor(() => expect(document.querySelector("textarea")?.value).toBe(content));
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
