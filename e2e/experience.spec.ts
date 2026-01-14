import { test, expect } from "@playwright/test";

test.describe("Experience Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experience");
  });

  test("should have correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Working Experience | Zhenhao Yang's portfolio"
    );
  });

  test("should display experience heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Working Experience", level: 1 })
    ).toBeVisible();
  });

  test("should display current job information", async ({ page }) => {
    await expect(page.getByText("Full-Stack Engineer")).toBeVisible();
    await expect(page.getByRole("link", { name: "OODARIS AI" })).toBeVisible();
  });

  test("should display work history", async ({ page }) => {
    await expect(page.getByText("Full-Stack Developer")).toBeVisible();
    await expect(page.getByText("NeverNull Tech Inc.")).toBeVisible();
  });

  test("should have external project links", async ({ page }) => {
    const projectLink = page
      .getByRole("link", { name: "Project Link" })
      .first();
    await expect(projectLink).toBeVisible();
  });
});
