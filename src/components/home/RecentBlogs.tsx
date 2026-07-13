import type { CollectionEntry } from "astro:content";
import ShadowButton from "@/components/common/ShadowButton";

export default function RecentBlogs({
  className,
  posts,
}: {
  className?: string;
  posts: (CollectionEntry<"blog"> & { readingTime: string })[];
}) {
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    })
      .format(date)
      .toLowerCase();

  const hasPosts = posts.length > 0;
  const desktopColumns =
    posts.length === 1
      ? "min-[901px]:grid-cols-1"
      : posts.length === 2
        ? "min-[901px]:grid-cols-2"
        : "min-[901px]:grid-cols-3";

  return (
    <section
      id="blog"
      className={`w-full scroll-mt-14 border-b border-[#d9d8d3] py-14 md:py-20 ${className ?? ""} ${
        !hasPosts ? "hidden" : ""
      }`}
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-12 grid grid-cols-1 items-baseline gap-1 border-b border-[#d9d8d3] pb-5 md:grid-cols-[140px_1fr_auto] md:gap-6">
          <div className="font-mono text-[13px] text-[#6b6b66]">
            — 04 / writing
          </div>
          <h2 className="m-0 text-[32px] font-semibold tracking-[-0.02em]">
            Recent Posts
          </h2>
          <div className="font-mono text-xs text-[#6b6b66]">
            latest from the blog
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-px border border-[#d9d8d3] bg-[#d9d8d3] ${desktopColumns}`}
        >
          {posts.map((post) => (
            <a
              href={`/blog/${post.data.slug || post.id}`}
              key={post.data.slug || post.id}
              className="flex min-h-[200px] cursor-pointer flex-col gap-3 bg-[#fafaf9] p-6 transition-colors duration-200 hover:bg-[#f0efec]"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-[#6b6b66]">
                <time dateTime={post.data.pubDate.toISOString()}>
                  {formatDate(post.data.pubDate)}
                </time>
                <span>{post.data.tech[0] ?? "—"}</span>
              </div>

              <h3 className="m-0 text-lg font-semibold leading-[1.3] tracking-[-0.01em] [text-wrap:pretty]">
                {post.data.title}
              </h3>

              <p className="m-0 flex-1 text-sm text-[#3a3a38] [text-wrap:pretty]">
                {post.data.description}
              </p>

              <div className="mt-auto font-mono text-[11px] text-[#6b6b66]">
                {post.readingTime} →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <ShadowButton href="/blog">all posts →</ShadowButton>
        </div>
      </div>
    </section>
  );
}
