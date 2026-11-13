const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Frontmatter dates are UTC midnight, so they must be formatted in UTC —
 * formatting in the build machine's zone shifts them a day west of Greenwich.
 */
export function formatDate(date: Date, style: "day" | "month" = "day"): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: style === "day" ? "numeric" : undefined,
    timeZone: "UTC",
  });
}

/** "2026-01" → "Jan 2026"; "2021" → "2021". */
export function formatYearMonth(value: string): string {
  const [year, month] = value.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

/** "Jan 2026 — Present", "May 2025 — Jan 2026", or a single month for one-off events. */
export function formatPeriod(start: string, end?: string): string {
  if (!end) return `${formatYearMonth(start)} — Present`;
  if (end === start) return formatYearMonth(start);
  return `${formatYearMonth(start)} — ${formatYearMonth(end)}`;
}
