import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

import { type CollectionEntry, getCollection, render } from "astro:content";
const posts = await getCollection("blog");
const filteredPosts = posts.filter((post) => post.data.showOnHomePage);
const sortedPosts = filteredPosts.sort(
  (a, b) => (b.data.order ?? 0) - (a.data.order ?? 0)
);
export default function RecentBlogs({ className }: { className?: string }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className={`container px-4 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-200 mb-4">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Latest Insights
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Recent Blog Posts
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Sharing knowledge and insights about web development, best
            practices, and emerging technologies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div> */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2 h-6">
                  <Badge
                    className={`text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200`}
                  >
                    Blog
                  </Badge>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground h-3">
                    <div className="flex items-center gap-1 h-3">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.data.pubDate.toString())}</span>
                    </div>
                    <div className="flex items-center gap-1 h-3">
                      <Clock className="h-3 w-3" />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  <a href={`/blog/${post.data.slug || post.id}`}>
                    {post.data.title}
                  </a>
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.data.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
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
                >
                  <a href={`/blog/${post.data.slug || post.id}`}>
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <a href="/blog">
              <BookOpen className="h-4 w-4 mr-2" />
              View All Posts
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
