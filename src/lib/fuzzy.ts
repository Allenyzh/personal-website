/**
 * Score how well `query` matches `text` (both expected lower-case).
 * 0 means no match. Tiers, best first:
 *   1. the query starts a word            ("ai" → "AI Chat")
 *   2. the query sits inside a word       ("script" → "TypeScript"), 3+ letters only
 *   3. the letters appear in order, close ("prj" → "projects"), 3+ letters only
 * Short queries are held to word starts: "ai" inside "email" is a coincidence.
 */
export function fuzzyScore(query: string, text: string): number {
  if (!query) return 1;

  let at = text.indexOf(query);
  let inside = -1;
  while (at >= 0) {
    if (at === 0 || /[^a-z0-9]/.test(text[at - 1])) {
      return 120 - Math.min(at, 40);
    }
    if (inside < 0) inside = at;
    at = text.indexOf(query, at + 1);
  }

  if (query.length < 3) return 0;
  if (inside >= 0) return 80 - Math.min(inside, 40);

  let cursor = 0;
  let first = -1;
  let run = 0;
  let score = 0;
  for (const char of query) {
    const found = text.indexOf(char, cursor);
    if (found < 0) return 0;
    if (first < 0) first = found;
    run = found === cursor ? run + 1 : 0;
    score += 1 + run;
    cursor = found + 1;
  }
  // Letters scattered across the whole string are a coincidence, not a match.
  if (cursor - first > query.length * 2 + 2) return 0;
  return score;
}

/** Titles count double so "ai" ranks "AI Chat" above a project merely tagged with it. */
export function scoreItem(query: string, title: string, keywords = ""): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  return Math.max(
    fuzzyScore(q, title.toLowerCase()) * 2,
    // Keywords need a real hit; scattered letters there are noise.
    fuzzyScore(q, keywords.toLowerCase()) >= 40 ? 60 : 0,
  );
}
