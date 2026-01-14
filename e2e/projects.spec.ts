import { test, expect } from "@playwright/test";

test.describe("Projects Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("should have correct page title", async ({ page }) => {
    await expect(page).toHaveTitle("My Projects | Zhenhao Yang's portfolio");
  });

  test("should display projects heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Projects", level: 1 })
    ).toBeVisible();
  });

  test("should display featured project section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Featured Project" })
    ).toBeVisible();
  });

  test("should display all projects section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "All Projects" })
    ).toBeVisible();
  });

  test("should have clickable project cards", async ({ page }) => {
    // Click on a project card
    await page.getByRole("link", { name: /Personal Website/i }).click();
    await expect(page).toHaveURL(/\/projects\/personal-website/);
  });

  test("should display project tags", async ({ page }) => {
    // Check that tags are visible
    await expect(page.getByText("astro").first()).toBeVisible();
    await expect(page.getByText("react").first()).toBeVisible();
  });
});

test.describe("Project Detail Page", () => {
  test("should display project content", async ({ page }) => {
    await page.goto("/projects/personal-website");

    await expect(
      page.getByRole("heading", { name: "Personal Website", level: 1 })
    ).toBeVisible();
    await expect(page.getByText("By Zhenhao Yang")).toBeVisible();
  });

  test("should have back to projects link", async ({ page }) => {
    await page.goto("/projects/personal-website");

    await page.getByRole("link", { name: /back to projects/i }).click();
    await expect(page).toHaveURL("/projects");
  });
});
