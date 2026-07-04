import blogPostsData from "./blog-posts.json";

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  readTime: string;
  content: string;
  faqs?: { question: string; answer: string }[];
}

export const blogPosts: BlogPost[] = blogPostsData as BlogPost[];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return [...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export function addBlogPost(post: BlogPost): void {
  blogPosts.unshift(post);
}
