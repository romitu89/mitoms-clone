import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: {
    cpus: 2,
  },
  // TypeScript is validated by `npm run typecheck` before the Hostinger build.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
