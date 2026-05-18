import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1, // limit CPU cores Next.js uses
  },
  images: {
    qualities: [75, 80, 90, 95, 100],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
