import type { Metadata } from "next";
import SeoContentPage from "../../../../components/seo/SeoContentPage";
import JsonLd from "../../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../../lib/seo";

const title = "Web Development Company in Ghaziabad";
const description =
  "MITOMS is a web development company in Ghaziabad building fast, secure and scalable business websites, e-commerce platforms, portals and custom web applications.";
const path = "/locations/ghaziabad/web-development-company/";

const faqs = [
  {
    question: "Does MITOMS provide web development services in Ghaziabad?",
    answer:
      "Yes. MITOMS Technologies Private Limited is registered in Shalimar Garden Extension, Sahibabad, Ghaziabad, and supports businesses across Ghaziabad and the wider Delhi NCR region with website and web application development.",
  },
  {
    question: "What types of websites can MITOMS build?",
    answer:
      "MITOMS builds professional business websites, e-commerce platforms, customer and employee portals, startup MVPs, SaaS products and custom web applications based on the organisation's goals and workflows.",
  },
  {
    question: "Can MITOMS redesign an existing Ghaziabad business website?",
    answer:
      "Yes. The team can assess an existing website and improve its structure, design, mobile responsiveness, speed, search visibility, content presentation and underlying technology.",
  },
  {
    question: "Will the website be mobile-friendly and SEO-ready?",
    answer:
      "Yes. Projects are planned with responsive layouts, semantic page structure, crawlable navigation, performance, accessibility and technical SEO foundations in mind.",
  },
  {
    question: "How do I request a website quotation?",
    answer:
      "Share the business objective, required pages or features, preferred timeline and any existing website details through the MITOMS contact form. The team can then recommend an appropriate scope and delivery plan.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

export default function GhaziabadWebDevelopmentPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "Website and web application development in Ghaziabad",
            areaServed: [
              "Ghaziabad",
              "Sahibabad",
              "Indirapuram",
              "Vaishali",
              "Vasundhara",
              "Delhi NCR",
            ],
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations/" },
            { name: "Ghaziabad", path },
          ]),
        ]}
      />
      <SeoContentPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations/" },
          { name: "Ghaziabad", href: path },
        ]}
        eyebrow="Website and Web Application Development"
        title={title}
        introduction="MITOMS Technologies helps Ghaziabad businesses plan, design and build professional websites and custom web applications. The company is registered in Sahibabad, Ghaziabad, and combines local business understanding with modern product design and engineering practices."
        highlights={[
          { value: "Ghaziabad", label: "Registered business location" },
          { value: "Web + Apps", label: "Complete digital product capability" },
          { value: "Responsive", label: "Mobile, tablet and desktop delivery" },
          { value: "End to End", label: "Strategy, design, development and support" },
        ]}
        sections={[
          {
            heading: "Web Solutions for Businesses in Ghaziabad",
            paragraphs: [
              "A business website should do more than display information. It should explain the organisation clearly, help visitors find the right service, make enquiries easier and support future growth. MITOMS plans each project around the audience, business goals, operational requirements and expected scale.",
              "The team can work with startups, local service providers, healthcare organisations, professional firms, educational businesses and growing companies that need a reliable digital presence or a purpose-built web platform.",
            ],
            bullets: [
              "Corporate and professional service websites",
              "E-commerce stores and online catalogues",
              "Customer, employee and vendor portals",
              "Custom web applications and dashboards",
              "Startup MVPs and SaaS products",
              "Website redesign, migration and modernization",
            ],
          },
          {
            heading: "What a Search-Ready Business Website Requires",
            paragraphs: [
              "Ranking cannot be created by adding a keyword repeatedly. A competitive website needs a technically accessible foundation, useful service information, clear local relevance and evidence that the business is trustworthy.",
            ],
            subsections: [
              {
                heading: "Technical Foundation",
                bullets: [
                  "Fast-loading pages and optimized assets",
                  "Mobile-responsive layouts",
                  "Semantic headings and crawlable links",
                  "Canonical URLs, sitemap and robots controls",
                  "Structured data for the business and services",
                ],
              },
              {
                heading: "Business and Content Signals",
                bullets: [
                  "Clear service descriptions and project examples",
                  "Consistent company name, address and phone details",
                  "Genuine reviews and client references",
                  "Useful answers to customer questions",
                  "Local pages that provide real, non-duplicated information",
                ],
              },
            ],
          },
          {
            heading: "A Practical Web Development Process",
            subsections: [
              {
                heading: "1. Discovery and Scope",
                paragraphs: [
                  "MITOMS clarifies the target audience, required pages, workflows, integrations, business goals and content responsibilities before recommending the project scope.",
                ],
              },
              {
                heading: "2. UX and Visual Design",
                paragraphs: [
                  "Information architecture, page layouts and user journeys are designed to make the experience clear on mobile and desktop devices.",
                ],
              },
              {
                heading: "3. Development and Testing",
                paragraphs: [
                  "The frontend, backend, database and integrations are implemented and tested for functionality, responsiveness, speed, accessibility and security.",
                ],
              },
              {
                heading: "4. Launch and Improvement",
                paragraphs: [
                  "After deployment, the website can be monitored and improved using search data, user behaviour, business enquiries and new operational requirements.",
                ],
              },
            ],
          },
          {
            heading: "Areas Supported Around Ghaziabad",
            paragraphs: [
              "MITOMS can collaborate with businesses in Sahibabad, Shalimar Garden, Indirapuram, Vaishali, Vasundhara, Raj Nagar and other parts of Ghaziabad. Projects can also be delivered remotely across Delhi NCR and internationally through structured online communication and milestone-based reviews.",
            ],
          },
        ]}
        faqs={faqs}
        primaryCta={{ label: "Request a Website Proposal", href: "/contact/" }}
        secondaryCta={{
          label: "Explore Web Development",
          href: "/services/web-development/",
        }}
        relatedLinks={[
          {
            title: "Web Development Services",
            description:
              "Explore websites, portals, e-commerce platforms and custom web application capabilities.",
            href: "/services/web-development/",
          },
          {
            title: "Delhi NCR Web Development",
            description:
              "See how MITOMS supports organisations across the wider Delhi NCR region.",
            href: "/locations/delhi-ncr/web-development-company/",
          },
          {
            title: "MITOMS Case Studies",
            description:
              "Review selected projects across culture, healthcare and professional services.",
            href: "/case-studies/",
          },
        ]}
        finalCta={{
          eyebrow: "Build in Ghaziabad",
          title: "Plan a Website That Supports Real Business Growth",
          description:
            "Tell MITOMS what your organisation needs to communicate, automate or improve. The team will help turn the requirement into a practical web development plan.",
          label: "Discuss Your Website",
          href: "/contact/",
        }}
      />
    </>
  );
}
