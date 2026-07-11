import type { Metadata } from "next";
import PortfolioPage from "../../components/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio | MITOMS Technologies",
  description:
    "Explore digital products, websites, mobile applications, cloud platforms and AI solutions designed by MITOMS Technologies.",
};

export default function Portfolio() {
  return <PortfolioPage />;
}