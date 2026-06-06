import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    // just in case, but let's put it on root as recommended by the error message
  },
  // @ts-ignore - in case NextConfig type definitions aren't fully updated or it's root/experimental
  allowedDevOrigins: [
    'moonshine-eradicate-doorknob.ngrok-free.dev',
    '*.ngrok-free.dev'
  ],
};

export default nextConfig;
