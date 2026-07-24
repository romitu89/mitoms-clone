import type { Metadata } from "next";
import SeoContentPage from "../../../components/seo/SeoContentPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createCreativeWorkSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "Artmilap Artist Community Platform Case Study";
const description =
  "See how MITOMS planned and developed Artmilap, a responsive platform for artist profiles, cultural discovery, learning, community participation and future mobile experiences.";
const path = "/case-studies/artmilap/";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
});

export default function ArtmilapCaseStudyPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createCreativeWorkSchema({
            name: title,
            description,
            path,
            clientName: "Artmilap / Artmilap Connect LLP",
            industry: "Arts, culture, creative learning and community networking",
            projectUrl: "https://artmilap.com/",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies/" },
            { name: "Artmilap", path },
          ]),
        ]}
      />
      <SeoContentPage
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies/" },
          { name: "Artmilap", href: path },
        ]}
        eyebrow="Culture, Community and Digital Product Development"
        title={title}
        introduction="Artmilap is a culture-first digital platform designed to connect artists, learners, organisations and cultural communities. MITOMS helped translate a broad product vision into a structured responsive experience that supports discovery, profiles, participation and future service expansion."
        highlights={[
          { value: "Web + Mobile", label: "Responsive platform and mobile product direction" },
          { value: "Multi-Role", label: "Artists, learners, organisers and communities" },
          { value: "Early Access", label: "Live product foundation with continued development" },
          { value: "India", label: "Culture-first audience and opportunity focus" },
        ]}
        sections={[
          {
            heading: "The Product Challenge",
            paragraphs: [
              "The concept needed to serve several audiences without making the experience confusing. Artists require professional visibility and opportunities. Learners need an easy way to discover art forms and suitable artists. Organisations and communities need pathways to find talent, participate in cultural activity and support collaboration.",
              "The platform also needed room to grow into bookings, learning, community participation, opportunities, payments and mobile experiences while maintaining a clear early-access journey.",
            ],
          },
          {
            heading: "The MITOMS Approach",
            subsections: [
              {
                heading: "Audience and Journey Planning",
                paragraphs: [
                  "The information structure was organised around key user groups and the actions they need to complete, including registration, profile creation, discovery and participation.",
                ],
              },
              {
                heading: "Responsive Experience Design",
                paragraphs: [
                  "Layouts and content were planned to remain usable across mobile, tablet and desktop screens, with emphasis on clear calls to action and approachable cultural presentation.",
                ],
              },
              {
                heading: "Scalable Product Direction",
                paragraphs: [
                  "The early web experience was treated as a product foundation rather than a one-time marketing page, allowing future modules and mobile journeys to align with the same platform vision.",
                ],
              },
              {
                heading: "Iterative Delivery",
                paragraphs: [
                  "The project continues to evolve through feedback, prioritisation and phased development instead of attempting to launch every possible feature at once.",
                ],
              },
            ],
          },
          {
            heading: "Core Capabilities Included in the Product Direction",
            bullets: [
              "Artist profiles and talent portfolios",
              "Artist and learner registration journeys",
              "Artist discovery, networking and collaboration",
              "Community sessions and learning bookings",
              "Payment and booking support",
              "Cultural opportunities, grants and professional visibility",
              "Responsive early-access web experience",
              "Mobile application development direction",
            ],
          },
          {
            heading: "Value Created",
            paragraphs: [
              "Artmilap now has a central digital foundation for artist discovery, cultural learning, community participation and professional opportunities. The platform helps bring several related journeys into one coherent ecosystem instead of separating artists, learners and organisers across disconnected channels.",
              "As an ongoing product, the most important outcome is a clear structure that can support continued testing, content growth and feature development while preserving the culture-first positioning.",
            ],
          },
          {
            heading: "Technology and Delivery Capabilities",
            bullets: [
              "Responsive web development",
              "UI/UX design and product journey planning",
              "Modern frontend implementation",
              "Registration and profile experience planning",
              "Booking and payment workflow direction",
              "Mobile application planning and development",
            ],
          },
        ]}
        primaryCta={{ label: "Discuss a Platform Idea", href: "/contact/" }}
        secondaryCta={{ label: "Visit Artmilap", href: "https://artmilap.com/" }}
        relatedLinks={[
          {
            title: "Web Development Services",
            description:
              "Explore custom websites, platforms, portals and web application development.",
            href: "/services/web-development/",
          },
          {
            title: "Mobile App Development",
            description:
              "See how MITOMS plans and builds iOS, Android and cross-platform applications.",
            href: "/services/mobile-app-development/",
          },
          {
            title: "Artmilap Live Website",
            description:
              "Open the public Artmilap early-access experience in a new tab.",
            href: "https://artmilap.com/",
            external: true,
          },
        ]}
        finalCta={{
          eyebrow: "Build a Digital Platform",
          title: "Turn a Multi-Role Product Idea Into a Clear Delivery Plan",
          description:
            "MITOMS can help define the audience, journeys, initial scope, design system, technology and phased roadmap for a new platform or startup MVP.",
          label: "Start a Product Discussion",
          href: "/contact/",
        }}
      />
    </>
  );
}
