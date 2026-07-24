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

const title = "Web Development Company in Delhi NCR";
const description =
  "MITOMS provides web development in Delhi NCR for business websites, e-commerce platforms, portals, SaaS products and custom web applications.";
const path = "/locations/delhi-ncr/web-development-company/";

const faqs = [
  {
    question: "Which Delhi NCR locations does MITOMS support?",
    answer:
      "MITOMS can support projects for organisations across Delhi, Noida, Greater Noida, Ghaziabad, Gurugram, Faridabad and nearby areas. The registered company location is in Sahibabad, Ghaziabad.",
  },
  {
    question: "Can MITOMS work with a Delhi NCR startup on an MVP?",
    answer:
      "Yes. MITOMS can help define the first useful product scope, design user journeys, build the web application and administrative systems, test the solution and support later iterations.",
  },
  {
    question: "Can the team integrate payments, CRM or third-party APIs?",
    answer:
      "Yes. Integration requirements are reviewed during planning. Depending on the project, the solution can connect with payment gateways, CRM platforms, email services, authentication systems, maps and other approved APIs.",
  },
  {
    question: "Does MITOMS provide maintenance after launch?",
    answer:
      "Yes. Ongoing support can include technical updates, monitoring, security improvements, performance work, content changes and new features based on the agreed engagement.",
  },
  {
    question: "How is a Delhi NCR web project managed?",
    answer:
      "Projects can combine online discovery meetings, documented requirements, design reviews, regular progress updates and milestone-based approvals. In-person discussions can be considered when practical and agreed in advance.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

export default function DelhiNcrWebDevelopmentPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "Website and web application development in Delhi NCR",
            areaServed: [
              "Delhi NCR",
              "New Delhi",
              "Noida",
              "Greater Noida",
              "Ghaziabad",
              "Gurugram",
              "Faridabad",
            ],
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations/" },
            { name: "Delhi NCR", path },
          ]),
        ]}
      />
      <SeoContentPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations/" },
          { name: "Delhi NCR", href: path },
        ]}
        eyebrow="Websites, Portals and Custom Web Applications"
        title={title}
        introduction="MITOMS designs and develops responsive websites and web applications for startups, growing businesses and established organisations across Delhi NCR. Delivery combines product planning, UI/UX design, modern engineering, technical SEO and post-launch support."
        highlights={[
          { value: "Delhi NCR", label: "Regional project coverage" },
          { value: "B2B + B2C", label: "Business and customer-facing solutions" },
          { value: "Modern Stack", label: "Maintainable web technologies" },
          { value: "Scalable", label: "Architecture planned for growth" },
        ]}
        sections={[
          {
            heading: "Web Development for a Competitive Delhi NCR Market",
            paragraphs: [
              "Delhi NCR businesses compete for attention across search, social platforms, referrals and industry networks. A strong website must communicate value quickly, work reliably on mobile devices and give potential customers a clear path to enquire, purchase, register or complete a task.",
              "MITOMS builds digital experiences around the business model rather than forcing every requirement into the same template. The final scope can range from a focused service website to a multi-role platform with dashboards, payments, content management and external integrations.",
            ],
          },
          {
            heading: "Web Development Capabilities",
            bullets: [
              "Professional business and corporate websites",
              "Custom web applications and internal tools",
              "E-commerce platforms and payment integrations",
              "SaaS products and startup MVPs",
              "Customer, employee and partner portals",
              "API development and third-party integrations",
              "Website redesign and technology modernization",
              "Performance, accessibility and technical SEO improvements",
            ],
          },
          {
            heading: "Technology Selected Around the Product",
            paragraphs: [
              "A technology stack should match the required user experience, security, content workflow, expected traffic, integrations and maintenance capability. MITOMS evaluates those factors before recommending an approach.",
            ],
            subsections: [
              {
                heading: "Frontend Experience",
                bullets: [
                  "Responsive interfaces for mobile and desktop",
                  "React and Next.js where application behaviour requires them",
                  "Accessible HTML structure and reusable UI components",
                ],
              },
              {
                heading: "Backend and Data",
                bullets: [
                  "Node.js or Python-based services where suitable",
                  "REST or GraphQL API integrations",
                  "PostgreSQL, MongoDB and other appropriate data stores",
                ],
              },
              {
                heading: "Cloud and Delivery",
                bullets: [
                  "Cloud hosting selected for the application requirements",
                  "Deployment automation and environment management",
                  "Monitoring, backups and ongoing technical support",
                ],
              },
              {
                heading: "Search and Performance",
                bullets: [
                  "Crawlable page architecture and canonical URLs",
                  "Optimized media and reduced unnecessary code",
                  "Measurement through Search Console and analytics",
                ],
              },
            ],
          },
          {
            heading: "Serving Delhi, Noida, Ghaziabad, Gurugram and Beyond",
            paragraphs: [
              "MITOMS uses a structured remote delivery process that works across Delhi NCR and with international clients. Requirements, designs, feedback and approvals are documented so stakeholders can understand what is being built and what happens next.",
              "Location pages support genuine regional relevance, but long-term search performance also depends on verified reviews, local business information, useful case studies, industry references and links from reputable sources.",
            ],
          },
        ]}
        faqs={faqs}
        primaryCta={{ label: "Discuss a Delhi NCR Project", href: "/contact/" }}
        secondaryCta={{
          label: "View Web Development Services",
          href: "/services/web-development/",
        }}
        relatedLinks={[
          {
            title: "Ghaziabad Web Development",
            description:
              "Explore the location page for MITOMS' registered business area in Ghaziabad.",
            href: "/locations/ghaziabad/web-development-company/",
          },
          {
            title: "Web Development Portfolio",
            description:
              "See selected responsive websites and digital product work delivered by MITOMS.",
            href: "/portfolio/",
          },
          {
            title: "How to Choose a Web Company",
            description:
              "Use a practical checklist to compare web development partners in India.",
            href: "/insights/how-to-choose-web-development-company-india/",
          },
        ]}
        finalCta={{
          eyebrow: "Delhi NCR Web Development",
          title: "Build a Faster, Clearer and More Useful Digital Experience",
          description:
            "Share the audience, features, timeline and business outcome you are planning. MITOMS will help define the right website or web application approach.",
          label: "Request a Project Discussion",
          href: "/contact/",
        }}
      />
    </>
  );
}
