import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Compiles Next.js down to standard static HTML/CSS/JS
  images: {
    unoptimized: true, // Required for static export to work with next/image
  },
};

export default nextConfig;
