# NorthBridge Wealth

Modern, premium website for [NorthBridge Wealth](https://northbridgewealth.com) — built with Next.js 15+, React, TypeScript, and Tailwind CSS.

## Features

- **Premium design** — Large typography, generous spacing, navy/gold palette
- **Static generation** — Fast page loads via SSG and Server Components
- **Technical SEO** — Unique metadata, canonical URLs, Open Graph, Twitter Cards, sitemap, robots.txt
- **Schema.org markup** — Organization, FinancialService, LocalBusiness, Person, FAQ, BlogPosting, Service, Breadcrumb
- **AEO optimization** — FAQ sections on service pages answering common financial planning questions
- **Content management** — Edit content in `src/content/` without touching components
- **Analytics ready** — Google Analytics and Microsoft Clarity integration
- **Security** — HTTPS headers, form validation, rate limiting on contact API

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID |
| `NEXT_PUBLIC_SITE_URL` | Production site URL for SEO |

## Content Management

All content lives in `src/content/`:

| File | What to edit |
|---|---|
| `site.ts` | Company info, trust indicators, process steps |
| `team.ts` | Team member bios, credentials, specialties |
| `services.ts` | Service descriptions and FAQ answers |
| `locations.ts` | Office addresses, phone numbers, hours |
| `faq.ts` | Global FAQ page content |
| `blog.ts` | Blog posts (title, content, SEO metadata, FAQs) |

### Adding a blog post

1. Add a new entry to `src/content/blog.ts`
2. Include `seoTitle`, `metaDescription`, and optional `faqs` for schema markup
3. The post appears automatically on `/resources/blog`

### Adding a team member

1. Add an entry to `src/content/team.ts`
2. Set `featured: true` to show on the homepage

## Site Structure

```
/                           Homepage
/about                      About Us
/team                       Meet the Team
/services/[slug]            Service pages (5 services)
/resources/blog             Blog listing
/resources/blog/[slug]      Blog posts
/resources/faq              FAQ
/resources/guides           Educational guides
/locations                  Office locations
/contact                    Contact form
/schedule                   Schedule consultation
/privacy                    Privacy policy
/disclosures                Regulatory disclosures
```

## Deployment

Deploy to [Vercel](https://vercel.com):

```bash
npx vercel
```

Connect your GitHub repository for automatic deployments on push.

## Performance

Target metrics:
- PageSpeed Desktop: 95+
- PageSpeed Mobile: 90+
- LCP: < 2 seconds
- Accessibility: 95+
- SEO: 100

## License

Proprietary — NorthBridge Wealth Advisors, LLC
