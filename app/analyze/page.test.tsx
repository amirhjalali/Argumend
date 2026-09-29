import "@/test/setup-dom";
import { cleanup, render } from "@testing-library/react";
import { isValidElement, type ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppShell } from "@/components/AppShell";
import { PasteClient } from "@/components/paste/PasteClient";
import type { PasteLanes } from "@/lib/paste/types";
import { metadata } from "./layout";
import AnalyzePage from "./page";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

/** The page is a server component: AppShell around PasteClient, lanes decided here. */
function pasteClientOf(page: ReactElement): ReactElement<{ lanes: PasteLanes }> {
  expect(page.type).toBe(AppShell);
  const child = (page.props as { children: unknown }).children;
  if (!isValidElement(child) || child.type !== PasteClient) {
    throw new Error("expected AppShell > PasteClient");
  }
  return child as ReactElement<{ lanes: PasteLanes }>;
}

describe("/analyze", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it("runs only the offline map lane with the flags off, and says so at the button", () => {
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "");
    const client = pasteClientOf(AnalyzePage());
    expect(client.props.lanes).toEqual({ maps: true, diagnosis: { enabled: false } });

    const view = render(client);
    const text = view.container.textContent ?? "";
    expect(text).toContain("What is the argument really resting on?");
    expect(text).toContain("Nothing you paste leaves our server");
    expect(text).toContain("It never says who is right.");
    expect(text).not.toMatch(/Programmatic|Judg|rate how strong/i);
  });

  it("turns the diagnosis lane on only when the flag and a provider are both there", () => {
    vi.stubEnv("ENABLE_DISAGREEMENT_V2", "true");
    vi.stubEnv("ARGUMEND_DISAGREEMENT_PROVIDER", "");
    vi.stubEnv("ARGUMEND_DISAGREEMENT_MODEL", "");
    expect(pasteClientOf(AnalyzePage()).props.lanes.diagnosis.enabled).toBe(false);

    vi.stubEnv("ARGUMEND_DISAGREEMENT_PROVIDER", "fake");
    expect(pasteClientOf(AnalyzePage()).props.lanes.diagnosis).toEqual({
      enabled: true,
      providerIds: [],
      fixtures: true,
    });
  });

  it("no longer sells argument-quality scores in its metadata", () => {
    const described = JSON.stringify(metadata);
    expect(described).not.toMatch(/quality|score|fallacy detector|programmatic/i);
    expect(described).toContain("never says who is right");
  });
});
