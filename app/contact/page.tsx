import type { Metadata } from "next";
import ContactPage from "../../components/ContactPage";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "Contact Our Software Development Team";
const description =
  "Contact MITOMS Technologies to discuss custom software, web development, mobile apps, UI/UX design, cloud solutions, AI transformation or IT consulting.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/contact/",
});

export default function Contact() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: title,
            description,
            path: "/contact/",
            type: "ContactPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: "/contact/" },
          ]),
        ]}
      />
      <ContactPage />
    </>
  );
}
