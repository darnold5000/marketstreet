import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { aeoPages } from "@/content/aeo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/team",
    "/locations",
    "/contact",
    "/schedule",
    "/privacy",
    "/disclosures",
    "/resources/blog",
    "/resources/faq",
    "/resources/guides",
    "/answers",
  ];

  const servicePages = services.map((s) => `/services/${s.slug}`);
  const blogPages = blogPosts.map((p) => `/resources/blog/${p.slug}`);
  const answerPages = aeoPages.map((p) => `/answers/${p.slug}`);

  const allPages = [...staticPages, ...servicePages, ...blogPages, ...answerPages];

  return allPages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/services") ? 0.9 : path.startsWith("/answers") ? 0.85 : 0.7,
  }));
}
