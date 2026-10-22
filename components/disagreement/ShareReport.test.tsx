import "@/test/setup-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ArgumentGraph } from "@/types/argument";
import type { DisagreementReportV1 } from "@/types/disagreement";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { ShareReport } from "./ShareReport";

const report = {
  diagnosis: { headline: "They agree on the goal, not the mechanism", pattern: "value-clash" },
  cruxes: [{ question: "Does the mechanism actually deliver the goal?" }],
} as unknown as DisagreementReportV1;
const graph = {} as ArgumentGraph;

function installFakeLocalStorage() {
  const values = new Map<string, string>();
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      get length() {
        return values.size;
      },
      clear: () => values.clear(),
      getItem: (key: string) => values.get(key) ?? null,
      key: (index: number) => Array.from(values.keys())[index] ?? null,
      removeItem: (key: string) => values.delete(key),
      setItem: (key: string, value: string) => values.set(key, value),
    } satisfies Storage,
  });
}

describe("ShareReport", () => {
  beforeEach(() => {
    installFakeLocalStorage();
    vi.stubGlobal("fetch", vi.fn());
    window.confirm = vi.fn(() => true);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shows a delete control once a link is published, and deleting clears the stored token", async () => {
    vi.mocked(fetch).mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url === "/api/disagreements/publish") {
        return {
          ok: true,
          json: async () => ({ url: "/d/abc123", manageToken: "token-xyz" }),
        } as Response;
      }
      if (url === "/api/disagreements/abc123" && init?.method === "DELETE") {
        return { ok: true, json: async () => ({ ok: true }) } as Response;
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });

    const view = render(
      <ShareReport
        report={report}
        graph={graph}
        publicationToken="pub-token"
        surface="session"
      />,
    );

    // Publication now runs through an inline confirmation panel instead of a
    // browser confirm() dialog: the panel states what will appear publicly.
    fireEvent.click(view.getByRole("button", { name: "Create shareable link" }));
    expect(view.getByText(/The full submitted source is not saved/)).toBeTruthy();
    fireEvent.click(view.getByRole("button", { name: "Create unlisted link" }));
    await waitFor(() => {
      expect(view.getByRole("button", { name: "Copy link" })).toBeTruthy();
    });
    expect(window.localStorage.getItem("argumend-manage:abc123")).toBe("token-xyz");

    const deleteButton = await view.findByRole("button", { name: /delete public report/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(view.getByText("This public report has been deleted.")).toBeTruthy();
    });
    expect(window.localStorage.getItem("argumend-manage:abc123")).toBeNull();
    expect(view.queryByRole("button", { name: "Copy link" })).toBeNull();
  });

  it("retains delete access for the publishing visit when browser storage rejects the token", async () => {
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json({ url: "/d/abc123", manageToken: "token-xyz" }))
      .mockResolvedValueOnce(Response.json({ ok: true }));
    const view = render(<ShareReport report={report} graph={graph} publicationToken="pub-token" surface="session" />);

    fireEvent.click(view.getByRole("button", { name: "Create shareable link" }));
    fireEvent.click(view.getByRole("button", { name: "Create unlisted link" }));

    const button = await view.findByRole("button", { name: "Delete public report" });
    expect(view.getByRole("button", { name: "Copy link" })).toBeTruthy();
    expect(view.getByRole("alert").textContent).toMatch(/keep this page open/i);
    fireEvent.click(button);
    await view.findByText("This public report has been deleted.");
    expect(fetch).toHaveBeenLastCalledWith("/api/disagreements/abc123", expect.objectContaining({
      method: "DELETE", headers: { authorization: "Bearer token-xyz" },
    }));
  });

  it("handles a network failure and lets the same confirmation retry", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new TypeError("Failed to fetch"));
    const view = render(<ShareReport report={report} graph={graph} publicationToken="pub-token" surface="session" />);
    fireEvent.click(view.getByRole("button", { name: "Create shareable link" }));
    fireEvent.click(view.getByRole("button", { name: "Create unlisted link" }));

    await view.findByRole("alert");
    const retry = view.getByRole("button", { name: "Create unlisted link" }) as HTMLButtonElement;
    expect(retry.disabled).toBe(false);
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ url: "/d/abc123", manageToken: "token-xyz" }));
    fireEvent.click(retry);
    await view.findByRole("button", { name: "Copy link" });
    expect(view.queryByRole("alert")).toBeNull();
  });

  it.each([
    { url: "https://outside.example/report", manageToken: "token" },
    { url: "/d/example" },
    { url: { unexpected: true }, manageToken: "token" },
  ])("refuses malformed publication receipts: %j", async (receipt) => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json(receipt));
    const view = render(<ShareReport report={report} graph={graph} publicationToken="pub-token" surface="session" />);
    fireEvent.click(view.getByRole("button", { name: "Create shareable link" }));
    fireEvent.click(view.getByRole("button", { name: "Create unlisted link" }));
    await view.findByRole("alert");
    expect(view.queryByRole("button", { name: "Copy link" })).toBeNull();
    expect(view.queryByRole("link", { name: "Share to X" })).toBeNull();
  });

  it("offers the public URL for manual copy after both clipboard paths fail", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ url: "/d/abc123", manageToken: "token-xyz" }));
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error("Denied"));
    Object.defineProperty(document, "execCommand", { configurable: true, value: vi.fn(() => false) });
    const view = render(<ShareReport report={report} graph={graph} publicationToken="pub-token" surface="session" />);
    fireEvent.click(view.getByRole("button", { name: "Create shareable link" }));
    fireEvent.click(view.getByRole("button", { name: "Create unlisted link" }));
    fireEvent.click(await view.findByRole("button", { name: "Copy link" }));

    await view.findByRole("alert");
    const manual = view.getByRole("textbox", { name: "Link to copy" }) as HTMLInputElement;
    expect(manual.value).toBe(`${window.location.origin}/d/abc123`);
    expect(manual.readOnly).toBe(true);
    expect(view.queryByText("Link copied.")).toBeNull();
  });
});
