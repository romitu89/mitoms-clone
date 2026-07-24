import type { Metadata } from "next";
import AIDigitalTransformationPage from "../../../components/AIDigitalTransformationPage";
import JsonLd from "../../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "../../../lib/seo";

const title = "AI Development Company in India";
const description =
  "MITOMS develops practical AI solutions in India, including assistants, workflow automation, knowledge search, data intelligence and AI-enabled digital products.";
const path = "/services/ai-digital-transformation/";

const faqs = [
  {
    question: "How can AI help my business?",
    answer:
      "AI can help automate repetitive work, improve customer support, analyze business data, organize documents, provide recommendations and add intelligent features to digital products. The right use case depends on your current processes and objectives.",
  },
  {
    question: "Does my business need a large amount of data?",
    answer:
      "Not every AI project requires a large proprietary dataset. Some solutions can use existing AI models, business documents, structured databases or carefully designed workflows. Data requirements are evaluated during discovery.",
  },
  {
    question: "Can AI integrate with our existing software?",
    answer:
      "Yes. AI solutions can be connected with websites, mobile applications, CRMs, internal portals, databases and third-party systems through suitable APIs and integrations.",
  },
  {
    question: "How do you protect confidential business data?",
    answer:
      "The solution can include access controls, secure infrastructure, controlled data processing, monitoring and suitable model or hosting choices based on the sensitivity of your information.",
  },
  {
    question: "Can you begin with a small AI proof of concept?",
    answer:
      "Yes. A focused proof of concept is often a practical way to validate the use case, evaluate results and understand the potential value before developing a larger solution.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function AIDigitalTransformation() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({ name: title, description, path }),
          createServiceSchema({
            name: title,
            description,
            path,
            serviceType: "Artificial intelligence development, automation and digital transformation",
          }),
          createFaqSchema(faqs),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: "AI and Digital Transformation", path },
          ]),
        ]}
      />
      <AIDigitalTransformationPage />
    </>
  );
}
