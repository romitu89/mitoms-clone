import type { Metadata } from "next";
import AIDigitalTransformationPage from "../../../components/AIDigitalTransformationPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "AI and Digital Transformation Services";
const description =
  "Transform business operations with practical artificial intelligence, automation, data intelligence and modern digital solutions from MITOMS Technologies.";
const path = "/services/ai-digital-transformation/";

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function AIDigitalTransformation() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "Artificial intelligence, automation and digital transformation",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "AI and Digital Transformation", path },
          ]),
        ]}
      />
      <AIDigitalTransformationPage />
    </>
  );
}
