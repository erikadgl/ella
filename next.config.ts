import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1200],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
