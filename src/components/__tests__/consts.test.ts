import { describe, it, expect } from "vitest";
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  MY_NAME,
  MY_EMAIL,
  MY_GITHUB,
  MY_LINKEDIN,
} from "@/data/consts";

describe("Constants", () => {
  it("should have valid site title", () => {
    expect(SITE_TITLE).toBe("Zhenhao Yang's portfolio");
  });

  it("should have non-empty site description", () => {
    expect(SITE_DESCRIPTION).toBeTruthy();
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(50);
  });

  it("should have valid author name", () => {
    expect(MY_NAME).toBe("Zhenhao Yang");
  });

  it("should have valid email format", () => {
    expect(MY_EMAIL).toMatch(/^[\w.-]+@[\w.-]+\.\w+$/);
  });

  it("should have valid GitHub URL", () => {
    expect(MY_GITHUB).toMatch(/^https:\/\/github\.com\//);
  });

  it("should have valid LinkedIn URL", () => {
    expect(MY_LINKEDIN).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });
});
