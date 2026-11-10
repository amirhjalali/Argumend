import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PID, STUDY_ID } from "@/test/fixtures/study";

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import StudyPage, { metadata } from "./page";

afterEach(() => vi.unstubAllEnvs());

const params = (value: Record<string, string>) => ({ searchParams: Promise.resolve(value) });

describe("/study", () => {
  it("404s while NEXT_PUBLIC_ENABLE_STUDY is off, with or without Prolific parameters", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "");
    await expect(StudyPage(params({}))).rejects.toThrow("NEXT_NOT_FOUND");
    await expect(StudyPage(params({ PROLIFIC_PID: PID, STUDY_ID }))).rejects.toThrow("NEXT_NOT_FOUND");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "false");
    await expect(StudyPage(params({}))).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("is noindex and nofollow", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(String(metadata.title)).not.toMatch(/argumend/i);
  });

  it("turns away a visitor who did not come from Prolific", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "true");
    render(await StudyPage(params({})));
    expect(screen.getByText(/open only to participants invited through Prolific/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: /I agree/ })).toBeNull();
  });

  it("opens on the consent screen for a Prolific participant, inside its own main landmark", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_STUDY", "true");
    const { container } = render(await StudyPage(params({ PROLIFIC_PID: PID, STUDY_ID, SESSION_ID: "x" })));
    expect(screen.getByRole("button", { name: "I agree to take part" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "I do not agree" })).toBeTruthy();
    expect(container.querySelectorAll("main#main-content")).toHaveLength(1);
    // Nothing from a map is in the DOM before assignment.
    expect(container.querySelector("[data-study-stimulus]")).toBeNull();
  });

  it("renders without the site header or footer, so a participant cannot wander off", () => {
    const source = readFileSync(join(process.cwd(), "app/study/page.tsx"), "utf8");
    expect(source).not.toMatch(/<AppShell|<TopBar|<Footer/);
  });
});
