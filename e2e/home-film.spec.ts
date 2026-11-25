import type { Page } from "@playwright/test";
import { expect, test, waitForHydration } from "./fixtures";

const SEEN_KEY = "argumend:home-film-seen";

/** A client-rendered control inside the film (hidden on a first visit): hydrated once React owns it. */
const replayButton = (page: Page) =>
  page.getByRole("button", { name: "Replay the intro", includeHidden: true });

/**
 * Home's film (components/home/film): a pre-rendered sequence scrubbed by
 * scroll on a first visit, and the hero alone on every visit after it.
 */
test("a first visit scrubs the film; the next one gets the short home with a replay", async ({
  page,
}) => {
  await page.goto("/");
  await waitForHydration(replayButton(page));
  const film = page.locator("[data-home-film]");
  await expect(film).not.toHaveAttribute("data-seen", /.*/);
  await expect(film).toHaveAttribute("data-film-mode", "film");
  await expect(film.locator("[data-film-step]")).toHaveCount(6);
  await expect(film.locator("canvas")).toHaveAttribute("data-painted", "");

  // Scrolling moves the story: the fourth step is the active one at 60%.
  await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>("[data-home-film]")!;
    const distance =
      section.getBoundingClientRect().height - (window.innerHeight - 56);
    window.scrollTo(0, distance * 0.6);
  });
  await expect(film.locator("[data-film-step]").nth(3)).toHaveAttribute(
    "data-active",
    "",
  );
  await expect(
    film.locator("[data-film-step]").nth(3).locator("[data-film-rise]").first(),
  ).toHaveCSS("opacity", "1");
  // Beside the picture (wide screens) only that step's copy is up and the
  // others wait their turn; on a phone every sheet is simply there.
  const wide = (page.viewportSize()?.width ?? 0) >= 1024;
  await expect(
    film.locator("[data-film-step]").nth(1).locator("[data-film-rise]").first(),
  ).toHaveCSS("opacity", wide ? "0" : "1");
  await expect(
    film.getByRole("heading", { level: 2, name: /not in dispute/ }),
  ).toBeInViewport();

  // The end of the film is remembered.
  await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>("[data-home-film]")!;
    window.scrollTo(0, section.getBoundingClientRect().height);
  });
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), SEEN_KEY))
    .toBe("1");

  await page.reload();
  await waitForHydration(replayButton(page));
  await expect(film).toHaveAttribute("data-seen", "");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByTestId("home-primary-cta")).toBeVisible();
  await expect(film.getByRole("heading", { level: 2 })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Skip the intro" })).toBeHidden();

  await page.getByRole("button", { name: "Replay the intro" }).click();
  await expect(film).not.toHaveAttribute("data-seen", /.*/);
  await expect(film.getByRole("heading", { level: 2 })).toHaveCount(5);
  expect(
    await page.evaluate((key) => localStorage.getItem(key), SEEN_KEY),
  ).toBeNull();
});

test("with reduced motion the film is six stills, and the story is all there", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await waitForHydration(replayButton(page));
  const film = page.locator("[data-home-film]");
  await expect(film).toHaveAttribute("data-film-mode", "stills");
  // Nothing waits on an entrance: every piece of every step is simply there.
  const pieces = await film.locator("[data-film-rise]").all();
  expect(pieces.length).toBeGreaterThan(20);
  for (const piece of pieces) await expect(piece).toHaveCSS("opacity", "1");
  await expect(
    film.getByRole("complementary", { name: "One pilot test" }),
  ).toBeAttached();
});

test("skipping the intro lands on the worked crux and is remembered", async ({
  page,
}) => {
  await page.goto("/");
  await waitForHydration(replayButton(page));
  await page.getByRole("link", { name: "Skip the intro" }).click();
  await expect(page).toHaveURL(/#home-crux$/);
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "What would change your mind?",
    }),
  ).toBeInViewport();
  expect(
    await page.evaluate((key) => localStorage.getItem(key), SEEN_KEY),
  ).toBe("1");
});
