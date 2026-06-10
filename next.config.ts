import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // Compiles down to standard static HTML/CSS/JS
  images: {
    unoptimized: true,    // Required for static export to load public assets properly
  },
  basePath: "/portfolio",   // Injects your exact GitHub repository path
  assetPrefix: "/portfolio/", // Forces subfolders to fetch assets from the correct relative path
};

export default nextConfig;