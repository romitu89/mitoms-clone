import type { Metadata } from "next";
import ITConsultingPage from "../../../components/ITConsultingPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "IT Consulting & Technology Strategy";
const description =
  "Build a practical technology strategy, modernize systems and improve operations with IT consulting and architecture guidance from MITOMS Technologies.";
const path = "/services/it-consulting/";

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function ITConsulting() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "IT consulting, technology strategy and architecture guidance",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "IT Consulting", path },
          ]),
        ]}
      />
      <ITConsultingPage />
    </>
  );
}
