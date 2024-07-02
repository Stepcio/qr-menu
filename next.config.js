/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.amazonaws.com",
        },
        {
          protocol: "https",
          hostname: "sawepecomcdn.blob.core.windows.net",
        },
        {
          protocol: "https",
          hostname: "cdn.galleries.smcloud.net",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
