import type { Metadata } from "next";
import PrivacyPolicyPage from "../../components/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | MITOMS Technologies",
  description:
    "Read how MITOMS Technologies collects, uses, protects and manages personal information.",
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}