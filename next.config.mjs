/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "cdn.dribbble.com",
      },
    ],
  },
};

export default nextConfig;
