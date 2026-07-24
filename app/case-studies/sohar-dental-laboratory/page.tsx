import type { Metadata } from "next";
import SeoContentPage from "../../../components/seo/SeoContentPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createCreativeWorkSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Sohar Dental Laboratory Website Case Study";
const description =
  "See how MITOMS developed a responsive corporate website for Sohar Dental Laboratory to present dental restoration expertise, quality and enquiry information.";
const path = "/case-studies/sohar-dental-laboratory/";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

export default function SoharDentalCaseStudyPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createCreativeWorkSchema({
            name: title,
            description,
            path,
            clientName: "Sohar Dental Laboratory LLC",
            industry: "Dental healthcare, laboratory services and medical manufacturing",
            projectUrl: "https://sohardental.com/",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies/" },
            { name: "Sohar Dental Laboratory", path },
          ]),
        ]}
      />
      <SeoContentPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies/" },
          { name: "Sohar Dental Laboratory", href: path },
        ]}
        eyebrow="Dental Healthcare Corporate Web Development"
        title={title}
        introduction="Sohar Dental Laboratory needed a professional corporate website that could communicate its dental restoration capabilities, precision, quality standards and commitment to dental professionals. MITOMS created a modern responsive experience with clear organisational and service information."
        highlights={[
          { value: "Dental", label: "Specialised healthcare industry website" },
          { value: "Corporate", label: "Professional company and capability presentation" },
          { value: "Responsive", label: "Mobile, tablet and desktop compatibility" },
          { value: "Completed", label: "Live public website" },
        ]}
        sections={[
          {
            heading: "The Business Requirement",
            paragraphs: [
              "A dental laboratory serves a specialist professional audience. The website needed to communicate technical capability and quality without making the experience difficult to navigate. It also needed to present the organisation consistently to prospective business clients and dental professionals.",
            ],
          },
          {
            heading: "Website Capabilities",
            bullets: [
              "Professional healthcare-focused corporate design",
              "Company profile and laboratory introduction",
              "Dental restoration service presentation",
              "Mission, values and quality communication",
              "Product information for dental professionals",
              "Clear enquiry and contact support",
              "Modern frontend presentation",
              "Mobile, tablet and desktop compatibility",
            ],
          },
          {
            heading: "The MITOMS Delivery Approach",
            subsections: [
              {
                heading: "Information Architecture",
                paragraphs: [
                  "Company, capability and service information was organised so dental professionals could understand the laboratory without unnecessary navigation.",
                ],
              },
              {
                heading: "Professional Visual Direction",
                paragraphs: [
                  "The interface was designed to reflect precision, reliability and the specialist nature of dental laboratory work.",
                ],
              },
              {
                heading: "Responsive Implementation",
                paragraphs: [
                  "The page structure and media were implemented to remain clear across common mobile and desktop screen sizes.",
                ],
              },
              {
                heading: "Enquiry Support",
                paragraphs: [
                  "Contact information and business enquiry routes were made accessible throughout the experience.",
                ],
              },
            ],
          },
          {
            heading: "Value Created",
            paragraphs: [
              "The completed website strengthens Sohar Dental Laboratory's digital credibility and gives prospective clients a consistent way to understand the organisation, its restoration expertise and its quality-oriented positioning.",
              "The project also provides a maintainable public destination that can support future service information, company updates and business enquiries.",
            ],
          },
        ]}
        primaryCta={{ label: "Discuss a Corporate Website", href: "/contact/" }}
        secondaryCta={{ label: "View Portfolio", href: "/portfolio/" }}
        relatedLinks={[
          {
            title: "Web Development Services",
            description:
              "Explore professional websites, portals and custom web application services.",
            href: "/services/web-development/",
          },
          {
            title: "UI/UX Design Services",
            description:
              "See how research, structure and interface design support clearer digital experiences.",
            href: "/services/ui-ux-design/",
          },
          {
            title: "Sohar Dental Website",
            description:
              "Open the live Sohar Dental Laboratory website in a new tab.",
            href: "https://sohardental.com/",
            external: true,
          },
        ]}
      />
    </>
  );
}
