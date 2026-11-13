import { describe, it, expect } from "vitest";
import { mdxToMarkdown, toMarkdownDoc } from "@/lib/markdown";

describe("mdxToMarkdown", () => {
  it("drops import statements", () => {
    const source = 'import PostButton from "@/components/common/PostButton";\n\nHello.';
    expect(mdxToMarkdown(source)).toBe("Hello.");
  });

  it("turns CodeBlockWithCopy into a fenced block and unescapes newlines", () => {
    const source =
      'Before.\n\n<CodeBlockWithCopy\n  code={`.a {\\n  color: red;\\n}`}\n  lang="css"\n/>\n\nAfter.';
    expect(mdxToMarkdown(source)).toBe(
      "Before.\n\n```css\n.a {\n  color: red;\n}\n```\n\nAfter.",
    );
  });

  it("handles a single-line code component", () => {
    expect(
      mdxToMarkdown('<CodeBlockWithCopy code={`pnpm i\\npnpm build`} lang="shell" />'),
    ).toBe("```shell\npnpm i\npnpm build\n```");
  });

  it("removes other self-closing components", () => {
    const source =
      '<PostButton\n  items={[\n    { href: "https://example.com", type: "demo" },\n  ]}\n/>\n\nBody.';
    expect(mdxToMarkdown(source)).toBe("Body.");
  });

  it("removes relative images but keeps absolute ones", () => {
    const source =
      "Text.\n\n![demo](./demo.webp)\n\n![remote](https://example.com/a.png)";
    expect(mdxToMarkdown(source)).toBe(
      "Text.\n\n![remote](https://example.com/a.png)",
    );
  });

  it("leaves ordinary Markdown alone", () => {
    const source = "## Title\n\n- **bold** and `code`\n- [link](https://a.b)";
    expect(mdxToMarkdown(source)).toBe(source);
  });
});

describe("toMarkdownDoc", () => {
  it("builds title, summary, facts and body", () => {
    const doc = toMarkdownDoc(
      {
        title: "AI Chat",
        description: "A chatbot.",
        url: "https://example.com/projects/aichat/",
        facts: [
          ["Tech", "react, gemini"],
          ["Live", undefined],
        ],
      },
      "Body text.",
    );
    expect(doc).toBe(
      "# AI Chat\n\n> A chatbot.\n\n- URL: https://example.com/projects/aichat/\n- Tech: react, gemini\n\nBody text.\n",
    );
  });

  it("omits an empty body", () => {
    const doc = toMarkdownDoc({ title: "T", url: "https://example.com/" }, "");
    expect(doc).toBe("# T\n\n- URL: https://example.com/\n");
  });
});
