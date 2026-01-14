import { test, expect } from "@playwright/test";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("should have correct page title", async ({ page }) => {
    await expect(page).toHaveTitle("My Blogs | Zhenhao Yang's portfolio");
  });

  test("should display blog heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Blog", level: 1 })
    ).toBeVisible();
  });

  test("should display all posts section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "All Posts" })
    ).toBeVisible();
  });

  test("should have clickable blog posts", async ({ page }) => {
    await page.getByRole("link", { name: /CSS Tricks: Flexbox/i }).click();
    await expect(page).toHaveURL(/\/blog\/css-tricks-flexbox/);
  });

  test("should display post tags", async ({ page }) => {
    await expect(page.getByText("css").first()).toBeVisible();
    await expect(page.getByText("flexbox").first()).toBeVisible();
  });
});

test.describe("Blog Post Detail Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog/css-tricks-flexbox");
  });

  test("should display post title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "CSS Tricks: Flexbox", level: 1 })
    ).toBeVisible();
  });

  test("should display author and reading time", async ({ page }) => {
    await expect(page.getByText("By Zhenhao Yang")).toBeVisible();
    await expect(page.getByText("5 min read")).toBeVisible();
  });

  test("should display code blocks", async ({ page }) => {
    // Check that code blocks are rendered
    await expect(page.locator("pre").first()).toBeVisible();
  });

  test("should have back to blogs link", async ({ page }) => {
    await page.getByRole("link", { name: /back to blogs/i }).click();
    await expect(page).toHaveURL("/blog");
  });

  test("should have prev/next navigation", async ({ page }) => {
    await expect(page.getByRole("link", { name: /PREV/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /NEXT/i })).toBeVisible();
  });
});
