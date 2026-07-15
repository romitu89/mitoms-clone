import type { Metadata } from "next";
import MobileAppDevelopmentPage from "../../../components/MobileAppDevelopmentPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Mobile App Development Services";
const description =
  "Build secure, scalable and engaging iOS and Android mobile applications with MITOMS Technologies, from product strategy and UI/UX to launch and support.";
const path = "/services/mobile-app-development/";

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
            serviceType: "iOS and Android mobile application development",
          }),
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
