import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../data/consts";
import { getSortedPosts, postSlug } from "../lib/content";

export async function GET(context) {
  const posts = await getSortedPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      author: post.data.author,
      categories: post.data.tech,
      // Must match the route in pages/blog/[...slug].astro.
      link: `/blog/${postSlug(post)}/`,
    })),
  });
}
