import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.VERCEL_BLOB_HOSTNAME || 'bqf6wroukotlbxwz.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'edge-cdn.trakteer.id'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    }
  }
};

export default nextConfig;
