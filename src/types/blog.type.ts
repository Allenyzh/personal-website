interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
}

interface RecentBlogsProps {
  className?: string;
}

export type { BlogPost, RecentBlogsProps };
