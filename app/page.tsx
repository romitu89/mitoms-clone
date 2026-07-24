import type { Metadata } from "next";
import Home from "../components/Home";
import JsonLd from "../components/seo/JsonLd";
import {
  createItemListSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../lib/seo";

const title = "Custom Software Development Company in India";
const description =
  "MITOMS Technologies builds custom software, high-performance websites, mobile applications, cloud platforms and AI-powered digital solutions for growing businesses.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: `${title} | MITOMS Technologies`,
            description,
            path: "/",
          }),
          createItemListSchema(
            "MITOMS Technology Services",
            "Core software, web, mobile, cloud, AI and consulting services provided by MITOMS Technologies.",
            [
              { name: "Web Development", path: "/services/web-development/" },
              {
                name: "Mobile App Development",
                path: "/services/mobile-app-development/",
              },
              { name: "UI/UX Design", path: "/services/ui-ux-design/" },
              { name: "Cloud Solutions", path: "/services/cloud-solutions/" },
              {
                name: "AI and Digital Transformation",
                path: "/services/ai-digital-transformation/",
              },
              { name: "IT Consulting", path: "/services/it-consulting/" },
            ],
          ),
        ]}
      />
      <Home />
    </>
  );
}
