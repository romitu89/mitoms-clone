import type { Metadata } from "next";
import ITConsultingPage from "../../../components/ITConsultingPage";

export const metadata: Metadata = {
  title: "IT Consulting Services | MITOMS Technologies",
  description:
    "Build a practical technology strategy, modernize systems and improve business operations with MITOMS IT consulting services.",
};

export default function ITConsulting() {
  return <ITConsultingPage />;
}