# MITOMS SEO and Deployment Next Steps

## 1. Build the production website

Use Node.js 20.9 or newer. Do not copy `node_modules` between Windows and Linux.

```bash
npm ci
npm run build:hostinger
```

On Windows PowerShell, you can also run:

```powershell
.\build-hostinger.ps1
```

The build process creates:

- `out/` - the static website
- `MITOMS-PublicHTML-Build.zip` - upload-ready Hostinger package

## 2. Upload to Hostinger

1. Back up the current `public_html` folder and database, if any.
2. Remove old generated website files from `public_html`, but keep any unrelated files you still need.
3. Upload `MITOMS-PublicHTML-Build.zip` into `public_html`.
4. Extract it directly inside `public_html`.
5. Confirm that `.htaccess` and the `api/consultation.php` file were extracted.
6. Test the home page, every service page, portfolio, contact form, privacy policy, terms page and a non-existing URL.

## 3. Confirm canonical domain and HTTPS

The website is configured to use `https://mitoms.com/` as the canonical domain. Confirm that:

- `http://mitoms.com/` redirects to `https://mitoms.com/`
- `https://www.mitoms.com/` redirects to `https://mitoms.com/`
- Hostinger SSL is active and valid

## 4. Connect Google Search Console

1. Create a Domain property for `mitoms.com` in Google Search Console.
2. Complete DNS verification in Hostinger or Cloudflare.
3. Submit this sitemap: `https://mitoms.com/sitemap.xml`
4. Inspect and request indexing for the home page, services page, six individual service pages, portfolio, about and contact pages.
5. Review Page indexing, Core Web Vitals, HTTPS and Enhancements reports weekly after launch.

For optional HTML-tag verification instead of DNS, copy `.env.example` to `.env.production`, add only the verification token, and rebuild.

## 5. Enable Google Analytics 4

1. Create a GA4 web data stream for `https://mitoms.com`.
2. Copy `.env.example` to `.env.production`.
3. Add the GA4 measurement ID to `NEXT_PUBLIC_GA_ID`.
4. Rebuild and upload the new Hostinger package.
5. Verify page views and form-conversion events in GA4 Realtime.

## 6. Validate the deployed website

After deployment, test these live files and pages:

- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/services/`
- `/404-test-page/`

Use Google PageSpeed Insights for mobile and desktop, Google Rich Results Test for structured data, and Search Console URL Inspection for rendered HTML and canonical selection.

## 7. Complete off-page and local SEO

- Create or fully update the MITOMS Google Business Profile using the exact legal business name, phone, website and verified address.
- Keep business name, address and phone consistent across directories and social profiles.
- Add verified LinkedIn and other official profile links to the website and Organization structured data when they are finalized.
- Ask genuine clients for Google reviews without offering incentives.
- Build relevant backlinks through project case studies, technology partnerships, founder profiles and reputable business directories.

## 8. Publish search-focused content

Create useful pages and articles around services and real customer questions. Recommended starting topics:

- Custom software development company in India
- Website development services for small and growing businesses
- Mobile app development cost and process
- UI/UX design process for new digital products
- Cloud migration checklist for businesses
- Practical AI automation use cases for operations
- How to choose an IT consulting partner

Each article should answer a real question, include original examples, link to the relevant service page and provide a clear contact action. Avoid creating multiple thin pages that target nearly identical keywords.

## 9. Monitor every month

Track:

- Organic clicks, impressions, click-through rate and average position
- Indexed pages and crawl errors
- Leads generated from organic search
- Mobile Core Web Vitals
- Rankings for service and location-related searches
- New referring domains and quality backlinks
- Pages with declining traffic or outdated content

SEO requires ongoing content, authority building and measurement. The code provides the technical foundation, but rankings will depend on competition, content quality, business authority and time.
