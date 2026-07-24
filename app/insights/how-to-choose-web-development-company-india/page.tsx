import type { Metadata } from "next";
import SeoContentPage from "../../../components/seo/SeoContentPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "How to Choose a Web Development Company in India";
const description =
  "Use this practical checklist to choose a web development company in India based on relevant work, technical ability, process, ownership, communication and support.";
const path = "/insights/how-to-choose-web-development-company-india/";
const published = "2026-07-24T00:00:00+05:30";

const faqs = [
  {
    question: "What should I check before hiring a web development company?",
    answer:
      "Review relevant project work, understand the proposed process, meet the people who will work on the project, confirm ownership and support terms, and ask how the company handles performance, security, testing and communication.",
  },
  {
    question: "Should I choose the company with the lowest quotation?",
    answer:
      "Not without comparing scope. A lower quotation may exclude custom design, content, testing, integrations, project management or post-launch support. Compare deliverables, assumptions and long-term maintainability.",
  },
  {
    question: "How important are client reviews?",
    answer:
      "Genuine verified reviews can provide useful evidence about communication, delivery and reliability. They should be considered together with relevant case studies, live work and direct reference conversations where appropriate.",
  },
  {
    question: "Who should own the website source code and accounts?",
    answer:
      "Ownership should be agreed in writing. Clients should normally understand who controls the domain, hosting, analytics, third-party services, design files and source code after final payment and handover.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
  article: { publishedTime: published },
});

export default function ChooseWebDevelopmentCompanyPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createArticleSchema({
            headline: title,
            description,
            path,
            datePublished: published,
            about: [
              "Web development company in India",
              "Agency selection",
              "Website procurement",
            ],
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights/" },
            { name: "Choose a Web Development Company", path },
          ]),
        ]}
      />
      <SeoContentPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights/" },
          { name: "Choose a Web Development Company", href: path },
        ]}
        eyebrow="Web Development Partner Evaluation"
        title={title}
        introduction="The best web development partner for one project may be unsuitable for another. A reliable decision comes from comparing relevant experience, delivery process, technical thinking, communication, ownership and long-term support—not from rankings or sales claims alone."
        sections={[
          {
            heading: "1. Define the Business Outcome First",
            paragraphs: [
              "Before contacting agencies, describe what should improve after the project. The goal may be more qualified enquiries, online sales, reduced manual work, a customer portal, an MVP or replacement of an outdated platform.",
              "A provider can recommend the right scope only when the expected outcome and target users are clear.",
            ],
          },
          {
            heading: "2. Review Relevant Work, Not Only Attractive Screens",
            bullets: [
              "Look for projects with similar users, workflows or complexity",
              "Open live websites and test them on mobile devices",
              "Ask what problem the project solved and what the team delivered",
              "Check whether the case study explains process and decisions",
              "Distinguish real client projects from concept designs",
            ],
          },
          {
            heading: "3. Understand Who Will Work on the Project",
            paragraphs: [
              "Ask whether design, frontend, backend, testing and project management are handled internally or through external partners. Meet the person responsible for communication and clarify how often progress will be reviewed.",
            ],
          },
          {
            heading: "4. Evaluate the Delivery Process",
            subsections: [
              {
                heading: "Discovery",
                paragraphs: [
                  "The team should ask about users, business rules, content, integrations, risks and success measures before confirming the solution.",
                ],
              },
              {
                heading: "Design",
                paragraphs: [
                  "There should be a clear process for information architecture, wireframes, visual design, feedback and approval.",
                ],
              },
              {
                heading: "Development",
                paragraphs: [
                  "Ask how code is reviewed, environments are managed, integrations are tested and progress is demonstrated.",
                ],
              },
              {
                heading: "Launch and Support",
                paragraphs: [
                  "Confirm deployment responsibility, backups, monitoring, warranty periods, maintenance options and response expectations.",
                ],
              },
            ],
          },
          {
            heading: "5. Ask About Performance, SEO, Accessibility and Security",
            bullets: [
              "Will important content be available in crawlable HTML?",
              "How will page speed and image delivery be handled?",
              "Will titles, descriptions, canonical URLs and sitemaps be implemented?",
              "How are forms, authentication and personal data protected?",
              "Will keyboard navigation and readable contrast be considered?",
              "How will analytics and Search Console be connected?",
            ],
          },
          {
            heading: "6. Confirm Ownership and Handover",
            paragraphs: [
              "The proposal or agreement should identify who owns the domain, hosting account, code repository, design files, database, third-party accounts and final source code. It should also explain what happens if the relationship ends.",
            ],
          },
          {
            heading: "7. Compare Quotations on the Same Basis",
            bullets: [
              "Included pages, features and user roles",
              "Custom design versus template customization",
              "Content writing and content entry",
              "Integrations and third-party subscription costs",
              "Testing, deployment and training",
              "Maintenance, warranty and future change rates",
              "Timeline assumptions and client responsibilities",
            ],
          },
          {
            heading: "8. Verify Trust Signals",
            paragraphs: [
              "Check company registration information, consistent contact details, genuine client reviews, professional profiles and references where appropriate. A polished website is useful, but independent evidence and transparent communication are stronger indicators of reliability.",
            ],
          },
        ]}
        faqs={faqs}
        primaryCta={{ label: "Discuss Your Requirements", href: "/contact/" }}
        secondaryCta={{ label: "View MITOMS Case Studies", href: "/case-studies/" }}
        relatedLinks={[
          {
            title: "Website Development Cost in India",
            description:
              "Understand what affects estimates and how to compare project quotations.",
            href: "/insights/web-development-cost-india/",
          },
          {
            title: "MITOMS Portfolio",
            description:
              "Review selected work across culture, healthcare and professional services.",
            href: "/portfolio/",
          },
          {
            title: "About MITOMS",
            description:
              "Learn about the company, values and technology delivery approach.",
            href: "/about/",
          },
        ]}
      />
    </>
  );
}
