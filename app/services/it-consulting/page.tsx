import type { Metadata } from "next";
import ITConsultingPage from "../../../components/ITConsultingPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "IT Consulting Company in India";
const description =
  "MITOMS provides IT consulting in India for technology strategy, solution architecture, legacy modernization, cloud planning, security and digital product decisions.";
const path = "/services/it-consulting/";

const faqs = [
  {
    question: "When does a business need IT consulting?",
    answer:
      "IT consulting is useful when a business is planning a new digital product, modernizing existing systems, experiencing performance or scalability problems, moving to the cloud or needing a clear technology roadmap.",
  },
  {
    question: "Can you review our existing technology systems?",
    answer:
      "Yes. We can evaluate applications, infrastructure, databases, integrations, development practices, security concerns and overall maintainability before preparing recommendations.",
  },
  {
    question: "Do you only provide recommendations?",
    answer:
      "We can provide an assessment and roadmap, or continue with design, development, migration, integration and implementation support depending on your requirements.",
  },
  {
    question: "Can you help us choose the right technology stack?",
    answer:
      "Yes. We evaluate product requirements, team capabilities, budget, timeline, expected users, integrations and long-term maintenance before recommending suitable technologies.",
  },
  {
    question: "Can you help modernize a legacy application?",
    answer:
      "Yes. We can assess the current application and recommend phased modernization, migration, redevelopment, integration or infrastructure improvements.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function ITConsulting() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "IT consulting, technology strategy and solution architecture",
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "IT Consulting", path },
          ]),
        ]}
      />
      <ITConsultingPage />
    </>
  );
}
