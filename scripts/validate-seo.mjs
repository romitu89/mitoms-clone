import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const siteUrl = "https://mitoms.com";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

function decodeBasicEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getMatches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => decodeBasicEntities(match[1]?.trim() ?? ""));
}

function routeFromHtml(filePath) {
  const relative = path.relative(outDir, filePath).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

async function pathExists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

function htmlTargetForHref(href) {
  const clean = href.split(/[?#]/, 1)[0] || "/";
  if (clean === "/") return path.join(outDir, "index.html");
  if (/\.[a-z0-9]{2,5}$/i.test(clean)) return path.join(outDir, clean.replace(/^\//, ""));
  return path.join(outDir, clean.replace(/^\//, ""), "index.html");
}

const allFiles = await walk(outDir);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const indexableHtmlFiles = htmlFiles.filter((file) => path.basename(file) !== "404.html");
const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const canonicalRoutes = new Set();
const internalLinks = new Set();

for (const file of indexableHtmlFiles) {
  const html = await readFile(file, "utf8");
  const route = routeFromHtml(file);

  const titleValues = getMatches(html, /<title[^>]*>([\s\S]*?)<\/title>/gi);
  const descriptionValues = getMatches(
    html,
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/gi,
  );
  const canonicalValues = getMatches(
    html,
    /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi,
  );
  const h1Values = getMatches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
  const robotsValues = getMatches(
    html,
    /<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/gi,
  );

  if (titleValues.length !== 1 || !titleValues[0]) {
    errors.push(`${route}: expected exactly one non-empty <title>, found ${titleValues.length}`);
  } else {
    const existing = titles.get(titleValues[0]);
    if (existing) errors.push(`${route}: duplicate title also used by ${existing}`);
    else titles.set(titleValues[0], route);
    if (titleValues[0].length > 68) warnings.push(`${route}: title is ${titleValues[0].length} characters`);
  }

  if (descriptionValues.length !== 1 || !descriptionValues[0]) {
    errors.push(`${route}: expected exactly one meta description, found ${descriptionValues.length}`);
  } else {
    const existing = descriptions.get(descriptionValues[0]);
    if (existing) errors.push(`${route}: duplicate description also used by ${existing}`);
    else descriptions.set(descriptionValues[0], route);
    if (descriptionValues[0].length < 110 || descriptionValues[0].length > 170) {
      warnings.push(`${route}: description is ${descriptionValues[0].length} characters`);
    }
  }

  if (canonicalValues.length !== 1) {
    errors.push(`${route}: expected exactly one canonical, found ${canonicalValues.length}`);
  } else {
    const canonical = canonicalValues[0];
    if (!canonical.startsWith(siteUrl)) errors.push(`${route}: canonical is outside ${siteUrl}`);
    if (route !== "/" && !canonical.endsWith("/")) errors.push(`${route}: canonical does not end with /`);
    canonicalRoutes.add(canonical);
  }

  if (h1Values.length !== 1) errors.push(`${route}: expected one H1, found ${h1Values.length}`);
  if (robotsValues.some((value) => /noindex/i.test(value))) errors.push(`${route}: indexable page contains noindex`);

  for (const match of html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${route}: invalid JSON-LD (${error instanceof Error ? error.message : "parse error"})`);
    }
  }

  for (const match of html.matchAll(/\shref=["']([^"']+)["']/gi)) {
    const href = decodeBasicEntities(match[1]);
    if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/api/")) {
      internalLinks.add(href);
    }
  }
}

for (const href of internalLinks) {
  const target = htmlTargetForHref(href);
  if (!(await pathExists(target))) errors.push(`Broken internal link: ${href}`);
}

const sitemapPath = path.join(outDir, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const uniqueSitemapUrls = new Set(sitemapUrls);

if (sitemapUrls.length !== uniqueSitemapUrls.size) errors.push("sitemap.xml contains duplicate URLs");
if (sitemapUrls.length !== indexableHtmlFiles.length) {
  errors.push(`sitemap.xml contains ${sitemapUrls.length} URLs but ${indexableHtmlFiles.length} indexable HTML pages were built`);
}
for (const url of canonicalRoutes) {
  if (!uniqueSitemapUrls.has(url)) errors.push(`Canonical URL missing from sitemap: ${url}`);
}

const robots = await readFile(path.join(outDir, "robots.txt"), "utf8");
if (!robots.includes(`${siteUrl}/sitemap.xml`)) errors.push("robots.txt does not reference the canonical sitemap");
if (!robots.includes("Disallow: /api/")) errors.push("robots.txt does not disallow /api/");

if (warnings.length > 0) {
  console.warn(`SEO validation warnings (${warnings.length}):`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length > 0) {
  console.error(`SEO validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${indexableHtmlFiles.length} indexable pages.`);
console.log(`Validated ${internalLinks.size} unique internal links and ${sitemapUrls.length} sitemap URLs.`);
