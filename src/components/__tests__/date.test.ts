import { describe, it, expect } from "vitest";
import { formatDate, formatPeriod, formatYearMonth } from "@/lib/date";

describe("formatDate", () => {
  it("formats frontmatter dates in UTC, whatever the machine's zone", () => {
    // UTC midnight is still the previous evening in the Americas.
    expect(formatDate(new Date("2026-01-06T00:00:00Z"))).toBe("Jan 6, 2026");
  });

  it("can drop the day", () => {
    expect(formatDate(new Date("2025-04-01T00:00:00Z"), "month")).toBe(
      "Apr 2025",
    );
  });
});

describe("formatYearMonth", () => {
  it("formats a year and month", () => {
    expect(formatYearMonth("2026-01")).toBe("Jan 2026");
  });

  it("passes a bare year through", () => {
    expect(formatYearMonth("2021")).toBe("2021");
  });
});

describe("formatPeriod", () => {
  it("marks an open-ended role as present", () => {
    expect(formatPeriod("2026-01")).toBe("Jan 2026 — Present");
  });

  it("formats a closed range", () => {
    expect(formatPeriod("2025-05", "2026-01")).toBe("May 2025 — Jan 2026");
    expect(formatPeriod("2021", "2023")).toBe("2021 — 2023");
  });

  it("collapses a one-month event", () => {
    expect(formatPeriod("2025-04", "2025-04")).toBe("Apr 2025");
  });
});
