import type { Metadata } from "next";
import WebDevelopmentPage from "../../../components/WebDevelopmentPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Web Development Services";
const description =
  "Build fast, secure, responsive and scalable websites and web applications with MITOMS Technologies for stronger user experiences and business growth.";
const path = "/services/web-development/";

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
