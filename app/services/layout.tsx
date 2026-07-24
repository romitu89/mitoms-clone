import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/seo";

const title = "Software Development Services in India";
const description =
  "Explore MITOMS services for web development, mobile app development, UI/UX design, cloud solutions, AI transformation and IT consulting in India.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/services/",
});

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
