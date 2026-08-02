import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { CitationCard } from "./CitationCard";
import type { Reference } from "@/types/graph";

afterEach(cleanup);

const reference = {
  title: "A careful source",
  source: "Example Journal",
  url: "https://example.com/paper",
} as Reference;

describe("CitationCard keyboard access", () => {
  it("exposes the source preview on focus and keeps it open within the card", () => {
    const view = render(<CitationCard reference={reference} index={1} />);
    const citation = view.getByRole("link", { name: /A careful source/ });

    fireEvent.focus(citation);
    const action = view.getByRole("link", { name: "View Source" });
    expect(action.getAttribute("href")).toBe(reference.url);

    fireEvent.blur(citation, { relatedTarget: action });
    fireEvent.focus(action);
    expect(view.getByRole("link", { name: "View Source" })).toBeTruthy();

    fireEvent.blur(action, { relatedTarget: null });
    expect(view.queryByRole("link", { name: "View Source" })).toBeNull();
  });
});
