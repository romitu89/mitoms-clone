import type { Metadata } from "next";
import SeoCollectionPage from "../../components/seo/SeoCollectionPage";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createItemListSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "Web and Mobile Development Case Studies";
const description =
  "Explore MITOMS case studies covering an artist community platform, healthcare services website and dental laboratory corporate website.";
const path = "/case-studies/";

const caseStudies = [
  {
    title: "Artmilap Artist and Cultural Community Platform",
    description:
      "How MITOMS helped shape a responsive early-access platform for artist discovery, cultural learning, community participation and future mobile experiences.",
    href: "/case-studies/artmilap/",
    meta: "Culture and Community",
  },
  {
    title: "Elevate Care Healthcare Services Website",
    description:
      "A clear and responsive website for personalised home care, healthcare support, staffing information and service enquiries.",
    href: "/case-studies/elevate-care/",
    meta: "Healthcare",
  },
  {
    title: "Sohar Dental Laboratory Corporate Website",
    description:
      "A professional website presenting dental restoration expertise, quality standards and enquiry pathways for dental professionals.",
    href: "/case-studies/sohar-dental-laboratory/",
    meta: "Dental Healthcare",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

export default function CaseStudiesPage() {
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
            { name: "Case Studies", path },
          ]),
          createItemListSchema(title, description, caseStudies),
        ]}
      />
      <SeoCollectionPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: path },
        ]}
        eyebrow="Selected Project Work"
        title={title}
        introduction={description}
        items={caseStudies}
      />
    </>
  );
}
