import type { Metadata } from "next";
import UIUXDesignPage from "../../../components/UIUXDesignPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "UI/UX Design Company in India";
const description =
  "MITOMS provides UI/UX design in India for websites, mobile apps, SaaS products and dashboards through research, wireframes, prototypes and design systems.";
const path = "/services/ui-ux-design/";

const faqs = [
  {
    question: "What is included in UI/UX design services?",
    answer:
      "The exact scope depends on the project. It can include product discovery, user research, information architecture, user flows, wireframes, visual interface design, responsive layouts, prototypes, design systems and developer handoff.",
  },
  {
    question: "What is the difference between UI and UX design?",
    answer:
      "UX design focuses on how the product works, how information is organized and how users complete tasks. UI design focuses on the visual appearance of screens, including colors, typography, components, spacing and interaction states.",
  },
  {
    question: "Can you redesign an existing website or application?",
    answer:
      "Yes. We can review the current product, identify usability and visual problems and create an improved experience while retaining important business functionality.",
  },
  {
    question: "Will the design be responsive?",
    answer:
      "Yes. Website and web-application interfaces are designed for mobile, tablet and desktop screens. Mobile applications are also planned for different device sizes and operating-system requirements.",
  },
  {
    question: "Do you provide the design files to developers?",
    answer:
      "Yes. The final handoff can include design screens, reusable components, responsive behavior, interaction states, assets and relevant specifications required for development.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function UIUXDesign() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "User experience and user interface design",
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "UI/UX Design", path },
          ]),
        ]}
      />
      <UIUXDesignPage />
    </>
  );
}
