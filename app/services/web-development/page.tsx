import type { Metadata } from "next";
import WebDevelopmentPage from "../../../components/WebDevelopmentPage";

export const metadata: Metadata = {
  title: "Web Development Services | MITOMS Technologies",
  description:
    "Build fast, secure and scalable websites and web applications with MITOMS Technologies.",
};

export default function WebDevelopment() {
  return <WebDevelopmentPage />;
}