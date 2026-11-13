import { describe, it, expect } from "vitest";
import { fuzzyScore, scoreItem } from "@/lib/fuzzy";

describe("fuzzyScore", () => {
  it("matches everything for an empty query", () => {
    expect(fuzzyScore("", "anything")).toBeGreaterThan(0);
  });

  it("ranks a word-start hit above a hit inside a word", () => {
    expect(fuzzyScore("script", "script tag")).toBeGreaterThan(
      fuzzyScore("script", "typescript"),
    );
  });

  it("finds an in-order subsequence", () => {
    expect(fuzzyScore("prj", "projects")).toBeGreaterThan(0);
  });

  it("rejects letters scattered across the string", () => {
    expect(fuzzyScore("pwe", "personal website")).toBe(0);
  });

  it("holds short queries to word starts", () => {
    expect(fuzzyScore("ai", "copy email")).toBe(0);
    expect(fuzzyScore("ai", "tailwindcss")).toBe(0);
    expect(fuzzyScore("ai", "open ai")).toBeGreaterThan(0);
  });

  it("returns 0 when a letter is missing", () => {
    expect(fuzzyScore("xyz", "projects")).toBe(0);
  });
});

describe("scoreItem", () => {
  it("is case-insensitive and ignores surrounding space", () => {
    expect(scoreItem("  AI ", "AI Chat")).toBeGreaterThan(0);
  });

  it("ranks a title hit above a keyword hit", () => {
    expect(scoreItem("ai", "AI Chat", "react gemini")).toBeGreaterThan(
      scoreItem("ai", "CLI MCP", "python ai open-source"),
    );
  });

  it("matches on keywords alone", () => {
    expect(scoreItem("python", "CLI MCP", "python mcpserver")).toBeGreaterThan(
      0,
    );
  });

  it("does not match unrelated items", () => {
    expect(scoreItem("ai", "Copy email", "contact mail address")).toBe(0);
    expect(scoreItem("ai", "InputDateMask", "vue shadcn tailwindcss")).toBe(0);
  });
});
