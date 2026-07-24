import type { Metadata } from "next";
import SeoContentPage from "../../../components/seo/SeoContentPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createCreativeWorkSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Elevate Care Healthcare Website Case Study";
const description =
  "Explore the MITOMS case study for Elevate Care, a responsive healthcare and social care website presenting home care, staffing and enquiry information clearly.";
const path = "/case-studies/elevate-care/";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

export default function ElevateCareCaseStudyPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createCreativeWorkSchema({
            name: title,
            description,
            path,
            clientName: "Elevate Care Ltd",
            industry: "Healthcare, home care, social care and medical staffing",
            projectUrl: "https://elevatecare.mitoms.com/",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies/" },
            { name: "Elevate Care", path },
          ]),
        ]}
      />
      <SeoContentPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies/" },
          { name: "Elevate Care", href: path },
        ]}
        eyebrow="Healthcare and Social Care Web Development"
        title={title}
        introduction="Elevate Care required a professional and approachable website that could explain personalised care services, healthcare operations support and staffing solutions to individuals, families and organisations. MITOMS created a responsive experience focused on clarity, trust and straightforward enquiry journeys."
        highlights={[
          { value: "Healthcare", label: "Home care and social care service communication" },
          { value: "Responsive", label: "Mobile, tablet and desktop experience" },
          { value: "Completed", label: "Published professional services website" },
          { value: "Enquiry Led", label: "Clear routes to contact the care team" },
        ]}
        sections={[
          {
            heading: "The Communication Challenge",
            paragraphs: [
              "Care services involve sensitive decisions and several different audiences. The website needed to make service information understandable without overwhelming visitors, while also presenting staffing, training and organisational support in a professional way.",
              "The experience needed to feel trustworthy and accessible across devices because users may arrive from search, referrals or direct recommendations and often need information quickly.",
            ],
          },
          {
            heading: "What MITOMS Delivered",
            bullets: [
              "Home care and live-in care service information",
              "Personal, companionship and domestic support details",
              "Healthcare staffing and recruitment information",
              "Service enquiry and contact journeys",
              "Client testimonials and quality-care information",
              "Staff training and application content",
              "Clear opening hours and contact details",
              "Responsive layouts across mobile, tablet and desktop",
            ],
          },
          {
            heading: "Design and Content Priorities",
            subsections: [
              {
                heading: "Clear Service Navigation",
                paragraphs: [
                  "Services were grouped and presented so visitors could understand the available support without needing specialist knowledge of the organisation.",
                ],
              },
              {
                heading: "Trust-Focused Presentation",
                paragraphs: [
                  "Professional visual design, quality-care information and testimonials were used to support confidence in the organisation.",
                ],
              },
              {
                heading: "Accessible Contact Paths",
                paragraphs: [
                  "Calls to action and contact details were placed where users could find them while exploring relevant service information.",
                ],
              },
              {
                heading: "Responsive Delivery",
                paragraphs: [
                  "The website was tested across common screen sizes to keep reading, navigation and enquiries practical on mobile devices.",
                ],
              },
            ],
          },
          {
            heading: "Value Created",
            paragraphs: [
              "The website gives Elevate Care a structured digital presence that helps prospective customers, families, healthcare organisations and applicants understand the available services. It also provides a consistent destination for enquiries and business communication.",
              "The project demonstrates how a service website can combine professional presentation with practical information architecture instead of relying only on visual design.",
            ],
          },
        ]}
        primaryCta={{ label: "Discuss a Healthcare Website", href: "/contact/" }}
        secondaryCta={{ label: "View Portfolio", href: "/portfolio/" }}
        relatedLinks={[
          {
            title: "Web Development Services",
            description:
              "Explore responsive business websites and custom web application capabilities.",
            href: "/services/web-development/",
          },
          {
            title: "UI/UX Design Services",
            description:
              "Learn how MITOMS plans clear journeys and accessible digital interfaces.",
            href: "/services/ui-ux-design/",
          },
          {
            title: "Elevate Care Website",
            description:
              "Open the published Elevate Care website in a new tab.",
            href: "https://elevatecare.mitoms.com/",
            external: true,
          },
        ]}
      />
    </>
  );
}
