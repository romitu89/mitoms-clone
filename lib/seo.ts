import type { Metadata } from "next";

export const SITE = {
  url: "https://mitoms.com",
  name: "MITOMS Technologies",
  legalName: "MITOMS Technologies Private Limited",
  locale: "en_IN",
  language: "en-IN",
  country: "IN",
  email: "sales@mitoms.com",
  phone: "+91 99907 94979",
  telephone: "+919990794979",
  cin: "U62012UP2023PTC192943",
  foundingDate: "2023",
  defaultTitle: "MITOMS Technologies | Custom Software Development Company in India",
  defaultDescription:
    "MITOMS Technologies is a custom software development company in India building websites, web applications, mobile apps, cloud platforms and AI-powered digital solutions.",
  ogImage: "/images/seo/mitoms-og.jpg",
  logo: "/images/seo/mitoms-logo.png",
  address: {
    streetAddress: "Shalimar Garden Extension, Sahibabad",
    addressLocality: "Ghaziabad",
    addressRegion: "Uttar Pradesh",
    postalCode: "201005",
    addressCountry: "IN",
  },
} as const;

export const SERVICE_AREAS = [
  "India",
  "Delhi NCR",
  "Ghaziabad",
  "Noida",
  "Greater Noida",
  "New Delhi",
  "Gurugram",
  "Faridabad",
] as const;

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
  image?: string;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
  };
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image = SITE.ogImage,
  article,
}: PageMetadataInput): Metadata {
  const canonical = canonicalPath(path);
  const fullTitle = title.includes(SITE.name)
    ? title
    : `${title} | ${SITE.name}`;
  const imageUrl = absoluteUrl(image);

  const openGraph: Metadata["openGraph"] = article
    ? {
        type: "article",
        locale: SITE.locale,
        url: absoluteUrl(canonical),
        siteName: SITE.name,
        title: fullTitle,
        description,
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime ?? article.publishedTime,
        authors: [SITE.legalName],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${fullTitle} - ${SITE.name}`,
            type: "image/jpeg",
          },
        ],
      }
    : {
        type: "website",
        locale: SITE.locale,
        url: absoluteUrl(canonical),
        siteName: SITE.name,
        title: fullTitle,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${fullTitle} - ${SITE.name}`,
            type: "image/jpeg",
          },
        ],
      };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-IN": canonical,
        "x-default": canonical,
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
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
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE.ogImage),
    },
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: readonly string[];
};

export function createServiceSchema({
  name,
  description,
  path,
  serviceType,
  areaServed = ["India", "Worldwide"],
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
    areaServed: areaServed.map((name) => ({
      "@type": name === "India" ? "Country" : "AdministrativeArea",
      name,
    })),
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Startups, small and medium businesses, and established organisations",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: SITE.telephone,
        email: SITE.email,
        contactType: "sales",
        availableLanguage: ["English", "Hindi"],
      },
    },
  };
}

export type FaqItem = {
  question: string;
  answer: string;
};

export function createFaqSchema(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type ArticleSchemaInput = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  about?: string[];
};

export function createArticleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified = datePublished,
  about = [],
}: ArticleSchemaInput) {
  const url = absoluteUrl(canonicalPath(path));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: {
      "@id": `${url}#webpage`,
    },
    datePublished,
    dateModified,
    inLanguage: SITE.language,
    image: absoluteUrl(SITE.ogImage),
    author: {
      "@id": `${SITE.url}/#organization`,
    },
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    about: about.map((name) => ({
      "@type": "Thing",
      name,
    })),
  };
}

type CreativeWorkSchemaInput = {
  name: string;
  description: string;
  path: string;
  clientName: string;
  industry: string;
  projectUrl?: string;
};

export function createCreativeWorkSchema({
  name,
  description,
  path,
  clientName,
  industry,
  projectUrl,
}: CreativeWorkSchemaInput) {
  const url = absoluteUrl(canonicalPath(path));

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#case-study`,
    name,
    description,
    url,
    inLanguage: SITE.language,
    creator: {
      "@id": `${SITE.url}/#organization`,
    },
    about: [
      {
        "@type": "Organization",
        name: clientName,
      },
      {
        "@type": "Thing",
        name: industry,
      },
    ],
    ...(projectUrl
      ? {
          sameAs: projectUrl,
        }
      : {}),
  };
}

type ItemListEntry = {
  name?: string;
  title?: string;
  path?: string;
  href?: string;
};

export function createItemListSchema(
  name: string,
  description: string,
  items: readonly ItemListEntry[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name ?? item.title ?? `Item ${index + 1}`,
      url: absoluteUrl(canonicalPath(item.path ?? item.href ?? "/")),
    })),
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.legalName,
  alternateName: [SITE.name, "MITOMS"],
  legalName: SITE.legalName,
  url: `${SITE.url}/`,
  foundingDate: SITE.foundingDate,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Corporate Identification Number",
    value: SITE.cin,
  },
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(SITE.logo),
    width: 1200,
    height: 413,
  },
  image: absoluteUrl(SITE.ogImage),
  email: SITE.email,
  telephone: SITE.telephone,
  address: {
    "@type": "PostalAddress",
    ...SITE.address,
  },
  areaServed: SERVICE_AREAS.map((name) => ({
    "@type": name === "India" ? "Country" : "AdministrativeArea",
    name,
  })),
  knowsLanguage: ["English", "Hindi"],
  knowsAbout: [
    "Custom software development",
    "Web development",
    "Web application development",
    "Mobile app development",
    "UI and UX design",
    "Cloud solutions",
    "Artificial intelligence development",
    "Digital transformation",
    "IT consulting",
  ],
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Technology Services",
    itemListElement: [
      "Web Development",
      "Mobile App Development",
      "UI/UX Design",
      "Cloud Solutions",
      "AI and Digital Transformation",
      "IT Consulting",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
      },
    })),
  },
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
