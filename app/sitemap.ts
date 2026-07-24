import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo";

export const dynamic = "force-static";

const lastModified = new Date("2026-07-24T00:00:00.000Z");

const entries = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/web-development/", changeFrequency: "monthly", priority: 0.95 },
  { path: "/services/mobile-app-development/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/ui-ux-design/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/cloud-solutions/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/ai-digital-transformation/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/it-consulting/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/portfolio/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-studies/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/case-studies/artmilap/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-studies/elevate-care/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-studies/sohar-dental-laboratory/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/locations/", changeFrequency: "monthly", priority: 0.75 },
  { path: "/locations/ghaziabad/web-development-company/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/locations/delhi-ncr/web-development-company/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/insights/", changeFrequency: "weekly", priority: 0.75 },
  { path: "/insights/web-development-cost-india/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/insights/how-to-choose-web-development-company-india/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/insights/custom-website-vs-template/", changeFrequency: "monthly", priority: 0.75 },
  { path: "/insights/nextjs-vs-wordpress-business-website/", changeFrequency: "monthly", priority: 0.75 },
  { path: "/about/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact/", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms/", changeFrequency: "yearly", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
