/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Keeps your static HTML export active
  images: {
    unoptimized: true,
  },
  // Replace 'portfolio' with your exact GitHub repository name string
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
};

export default nextConfig;