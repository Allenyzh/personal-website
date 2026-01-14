import { test, expect } from "@playwright/test";

test.describe("404 Page", () => {
  test("should display 404 page for non-existent routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");

    await expect(
      page.getByRole("heading", { name: "404 - Page Not Found" })
    ).toBeVisible();
    await expect(
      page.getByText("The page you are looking for does not exist")
    ).toBeVisible();
  });

  test("should have link back to home", async ({ page }) => {
    await page.goto("/non-existent-page");

    await page.getByRole("link", { name: "Go to Home" }).click();
    await expect(page).toHaveURL("/");
  });
});
