import type { Metadata } from "next";
import MobileAppDevelopmentPage from "../../../components/MobileAppDevelopmentPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Mobile App Development Company in India";
const description =
  "MITOMS designs and develops secure, scalable iOS, Android and cross-platform mobile apps in India, from product strategy and UI/UX to launch and support.";
const path = "/services/mobile-app-development/";

const faqs = [
  {
    question: "Should I build a native or cross-platform mobile application?",
    answer:
      "The right approach depends on application complexity, performance requirements, timeline, budget and required device features. We evaluate your requirements before recommending native iOS and Android development or a cross-platform solution.",
  },
  {
    question: "How long does mobile application development take?",
    answer:
      "A focused MVP may take a few months, while a complex application with multiple user roles, integrations and administrative systems may require a longer timeline. The final estimate is prepared after discovery and feature planning.",
  },
  {
    question: "Will you develop the backend and admin panel?",
    answer:
      "Yes. We can develop the complete solution, including mobile applications, backend APIs, database, cloud infrastructure and web-based administrative panels.",
  },
  {
    question: "Can you publish the application on app stores?",
    answer:
      "Yes. We can assist with application preparation, store guidelines, builds, testing and submission to the Apple App Store and Google Play Store.",
  },
  {
    question: "Do you provide support after the application is launched?",
    answer:
      "Yes. We provide maintenance, operating-system compatibility updates, performance monitoring, bug fixes, security improvements and new-feature development.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function MobileAppDevelopment() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "iOS, Android and cross-platform mobile application development",
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "Mobile App Development", path },
          ]),
        ]}
      />
      <MobileAppDevelopmentPage />
    </>
  );
}
