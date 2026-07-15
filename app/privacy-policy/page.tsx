import type { Metadata } from "next";
import PrivacyPolicyPage from "../../components/PrivacyPolicyPage";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "Privacy Policy";
const description =
  "Read how MITOMS Technologies collects, uses, protects and manages personal information submitted through our website and services.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/privacy-policy/",
});

export default function PrivacyPolicy() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: title,
            description,
            path: "/privacy-policy/",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy/" },
          ]),
        ]}
      />
      <PrivacyPolicyPage />
    </>
  );
}
