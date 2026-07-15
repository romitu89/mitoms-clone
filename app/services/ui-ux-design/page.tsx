import type { Metadata } from "next";
import UIUXDesignPage from "../../../components/UIUXDesignPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "UI/UX Design Services";
const description =
  "Create intuitive, accessible and user-focused digital experiences with MITOMS Technologies through UX research, wireframes, prototyping and interface design.";
const path = "/services/ui-ux-design/";

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function UIUXDesign() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "User experience and user interface design",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "UI/UX Design", path },
          ]),
        ]}
      />
      <UIUXDesignPage />
    </>
  );
}
