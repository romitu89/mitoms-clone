import type { Metadata } from "next";
import MobileAppDevelopmentPage from "../../../components/MobileAppDevelopmentPage";

export const metadata: Metadata = {
  title: "Mobile App Development Services | MITOMS Technologies",
  description:
    "Build secure, scalable and engaging iOS and Android mobile applications with MITOMS Technologies.",
};

export default function MobileAppDevelopment() {
  return <MobileAppDevelopmentPage />;
}