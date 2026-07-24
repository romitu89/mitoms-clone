import type { Metadata } from "next";
import CloudSolutionsPage from "../../../components/CloudSolutionsPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Cloud Consulting and Migration Company in India";
const description =
  "MITOMS helps businesses in India design, migrate and manage secure cloud infrastructure across AWS, Azure, Google Cloud and modern DevOps environments.";
const path = "/services/cloud-solutions/";

const faqs = [
  {
    question: "Which cloud platform should my business use?",
    answer:
      "The right cloud platform depends on your applications, existing technology, security requirements, budget and expected scale. We evaluate these factors before recommending AWS, Azure, Google Cloud or another suitable environment.",
  },
  {
    question: "Can you migrate an existing application to the cloud?",
    answer:
      "Yes. We can assess your existing application and recommend rehosting, refactoring, rebuilding or another suitable migration approach based on its architecture and business importance.",
  },
  {
    question: "Will the migration cause downtime?",
    answer:
      "The expected downtime depends on the application and migration strategy. We plan testing, backups, phased migration and rollback procedures to reduce operational disruption.",
  },
  {
    question: "Do you provide cloud security services?",
    answer:
      "Yes. Our cloud work can include secure architecture, access controls, environment configuration, data protection, monitoring and recommendations for improving the security posture.",
  },
  {
    question: "Can you manage the cloud environment after deployment?",
    answer:
      "Yes. We can provide monitoring, maintenance, updates, performance optimization, backup management and ongoing cloud support after deployment.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function CloudSolutions() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "Cloud consulting, migration, DevOps and managed infrastructure",
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "Cloud Solutions", path },
          ]),
        ]}
      />
      <CloudSolutionsPage />
    </>
  );
}
