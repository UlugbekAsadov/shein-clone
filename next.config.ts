import path from "node:path";
import type { NextConfig } from "next";

const lucideShim = path.resolve(__dirname, "src/shims/lucide-react.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [90, 95, 100],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "api.monera.uz" },
      { protocol: "https", hostname: "api.shein.uz" },
      { protocol: "https", hostname: "cdn.2020mall.com" },
    ],
  },
  turbopack: {
    resolveAlias: {
      "lucide-react": lucideShim,
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "lucide-react": lucideShim,
    };
    return config;
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
