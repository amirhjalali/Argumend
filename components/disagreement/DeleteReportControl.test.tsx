import "@/test/setup-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteReportControl } from "./DeleteReportControl";

const SLUG = "test-slug";
const KEY = `argumend-manage:${SLUG}`;

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

describe("DeleteReportControl", () => {
  beforeEach(() => {
    installFakeLocalStorage();
    vi.stubGlobal("fetch", vi.fn());
    window.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders nothing when no management token is stored for this slug", async () => {
    const view = render(<DeleteReportControl slug={SLUG} />);
    await waitFor(() => {
      expect(view.queryByRole("button", { name: /delete public report/i })).toBeNull();
    });
  });

  it("shows the delete control when a management token is stored", async () => {
    window.localStorage.setItem(KEY, "token-123");
    const view = render(<DeleteReportControl slug={SLUG} />);
    await waitFor(() => {
      expect(view.getByRole("button", { name: /delete public report/i })).toBeTruthy();
    });
  });

  it("asks for confirmation and does nothing if the visitor cancels", async () => {
    window.localStorage.setItem(KEY, "token-123");
    window.confirm = vi.fn(() => false);

    const view = render(<DeleteReportControl slug={SLUG} />);
    const button = await view.findByRole("button", { name: /delete public report/i });
    fireEvent.click(button);

    expect(window.confirm).toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
    expect(window.localStorage.getItem(KEY)).toBe("token-123");
  });

  it("deletes with the stored bearer token, clears it, and confirms on success", async () => {
    window.localStorage.setItem(KEY, "token-123");
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);
    const onDeleted = vi.fn();

    const view = render(<DeleteReportControl slug={SLUG} onDeleted={onDeleted} />);
    const button = await view.findByRole("button", { name: /delete public report/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(view.getByText("This public report has been deleted.")).toBeTruthy();
    });
    expect(fetch).toHaveBeenCalledWith(
      `/api/disagreements/${SLUG}`,
      expect.objectContaining({
        method: "DELETE",
        headers: { authorization: "Bearer token-123" },
      }),
    );
    expect(window.localStorage.getItem(KEY)).toBeNull();
    expect(onDeleted).toHaveBeenCalledTimes(1);
    expect(view.queryByRole("button", { name: /delete public report/i })).toBeNull();
  });

  it("surfaces a clear error and keeps the token when the delete fails", async () => {
    window.localStorage.setItem(KEY, "token-123");
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Report not found.", code: "INVALID_REQUEST" }),
    } as Response);

    const view = render(<DeleteReportControl slug={SLUG} />);
    const button = await view.findByRole("button", { name: /delete public report/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(view.getByText("Report not found.")).toBeTruthy();
    });
    expect(window.localStorage.getItem(KEY)).toBe("token-123");
    expect(view.getByRole("button", { name: /delete public report/i })).toBeTruthy();
  });
});
