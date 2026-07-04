import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mswma.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/wealth-management", destination: "/services/wealth-management", permanent: true },
      { source: "/wealth-management/", destination: "/services/wealth-management", permanent: true },
      { source: "/blog", destination: "/resources/blog", permanent: true },
      { source: "/blog/", destination: "/resources/blog", permanent: true },
      { source: "/about/", destination: "/about", permanent: true },
      { source: "/contact/", destination: "/contact", permanent: true },
      {
        source: "/important-disclosure-information",
        destination: "/disclosures",
        permanent: true,
      },
      {
        source: "/important-disclosure-information/",
        destination: "/disclosures",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
