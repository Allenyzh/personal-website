/**
 * Helpers for the agent-readable layer: /llms.txt and the `.md` twin of every
 * detail page. They turn MDX source into Markdown a model can read without
 * knowing anything about this site's components.
 */

const unescapeTemplate = (code: string) =>
  code
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\`/g, "`")
    .replace(/\\\$/g, "$");

/** Strip MDX-only syntax: imports, link-button components, local images; code components become fences. */
export function mdxToMarkdown(source: string): string {
  return (
    source
      // ESM imports at the top of the file
      .replace(/^import\s.+?;?\s*$/gm, "")
      // <CodeBlockWithCopy code={`...`} lang="css" /> → fenced block
      .replace(
        /<CodeBlockWithCopy\s+code=\{`([\s\S]*?)`\}\s*(?:lang="([^"]*)")?\s*\/>/g,
        (_match, code: string, lang = "") =>
          `\`\`\`${lang}\n${unescapeTemplate(code)}\n\`\`\``,
      )
      // Remaining self-closing components (PostButton…) carry no prose
      .replace(/<[A-Z][A-Za-z]*\b[\s\S]*?\/>/g, "")
      // Relative images are hashed at build time and have no stable URL
      .replace(/^!\[[^\]]*\]\((?!https?:)[^)]*\)\s*$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

export interface MarkdownDocMeta {
  title: string;
  description?: string;
  url: string;
  facts?: Array<[label: string, value: string | undefined]>;
}

/** A Markdown document: title, summary, a short fact list, then the body. */
export function toMarkdownDoc(meta: MarkdownDocMeta, body: string): string {
  const facts = (meta.facts ?? [])
    .filter((fact): fact is [string, string] => Boolean(fact[1]))
    .map(([label, value]) => `- ${label}: ${value}`);

  return [
    `# ${meta.title}`,
    meta.description ? `> ${meta.description}` : "",
    [`- URL: ${meta.url}`, ...facts].join("\n"),
    body,
  ]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n");
}

export const markdownResponse = (body: string) =>
  new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
