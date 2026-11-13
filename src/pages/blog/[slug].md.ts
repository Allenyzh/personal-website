import type { APIRoute, GetStaticPaths } from "astro";
import { getSortedPosts, postSlug, type Post } from "@/lib/content";
import { formatDate } from "@/lib/date";
import {
  markdownResponse,
  mdxToMarkdown,
  toMarkdownDoc,
} from "@/lib/markdown";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () =>
  (await getSortedPosts()).map((post) => ({
    params: { slug: postSlug(post) },
    props: { post },
  }));

export const GET: APIRoute<{ post: Post }> = ({ props, site, url }) => {
  const { post } = props;
  const { data } = post;

  return markdownResponse(
    toMarkdownDoc(
      {
        title: data.title,
        description: data.description,
        url: new URL(`/blog/${postSlug(post)}/`, site ?? url).href,
        facts: [
          ["Published", formatDate(data.pubDate)],
          ["Author", data.author],
          ["Tags", data.tech.join(", ")],
        ],
      },
      mdxToMarkdown(post.body ?? ""),
    ),
  );
};
