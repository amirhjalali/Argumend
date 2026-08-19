import "@/test/setup-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ArgumentGraph } from "@/types/argument";
import type { DisagreementReportV1 } from "@/types/disagreement";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { ShareReport } from "./ShareReport";

const report = {
  diagnosis: { headline: "They agree on the goal, not the mechanism", pattern: "value-clash" },
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

    fireEvent.click(view.getByRole("button", { name: "Create shareable link" }));
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
});
