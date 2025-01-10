/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cognitiveds.ai'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig