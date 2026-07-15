import type { MetadataRoute } from "next";
import { SITE } from "../lib/seo";


export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.legalName,
    short_name: "MITOMS",
    description: SITE.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4B22FF",
    lang: SITE.language,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
