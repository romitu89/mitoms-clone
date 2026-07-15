import type { Metadata } from "next";
import TermsAndConditionsPage from "../../components/TermsAndConditionsPage";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "Terms and Conditions";
const description =
  "Read the terms and conditions governing use of the MITOMS Technologies website, content and enquiry services.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/terms/",
});

export default function TermsAndConditions() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: title,
            description,
            path: "/terms/",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms and Conditions", path: "/terms/" },
          ]),
        ]}
      />
      <TermsAndConditionsPage />
    </>
  );
}
