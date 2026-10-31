import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product files live outside /public so they can only be fetched through
  // the signed /api/download route. Make sure Vercel bundles them.
  outputFileTracingIncludes: {
    "/api/download/[product]": ["./private-files/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
