import { expect, test, waitForHydration } from "./fixtures";

test("home paste reaches the result when session storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    for (const name of ["getItem", "setItem", "removeItem"] as const) {
      const original = Storage.prototype[name];
      Object.defineProperty(Storage.prototype, name, {
        configurable: true,
        value(this: Storage, key: string, ...args: string[]) {
          if (key === "argumend-analyze-prefill") {
            throw new DOMException("Storage is blocked", "SecurityError");
          }
          return Reflect.apply(original, this, [key, ...args]);
        },
      });
    }
  });
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/analyze") submissions.push(request.method());
  });
  await page.goto("/");
  const example = page.getByRole("button", { name: "Try an example" });
  await waitForHydration(example);
  await example.click();
  await page.getByRole("button", { name: "Find what it turns on" }).click();

  await expect(page).toHaveURL(/\/analyze$/);
  const result = page.getByRole("region", { name: "Result" });
  await expect(result.getByRole("heading", { name: "This argument is already mapped" })).toBeVisible();
  await expect(result.getByRole("link", { name: /^Open the map at/ })).toHaveAttribute("href", /^\/topics\/nuclear-energy-safety#crux-/);
  expect(submissions).toEqual(["POST"]);
});
