import Link from "next/link";
import { Icon } from "@/components/icons";
import type { BlogPost } from "@/content/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <Link
      href={`/resources/blog/${post.slug}`}
      className="group hover-lift flex flex-col rounded-2xl border border-border bg-white p-7 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <Icon name="clock" size={14} />
          {post.readTime}
        </span>
        <span aria-hidden="true">·</span>
        <span className="font-medium text-gold">{post.category}</span>
      </div>

      <h3 className="mt-4 font-display text-xl leading-snug text-navy transition-colors group-hover:text-gold md:text-2xl">
        {post.title}
      </h3>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-xs text-muted">
          Updated {formatDate(post.updatedAt ?? post.publishedAt)}
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
          Read Article
          <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
