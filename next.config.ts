import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Copilot pages moved from the site root to /copilot-advantage. Keep old
  // links working; /members/enter stays put because purchase emails use it.
  async redirects() {
    return [
      { source: "/members", destination: "/copilot-advantage/members", permanent: true },
      { source: "/members/:path((?!enter$).*)", destination: "/copilot-advantage/members/:path", permanent: true },
    ];
  },
  // The site has two root layouts (the main site and the book reader pages),
  // so unmatched URLs need a 404 page of their own.
  experimental: { globalNotFound: true },
  // Served as-is: on Cloudflare Workers, resizing would need a paid Images binding.
  images: { unoptimized: true },
};

export default nextConfig;
