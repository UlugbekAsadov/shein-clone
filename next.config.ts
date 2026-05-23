import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [90, 95, 100],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    preloadEntriesOnStart: false,
    optimizePackageImports: [
      "@solar-icons/react",
      "lucide-react",
      "motion",
      "radix-ui",
    ],
  },
};

export default nextConfig;
