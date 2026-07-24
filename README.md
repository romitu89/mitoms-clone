# MITOMS Technologies Website

Existing MITOMS Next.js website enhanced with technical SEO, search-focused content and static-export validation while preserving the current visual design and functionality.

## Architecture

- Next.js App Router for development and static generation
- Static production export to `out/`
- No persistent Node.js server required on Hostinger
- Consultation forms submit to `public/api/consultation.php`
- Apache `.htaccess` handles redirects, compression, caching and security headers

## SEO implementation

- Unique titles, descriptions and canonical URLs
- Open Graph and Twitter metadata
- Organization, ProfessionalService, WebSite, WebPage, Breadcrumb, Service, FAQ, Article, CreativeWork and ItemList JSON-LD
- Generated `robots.txt`, `sitemap.xml` and web manifest
- Search-safe 404 page
- Legacy indexed URL redirects
- Local Ghaziabad and Delhi NCR landing pages
- Detailed case studies and search-intent insights
- Crawlable internal links
- Static HTML content for primary page information
- Post-build validation for titles, descriptions, canonicals, H1s, JSON-LD, sitemap and links

## Requirements

- Node.js 20.9 or newer
- npm

Do not copy `node_modules` between Windows and Linux. Always create a clean installation for the operating system performing the build.

## Recommended Windows build

Double-click:

```text
build-hostinger.bat
```

It performs:

1. `npm ci`
2. ESLint and TypeScript checks
3. Clean Next.js static export
4. SEO validation of generated HTML
5. Creation of `MITOMS-PublicHTML-Build.zip`

## Manual build

```bash
npm ci
npm run build:hostinger
```

The generated site is placed in `out/`.

To run only source checks:

```bash
npm run check
```

To validate an existing `out/` build:

```bash
npm run seo:validate
```

## Environment variables

Copy `.env.example` to `.env.local` or `.env.production` when required:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GA_ID=
```

Rebuild after changing either value.

## Contact email configuration

Review these constants before deployment in `public/api/consultation.php`:

```php
const CONSULTATION_TO_EMAIL = 'sales@mitoms.com';
const FROM_EMAIL = 'sales@mitoms.com';
const FROM_NAME = 'MITOMS Website';
```

The sender mailbox must exist on Hostinger. Use authenticated SMTP later if PHP `mail()` delivery is unreliable.

## Deployment

Upload and extract the contents of `MITOMS-PublicHTML-Build.zip` directly inside `public_html`. Do not upload the source ZIP or `node_modules` to `public_html`.

Read before launch:

- `HOSTINGER-PHP-DEPLOYMENT.txt`
- `SEO-NEXT-STEPS.md`
- `SEO-KEYWORD-PLAN.md`
- `SEO-IMPLEMENTATION-REPORT.md`
