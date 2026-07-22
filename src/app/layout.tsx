import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Analytics } from "@/components/analytics/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <JsonLd data={[organizationSchema(), ...localBusinessSchema()]} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
