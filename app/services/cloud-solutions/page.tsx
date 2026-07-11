import type { Metadata } from "next";
import CloudSolutionsPage from "../../../components/CloudSolutionsPage";

export const metadata: Metadata = {
  title: "Cloud Solutions | MITOMS Technologies",
  description:
    "Build, migrate and manage secure, scalable and reliable cloud infrastructure with MITOMS Technologies.",
};

export default function CloudSolutions() {
  return <CloudSolutionsPage />;
}