import type { Metadata } from "next";

export const SITE = {
  url: "https://mitoms.com",
  name: "MITOMS Technologies",
  legalName: "MITOMS Technologies Pvt Ltd",
  locale: "en_IN",
  language: "en-IN",
  country: "IN",
  email: "sales@mitoms.com",
  phone: "+91 99907 94979",
  telephone: "+919990794979",
  defaultTitle: "MITOMS Technologies | Custom Software Development Company",
  defaultDescription:
    "MITOMS Technologies delivers custom software, high-performance websites, mobile apps, UI/UX design, cloud solutions, AI transformation and IT consulting services.",
  ogImage: "/images/seo/mitoms-og.jpg",
  logo: "/images/seo/mitoms-logo.png",
} as const;

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE.url).toString();
}

export function canonicalPath(path = "/"): string {
  if (path === "/") {
    return "/";
  }

  const withoutQueryOrHash = path.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = withoutQueryOrHash.startsWith("/")
    ? withoutQueryOrHash
    : `/${withoutQueryOrHash}`;

  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = canonicalPath(path);
  const fullTitle = title.includes(SITE.name)
    ? title
    : `${title} | ${SITE.name}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: absoluteUrl(canonical),
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [
        {
          url: absoluteUrl(SITE.ogImage),
          width: 1200,
          height: 630,
          alt: `${SITE.name} - digital technology solutions`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(SITE.ogImage)],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
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
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(canonicalPath(item.path)),
    })),
  };
}

type WebPageSchemaInput = {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
};

export function createWebPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: WebPageSchemaInput) {
  const url = absoluteUrl(canonicalPath(path));

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SITE.language,
    isPartOf: {
      "@id": `${SITE.url}/#website`,
    },
    about: {
      "@id": `${SITE.url}/#organization`,
    },
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
};

export function createServiceSchema({
  name,
  description,
  path,
  serviceType,
}: ServiceSchemaInput) {
  const url = absoluteUrl(canonicalPath(path));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType,
    description,
    url,
    provider: {
      "@id": `${SITE.url}/#organization`,
    },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: SITE.telephone,
        email: SITE.email,
        contactType: "sales",
      },
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.legalName,
  alternateName: [SITE.name, "MITOMS"],
  url: `${SITE.url}/`,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(SITE.logo),
    width: 1200,
    height: 413,
  },
  image: absoluteUrl(SITE.ogImage),
  email: SITE.email,
  telephone: SITE.telephone,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: SITE.telephone,
      email: SITE.email,
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi"],
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.name,
  alternateName: "MITOMS",
  description: SITE.defaultDescription,
  inLanguage: SITE.language,
  publisher: {
    "@id": `${SITE.url}/#organization`,
  },
};
