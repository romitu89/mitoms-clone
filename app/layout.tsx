import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import GoogleAnalytics from "../components/seo/GoogleAnalytics";
import JsonLd from "../components/seo/JsonLd";
import { SITE, organizationSchema, websiteSchema } from "../lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030817" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: `${SITE.url}/` }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: `${SITE.url}/`,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} - digital technology solutions`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [SITE.ogImage],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.language}>
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
