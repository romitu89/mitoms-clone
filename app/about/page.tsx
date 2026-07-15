import type { Metadata } from "next";
import AboutPage from "../../components/AboutPage";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "About Our Software Development Company";
const description =
  "Learn about MITOMS Technologies, our values, delivery approach and commitment to building reliable digital products and technology solutions for businesses.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/about/",
});

export default function About() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: title,
            description,
            path: "/about/",
            type: "AboutPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about/" },
          ]),
        ]}
      />
      <AboutPage />
    </>
  );
}
