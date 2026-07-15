import type { Metadata } from "next";
import Home from "../components/Home";
import JsonLd from "../components/seo/JsonLd";
import { createPageMetadata, createWebPageSchema } from "../lib/seo";

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
        data={createWebPageSchema({
          name: `${title} | MITOMS Technologies`,
          description,
          path: "/",
        })}
      />
      <Home />
    </>
  );
}
