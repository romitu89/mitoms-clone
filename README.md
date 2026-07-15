# MITOMS Technologies Website

SEO-optimized Next.js static website prepared for fast deployment on Hostinger shared hosting.

## Architecture

- Next.js App Router is used for development and static generation.
- The production website is exported to `out/`.
- Hostinger serves the static files directly; no persistent Node.js server is required.
- Consultation forms submit to `public/api/consultation.php`.
- Apache rules in `public/.htaccess` handle HTTPS/non-www redirects, compression, caching and security headers.

## Included SEO and performance features

- Unique page titles, descriptions and canonical URLs
- Open Graph and Twitter sharing metadata
- Organization, WebSite, WebPage, Breadcrumb, Service and ItemList JSON-LD
- Generated `robots.txt`, `sitemap.xml` and web manifest
- Search-engine-safe 404 page
- Optimized WebP website images and social sharing image
- Reduced route prefetching for a lighter initial page load
- Static asset caching and Brotli/Gzip compression rules
- Optional Google Search Console and GA4 environment variables

## Requirements

- Node.js 20.9 or newer
- npm

## Build on Windows

Double-click:

```text
build-hostinger.bat
```

The script performs a clean dependency installation, runs ESLint and TypeScript checks, builds the static website and creates:

```text
MITOMS-PublicHTML-Build.zip
```

## Build manually

```bash
npm ci
npm run build:hostinger
```

The generated website is placed in `out/`.

## Environment variables

Copy `.env.example` to `.env.local` and add values only when required:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GA_ID=
```

Rebuild after changing either value.

## Contact email configuration

Before building, review these constants in `public/api/consultation.php`:

```php
const CONSULTATION_TO_EMAIL = 'sales@mitoms.com';
const FROM_EMAIL = 'sales@mitoms.com';
const FROM_NAME = 'MITOMS Website';
```

The sender mailbox should exist in Hostinger.

## Deployment

Upload and extract the contents of `MITOMS-PublicHTML-Build.zip` directly inside `public_html`. Do not upload the source-code ZIP to `public_html`.

Read these files before launch:

- `HOSTINGER-PHP-DEPLOYMENT.txt`
- `SEO-NEXT-STEPS.md`
