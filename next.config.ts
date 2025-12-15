import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle Sanity's jsdom/isomorphic-dompurify SSR compatibility
  serverExternalPackages: ["isomorphic-dompurify", "jsdom"],

  // Turbopack configuration (required for Next.js 16+)
  turbopack: {},
};

export default nextConfig;
