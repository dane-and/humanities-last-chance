
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity-hosted images
    formats: ['image/webp'],
  },
  // Handle redirects from old paths if needed
  async redirects() {
    return [
      {
        source: '/article/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
