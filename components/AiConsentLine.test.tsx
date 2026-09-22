import "@/test/setup-dom";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { analyzeSourceBadge, buildConsentLine } from "@/lib/aiProviders";
import { AiConsentLine } from "./AiConsentLine";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { DisagreementAnalyzeClient } from "./disagreement/DisagreementAnalyzeClient";

describe("AiConsentLine", () => {
  afterEach(cleanup);

  it("renders the approved sentence exactly", () => {
    const view = render(<AiConsentLine />);

    expect(view.getByRole("note", { name: "How your text is handled" }).textContent).toBe(
      buildConsentLine().text,
    );
  });

  it("routes the visitor to the privacy policy from inside the sentence", () => {
    const view = render(<AiConsentLine />);
    const note = within(view.getByRole("note", { name: "How your text is handled" }));

    expect(note.getByRole("link", { name: "our AI provider" }).getAttribute("href")).toBe(
      "/privacy",
    );
  });

  it("names whichever providers the surface passes it", () => {
    const view = render(<AiConsentLine providerIds={["anthropic"]} />);

    expect(view.getByRole("note", { name: "How your text is handled" }).textContent).toContain(
      "(Anthropic, processed in the United States)",
    );
  });
});

describe("/analyze-v2 consent at the point of submit", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows the disclosure before anything can be submitted", () => {
    vi.stubGlobal("fetch", vi.fn());
    const view = render(<DisagreementAnalyzeClient />);

    expect(view.getByRole("note", { name: "How your text is handled" }).textContent).toBe(
      buildConsentLine().text,
    );
  });

  it("announces the disclosure with the submit button", () => {
    vi.stubGlobal("fetch", vi.fn());
    const view = render(<DisagreementAnalyzeClient />);
    const submit = view.getByRole("button", { name: "Find what it turns on" });
    const describedBy = submit.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)?.textContent).toBe(
      buildConsentLine().text,
    );
  });

  it("puts the disclosure above the button, not below it", () => {
    vi.stubGlobal("fetch", vi.fn());
    const view = render(<DisagreementAnalyzeClient />);
    const note = view.getByRole("note", { name: "How your text is handled" });
    const submit = view.getByRole("button", { name: "Find what it turns on" });

    // Node.DOCUMENT_POSITION_FOLLOWING === 4: the button comes after the note.
    expect(note.compareDocumentPosition(submit) & 4).toBe(4);
  });
});

describe("/analyze privacy badge", () => {
  const source = readFileSync(join(process.cwd(), "app", "analyze", "page.tsx"), "utf8");

  it("names the provider instead of an anonymous 'configured AI provider'", () => {
    expect(source).toContain("analyzeSourceBadge()");
    expect(source).not.toContain("the configured AI provider");
    expect(analyzeSourceBadge()).toContain("Anthropic");
  });
});
