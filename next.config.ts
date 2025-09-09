import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/workspace-*/image/**',
      },
      { 
        protocol: 'https', 
        hostname: 'replicate.delivery', 
        pathname: '/**', 
      },
      { 
        protocol: 'https', 
        hostname: 'images-production.cdn.aws.freshtalkdaily.com', 
        pathname: '/**', 
      },
    ],
  },
}

export default nextConfig
