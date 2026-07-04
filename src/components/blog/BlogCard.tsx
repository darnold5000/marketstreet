import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import type { BlogPost } from "@/content/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

const fallbackImages = [
  "/images/team-advising.jpg",
  "/images/hero-office.jpg",
  "/images/team-group.jpg",
];

function getPostImage(post: BlogPost, index: number) {
  const img = post.featuredImage;
  if (img && !img.endsWith(".pdf")) return img;
  return fallbackImages[index % fallbackImages.length];
}

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const imageSrc = getPostImage(post, index);

  return (
    <Link
      href={`/resources/blog/${post.slug}`}
      className="group hover-lift flex flex-col overflow-hidden rounded-2xl border border-border bg-white animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-cream">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover object-center img-zoom"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Icon name="clock" size={14} />
            {post.readTime}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-gold">{post.category}</span>
        </div>

        <h3 className="mt-3 font-display text-xl leading-snug text-navy transition-colors group-hover:text-gold md:text-2xl">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs text-muted">
            Updated {formatDate(post.updatedAt ?? post.publishedAt)}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
            Read Article
            <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
