import { expect, test, waitForHydration } from "./fixtures";

test("the home paste hands its text to the offline map flow once", async ({ page }) => {
  const mapRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/analyze") {
      mapRequests.push(request.method());
    }
  });

  await page.goto("/");
  const example = page.getByRole("button", { name: "Try an example" });
  await waitForHydration(example);
  await example.click();
  await expect(page.getByRole("textbox", { name: "Text to analyze" })).toHaveValue(
    /nuclear energy/,
  );
  await page.getByRole("button", { name: "Find what it turns on" }).click();

  await expect(page).toHaveURL(/\/analyze$/);
  const result = page.getByRole("region", { name: "Result" });
  await expect(result.getByRole("heading", { name: "This argument is already mapped" })).toBeVisible();
  await expect(result.getByRole("link", { name: /^Open the map at/ })).toHaveAttribute(
    "href",
    "/topics/nuclear-energy-safety#crux-climate-effectiveness",
  );
  expect(mapRequests).toEqual(["POST"]);
  expect(await page.evaluate(() => sessionStorage.getItem("argumend-analyze-prefill"))).toBeNull();
});
