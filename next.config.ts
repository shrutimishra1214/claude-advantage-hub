import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product files live outside /public so they can only be fetched through
  // the signed /api/download route. Make sure Vercel bundles them.
  outputFileTracingIncludes: {
    "/api/download/[product]": ["./private-files/**/*"],
  },
  // The Copilot pages moved from the site root to /copilot-advantage. Keep old
  // links working; /members/enter stays put because purchase emails use it.
  async redirects() {
    return [
      { source: "/members", destination: "/copilot-advantage/members", permanent: true },
      { source: "/members/:path((?!enter$).*)", destination: "/copilot-advantage/members/:path", permanent: true },
      // The Copilot book points readers to its companion page at the old address.
      { source: "/the-microsoft-copilot-advantage", destination: "/copilot-advantage/companion", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
