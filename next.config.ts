import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [90, 95, 100],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "api.monera.uz" },
      { protocol: "https", hostname: "api.shein.uz" },
    ],
  },
  experimental: {
    preloadEntriesOnStart: false,
    optimizePackageImports: [
      "@solar-icons/react",
      "motion",
      "radix-ui",
    ],
  },
};

export default nextConfig;
