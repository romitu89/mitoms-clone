import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  title: "MITOMS Technologies",
  description:
    "Digital solutions designed to create real business impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="disable-scroll-restoration"
          strategy="beforeInteractive"
        >
          {`
            if ("scrollRestoration" in window.history) {
              window.history.scrollRestoration = "manual";
            }
          `}
        </Script>
      </head>

      <body>
        <ScrollToTop />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}