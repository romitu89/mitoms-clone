import type { Metadata } from "next";
import WebDevelopmentPage from "../../../components/WebDevelopmentPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Web Development Company in India";
const description =
  "MITOMS is a web development company in India building fast, secure and scalable websites, e-commerce platforms, portals and custom web applications.";
const path = "/services/web-development/";

const faqs = [
  {
    question: "How long does it take to develop a website?",
    answer:
      "The timeline depends on the size, design complexity, required features and integrations. A standard business website may take a few weeks, while a custom web application may require a longer development cycle.",
  },
  {
    question: "Will my website work on mobile devices?",
    answer:
      "Yes. We follow a responsive and mobile-first approach so the website works properly across smartphones, tablets, laptops and larger desktop screens.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can evaluate your existing website and improve its design, structure, performance, user experience, technology and content presentation.",
  },
  {
    question: "Will I be able to manage the website content?",
    answer:
      "Yes. Depending on your requirements, we can provide a suitable content-management solution or develop an admin panel for managing website information.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Yes. We can provide ongoing maintenance, updates, performance monitoring, security improvements and technical support after deployment.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function WebDevelopment() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "Website and web application development",
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "Web Development", path },
          ]),
        ]}
      />
      <WebDevelopmentPage />
    </>
  );
}
