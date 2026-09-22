import "@/test/setup-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ALL_AI_PROVIDER_IDS,
  AI_PROVIDERS,
  DIAGNOSIS_PROVIDER_IDS,
  formatProviderList,
} from "@/lib/aiProviders";
import { LEGAL_CONTACT_EMAIL, LEGAL_LAST_UPDATED_LABEL } from "@/lib/site";

// AppShell is the site chrome (sidebar state, theme, viewport hooks). These
// tests are about the legal copy, not the shell, so it renders as a passthrough.
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import PrivacyPage, { metadata as privacyMetadata } from "./privacy/page";
import TermsPage, { metadata as termsMetadata } from "./terms/page";

describe("/privacy", () => {
  afterEach(cleanup);

  it("renders as a privacy policy with the current revision date", () => {
    const view = render(<PrivacyPage />);

    expect(view.getByRole("heading", { level: 1 }).textContent).toBe("Privacy Policy");
    expect(view.getByText(LEGAL_LAST_UPDATED_LABEL)).toBeTruthy();
  });

  it("says plainly that it is an unreviewed draft", () => {
    const view = render(<PrivacyPage />);
    const notice = view.getByRole("note", { name: "Draft status" });

    expect(notice.textContent).toContain("Draft — pending legal review");
    expect(notice.textContent).toContain("has not been reviewed by a lawyer");
  });

  it("names every AI provider that can receive submitted material", () => {
    const view = render(<PrivacyPage />);

    for (const id of ALL_AI_PROVIDER_IDS) {
      const provider = AI_PROVIDERS[id];
      const link = view.getByRole("link", { name: provider.name });
      expect(link.getAttribute("href")).toBe(provider.privacyUrl);
    }
    expect(view.container.textContent).toContain("TypeSafe AI, Inc.");
  });

  it("states United States processing and that Argumend does not store the source", () => {
    const view = render(<PrivacyPage />);
    const text = view.container.textContent ?? "";

    expect(text).toContain("the United States");
    expect(text).toContain("does not keep the text you paste");
    expect(text).toContain(formatProviderList(DIAGNOSIS_PROVIDER_IDS));
  });

  it("warns that identifiers are not stripped, so other people's details must not be pasted", () => {
    const text = render(<PrivacyPage />).container.textContent ?? "";

    expect(text).toContain("We do not strip names");
    expect(text).toContain("private information");
  });

  it("covers analytics, accounts, the newsletter, retention, and a contact route", () => {
    const view = render(<PrivacyPage />);
    const text = view.container.textContent ?? "";

    for (const heading of [
      "Analytics and cookies",
      "Accounts and sign-in",
      "Newsletter",
      "How long we keep things",
      "Your choices",
    ]) {
      expect(view.getByRole("heading", { name: heading, level: 2 })).toBeTruthy();
    }
    expect(text).toContain("Google Analytics");
    expect(text).toContain("Google");
    expect(
      view.getAllByRole("link", { name: LEGAL_CONTACT_EMAIL })[0].getAttribute("href"),
    ).toBe(`mailto:${LEGAL_CONTACT_EMAIL}`);
  });

  it("flags every unresolved item for the founder rather than inventing an answer", () => {
    const view = render(<PrivacyPage />);

    expect(view.getAllByText("[Pending founder decision]").length).toBeGreaterThanOrEqual(5);
  });

  it("carries indexable metadata with a self-canonical", () => {
    expect(privacyMetadata.title).toBe("Privacy Policy");
    expect(privacyMetadata.alternates?.canonical).toBe("https://argumend.org/privacy");
    expect(String(privacyMetadata.description).length).toBeGreaterThan(50);
  });
});

describe("/terms", () => {
  afterEach(cleanup);

  it("renders as terms of service with the current revision date", () => {
    const view = render(<TermsPage />);

    expect(view.getByRole("heading", { level: 1 }).textContent).toBe("Terms of Service");
    expect(view.getByText(LEGAL_LAST_UPDATED_LABEL)).toBeTruthy();
  });

  it("says plainly that it is an unreviewed draft", () => {
    const notice = render(<TermsPage />).getByRole("note", { name: "Draft status" });

    expect(notice.textContent).toContain("Draft — pending legal review");
  });

  it("keeps the no-winner, educational framing the product is built on", () => {
    const text = render(<TermsPage />).container.textContent ?? "";

    expect(text).toContain("Argumend does not declare a winner");
    expect(text).toContain("do not rule on who is right");
    expect(text).toContain("not as professional advice");
  });

  it("covers acceptable use, the licence for submitted text, and the liability limits", () => {
    const view = render(<TermsPage />);
    const text = view.container.textContent ?? "";

    for (const heading of [
      "Acceptable use",
      "Text you submit",
      "Disclaimer of warranties",
      "Limitation of liability",
      "Governing law and disputes",
      "Changes to these terms",
    ]) {
      expect(view.getByRole("heading", { name: heading, level: 2 })).toBeTruthy();
    }
    expect(text).toContain("You keep whatever rights you already have");
    expect(text).toContain("running the analysis you asked for");
  });

  it("leaves the liability cap and governing law as flagged placeholders", () => {
    const view = render(<TermsPage />);

    expect(view.getAllByText("[Pending founder decision]").length).toBeGreaterThanOrEqual(5);
    expect(view.container.textContent).toContain("Set the aggregate liability cap");
    expect(view.container.textContent).toContain("Choose the governing law");
  });

  it("links to the privacy policy for where submitted text actually goes", () => {
    const view = render(<TermsPage />);
    const privacyLinks = view
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === "/privacy");

    expect(privacyLinks.length).toBeGreaterThan(0);
  });

  it("carries indexable metadata with a self-canonical", () => {
    expect(termsMetadata.title).toBe("Terms of Service");
    expect(termsMetadata.alternates?.canonical).toBe("https://argumend.org/terms");
    expect(String(termsMetadata.description).length).toBeGreaterThan(50);
  });
});
