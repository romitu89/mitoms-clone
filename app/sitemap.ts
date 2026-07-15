import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo";


export const dynamic = "force-static";
const lastModified = new Date("2026-07-15T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/services/", changeFrequency: "monthly", priority: 0.9 },
    {
      path: "/services/web-development/",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: "/services/mobile-app-development/",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: "/services/ui-ux-design/",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: "/services/cloud-solutions/",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: "/services/ai-digital-transformation/",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: "/services/it-consulting/",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    { path: "/portfolio/", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about/", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact/", changeFrequency: "yearly", priority: 0.7 },
    { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms/", changeFrequency: "yearly", priority: 0.2 },
  ].map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: entry.priority,
  }));
}
