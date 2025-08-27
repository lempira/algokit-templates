import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASE_PATH || '',
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig