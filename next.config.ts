/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Keeps your static HTML export active
  images: {
    unoptimized: true,
  },
  // Replace 'portfolio' with your exact GitHub repository name string
  basePath: '/portfolio/app',
  assetPrefix: '/portfolio/app/',
};

export default nextConfig;