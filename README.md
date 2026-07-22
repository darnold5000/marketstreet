# Market Street Wealth Management

Modern, premium website for [Market Street Wealth Management](https://mswma.com) — built with Next.js 15+, React, TypeScript, and Tailwind CSS.

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
| `NEXT_PUBLIC_SITE_URL` | Production site URL for SEO + auth redirects |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only; user invites) |

## Content Management

### Public site (static fallback)

Content in `src/content/` still powers the marketing site when Supabase has no published CMS rows.

### Content admin portal (`/admin`)

Secure portal for public-website content only (team, articles/documents, pages, media, settings).

| Route | Purpose |
|---|---|
| `/login` | Staff email/password login (no public registration) |
| `/admin` | Dashboard |
| `/admin/team` | Team member profiles + photos |
| `/admin/articles` | Document uploads (PDF/DOCX) + featured images |
| `/admin/pages` | Structured homepage / about / contact / footer / office |
| `/admin/media` | Media library (`team/`, `articles/`, `pages/`, `branding/`) |
| `/admin/settings` | Office info, logo, social links (administrators) |
| `/admin/activity` | Activity log (administrators) |
| `/admin/users` | Invite editors/admins (administrators) |
| `/admin/content` | Legacy AI blog assistant (password-gated) |

**Setup**

1. Create a Supabase project and apply `supabase/migrations/001_admin_portal.sql`
2. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`
3. Create the first Auth user, then run `supabase/seed_first_admin.sql` with that user's UUID
4. Sign in at `/login`

Roles: **Administrator** (full access + publish + users + settings) and **Editor** (edit/upload/drafts).

All content lives in `src/content/` as fallback:

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

Proprietary — Market Street Wealth Management Advisors, LLC
