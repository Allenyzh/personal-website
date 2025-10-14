import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

import type { CollectionEntry } from "astro:content";

export default function RecentBlogs({
  className,
  posts,
}: {
  className?: string;
  posts: (CollectionEntry<"blog"> & { readingTime: string })[];
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hasPosts = posts.length > 0;

  return (
    <section
      id="blog"
      className={`container px-4 py-12 md:py-24 ${className} ${
        !hasPosts ? "hidden" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-200 mb-4">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Latest Insights
            </span>
          </div> */}
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Recent Blog Posts
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Sharing knowledge and insights about web development, best
            practices, and emerging technologies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <a href={`/blog/${post.data.slug || post.id}`} key={index}>
              <Card
                key={post.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2 h-6">
                    <Badge
                      className={`text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200`}
                    >
                      Blog
                    </Badge>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground h-3">
                      <div className="flex items-center gap-1 h-3">
                        <span>{formatDate(post.data.pubDate.toString())}</span>
                      </div>
                      <div className="flex items-center gap-1 h-3">
                        <Clock className="h-3 w-3 -translate-y-[1.25px]" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.data.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.data.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 ">
                    {post.data.tech.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto font-medium group/btn"
                    asChild
                  ></Button>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="group" asChild>
            <a href="/blog">
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="translate-y-[1.2px]">View All Posts</span>
              <ArrowRight className="group-hover:translate-x-1 transition-all duration-200" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
