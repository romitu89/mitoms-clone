import type { Metadata } from "next";
import TermsAndConditionsPage from "../../components/TermsAndConditionsPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | MITOMS Technologies",
  description:
    "Read the terms governing use of the MITOMS Technologies website.",
};

export default function TermsAndConditions() {
  return <TermsAndConditionsPage />;
}