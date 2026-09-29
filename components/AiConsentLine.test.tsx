import "@/test/setup-dom";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildConsentLine, buildPasteConsentLine } from "@/lib/aiProviders";
import { AiConsentLine } from "./AiConsentLine";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { PasteClient } from "./paste/PasteClient";
import type { PasteLanes } from "@/lib/paste/types";

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

const OFFLINE: PasteLanes = { maps: true, diagnosis: { enabled: false } };
const HOSTED: PasteLanes = {
  maps: true,
  diagnosis: { enabled: true, providerIds: ["anthropic"], fixtures: false },
};

describe("/analyze consent at the point of submit", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it.each([
    ["the offline map lane", OFFLINE, buildPasteConsentLine([]).text],
    ["the hosted diagnosis lane", HOSTED, buildPasteConsentLine(["anthropic"]).text],
  ])("shows the disclosure for %s before anything can be submitted", (_lane, lanes, text) => {
    vi.stubGlobal("fetch", vi.fn());
    const view = render(<PasteClient lanes={lanes} />);

    expect(view.getByRole("note", { name: "How your text is handled" }).textContent).toBe(text);
  });

  it("announces the disclosure with the submit button", () => {
    vi.stubGlobal("fetch", vi.fn());
    const view = render(<PasteClient lanes={HOSTED} />);
    const submit = view.getByRole("button", { name: "Find what it turns on" });
    const describedBy = submit.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)?.textContent).toBe(
      buildPasteConsentLine(["anthropic"]).text,
    );
  });

  it("puts the disclosure above the button, not below it", () => {
    vi.stubGlobal("fetch", vi.fn());
    const view = render(<PasteClient lanes={OFFLINE} />);
    const note = view.getByRole("note", { name: "How your text is handled" });
    const submit = view.getByRole("button", { name: "Find what it turns on" });

    // Node.DOCUMENT_POSITION_FOLLOWING === 4: the button comes after the note.
    expect(note.compareDocumentPosition(submit) & 4).toBe(4);
  });
});

describe("/analyze consent line", () => {
  const source = readFileSync(join(process.cwd(), "components", "paste", "PasteClient.tsx"), "utf8");

  it("is built for the lanes that will run, not a fixed roster", () => {
    expect(source).toContain("buildPasteConsentLine(providerIds)");
    expect(source).not.toContain("the configured AI provider");
  });

  it("renders the offline line when only the map lane runs", () => {
    const view = render(<AiConsentLine consent={buildPasteConsentLine([])} />);
    const text = view.getByRole("note", { name: "How your text is handled" }).textContent;

    expect(text).toBe(buildPasteConsentLine([]).text);
    expect(text).toContain("Nothing you paste leaves our server");
  });
});
