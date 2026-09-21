import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow data: URIs for base64 logo uploads stored in the DB
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
