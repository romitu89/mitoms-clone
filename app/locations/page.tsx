import type { Metadata } from "next";
import SeoCollectionPage from "../../components/seo/SeoCollectionPage";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createItemListSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "Web Development Locations in India";
const description =
  "Explore MITOMS web development services for businesses in Ghaziabad, Delhi NCR and nearby markets, supported by a registered technology company in Uttar Pradesh.";
const path = "/locations/";

const locations = [
  {
    title: "Web Development Company in Ghaziabad",
    description:
      "Website and web application development for businesses in Ghaziabad, Sahibabad, Indirapuram, Vaishali, Vasundhara and nearby areas.",
    href: "/locations/ghaziabad/web-development-company/",
    meta: "Ghaziabad",
  },
  {
    title: "Web Development Company in Delhi NCR",
    description:
      "Scalable websites and web applications for organisations across Delhi, Noida, Greater Noida, Ghaziabad, Gurugram and Faridabad.",
    href: "/locations/delhi-ncr/web-development-company/",
    meta: "Delhi NCR",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: title,
            description,
            path,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path },
          ]),
          createItemListSchema(title, description, locations),
        ]}
      />
      <SeoCollectionPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: path },
        ]}
        eyebrow="Local and Regional Delivery"
        title={title}
        introduction={description}
        items={locations}
      />
    </>
  );
}
