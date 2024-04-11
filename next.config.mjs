/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    baseUrl: '',
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
};

export default nextConfig;
