import type { Metadata } from "next";
import PortfolioPage from "../../components/PortfolioPage";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "Web Development and Mobile App Portfolio";
const description =
  "Explore websites, mobile applications and digital products designed and developed by MITOMS Technologies across culture, healthcare and professional services.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/portfolio/",
});

export default function Portfolio() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: title,
            description,
            path: "/portfolio/",
            type: "CollectionPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio/" },
          ]),
        ]}
      />
      <PortfolioPage />
    </>
  );
}
