import type { Metadata } from "next";
import SeoCollectionPage from "../../components/seo/SeoCollectionPage";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createItemListSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "Web Development and Digital Product Insights";
const description =
  "Practical guides from MITOMS on website costs, choosing a development partner, custom websites, Next.js, WordPress and digital product planning.";
const path = "/insights/";

const insights = [
  {
    title: "Website Development Cost in India: A Practical Planning Guide",
    description:
      "Understand the factors that influence website budgets and how to prepare a useful scope before requesting estimates.",
    href: "/insights/web-development-cost-india/",
    meta: "Planning Guide",
  },
  {
    title: "How to Choose a Web Development Company in India",
    description:
      "A practical checklist for evaluating technical ability, process, communication, evidence, ownership and long-term support.",
    href: "/insights/how-to-choose-web-development-company-india/",
    meta: "Buyer Guide",
  },
  {
    title: "Custom Website vs Template Website",
    description:
      "Compare speed, flexibility, cost, ownership, performance and maintainability before choosing an approach.",
    href: "/insights/custom-website-vs-template/",
    meta: "Comparison",
  },
  {
    title: "Next.js vs WordPress for a Business Website",
    description:
      "Understand when a content-managed WordPress site or a modern Next.js experience may be the better fit.",
    href: "/insights/nextjs-vs-wordpress-business-website/",
    meta: "Technology Guide",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: title,
            description,
            path,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path },
          ]),
          createItemListSchema(title, description, insights),
        ]}
      />
      <SeoCollectionPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Insights", href: path },
        ]}
        eyebrow="Practical Technology Guides"
        title={title}
        introduction={description}
        items={insights}
      />
    </>
  );
}
