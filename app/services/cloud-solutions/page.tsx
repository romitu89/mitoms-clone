import type { Metadata } from "next";
import CloudSolutionsPage from "../../../components/CloudSolutionsPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Cloud Solutions and Migration Services";
const description =
  "Build, migrate and manage secure, scalable and reliable cloud infrastructure with MITOMS Technologies for improved performance, resilience and cost control.";
const path = "/services/cloud-solutions/";

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
            serviceType: "Cloud architecture, migration and managed infrastructure",
          }),
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
