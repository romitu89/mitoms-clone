import type { Metadata } from "next";
import AboutPage from "../../components/AboutPage";

export const metadata: Metadata = {
  title: "About Us | MITOMS Technologies",
  description:
    "Learn about MITOMS Technologies, our approach, values and commitment to building reliable digital products and technology solutions.",
};

export default function About() {
  return <AboutPage />;
}